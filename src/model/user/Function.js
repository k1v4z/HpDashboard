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
}

module.exports = Function