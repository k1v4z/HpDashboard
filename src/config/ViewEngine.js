const path = require('path');
const express = require('express');

const setViewEngine = (app) => {
    app.set('views', path.join('./src/', 'views'));
    app.set('view engine', 'ejs');

    //config static files
    app.use(express.static(path.join('./src/', 'public')))
}

module.exports = setViewEngine;