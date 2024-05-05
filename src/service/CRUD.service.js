const { QueryTypes } = require("sequelize");
const { sequelize_sqlserver, sequelize_mysql } = require("../config/Sequelize");
const { convertShareHolder, generateEmployeeCode } = require("../helper/Add_Employee.helper");
const defineAssociation = require("../model/association/Association");
const Job_History = require("../model/human/Job_History");
const Personal = require("../model/human/Personal");
const Employment = require("../model/human/Employment");
const Employee = require("../model/payroll/Employees");
const { where } = require("sequelize");
const { query } = require("express");
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
const getAllPersonalImfomations = async () => {
    const data = await Personal.findAll({
        include: [{
            model: Employment,
        }]
    }).then(res => JSON.stringify(res))
        .then(StringJSON => JSON.parse(StringJSON))
        .catch(err => console.log(err));
    return data;
}

const getEmployeeInfor = async () => {
    const dataEmployment = await Employment.findAll({
        include: [{
            model: Personal,
            required: true, // Inner join
        }]
    })

    let ids = dataEmployment.map(Employment => Employment.EMPLOYMENT_ID);
    console.log(ids);

    const dataEmployee = await sequelize_mysql.query(
        `SELECT * FROM mydb.employee 
         WHERE idEmployee IN (${ids.join(',')})`,
        { type: QueryTypes.SELECT }
    );
    const Data = dataEmployment.map(employment => {
        const employee = dataEmployee.find(Employee => Employee.idEmployee === employment.EMPLOYMENT_ID);
        return { ...employment.toJSON(), ...employee };
      });
      return Data;
}


const DeleletePersonal= async (id)=>{
    const data = await Personal.destroy({
        where: {
            PERSONAL_ID: id
        }
    });
    return data;
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

    } else {

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
    sequelize_sqlserver.transaction(async (t) => {
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
            EMPLOYMENT_ID: employmentId,
            EMPLOYMENT_CODE: employeeCode,
            EMPLOYMENT_STATUS: data.EMPLOYMENT_STATUS,
            HIRE_DATE_FOR_WORKING: data.HIRE_DATE_FOR_WORKING,
            WORKERS_COMP_CODE: data.WORKERS_COMP_CODE,
            TERMINATION_DATE: data.TERMINATION_DATE,
            REHIRE_DATE_FOR_WORKING: data.REHIRE_DATE_FOR_WORKING,
            LAST_REVIEW_DATE: data.LAST_REVIEW_DATE,
            NUMBER_DAYS_REQUIREMENT_OF_WORKING_PER_MONTH: data.NUMBER_DAY_REQUIREMENT,
            PERSONAL_ID: personal.PERSONAL_ID
        }, { transaction: t })
    }).then(res => message = 'Create Successful')
        .catch((err) => {
            console.log('sqlserver: ->>>>>>>>>>>', err);
            return message = 'Create Fail'
        })

    if (message == 'Create Fail')
        return message

    //add employee
    await sequelize_mysql.query(
        `INSERT INTO mydb.employee(\`idEmployee\`,\`Employee Number\`,\`First Name\`,
            \`Last Name\`,\`SSN\`,\`Pay Rate\`,\`Pay Rates_idPay Rates\`,
            \`Vacation Days\`,\`Paid To Date\`,\`Paid Last Year\`
        ) VALUES (${employeeId},'${employeeCode}','${data.CURRENT_FIRST_NAME}','${data.CURRENT_LAST_NAME}',${SSN_Converted},'${data.PAY_RATE}',${data.ID_PAY_RATE},${data.VACATION_DAYS},${data.PAID_TO_DATE},${data.PAID_LAST_YEAR});`,
        { type: QueryTypes.INSERT }
    ).then(res => message = 'Create Successful')
        .catch((err) => {
            console.log('mysql: ->>>>>>>>>>>', err);
            return message = 'Create Fail'
        })

    return message;
}

module.exports = {
    getAllDepartment, getAllEthnicity, getAllPersonalImfomations, add_EP_Information, getEmployeeInfor,DeleletePersonal
}