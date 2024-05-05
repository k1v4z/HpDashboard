//Em controller stand for Employee Management Controller
//This file will define a controller of Employee Management 

const { add_EP_Information, getEditPersonal, getAllPersonalImfomations } = require("../service/CRUD.service");
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

const getEmployeeView = async (req, res) => {
    const dataPersonal = await getAllPersonalImfomations();

    return res.render('employee-view.ejs', {
        dataPersonal: dataPersonal
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
    getAllEmployee, addEPI, getEmployeeView, getEmployeeAdd, setEditDataToForm
}
