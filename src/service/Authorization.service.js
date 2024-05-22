const Function = require("../model/user/Function")
const Group = require("../model/user/Group")
const Module = require("../model/user/Module")

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

const addFunctionService = async (functionName,moduleId) => {
    const func = new Function(null,functionName,moduleId)

    const addFunctionStatus = await func.addFunction()

    return addFunctionStatus
}


module.exports = {
    addGroupService,
    addModuleService,
    getAllModule,
    addFunctionService
}