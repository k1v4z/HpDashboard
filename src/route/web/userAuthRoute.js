const express = require('express');
const { getFormLogin, getFormSignUp, signUpAuth, loginAuth, logout } = require('../../controller/AuthController');

const routerAuth = express.Router();
//get UI
routerAuth.get('/login', getFormLogin)
routerAuth.get('/signup', getFormSignUp)

//Authentication
routerAuth.post('/signup_auth', signUpAuth)
routerAuth.get('/login_auth', loginAuth)

module.exports = routerAuth