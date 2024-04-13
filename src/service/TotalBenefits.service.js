const { sequelize_mysql } = require("../config/Sequelize");
const { checkPersonalWhere, checkEmploymentWhere } = require("../helper/CheckCondition.helper");
const defineAssociation = require("../model/association/Association");
const Benefit_Plans = require("../model/human/Benefit_Plans");
const Employment = require("../model/human/Employment");
const Job_History = require("../model/human/Job_History");
const Personal = require("../model/human/Personal");
const { QueryTypes } = require('sequelize');

defineAssociation();

const getBenefitEachPersonal = async () => {

    //Temp hash code change dynamic later
    const department = 'Sales'; //step1 
    const choice_year = 'Paid To Date'; //step 2
    const choice = 'CURRENT_GENDER'; //Gender or Ethinicity or Shareholder status option 3
    const choiceValue = 'Female';

    let Total_Benefit = 0;

    const humans = await Personal.findAll({
        attributes: ['PERSONAL_ID', 'CURRENT_FIRST_NAME', 'CURRENT_MIDDLE_NAME', 'CURRENT_LAST_NAME',
            'SHAREHOLDER_STATUS', 'ETHNICITY'],
        where: checkPersonalWhere(choice, choiceValue),
        include: [{
            model: Benefit_Plans,
            attributes: ['DEDUCTABLE'],
            required: true,
            right: true
        }, {
            model: Employment,
            attributes: ['EMPLOYMENT_STATUS'],
            required: true,
            right: true,
            where: checkEmploymentWhere(choice, choiceValue),
            include: [{
                model: Job_History,
                attributes: ['DEPARTMENT'],
                where: { DEPARTMENT: department },
                required: true,
                right: true
            }]
        }],
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
    console.log(mapping(humans, payroll,choice_year));
}

const mapping = (humans, payrolls,choice_year) => {
    //map personal with payroll following id
    const benefit_each_person = [];
    humans.forEach((human) => {
        payrolls.forEach((payroll) => {
            if(human.PERSONAL_ID == payroll['idEmployee']){
                human.benefit = payroll['Pay Amount'] * payroll[choice_year] + + human.BENEFIT_PLAN.DEDUCTABLE;
                benefit_each_person.push(human);
            }
        })
    })

    return benefit_each_person;
}

getBenefitEachPersonal();