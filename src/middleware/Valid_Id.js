const checkBenefitPlanId = require("../helper/Valid_IdBenefitPlan.helper")
const checkIdPayRates = require("../helper/Valid_IdPayRate.helper")

//middle ware valid benefit plan id and id payrates
const valid = {
    validBenefitPlanId: async (req, res, next) => {
        const data = req.body
        const count_benefit_plan_id = await checkBenefitPlanId(data.BENEFIT_PLAN_ID)

        //if count = 0, id payrate don't exist, user must input id again
        if (count_benefit_plan_id == 0)
            res.redirect('/employee-add')
        else
            next()
    },
    validIdPayRate: async (req, res, next) => {
        const data = req.body

        //case: user only input personal info
        if (data.ID_PAY_RATE == undefined){
            next()
        }
        //case: user input both personal and employee info
        const count_idPayRate = await checkIdPayRates(data.ID_PAY_RATE)
        //if count = 0, id payrate don't exist, user must input id again
        if(count_idPayRate == 0)
            res.redirect('/employee-add')
        else
            next()
    }
}

module.exports = valid
