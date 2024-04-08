const { sequelize_sqlserver } = require('../../config/Sequelize');
const { DataTypes } = require('sequelize');

const Personal = sequelize_sqlserver.define('Personal', {
    Employee_ID: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    First_Name: DataTypes.STRING,
    Middle_Initial: DataTypes.STRING,
    Address1: DataTypes.STRING,
    Address2: DataTypes.STRING,
    City: DataTypes.STRING,
    State: DataTypes.STRING,
    Zip: DataTypes.NUMBER,
    Email: DataTypes.STRING,
    Phone_Number: DataTypes.STRING,
    Social_Security_Number: DataTypes.STRING,
    Drivers_License: DataTypes.STRING,
    Marital_Status: DataTypes.STRING,
    Gender: DataTypes.BOOLEAN,
    Shareholder_Status: DataTypes.BOOLEAN,
    Benefit_Plans: DataTypes.INTEGER,
    Ethnicity: DataTypes.STRING
}, { sequelize_sqlserver, modelName: 'Personal', tableName: 'Personal' });

module.exports = Personal