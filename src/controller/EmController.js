//Em controller stand for Employee Management Controller
//This file will define a controller of Employee Management 


const isEmployee = require("../helper/IsEmployee");
const { add_EP_Information, getPersonalById, getAllPersonalImfomations, getEmployeeInfor, handleUpdateOrInsertEmployment, deletePersonalAndEmployment } = require("../service/CRUD.service");

const { getListEmployee } = require("../service/Dashboard.service");
const { getEmploymentById } = require("../service/GetEmploymentById");
const getAllDataEmployment = require("../service/GetEmploymentInforFrom2DB");

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

const getEmployeeAdd = (req, res) => {
    return res.render('employee-add.ejs');
}

const setEditDataToForm = async (req, res) => {
    let id = req.params.id;
    let isEmp = await isEmployee(id);

    if (isEmp) {
        let personal = await getPersonalById(id);
        let employment = await getAllDataEmployment(id);
        return res.render('employee-view_edit.ejs', {
            personal: personal,
            employment: employment
        });
    } else {
        let personal = await getPersonalById(id);
        return res.render('employee-view_edit.ejs', {
            personal: personal,
            employment: {}
        });
    }
}


const getEmployeeView = async (req, res) => {
    const dataPersonal = await getAllPersonalImfomations();
    const dataEmployee = await getEmployeeInfor();
    return res.render('employee-view.ejs', {
        dataPersonal: dataPersonal,
        dataEmployee: dataEmployee

    });
}


const postUpdateOrInsertEmployment = async (req, res) => {
    let id = req.params.id;
    const dataUpdate = await handleUpdateOrInsertEmployment(id);
}

const DeletePersonalView = async (req, res) => {
    const idpersonal = req.params.id;
    console.log(idpersonal);

    try {
        await deletePersonalAndEmployment(idpersonal);
        res.status(200).json({ status: "Success!" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting personal data" });
    }
}
module.exports = {
    getAllEmployee, addEPI, getEmployeeView, getEmployeeAdd, setEditDataToForm, DeletePersonalView
}
