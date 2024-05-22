const express = require('express');
const { getAllMessage } = require('../../controller/ApiController');

let router = express.Router();

const init_API_Changed_Benefit_Plan = (app) => {
    router.get('/changed-benefit-plan', getAllMessage);
    app.use('/api/v1/', router);
}

module.exports = init_API_Changed_Benefit_Plan

