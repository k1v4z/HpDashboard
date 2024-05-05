const { QueryTypes } = require("sequelize");
const { sequelize_mysql } = require("../config/Sequelize");
const Employment = require("../model/human/Employment");
const defineAssociation = require("../model/association/Association");


defineAssociation();


const getEmployment = async (id) => {
    const employmentData = await Employment.findOne({
        where: { PERSONAL_ID: id },
        attributes: ['EMPLOYMENT_ID', 'EMPLOYMENT_CODE', 'EMPLOYMENT_STATUS', 'HIRE_DATE_FOR_WORKING', 'WORKERS_COMP_CODE', 'TERMINATION_DATE', 'REHIRE_DATE_FOR_WORKING', 'LAST_REVIEW_DATE', 'NUMBER_DAYS_REQUIREMENT_OF_WORKING_PER_MONTH', 'PERSONAL_ID']
    }).catch(err => {
        console.log(err);
        return null; // Trả về null nếu có lỗi
    });

    return employmentData;
};

const getEmployee = async (id) => {
    const employment = await getEmployment(id);
    if (!employment) return null;

    const employeeData = await sequelize_mysql.query(
        `SELECT e.\`SSN\`, e.\`Pay Rate\`, e.\`Pay Rates_idPay Rates\`, e.\`Vacation Days\`, e.\`Paid To Date\`, e.\`Paid Last Year\`
        FROM mydb.employee AS e
        WHERE e.\`Employee Number\` = '${employment.EMPLOYMENT_CODE}';`,
        { type: QueryTypes.SELECT }
    ).catch(err => {
        console.log(err);
        return null; // Trả về null nếu có lỗi
    });

    return employeeData;
};


const getAllDataEmployment = async (id) => {
    const employment = await getEmployment(id);
    const employee = await getEmployee(id);

    if (employment && employee) {
        return { ...employment.dataValues, ...employee[0] };
    }

    return null;
}

// getAllDataEmployment(4).then(data => {
//     console.log(data);
// }).catch(error => {
//     console.error("Error:", error);
// });


module.exports = getAllDataEmployment;