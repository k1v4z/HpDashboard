const Group = require("../model/user/Group")
const Module = require("../model/user/Module")
const { User } = require("../model/user/User")
const md5 = require('md5');
const { auth, authSignUp, authLogin } = require("../service/Authentication.service")
let pwd = null;

const getFormLogin = (req, res) => {
    return res.render('login.ejs')
}

const getFormSignUp = (req, res) => {
    return res.render('signup.ejs')
}

const signUpAuth = async (req, res) => {
    const { username, password } = req.body
    pwd = md5(password);
    const status = await authSignUp(username, pwd)

    res.send(status)
}

const loginAuth = async (req, res) => {
    const { username, password } = req.query
    // const loginPwd = md5(password);
    const user = new User(null, username, password)
    const status = await authLogin(user) //get status fail or success
    const groupOfUser = await user.getGroup() //get group
    const group = new Group(null, null)
    const moduleOfGroup = await group.getModule(groupOfUser)
    const module = new Module(null, null)
    const func = await user.getFunction()
    console.log(func)

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