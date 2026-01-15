# API Requirements for CivitBUILD ERP Integration
## Management Analytics Dashboard

**To:** CivitBUILD IT Team  
**From:** Shubham EPC Private Limited - Management  
**Date:** January 15, 2026  
**Subject:** API Access Requirements for Custom Analytics Dashboard

---

## 📋 Executive Summary

We are developing a **custom Management Analytics Dashboard** to visualize and analyze data from our CivitBUILD ERP system. This dashboard will provide real-time insights to management for better decision-making.

**We require REST API access** to the following CivitBUILD modules with specific data fields.

---

## 🎯 Project Objective

**Goal:** Create a centralized analytics dashboard that provides:
- Real-time project status and progress tracking
- Financial analytics and cash flow visualization
- Resource and inventory management insights
- Employee productivity and allocation reports
- Client and vendor relationship management
- Executive-level KPI dashboards

**Technical Approach:**
- Fetch data from CivitBUILD via REST APIs
- Store in our analytics database (PostgreSQL)
- Sync hourly for near real-time updates
- Display via custom React dashboard

---

## 🔑 1. API Authentication Requirements

### What We Need:

**API Credentials:**
- API Key
- API Secret
- Base API URL

**Authentication Method:**
We will use **Bearer Token** authentication:
```
Authorization: Bearer {API_KEY}:{API_SECRET}
```

**IP Whitelisting (if required):**
- Production Server IP: [To be provided]
- Development Server IP: [To be provided]

**Rate Limits:**
Please confirm:
- Requests per second limit
- Requests per hour limit
- Daily request limit

---

## 📊 2. Required API Endpoints & Data Fields

### 2.1 Projects Module

**Endpoint:** `/api/v1/projects` or equivalent

**Required Fields:**

| Field Name | Data Type | Description | Example |
|------------|-----------|-------------|---------|
| `id` | String/Number | Unique project identifier | "PROJ-2024-001" |
| `project_name` | String | Project name | "Residential Complex A" |
| `project_code` | String | Project code/number | "RC-A-2024" |
| `status` | String | Current status | "In Progress", "Completed", "On Hold" |
| `start_date` | Date | Project start date | "2024-01-15" |
| `end_date` | Date | Expected/actual end date | "2024-12-31" |
| `actual_start_date` | Date | Actual start date | "2024-01-20" |
| `actual_end_date` | Date | Actual completion date | "2024-12-28" |
| `total_budget` | Number | Total project budget | 5000000.00 |
| `amount_spent` | Number | Total amount spent | 2500000.00 |
| `progress_percentage` | Number | Completion % (0-100) | 50.5 |
| `client_id` | String/Number | Associated client ID | "CLIENT-001" |
| `client_name` | String | Client name | "ABC Developers" |
| `project_manager` | String | PM name | "Rajnish Kumar" |
| `location` | String | Project location | "Mumbai, Maharashtra" |
| `project_type` | String | Type of project | "Residential", "Commercial" |
| `created_at` | DateTime | Record creation time | "2024-01-15T10:30:00Z" |
| `updated_at` | DateTime | Last update time | "2024-01-15T15:45:00Z" |

**Filters Needed:**
- By status
- By date range (start_date, end_date)
- By client
- By project manager

**Pagination:** Yes (page, per_page parameters)

---

### 2.2 Clients/Customers Module

**Endpoint:** `/api/v1/clients` or `/api/v1/customers`

**Required Fields:**

| Field Name | Data Type | Description | Example |
|------------|-----------|-------------|---------|
| `id` | String/Number | Unique client ID | "CLIENT-001" |
| `client_name` | String | Client/Company name | "ABC Developers Pvt Ltd" |
| `contact_person` | String | Primary contact name | "Mr. Sharma" |
| `email` | String | Contact email | "sharma@abc.com" |
| `phone` | String | Contact phone | "+91-9876543210" |
| `mobile` | String | Mobile number | "+91-9876543210" |
| `address` | String | Complete address | "123, MG Road, Mumbai" |
| `city` | String | City | "Mumbai" |
| `state` | String | State | "Maharashtra" |
| `pincode` | String | PIN code | "400001" |
| `gst_number` | String | GST number | "27AABCU9603R1ZM" |
| `pan_number` | String | PAN number | "AABCU9603R" |
| `client_type` | String | Type of client | "Corporate", "Individual" |
| `total_projects` | Number | Number of projects | 5 |
| `total_business_value` | Number | Total business value | 25000000.00 |
| `created_at` | DateTime | Record creation time | "2024-01-15T10:30:00Z" |

