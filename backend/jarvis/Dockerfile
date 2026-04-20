FROM node:20-bookworm-slim

RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
    curl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./
RUN npm install --include=optional

# S'assurer que le binaire natif est exécutable
RUN find /app/node_modules/@anthropic-ai -name "claude" -type f -exec chmod +x {} \; 2>/dev/null || true

# Fallback : installer Claude Code CLI globalement si le binaire natif manque
RUN npm install -g @anthropic-ai/claude-code 2>/dev/null || true

# Diagnostic : afficher les binaires trouvés au build
RUN echo "=== Claude binaries found ===" && \
    find /app/node_modules/@anthropic-ai -name "claude" -type f 2>/dev/null || true && \
    which claude 2>/dev/null || echo "claude not in PATH" && \
    echo "==========================="

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
