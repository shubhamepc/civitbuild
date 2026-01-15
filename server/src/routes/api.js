const express = require('express');
const router = express.Router();
const settingsController = require('../controllers/settingsController');
const dashboardController = require('../controllers/dashboardController');

// KPIs
router.get('/kpis/summary', dashboardController.getDashboardSummary);
router.get('/kpis/budget-variance', dashboardController.getBudgetVariance);

// Modules
router.get('/projects', dashboardController.getProjects);
router.get('/finance/:type', dashboardController.getFinance); // :type = invoices, payments
router.get('/inventory/stocks', dashboardController.getInventory);
router.get('/procurement/pos', dashboardController.getProcurement);
router.get('/hr/employees', dashboardController.getEmployees);

// System
router.post('/settings', settingsController.saveSettings);

module.exports = router;
