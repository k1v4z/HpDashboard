const { QueryTypes } = require("sequelize");
const { sequelize_sqlserver, sequelize_mysql } = require("../config/Sequelize");
const { convertShareHolder, generateEmployeeCode, generatePersonalId, generateEmploymentId, generateEmployeeId, convert_SSN, typeCastingZIP } = require("../helper/Add_Employee.helper");
const defineAssociation = require("../model/association/Association");
const Job_History = require("../model/human/Job_History");
const Personal = require("../model/human/Personal");
const Employment = require("../model/human/Employment");
const Employee = require("../model/payroll/Employees");
const { where } = require("sequelize");
const { query } = require("express");
const Employment_Working_Time = require("../model/human/Employment_Working_Time");
const formatDate = require("../helper/FormatDate");
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
        const employee = dataEmployee.find(Employee => Employee['Employee Number'] === employment.EMPLOYMENT_CODE);
        return { ...employment.toJSON(), ...employee };
    });
    return Data;
}


const deletePersonalAndEmployment = async (Id) => {
    try {
        await sequelize_sqlserver.transaction(async (t) => {
            // Xóa thông tin từ bảng Employment, Job History và Employment Working Time
            await sequelize_sqlserver.query(`
                DELETE FROM EMPLOYMENT_WORKING_TIME WHERE EMPLOYMENT_ID = ${Id};
            `, { transaction: t });

            // Xóa thông tin từ bảng Employment Working Time trước để tránh lỗi
            await sequelize_sqlserver.query(`
                DELETE FROM JOB_HISTORY WHERE EMPLOYMENT_ID = ${Id};
            `, { transaction: t });

            // Xóa thông tin từ bảng Employment
            await sequelize_sqlserver.query(`
                DELETE FROM EMPLOYMENT WHERE EMPLOYMENT_ID = ${Id};
            `, { transaction: t });

            // Xóa thông tin từ bảng Personal
            await sequelize_sqlserver.query(`
                DELETE FROM PERSONAL WHERE PERSONAL_ID = ${Id};
            `, { transaction: t });

        });

        // Xóa thông tin từ bảng Employee
        // await sequelize_mysql.query(
        //     `DELETE FROM employee WHERE \`Employee Number\` = '${Id}';`,
        //     { type: QueryTypes.SELECT}
        // );
    } catch (error) {
        console.error('Lỗi khi xóa thông tin Personal và Employment:', error);
    }
}


//add Employee Personal Information
const add_EP_Information = async (req) => {
    //data is information of personel
    const data = req.body

    let message = ''
    if (data.employee_showInfo == 'on') {
        message = await addEmployee(data)
        return message
    } else {
        message = await addPersonal(data)
        return message
    }

}

