//Em controller stand for Employee Management Controller
//This file will define a controller of Employee Management 

const { add_EP_Information } = require("../service/CRUD.service");
const { getListEmployee } = require("../service/Dashboard.service");

const getAllEmployee = async (req, res) => {
    const listEmployee = await getListEmployee();

    return res.render('employee_management.ejs', {
        listEmployee: listEmployee
    });
}

//addEPI stand for add Employee Personal Information
const addEPI = async (req, res) => {
    const add = await add_EP_Information(req);
    
    return res.send(add);
}

//editEPI stand for edit Employee Personal Information
const iditEPI = (req, res) => {
    
}

module.exports = {
    getAllEmployee, addEPI
}