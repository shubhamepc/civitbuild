# CivitBUILD API Integration Guide

## 📋 Overview

This guide provides comprehensive documentation for integrating the CivitBuild ERP Analytics Dashboard with the CivitBUILD platform API.

---

## 🎯 What is CivitBUILD?

CivitBUILD is a comprehensive construction management platform that provides:
- Project management and tracking
- Financial management and reporting
- Resource and inventory management
- Employee and HR management
- Client and vendor management
- Real-time analytics and insights

This dashboard integrates with CivitBUILD's REST API to provide advanced analytics and visualization capabilities.

---

## 🏗️ Architecture Overview

```
CivitBUILD Platform
        ↓
    REST API
        ↓
CivitBUILD Service (civitService.js)
        ↓
  Field Mapping
        ↓
PostgreSQL Database
        ↓
   Dashboard API
        ↓
  React Frontend
```

---

## 🔑 Authentication

### API Credentials

CivitBUILD API uses **API Key + Secret** authentication.

**To get your credentials:**

1. Login to your CivitBUILD account
2. Navigate to: **Settings → API Access**
3. Click **"Generate API Credentials"**
4. Copy your:
   - API Key
   - API Secret

**Important**: Store these securely! The API Secret is shown only once.

### Authentication Method

All API requests must include authentication headers:

```http
Authorization: Bearer {API_KEY}:{API_SECRET}
Content-Type: application/json
```

---

## 📊 Available API Endpoints

### Base URL
```
https://api.civitbuild.com/v1
```

### Endpoints

| Resource | Endpoint | Description |
|----------|----------|-------------|
| **Projects** | `/projects` | Get all construction projects |
| **Clients** | `/clients` | Get client/customer information |
| **Finance** | `/finance/transactions` | Get financial transactions |
| **Invoices** | `/finance/invoices` | Get sales invoices |
| **Payments** | `/finance/payments` | Get payment records |
| **Employees** | `/hr/employees` | Get employee information |
| **Inventory** | `/inventory/items` | Get inventory items |
| **Purchase Orders** | `/procurement/orders` | Get purchase orders |
| **Vendors** | `/vendors` | Get vendor/supplier information |

---

## 🗺️ Field Mapping

### Project Fields

| CivitBUILD API | Internal Schema | Type | Description |
|----------------|-----------------|------|-------------|
| `id` | `externalId` | String | Unique project ID |
| `name` | `name` | String | Project name |
| `status` | `status` | String | Project status |
| `start_date` | `startDate` | Date | Project start date |
| `end_date` | `endDate` | Date | Project end date |
| `budget` | `budget` | Number | Total project budget |
| `spent` | `spent` | Number | Amount spent |
| `progress` | `progress` | Number | Completion percentage (0-100) |
| `client_id` | `clientId` | String | Associated client ID |

**Status Values:**
- `planning` → `Planning`
- `in_progress` → `In Progress`
- `on_hold` → `On Hold`
- `completed` → `Completed`
- `cancelled` → `Cancelled`

### Client Fields

| CivitBUILD API | Internal Schema | Type | Description |
|----------------|-----------------|------|-------------|
| `id` | `externalId` | String | Unique client ID |
| `name` | `name` | String | Client name |
| `email` | `email` | String | Contact email |
| `phone` | `phone` | String | Contact phone |
| `address` | `address` | String | Physical address |
| `company` | `metadata.company` | String | Company name |

### Finance Transaction Fields

| CivitBUILD API | Internal Schema | Type | Description |
|----------------|-----------------|------|-------------|
| `id` | `externalId` | String | Transaction ID |
| `type` | `type` | String | Income/Expense |
| `category` | `category` | String | Transaction category |
| `amount` | `amount` | Number | Transaction amount |
| `date` | `date` | Date | Transaction date |
| `description` | `description` | String | Description |
| `project_id` | `projectId` | String | Associated project |

**Transaction Types:**
- `income` → `Income`
- `expense` → `Expense`

**Categories:**
- `sales`, `payment_received`, `other_income` → Income categories
- `material`, `labor`, `equipment`, `overhead` → Expense categories

### Employee Fields

| CivitBUILD API | Internal Schema | Type | Description |
|----------------|-----------------|------|-------------|
| `id` | `externalId` | String | Employee ID |
| `name` | `name` | String | Full name |
| `email` | `email` | String | Email address |
| `phone` | `phone` | String | Phone number |
| `role` | `role` | String | Job role/title |
| `department` | `department` | String | Department |
| `status` | `status` | String | Active/Inactive |

### Inventory Item Fields

| CivitBUILD API | Internal Schema | Type | Description |
|----------------|-----------------|------|-------------|
| `id` | `externalId` | String | Item ID |
| `name` | `name` | String | Item name |
| `code` | `code` | String | Item code/SKU |
| `category` | `category` | String | Item category |
| `quantity` | `quantity` | Number | Current stock |
| `unit` | `unit` | String | Unit of measurement |
| `unit_price` | `unitPrice` | Number | Price per unit |
| `total_value` | `totalValue` | Number | Total inventory value |

