//Em controller stand for Employee Management Controller
//This file will define a controller of Employee Management 


const { add_EP_Information, getPersonalById, getAllPersonalImfomations, getEmployeeInfor, handleUpdateEmployment,
    handleUpdatePersonal, deletePersonalAndEmployment, getDataPersonalByPage, getDataEmploymentByPage,
    handleInsertEmployment, getBenefitPlanById } = require("../service/CRUD.service");
const isEmployee = require("../helper/IsEmployee");
const { getListEmployee } = require("../service/Dashboard.service");
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
    id = req.params.id;
    let personal = await getPersonalById(id);
    let employment = await getAllDataEmployment(id);
    return res.render('employment_edit.ejs', {
        personal: personal,
        employment: employment
    });
}

const setEditDataToFormPersonalEdit = async (req, res) => {
    id = req.params.id;
    let personal = await getPersonalById(id);
    return res.render('personal_edit.ejs', {
        personal: personal
    })
}

const getId = () => {
    return id;
}


const getEmployeeView = async (req, res) => {
    const dataPersonal = await getAllPersonalImfomations();
    const dataEmployee = await getEmployeeInfor();
    return res.render('employee-view.ejs', {
        dataPersonal: dataPersonal,
        dataEmployee: dataEmployee

    });
}

const postInsertOrUpdatePersonalPage = async (req, res) => {
    const data = req.body;
    const dataPersonal = await getDataPersonalByPage(data);
    const dataEmployment = await getDataEmploymentByPage(data);

    try {
        // First, always update personal details regardless of conditions
        await handleUpdatePersonal(dataPersonal);
        // Check if the employee record exists only when necessary
        if (dataEmployment.workers_comp_code !== "" || dataEmployment.vacation_days !== 0) {
            let isEmp = await isEmployee(dataPersonal.id_personal);

            if (!isEmp) {
                // If employee does not exist, insert new employment data
                await handleInsertEmployment(dataPersonal, dataEmployment);
            } else {
                // If employee exists, update employment data
                await handleUpdateEmployment(dataPersonal, dataEmployment);
            }
        }

        return res.redirect("/employee-view");
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).send("Internal Server Error");
    }
}


const postUpdateEmploymentPage = async (req, res) => {
    const data = req.body;
    const dataPersonal = await getDataPersonalByPage(data);
    const dataEmployment = await getDataEmploymentByPage(data);
    try {
        await handleUpdatePersonal(dataPersonal);
        await handleUpdateEmployment(dataPersonal, dataEmployment)
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


const getChangeBenefitPlan = async(req, res) => {
    const personal = await getPersonalById(req.params.id)
    const fullName = `${personal.CURRENT_FIRST_NAME} ${personal.CURRENT_MIDDLE_NAME} ${personal.CURRENT_LAST_NAME}`
    const benefitPlan = await getBenefitPlanById(personal.BENEFIT_PLAN_ID)

    return res.render('change_benefit_plan.ejs',{
        name: fullName,
        benefit: benefitPlan
    });
}


module.exports = {
    getAllEmployee, addEPI, getEmployeeView, getEmployeeAdd, setEditDataToFormEmploymentEdit, DeletePersonalView, postInsertOrUpdatePersonalPage,
    postUpdateEmploymentPage, setEditDataToFormPersonalEdit, getId, getChangeBenefitPlan
}
