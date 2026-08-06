# syntax=docker/dockerfile:1

# =============================================================================
# Stage 1: deps
# Installs npm dependencies in their own layer so Docker can cache them
# independently of source-code changes. bcrypt is a native addon; build
# tools are installed here (this stage only) so a missing prebuilt binary
# falls back to compiling from source instead of failing the build. None of
# this stage's tooling ends up in the final image.
# =============================================================================
FROM node:22-bookworm-slim AS deps
WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
        python3 make g++ \
    && rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json ./
RUN npm ci

# =============================================================================
# Stage 2: builder
# Generates the Prisma client for the Linux runtime and produces the
# Next.js "standalone" production build.
# =============================================================================
FROM node:22-bookworm-slim AS builder
WORKDIR /app

# `prisma generate` resolves env("DATABASE_URL") from schema.prisma (via
# prisma.config.ts) even though it never opens a connection. This
# placeholder only needs to be syntactically valid — the real DATABASE_URL
# is supplied at container runtime by docker-compose and fully overrides it.
ARG DATABASE_URL="sqlserver://build-time-placeholder;database=placeholder;user=sa;password=placeholder;trustServerCertificate=true"
ENV DATABASE_URL=${DATABASE_URL}
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npx prisma generate
RUN npm run build

# =============================================================================
# Stage 3: runner
# Minimal production image: only the standalone server output, static
# assets, and the generated Prisma client — no source, no devDependencies,
# no build tools.
# =============================================================================
FROM node:22-bookworm-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN groupadd --system --gid 1001 nodejs \
    && useradd --system --uid 1001 --gid nodejs nextjs

COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Next.js's standalone-output tracing does not reliably pick up Prisma's
# runtime query-engine binary (it's loaded dynamically, not require()'d
# statically at build time), so the generated client is copied in explicitly.
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/@prisma/client ./node_modules/@prisma/client

USER nextjs
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
    CMD node -e "require('http').get('http://127.0.0.1:3000/', r => process.exit(r.statusCode < 500 ? 0 : 1)).on('error', () => process.exit(1))"

CMD ["node", "server.js"]
