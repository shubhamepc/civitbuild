const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const InventoryItem = sequelize.define('InventoryItem', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    project_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    unit: {
        type: DataTypes.STRING, // pcs, kg, m, etc.
        defaultValue: 'pcs'
    },
    unit_price: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.00
    },
    last_updated: DataTypes.DATE
}, { tableName: 'inventory_items', timestamps: true });

module.exports = InventoryItem;
