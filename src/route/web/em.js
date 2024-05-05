//em stand for employee management
//This file will define endpoint of employment route

const express = require('express');
const { getAllEmployee, addEPI,DeletePersonalView } = require('../../controller/EmController');
const { getEmployeeView, setEditDataToForm, getEmployeeAdd } = require('../../controller/HomeController');

const routerManage = express.Router();

routerManage.get('/manage', getAllEmployee);

//CRUD Action
routerManage.post('/add', addEPI)
routerManage.get('/employee-view', getEmployeeView);
routerManage.delete('/employee-view/:id', DeletePersonalView);
routerManage.get('/employee-view/edit/:id', setEditDataToForm);
routerManage.get('/employee-add', getEmployeeAdd);

module.exports = routerManage;
//temporary for FE test UIz