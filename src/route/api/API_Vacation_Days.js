const express = require('express');
const { getAllVacationDays } = require('../../controller/ApiController');

let router = express.Router();

const init_API_Vacation_Days = (app) => {
    router.get('/vacation-days', getAllVacationDays);
    app.use('/api/v1/', router);
}

module.exports = init_API_Vacation_Days