const Group = require("../model/user/Group")
const { addGroupService, addModuleService, getAllModule, addFunctionService, getAllUserService, getAllGroupService, getGroupByUserIdService, getFunctionByUserIdService, getAllFunctionService } = require("../service/Authorization.service")

const addGroup = async (req, res) => {
    const groupName = req.query.groupName
    const status = await addGroupService(groupName)

    if (status == 1) {
        return res.status(200).json({
            message: 'Add group successful'
        })
    } else {
        return res.status(500).json({
            message: 'Add group fail'
        })
    }
}

const addModule = async (req, res) => {

    const moduleName = req.query.moduleName
    const status = await addModuleService(moduleName)

    if (status == 1) {
        return res.status(200).json({
            message: 'Add group successful'
        })
    } else {
        return res.status(500).json({
            message: 'Add group fail'
        })
    }
}

const addFunction = async (req, res) => {
    const { functionName, moduleId } = req.query
    const status = await addFunctionService(functionName, moduleId)

    if (status == 1) {
        return res.status(200).json({
            message: 'Add group successful'
        })
    } else {
        return res.status(500).json({
            message: 'Add group fail'
        })
    }
}

const getAllModules = async (req, res) => {
    const modules = await getAllModule()

    try {
        return res.status(200).json({
            modules: modules
        })
    } catch (err) {
        return res.status(500).json({
            message: err
        })
    }
}

const getAllUser = async (req, res) => {
    const users = await getAllUserService()

    try {
        return res.status(200).json({
            usersArray: users
        })
    } catch (err) {
        return res.status(500).json({
            message: err
        })
    }
}

const getAllGroup = async (req, res) => {
    const groups = await getAllGroupService()

    try {
        return res.status(200).json({
            groupsArray: groups
        })
    } catch (err) {
        return res.status(500).json({
            message: err
        })
    }
}

const getAllFunction = async (req, res) => {
    const funcs = await getAllFunctionService()

    try {
        return res.status(200).json({
            funcsArray: funcs
        })
    } catch (err) {
        return res.status(500).json({
            message: err
        })
    }
}

const getGroupByUserId = async (req, res) => {
    const userId = req.query.userId
    const groups = await getGroupByUserIdService(userId)

    try {
        return res.status(200).json({
            groupsArray: groups
        })
    } catch (err) {
        return res.status(500).json({
            message: err
        })
    }
}

const getFunctionByUserId = async (req, res) => {
    const userId = req.query.userId
    const functions = await getFunctionByUserIdService(userId)

    try {
        return res.status(200).json({
            functionsArray: functions
        })
    } catch (err) {
        return res.status(500).json({
            message: err
        })
    }
}



module.exports = {
    addGroup,
    addModule,
    addFunction,
    getAllModules,
    getAllUser,
    getAllGroup,
    getAllFunction,
    getGroupByUserId,
    getFunctionByUserId
}