### Purchase Order Fields

| CivitBUILD API | Internal Schema | Type | Description |
|----------------|-----------------|------|-------------|
| `id` | `externalId` | String | PO ID |
| `order_number` | `orderNumber` | String | PO number |
| `vendor_id` | `vendorId` | String | Vendor ID |
| `order_date` | `orderDate` | Date | Order date |
| `delivery_date` | `deliveryDate` | Date | Expected delivery |
| `total_amount` | `totalAmount` | Number | Total PO amount |
| `status` | `status` | String | PO status |

**PO Status Values:**
- `pending` → `Pending`
- `approved` → `Approved`
- `received` → `Completed`
- `cancelled` → `Cancelled`

### Vendor Fields

| CivitBUILD API | Internal Schema | Type | Description |
|----------------|-----------------|------|-------------|
| `id` | `externalId` | String | Vendor ID |
| `name` | `name` | String | Vendor name |
| `email` | `email` | String | Contact email |
| `phone` | `phone` | String | Contact phone |
| `address` | `address` | String | Address |
| `tax_id` | `taxId` | String | Tax ID/GST number |

---

## 🔄 Data Synchronization

### Sync Frequency

- **Initial Sync**: On server startup (if `DATA_SOURCE=civitbuild`)
- **Scheduled Sync**: Every hour (via cron job)
- **Manual Sync**: Via API endpoint `/api/sync`

### Sync Process

1. **Fetch Data**: Retrieve data from CivitBUILD API
2. **Transform**: Map CivitBUILD fields to internal schema
3. **Validate**: Ensure data integrity
4. **Store**: Upsert records in PostgreSQL
5. **Log**: Record sync status and errors

### Error Handling

- **Network Errors**: Retry up to 3 times with exponential backoff
- **Authentication Errors**: Log error and notify admin
- **Data Validation Errors**: Skip invalid records, log details
- **Rate Limiting**: Respect API rate limits, queue requests

---

## 🚀 Implementation Guide

### Step 1: Environment Configuration

Edit `server/.env`:

```bash
# Set data source to CivitBUILD
DATA_SOURCE=civitbuild

# CivitBUILD API Configuration
CIVIT_API_URL=https://api.civitbuild.com/v1
CIVIT_API_KEY=your_api_key_here
CIVIT_API_SECRET=your_api_secret_here
```

### Step 2: Install Dependencies

All required dependencies are already included:
- `axios` - HTTP client
- `dotenv` - Environment variables
- `winston` - Logging

### Step 3: Implement CivitBUILD Service

The service implementation should be added to `server/src/services/civitService.js`:

```javascript
const axios = require('axios');
const logger = require('../utils/logger');

class CivitService {
    constructor() {
        this.baseURL = process.env.CIVIT_API_URL;
        this.apiKey = process.env.CIVIT_API_KEY;
        this.apiSecret = process.env.CIVIT_API_SECRET;
    }

    getHeaders() {
        return {
            'Authorization': `Bearer ${this.apiKey}:${this.apiSecret}`,
            'Content-Type': 'application/json'
        };
    }

    async fetchProjects() {
        const response = await axios.get(
            `${this.baseURL}/projects`,
            { headers: this.getHeaders() }
        );
        return response.data;
    }

    // Implement other fetch methods...
}
```

### Step 4: Test Connection

```bash
# Start server
cd server
npm run dev

# Check logs for:
# "DATA_SOURCE is civitbuild. Fetching from API..."
# "Successfully synced X projects from CivitBUILD"
```

### Step 5: Verify Dashboard

1. Open `http://localhost:5173`
2. Login to dashboard
3. Verify data is displaying correctly
4. Check all modules (Projects, Finance, Inventory, etc.)

---

## 📝 API Request Examples

### Get All Projects

```http
GET https://api.civitbuild.com/v1/projects
Authorization: Bearer {API_KEY}:{API_SECRET}
Content-Type: application/json
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "proj_123",
      "name": "Residential Complex A",
      "status": "in_progress",
      "start_date": "2024-01-15",
      "end_date": "2024-12-31",
      "budget": 5000000,
      "spent": 2500000,
      "progress": 50,
      "client_id": "client_456"
    }
  ],
  "pagination": {
    "page": 1,
    "per_page": 50,
    "total": 100
  }
}
```

### Get Project by ID

```http
GET https://api.civitbuild.com/v1/projects/{project_id}
Authorization: Bearer {API_KEY}:{API_SECRET}
```

### Get Finance Transactions

```http
GET https://api.civitbuild.com/v1/finance/transactions?project_id=proj_123
Authorization: Bearer {API_KEY}:{API_SECRET}
```

### Filter by Date Range

