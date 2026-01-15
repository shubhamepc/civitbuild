# ERP Analytics Dashboard - System Architecture & Design

## 1. System Architecture

The system follows a typical 3-tier architecture:

```mermaid
graph TD
    User[User (Browser)] -->|HTTPS| Frontend[Frontend (React + Vite)]
    Frontend -->|REST API| Backend[Backend (Node.js + Express)]
    Backend -->|SQL| DB[(PostgreSQL Database)]
    Backend -->|REST API + Auth Token| CivitBuild[CivitBUILD ERP API]
    Cron[Cron Scheduler] -->|Triggers| SyncService[Data Sync Service]
    SyncService -->|Fetch Data| CivitBuild
    SyncService -->|Upsert Data| DB
```

### Components:
- **Frontend**: Single Page Application (SPA) built with React and Vite. Uses Tailwind CSS for styling and Recharts for visualization.
- **Backend**: RESTful API server built with Node.js and Express. Handles authentication, data aggregation, and background synchronization.
- **Database**: PostgreSQL relational database storing synced data, user credentials, and audit logs.
- **Integration Layer**: A dedicated service module in the backend responsible for communicating with CivitBUILD APIs, handling rate limits, and transforming data.

## 2. Database Schema

```sql
-- Users & Roles
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'viewer', -- 'admin', 'manager', 'viewer'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Audit Logs
CREATE TABLE audit_logs (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    action VARCHAR(255) NOT NULL,
    details JSONB,
    ip_address VARCHAR(45),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Projects
CREATE TABLE projects (
    id VARCHAR(255) PRIMARY KEY, -- ID from CivitBUILD
    name VARCHAR(255) NOT NULL,
    status VARCHAR(50),
    start_date DATE,
    end_date DATE,
    budget DECIMAL(15, 2),
    client_name VARCHAR(255),
    last_synced_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Finance / Transactions
CREATE TABLE finance_records (
    id VARCHAR(255) PRIMARY KEY,
    project_id VARCHAR(255) REFERENCES projects(id),
    type VARCHAR(50), -- 'invoice', 'payment', 'expense'
    amount DECIMAL(15, 2),
    date DATE,
    status VARCHAR(50),
    description TEXT
);

-- Inventory
CREATE TABLE inventory_items (
    id VARCHAR(255) PRIMARY KEY,
    project_id VARCHAR(255) REFERENCES projects(id),
    item_name VARCHAR(255),
    quantity DECIMAL(10, 2),
    unit VARCHAR(20),
    cost_per_unit DECIMAL(15, 2)
);

-- Sync History
CREATE TABLE sync_history (
    id SERIAL PRIMARY KEY,
    module VARCHAR(50),
    status VARCHAR(20), -- 'success', 'failed'
    records_processed INT,
    error_message TEXT,
    started_at TIMESTAMP,
    completed_at TIMESTAMP
);
```

## 3. API Integration Strategy

### Authentication
- Store CivitBUILD API credentials (Client ID/Secret or API Key) in environment variables.
- Use a `TokenManager` class to handle token retrieval, storage, and automatic refresh before expiration.

### Synchronization (Data Sync)
- **Strategy**: Incremental Sync where possible (using `updated_after` filters), otherwise standard Full Sync for smaller datasets.
- **Scheduler**: `node-cron` runs jobs at configured intervals (e.g., every hour or nightly).
- **Error Handling**: Retry mechanism with exponential backoff for network failures. Failed syncs are logged to `sync_history`.

## 4. Security
- **JWT Authentication**: Secure stateless authentication for the dashboard.
- **Password Hashing**: Bcrypt for user passwords.
- **RBAC**: Middleware to check user roles for specific endpoints.
- **CORS**: Restricted to allowed domains.
- **Input Validation**: Joi or Zod for validating request data.

## 5. Deployment Steps

### Prerequisites
- Node.js v18+
- PostgreSQL v14+

### Backend Deployment
1. Navigate to `server/`.
2. Copy `.env.example` to `.env` and fill in DB credentials and API keys.
3. Run `npm install`.
4. Run `npm run migrate` (if using a migration tool) or execute `schema.sql`.
5. Run `npm start` (or use PM2: `pm2 start src/index.js --name "erp-backend"`).

### Frontend Deployment
1. Navigate to `client/`.
2. Copy `.env.example` to `.env` and set `VITE_API_URL`.
3. Run `npm install`.
4. Run `npm run build`.
5. Serve the `dist/` folder using Nginx, Apache, or a static host.

### Production Considerations
- Set `NODE_ENV=production`.
- Use a process manager like PM2 for the backend.
- Set up SSL/TLS (HTTPS).
- Configure firewall rules (UFW/AWS Security Groups).
