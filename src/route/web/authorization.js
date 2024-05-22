const express = require('express')
const { addGroup, addModule, addFunction, getAllModules, getAllUser, getAllGroup, getGroupByUserId, getFunctionByUserId, getAllFunction, getGroupFollowModule } = require('../../controller/ApiAuthorization')
const { requireLogin } = require('../../middleware/login_middleware')
const requireFunctionPermission = require('../../middleware/function_middleware')
const routerAuth = express.Router()

const initAuthorization = (app) => {
    //Add feature
    routerAuth.post('/groups/add', addGroup)
    routerAuth.post('/modules/add', addModule)
    routerAuth.post('/functions/add', addFunction)
    routerAuth.get('/modules/findAll', getAllModules)

    routerAuth.get('/users/findAll', getAllUser)
    routerAuth.get('/groups/findAll', getAllGroup)
    routerAuth.get('/groups/findGroup',getGroupByUserId)
    routerAuth.get('/functions/findFunction',getFunctionByUserId)
    routerAuth.get('/functions/findAll',getAllFunction)
    routerAuth.get('/modules/getGroup',getGroupFollowModule)

    app.use('/api/v1/', routerAuth)
}

module.exports = initAuthorization