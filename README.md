# GigScore

GigScore is a full-stack web application for gig workers and freelancers to track performance across platforms, monitor score trends, and get AI-assisted guidance.

## Highlights

- JWT-based authentication (register/login)
- Unified dashboard for earnings, jobs, ratings, and activity days
- Add gig events from multiple platforms
- Score computation with weighted/exponent formula
- Score history chart and breakdown
- Built-in AI chat assistant for score guidance
- Light/Dark theme toggle with persistent preference

## Tech Stack

### Frontend
- React 18 + Vite
- Tailwind CSS
- Recharts
- Axios
- React Router

### Backend
- Spring Boot 4
- Java 21
- Spring Security + JWT
- Spring Data JPA
- MySQL

## Project Structure

```text
GigScore/
  backend/gigscore/        Spring Boot API
  frontend/                React app
  README.md
```

## Prerequisites

- Java 21+
- Maven 3.8+
- Node.js 18+
- MySQL 8+

## Environment Configuration

This repository is configured to avoid hardcoded secrets.

Use environment variables (recommended), or create local env files that are not committed.

### Backend variables

- DB_USERNAME
- DB_PASSWORD
- SPRING_SECURITY_USER
- SPRING_SECURITY_PASSWORD
- JWT_SECRET
- GEMINI_API_KEY
- GEMINI_MODEL

Reference template:

- backend/gigscore/.env.example

## Local Setup

### 1) Database

Create database in MySQL:

```sql
CREATE DATABASE gigscore;
```

### 2) Run Backend

```bash
cd backend/gigscore
mvnw.cmd spring-boot:run
```

Backend runs on:

- http://127.0.0.1:8080

### 3) Run Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

- http://127.0.0.1:5173

## Build Commands

### Backend build

```bash
cd backend/gigscore
mvnw.cmd clean package
```

### Frontend build

```bash
cd frontend
npm run build
```

## Key API Endpoints

### Auth
- POST /api/users
- POST /api/users/login

### Dashboard / Data
- GET /api/users/{userId}
- POST /api/gigs
- GET /api/activity/{userId}
- GET /score/{userId}

### AI Chat
- POST /api/chat/ask

## Security Notes Before GitHub Push

- Never commit real API keys, DB passwords, or JWT secrets
- Keep only placeholders in tracked files
- Rotate any key that was previously committed
- Ensure .env files are ignored by git

## GitHub Push Checklist

- Remove hardcoded credentials (done)
- Verify no secrets in tracked files
- Add/update .env locally
- Commit and push

## License

This project is currently unlicensed. Add a LICENSE file if you plan to open-source it.
