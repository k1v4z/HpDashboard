const { sequelize_sqlserver } = require('../../config/Sequelize');
const { DataTypes } = require('sequelize');
const Personal = require('./Personal');
const Employment = require('./Employment');

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
}, { sequelize_sqlserver, modelName: 'Job_History', tableName: 'Job_History'});

//define association
Personal.hasMany(Job_History,{foreignKey: 'Employee_ID'});
Job_History.belongsTo(Personal,{foreignKey: 'Employee_ID'});

Personal.hasOne(Employment,{foreignKey: 'Employee_ID'});
Employment.belongsTo(Personal,{foreignKey: 'Employee_ID'});

module.exports = Job_History