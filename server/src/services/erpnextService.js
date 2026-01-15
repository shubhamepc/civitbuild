const axios = require('axios');
const logger = require('../utils/logger');
const {
    Project,
    Client,
    FinanceRecord,
    Employee,
    InventoryItem,
    PurchaseOrder,
    Vendor
} = require('../models');

class ERPNextService {
    constructor() {
        this.baseURL = process.env.ERPNEXT_API_URL || 'https://demo.erpnext.com';
        this.apiKey = process.env.ERPNEXT_API_KEY || '';
        this.apiSecret = process.env.ERPNEXT_API_SECRET || '';
        this.token = null;
    }

    /**
     * Get authorization headers for ERPNext API
     */
    getHeaders() {
        if (this.apiKey && this.apiSecret) {
            return {
                'Authorization': `token ${this.apiKey}:${this.apiSecret}`,
                'Content-Type': 'application/json'
            };
        }
        return {
            'Content-Type': 'application/json'
        };
    }

    /**
     * Fetch data from ERPNext API
     */
    async fetchFromERPNext(resource, filters = {}, fields = []) {
        try {
            const params = {
                fields: JSON.stringify(fields.length > 0 ? fields : ['*']),
                filters: JSON.stringify(filters),
                limit_page_length: 500
            };

            const response = await axios.get(
                `${this.baseURL}/api/resource/${resource}`,
                {
                    headers: this.getHeaders(),
                    params
                }
            );

            return response.data.data || [];
        } catch (error) {
            logger.error(`Error fetching ${resource} from ERPNext:`, error.message);
            throw error;
        }
    }

    /**
     * Sync Projects from ERPNext
     */
    async syncProjects() {
        try {
            logger.info('Syncing projects from ERPNext...');

            const erpProjects = await this.fetchFromERPNext('Project', {}, [
                'name',
                'project_name',
                'status',
                'project_type',
                'expected_start_date',
                'expected_end_date',
                'estimated_costing',
                'actual_start_date',
                'actual_end_date',
                'percent_complete',
                'customer',
                'company',
                'priority'
            ]);

            let syncedCount = 0;

            for (const erpProject of erpProjects) {
                const projectData = this.mapProjectData(erpProject);

                await Project.upsert(projectData, {
                    conflictFields: ['externalId']
                });

                syncedCount++;
            }

            logger.info(`Synced ${syncedCount} projects from ERPNext`);
            return { resource: 'Project', count: syncedCount };
        } catch (error) {
            logger.error('Error syncing projects:', error);
            throw error;
        }
    }

    /**
     * Sync Customers (Clients) from ERPNext
     */
    async syncCustomers() {
        try {
            logger.info('Syncing customers from ERPNext...');

            const erpCustomers = await this.fetchFromERPNext('Customer', {}, [
                'name',
                'customer_name',
                'customer_type',
                'customer_group',
                'territory',
                'email_id',
                'mobile_no',
                'website',
                'customer_primary_contact',
                'primary_address'
            ]);

            let syncedCount = 0;

            for (const erpCustomer of erpCustomers) {
                const clientData = this.mapCustomerData(erpCustomer);

                await Client.upsert(clientData, {
                    conflictFields: ['externalId']
                });

                syncedCount++;
            }

            logger.info(`Synced ${syncedCount} customers from ERPNext`);
            return { resource: 'Customer', count: syncedCount };
        } catch (error) {
            logger.error('Error syncing customers:', error);
            throw error;
        }
    }

    /**
     * Sync Sales Invoices (Finance Records) from ERPNext
     */
    async syncSalesInvoices() {
        try {
            logger.info('Syncing sales invoices from ERPNext...');

            const erpInvoices = await this.fetchFromERPNext('Sales Invoice', {}, [
                'name',
                'customer',
                'posting_date',
                'due_date',
                'grand_total',
                'outstanding_amount',
                'status',
                'project',
                'company',
                'currency'
            ]);

            let syncedCount = 0;

            for (const erpInvoice of erpInvoices) {
                const financeData = this.mapSalesInvoiceData(erpInvoice);

                await FinanceRecord.upsert(financeData, {
                    conflictFields: ['externalId']
                });

                syncedCount++;
            }

            logger.info(`Synced ${syncedCount} sales invoices from ERPNext`);
            return { resource: 'Sales Invoice', count: syncedCount };
        } catch (error) {
            logger.error('Error syncing sales invoices:', error);
            throw error;
        }
    }

