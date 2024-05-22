const express = require('express');
const { getValuesAverageBenefit } = require('../../controller/ApiController');

let router = express.Router();

const init_API_AverageBenefit = (app) => {
    router.get('/average', getValuesAverageBenefit);
    app.use('/api/v1/', router);
}

module.exports = init_API_AverageBenefit