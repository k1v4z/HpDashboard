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
        console.log()
        const isExist = await sequelize_sqlserver_user.query(`
            SELECT USER_NAME from USERS where USER_NAME = '${this.USER_NAME}'
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
                INSERT INTO USERS VALUES('${this.USER_NAME}','${this.PASSWORD}')
            `, { type: QueryTypes.INSERT })
                .then(res => message = 'Sign Up Successful')
                .catch((err) => {
                    message = 'Sign Up Fail'
                    console.log(err)
                })
        }

        return message
    }
}

module.exports = {
    User
}