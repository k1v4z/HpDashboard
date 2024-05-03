//em stand for employee management
//This file will define endpoint of employment route

const express = require('express');
const { getAllEmployee, addEPI } = require('../../controller/EmController');
const { getEmployeeView, getEmployeeViewEdit, getEmployeeAdd } = require('../../controller/HomeController');

const routerManage = express.Router();

routerManage.get('/manage', getAllEmployee);
routerManage.get('/employee-view', getEmployeeView);
routerManage.post('/employee-viewEdit', getEmployeeViewEdit);
routerManage.get('/employee-add', getEmployeeAdd);

//CRUD Action
routerManage.post('/add', addEPI)
module.exports = routerManage;
//temporary for FE test UI