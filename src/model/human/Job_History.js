const { sequelize_sqlserver } = require('../../config/Sequelize');
const { DataTypes } = require('sequelize');
const Personal = require('./Personal');
const Employment = require('./Employment');

const Job_History = sequelize_sqlserver.define('JOB_HISTORY', {
    JOB_HISTORY_ID: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    EMPLOYMENT_ID: DataTypes.INTEGER,
    DEPARTMENT: DataTypes.STRING,
    DIVISION: DataTypes.STRING,
    FROM_DATE: DataTypes.DATE,
    THRU_DATE: DataTypes.DATE,
    JOB_TITLE: DataTypes.STRING,
    SUPERVISOR: DataTypes.STRING,
    LOCATION: DataTypes.STRING,
    TYPE_OF_WORK: DataTypes.SMALLINT
}, { sequelize_sqlserver, modelName: 'JOB_HISTORY', tableName: 'JOB_HISTORY' });

//define association
Personal.hasMany(Job_History, { foreignKey: 'Employee_ID' });
Job_History.belongsTo(Personal, { foreignKey: 'Employee_ID' });

Personal.hasOne(Employment, { foreignKey: 'Employee_ID' });
Employment.belongsTo(Personal, { foreignKey: 'Employee_ID' });

module.exports = Job_History