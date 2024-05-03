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
//const cookieParser = require('cookie-parser');
const app = express()
const port = process.env.PORT;
const localhost = process.env.HOST;

//config cookie parser
//app.use(cookieParser());

//config req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//config view engine
setViewEngine(app);
init_API_Total_Earning(app);
init_API_Vacation_Days(app);
init_API_Notification(app);
init_API_BenefitPlan(app);
app.use(router);
app.use(routerManage);

app.use((req, res) => {
    res.send('404 NOT Found');
})

app.listen(port, localhost, () => {
    console.log(`http://${localhost}:${port}`);
})
