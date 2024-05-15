const Group = require("../model/user/Group")
const Module = require("../model/user/Module")
const { User } = require("../model/user/User")
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
    const user = new User(null,username,password)
    const status = await authLogin(user) //get status fail or success
    const groupOfUser = await user.getGroup() //get group
    const group = new Group(null,null)
    const moduleOfGroup = await group.getModule(groupOfUser)
    const module = new Module(null,null)
    const func = await user.getFunction()

    if (status) {
        req.session.user = username
        req.session.userid = status
        req.session.group = groupOfUser
        req.session.module = moduleOfGroup
        req.session.function = func

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