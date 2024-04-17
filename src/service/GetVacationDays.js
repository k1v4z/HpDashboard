const Employment = require("../model/human/Employment");
const Job_History = require("../model/human/Job_History");
const Personal = require("../model/human/Personal");
const { sequelize_mysql } = require('../config/Sequelize')
const { QueryTypes } = require('sequelize');

function mergeObjectsById(...objects) {
    const mergedArray = [];

    objects.forEach(objArray => {
        objArray.forEach(obj => {
            const id = obj.PERSONAL_ID || obj.idEmployee || obj.EMPLOYMENT_ID; // get ID

            // Create an new object and push on mergedArray
            const mergedObj = { ...obj };
            const existingObjIndex = mergedArray.findIndex(item => item.PERSONAL_ID === id || item.idEmployee === id || item.EMPLOYMENT_ID === id);
            if (existingObjIndex !== -1) {
                Object.assign(mergedArray[existingObjIndex], obj); // Merge object in exist object
            } else {
                mergedArray.push(mergedObj);
            }
        });
    });

    return mergedArray;
}

function filterObjects(Employees, choiceYear, choice, choiceValue) {
    // Filter objects based on condition
    const filteredObjects = Employees.filter(e => {
        // Choose type
        if (choice === 'CURRENT_GENDER') {
            return (e.CURRENT_GENDER === 'Male' && choiceValue === 'Male') ||
                (e.CURRENT_GENDER === 'Female' && choiceValue === 'Female');
        } else if (choice === 'ETHNICITY') {
            return e.ETHNICITY && e.ETHNICITY.includes(choiceValue);
        } else if (choice === 'SHAREHOLDER_STATUS') {
            return typeof e.SHAREHOLDER_STATUS === 'number' && e.SHAREHOLDER_STATUS === parseInt(choiceValue);
        } else if (choice === 'TYPE_OF_WORK') {
            return typeof e.TYPE_OF_WORK === 'number' && e.TYPE_OF_WORK === parseInt(choiceValue);
        } else {
            return false;
        }

    });

    // // If choiceYear === Paid To Date, remove Paid Last Year field
    // if (choiceYear === 'Paid To Date') {
    //     filteredObjects.forEach(obj => delete obj['Paid Last Year']);
    // }
    // //If choiceYear === Paid Last Year, remove Paid To Date field
    // else if (choiceYear === 'Paid Last Year') {
    //     filteredObjects.forEach(obj => delete obj['Paid To Date']);
    // }

    // Return objects fiterd
    return filteredObjects;
}

// Create an object contains employee table: 
const getVacationDays = async (choiceYear, choice, choiceValue) => {
    //Temp hash code change dynamic later
    // const choiceYear = 'Paid Last Year'; //step 1
    // const choice = 'ETHNICITY'; //Gender or Ethinicity or Shareholder or type of work, step 2
    // const choiceValue = 'American'; // value of option, step 3

    const EmployeeWithVacationDays = await sequelize_mysql.query(
        `SELECT \`idEmployee\`, \`Vacation Days\`, \`Paid To Date\`, \`Paid Last Year\` 
        from employee`,
        { type: QueryTypes.SELECT }
    ).then(res => JSON.stringify(res))
        .then(StringJSON => JSON.parse(StringJSON))
        .catch(err => console.log(err));


    const Personals = await Personal.findAll({
        attributes: ['PERSONAL_ID', 'CURRENT_FIRST_NAME', 'CURRENT_MIDDLE_NAME', 'CURRENT_LAST_NAME', 'CURRENT_GENDER',
            'SHAREHOLDER_STATUS', 'ETHNICITY', 'CURRENT_PERSONAL_EMAIL', 'CURRENT_PHONE_NUMBER'],
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


    const AllVacationDaysEmployees = mergeObjectsById(EmployeeWithVacationDays, Personals, Employments, EmploymentStatus);
    const res = filterObjects(AllVacationDaysEmployees, choiceYear, choice, choiceValue)
    // console.log("Mảng gồm:" + res);
    return filterObjects(AllVacationDaysEmployees, choiceYear, choice, choiceValue);
}

getVacationDays();

module.exports = { getVacationDays };
