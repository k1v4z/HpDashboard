const { getAllDepartment, getAllEthnicity, getAllPersonalImfomations, getEditPersonal } = require("../service/CRUD.service");
const { GetAllShareHolderStatus } = require('../service/GetShareHolder_status');
const bodyParser = require('body-parser');
const { getListEmployee } = require("../service/Dashboard.service");
const { getAllBenefitPlan } = require("./ApiController");
// const { getAllPersonalImfomations } = require("../service/GetAllPersonalData");

const getDashBoard = async (req, res) => {
    const listEmployee = await getListEmployee();

    return res.render('dashboard.ejs', {
        listEmployee: listEmployee
    });
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
    const ethnicity = await getAllEthnicity();

    return res.render('number_of_vacation_days.ejs', {
        ethnicity: ethnicity
    });
}

const getAverageBenefitPaid = async (req, res) => {
    try {
        //const Benefit = await getAllBenefitPlan();
        res.render('average_benefit_paid.ejs');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
};



const getAnnouncementOne = (req, res) => {
    //Notify all employees have birthday in curent month
    return res.render('detail_announcement_1.ejs');
}

const getAnnouncementTwo = (req, res) => {
    //All employees have vacations day over standard
    return res.render('detail_announcement_2.ejs');
}


const getEmployeeView = async (req, res) => {
    const dataPersonal = await getAllPersonalImfomations();
    const dataEmployee= await getEmployeeInfor();
    return res.render('employee-view.ejs', {
        dataPersonal: dataPersonal,
        dataEmployee: dataEmployee

    });
}
const getEmployeeAdd = (req, res) => {
    return res.render('employee-add.ejs');
}

const setEditDataToForm = async (req, res) => {
    let id = req.params.id;
    let result = await getEditPersonal(id);
    // if (!results || results.length === 0) {
    //     // Handle the case where no results are found
    //     return res.status(404).send("No personal data found for the given ID.");
    // }

    return res.render('employee-view_edit.ejs', {
        personal: result
    });
}


module.exports = {
    getDashBoard, getTotalEarnings, getVacationDays, getAverageBenefitPaid,
    getAnnouncementOne, getAnnouncementTwo
}