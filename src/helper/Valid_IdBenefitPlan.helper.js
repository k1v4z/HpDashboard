const { Op } = require("sequelize")
const Benefit_Plans = require("../model/human/Benefit_Plans")

const checkBenefitPlanId = async (id) => {
    const count = await Benefit_Plans.count({
        where: {
            BENEFIT_PLANS_ID: { [Op.eq]: id }
        }
    }).then(res => res)
        .catch(err => console.log(err))
    //if count = 0, id payrate don't exist, user must input id again
    return count
}

module.exports = checkBenefitPlanId