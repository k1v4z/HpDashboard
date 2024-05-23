const { containsModule } = require("../helper/ContainElement.helper")

function requireModulePermission(req, res, next) {
    const module = req.session.module

    //user access endpoint '/total-earnings'
    if (req.url == '/total-earnings') {
        //check permission
        if (containsModule(module, 'Total Earnings')) {
            return next()
        } else {
            res.send(`You don't have permission to access this module`)
        }
    }

    //user access enpoint '/vacation-days'
    if(req.url == '/vacation-days'){
        //check permission
        if (containsModule(module,'Vacation days')){
            return next()
        }else{
            res.send(`You don't have permission to `)
        }
    }

    //user access endpoint '/average-benefit-paid'
    if (req.url == '/average-benefit-paid') {
        //check permission
        if (containsModule(module, 'Average Benefit')) {
            return next()
        } else {
            res.send(`You don't have permission to module `)
        }
    }

    //user access endpoint '/access_control'
    if (req.url == '/access_control'){
        if (containsModule(module, 'Access Control')) {
            return next()
        } else {
            res.send(`You don't have permission to module `)
        }
    }

    //user access endpoint '/management'
    if (req.url == '/management') {
        if (containsModule(module, 'Employee Management')) {
            return next()
        } else {
            res.send(`You don't have permission to module `)
        }
    }
    
}

module.exports = requireModulePermission

