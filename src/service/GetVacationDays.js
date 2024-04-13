const Benefit_Plans = require('../model/human/Benefit_Plans')
const Employment = require("../model/human/Employment");
const Job_History = require("../model/human/Job_History");
const Personal = require("../model/human/Personal");
const Employee = require('../model/payroll/Employees')
const { sequelize_mysql } = require('../config/Sequelize')
const { QueryTypes } = require('sequelize');

function mergeObjectsById(...objects) {
    const mergedObject = {};

    objects.forEach(objArray => {
        objArray.forEach(obj => {
            const id = obj.PERSONAL_ID || obj.idEmployee || obj.EMPLOYMENT_ID; // Lấy ID

            if (!mergedObject[id]) {
                mergedObject[id] = {}; // Tạo một object mới nếu chưa tồn tại
            }

            Object.assign(mergedObject[id], obj); // Merge object vào object đã tồn tại
        });
    });

    return mergedObject;
}

// Tạo object chứa bảng employee
const getVacationDays = async () => {
    //Temp hash code change dynamic later
    const choice_year = 'Paid To Date'; //step 1
    const choice = 'Employment_Status'; //Gender or Ethinicity or Shareholder or type of work, step 2
    const choiceValue = 'Part-Time'; // value of option, step 3

    const EmployeeWithVacationDays = await sequelize_mysql.query(
        `SELECT \`idEmployee\`, \`Vacation Days\`, \`Paid To Date\`, \`Paid Last Year\` 
        from employee`,
        { type: QueryTypes.SELECT }
    ).then(res => JSON.stringify(res))
        .then(StringJSON => JSON.parse(StringJSON))
        .catch(err => console.log(err));


    const Personals = await Personal.findAll({
        attributes: ['PERSONAL_ID', 'CURRENT_FIRST_NAME', 'CURRENT_MIDDLE_NAME', 'CURRENT_LAST_NAME', 'CURRENT_GENDER',
            'SHAREHOLDER_STATUS', 'ETHNICITY'],
    }).then(res => JSON.stringify(res))
        .then(StringJSON => JSON.parse(StringJSON))
        .catch(err => console.log(err));

    const Employments = await Employment.findAll({
        attributes: ['PERSONAL_ID', 'EMPLOYMENT_ID'],
    }).then(res => JSON.stringify(res))
        .then(StringJSON => JSON.parse(StringJSON))
        .catch(err => console.log(err));

    const EmploymentStatus = await Job_History.findAll({
        attributes: ['EMPLOYMENT_ID', 'TYPE_OF_WORK'],
    }).then(res => JSON.stringify(res))
        .then(StringJSON => JSON.parse(StringJSON))
        .catch(err => console.log(err));

    
    const mergedObject = mergeObjectsById(EmployeeWithVacationDays, Personals, Employments, EmploymentStatus);
    console.log(mergedObject);


    
}

getVacationDays();
