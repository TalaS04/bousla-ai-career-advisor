# syntax=docker/dockerfile:1

# =============================================================================
# BOUSLA AI Service — FastAPI + OpenRouter
#
# Single-stage build: every dependency in requirements.txt (FastAPI,
# uvicorn, requests, pydantic, python-dotenv) ships prebuilt wheels for
# this base image, so there's no compiler step to discard via a
# multi-stage build — a slim base already gives a small image.
#
# Build context for this Dockerfile is ./ai-service (see docker-compose.yml),
# so paths below are relative to that folder, matching the existing local
# convention of running `uvicorn app.main:app` from inside ai-service/.
# =============================================================================
FROM python:3.12-slim AS runtime
WORKDIR /service

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1

# Dependencies are installed before the source is copied so this layer is
# only rebuilt when requirements.txt actually changes.
COPY app/requirements.txt ./app/requirements.txt
RUN pip install --no-cache-dir -r app/requirements.txt

COPY app ./app

RUN groupadd --system --gid 1001 appuser \
    && useradd --system --uid 1001 --gid appuser appuser \
    && chown -R appuser:appuser /service

USER appuser
EXPOSE 8001

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD python -c "import urllib.request,sys; sys.exit(0 if urllib.request.urlopen('http://127.0.0.1:8001/').status < 500 else 1)"

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8001"]
