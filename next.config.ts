import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Produces a pruned, self-contained .next/standalone server folder for
  // the production Docker image, instead of requiring the full
  // node_modules tree at runtime. No effect on `next dev`.
  output: "standalone",
};

export default nextConfig;
