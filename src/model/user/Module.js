const { QueryTypes } = require("sequelize")
const { sequelize_sqlserver_user } = require("../../config/Sequelize")

class Module {
    constructor(MODULE_ID,MODULE_NAME){
        this.MODULE_ID = MODULE_ID
        this.MODULE_NAME = MODULE_NAME
    }
    
    async addModule(){
        const state = await sequelize_sqlserver_user.query(`
            INSERT INTO dbo.[MODULE] (MODULE_NAME) VALUES ('${this.MODULE_NAME}')
        `, { type: QueryTypes.INSERT })
            .then((res) => 1) //1 is true: add group successful
            .catch((err) => {
                console.log(err);
                return 0 //0 is false: add group fail
            })

        return state
    }
    
}

module.exports = Module