```http
GET https://api.civitbuild.com/v1/finance/transactions?start_date=2024-01-01&end_date=2024-12-31
Authorization: Bearer {API_KEY}:{API_SECRET}
```

---

## 🔧 Configuration Options

### Rate Limiting

CivitBUILD API has the following rate limits:
- **Requests per second**: 10
- **Requests per hour**: 1000
- **Daily limit**: 10,000

### Pagination

All list endpoints support pagination:
```
?page=1&per_page=50
```

Default: 50 items per page
Maximum: 100 items per page

### Filtering

Most endpoints support filtering:
```
?status=in_progress
?start_date=2024-01-01
?category=material
```

### Sorting

```
?sort_by=created_at&order=desc
```

---

## 🧪 Testing

### Test API Connection

```bash
curl -H "Authorization: Bearer YOUR_KEY:YOUR_SECRET" \
     https://api.civitbuild.com/v1/projects
```

### Test Sync Endpoint

```bash
curl -X POST http://localhost:5000/api/sync
```

### Verify Database

```sql
-- Check synced projects
SELECT * FROM projects WHERE "externalId" LIKE 'civitbuild_%';

-- Check sync timestamp
SELECT MAX("updatedAt") FROM projects;
```

---

## 🔒 Security Best Practices

1. **Never commit API credentials** to version control
2. **Use environment variables** for all sensitive data
3. **Rotate API keys** regularly (every 90 days)
4. **Use HTTPS** for all API requests
5. **Implement request signing** for additional security
6. **Monitor API usage** for unusual patterns
7. **Set up alerts** for failed authentication

---

## 📊 Monitoring & Logging

### Log Levels

- **INFO**: Successful sync operations
- **WARN**: Retryable errors, rate limiting
- **ERROR**: Failed syncs, authentication errors
- **DEBUG**: Detailed request/response data

### Metrics to Monitor

- Sync success rate
- API response times
- Data freshness
- Error rates by endpoint
- Rate limit usage

---

## 🐛 Troubleshooting

### Issue: Authentication Failed

**Symptoms**: 401 Unauthorized errors

**Solutions**:
1. Verify API Key and Secret are correct
2. Check if credentials have expired
3. Ensure no extra spaces in `.env` file
4. Regenerate credentials if needed

### Issue: No Data Syncing

**Symptoms**: Empty dashboard, no records in database

**Solutions**:
1. Check `DATA_SOURCE=civitbuild` is set
2. Verify API credentials are configured
3. Check server logs for errors
4. Test API connection manually
5. Verify network connectivity

### Issue: Rate Limit Exceeded

**Symptoms**: 429 Too Many Requests errors

**Solutions**:
1. Reduce sync frequency
2. Implement request queuing
3. Use pagination effectively
4. Contact CivitBUILD for higher limits

### Issue: Data Mismatch

**Symptoms**: Incorrect data in dashboard

**Solutions**:
1. Check field mapping configuration
2. Verify data transformations
3. Review API response format
4. Clear database and re-sync

---

## 📞 Support

### CivitBUILD API Support

- **Email**: api-support@civitbuild.com
- **Documentation**: https://docs.civitbuild.com/api
- **Status Page**: https://status.civitbuild.com

### Dashboard Support

- **GitHub Issues**: https://github.com/shubhamepc/civitbuild/issues
- **Documentation**: See README.md

---

## 🔄 Migration from Mock Data

### Step-by-Step Migration

1. **Backup Current Data**
   ```bash
   pg_dump civilbuild_erp > backup.sql
   ```

2. **Update Environment**
   ```bash
   DATA_SOURCE=civitbuild
   ```

3. **Clear Mock Data** (Optional)
   ```sql
   TRUNCATE projects, clients, finance_records, employees, inventory_items CASCADE;
   ```

4. **Restart Server**
   ```bash
   npm run dev
   ```

5. **Verify Sync**
   - Check logs
   - Verify dashboard
   - Test all features

---

## ✅ Pre-Production Checklist

Before deploying to production with CivitBUILD API:

- [ ] API credentials obtained and tested
- [ ] Environment variables configured
- [ ] Connection tested successfully
- [ ] All endpoints returning data
- [ ] Field mapping verified
- [ ] Data transformations working
- [ ] Error handling tested
- [ ] Logging configured
- [ ] Monitoring set up
- [ ] Rate limits understood
- [ ] Backup strategy in place
- [ ] Rollback plan prepared

---

## 📚 Additional Resources

- **CivitBUILD API Documentation**: https://docs.civitbuild.com/api
- **API Changelog**: https://docs.civitbuild.com/api/changelog
- **Best Practices**: https://docs.civitbuild.com/api/best-practices
- **Sample Code**: https://github.com/civitbuild/api-examples

---

**Ready for CivitBUILD Integration!** 🚀

When CivitBUILD API is available, simply update your environment variables and restart the server.
