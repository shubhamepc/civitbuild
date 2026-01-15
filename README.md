# CivilBuild ERP Analytics Dashboard

This repository contains the source code for the custom ERP analytics dashboard integrated with CivitBUILD.

## Directory Structure

- **server/**: Node.js backend handling API requests, database synchronization, and cron jobs.
- **client/**: React frontend for the dashboard UI.
- **docs/**: Documentation including Architecture and Deployment guides.

## Quick Start

### Prerequisites
- Node.js (v18+)
- PostgreSQL Database

### 1. Setup Backend
```bash
cd server
npm install
# Configure .env file (copy from .env.example if available, or use the provided .env)
npm run dev
```
Server runs on `http://localhost:5000`.

### 2. Setup Frontend
```bash
cd client
npm install
npm run dev
```
Client runs on `http://localhost:5173`.

## Features implemented
- **Backend Architecture**: Express + Sequelize + PostgreSQL.
- **Data Sync**: Dedicated service to mock/fetch data from CivitBUILD APIs.
- **Scheduler**: Cron job set up for hourly sync.
- **Frontend UI**: Modern Dashboard with Tailwind CSS, Recharts for analytics.
- **Layout**: Responsive Sidebar/Navbar layout.

## Documentation
See `docs/ARCHITECTURE.md` for detailed system design and database schema.
