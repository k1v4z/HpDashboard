const defineAssociation = require("../model/association/Association");
const Employment = require("../model/human/Employment");
const Employee = require("../model/payroll/Employees");

defineAssociation();



const getEmploymentById = async (id) => {
    const EmploymentByID = await Employment.findOne({
        where: {
            PERSONAL_ID: id
        }
    }).then(res => JSON.stringify(res))
        .then(StringJSON => JSON.parse(StringJSON))
        .catch(err => console.log(err));

    return EmploymentByID;
}



const getEmployeeByCode = async (id) => {
    const getAnEmployment = await getEmploymentById(id);
    let employeeNumber = getAnEmployment.EMPLOYMENT_CODE;
    const EmployeeByID = await Employee.findOne({
        where: {
            'Employee Number': employeeNumber
        }
    }).then(res => JSON.stringify(res))
        .then(StringJSON => JSON.parse(StringJSON))
        .catch(err => console.log(err));

    return EmployeeByID;
}


module.exports = {
    getEmploymentById, getEmployeeByCode
}