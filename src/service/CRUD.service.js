
const { sequelize_sqlserver, sequelize_mysql } = require("../config/Sequelize");
const { convertShareHolder, generateEmployeeCode } = require("../helper/Add_Employee.helper");
const defineAssociation = require("../model/association/Association");
const Employment = require("../model/human/Employment");
const Job_History = require("../model/human/Job_History");
const Personal = require("../model/human/Personal");

defineAssociation();

const getAllDepartment = async () => {
    const department = await Job_History.findAll({
        attributes: [sequelize_sqlserver.fn('DISTINCT', sequelize_sqlserver.col('DEPARTMENT')), 'DEPARTMENT']
    }).then(res => JSON.stringify(res))
        .then(JSON_String => JSON.parse(JSON_String));

    return department;
}

const getAllEthnicity = async () => {
    const ethnicity = await Personal.findAll({
        attributes: [sequelize_sqlserver.fn('DISTINCT', sequelize_sqlserver.col('ETHNICITY')), 'ETHNICITY']
    }).then(res => JSON.stringify(res))
        .then(JSON_String => JSON.parse(JSON_String));

    return ethnicity;
}

//add Employee Personal Information
const add_EP_Information = async (req) => {
    //data is information of personel
    const { CURRENT_FIRST_NAME, CURRENT_LAST_NAME, CURRENT_MIDDLE_NAME,
        BIRTH_DATE, SOCIAL_SECURITY_NUMBER, DRIVERS_LICENSE,
        CURRENT_ADDRESS_1, CURRENT_ADDRESS_2, CURRENT_CITY,
        CURRENT_COUNTRY, CURRENT_ZIP, CURRENT_GENDER,
        CURRENT_PHONE_NUMBER, CURRENT_PERSONAL_EMAIL, CURRENT_MARITAL_STATUS,
        ETHNICITY, SHAREHOLDER_STATUS, IS_EMPLOYEE } = req.body;

    const SHAREHOLDER_STATUS_CONVERTED = convertShareHolder(SHAREHOLDER_STATUS) //data after convert

    if (IS_EMPLOYEE) {
        const employeeCode = await generateEmployeeCode()
        addPersonal()

    }else{

    }

    // add employee
    // if(check){
    //     const payroll = await sequelize_mysql.query(
    //         `SELECT e.\`${choice_year}\`, p.\`Tax Percentage\`, p.\`Pay Amount\`, e.\`idEmployee\`
    //     FROM mydb.employee AS e
    //     INNER JOIN mydb.\`pay rates\` AS p ON p.\`idPay Rates\` = e.\`Pay Rates_idPay Rates\`;`,
    //         { type: QueryTypes.SELECT }
    //     ).then(res => JSON.stringify(res))
    //         .then(StringJSON => JSON.parse(StringJSON))
    //         .catch(err => console.log(err));

    // }

    return req.body
}

const addPersonal = async (employeeCode) => {
    //add personal
    sequelize_sqlserver.transaction(async(t) =>{
        const personal = await Personal.create({
            CURRENT_FIRST_NAME: CURRENT_FIRST_NAME,
            CURRENT_LAST_NAME: CURRENT_LAST_NAME,
            CURRENT_MIDDLE_NAME: CURRENT_MIDDLE_NAME,
            BIRTH_DATE: BIRTH_DATE,
            SOCIAL_SECURITY_NUMBER: SOCIAL_SECURITY_NUMBER,
            DRIVERS_LICENSE: DRIVERS_LICENSE,
            CURRENT_ADDRESS_1: CURRENT_ADDRESS_1,
            CURRENT_ADDRESS_2: CURRENT_ADDRESS_2,
            CURRENT_CITY: CURRENT_CITY,
            CURRENT_COUNTRY: CURRENT_COUNTRY,
            CURRENT_ZIP: CURRENT_ZIP,
            CURRENT_GENDER: CURRENT_GENDER,
            CURRENT_PHONE_NUMBER: CURRENT_PHONE_NUMBER,
            CURRENT_PERSONAL_EMAIL: CURRENT_PERSONAL_EMAIL,
            CURRENT_MARITAL_STATUS: CURRENT_MARITAL_STATUS,
            ETHNICITY: ETHNICITY,
            SHAREHOLDER_STATUS: SHAREHOLDER_STATUS,
        }, { transaction: t })
        
        await Employment.create({
            EMPLOYMENT_STATUS: EMPLOYMENT_STATUS
        })
    })
}

module.exports = {
    getAllDepartment, getAllEthnicity, add_EP_Information
}