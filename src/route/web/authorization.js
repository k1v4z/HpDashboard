const express = require('express')
const { addGroup, addModule, addFunction, getAllModules } = require('../../controller/ApiAuthorization')
const { requireLogin } = require('../../middleware/login_middleware')
const requireFunctionPermission = require('../../middleware/function_middleware')
const routerAuth = express.Router()

const initAuthorization = (app) => {
    routerAuth.post('/groups/add', addGroup)
    routerAuth.post('/modules/add', addModule)
    routerAuth.post('/functions/add', addFunction)
    routerAuth.get('/modules/findAll',getAllModules)
    
    app.use('/api/v1/',routerAuth)
}

module.exports = initAuthorization