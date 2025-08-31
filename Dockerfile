# Etapa 1: Build de Astro
FROM node:20-alpine AS builder
WORKDIR /app
COPY . .
RUN npm install
ENV NODE_ENV=production
RUN npm run build

# Etapa 2: Imagen final con Nginx
FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80