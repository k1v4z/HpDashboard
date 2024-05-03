const { QueryTypes } = require("sequelize");
const { sequelize_sqlserver, sequelize_mysql } = require("../config/Sequelize");
const { convertShareHolder, generateEmployeeCode, generatePersonalId, generateEmployeeId, generateEmploymentId, convert_SSN } = require("../helper/Add_Employee.helper");
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
//add Employee Personal Information
const add_EP_Information = async (req) => {
    //data is information of personel
    const data = req.body

    let message = ''
    if (data.employee_showInfo == 'on') {
        message = await addEmployee(data)
        return message
    }else{
        message = await addPersonal(data)
        return message
    }
}

const addPersonal = async (data) => {
    const PERSONAL_ID = await generatePersonalId()
    const SHAREHOLDER_STATUS_CONVERTED = convertShareHolder(data.SHAREHOLDER_STATUS)
    let message = ''

    if (data.CURRENT_ZIP == '') {
        data.CURRENT_ZIP = null
    } else {
        data.CURRENT_ZIP = Number(data.CURRENT_ZIP)
    }

    await Personal.create({
        PERSONAL_ID: PERSONAL_ID,
        CURRENT_FIRST_NAME: data.CURRENT_FIRST_NAME,
        CURRENT_LAST_NAME: data.CURRENT_LAST_NAME,
        CURRENT_MIDDLE_NAME: data.CURRENT_MIDDLE_NAME,
        BIRTH_DATE: data.BIRTH_DATE,
        SOCIAL_SECURITY_NUMBER: data.SOCIAL_SECURITY_NUMBER,
        DRIVERS_LICENSE: data.DRIVERS_LICENSE,
        CURRENT_ADDRESS_1: data.CURRENT_ADDRESS_1,
        CURRENT_ADDRESS_2: data.CURRENT_ADDRESS_2,
        CURRENT_CITY: data.CURRENT_CITY,
        CURRENT_COUNTRY: data.CURRENT_COUNTRY,
        CURRENT_ZIP: data.CURRENT_ZIP,
        CURRENT_GENDER: data.CURRENT_GENDER,
        CURRENT_PHONE_NUMBER: data.CURRENT_PHONE_NUMBER,
        CURRENT_PERSONAL_EMAIL: data.CURRENT_PERSONAL_EMAIL,
        CURRENT_MARITAL_STATUS: data.CURRENT_MARITAL_STATUS,
        ETHNICITY: data.ETHNICITY,
        SHAREHOLDER_STATUS: SHAREHOLDER_STATUS_CONVERTED,
    }).then(res => message = 'Create Successful')
        .catch((err) => {
            console.log('sqlserver: ->>>>>>>>>>>', err);
            return message = 'Create Fail'
        })
    
    return message
}


const getEditPersonal = async (id) => {
    const PersonalByID = await Personal.findOne({
        where: {
            PERSONAL_ID: id
        }
    }).then(res => JSON.stringify(res))
        .then(StringJSON => JSON.parse(StringJSON))
        .catch(err => console.log(err));

    return PersonalByID;
};

// getEditPersonal(3).then(personalData => {
//     console.log(personalData);
// }).catch(error => {
//     console.error('An error occurred:', error);
// });



const addEmployee = async (data) => {
    const employeeCode = await generateEmployeeCode()
    const SHAREHOLDER_STATUS_CONVERTED = convertShareHolder(data.SHAREHOLDER_STATUS) //data after convert
    let message = ''
    const PERSONAL_ID = await generatePersonalId()
    const employeeId = await generateEmployeeId()
    const employmentId = await generateEmploymentId()
    const SSN_Converted = convert_SSN(data.SOCIAL_SECURITY_NUMBER)

    if (data.CURRENT_ZIP == '') {
        data.CURRENT_ZIP = null
    } else {
        data.CURRENT_ZIP = Number(data.CURRENT_ZIP)
    }

    sequelize_sqlserver.transaction(async (t) => {
        const personal = await Personal.create({
            PERSONAL_ID: PERSONAL_ID,
            CURRENT_FIRST_NAME: data.CURRENT_FIRST_NAME,
            CURRENT_LAST_NAME: data.CURRENT_LAST_NAME,
            CURRENT_MIDDLE_NAME: data.CURRENT_MIDDLE_NAME,
            BIRTH_DATE: data.BIRTH_DATE,
            SOCIAL_SECURITY_NUMBER: data.SOCIAL_SECURITY_NUMBER,
            DRIVERS_LICENSE: data.DRIVERS_LICENSE,
            CURRENT_ADDRESS_1: data.CURRENT_ADDRESS_1,
            CURRENT_ADDRESS_2: data.CURRENT_ADDRESS_2,
            CURRENT_CITY: data.CURRENT_CITY,
            CURRENT_COUNTRY: data.CURRENT_COUNTRY,
            CURRENT_ZIP: data.CURRENT_ZIP,
            CURRENT_GENDER: data.CURRENT_GENDER,
            CURRENT_PHONE_NUMBER: data.CURRENT_PHONE_NUMBER,
            CURRENT_PERSONAL_EMAIL: data.CURRENT_PERSONAL_EMAIL,
            CURRENT_MARITAL_STATUS: data.CURRENT_MARITAL_STATUS,
            ETHNICITY: data.ETHNICITY,
            SHAREHOLDER_STATUS: SHAREHOLDER_STATUS_CONVERTED,
        }, { transaction: t });

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
    getAllDepartment, getAllEthnicity, getAllPersonalImfomations, add_EP_Information, getEditPersonal
}