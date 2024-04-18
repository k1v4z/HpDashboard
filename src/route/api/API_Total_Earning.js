const express = require('express');
const { getTotalEarning } = require('../../controller/ApiController');

let router = express.Router();

const init_API_Total_Earning = (app) => {
    router.get('/total-earnings', getTotalEarning);
    app.use('/api/v1/', router);
}

module.exports = init_API_Total_Earning

