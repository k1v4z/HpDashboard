const { QueryTypes } = require("sequelize")
const { sequelize_sqlserver_user } = require("../../config/Sequelize")

class Function{
    constructor(FUNCTION_ID,FUNCTION_NAME,MODULE_ID){
        this.FUNCTION_ID = FUNCTION_ID
        this.FUNCTION_NAME = FUNCTION_NAME
        this.MODULE_ID = MODULE_ID
    }

    async addFunction() {
        const state = await sequelize_sqlserver_user.query(`
            INSERT INTO dbo.[FUNCTION] (FUNCTION_NAME,MODULE_ID) VALUES ('${this.FUNCTION_NAME}','${this.MODULE_ID}')
        `, { type: QueryTypes.INSERT })
            .then((res) => 1) //1 is true: add group successful
            .catch((err) => {
                console.log(err);
                return 0 //0 is false: add group fail
            })

        return state
    }

    async findAll(){
        const functions = await sequelize_sqlserver_user.query(`
            SELECT FUNCTION_ID,FUNCTION_NAME FROM dbo.[FUNCTION]
        `, { type: QueryTypes.SELECT })
            .then(res => JSON.stringify(res))
            .then(JSONString => JSON.parse(JSONString))
            .catch(err => console.log(err))

        return functions
    }
}

module.exports = Function