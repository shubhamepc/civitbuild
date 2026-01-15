const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const AuditLog = sequelize.define('AuditLog', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER
    },
    action: {
        type: DataTypes.STRING,
        allowNull: false
    },
    details: {
        type: DataTypes.JSON // JSONB in PG, TEXT in SQLite
    },
    ip_address: DataTypes.STRING
}, { tableName: 'audit_logs', timestamps: true, updatedAt: false });

module.exports = AuditLog;
