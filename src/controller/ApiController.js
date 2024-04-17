const { getBenefitEachPersonal } = require("../service/TotalBenefits.service")

const getTotalEarning = async (req, res) => {
    const { department, choice_year, choice, choice_value } = req.query;
    console.log(department);
    try {
        const result = await getBenefitEachPersonal(department, choice_year, choice, choice_value);
        return res.status(200).json({
            result: result
        })
    } catch {
        return res.status(500).json({
            error: 'Error'
        })
    }
}

module.exports = {
    getTotalEarning
}