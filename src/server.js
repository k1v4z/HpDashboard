require('dotenv').config();

const express = require('express');
const router = require('./route/web/web');
const routerManage = require('./route/web/em');
const setViewEngine = require('./config/ViewEngine');
const bodyParser = require('body-parser');
const init_API_Total_Earning = require('./route/api/API_Total_Earning');
const init_API_Vacation_Days = require('./route/api/API_Vacation_Days');
const init_API_Notification = require('./route/api/API_Notification');
const init_API_BenefitPlan = require('./route/api/API_BenefitPlan');
const routerAuth = require('./route/web/userAuthRoute');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const redis = require('redis')
const connectRedis = require('./model/message/Redis');

const init_API_DataEmployment = require('./route/api/API_SetDataIntoEmployment');
const init_API_Changed_Benefit_Plan = require('./route/api/API_ChangedBenefitPlan');
const init_API_Logout = require('./route/api/API_Logout');
const initAuthorization = require('./route/web/authorization');
//const cookieParser = require('cookie-parser');
const app = express()
const port = process.env.PORT;
const localhost = process.env.HOST;

//config cookie parser
app.use(cookieParser());

//config req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//sid signature
app.use(session({
    secret: 'mysecretkey',
    cookie: {
        sameSite: 'strict',
        maxAge: 600000
    },
    resave: false,
    saveUninitialized: true
}))

//config view engine
setViewEngine(app);

//init api
init_API_Total_Earning(app);
init_API_Vacation_Days(app);
init_API_Notification(app);
init_API_BenefitPlan(app);
init_API_DataEmployment(app);
init_API_Changed_Benefit_Plan(app)
init_API_Logout(app)
initAuthorization(app)

//config redis
//connectRedis();

app.use(router);
app.use(routerManage);
app.use(routerAuth);

app.use((req, res) => {
    res.send('404 NOT Found');
})

app.listen(port, localhost, () => {
    console.log(`http://${localhost}:${port}`);
})
