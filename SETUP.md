# Setup Guide

## Prerequisites
- Node.js (v18+)
- PostgreSQL Database
- Git

## 1. Database Setup
1. Ensure PostgreSQL is running.
2. Create a database named `civilbuild_erp`.
   ```sql
   CREATE DATABASE civilbuild_erp;
   ```
3. Update `server/.env` with your database credentials if different from default (`user:password@localhost:5432`).

## 2. Backend Setup
1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server (Development Mode):
   ```bash
   npm run dev
   ```
   - The server runs on `http://localhost:5000`.
   - **Important**: On first run, if `DATA_SOURCE=mock` in `.env`, the system will use the seeder mechanism.
   - To force seed data manually, you can trigger the sync endpoint:
     ```bash
     curl -X POST http://localhost:5000/api/sync
     ```
     Or wait for the cron job (runs hourly).

## 3. Frontend Setup
1. Navigate to the client directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser at `http://localhost:5173`.

## 4. Features & Usage
- **Login**: Use any email/password (Dummy login for now).
- **Dashboard**: View KPI cards, Financial Overview, and Project Progress charts.
- **Projects**: Go to the Projects tab to view a sortable/filterable list of projects.
- **Data Source**:
  - `DATA_SOURCE=mock`: Uses generated dummy data.
  - `DATA_SOURCE=civitbuild`: Stubs for real API integration.

## 5. Mock Data Generation
The system includes a generator script `server/src/utils/seeder.js` that uses `faker` to generate:
- 50 Projects
- 20 Clients
- 300 Finance Records
- 100 Employees
- 500 Inventory Items

This runs automatically when `DATA_SOURCE=mock` via the sync service.
