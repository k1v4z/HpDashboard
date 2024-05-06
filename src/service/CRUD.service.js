const { QueryTypes } = require("sequelize");
const { sequelize_sqlserver, sequelize_mysql } = require("../config/Sequelize");
const { convertShareHolder, generateEmployeeCode, generatePersonalId, generateEmploymentId, generateEmployeeId, convert_SSN } = require("../helper/Add_Employee.helper");
const defineAssociation = require("../model/association/Association");
const Job_History = require("../model/human/Job_History");
const Personal = require("../model/human/Personal");
const Employment = require("../model/human/Employment");
const Employee = require("../model/payroll/Employees");
const { where } = require("sequelize");
const { query } = require("express");
const isEmployee = require("../helper/IsEmployee");
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
    // console.log(ids);

    const dataEmployee = await sequelize_mysql.query(
        `SELECT * FROM mydb.employee 
         WHERE idEmployee IN (${ids.join(',')})`,
        { type: QueryTypes.SELECT }
    );
    const Data = dataEmployment.map(employment => {
        const employee = dataEmployee.find(Employee => Employee['Employee Number'] === employment.EMPLOYMENT_CODE);
        return { ...employment.toJSON(), ...employee };
    });
      console.log(Data);
    return Data;
}


const deletePersonalAndEmployment = async (personalId) => {
    try {
        // Xóa thông tin từ bảng Employment trước
        await Employment.destroy({
            where: {
                EMPLOYMENT_ID: personalId
            }
        });

        // Sau đó xóa thông tin từ bảng Personal
        const deletedPersonalCount = await Personal.destroy({
            where: {
                PERSONAL_ID: personalId
            }
        });

        if (deletedPersonalCount > 0) {
            console.log(`Xóa thành công thông tin của PERSONAL_ID ${personalId}`);
        } else {
            console.log(`Không tìm thấy bản ghi nào với PERSONAL_ID ${personalId}`);
        }
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
    const SHAREHOLDER_STATUS_CONVERTED = convertShareHolder(data.SHAREHOLDER_STATUS) //data after convert
    const PERSONAL_ID = await generatePersonalId()
    const employmentId = await generateEmploymentId()
    const employeeCode = await generateEmployeeCode()
    const employeeId = await generateEmployeeId()
    const SSN_Converted = await convert_SSN()
    
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

const handleUpdateOrInsertEmployment = async (dataPersonal, dataEmployment) => {
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
            ETHNICITY: dataPersonal.ethnicity
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


    let isEmployment = isEmployee(dataPersonal.id_personal).then(isEmp => {
        return isEmp;
    });
    try {
        if (!isEmployment) {
            console.log("INSERT INTO");
            const insertSQL = `
        INSERT INTO dbo.EMPLOYMENT (EMPLOYMENT_ID, EMPLOYMENT_CODE, EMPLOYMENT_STATUS, HIRE_DATE_FOR_WORKING, WORKERS_COMP_CODE, TERMINATION_DATE, REHIRE_DATE_FOR_WORKING, LAST_REVIEW_DATE, NUMBER_DAYS_REQUIREMENT_OF_WORKING_PER_MONTH)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
            // Giả sử bạn có tất cả dữ liệu cần thiết cho INSERT
            let employment_id = generateEmploymentId();
            let employment_code = generateEmployeeCode();
            await sequelize_sqlserver.query(insertSQL, [employment_id, employment_code, dataEmployment.employment_status, dataEmployment.hire_date_working, dataEmployment.employment_status, dataEmployment.hire_date_working, ], { type: QueryTypes.INSERT });
        } else {
            console.log("UPDATE");
            const querySQLSERVER = `
            UPDATE dbo.EMPLOYMENT
            SET EMPLOYMENT_ID = ?, EMPLOYMENT_CODE = ?, EMPLOYMENT_STATUS = ?, HIRE_DATE_FOR_WORKING = ?, WORKERS_COMP_CODE = ?, TERMINATION_DATE = ?, REHIRE_DATE_FOR_WORKING = ?, LAST_REVIEW_DATE = ?, NUMBER_DAYS_REQUIREMENT_OF_WORKING_PER_MONTH = ?
            WHERE PERSONAL_ID = ?`;
            await sequelize_sqlserver.query(querySQLSERVER, [
                dataEmployment.employment_id,
                dataEmployment.employment_code,
                dataEmployment.employment_status,
                dataEmployment.hire_date_working,
                dataEmployment.workers_comp_code,
                dataEmployment.termination_date,
                dataEmployment.rehire_date_working,
                dataEmployment.last_review_date,
                dataEmployment.number_days_requirement,
                dataPersonal.id_personal
            ], { type: QueryTypes.UPDATE });


            const queryMYSQL = `
            UPDATE mydb.employee
            SET \`idEmployee\` = ?, \`First Name\` = ?, \`Last Name\` = ?, \`SSN\` = ?, \`Pay Rate\` = ?, \`Pay Rates_idPay Rates\` = ?, \`Vacation Days\` = ?, \`Paid To Date\` = ?, \`Paid Last Year\` = ?
            WHERE \`Employee Number\` = ?`;
            await sequelize_mysql.query(queryMYSQL, [
                dataEmployment.id_employee,
                dataPersonal.first_name,
                dataPersonal.last_name,
                dataPersonal.Social_security_number,
                dataEmployment.pay_rate,
                dataEmployment.id_pay_rate,
                dataEmployment.vacation_days,
                dataEmployment.paid_to_date,
                dataEmployment.paid_last_year,
                dataPersonal.id_personal
            ], { type: QueryTypes.UPDATE });
        }
    } catch (error) {
        console.error('Error during employment update/insert:', error);
        throw new Error('Operation failed');
    }
}

module.exports = {
    getAllDepartment, getAllEthnicity, getAllPersonalImfomations, add_EP_Information, getEmployeeInfor, deletePersonalAndEmployment, getPersonalById, handleUpdateOrInsertEmployment
}