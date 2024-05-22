const Group = require("../model/user/Group")
const { addGroupService, addModuleService, getAllModule, addFunctionService } = require("../service/Authorization.service")

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
    const status = await addFunctionService(functionName,moduleId)

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

    try{
        return res.status(200).json({
            modules: modules
        })
    }catch(err){
        return res.status(500).json({
            message: err
        })
    }
}

module.exports = {
    addGroup,
    addModule,
    addFunction,
    getAllModules
}