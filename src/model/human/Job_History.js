const { sequelize_sqlserver } = require('../../config/Sequelize');
const { DataTypes } = require('sequelize');

const Job_History = sequelize_sqlserver.define('Job_History',{
    ID: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    Employee_ID: DataTypes.INTEGER,
    Department: DataTypes.STRING,
    Division: DataTypes.STRING,
    Start_Date: DataTypes.DATE,
    End_Date: DataTypes.DATE,
    Job_Title: DataTypes.STRING,
    Supervisor: DataTypes.INTEGER,
    Job_Category: DataTypes.STRING,
    Location: DataTypes.STRING,
    Departmen_Code: DataTypes.INTEGER,
    Salary_Type: DataTypes.INTEGER,
    Pay_Period: DataTypes.STRING,
    Hours_per_Week: DataTypes.INTEGER,
    Hazardous_Training: DataTypes.BOOLEAN
}, { sequelize_sqlserver, modelName: 'Job_History', tableName: 'Job_History'})

module.exports = Job_History