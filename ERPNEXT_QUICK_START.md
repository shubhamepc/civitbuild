# 🚀 ERPNext Integration - Quick Reference

## ⚡ Quick Start (5 Minutes)

### Step 1: Update Environment Variables

Edit `server/.env`:

```bash
DATA_SOURCE=erpnext
ERPNEXT_API_URL=https://demo.erpnext.com
ERPNEXT_API_KEY=your_api_key_here
ERPNEXT_API_SECRET=your_api_secret_here
```

### Step 2: Restart Server

```bash
cd server
npm run dev
```

### Step 3: Verify

Check logs for:
```
Data source: erpnext
Syncing customers from ERPNext...
Synced 15 customers from ERPNext
```

---

## 🔑 Getting API Credentials

### Option 1: Use Demo (No Credentials Needed)

For testing, you can use the demo instance without credentials:

```bash
DATA_SOURCE=erpnext
ERPNEXT_API_URL=https://demo.erpnext.com
# Leave API_KEY and API_SECRET empty for demo
```

**Note**: Limited to public data only.

### Option 2: Generate Your Own Keys

1. Login to ERPNext: https://demo.erpnext.com
2. Username: `Administrator`
3. Password: `admin`
4. Go to: Profile → My Settings → API Access
5. Click "Generate Keys"
6. Copy API Key and API Secret

---

## 📊 What Gets Synced

| Resource | Count (Demo) | Sync Time |
|----------|--------------|-----------|
| Customers | ~15 | 2-3 sec |
| Suppliers | ~10 | 1-2 sec |
| Projects | ~8 | 2-3 sec |
| Employees | ~20 | 3-4 sec |
| Items | ~50 | 5-6 sec |
| Sales Invoices | ~30 | 4-5 sec |
| Payment Entries | ~25 | 3-4 sec |
| Purchase Orders | ~15 | 2-3 sec |

**Total Initial Sync**: ~25-30 seconds

---

## 🔄 Sync Behavior

### Initial Sync
- Runs when server starts
- Fetches all resources
- Stores in PostgreSQL

### Hourly Sync
- Automatic via cron job
- Updates existing records
- Adds new records

### Manual Sync
```bash
curl -X POST http://localhost:5000/api/sync
```

---

## 🗺️ Field Mapping Examples

### Project
```
ERPNext              →  Internal
─────────────────────────────────
name                 →  externalId
project_name         →  name
status               →  status
estimated_costing    →  budget
percent_complete     →  progress
```

### Customer
```
ERPNext              →  Internal
─────────────────────────────────
name                 →  externalId
customer_name        →  name
email_id             →  email
mobile_no            →  phone
```

### Sales Invoice
```
ERPNext              →  Internal
─────────────────────────────────
name                 →  externalId
grand_total          →  amount
posting_date         →  date
status               →  metadata.status
```

---

## 🧪 Testing Checklist

- [ ] Environment variables set
- [ ] Server starts without errors
- [ ] Initial sync completes
- [ ] Dashboard shows data
- [ ] Projects visible
- [ ] Finance data populated
- [ ] Inventory items showing
- [ ] Employee list populated

---

## 🔧 Troubleshooting

### No Data Synced?

**Check**:
1. `DATA_SOURCE=erpnext` is set
2. Server logs show "Syncing from ERPNext"
3. Network connectivity to ERPNext
4. API credentials are correct

### Authentication Errors?

**Fix**:
1. Regenerate API keys
2. Check for extra spaces in `.env`
3. Verify credentials are correct
4. Try without credentials (demo mode)

### Rate Limit Errors?

**Solution**:
- Demo instance has limits
- Wait 1 hour
- Or use your own ERPNext instance

---

## 📁 Key Files

```
server/
├── .env                              # Configuration
├── src/
│   ├── services/
│   │   ├── erpnextService.js        # ERPNext integration
│   │   └── civitService.js          # Data source router
│   └── config/
│       └── erpnext.map.json         # Field mapping

docs/
├── ERPNEXT_SETUP.md                 # Full setup guide
└── ERPNext_API_Collection.json      # Postman collection
```

---

## 🎯 Common Use Cases

### Development
```bash
DATA_SOURCE=mock  # Fast, no dependencies
```

### Demo/Presentation
```bash
DATA_SOURCE=erpnext  # Real ERP data
```

### Production
```bash
DATA_SOURCE=civitbuild  # Real construction data
```

---

## 📞 API Endpoints

### Get Projects
```bash
GET https://demo.erpnext.com/api/resource/Project
```

### Get Customers
```bash
GET https://demo.erpnext.com/api/resource/Customer
```

### Get Sales Invoices
```bash
GET https://demo.erpnext.com/api/resource/Sales Invoice
```

**Full Collection**: Import `docs/ERPNext_API_Collection.postman_collection.json` into Postman

---

## ✅ Success Indicators

When working correctly, you should see:

1. **Server Logs**:
```
Data source: erpnext
Syncing customers from ERPNext...
Synced 15 customers
Syncing projects from ERPNext...
Synced 8 projects
ERPNext sync completed successfully
```

2. **Dashboard**:
- Projects showing with real names
- Finance charts with actual data
- Inventory items populated
- Employee count accurate

3. **Database**:
- Records have `externalId` starting with `erpnext_`
- Metadata contains ERPNext-specific fields

---

## 🔄 Switching Back to Mock

```bash
# In server/.env
DATA_SOURCE=mock
```

Restart server:
```bash
npm run dev
```

---

**Need more help?** See [ERPNEXT_SETUP.md](./ERPNEXT_SETUP.md) for detailed documentation.
