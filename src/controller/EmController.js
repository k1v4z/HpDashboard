//Em controller stand for Employee Management Controller
//This file will define a controller of Employee Management 


const isEmployee = require("../helper/IsEmployee");
const { add_EP_Information, getPersonalById, getAllPersonalImfomations, getEmployeeInfor, handleUpdateOrInsertEmployment, deletePersonalAndEmployment } = require("../service/CRUD.service");

const { getListEmployee } = require("../service/Dashboard.service");
const { getEmploymentById } = require("../service/GetEmploymentById");
const getAllDataEmployment = require("../service/GetEmploymentInforFrom2DB");
let id;

const getAllEmployee = async (req, res) => {
    const listEmployee = await getListEmployee();

    return res.render('employee_management.ejs', {
        listEmployee: listEmployee
    });
}

//addEPI stand for add Employee Personal Information

const addEPI = async (req, res) => {
    const status = await add_EP_Information(req);

    return res.send(status);

}

const getEmployeeAdd = (req, res) => {
    return res.render('employee-add.ejs');
}

const setEditDataToFormEmploymentEdit = async (req, res) => {
    let id = req.params.id;
    let isEmp = await isEmployee(id);

    if (isEmp) {
        let personal = await getPersonalById(id);
        let employment = await getAllDataEmployment(id);
        return res.render('employment_edit.ejs', {
            personal: personal,
            employment: employment
        });
    } else {
        let personal = await getPersonalById(id);
        return res.render('employment_edit.ejs', {
            personal: personal,
            employment: {}
        });
    }
}

const setEditDataToFormPersonalEdit = async (req, res) => {
    id = req.params.id;
    let isEmp = await isEmployee(id);

    if (isEmp) {
        let personal = await getPersonalById(id);
        let employment = await getAllDataEmployment(id);
        return res.render('personal_edit.ejs', {
            personal: personal,
            employment: employment
        });
    } else {
        let personal = await getPersonalById(id);
        return res.render('personal_edit.ejs', {
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
    let idPersonal = id;
    const dataPersonal = {
        id_personal: idPersonal,
        first_name: req.body.CURRENT_FIRST_NAME,
        middle_name: req.body.CURRENT_MIDDLE_NAME,
        last_name: req.body.CURRENT_LAST_NAME,
        birth_date: req.body.BIRTH_DATE,
        address_1: req.body.CURRENT_ADDRESS_1,
        address_2: req.body.CURRENT_ADDRESS_2,
        current_zip: req.body.CURRENT_ZIP,
        gender: req.body.CURRENT_GENDER,
        mail: req.body.CURRENT_PERSONAL_EMAIL,
        Social_security_number: req.body.SOCIAL_SECURITY_NUMBER,
        drivers_license: req.body.DRIVERS_LICENSE,
        city: req.body.CURRENT_CITY,
        country: req.body.CURRENT_COUNTRY,
        phone_number: req.body.CURRENT_PHONE_NUMBER,
        marital_status: req.body.CURRENT_MARITAL_STATUS,
        shareholder_status: req.body.SHAREHOLDER_STATUS,
        ethnicity: req.body.ETHNICITY
    };
    const dataEmployment = {
        hire_date_working: req.body.HIRE_DATE_FOR_WORKING,
        employment_code: req.body.EMPLOYMENT_CODE,
        terminattion_date: req.body.TERMINATION_DATE,
        Worker_comp_code: req.body.WORKERS_COMP_CODE,
        rehire_date_working: req.body.REHIRE_DATE_FOR_WORKING,
        last_review_date: req.body.LAST_REVIEW_DATE,
        employment_status: req.body.EMPLOYMENT_STATUS,
        pay_rate: req.body.PAY_RATE,
        id_pay_rate: req.body.ID_PAY_RATE,
        vaction_days: req.body.VACATION_DAYS,
        paid_to_date: req.body.PAID_TO_DATE,
        paid_last_year: req.body.PAID_LAST_YEAR,
        number_days_requirement: req.body.NUMBER_DAY_REQUIREMENT
    };
    try {
        await handleUpdateOrInsertEmployment(dataPersonal, dataEmployment);
        return res.redirect("/employee-view");
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).send("Internal Server Error");
    }
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
    getAllEmployee, addEPI, getEmployeeView, getEmployeeAdd, setEditDataToFormEmploymentEdit, DeletePersonalView, postUpdateOrInsertEmployment, setEditDataToFormPersonalEdit
}
