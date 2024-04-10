const { sequelize_sqlserver } = require('../../config/Sequelize');
const { DataTypes } = require('sequelize');

const Employment = sequelize_sqlserver.define('Employment', {
    Employee_ID: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    Employment_Status: DataTypes.STRING,
    Hire_Date: DataTypes.DATE,
    Workers_Comp_Code: DataTypes.STRING,
    Termination_Date: DataTypes.DATE,
    Rehire_Date: DataTypes.DATE,
    Last_Review_Date: DataTypes.DATE
  }, { sequelize_sqlserver, modelName: 'Employment', tableName: 'Employment' });

  module.exports = Employment;