    /**
     * Sync Payment Entries from ERPNext
     */
    async syncPaymentEntries() {
        try {
            logger.info('Syncing payment entries from ERPNext...');

            const erpPayments = await this.fetchFromERPNext('Payment Entry', {}, [
                'name',
                'posting_date',
                'payment_type',
                'party_type',
                'party',
                'paid_amount',
                'received_amount',
                'mode_of_payment',
                'project',
                'reference_no',
                'reference_date'
            ]);

            let syncedCount = 0;

            for (const erpPayment of erpPayments) {
                const financeData = this.mapPaymentEntryData(erpPayment);

                await FinanceRecord.upsert(financeData, {
                    conflictFields: ['externalId']
                });

                syncedCount++;
            }

            logger.info(`Synced ${syncedCount} payment entries from ERPNext`);
            return { resource: 'Payment Entry', count: syncedCount };
        } catch (error) {
            logger.error('Error syncing payment entries:', error);
            throw error;
        }
    }

    /**
     * Sync Employees from ERPNext
     */
    async syncEmployees() {
        try {
            logger.info('Syncing employees from ERPNext...');

            const erpEmployees = await this.fetchFromERPNext('Employee', {}, [
                'name',
                'employee_name',
                'status',
                'department',
                'designation',
                'date_of_joining',
                'date_of_birth',
                'gender',
                'company',
                'cell_number',
                'personal_email',
                'current_address'
            ]);

            let syncedCount = 0;

            for (const erpEmployee of erpEmployees) {
                const employeeData = this.mapEmployeeData(erpEmployee);

                await Employee.upsert(employeeData, {
                    conflictFields: ['externalId']
                });

                syncedCount++;
            }

            logger.info(`Synced ${syncedCount} employees from ERPNext`);
            return { resource: 'Employee', count: syncedCount };
        } catch (error) {
            logger.error('Error syncing employees:', error);
            throw error;
        }
    }

    /**
     * Sync Items (Inventory) from ERPNext
     */
    async syncItems() {
        try {
            logger.info('Syncing items from ERPNext...');

            const erpItems = await this.fetchFromERPNext('Item', {}, [
                'name',
                'item_name',
                'item_code',
                'item_group',
                'stock_uom',
                'valuation_rate',
                'standard_rate',
                'opening_stock',
                'is_stock_item',
                'description'
            ]);

            let syncedCount = 0;

            for (const erpItem of erpItems) {
                const itemData = this.mapItemData(erpItem);

                await InventoryItem.upsert(itemData, {
                    conflictFields: ['externalId']
                });

                syncedCount++;
            }

            logger.info(`Synced ${syncedCount} items from ERPNext`);
            return { resource: 'Item', count: syncedCount };
        } catch (error) {
            logger.error('Error syncing items:', error);
            throw error;
        }
    }

    /**
     * Sync Purchase Orders from ERPNext
     */
    async syncPurchaseOrders() {
        try {
            logger.info('Syncing purchase orders from ERPNext...');

            const erpPOs = await this.fetchFromERPNext('Purchase Order', {}, [
                'name',
                'supplier',
                'transaction_date',
                'schedule_date',
                'grand_total',
                'status',
                'company',
                'currency',
                'project'
            ]);

            let syncedCount = 0;

            for (const erpPO of erpPOs) {
                const poData = this.mapPurchaseOrderData(erpPO);

                await PurchaseOrder.upsert(poData, {
                    conflictFields: ['externalId']
                });

                syncedCount++;
            }

            logger.info(`Synced ${syncedCount} purchase orders from ERPNext`);
            return { resource: 'Purchase Order', count: syncedCount };
        } catch (error) {
            logger.error('Error syncing purchase orders:', error);
            throw error;
        }
    }

