const { containFunction } = require("../helper/ContainElement.helper")

function requireFunctionPermission(req, res, next) {
    const func = req.session.function

    //user access endpoint 'employee-view'
    if (req.url == '/employee-view') {
        if (containFunction(func, 'View')) {
            return next()
        } else {
            res.send(`You don't have permission to use this function`)
        }
    }

    const urlFormat = req.url.replace(/\/\d+$/, '') //remove number of endpoint. Ex: personal/edit/2 => personal/edit/

    //user access endpoint edit
    if (urlFormat == '/personal/edit' || urlFormat == '/employment/edit') {
        if (containFunction(func, 'Edit')) {
            return next()
        } else {
            res.send(`You don't have permission to use this function`)
        }
    }

    //user access endpoint add 
    if (urlFormat == '/benefit_plan/') {
        if (containFunction(func, 'Benefit')) {
            return next()
        } else {
            res.send(`You don't have permission to use this function`)
        }
    }

    //user access endpoint benefit
    if (req.url == '/employee-add') {
        if (containFunction(func, 'Add')) {
            return next()
        } else {
            res.send(`You don't have permission to use this function`)
        }
    }
    
    //user access endpoint delete
    if (urlFormat == '/employee-delete'){
        if (containFunction(func, 'Delete')) {
            return next()
        } else {
            return res.status(403).json({
                error: "You don't have permission to use this function"
            })
        }
    }
}

module.exports = requireFunctionPermission