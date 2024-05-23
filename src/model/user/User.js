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
            try {
                const [results, metadata] = await sequelize_sqlserver_user.query(`
                INSERT INTO dbo.[USER] (USER_NAME, PASSWORD)
                OUTPUT inserted.USER_ID, inserted.USER_NAME, inserted.PASSWORD
                VALUES ('${this.USER_NAME}', '${this.PASSWORD}');
            `, { raw: true })
                message = 'Sign Up Successful'
                this.USER_ID = results[0].USER_ID
            } catch (error) {
                console.error('Error inserting data:', error);
                message = 'Sign Up fail'
            }
        }
        this.joinGroup()
        this.addFunc()

        return message
    }

    async login() {
        let status = await sequelize_sqlserver_user.query(`
            SELECT USER_ID,USER_NAME,PASSWORD FROM dbo.[USER] WHERE USER_NAME = '${this.USER_NAME}' AND PASSWORD = '${this.PASSWORD}'
        `, { type: QueryTypes.SELECT })
            .then((res) => {
                if (res[0] == undefined)
                    return false
                this.USER_ID = res[0].USER_ID

                return res[0].USER_ID //success
            })
            .catch((err) => {
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

    async getFunction() {

        const func = await sequelize_sqlserver_user.query(`
            SELECT FUNCTION_ID,FUNCTION_NAME FROM USER_FUNCTION WHERE USER_ID = ${this.USER_ID}
        `, { type: QueryTypes.SELECT })
            .then((res) => {
                return res
            })
            .catch(err => console.log(err))

        return func
    }

    async findAll() {
        const users = await sequelize_sqlserver_user.query(`
            SELECT USER_ID,USER_NAME FROM dbo.[USER] WHERE USER_NAME NOT LIKE '%admin%'
        `, { type: QueryTypes.SELECT })
            .then(res => JSON.stringify(res))
            .then(JSONString => JSON.parse(JSONString))
            .catch(err => console.log(err))

        return users
    }

    //set default role is employee
    async joinGroup() {
        try {
            await sequelize_sqlserver_user.query(`
            INSERT INTO dbo.[USER_GROUP] VALUES('${this.USER_ID}',4,'${this.USER_NAME}','Employee')
        `)
        } catch (error) {
            console.log(error)
        }
    }

    //employee defaul 2 function view and benefit
    async addFunc() {
        try {
            await sequelize_sqlserver_user.query(`
                INSERT INTO dbo.[USER_FUNCTION] VALUES (${this.USER_ID},3,'${this.USER_NAME}','View'),(${this.USER_ID},3,'${this.USER_NAME}','Benefit')
            `, { type: QueryTypes.INSERT })
        }catch(error){
            consolg.log(error)
        }
    }

}

module.exports = {
    User
}