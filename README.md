# 🎓 Teacher Management Application

A full-stack web application to manage teachers, their details, and payment statistics. Built with a modern Node.js backend (NestJS) and a Vue.js frontend.

---

## Features
- Add, edit, and delete teachers
- View a list of all teachers
- Visualize payment statistics (total, max, min) with a dynamic chart
- Responsive and user-friendly interface

## Tech Stack
- **Backend:** [NestJS](https://nestjs.com/) (Node.js, TypeScript)
- **Frontend:** [Vue.js 3](https://vuejs.org/) (TypeScript, Composition API)
- **Charting:** [Chart.js](https://www.chartjs.org/)

## Getting Started

### Backend
1. Go to the backend directory:
   ```bash
   cd sujet-7-backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the backend server:
   ```bash
   npm run start:dev
   ```

### Frontend
1. Go to the frontend directory:
   ```bash
   cd sujet-7-frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend server:
   ```bash
   npm run dev
   ```

The frontend will typically be available at [http://localhost:5173](http://localhost:5173) and the backend at [http://localhost:3000](http://localhost:3000).

## License

This project is for educational purposes.

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

Create a `.env` file at the root of the project:

```env
DB_TYPE=postgres
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_NAME=your_database
```

### 🛠 Database

1. Create the database:

```bash
createdb your_database
```

2. Run the migrations:

```bash
pnpm run migration:run
```

### 🚀 Launch the Application

```bash
# Development mode
pnpm run start:dev

# Production mode
pnpm run start:prod
```

### 🔄 Migrations

```bash
# Generate a migration
pnpm run migration:generate src/migrations/MigrationName

# Apply migrations
pnpm run migration:run

# Revert the last migration
pnpm run migration:revert
```

---

## 🔌 API Endpoints

| Method | Endpoint          | Description              |
|--------|-------------------|--------------------------|
| GET    | `/teachers`       | List all teachers        |
| GET    | `/teachers/:id`   | Get teacher details      |
| POST   | `/teachers`       | Create a teacher         |
| PATCH   | `/teachers/:id`   | Update a teacher         |
| DELETE  | `/teachers/:id`  | Delete a teacher         |

---

## ✅ Tests

```bash
pnpm run test       # Unit tests
pnpm run test:e2e   # End-to-end tests
pnpm run test:cov   # Test coverage
```

---