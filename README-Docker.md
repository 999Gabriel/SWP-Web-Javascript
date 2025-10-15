# 🐳 Docker Setup für Personen-Verwaltung

## 📋 Übersicht
Dieses Projekt kann mit Docker und OrbStack gehostet werden. Die Anwendung läuft auf nginx und ist für optimale Performance konfiguriert.

## 🚀 Schnellstart

### Mit Docker Compose (Empfohlen)
```bash
# Container starten
docker-compose up -d

# Anwendung öffnen
open http://localhost:8080
```

### Mit Docker direkt
```bash
# Image bauen
docker build -t personen-verwaltung .

# Container starten
docker run -d -p 8080:80 --name personen-app personen-verwaltung

# Anwendung öffnen
open http://localhost:8080
```

## 🔧 OrbStack Integration

### 1. OrbStack installieren
- [OrbStack herunterladen](https://orbstack.dev/)
- Installation durchführen

### 2. Projekt in OrbStack importieren
```bash
# Im Projektverzeichnis
docker-compose up -d
```

### 3. Container in OrbStack verwalten
- OrbStack öffnen
- Container "personen-verwaltung" finden
- Starten/Stoppen/Neustarten

## 📁 Projektstruktur
```
SWP-Web/
├── code/
│   ├── html/
│   │   └── personen-DOM.html
│   ├── css/
│   │   └── style-DOM.css
│   └── js/
│       └── js.DOM.js
├── Dockerfile
├── docker-compose.yml
├── .dockerignore
└── README-Docker.md
```

## ⚙️ Konfiguration

### Ports
- **Host**: 8080
- **Container**: 80

### Umgebungsvariablen
- `NGINX_HOST=localhost`
- `NGINX_PORT=80`

### Volumes
- `./logs:/var/log/nginx` - Logs werden auf dem Host gespeichert

## 🛠️ Nützliche Befehle

### Container verwalten
```bash
# Status prüfen
docker-compose ps

# Logs anzeigen
docker-compose logs -f

# Container stoppen
docker-compose down

# Container neu bauen
docker-compose up --build -d
```

### Debugging
```bash
# In Container einsteigen
docker exec -it personen-verwaltung sh

# Nginx-Konfiguration prüfen
docker exec personen-verwaltung nginx -t

# Logs in Echtzeit
docker-compose logs -f personen-app
```

## 🔍 Features

### Nginx-Optimierungen
- ✅ Gzip-Kompression
- ✅ Caching für statische Assets
- ✅ Sicherheits-Headers
- ✅ Healthcheck

### Docker-Features
- ✅ Multi-Stage Build
- ✅ Alpine Linux (minimal)
- ✅ Healthcheck
- ✅ Restart-Policy
- ✅ Volume-Mounting

## 🐛 Troubleshooting

### Port bereits belegt
```bash
# Anderen Port verwenden
docker-compose up -d --scale personen-app=0
# In docker-compose.yml Port ändern: "8081:80"
docker-compose up -d
```

### Container startet nicht
```bash
# Logs prüfen
docker-compose logs personen-app

# Container neu bauen
docker-compose down
docker-compose up --build -d
```

### Dateien werden nicht aktualisiert
```bash
# Container neu bauen
docker-compose up --build -d
```

## 📊 Performance

### Optimierungen
- **Nginx**: Effizienter als Node.js für statische Dateien
- **Alpine Linux**: Minimales Image (~15MB)
- **Gzip**: Komprimierung für kleinere Übertragung
- **Caching**: Statische Assets werden gecacht

### Monitoring
```bash
# Ressourcenverbrauch
docker stats personen-verwaltung

# Container-Details
docker inspect personen-verwaltung
```

## 🔒 Sicherheit

### Implementierte Maßnahmen
- ✅ X-Frame-Options
- ✅ X-Content-Type-Options
- ✅ X-XSS-Protection
- ✅ Referrer-Policy
- ✅ Non-root User (nginx)

## 📝 Logs

### Log-Speicherung
- Logs werden in `./logs/` gespeichert
- Automatische Rotation durch nginx
- Zugriff über `docker-compose logs`

## 🎯 Nächste Schritte

### Erweiterungen
1. **HTTPS**: SSL-Zertifikat hinzufügen
2. **Domain**: Eigene Domain konfigurieren
3. **Monitoring**: Prometheus/Grafana
4. **CI/CD**: GitHub Actions für automatisches Deployment

### Entwicklung
1. **Hot-Reload**: Volume-Mount für Entwicklung
2. **Debugging**: Source-Maps aktivieren
3. **Testing**: Jest-Integration

---

**Viel Erfolg mit deiner Personen-Verwaltung! 🚀**
