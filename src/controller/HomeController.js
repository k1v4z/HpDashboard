const { getAllDepartment, getAllEthnicity, getAverageVacationDays } = require("../service/CRUD.service");
const { getListEmployee } = require("../service/Dashboard.service");
const getAverage = require("../service/GetAverageBenefitByType");
const { getTotalEarningByCurrentYear } = require("../service/GetTotalEarningByDate");

const getDashBoard = async (req, res) => {
    const listEmployee = await getListEmployee();
    const { shareholderAverage, nonShareholderAverage } = await getAverage();
    const averageVacationDays = await getAverageVacationDays();
    const averageBenefit = (shareholderAverage + nonShareholderAverage) / 2;
    const totalE = await getTotalEarningByCurrentYear();
    return res.render('dashboard.ejs', {
        listEmployee: listEmployee,
        averageBenefit: averageBenefit,
        avgDays: averageVacationDays,
        totalE: totalE
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
        const { shareholderAverage, nonShareholderAverage } = await getAverage();
        res.render('average_benefit_paid.ejs', { shareholderAverage, nonShareholderAverage });
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

const getAccessControl = (req, res) => {
    //All employees have vacations day over standard
    return res.render('access_control.ejs');
}

const getAddAccessControl = (req, res) => {
    console.log("Hello")
    return res.render('add_access_control.ejs');
}

const getManagementForm = (req, res) => {
    return res.render('employee_management.ejs')
}

const getAuthorization = (req, res) => {
    return res.render('access-control_edit.ejs')
}

module.exports = {
    getDashBoard,
    getTotalEarnings,
    getVacationDays,
    getAverageBenefitPaid,
    getAnnouncementOne,
    getAddAccessControl,
    getAnnouncementTwo,
    getAccessControl,
    getManagementForm,
    getAuthorization
}