const { QueryTypes } = require("sequelize")
const { sequelize_sqlserver_user } = require("../../config/Sequelize")

class Group {
    constructor(GROUP_ID, GROUP_NAME) {
        this.GROUP_ID = GROUP_ID
        this.GROUP_NAME = GROUP_NAME
    }

    //get module belongs to group
    async getModule(groupList) {
        let conditionPrams = '('
        
        for (let i = 0; i < groupList.length; i++) {
            if (i != groupList.length - 1) {
                conditionPrams += `${groupList[i].GROUP_ID},`
            }else{
                conditionPrams += `${groupList[i].GROUP_ID});`
            }
        }

        const module = await sequelize_sqlserver_user.query(`
            SELECT DISTINCT MODULE_ID,MODULE_NAME FROM GROUP_MODULE WHERE GROUP_ID IN ${conditionPrams}
        `, { type: QueryTypes.SELECT })
            .then((res) =>{
                return res
            })  
            .catch(err => console.log(err))

        return module
    }

}

module.exports = Group