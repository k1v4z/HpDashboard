const express = require('express');
const { getAllBenefitPlan } = require('../../controller/ApiController');

let router = express.Router();

const init_API_BenefitPlan = (app) => {
    router.get('/average-benefit-paid', getAllBenefitPlan);
    app.use('/api/v1/', router);
}

module.exports = init_API_BenefitPlan