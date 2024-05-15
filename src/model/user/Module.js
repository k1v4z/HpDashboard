const { QueryTypes } = require("sequelize")
const { sequelize_sqlserver_user } = require("../../config/Sequelize")

class Module {
    constructor(MODULE_ID,MODULE_NAME){
        this.MODULE_ID = MODULE_ID
        this.MODULE_NAME = MODULE_NAME
    }
    
    
}

module.exports = Module