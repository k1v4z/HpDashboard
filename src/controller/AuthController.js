const { auth, authSignUp, authLogin } = require("../service/Authentication.service")

const getFormLogin = (req, res) => {
    return res.render('login.ejs')
}

const getFormSignUp = (req, res) => {
    return res.render('signup.ejs')
}

const signUpAuth = async (req, res) => {
    const { username, password } = req.body
    const status = await authSignUp(username, password)

    res.send(status)
}

const loginAuth = async (req, res) => {
    const { username, password } = req.query
    const status = await authLogin(username, password)

    if (status == 'Login success') {
        req.session.user = username
        return res.redirect('/')
    } else {
        res.send('Username or password is incorrect')
    }
}

module.exports = {
    getFormLogin,
    getFormSignUp,
    signUpAuth,
    loginAuth,
}