const { Project, FinanceRecord, PurchaseOrder, InventoryItem, Vendor, Employee } = require('../models');
const { Op } = require('sequelize');

exports.getDashboardSummary = async (req, res) => {
    try {
        // 1. Total Revenue (Sum of Invoices Paid)
        const revenue = await FinanceRecord.sum('amount', {
            where: { type: 'invoice', status: 'Paid' }
        });

        // 2. Outstanding Receivables (Sum of Invoices Pending)
        const outstanding = await FinanceRecord.sum('amount', {
            where: { type: 'invoice', status: 'Pending' }
        });

        // 3. Project Expenses (Sum of Expenses)
        const expenses = await FinanceRecord.sum('amount', {
            where: { type: 'expense' }
        });

        // 4. Active Projects
        const activeProjects = await Project.count({
            where: { status: 'In Progress' }
        });

        // 5. Vendor Outstanding (Mock logic: 20% of POs are unpaid)
        const totalPO = await PurchaseOrder.sum('total_amount');
        const vendorOutstanding = totalPO ? totalPO * 0.2 : 0;

        res.json({
            totalRevenue: revenue || 0,
            outstandingReceivables: outstanding || 0,
            totalExpenses: expenses || 0,
            activeProjects: activeProjects || 0,
            vendorOutstanding: vendorOutstanding || 0
        });
    } catch (error) {
        console.error('KPI Error:', error);
        res.status(500).json({ error: 'Failed to fetch KPIs' });
    }
};

exports.getProjects = async (req, res) => {
    try {
        const { status, client, from, to } = req.query;
        const where = {};
        if (status) where.status = status;
        if (client) where.client_name = { [Op.iLike]: `%${client}%` };
        if (from && to) where.start_date = { [Op.between]: [from, to] };

        const projects = await Project.findAll({ where });
        res.json(projects);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch projects' });
    }
};

exports.getFinance = async (req, res) => {
    try {
        const { type } = req.params; // invoices or payments
        const financeType = type === 'invoices' ? 'invoice' : 'payment';
        const records = await FinanceRecord.findAll({
            where: { type: financeType },
            limit: 100,
            order: [['date', 'DESC']]
        });
        res.json(records);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch finance records' });
    }
};

exports.getInventory = async (req, res) => {
    try {
        const items = await InventoryItem.findAll({ limit: 100 });
        res.json(items);
    } catch (error) {
        res.status(500).json({ error: 'Failed' });
    }
};

exports.getProcurement = async (req, res) => {
    try {
        const pos = await PurchaseOrder.findAll({
            include: [{ model: Vendor, attributes: ['name'] }],
            limit: 100
        });
        res.json(pos);
    } catch (error) {
        res.status(500).json({ error: 'Failed' });
    }
};

exports.getEmployees = async (req, res) => {
    try {
        const employees = await Employee.findAll({ limit: 100 });
        res.json(employees);
    } catch (error) {
        res.status(500).json({ error: 'Failed' });
    }
};

exports.getBudgetVariance = async (req, res) => {
    try {
        // Fetch projects with their expenses
        const projects = await Project.findAll({
            include: [{
                model: FinanceRecord,
                required: false,
                where: { type: 'expense' },
                attributes: ['amount']
            }]
        });

        const varianceData = projects.map(p => {
            const totalExpenses = p.FinanceRecords
                ? p.FinanceRecords.reduce((sum, r) => sum + parseFloat(r.amount), 0)
                : 0;
            const budget = parseFloat(p.budget) || 0;
            const utilization = budget > 0 ? (totalExpenses / budget) * 100 : 0;

            return {
                id: p.id,
                name: p.name,
                budget: budget,
                actual: totalExpenses,
                utilization: parseFloat(utilization.toFixed(1))
            };
        });

        // Sort by utilization descending (Risky projects first)
        varianceData.sort((a, b) => b.utilization - a.utilization);

        res.json(varianceData.slice(0, 5)); // Return top 5
    } catch (error) {
        console.error("Budget Variance Error:", error);
        res.status(500).json({ error: 'Failed to fetch variance data' });
    }
};
