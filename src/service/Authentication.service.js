const { User } = require("../model/user/User")

async function authSignUp(username, password){
    const user = new User(null,username,password)
    const status = await user.signUp()

    return status
}

async function authLogin(user){
    const status = await user.login()
    return status
}

module.exports = {
    authSignUp,
    authLogin
}