const addPersonal = async (data) => {
    const PERSONAL_ID = await generatePersonalId()
    const SHAREHOLDER_STATUS_CONVERTED = convertShareHolder()
    data.CURRENT_ZIP = typeCastingZIP(data.CURRENT_ZIP)
    let message = ''

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

const addEmployee = async (data) => {
    const SHAREHOLDER_STATUS_CONVERTED = convertShareHolder(data.SHAREHOLDER_STATUS) //data after convert
    const PERSONAL_ID = await generatePersonalId()
    const employmentId = await generateEmploymentId()
    const employeeCode = await generateEmployeeCode()
    const employeeId = await generateEmployeeId()
    const SSN_Converted = convert_SSN(data.SOCIAL_SECURITY_NUMBER)
    data.CURRENT_ZIP = typeCastingZIP(data.CURRENT_ZIP)
    let message = ''

    //add personal
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

const getPersonalById = async (id) => {
    const PersonalByID = await Personal.findOne({
        where: {
            PERSONAL_ID: id
        }
    }).then(res => JSON.stringify(res))
        .then(StringJSON => JSON.parse(StringJSON))
        .catch(err => console.log(err));

    return PersonalByID;
}

const handleUpdatePersonal = async (dataPersonal) => {
    let message = '';
    try {
        await Personal.update({
            CURRENT_FIRST_NAME: dataPersonal.first_name,
            CURRENT_MIDDLE_NAME: dataPersonal.middle_name,
            CURRENT_LAST_NAME: dataPersonal.last_name,
            BIRTH_DATE: dataPersonal.birth_date,
            CURRENT_ADDRESS_1: dataPersonal.address_1,
            CURRENT_ADDRESS_2: dataPersonal.address_2,
            CURRENT_ZIP: dataPersonal.current_zip,
            CURRENT_GENDER: dataPersonal.gender,
            CURRENT_PERSONAL_EMAIL: dataPersonal.mail,
            SOCIAL_SECURITY_NUMBER: dataPersonal.Social_security_number,
            DRIVERS_LICENSE: dataPersonal.drivers_license,
            CURRENT_CITY: dataPersonal.city,
            CURRENT_COUNTRY: dataPersonal.country,
            CURRENT_PHONE_NUMBER: dataPersonal.phone_number,
            CURRENT_MARITAL_STATUS: dataPersonal.marital_status,
            SHAREHOLDER_STATUS: dataPersonal.shareholder_status === "Shareholder" ? 1 : 0,
            ETHNICITY: dataPersonal.ethnicity,
            BENEFIT_PLAN_ID: dataPersonal.benefit_plan_id
        }, {
            where: {
                PERSONAL_ID: dataPersonal.id_personal
            }
        });
        message = 'Update Successful';
    } catch (err) {
        console.log('sqlserver: ->>>>>>>>>>>', err);
        message = 'Update Fail';
    }
    return message;
}

const handleInsertEmployment = async (dataPersonal, dataEmployment) => {
    const employeeCode = await generateEmployeeCode()
    const employeeId = await generateEmployeeId()
    const employmentId = await generateEmploymentId()
    try {
        if (dataEmployment.hire_date_working != undefined) {
            await Employment.create({
                EMPLOYMENT_ID: employmentId,
                EMPLOYMENT_CODE: employeeCode,
                EMPLOYMENT_STATUS: dataEmployment.employment_status,
                HIRE_DATE_FOR_WORKING: formatDate(dataEmployment.hire_date_working),
                WORKERS_COMP_CODE: dataEmployment.workers_comp_code,
                TERMINATION_DATE: formatDate(dataEmployment.termination_date),
                REHIRE_DATE_FOR_WORKING: formatDate(dataEmployment.rehire_date_working),
                LAST_REVIEW_DATE: formatDate(dataEmployment.last_review_date),
                NUMBER_DAYS_REQUIREMENT_OF_WORKING_PER_MONTH: dataEmployment.number_days_requirement,
                PERSONAL_ID: dataPersonal.id_personal
            });
            console.log('MSSQL Create Successful');

            // Insert into MySQL database using parameterized queries
            const mysqlQuery = `
                INSERT INTO mydb.employee(
                    \`idEmployee\`, \`Employee Number\`, \`First Name\`, 
                    \`Last Name\`, \`SSN\`, \`Pay Rate\`, \`Pay Rates_idPay Rates\`,
                    \`Vacation Days\`, \`Paid To Date\`, \`Paid Last Year\`
                ) VALUES (
                    :employeeId, :employeeCode, :firstName, 
                    :lastName, :ssn, :payRate, :idPayRate, 
                    :vacationDays, :paidToDate, :paidLastYear
                )`;
            await sequelize_mysql.query(mysqlQuery, {
                replacements: {
                    employeeId,
                    employeeCode,
                    firstName: dataPersonal.first_name,
                    lastName: dataPersonal.last_name,
                    ssn: convert_SSN(dataPersonal.Social_security_number),
                    payRate: dataEmployment.pay_rate,
                    idPayRate: dataEmployment.id_pay_rate,
                    vacationDays: dataEmployment.vacation_days,
                    paidToDate: dataEmployment.paid_to_date,
                    paidLastYear: dataEmployment.paid_last_year
                },
                type: QueryTypes.INSERT
            });
            console.log('MySQL Create Successful');
            return 'Create Successful in both databases';
        }
    } catch (error) {
        console.error('Error during employment creation:', error);
        return 'Create Fail';
    }
}

const handleUpdateEmployment = async (dataPersonal, dataEmployment) => {
    try {
        if (dataEmployment.pay_rate != undefined) {
            const preprocessedDataMSSQL = {
                EMPLOYMENT_STATUS: dataEmployment.employment_status,
                HIRE_DATE_FOR_WORKING: formatDate(dataEmployment.hire_date_working),
                WORKERS_COMP_CODE: dataEmployment.workers_comp_code,
                TERMINATION_DATE: formatDate(dataEmployment.termination_date),
                REHIRE_DATE_FOR_WORKING: formatDate(dataEmployment.rehire_date_working),
                LAST_REVIEW_DATE: formatDate(dataEmployment.last_review_date),
                NUMBER_DAYS_REQUIREMENT_OF_WORKING_PER_MONTH: dataEmployment.number_days_requirement
            };

            const preprocessedDataMYSQL = {
                firstName: dataPersonal.first_name,
                lastName: dataPersonal.last_name,
                ssn: convert_SSN(dataPersonal.Social_security_number),
                payRate: dataEmployment.pay_rate,
                idPayRate: dataEmployment.id_pay_rate,
                vacationDays: dataEmployment.vacation_days,
                paidToDate: dataEmployment.paid_to_date,
                paidLastYear: dataEmployment.paid_last_year,
                employeeNumber: dataEmployment.employment_code
            };
            console.log(preprocessedDataMYSQL.vacationDays)
            // SQL Server Update
            await Employment.update(preprocessedDataMSSQL, {
                where: { PERSONAL_ID: dataPersonal.id_personal }
            });
            console.log('MSSQL Update Successful');

            // MySQL Update
            await sequelize_mysql.query(
                `UPDATE mydb.employee SET
                \`First Name\`=:firstName,
                \`Last Name\`=:lastName,
                \`SSN\`=:ssn,
                \`Pay Rate\`=:payRate,
                \`Pay Rates_idPay Rates\`=:idPayRate,
                \`Vacation Days\`=:vacationDays,
                \`Paid To Date\`=:paidToDate,
                \`Paid Last Year\`=:paidLastYear
                WHERE \`Employee Number\`=:employeeNumber;`,
                { replacements: preprocessedDataMYSQL, type: QueryTypes.UPDATE }
            );
            console.log('MySQL Update Successful');

            return 'Update Successful';
        }
    } catch (error) {
        console.error('Error during employment update/insert:', error);
        throw new Error('Operation failed');
    }
}


module.exports = {
    getAllDepartment, getAllEthnicity, getAllPersonalImfomations, add_EP_Information, getEmployeeInfor,
    deletePersonalAndEmployment, getPersonalById, handleUpdateEmployment, handleUpdatePersonal, handleInsertEmployment
}