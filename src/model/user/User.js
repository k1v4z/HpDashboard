const { QueryTypes } = require("sequelize")
const { sequelize_sqlserver_user } = require("../../config/Sequelize")

class User {
    constructor(USER_ID, USER_NAME, PASSWORD) {
        this.USER_ID = USER_ID
        this.USER_NAME = USER_NAME
        this.PASSWORD = PASSWORD
    }

    async signUp() {
        let message = ''

        const isExist = await sequelize_sqlserver_user.query(`
            SELECT USER_NAME from dbo.[USER] where USER_NAME = '${this.USER_NAME}'
        `, { type: QueryTypes.SELECT })
            .then((res) => {
                if (res[0].USER_NAME == []) {
                    return false
                } else {
                    message = 'User existed'
                    return true
                }
            })
            .catch((err) => {
                console.log(err)
                return false
            })

        console.log(isExist)

        if (!isExist) {
            await sequelize_sqlserver_user.query(`
                INSERT INTO dbo.[USER] VALUES('${this.USER_NAME}','${this.PASSWORD}')
            `, { type: QueryTypes.INSERT })
                .then(res => message = 'Sign Up Successful')
                .catch((err) => {
                    message = 'Sign Up Fail'
                    console.log(err)
                })
        }

        return message
    }

    async login(){
        let status = await sequelize_sqlserver_user.query(`
            SELECT USER_ID,USER_NAME,PASSWORD FROM dbo.[USER] WHERE USER_NAME = '${this.USER_NAME}' AND PASSWORD = '${this.PASSWORD}'
        `,{type: QueryTypes.SELECT})
        .then((res) =>{
            if(res[0] == undefined)
                return false
            this.USER_ID = res[0].USER_ID

            return res[0].USER_ID //success
        })
        .catch((err) =>{
            console.log(err)
            return false
        })

        return status
    }

    async getGroup() {
        let group = await sequelize_sqlserver_user.query(`
            SELECT GROUP_ID,GROUP_NAME FROM  USER_GROUP WHERE USER_ID = ${this.USER_ID}
       `).then(res => res[0])
        .catch(err => console.log(err))

        return group
    }

    async getFunction(){

        const func = await sequelize_sqlserver_user.query(`
            SELECT FUNCTION_ID,FUNCTION_NAME FROM USER_FUNCTION WHERE USER_ID = ${this.USER_ID}
        `, { type: QueryTypes.SELECT })
            .then((res) => {
                return res
            })
            .catch(err => console.log(err))

        return func
    }
}

module.exports = {
    User
}