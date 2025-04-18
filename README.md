# 🎓 Teacher Management Application

<p align="center">
  <a href="https://nestjs.com/" target="_blank">
    <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="NestJS Logo" />
  </a>
</p>

<p align="center">
  A progressive <a href="https://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.
</p>

<p align="center">
  <a href="https://www.npmjs.com/~nestjscore" target="_blank">
    <img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" />
  </a>
  <a href="https://www.npmjs.com/~nestjscore" target="_blank">
    <img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="License" />
  </a>
  <a href="https://www.npmjs.com/~nestjscore" target="_blank">
    <img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="Downloads" />
  </a>
  <a href="https://circleci.com/gh/nestjs/nest" target="_blank">
    <img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" />
  </a>
  <a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank">
    <img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master" alt="Coverage" />
  </a>
  <a href="https://discord.gg/G7Qnnhy" target="_blank">
    <img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord" />
  </a>
</p>

---

## 🧠 Description

NestJS backend application for managing teacher records, paired with a Vue 3 frontend.  
The backend provides a RESTful API to handle CRUD operations.

---

## ⚙️ Features

- CRUD operations for teachers
- PostgreSQL database with TypeORM
- Database migrations
- Environment variable configuration
- Input validation and error handling
- Frontend in Vue 3 with Vite

---

## 📦 Backend - NestJS

### 🧰 Prerequisites

- Node.js v18+
- `pnpm` package manager
- PostgreSQL

### 📥 Installation

```bash
pnpm install
```

### ⚙️ Configuration

Créez un fichier `.env` à la racine du projet :

```env
DB_TYPE=postgres
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_NAME=your_database
```

### 🛠 Base de données

1. Créer la base de données :

```bash
createdb your_database
```

2. Exécuter les migrations :

```bash
pnpm run migration:run
```

### 🚀 Lancer l’application

```bash
# En développement
pnpm run start:dev

# En production
pnpm run start:prod
```

### 🔄 Migrations

```bash
# Générer une migration
pnpm run migration:generate src/migrations/NomMigration

# Appliquer les migrations
pnpm run migration:run

# Annuler la dernière migration
pnpm run migration:revert
```

---

## 🔌 API Endpoints

| Méthode | Endpoint        | Description              |
|---------|------------------|--------------------------|
| GET     | `/teachers`      | Liste des enseignants    |
| GET     | `/teachers/:id`  | Détails d’un enseignant  |
| POST    | `/teachers`      | Créer un enseignant      |
| PATCH   | `/teachers/:id`  | Modifier un enseignant   |
| DELETE  | `/teachers/:id`  | Supprimer un enseignant  |

---

## ✅ Tests

```bash
pnpm run test       # Tests unitaires
pnpm run test:e2e   # Tests end-to-end
pnpm run test:cov   # Couverture des tests
```

---