    /**
     * Sync Suppliers (Vendors) from ERPNext
     */
    async syncSuppliers() {
        try {
            logger.info('Syncing suppliers from ERPNext...');

            const erpSuppliers = await this.fetchFromERPNext('Supplier', {}, [
                'name',
                'supplier_name',
                'supplier_type',
                'supplier_group',
                'country',
                'email_id',
                'mobile_no',
                'website',
                'tax_id'
            ]);

            let syncedCount = 0;

            for (const erpSupplier of erpSuppliers) {
                const vendorData = this.mapSupplierData(erpSupplier);

                await Vendor.upsert(vendorData, {
                    conflictFields: ['externalId']
                });

                syncedCount++;
            }

            logger.info(`Synced ${syncedCount} suppliers from ERPNext`);
            return { resource: 'Supplier', count: syncedCount };
        } catch (error) {
            logger.error('Error syncing suppliers:', error);
            throw error;
        }
    }

    /**
     * Sync all data from ERPNext
     */
    async syncAll() {
        try {
            logger.info('Starting full ERPNext sync...');

            const results = [];

            results.push(await this.syncCustomers());
            results.push(await this.syncSuppliers());
            results.push(await this.syncProjects());
            results.push(await this.syncEmployees());
            results.push(await this.syncItems());
            results.push(await this.syncSalesInvoices());
            results.push(await this.syncPaymentEntries());
            results.push(await this.syncPurchaseOrders());

            logger.info('ERPNext sync completed successfully');
            return {
                status: 'success',
                timestamp: new Date(),
                results
            };
        } catch (error) {
            logger.error('Error in full ERPNext sync:', error);
            throw error;
        }
    }

    // ==================== MAPPING FUNCTIONS ====================

    mapProjectData(erpProject) {
        return {
            externalId: `erpnext_project_${erpProject.name}`,
            name: erpProject.project_name || erpProject.name,
            status: this.mapProjectStatus(erpProject.status),
            startDate: erpProject.actual_start_date || erpProject.expected_start_date,
            endDate: erpProject.actual_end_date || erpProject.expected_end_date,
            budget: parseFloat(erpProject.estimated_costing) || 0,
            spent: 0, // Calculate from finance records
            progress: parseFloat(erpProject.percent_complete) || 0,
            clientId: null, // Will be linked after customer sync
            metadata: {
                erpnext_id: erpProject.name,
                project_type: erpProject.project_type,
                customer: erpProject.customer,
                company: erpProject.company,
                priority: erpProject.priority
            }
        };
    }

    mapCustomerData(erpCustomer) {
        return {
            externalId: `erpnext_customer_${erpCustomer.name}`,
            name: erpCustomer.customer_name || erpCustomer.name,
            email: erpCustomer.email_id || null,
            phone: erpCustomer.mobile_no || null,
            address: erpCustomer.primary_address || null,
            metadata: {
                erpnext_id: erpCustomer.name,
                customer_type: erpCustomer.customer_type,
                customer_group: erpCustomer.customer_group,
                territory: erpCustomer.territory,
                website: erpCustomer.website
            }
        };
    }

    mapSalesInvoiceData(erpInvoice) {
        return {
            externalId: `erpnext_invoice_${erpInvoice.name}`,
            type: 'Income',
            category: 'Sales',
            amount: parseFloat(erpInvoice.grand_total) || 0,
            date: erpInvoice.posting_date,
            description: `Sales Invoice ${erpInvoice.name}`,
            projectId: null, // Will be linked if project exists
            metadata: {
                erpnext_id: erpInvoice.name,
                customer: erpInvoice.customer,
                due_date: erpInvoice.due_date,
                outstanding_amount: erpInvoice.outstanding_amount,
                status: erpInvoice.status,
                project: erpInvoice.project,
                currency: erpInvoice.currency
            }
        };
    }

