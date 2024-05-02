const express = require('express');
const { getAllPersonalImformationdata } = require('../../controller/ApiController');

let router = express.Router();

const init_API_getAllPersonal = (app) => {
    router.get('/employee-view', getAllPersonalImformationdata);
    app.use('/api/v1/', router);
}

module.exports = init_API_getAllPersonal;