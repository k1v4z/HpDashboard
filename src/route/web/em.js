//em stand for employee management
//This file will define endpoint of employment route

const express = require('express');
const { getAllEmployee, addEPI, DeletePersonalView, getEmployeeView, getEmployeeAdd, getChangeBenefitPlan, postUpdateEmploymentPage, setEditDataToFormEmploymentEdit, setEditDataToFormPersonalEdit, postInsertOrUpdatePersonalPage } = require('../../controller/EmController');
const valid = require('../../middleware/Valid_Id');

const routerManage = express.Router();

routerManage.get('/manage', getAllEmployee);

//CRUD Action
routerManage.post('/add', [valid.validBenefitPlanId, valid.validIdPayRate], addEPI)
routerManage.get('/employee-add', getEmployeeAdd);

routerManage.get('/employee-view', getEmployeeView);

routerManage.get('/personal/edit/:id', setEditDataToFormPersonalEdit);
routerManage.post('/update', postInsertOrUpdatePersonalPage)
routerManage.get('/employment/edit/:id', setEditDataToFormEmploymentEdit);
routerManage.post('/update', postUpdateEmploymentPage)
routerManage.get('/benefit_plan/:id', getChangeBenefitPlan)

routerManage.delete('/employee-view/:id', DeletePersonalView);

module.exports = routerManage;
//temporary for FE test UIz