const { QueryTypes } = require("sequelize");
const { sequelize_mysql, sequelize_sqlserver } = require("../config/Sequelize");
const Benefit_Plans = require("../model/human/Benefit_Plans")
const Personal = require("../model/human/Personal");
const defineAssociation = require("../model/association/Association");

defineAssociation();

const getListEmployee = async () => {
    //get human
    const humans = await Personal.findAll({
        attributes: ['CURRENT_FIRST_NAME', 'CURRENT_LAST_NAME', 'CURRENT_MIDDLE_NAME',
            'CURRENT_GENDER', 'ETHNICITY', 'PERSONAL_ID'],
        limit: 10,
        include: [{
            model: Benefit_Plans,
            attributes: ['PLAN_NAME']
        }]
    })
        .then(res => JSON.stringify(res))
        .then(JsonString => JSON.parse(JsonString))
        .catch(err => console.log(err));

    //get payroll
    const payroll = await sequelize_mysql.query(
        `SELECT e.\`Pay Rate\`, p.\`Value\`,e.\`idEmployee\`,e.\`Vacation Days\`
        FROM mydb.employee AS e
        INNER JOIN mydb.\`pay rates\` AS p ON p.\`idPay Rates\` = e.\`Pay Rates_idPay Rates\`;`,
        { type: QueryTypes.SELECT }
    ).then(res => JSON.stringify(res))
        .then(StringJSON => JSON.parse(StringJSON))
        .catch(err => console.log(err));

    return mapping(humans, payroll);
}

const mapping = (humans, payrolls) => {
    //map personal with payroll following id
    const listEmployee = [];
    humans.forEach((human) => {
        payrolls.forEach((payroll) => {
            if (human.PERSONAL_ID == payroll['idEmployee']) {
                human.Value = payroll['Value'];
                human.PayRate = payroll['Pay Rate'];
                human.FullName = human.CURRENT_LAST_NAME + ' ' + human.CURRENT_MIDDLE_NAME + ' ' + human.CURRENT_FIRST_NAME;
                human.VacationDays = payroll['Vacation Days'];
                listEmployee.push(human);
            }
        })
    });

    return listEmployee;
}

module.exports = {
    getListEmployee
}