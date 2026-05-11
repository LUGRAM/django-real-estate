# Django Real Estate — Full-Stack Docker Project

Application immobilière full-stack conteneurisée avec Django REST Framework, Next.js 15, PostgreSQL, Redis et Celery.

---

## Table des matières

1. [Architecture du projet](#1-architecture-du-projet)
2. [Prérequis](#2-prérequis)
3. [Installation et lancement](#3-installation-et-lancement)
4. [URLs d'accès](#4-urls-daccès)
5. [Pipeline CI/CD](#5-pipeline-cicd)
6. [Choix techniques](#6-choix-techniques)
7. [Images Docker Hub](#7-images-docker-hub)
8. [Commandes utiles](#8-commandes-utiles)

---

## 1. Architecture du projet

```
┌─────────────────────────────────────────────────────────────────┐
│                         NAVIGATEUR / HÔTE                       │
│                        http://localhost:8080                    │
└──────────────────────────────┬──────────────────────────────────┘
                               │ :8080
                               ▼
                    ┌─────────────────────┐
                    │       NGINX         │  port 80
                    │   nginx:alpine      │
                    └────────┬────────────┘
                             │
              ┌──────────────┴──────────────┐
              │         app-network         │
              │                             │
         location /                  location /api/
              │                             │
              ▼                             ▼
   ┌──────────────────┐        ┌──────────────────────┐
   │    FRONTEND      │        │       BACKEND        │
   │  Next.js 15      │        │   Django 5 + DRF     │
   │  node:20-alpine  │        │  python:3.13-slim    │
   │  :3000           │        │  :8000               │
   └──────────────────┘        └──────────┬───────────┘
                                          │
                                  backend-network
                        ┌─────────────────┼─────────────────┐
                        ▼                 ▼                  ▼
           ┌──────────────────┐  ┌─────────────┐  ┌──────────────────┐
           │   POSTGRES-DB    │  │    REDIS    │  │     CELERY       │
           │ postgres:16-alp. │  │ redis:7-alp │  │  (image backend) │
           │  :5432           │  │  :6379      │  │  worker          │
           └──────────────────┘  └─────────────┘  └──────────────────┘
                    │
           volume: postgres_data
```

**Réseaux**
- `app-network`     : nginx ↔ frontend ↔ backend
- `backend-network` : backend ↔ postgres-db ↔ redis ↔ celery

> `postgres-db` et `redis` sont **invisibles** depuis `nginx` et `frontend`.
> Seul `backend` peut les atteindre, réduisant la surface d'attaque.

---

## 2. Prérequis

| Outil | Version minimale | Vérification |
|-------|-----------------|--------------|
| Docker | 24.x | `docker --version` |
| Docker Compose | v2.x (plugin) | `docker compose version` |
| Git | 2.x | `git --version` |

> Docker Compose v2 est intégré à Docker Desktop et au paquet `docker-compose-plugin` sur Linux.
> La commande est `docker compose` (sans tiret).

---

## 3. Installation et lancement

### Cloner le dépôt

```bash
git clone https://github.com/LUGRAM/django-real-estate.git
cd django-real-estate
```

### Configurer les variables d'environnement

```bash
cp .env.example .env
```

Éditer `.env` et renseigner au minimum :

```env
SECRET_KEY="votre-cle-secrete-django"
POSTGRES_PASSWORD=votre_mot_de_passe
```

### Lancer l'environnement de développement

```bash
docker compose up --build
```

L'option `--build` reconstruit les images si les Dockerfiles ont changé.
Supprimer `--build` pour les lancements suivants :

```bash
docker compose up
```

### Lancer en arrière-plan (detached)

```bash
docker compose up -d --build
```

---

## 4. URLs d'accès

| Service | URL | Description |
|---------|-----|-------------|
| Frontend | http://localhost:8080 | Interface Next.js (via Nginx) |
| API REST | http://localhost:8080/api/v1 | Django REST Framework |
| Admin Django | http://localhost:8080/admin | Back-office Django |
| API directe | http://localhost:8000 | Backend sans proxy (dev) |
| Frontend direct | http://localhost:3000 | Next.js sans proxy (dev) |

### Créer un superutilisateur Django

```bash
docker compose exec backend python manage.py createsuperuser
```

---

## 5. Pipeline CI/CD

Le fichier `.github/workflows/ci-cd.yml` définit 5 jobs exécutés à chaque `push` sur `main` ou `develop`.

```
push -> main / develop
         │
    ┌────┴─────┐
    ▼          ▼
backend-   frontend-        (Jobs 1 & 2 — parallèles)
 tests       tests
 + coverage  + lint
    │          │
    └────┬─────┘
         ▼
   sonarcloud                (Job 3 — analyse qualité du code)
   ├── Couverture Python (coverage.xml)
   └── Analyse JS/TS + quality gate
         │
         ▼
   security-scan             (Job 4 — sécurité)
   ├── CodeQL SAST (Python + JavaScript)
   ├── Trivy -> backend image (CRITICAL + HIGH)
   └── Trivy -> frontend image
         │
         ▼  (main uniquement)
   build-and-push            (Job 5)
   ├── lugram/django-backend:latest  + :<SHA>
   └── lugram/nextjs-frontend:latest + :<SHA>
```

### Job 1 — `backend-tests`

Lance les tests avec **pytest** + **pytest-cov** sur de vraies instances PostgreSQL 16 et Redis 7 (service containers GitHub Actions).
Génère un rapport `coverage.xml` transmis à SonarCloud via artifact GitHub Actions.

### Job 2 — `frontend-tests`

Installe les dépendances Node 20 et exécute `npm run lint` (ESLint via `eslint-config-next`).

### Job 3 — `sonarcloud`

- **SonarCloud** : analyse la qualité du code (bugs, code smells, duplications, couverture de tests).
- Utilise `sonar-project.properties` à la racine du projet.
- Le **Quality Gate** bloque le pipeline si le score descend sous le seuil défini sur sonarcloud.io.

### Job 4 — `security-scan`

- **CodeQL** : analyse statique du code source (Python + JavaScript). Résultats visibles dans l'onglet *Security* du dépôt GitHub.
- **Trivy** : scan des images Docker de production sur les CVE `CRITICAL` et `HIGH` ayant un correctif disponible (`ignore-unfixed: true`). Le pipeline échoue si des vulnérabilités corrigeables sont détectées.

### Job 5 — `build-and-push`

S'exécute **uniquement sur `main`** après validation de tous les scans.
Utilise le cache GitHub Actions (`type=gha`) pour réduire les temps de build.
Pousse deux tags par image : `:latest` et `:<SHA>` pour la traçabilité.

### Secrets GitHub requis

`Settings → Secrets and variables → Actions` :

| Secret | Valeur |
|--------|--------|
| `SONAR_TOKEN` | Token généré sur sonarcloud.io → *My Account → Security* |
| `SONAR_HOST_URL` | `https://sonarcloud.io` |
| `DOCKER_USERNAME` | `lugram` |
| `DOCKER_PASSWORD` | Token Docker Hub (`Account Settings → Security → New Access Token`) |

---

## 6. Choix techniques

### Images de base

| Service | Image | Raison |
|---------|-------|--------|
| Backend | `python:3.13-slim` | ~50 Mo vs ~900 Mo pour l'image complète |
| Frontend | `node:20-alpine` | ~7 Mo vs ~300 Mo pour node:20 |
| Postgres | `postgres:16-alpine` | Version LTS stable |
| Redis | `redis:7-alpine` | Dernière version stable |
| Nginx | `nginx:alpine` | Reverse proxy léger, ~25 Mo |

### Multi-stage builds

Les `Dockerfile.prod` utilisent deux stages :

- **Stage `builder`** : contient `build-essential`, `gcc`, headers de compilation — nécessaires pour compiler `psycopg2`, `cryptography`, `Pillow` (backend) et pour exécuter `next build` (frontend).
- **Stage final** : copie uniquement les artefacts compilés (wheels Python / `.next/standalone` Next.js). Aucun outil de build dans l'image de production.

### Isolation réseau

Deux réseaux Docker bridge séparés :

- `backend-network` : données sensibles (base de données, cache, workers)
- `app-network` : trafic HTTP public (proxy ↔ frontend/backend)

`postgres-db` et `redis` ne sont jamais accessibles depuis `nginx` ou `frontend`.

### Volume nommé `node_modules_frontend`

```yaml
volumes:
  - ./client:/app                          # bind mount du code source
  - node_modules_frontend:/app/node_modules  # volume nommé Docker
```

Le bind mount `./client:/app` écraserait le `node_modules` installé lors du build.
Un **volume nommé** Docker est monté par-dessus et préserve les packages installés dans le container.

Avantages du volume nommé vs volume anonyme :
- Persistance entre les redémarrages sans rebuild
- Pas d'erreur `ENOTEMPTY` sur Windows (overlay fs) lors de `npm install`
- Inspecté et géré via `docker volume ls` / `docker volume inspect`

### Celery séparé du backend

Même image Docker, commande différente. Avantages :

- Scalable indépendamment : `docker compose up --scale celery=3`
- Isolation des crashs : un worker qui plante ne tue pas l'API
- Logs distincts par service

### Utilisateurs non-root

Les containers de production `backend` (`django`) et `frontend` (`nextjs`) tournent sous des utilisateurs système sans shell, conformément aux bonnes pratiques de sécurité Docker.

---

## 7. Images Docker Hub

| Image | Lien |
|-------|------|
| Backend Django | https://hub.docker.com/r/lugram/django-backend |
| Frontend Next.js | https://hub.docker.com/r/lugram/nextjs-frontend |

Utiliser directement depuis Docker Hub :

```bash
docker pull lugram/django-backend:latest
docker pull lugram/nextjs-frontend:latest
```

---

## 8. Commandes utiles

### Logs

```bash
# Suivre les logs d'un service en temps réel
docker compose logs -f backend

# Logs de tous les services
docker compose logs -f

# 50 dernières lignes du frontend
docker compose logs --tail=50 frontend
```

### Base de données

```bash
# Appliquer les migrations
docker compose exec backend python manage.py migrate

# Créer un superutilisateur
docker compose exec backend python manage.py createsuperuser

# Shell Django interactif
docker compose exec backend python manage.py shell

# Accéder à psql directement
docker compose exec postgres-db psql -U admin -d estate
```

### Gestion des conteneurs

```bash
# Arrêter tous les services
docker compose down

# Arrêter et supprimer les volumes (SUPPRIME LES DONNÉES)
docker compose down -v

# Reconstruire une seule image
docker compose build backend

# Redémarrer un service sans rebuild
docker compose restart frontend

# Ouvrir un shell dans un container
docker compose exec backend sh
docker compose exec frontend sh
```

### Maintenance

```bash
# État des services
docker compose ps

# Nettoyer images et volumes inutilisés
docker system prune -f

# Collecter les static files Django
docker compose exec backend python manage.py collectstatic --noinput

# Scaler les workers Celery
docker compose up --scale celery=3
```
