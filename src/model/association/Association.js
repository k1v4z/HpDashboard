const Benefit_Plans = require("../human/Benefit_Plans");
const Employment = require("../human/Employment");
const Job_History = require("../human/Job_History");
const Personal = require("../human/Personal");
const Employment_Working_Time = require("../human/Employment_Working_Time");

//this function will define an association of the tables in database
const defineAssociation = () => {
    Benefit_Plans.hasMany(Personal, { foreignKey: 'BENEFIT_PLAN_ID' });
    Personal.belongsTo(Benefit_Plans, { foreignKey: 'BENEFIT_PLAN_ID' });

    Employment.hasMany(Job_History, { foreignKey: 'EMPLOYMENT_ID' });
    Job_History.belongsTo(Employment, { foreignKey: 'EMPLOYMENT_ID' });

    Personal.hasMany(Employment, { foreignKey: 'PERSONAL_ID' });
    Employment.belongsTo(Personal, { foreignKey: 'PERSONAL_ID' });

    Employment_Working_Time.belongsTo(Employment, { foreignKey: 'EMPLOYMENT_ID'});
}

module.exports = defineAssociation
