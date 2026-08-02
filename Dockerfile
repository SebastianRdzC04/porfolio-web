# ============================================================
# Astro SSR con @astrojs/node standalone
# Multi-stage: deps → build → runtime
# Imagen final: node:22-alpine (~120-150 MB)
# ============================================================

# ---------- Stage 1: deps ----------
# Instala solo dependencias de producción con cache de capas
FROM node:22-alpine AS deps
WORKDIR /app

# Copiamos manifests primero para aprovechar cache de Docker
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

# ---------- Stage 2: build ----------
FROM node:22-alpine AS builder
WORKDIR /app

# Reutilizamos node_modules ya instalados
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NODE_ENV=production
# NO usamos 'npm prune --omit=dev' aquí: aunque @astrojs/node suele ser
# runtime-dep, distintas versiones lo marcan como devDependency y prune
# elimina transitivas (server-destroy, etc.) necesarias en runtime.
# En su lugar, limpiamos archivos de dev/docs no necesarios en runtime
# (source maps, type defs, changelogs) — savings ~30 MB sin riesgo.
RUN npm run build \
  && find node_modules -type f \( \
       -name "*.map" -o -name "*.d.ts" -o -name "*.d.ts.map" \
       -o -name "*.d.mts" -o -name "*.d.cts" \
       -o -name "*.markdown" -o -name "CHANGELOG*" -o -name "HISTORY*" \
       -o -name "AUTHORS" -o -name "CONTRIBUTORS" \
     \) -delete 2>/dev/null || true

# ---------- Stage 3: runtime ----------
FROM node:22-alpine AS runtime
WORKDIR /app

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=8080

# Usuario no-root por seguridad
RUN addgroup -S app && adduser -S app -G app

# Copiamos solo lo necesario del build
# dist/server/entry.mjs es el servidor standalone generado por @astrojs/node
COPY --from=builder --chown=app:app /app/dist ./dist
# Los CVs en markdown se leen en runtime desde src/content/cv/ (no se embeben).
COPY --from=builder --chown=app:app /app/src/content/cv ./src/content/cv
COPY --from=builder --chown=app:app /app/node_modules ./node_modules
COPY --from=builder --chown=app:app /app/package.json ./package.json

USER app

EXPOSE 8080

# Healthcheck: el server responde 200 en / cuando Astro está funcionando.
# Usamos 127.0.0.1 en lugar de localhost para evitar que wget resuelva a
# IPv6 ([::1]) cuando el server solo escucha en IPv4 (0.0.0.0).
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://127.0.0.1:8080/ || exit 1

CMD ["node", "./dist/server/entry.mjs"]
