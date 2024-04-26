//em stand for employee management
//this file will define endpoint of employment route

const express = require('express');
const { getListEmployee } = require('../../service/Dashboard.service');
const routerManage = express.Router();

routerManage.get('/manage', async (req, res) => {
    const listEmployee = await getListEmployee();
    return res.render('employee_management.ejs', {
        listEmployee: listEmployee
    });
});

module.exports = routerManage;
//temporary for FE test UI