const { auth, authSignUp } = require("../service/Authentication.service")

const getFormLogin = (req, res) => {
    return res.render('login.ejs')
}

const getFormSignUp = (req, res) => {
    return res.render('signup.ejs')
}

const signUpAuth = async(req, res) => {
    const {username, password} = req.body
    const status = await authSignUp(username,password)

    res.send(status)
}

module.exports = {
    getFormLogin, getFormSignUp, signUpAuth
}