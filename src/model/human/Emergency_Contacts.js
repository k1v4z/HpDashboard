const { sequelize_sqlserver } = require('../../config/Sequelize');
const { DataTypes } = require('sequelize');

const Emergency_Contacts = sequelize_sqlserver.define('Emergency_Contacts', {
    Employee_ID: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    Emergency_Contact_Name: DataTypes.STRING,
    Phone_Number: DataTypes.STRING,
    Relationship: DataTypes.STRING
}, { sequelize_sqlserver, modelName: 'Emergency_Contacts', tableName: 'Emergency_Contacts' });

module.exports = Emergency_Contacts