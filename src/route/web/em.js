//em stand for employee management
//This file will define endpoint of employment route

const express = require('express');
const { getAllEmployee, addEPI, DeletePersonalView, getEmployeeView, getEmployeeAdd, postUpdateEmploymentPage, setEditDataToFormEmploymentEdit, setEditDataToFormPersonalEdit, postInsertOrUpdatePersonalPage } = require('../../controller/EmController');

const routerManage = express.Router();

routerManage.get('/manage', getAllEmployee);

//CRUD Action
routerManage.post('/add', addEPI)
routerManage.get('/employee-view', getEmployeeView);
routerManage.delete('/employee-view/:id', DeletePersonalView);

routerManage.get('/personal/edit/:id', setEditDataToFormPersonalEdit);
routerManage.post('/update', postInsertOrUpdatePersonalPage)

routerManage.get('/employment/edit/:id', setEditDataToFormEmploymentEdit);
routerManage.post('/update', postUpdateEmploymentPage)


routerManage.get('/employee-add', getEmployeeAdd);

module.exports = routerManage;
//temporary for FE test UIz