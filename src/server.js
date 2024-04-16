require('dotenv').config();

const express = require('express');
const router = require('./route/web/web');
const setViewEngine = require('./config/ViewEngine');
const bodyParser = require('body-parser');

//const cookieParser = require('cookie-parser');
const app = express()
const port = process.env.PORT;
const localhost = process.env.HOST;

//config cookie parser
//app.use(cookieParser());

//config view engine
setViewEngine(app);
//initApiRoute(app);

//config req.body
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));

app.use(router);
app.use((req, res) => {
    res.send('404 NOT Found');
})

app.listen(port, localhost, () => {
    console.log(`http://${localhost}:${port}`);
})
