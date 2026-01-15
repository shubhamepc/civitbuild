const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const FinanceRecord = sequelize.define('FinanceRecord', {
    id: {
        type: DataTypes.STRING, // Invoice ID or Payment Ref
        primaryKey: true
    },
    project_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.ENUM('invoice', 'payment', 'expense'),
        allowNull: false
    },
    amount: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING, // Paid, Pending, Overdue
        defaultValue: 'Pending'
    },
    description: DataTypes.TEXT,
    vendor_id: DataTypes.INTEGER // Optional, if linked to a vendor
}, { tableName: 'finance_records', timestamps: true });

module.exports = FinanceRecord;
