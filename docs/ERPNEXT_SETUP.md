# ERPNext Integration Setup Guide

## 📋 Overview

This guide will help you integrate ERPNext as a data source for the CivitBuild ERP Analytics Dashboard.

---

## 🎯 What is ERPNext?

ERPNext is an open-source ERP system that provides comprehensive business management features. We're using it as a temporary data source for development and demo purposes before switching to CivitBUILD APIs.

---

## 🚀 Quick Start

### Option 1: Use ERPNext Demo Instance (Easiest)

ERPNext provides a free demo instance that resets daily. Perfect for testing!

**Demo URL**: https://demo.erpnext.com

**Credentials**:
- Username: `Administrator`
- Password: `admin`

**Note**: The demo instance resets every 24 hours, so data will be refreshed daily.

### Option 2: Use Your Own ERPNext Instance

If you have your own ERPNext instance, you can use it instead.

---

## 🔑 Getting API Credentials

### Step 1: Login to ERPNext

1. Go to your ERPNext instance (e.g., https://demo.erpnext.com)
2. Login with your credentials

### Step 2: Generate API Keys

1. Click on your profile picture (top right)
2. Go to **"My Settings"**
3. Scroll down to **"API Access"** section
4. Click **"Generate Keys"**
5. Copy both:
   - **API Key**
   - **API Secret**

**Important**: Save these securely! The API Secret is shown only once.

### Step 3: Configure Environment Variables

Update your `server/.env` file:

```bash
# ERPNext Configuration
ERPNEXT_API_URL=https://demo.erpnext.com
ERPNEXT_API_KEY=your_api_key_here
ERPNEXT_API_SECRET=your_api_secret_here

# Set data source to erpnext
DATA_SOURCE=erpnext
```

---

## 📊 Available ERPNext Resources

Our integration fetches data from these ERPNext modules:

| ERPNext Resource | Maps To | Description |
|-----------------|---------|-------------|
| **Project** | Projects | Construction/project management |
| **Customer** | Clients | Customer/client information |
| **Sales Invoice** | Finance Records | Revenue/income transactions |
| **Payment Entry** | Finance Records | Payment receipts and disbursements |
| **Employee** | Employees | Staff/employee information |
| **Item** | Inventory Items | Stock/inventory management |
| **Purchase Order** | Purchase Orders | Procurement orders |
| **Supplier** | Vendors | Supplier/vendor information |

---

## 🔄 How Data Sync Works

### 1. **Initial Sync**

When you start the server with `DATA_SOURCE=erpnext`:

```bash
cd server
npm run dev
```

The system will:
1. Connect to ERPNext API
2. Fetch all resources
3. Map ERPNext fields to internal schema
4. Store normalized data in PostgreSQL

### 2. **Scheduled Sync**

After initial sync, the system automatically syncs every hour using cron jobs.

### 3. **Manual Sync**

You can trigger a manual sync:

```bash
curl -X POST http://localhost:5000/api/sync
```

Or from the dashboard (if implemented).

---

## 🗺️ Field Mapping

The system uses `server/src/config/erpnext.map.json` for field mapping.

### Example: Project Mapping

**ERPNext Project** → **Internal Project**

```json
{
  "name": "externalId",
  "project_name": "name",
  "status": "status",
  "expected_start_date": "startDate",
  "expected_end_date": "endDate",
  "estimated_costing": "budget",
  "percent_complete": "progress"
}
```

### Status Transformations

ERPNext statuses are automatically transformed:

**Projects**:
- `Open` → `In Progress`
- `Completed` → `Completed`
- `Cancelled` → `On Hold`
- `Template` → `Planning`

**Purchase Orders**:
- `Draft` → `Pending`
- `Submitted` → `Pending`
- `Closed` → `Completed`
- `Cancelled` → `Cancelled`

---

## 🧪 Testing the Integration

### 1. **Check Connection**

```bash
# Test ERPNext API connection
curl -H "Authorization: token YOUR_API_KEY:YOUR_API_SECRET" \
     https://demo.erpnext.com/api/resource/Project
```

### 2. **Start Server**

```bash
cd server
npm run dev
```

Expected output:
```
Data source: erpnext
Syncing customers from ERPNext...
Synced 15 customers from ERPNext
Syncing projects from ERPNext...
Synced 8 projects from ERPNext
...
```

### 3. **Verify Data**

Open your dashboard at `http://localhost:5173` and check:
- Projects are visible
- Finance data is populated
- Inventory items are showing
- Employee information is available

---

## 📝 API Endpoints Reference

### ERPNext REST API Format

```
GET /api/resource/{DocType}
GET /api/resource/{DocType}/{name}
```

### Example Requests

**Get all projects**:
```bash
GET https://demo.erpnext.com/api/resource/Project
```

**Get specific project**:
```bash
GET https://demo.erpnext.com/api/resource/Project/PROJ-0001
```

**With filters**:
```bash
GET https://demo.erpnext.com/api/resource/Project?filters=[["status","=","Open"]]
```

**With specific fields**:
```bash
GET https://demo.erpnext.com/api/resource/Project?fields=["name","project_name","status"]
```

---

## 🔧 Troubleshooting

### Issue: "Authentication Failed"

**Solution**:
1. Verify API Key and Secret are correct
2. Check if keys are properly set in `.env`
3. Ensure no extra spaces in credentials
4. Try regenerating API keys

### Issue: "No Data Synced"

**Solution**:
1. Check if ERPNext instance has data
2. Verify network connectivity
3. Check server logs for errors
4. Ensure `DATA_SOURCE=erpnext` is set

### Issue: "Rate Limit Exceeded"

**Solution**:
1. ERPNext has rate limits (usually 100 requests/hour for demo)
2. Reduce sync frequency
3. Use your own ERPNext instance for higher limits

### Issue: "Field Mapping Errors"

**Solution**:
1. Check `erpnext.map.json` for correct field names
2. Verify ERPNext version compatibility
3. Check server logs for specific field errors

---

## 🔄 Switching Data Sources

### Switch to ERPNext

```bash
# In server/.env
DATA_SOURCE=erpnext
```

Restart server:
```bash
npm run dev
```

### Switch to Mock Data

```bash
# In server/.env
DATA_SOURCE=mock
```

### Switch to CivitBUILD (Future)

```bash
# In server/.env
DATA_SOURCE=civitbuild
CIVIT_API_URL=https://api.civitbuild.com/v1
```

---

## 📊 Data Flow Diagram

```
ERPNext API
    ↓
ERPNext Service (erpnextService.js)
    ↓
Field Mapping (erpnext.map.json)
    ↓
PostgreSQL Database
    ↓
Dashboard API
    ↓
React Frontend
```

---

## 🎯 Best Practices

### 1. **Use Demo for Development**
- Use ERPNext demo instance for local development
- No setup required
- Fresh data daily

### 2. **Use Own Instance for Production**
- Set up your own ERPNext instance
- Better control over data
- No rate limits
- Data persistence

### 3. **Monitor Sync Logs**
- Check server logs regularly
- Monitor sync success/failure
- Track data quality

### 4. **Test Before Switching**
- Test ERPNext integration thoroughly
- Verify all data types sync correctly
- Check dashboard displays correctly

---

## 📚 Additional Resources

- **ERPNext Documentation**: https://docs.erpnext.com
- **ERPNext API Docs**: https://frappeframework.com/docs/user/en/api
- **ERPNext Demo**: https://demo.erpnext.com
- **ERPNext Forum**: https://discuss.erpnext.com

---

## 🆘 Support

If you encounter issues:

1. Check server logs: `server/logs/`
2. Review ERPNext API documentation
3. Test API endpoints with Postman
4. Check field mapping configuration

---

## ✅ Checklist

Before going live with ERPNext integration:

- [ ] API credentials configured
- [ ] Environment variables set
- [ ] Initial sync completed successfully
- [ ] All resources syncing correctly
- [ ] Dashboard displaying data
- [ ] Cron jobs running
- [ ] Error handling tested
- [ ] Logs monitored

---

**Ready to integrate!** 🚀

Set `DATA_SOURCE=erpnext` in your `.env` file and restart the server.
