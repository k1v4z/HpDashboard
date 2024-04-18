const { Op } = require("sequelize");
const defineAssociation = require("../model/association/Association");
const Employment = require("../model/human/Employment");
const Personal = require("../model/human/Personal");
const { sequelize_sqlserver } = require("../config/Sequelize");

defineAssociation();

const getEmployeeCertainDayAniversary = async () => {
    const currentDay = new Date();
    const formatCurrentDay = currentDay.toISOString().slice(0, 10); //format yyyy-mm-dd

    const employee = await Personal.findAll({
        attributes: ['CURRENT_FIRST_NAME', 'CURRENT_LAST_NAME', 'CURRENT_MIDDLE_NAME','CURRENT_GENDER'],
        include: [{
            model: Employment,
            attributes: ['HIRE_DATE_FOR_WORKING'],
        }],
        order: sequelize_sqlserver.literal('NEWID()'), //get random
        limit: 1
    })
        .then(res => JSON.stringify(res))
        .then(JsonString => JSON.parse(JsonString))
        .catch(err => console.log(err));

    //Set full name
    employee[0].FullName = employee[0].CURRENT_LAST_NAME + ' ' + employee[0].CURRENT_MIDDLE_NAME + ' ' + employee[0].CURRENT_FIRST_NAME;
    //Set certain day of their hiring aniversary
    employee[0].certainDay = (Date.parse(formatCurrentDay) - Date.parse(employee[0].EMPLOYMENTs[0].HIRE_DATE_FOR_WORKING)) / 86400000;

    return employee[0];
}

module.exports = {
    getEmployeeCertainDayAniversary
}