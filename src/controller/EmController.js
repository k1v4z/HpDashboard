//Em controller stand for Employee Management Controller
//This file will define a controller of Employee Management 

const { getListEmployee } = require("../service/Dashboard.service");

const getAllEmployee = async (req, res) => {
    const listEmployee = await getListEmployee();

    return res.render('employee_management.ejs', {
        listEmployee: listEmployee
    });
}

module.exports = {
    getAllEmployee
}