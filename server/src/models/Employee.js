const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Employee = sequelize.define('Employee', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    designation: DataTypes.STRING,
    department: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    joining_date: DataTypes.DATEONLY,
    salary: DataTypes.DECIMAL(10, 2),
    status: {
        type: DataTypes.STRING, // Active, On Leave, Left
        defaultValue: 'Active'
    }
}, { tableName: 'employees', timestamps: true });

module.exports = Employee;
