const { sequelize_mysql } = require("../config/Sequelize");
const { checkPersonalWhere, checkEmploymentWhere } = require("../helper/CheckCondidtion.helper");
const Employment = require("../model/human/Employment");
const Job_History = require("../model/human/Job_History");
const Personal = require("../model/human/Personal");
const Employee = require("../model/payroll/Employees");
const PayRate = require("../model/payroll/Pay_rates");
const { QueryTypes } = require('sequelize');

const CalculateTotalBenefits = async () => {

    //Temp hash code change dynamic later
    const department = 'Marketing'; //step1 
    const choice_year = 'Paid To Date'; //step 2
    const choice = 'Employment_Status'; //Gender or Ethinicity or Shareholder status option 3
    const choiceValue = 'Part-Time';

    const personalAttribute = await Job_History.findAll({
        attributes: ['Employee_ID', 'Department'],
        where: { Department: department },
        include: [{
            model: Personal,
            attributes: ['First_Name', 'Last_Name', 'Middle_Initial'],
            where: checkPersonalWhere(choice, choiceValue),
            include: [{
                model: Employment,
                attributes: ['Employment_Status'],
                where: checkEmploymentWhere(choice, choiceValue)
            }]
        }]
    }).then(res => JSON.stringify(res))
        .then(StringJSON => JSON.parse(StringJSON))
        .catch(err => console.log(err));

    //raw query
    const payrollAttribute = await sequelize_mysql.query(
        `SELECT e.\`${choice_year}\`, p.\`Tax Percentage\`, p.\`Pay Amount\`, e.\`idEmployee\`
        FROM mydb.employee AS e
        INNER JOIN mydb.\`pay rates\` AS p ON p.\`idPay Rates\` = e.\`Pay Rates_idPay Rates\`;`,
        { type: QueryTypes.SELECT }
    ).then(res => JSON.stringify(res))
        .then(StringJSON => JSON.parse(StringJSON))
        .catch(err => console.log(err));

    console.log(personalAttribute);
    console.log(payrollAttribute[0]);
}


CalculateTotalBenefits();
