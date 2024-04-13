const { sequelize_sqlserver } = require('../../config/Sequelize');
const { DataTypes } = require('sequelize');
const Personal = require('./Personal');


const Benefit_Plans = sequelize_sqlserver.define('BENEFIT_PLANS', {
    BENEFIT_PLANS_ID: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    PLAN_NAME: DataTypes.STRING,
    DEDUCTABLE: DataTypes.INTEGER,
    PERCENTAGE_COPAY: DataTypes.INTEGER
}, { sequelize_sqlserver, modelName: 'BENEFIT_PLANS', tableName: 'BENEFIT_PLANS' });

// Benefit_Plans.hasMany(Personal, { foreignKey: 'BENEFIT_PLAN_ID' });
// Personal.belongsTo(Benefit_Plans, { foreignKey: 'BENEFIT_PLAN_ID' });

module.exports = Benefit_Plans