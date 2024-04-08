const { sequelize_sqlserver } = require('../../config/Sequelize');
const { DataTypes } = require('sequelize');

// Define model for employee table
const Employee = sequelize_mysql.define('employee', {
    'idEmployee': {
        type: DataTypes.INTEGER,
    },
    'Employee Number': {
        type: DataTypes.INTEGER,
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
},
    {
        sequelize_mysql,
        modelName: 'Employee',
        tableName: 'employee'
    });


module.exports = PayRate;