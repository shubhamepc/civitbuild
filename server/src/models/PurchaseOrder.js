const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PurchaseOrder = sequelize.define('PurchaseOrder', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    project_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    vendor_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    total_amount: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false
    },
    issue_date: DataTypes.DATEONLY,
    expected_delivery: DataTypes.DATEONLY,
    status: {
        type: DataTypes.STRING, // Issued, Received, Cancelled
        defaultValue: 'Issued'
    }
}, { tableName: 'purchase_orders', timestamps: true });

module.exports = PurchaseOrder;
