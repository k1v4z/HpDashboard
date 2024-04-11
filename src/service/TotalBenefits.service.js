const { sequelize_mysql } = require("../config/Sequelize");
const { checkPersonalWhere, checkEmploymentWhere } = require("../helper/CheckCondition.helper");
const Employment = require("../model/human/Employment");
const Job_History = require("../model/human/Job_History");
const Personal = require("../model/human/Personal");
const { QueryTypes } = require('sequelize');

const CalculateTotalBenefits = async () => {

    //Temp hash code change dynamic later
    const department = 'Marketing'; //step1 
    const choice_year = 'Paid To Date'; //step 2
    const choice = 'Employment_Status'; //Gender or Ethinicity or Shareholder status option 3
    const choiceValue = 'Part-Time';

    let Total_Benefit = 0;

    const humans = await Job_History.findAll({
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
    const payroll = await sequelize_mysql.query(
        `SELECT e.\`${choice_year}\`, p.\`Tax Percentage\`, p.\`Pay Amount\`, e.\`idEmployee\`
        FROM mydb.employee AS e
        INNER JOIN mydb.\`pay rates\` AS p ON p.\`idPay Rates\` = e.\`Pay Rates_idPay Rates\`;`,
        { type: QueryTypes.SELECT }
    ).then(res => JSON.stringify(res))
        .then(StringJSON => JSON.parse(StringJSON))
        .catch(err => console.log(err));

    const benefit = humans.map((human, index) => {
        human.fullname = human.Personal.First_Name + ' ' + human.Personal.Middle_Initial + ' ' + human.Personal.Last_Name;
        const tempAmount = payroll[index]['Pay Amount'] * payroll[index][`${choice_year}`];
        human.Total_benefit = tempAmount - (tempAmount * payroll[index]['Tax Percentage'] / 100);
        Total_Benefit += human.Total_benefit;
        return human;
    });

    console.log(Total_Benefit);
    console.log(benefit);
}


CalculateTotalBenefits();
