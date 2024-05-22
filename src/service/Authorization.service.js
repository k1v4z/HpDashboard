const Function = require("../model/user/Function")
const Group = require("../model/user/Group")
const Module = require("../model/user/Module")
const { User } = require("../model/user/User")

const addGroupService = async (groupName) => { //add service to avoid duplicate name with controller
    const group = new Group(null, groupName)
    const addGroupStatus = await group.addGroup()

    return addGroupStatus
}

const addModuleService = async (moduleName) => {
    const module = new Module(null, moduleName)
    const addModuleStatus = await module.addModule()

    return addModuleStatus
}

const getAllModule = async () => {
    const module = new Module(null, null)

    const modules = await module.findAll()

    return modules
}

const addFunctionService = async (functionName, moduleId) => {
    const func = new Function(null, functionName, moduleId)

    const addFunctionStatus = await func.addFunction()

    return addFunctionStatus
}

const getAllUserService = async () => {
    const user = new User(null, null, null)
    const users = await user.findAll()

    return users
}

const getAllGroupService = async () => {
    const group = new Group(null, null)
    const groups = await group.findAll()

    return groups
}

const getAllFunctionService = async () => {
    const func = new Function(null, null)
    const funcs = await func.findAll()

    return funcs
}

const getGroupByUserIdService = async (userId) => {
    const user = new User(userId, null, null)

    const groups = await user.getGroup()

    return groups
}

const getFunctionByUserIdService = async (userId) => {
    const user = new User(userId, null, null)

    const functions = await user.getFunction()

    return functions
}

const getGroupFollowModuleService = async (moduleId) => {
    const module = new Module(moduleId,null)

    const modules = await module.getGroupFollowModule()

    return modules
}


module.exports = {
    addGroupService,
    addModuleService,
    getAllModule,
    addFunctionService,
    getAllUserService,
    getAllGroupService,
    getGroupByUserIdService,
    getFunctionByUserIdService,
    getAllFunctionService,
    getGroupFollowModuleService
}