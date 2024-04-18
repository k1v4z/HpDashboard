const express = require('express');
const { getAllNotifications, getAniversaryNotifications } = require('../../controller/ApiController');

let router = express.Router();

const init_API_Notification = (app) => {
    router.get('/notification', getAllNotifications);
    router.get('/aniversary', getAniversaryNotifications);

    app.use('/api/v1/', router);
}

module.exports = init_API_Notification

