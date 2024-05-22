const { QueryTypes } = require("sequelize");
const { sequelize_mysql } = require("../config/Sequelize");
const Benefit_Plans = require("../model/human/Benefit_Plans");
const Personal = require("../model/human/Personal");


const getTotalEarningByCurrentYear = async () => {
    const humans = await Personal.findAll({
        attributes: ['PERSONAL_ID',
            'SHAREHOLDER_STATUS'],
        include: [{
            model: Benefit_Plans,
            attributes: ['DEDUCTABLE'],
            required: true, 
            right: true
        }],
    }).then(res => JSON.stringify(res))
        .then(StringJSON => JSON.parse(StringJSON))
        .catch(err => console.log(err));

    //raw query
    const payrolls = await sequelize_mysql.query(
        `SELECT e.\`Paid To Date\`, p.\`Tax Percentage\`, p.\`Pay Amount\`, e.\`idEmployee\`
        FROM mydb.employee AS e
        INNER JOIN mydb.\`pay rates\` AS p ON p.\`idPay Rates\` = e.\`Pay Rates_idPay Rates\`;`,
        { type: QueryTypes.SELECT }
    ).then(res => JSON.stringify(res))
        .then(StringJSON => JSON.parse(StringJSON))
        .catch(err => console.log(err));
    
    let total = 0;
        humans.forEach((human) => {
            payrolls.forEach((payroll) => {
                if (human.PERSONAL_ID == payroll['idEmployee']) {
                    total += payroll['Pay Amount'] * payroll['Paid To Date'] + human.BENEFIT_PLAN.DEDUCTABLE;
                }
            })
        })
    
    return total;
}



module.exports = {getTotalEarningByCurrentYear}