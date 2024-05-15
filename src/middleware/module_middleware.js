const { containsModule } = require("../helper/ContainElement.helper")

function requireModulePermission(req, res, next) {
    //user access endpoint '/total-earnings'
    if (req.url == '/total-earnings') {
        //check permission
        const module = req.session.module
        console.log(module)
        if (containsModule(module, 'Total Earnings')) {
            return next()
        } else {
            res.send(`You don't have permission to access this module`)
        }
    }
}

module.exports = requireModulePermission