**Filters Needed:**
- By client type
- By city/state
- Active/Inactive status

---

### 2.3 Finance Module

#### 2.3.1 Sales Invoices

**Endpoint:** `/api/v1/finance/invoices` or `/api/v1/sales-invoices`

**Required Fields:**

| Field Name | Data Type | Description | Example |
|------------|-----------|-------------|---------|
| `id` | String/Number | Invoice ID | "INV-2024-001" |
| `invoice_number` | String | Invoice number | "SI-001/2024" |
| `invoice_date` | Date | Invoice date | "2024-01-15" |
| `due_date` | Date | Payment due date | "2024-02-15" |
| `client_id` | String/Number | Client ID | "CLIENT-001" |
| `client_name` | String | Client name | "ABC Developers" |
| `project_id` | String/Number | Project ID | "PROJ-2024-001" |
| `project_name` | String | Project name | "Residential Complex A" |
| `subtotal` | Number | Subtotal amount | 1000000.00 |
| `tax_amount` | Number | Tax amount (GST) | 180000.00 |
| `total_amount` | Number | Total invoice amount | 1180000.00 |
| `paid_amount` | Number | Amount paid | 500000.00 |
| `outstanding_amount` | Number | Balance due | 680000.00 |
| `status` | String | Invoice status | "Paid", "Unpaid", "Partial" |
| `payment_terms` | String | Payment terms | "Net 30" |
| `created_at` | DateTime | Creation time | "2024-01-15T10:30:00Z" |

**Filters Needed:**
- By date range
- By client
- By project
- By status
- By payment status

#### 2.3.2 Payment Entries

**Endpoint:** `/api/v1/finance/payments` or `/api/v1/payment-entries`

**Required Fields:**

| Field Name | Data Type | Description | Example |
|------------|-----------|-------------|---------|
| `id` | String/Number | Payment ID | "PAY-2024-001" |
| `payment_number` | String | Payment reference | "PE-001/2024" |
| `payment_date` | Date | Payment date | "2024-01-20" |
| `payment_type` | String | Type | "Received", "Paid" |
| `party_type` | String | Party type | "Customer", "Supplier" |
| `party_id` | String/Number | Party ID | "CLIENT-001" |
| `party_name` | String | Party name | "ABC Developers" |
| `amount` | Number | Payment amount | 500000.00 |
| `payment_mode` | String | Mode of payment | "Bank Transfer", "Cash", "Cheque" |
| `reference_number` | String | Transaction ref | "TXN123456" |
| `bank_account` | String | Bank account | "HDFC - 12345678" |
| `project_id` | String/Number | Related project | "PROJ-2024-001" |
| `invoice_id` | String/Number | Related invoice | "INV-2024-001" |
| `remarks` | String | Payment remarks | "First installment" |
| `created_at` | DateTime | Creation time | "2024-01-20T14:30:00Z" |

**Filters Needed:**
- By date range
- By payment type
- By party
- By project
- By payment mode

#### 2.3.3 Expenses/Purchase Invoices

**Endpoint:** `/api/v1/finance/expenses` or `/api/v1/purchase-invoices`

**Required Fields:**

| Field Name | Data Type | Description | Example |
|------------|-----------|-------------|---------|
| `id` | String/Number | Expense ID | "EXP-2024-001" |
| `expense_date` | Date | Expense date | "2024-01-15" |
| `expense_category` | String | Category | "Material", "Labor", "Equipment" |
| `vendor_id` | String/Number | Vendor ID | "VENDOR-001" |
| `vendor_name` | String | Vendor name | "Steel Suppliers Ltd" |
| `project_id` | String/Number | Project ID | "PROJ-2024-001" |
| `project_name` | String | Project name | "Residential Complex A" |
| `description` | String | Expense description | "Steel bars purchase" |
| `amount` | Number | Expense amount | 250000.00 |
| `tax_amount` | Number | Tax amount | 45000.00 |
| `total_amount` | Number | Total amount | 295000.00 |
| `payment_status` | String | Status | "Paid", "Unpaid", "Partial" |
| `bill_number` | String | Bill/Invoice number | "BILL-123" |
| `created_at` | DateTime | Creation time | "2024-01-15T10:30:00Z" |

