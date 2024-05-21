const Group = require("../model/user/Group")
const { addGroupService } = require("../service/Authorization.service")

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

module.exports = {
    addGroup
}