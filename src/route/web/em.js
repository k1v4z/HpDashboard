//em stand for employee management
//This file will define endpoint of employment route

const express = require('express');
const { getAllEmployee, addEPI } = require('../../controller/EmController');
const { getEmployeeView, setEditDataToForm, getEmployeeAdd } = require('../../controller/EmController');

const routerManage = express.Router();

routerManage.get('/manage', getAllEmployee);

//CRUD Action
routerManage.post('/add', addEPI)
routerManage.get('/employee-view', getEmployeeView);
routerManage.get('/employee-view/edit/:id', setEditDataToForm);
routerManage.get('/employee-add', getEmployeeAdd);

module.exports = routerManage;
//temporary for FE test UIz