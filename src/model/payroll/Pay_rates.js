const { sequelize_sqlserver } = require('../../config/Sequelize');
const { DataTypes } = require('sequelize');

// Define model for pay rates table
const PayRate = sequelize_mysql.define('pay rates', {
    'idPay Rates': {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    'Pay Rate Name': {
        type: DataTypes.STRING,
        allowNull: false
    },
    'Value': {
        type: DataTypes.DECIMAL
    },
    'Tax Percentage': {
        type: DataTypes.DECIMAL
    },
    'Pay Type': {
        type: DataTypes.INTEGER
    },
    'Pay Amount': {
        type: DataTypes.DECIMAL
    },
    'PT - Level C': {
        type: DataTypes.DECIMAL
    }
});

module.exports = PayRate;