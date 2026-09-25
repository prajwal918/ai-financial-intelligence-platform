FROM python:3.9-slim

# Metadata
LABEL maintainer="ai-financial-intelligence-platform"
LABEL version="2.0.0"
LABEL description="AI Financial Intelligence Platform - Hardened Analytics Engine"
LABEL security.hardened="true"

WORKDIR /app

# Create unprivileged system user for secure container execution
RUN useradd -m -u 1000 appuser

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application source code with non-root ownership
COPY --chown=appuser:appuser . .

# Switch to non-root user
USER appuser

EXPOSE 8501

# Container healthcheck
HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD python -c "import socket; s = socket.socket(); s.connect(('localhost', 8501)); s.close()" || exit 1

CMD ["python", "main.py"]