const { getAllDepartment, getAllEthnicity } = require("../service/CRUD.service");
const { getAllStatusShareholders, getDeductable, getPlanNames, getPercentageCopay } = require('../service/GetShareHolder_status');
const { Getdropdownlist } = require('../helper/GetDropdowlistStatusHolder')
const bodyParser = require('body-parser');
const { getListEmployee } = require("../service/Dashboard.service");

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

const getVacationDays = async(req, res) => {
    const ethnicity = await getAllEthnicity();

    return res.render('number_of_vacation_days.ejs',{
        ethnicity: ethnicity
    });
}

const getAverageBenefitPaid = async (req, res) => {
    const DataGetShareholder_status = await getAllStatusShareholders();
    const Deductable = await getDeductable();
    const Percentage_Copay = await getPercentageCopay();
    const planName = await getPlanNames();


    // Call the Getdropdownlist function with the selected value

    return res.render('average_benefit_paid.ejs', {
        ListPerson: DataGetShareholder_status,
        Deductable: Deductable,
        Percentage_Copay: Percentage_Copay,
        planName: planName
    });
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