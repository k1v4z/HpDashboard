const { sequelize_mysql } = require('../../config/Sequelize');
const { DataTypes } = require('sequelize');
const PayRate = require('./Pay_rates');

// Define model for employee table
const Employee = sequelize_mysql.define('employee', {
    'idEmployee': {
        type: DataTypes.INTEGER,
    },
    'Employee Number': {
        type: DataTypes.STRING,
        primaryKey: true
    },
    'Last Name': {
        type: DataTypes.STRING,
    },
    'First Name': {
        type: DataTypes.STRING,
    },
    'SSN': {
        type: DataTypes.DECIMAL,
    },
    'Pay Rate': {
        type: DataTypes.STRING,
    },
    'Pay Rates_idPay Rates': {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    'Vacation Days': {
        type: DataTypes.INTEGER,
    },
    'Paid To Date': {
        type: DataTypes.DECIMAL,
    },
    'Paid Last Year': {
        type: DataTypes.DECIMAL,
    },
}, { sequelize_mysql, modelName: 'Employee', tableName: 'employee' });

//define association
Employee.hasOne(PayRate, { foreignKey: 'idPay Rates' });
PayRate.belongsTo(Employee);

module.exports = Employee;