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
        let message = ''

        message = await sequelize_sqlserver_user.query(`
            SELECT USER_NAME,PASSWORD FROM dbo.[USER] WHERE USER_NAME = '${this.USER_NAME}' AND PASSWORD = '${this.PASSWORD}'
        `,{type: QueryTypes.SELECT})
        .then((res) =>{
            if(res[0] == undefined)
                return 'Login fail'
            return 'Login success'
        })
        .catch((err) =>{
            console.log(err)
            message = 'Login Fail'
        })

        return message
    }
}

module.exports = {
    User
}