**Filters Needed:**
- By date range
- By category
- By project
- By vendor
- By payment status

---

### 2.4 Inventory/Materials Module

**Endpoint:** `/api/v1/inventory/items` or `/api/v1/materials`

**Required Fields:**

| Field Name | Data Type | Description | Example |
|------------|-----------|-------------|---------|
| `id` | String/Number | Item ID | "ITEM-001" |
| `item_code` | String | Item code/SKU | "STL-001" |
| `item_name` | String | Item name | "Steel TMT Bar 12mm" |
| `category` | String | Item category | "Steel", "Cement", "Sand" |
| `subcategory` | String | Subcategory | "TMT Bars" |
| `unit_of_measure` | String | UOM | "Kg", "Ton", "Bag", "Cubic Meter" |
| `current_stock` | Number | Available quantity | 5000.00 |
| `minimum_stock` | Number | Minimum level | 1000.00 |
| `unit_price` | Number | Price per unit | 55.00 |
| `total_value` | Number | Total stock value | 275000.00 |
| `warehouse` | String | Storage location | "Main Warehouse" |
| `last_purchase_date` | Date | Last purchase | "2024-01-10" |
| `last_purchase_rate` | Number | Last rate | 54.50 |
| `supplier_id` | String/Number | Preferred supplier | "VENDOR-001" |
| `supplier_name` | String | Supplier name | "Steel Suppliers Ltd" |
| `created_at` | DateTime | Creation time | "2024-01-15T10:30:00Z" |
| `updated_at` | DateTime | Last update | "2024-01-15T15:45:00Z" |

**Filters Needed:**
- By category
- By warehouse
- Low stock items (current_stock < minimum_stock)
- By supplier

---

### 2.5 Purchase Orders Module

**Endpoint:** `/api/v1/procurement/purchase-orders` or `/api/v1/purchase-orders`

**Required Fields:**

| Field Name | Data Type | Description | Example |
|------------|-----------|-------------|---------|
| `id` | String/Number | PO ID | "PO-2024-001" |
| `po_number` | String | PO number | "PO-001/2024" |
| `po_date` | Date | Order date | "2024-01-15" |
| `delivery_date` | Date | Expected delivery | "2024-01-25" |
| `vendor_id` | String/Number | Vendor ID | "VENDOR-001" |
| `vendor_name` | String | Vendor name | "Steel Suppliers Ltd" |
| `project_id` | String/Number | Project ID | "PROJ-2024-001" |
| `project_name` | String | Project name | "Residential Complex A" |
| `total_amount` | Number | Total PO amount | 500000.00 |
| `tax_amount` | Number | Tax amount | 90000.00 |
| `grand_total` | Number | Grand total | 590000.00 |
| `status` | String | PO status | "Draft", "Approved", "Received", "Cancelled" |
| `payment_terms` | String | Payment terms | "Net 30" |
| `items_count` | Number | Number of items | 5 |
| `created_by` | String | Created by user | "Rajnish Kumar" |
| `approved_by` | String | Approved by | "Manager Name" |
| `created_at` | DateTime | Creation time | "2024-01-15T10:30:00Z" |

**Filters Needed:**
- By date range
- By vendor
- By project
- By status

---

### 2.6 Vendors/Suppliers Module

**Endpoint:** `/api/v1/vendors` or `/api/v1/suppliers`

**Required Fields:**

| Field Name | Data Type | Description | Example |
|------------|-----------|-------------|---------|
| `id` | String/Number | Vendor ID | "VENDOR-001" |
| `vendor_name` | String | Vendor name | "Steel Suppliers Ltd" |
| `vendor_code` | String | Vendor code | "VS-001" |
| `contact_person` | String | Contact name | "Mr. Patel" |
| `email` | String | Email | "patel@steel.com" |
| `phone` | String | Phone | "+91-9876543210" |
| `mobile` | String | Mobile | "+91-9876543210" |
| `address` | String | Address | "456, Industrial Area" |
| `city` | String | City | "Mumbai" |
| `state` | String | State | "Maharashtra" |
| `pincode` | String | PIN code | "400002" |
| `gst_number` | String | GST number | "27AABCS1234R1ZM" |
| `pan_number` | String | PAN number | "AABCS1234R" |
| `vendor_type` | String | Type | "Material", "Labor", "Equipment" |
| `payment_terms` | String | Payment terms | "Net 30" |
| `total_purchases` | Number | Total purchase value | 5000000.00 |
| `outstanding_amount` | Number | Amount due | 500000.00 |
| `created_at` | DateTime | Creation time | "2024-01-15T10:30:00Z" |

