const express = require('express')
const { addGroup } = require('../../controller/ApiAuthorization')
const { requireLogin } = require('../../middleware/login_middleware')
const requireFunctionPermission = require('../../middleware/function_middleware')
const routerAuth = express.Router()

const initAuthorization = (app) => {
    routerAuth.post('/groups/add', addGroup)
    app.use('/api/v1/',routerAuth)
}

module.exports = initAuthorization