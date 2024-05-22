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

    async findAll(){ //get module id and module name
        const modules = await sequelize_sqlserver_user.query(`
            SELECT * FROM dbo.[MODULE]
        `,{type: QueryTypes.SELECT})
        .then(res => JSON.stringify(res))
        .then(JSONString => JSON.parse(JSONString))
        .catch(err => console.log(err))
        
        return modules
    }

    async getGroupFollowModule() {
        const modules = await sequelize_sqlserver_user.query(`
            SELECT GROUP_ID,GROUP_NAME FROM GROUP_MODULE WHERE MODULE_ID IN ('${this.MODULE_ID}')
        `, { type: QueryTypes.SELECT })
            .then(res => JSON.stringify(res))
            .then(JSONString => JSON.parse(JSONString))
            .catch(err => console.log(err))

        return modules
    }
    
}

module.exports = Module