**Filters Needed:**
- By vendor type
- By city/state
- Active/Inactive status

---

### 2.7 Employees/HR Module

**Endpoint:** `/api/v1/hr/employees` or `/api/v1/employees`

**Required Fields:**

| Field Name | Data Type | Description | Example |
|------------|-----------|-------------|---------|
| `id` | String/Number | Employee ID | "EMP-001" |
| `employee_code` | String | Employee code | "E-001" |
| `employee_name` | String | Full name | "Rajnish Kumar" |
| `designation` | String | Job title | "Project Manager" |
| `department` | String | Department | "Projects" |
| `email` | String | Official email | "rajnish@shubham.biz" |
| `phone` | String | Phone | "+91-9876543210" |
| `date_of_joining` | Date | Joining date | "2020-01-15" |
| `employment_type` | String | Type | "Permanent", "Contract" |
| `status` | String | Status | "Active", "Inactive" |
| `reporting_to` | String | Manager name | "Senior Manager" |
| `current_project` | String | Current project | "Residential Complex A" |
| `salary` | Number | Monthly salary | 50000.00 |
| `created_at` | DateTime | Creation time | "2024-01-15T10:30:00Z" |

**Filters Needed:**
- By department
- By designation
- By status (Active/Inactive)
- By project

---

### 2.8 Attendance Module (Optional)

**Endpoint:** `/api/v1/hr/attendance`

**Required Fields:**

| Field Name | Data Type | Description | Example |
|------------|-----------|-------------|---------|
| `id` | String/Number | Attendance ID | "ATT-001" |
| `employee_id` | String/Number | Employee ID | "EMP-001" |
| `employee_name` | String | Employee name | "Rajnish Kumar" |
| `date` | Date | Attendance date | "2024-01-15" |
| `check_in_time` | Time | Check-in time | "09:00:00" |
| `check_out_time` | Time | Check-out time | "18:00:00" |
| `working_hours` | Number | Total hours | 9.0 |
| `status` | String | Status | "Present", "Absent", "Leave" |
| `project_id` | String/Number | Project worked on | "PROJ-2024-001" |

**Filters Needed:**
- By date range
- By employee
- By project

---

## 🔄 3. API Response Format

### Preferred Response Structure:

