const express = require('express');
const { setDataEmployment } = require('../../controller/ApiController');

let router = express.Router();

const init_API_DataEmployment = (app) => {
    router.get('/employment-data', setDataEmployment);
    app.use('/api/v1/', router);
}

module.exports = init_API_DataEmployment