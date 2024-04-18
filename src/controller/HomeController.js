const { getAllDepartment, getAllEthnicity } = require("../service/CRUD.service");
const {getAllStatusShareholders,getDeductable,getPlanNames,getPercentageCopay}= require('../service/GetShareHolder_status');
const {Getdropdownlist}= require('../helper/GetDropdowlistStatusHolder')
const bodyParser = require('body-parser');
const getDashBoard = (req, res) => {
    return res.render('dashboard.ejs');
}

const getTotalEarnings = async (req, res) => {
    const department = await getAllDepartment();
    const ethnicity = await getAllEthnicity();

    return res.render('total_earning.ejs', {
        department: department,
        ethnicity: ethnicity
    });
}

const getVacationDays = async (req, res) => {
    // Load ethnicity to dropdownlist button
    const ethnicity = await getAllEthnicity();
    return res.render('number_of_vacation_days.ejs', {
        ethnicity: ethnicity
    });
}

const getAverageBenefitPaid = (req, res) => {
    return res.render('average_benefit_paid.ejs');
}

const getAnnouncementOne = (req, res) => {
    //Notify all employees have birthday in curent month
    return res.render('detail_announcement_1.ejs');
}

const getAnnouncementTwo = (req, res) => {
    //All employees have vacations day over standard
    return res.render('detail_announcement_2.ejs');
}

module.exports = {
    getDashBoard, getTotalEarnings, getVacationDays, getAverageBenefitPaid,
    getAnnouncementOne, getAnnouncementTwo
}