```json
{
  "success": true,
  "message": "Data retrieved successfully",
  "data": [
    {
      // Record fields here
    }
  ],
  "pagination": {
    "current_page": 1,
    "per_page": 50,
    "total_pages": 10,
    "total_records": 500
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### Error Response:

```json
{
  "success": false,
  "error": {
    "code": "AUTH_FAILED",
    "message": "Invalid API credentials"
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

---

## ⚙️ 4. Technical Requirements

### 4.1 API Specifications

- **Protocol:** HTTPS (TLS 1.2 or higher)
- **Format:** JSON
- **Method:** GET for data retrieval
- **Encoding:** UTF-8
- **Date Format:** ISO 8601 (`YYYY-MM-DDTHH:mm:ssZ`)
- **Number Format:** Decimal with 2 decimal places for currency

### 4.2 Pagination

```
GET /api/v1/projects?page=1&per_page=50
```

- Default: 50 records per page
- Maximum: 100 records per page

### 4.3 Filtering

```
GET /api/v1/projects?status=In Progress&start_date_from=2024-01-01&start_date_to=2024-12-31
```

### 4.4 Sorting

```
GET /api/v1/projects?sort_by=created_at&order=desc
```

### 4.5 Field Selection (Optional but Preferred)

```
GET /api/v1/projects?fields=id,project_name,status,total_budget
```

---

## 🔒 5. Security Requirements

### 5.1 Authentication
- API Key + Secret based authentication
- Token should not expire (or provide refresh mechanism)

### 5.2 HTTPS
- All API calls must be over HTTPS
- TLS 1.2 or higher

### 5.3 IP Whitelisting (if required)
- We can provide static IPs for whitelisting

### 5.4 Rate Limiting
- Please specify limits
- We expect to make ~10-20 requests per minute during sync

---

## 📅 6. Data Sync Schedule

**Sync Frequency:** Every 1 hour

**Sync Window:** 24/7

**Expected API Calls per Day:**
- ~240 API calls per endpoint (hourly sync)
- ~2000 total API calls per day (all endpoints)

---

## 🧪 7. Testing Requirements

### 7.1 Test Environment

Please provide:
- Test/Sandbox API URL
- Test API credentials
- Sample data in test environment

### 7.2 Documentation

Please provide:
- API documentation (Swagger/Postman collection preferred)
- Sample requests and responses
- Error codes and meanings
- Rate limit details

---

## 📊 8. Data Volume Estimates

| Module | Estimated Records | Growth Rate |
|--------|------------------|-------------|
| Projects | 100-200 | 5-10 per month |
| Clients | 50-100 | 2-5 per month |
| Invoices | 500-1000 | 20-30 per month |
| Payments | 1000-2000 | 50-100 per month |
| Inventory Items | 200-500 | 10-20 per month |
| Purchase Orders | 500-1000 | 20-40 per month |
| Vendors | 100-200 | 5-10 per month |
| Employees | 50-100 | 2-5 per month |

---

## ✅ 9. Deliverables Expected from IT Team

### Phase 1: Documentation & Access (Week 1)
- [ ] API documentation (endpoints, fields, authentication)
- [ ] Test environment access
- [ ] Test API credentials
- [ ] Sample data in test environment

### Phase 2: Development Support (Week 2-3)
- [ ] Production API credentials
- [ ] IP whitelisting (if required)
- [ ] Support for integration testing
- [ ] Clarification on field mappings

### Phase 3: Go-Live Support (Week 4)
- [ ] Production access verification
- [ ] Performance testing support
- [ ] Issue resolution support
- [ ] Monitoring setup

---

## 📞 10. Support & Communication

### Primary Contact:
- **Name:** [Your Name]
- **Email:** [Your Email]
- **Phone:** [Your Phone]

### Expected Response Time:
- Critical issues: 4 hours
- Normal queries: 24 hours

### Communication Channel:
- Email for documentation
- Phone/WhatsApp for urgent issues
- Weekly sync-up calls (if needed)

---

## 📋 11. Success Criteria

The integration will be considered successful when:

- [ ] All required endpoints are accessible
- [ ] All required fields are available in API responses
- [ ] Authentication is working correctly
- [ ] Data sync is completing successfully
- [ ] Dashboard is displaying real-time data
- [ ] Performance is acceptable (response time < 2 seconds)
- [ ] Error handling is working properly

---

## 🎯 12. Timeline

| Phase | Duration | Deliverable |
|-------|----------|-------------|
| **Phase 1: API Documentation** | Week 1 | Complete API docs & test access |
| **Phase 2: Development** | Week 2-3 | Integration development & testing |
| **Phase 3: UAT** | Week 4 | User acceptance testing |
| **Phase 4: Go-Live** | Week 5 | Production deployment |

**Target Go-Live Date:** [Specify Date]

---

## 📎 Appendix

### A. Sample API Request

```bash
curl -X GET "https://api.civitbuild.com/v1/projects?page=1&per_page=50" \
  -H "Authorization: Bearer YOUR_API_KEY:YOUR_API_SECRET" \
  -H "Content-Type: application/json"
```

### B. Sample API Response

```json
{
  "success": true,
  "data": [
    {
      "id": "PROJ-2024-001",
      "project_name": "Residential Complex A",
      "status": "In Progress",
      "start_date": "2024-01-15",
      "end_date": "2024-12-31",
      "total_budget": 5000000.00,
      "amount_spent": 2500000.00,
      "progress_percentage": 50.5,
      "client_name": "ABC Developers"
    }
  ],
  "pagination": {
    "current_page": 1,
    "per_page": 50,
    "total_pages": 2,
    "total_records": 85
  }
}
```

---

## ✍️ Sign-Off

**Prepared By:**  
Name: [Your Name]  
Designation: [Your Designation]  
Date: January 15, 2026

**Approved By:**  
Name: [Manager Name]  
Designation: [Manager Designation]  
Date: _______________

---

**For any clarifications or questions, please contact:**  
Email: [Your Email]  
Phone: [Your Phone]

---

**Document Version:** 1.0  
**Last Updated:** January 15, 2026
