//em stand for employee management
//This file will define endpoint of employment route

const express = require('express');
const { getAllEmployee } = require('../../controller/EmController');
const routerManage = express.Router();

routerManage.get('/manage', getAllEmployee);

module.exports = routerManage;
//temporary for FE test UI