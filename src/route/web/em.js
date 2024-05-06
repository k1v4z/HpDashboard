//em stand for employee management
//This file will define endpoint of employment route

const express = require('express');
const { getAllEmployee, addEPI, DeletePersonalView, getEmployeeView, getEmployeeAdd, postUpdateOrInsertEmployment, setEditDataToFormEmploymentEdit, setEditDataToFormPersonalEdit } = require('../../controller/EmController');

const routerManage = express.Router();

routerManage.get('/manage', getAllEmployee);

//CRUD Action
routerManage.post('/add', addEPI)
routerManage.get('/employee-view', getEmployeeView);
routerManage.delete('/employee-view/:id', DeletePersonalView);

routerManage.get('/employment/edit/:id', setEditDataToFormEmploymentEdit);
routerManage.post('manage-employment/update', postUpdateOrInsertEmployment)

routerManage.get('/personal/edit/:id', setEditDataToFormPersonalEdit);
routerManage.post('/manage-personal/update', postUpdateOrInsertEmployment)

routerManage.get('/employee-add', getEmployeeAdd);

module.exports = routerManage;
//temporary for FE test UIz