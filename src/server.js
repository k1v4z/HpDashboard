require('dotenv').config();

const express = require('express');
const router = require('./route/web/web');
const setViewEngine = require('./config/ViewEngine');
const bodyParser = require('body-parser');
const init_API_Total_Earning = require('./route/api/API_Total_Earning');

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

app.use(router);
app.use((req, res) => {
    res.send('404 NOT Found');
})

app.listen(port, localhost, () => {
    console.log(`http://${localhost}:${port}`);
})
