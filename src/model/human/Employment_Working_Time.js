const { sequelize_sqlserver } = require("../../config/Sequelize");
const { DataTypes } = require('sequelize');

const Employment_Working_Time = sequelize_sqlserver.define('EMPLOYMENT_WORKING_TIME', {
    EMPLOYMENT_WORKING_TIME_ID: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    EMPLOYMENT_ID: DataTypes.INTEGER,
    YEAR_WORKING: DataTypes.DATE,
    MONTH_WORKING: DataTypes.INTEGER,
    NUMBER_DAYS_ACTUAL_OF_WORKING_PER_MONTH: DataTypes.INTEGER,
    TOTAL_NUMBER_VACATION_WORKING_DAYS_PER_MONTH: DataTypes.INTEGER
}, { sequelize_sqlserver, modelName: 'EMPLOYMENT_WORKING_TIME', tableName:'EMPLOYMENT_WORKING_TIME'});

module.exports = Employment_Working_Time;