//em stand for employee management
//This file will define endpoint of employment route

const express = require('express');
const { getEmployeePm, DeleteEmployedelete, getAllEmployee, addEPI, DeletePersonalView, getEmployeeView, getEmployeeAdd, getChangeBenefitPlan, postUpdateEmploymentPage, setEditDataToFormEmploymentEdit, setEditDataToFormPersonalEdit, postInsertOrUpdatePersonalPage } = require('../../controller/EmController');
const valid = require('../../middleware/Valid_Id');
const requireFunctionPermission = require('../../middleware/function_middleware');

const routerManage = express.Router();

routerManage.get('/manage', getAllEmployee);

//CRUD Action
routerManage.post('/add', [valid.validBenefitPlanId, valid.validIdPayRate], addEPI)
routerManage.get('/employee-add', requireFunctionPermission, getEmployeeAdd);

routerManage.get('/employee-view', getEmployeeView);
routerManage.get('/delete-employee', getEmployeePm);

routerManage.get('/personal/edit/:id', requireFunctionPermission, setEditDataToFormPersonalEdit);
routerManage.post('/update', postInsertOrUpdatePersonalPage)
routerManage.get('/employment/edit/:id', requireFunctionPermission, setEditDataToFormEmploymentEdit);
routerManage.post('/update', postUpdateEmploymentPage)
routerManage.get('/benefit_plan/:id', getChangeBenefitPlan)

routerManage.delete('/personal-view/:id', DeletePersonalView);
routerManage.delete('/delete-employee/:id',DeleteEmployedelete);

module.exports = routerManage;
