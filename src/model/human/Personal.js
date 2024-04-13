const { sequelize_sqlserver } = require('../../config/Sequelize');
const { DataTypes } = require('sequelize');
const Employment = require('./Employment');
const Benefit_Plans = require('./Benefit_Plans');

const Personal = sequelize_sqlserver.define('PERSONAL', {
    PERSONAL_ID: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    CURRENT_FIRST_NAME: DataTypes.STRING,
    CURRENT_LAST_NAME: DataTypes.STRING,
    CURRENT_MIDDLE_NAME: DataTypes.STRING,
    BIRTH_DATE: DataTypes.DATE,
    SOCIAL_SECURITY_NUMBER: DataTypes.STRING,
    DRIVERS_LICENSE: DataTypes.STRING,
    CURRENT_ADDRESS_1: DataTypes.STRING,
    CURRENT_ADDRESS_2: DataTypes.STRING,
    CURRENT_CITY: DataTypes.STRING,
    CURRENT_COUNTRY: DataTypes.STRING,
    CURRENT_ZIP: DataTypes.NUMBER,
    CURRENT_GENDER: DataTypes.STRING,
    CURRENT_PHONE_NUMBER: DataTypes.STRING,
    CURRENT_PERSONAL_EMAIL: DataTypes.STRING,
    CURRENT_MARITAL_STATUS: DataTypes.STRING,
    ETHNICITY: DataTypes.STRING,
    SHAREHOLDER_STATUS: DataTypes.SMALLINT,
    BENEFIT_PLAN_ID: DataTypes.INTEGER
}, { sequelize_sqlserver, modelName: 'PERSONAL', tableName: 'PERSONAL' });

module.exports = Personal