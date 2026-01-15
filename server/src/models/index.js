const sequelize = require('../config/database');
const User = require('./User');
const Project = require('./Project');
const Client = require('./Client');
const FinanceRecord = require('./FinanceRecord');
const Vendor = require('./Vendor');
const PurchaseOrder = require('./PurchaseOrder');
const InventoryItem = require('./InventoryItem');
const Employee = require('./Employee');
const AuditLog = require('./AuditLog');

// Associations
Project.hasMany(FinanceRecord, { foreignKey: 'project_id' });
FinanceRecord.belongsTo(Project, { foreignKey: 'project_id' });

Vendor.hasMany(PurchaseOrder, { foreignKey: 'vendor_id' });
PurchaseOrder.belongsTo(Vendor, { foreignKey: 'vendor_id' });
PurchaseOrder.belongsTo(Project, { foreignKey: 'project_id' });
Project.hasMany(PurchaseOrder, { foreignKey: 'project_id' });

Project.hasMany(InventoryItem, { foreignKey: 'project_id' });
InventoryItem.belongsTo(Project, { foreignKey: 'project_id' });

User.hasMany(AuditLog, { foreignKey: 'user_id' });
AuditLog.belongsTo(User, { foreignKey: 'user_id' });

const initModels = async () => {
    try {
        await sequelize.sync({ alter: true });
        console.log('All models were synchronized successfully.');
    } catch (error) {
        console.error('Unable to synchronize models:', error);
    }
};

module.exports = {
    sequelize,
    initModels,
    User,
    Project,
    Client,
    FinanceRecord,
    Vendor,
    PurchaseOrder,
    InventoryItem,
    Employee,
    AuditLog
};
