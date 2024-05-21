const Group = require("../model/user/Group")

const addGroupService = async(groupName)=>{ //add service to avoid duplicate name with controller
    const group = new Group(null, groupName)
    const addGroupStatus = await group.addGroup()

    return addGroupStatus
}

module.exports = {
    addGroupService
}