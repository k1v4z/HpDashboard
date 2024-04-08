const { sequelize_sqlserver } = require('../../config/Sequelize');
const { DataTypes } = require('sequelize');

const Benefit_Plans = sequelize_sqlserver.define('Benefit_Plans', {
    Benefit_Plan_ID: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    Plan_Name: DataTypes.STRING,
    Deductable: DataTypes.INTEGER,
    Percentage_CoPay: DataTypes.INTEGER
}, { sequelize_sqlserver, modelName: 'Benefit_Plans', tableName: 'Benefit_Plans' });

module.exports = Benefit_Plans