const express = require('express')
const router = express.Router();
const { getHome } = require('../../controller/HomeController')

router.get('/', getHome);

module.exports = router