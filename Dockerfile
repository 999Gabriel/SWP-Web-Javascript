# =====================================================================================
# 🐳 DOCKERFILE FÜR JAVASCRIPT PERSONEN-VERWALTUNG
# =====================================================================================
# Multi-Stage Build für optimale Performance und Sicherheit

# ===== STAGE 1: BUILD STAGE =====
# Verwende Node.js für eventuelle Build-Prozesse (falls du später Webpack etc. hinzufügst)
FROM node:18-alpine AS builder

# Arbeitsverzeichnis setzen
WORKDIR /app

# Package.json erstellen (für zukünftige Erweiterungen)
RUN echo '{"name": "personen-verwaltung", "version": "1.0.0", "description": "JavaScript Personen-Verwaltung mit DOM-Manipulation", "main": "code/js/js.DOM.js", "scripts": {"start": "echo Server läuft auf Port 80"}, "dependencies": {}}' > package.json

# ===== STAGE 2: PRODUCTION STAGE =====
# Verwende nginx für statische Dateien (viel effizienter als Node.js für statische Inhalte)
FROM nginx:alpine

# Metadaten für das Image
LABEL maintainer="Gabriel"
LABEL description="JavaScript Personen-Verwaltung mit DOM-Manipulation"
LABEL version="1.0.0"

# ===== NGINX KONFIGURATION =====
# Erstelle nginx.conf für optimale Performance
RUN echo 'server { \
    listen 80; \
    server_name localhost; \
    root /usr/share/nginx/html; \
    index index.html; \
    \
    # Gzip-Kompression aktivieren \
    gzip on; \
    gzip_vary on; \
    gzip_min_length 1024; \
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json; \
    \
    # Caching für statische Assets \
    location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg)$ { \
        expires 1y; \
        add_header Cache-Control "public, immutable"; \
    } \
    \
    # HTML-Dateien nicht cachen \
    location ~* \.html$ { \
        expires -1; \
        add_header Cache-Control "no-cache, no-store, must-revalidate"; \
    } \
    \
    # Fallback für SPA (falls du später eine Single Page App machst) \
    location / { \
        try_files $uri $uri/ /personen-DOM.html; \
    } \
    \
    # Sicherheits-Headers \
    add_header X-Frame-Options "SAMEORIGIN" always; \
    add_header X-Content-Type-Options "nosniff" always; \
    add_header X-XSS-Protection "1; mode=block" always; \
    add_header Referrer-Policy "strict-origin-when-cross-origin" always; \
}' > /etc/nginx/conf.d/default.conf

# ===== DATEIEN KOPIEREN =====
# Kopiere alle Projektdateien in den nginx-Container
COPY . /usr/share/nginx/html/

# ===== BERECHTIGUNGEN SETZEN =====
# Stelle sicher, dass nginx auf die Dateien zugreifen kann
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

# ===== GESUNDHEITSPRÜFUNG =====
# Erstelle ein Healthcheck-Script
RUN echo '#!/bin/sh \
curl -f http://localhost/ || exit 1' > /healthcheck.sh && \
chmod +x /healthcheck.sh

# Healthcheck konfigurieren
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD /healthcheck.sh

# ===== PORT EXPONIEREN =====
# Exponiere Port 80 für HTTP-Traffic
EXPOSE 80

# ===== STARTBEFEHL =====
# Starte nginx im Vordergrund
CMD ["nginx", "-g", "daemon off;"]

# =====================================================================================
# 🚀 BUILD UND RUN BEFEHLE:
# =====================================================================================
# 
# 1. Image bauen:
#    docker build -t personen-verwaltung .
#
# 2. Container starten:
#    docker run -d -p 8080:80 --name personen-app personen-verwaltung
#
# 3. Mit OrbStack:
#    - Image in OrbStack importieren
#    - Container starten mit Port-Mapping 8080:80
#    - App erreichbar unter: http://localhost:8080
#
# 4. Container stoppen:
#    docker stop personen-app
#
# 5. Container entfernen:
#    docker rm personen-app
#
# =====================================================================================
