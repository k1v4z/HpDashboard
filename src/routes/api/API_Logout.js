const express = require('express');
const { logout } = require('../../controller/ApiController');

let router = express.Router();

const init_API_Logout = (app) => {
    router.get('/logout', logout);
    app.use('/api/v1/', router);
}

module.exports = init_API_Logout