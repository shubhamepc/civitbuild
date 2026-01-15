# Integration Guide: Connecting to Real CivilBuild ERP

This guide explains how to switch the dashboard from **Mock Mode** to **Live Mode** integrated with CivilBuild ERP APIs.

## 1. Environment Configuration
Open `server/.env` and update the following variables:

```ini
# Switch to Live Mode
DATA_SOURCE=civitbuild

# Real Database (Switch from SQLite to Postgres for functionality)
# Ensure you are using the PostgreSQL connection string
DATABASE_URL=postgres://user:password@production-db-host:5432/civilbuild_erp

# CivilBuild API Credentials
CIVIT_API_URL=https://api.civitbuild.com/v1
CIVIT_CLIENT_ID=your_actual_client_id
CIVIT_CLIENT_SECRET=your_actual_client_secret
```

## 2. API Implementation (`server/src/services/civitService.js`)
You need to replace the placeholder logic in `civitService.js` with actual HTTP requests.

### Authentication
Implement the token fetching logic provided by CivilBuild (usually OAuth2 or API Key).

```javascript
async authenticate() {
  try {
    const response = await axios.post(`${this.baseUrl}/auth/token`, {
      client_id: process.env.CIVIT_CLIENT_ID,
      client_secret: process.env.CIVIT_CLIENT_SECRET
    });
    this.token = response.data.access_token;
  } catch (error) {
    console.error('Auth Failed:', error);
  }
}
```

### Data Sync
Update `syncProjects` (and other sync functions) to fetch data using the token.

```javascript
async syncProjects() {
  if (this.dataSource === 'civitbuild') {
     await this.authenticate();
     
     // 1. Fetch from API
     const response = await axios.get(`${this.baseUrl}/projects`, {
       headers: { Authorization: `Bearer ${this.token}` }
     });
     
     // 2. Map & Upsert to DB
     const projects = response.data.map(apiProj => ({
       id: apiProj.projectId,        // Map external field
       name: apiProj.projectName,    // Map external field
       status: apiProj.currentStatus
       // ... map other fields
     }));
     
     await Project.bulkCreate(projects, { updateOnDuplicate: ['name', 'status', 'budget'] });
  }
}
```

## 3. Field Mapping
Use `server/src/config/civitbuild.map.json` to maintain a mapping between CivitBUILD's API response fields and our database columns. This keeps the code clean if API field names change.

## 4. Scheduler
The Cron job in `server/src/services/cron.js` is already set to run `syncProjects()` every hour. You can adjust the frequency there.

```javascript
// Run every 15 minutes
cron.schedule('*/15 * * * *', async () => { ... });
```

## 5. Deployment
When deploying to production:
1. Ensure the PostgreSQL database is provisioned.
2. Set `NODE_ENV=production`.
3. Use a process manager like **PM2** to keep the sync service running.