    mapPaymentEntryData(erpPayment) {
        const isIncome = erpPayment.payment_type === 'Receive';

        return {
            externalId: `erpnext_payment_${erpPayment.name}`,
            type: isIncome ? 'Income' : 'Expense',
            category: 'Payment',
            amount: parseFloat(isIncome ? erpPayment.received_amount : erpPayment.paid_amount) || 0,
            date: erpPayment.posting_date,
            description: `Payment Entry ${erpPayment.name}`,
            projectId: null,
            metadata: {
                erpnext_id: erpPayment.name,
                payment_type: erpPayment.payment_type,
                party_type: erpPayment.party_type,
                party: erpPayment.party,
                mode_of_payment: erpPayment.mode_of_payment,
                project: erpPayment.project,
                reference_no: erpPayment.reference_no
            }
        };
    }

    mapEmployeeData(erpEmployee) {
        return {
            externalId: `erpnext_employee_${erpEmployee.name}`,
            name: erpEmployee.employee_name || erpEmployee.name,
            email: erpEmployee.personal_email || null,
            phone: erpEmployee.cell_number || null,
            role: erpEmployee.designation || 'Employee',
            department: erpEmployee.department || 'General',
            status: erpEmployee.status === 'Active' ? 'Active' : 'Inactive',
            metadata: {
                erpnext_id: erpEmployee.name,
                date_of_joining: erpEmployee.date_of_joining,
                date_of_birth: erpEmployee.date_of_birth,
                gender: erpEmployee.gender,
                company: erpEmployee.company,
                address: erpEmployee.current_address
            }
        };
    }

    mapItemData(erpItem) {
        return {
            externalId: `erpnext_item_${erpItem.name}`,
            name: erpItem.item_name || erpItem.name,
            code: erpItem.item_code || erpItem.name,
            category: erpItem.item_group || 'General',
            quantity: parseFloat(erpItem.opening_stock) || 0,
            unit: erpItem.stock_uom || 'Nos',
            unitPrice: parseFloat(erpItem.valuation_rate || erpItem.standard_rate) || 0,
            totalValue: 0, // Will be calculated
            metadata: {
                erpnext_id: erpItem.name,
                description: erpItem.description,
                is_stock_item: erpItem.is_stock_item
            }
        };
    }

    mapPurchaseOrderData(erpPO) {
        return {
            externalId: `erpnext_po_${erpPO.name}`,
            orderNumber: erpPO.name,
            vendorId: null, // Will be linked after supplier sync
            orderDate: erpPO.transaction_date,
            deliveryDate: erpPO.schedule_date,
            totalAmount: parseFloat(erpPO.grand_total) || 0,
            status: this.mapPOStatus(erpPO.status),
            metadata: {
                erpnext_id: erpPO.name,
                supplier: erpPO.supplier,
                company: erpPO.company,
                currency: erpPO.currency,
                project: erpPO.project
            }
        };
    }

    mapSupplierData(erpSupplier) {
        return {
            externalId: `erpnext_supplier_${erpSupplier.name}`,
            name: erpSupplier.supplier_name || erpSupplier.name,
            email: erpSupplier.email_id || null,
            phone: erpSupplier.mobile_no || null,
            address: null,
            taxId: erpSupplier.tax_id || null,
            metadata: {
                erpnext_id: erpSupplier.name,
                supplier_type: erpSupplier.supplier_type,
                supplier_group: erpSupplier.supplier_group,
                country: erpSupplier.country,
                website: erpSupplier.website
            }
        };
    }

    // Helper functions
    mapProjectStatus(erpStatus) {
        const statusMap = {
            'Open': 'In Progress',
            'Completed': 'Completed',
            'Cancelled': 'On Hold',
            'Template': 'Planning'
        };
        return statusMap[erpStatus] || 'In Progress';
    }

    mapPOStatus(erpStatus) {
        const statusMap = {
            'Draft': 'Pending',
            'Submitted': 'Pending',
            'Stopped': 'Cancelled',
            'Cancelled': 'Cancelled',
            'Closed': 'Completed',
            'On Hold': 'Pending',
            'Completed': 'Completed'
        };
        return statusMap[erpStatus] || 'Pending';
    }
}

module.exports = new ERPNextService();
