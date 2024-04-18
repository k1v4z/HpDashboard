const { getBenefitEachPersonal } = require("../service/TotalBenefits.service")
const { getVacationDays } = require("../service/GetVacationDays")
const { getEmployeesWithBirthdayThisMonth } = require("../service/GetBirthdaysThisMonth");
const showEmployeeInfo = require("../service/CheckExceededLeaveDays");

const getTotalEarning = async (req, res) => {
    const { department, choice_year, choice, choice_value } = req.query;
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

const getAllVacationDays = async (req, res) => {
    const { choice_year, choice, choice_value } = req.query;
    try {
        const result = await getVacationDays(choice_year, choice, choice_value);
        return res.status(200).json({
            result: result
        })
    } catch {
        return res.status(500).json({
            error: 'Error'
        })
    }

}

const getAllNotifications = async (req, res) => {
    try {
        const birthdaysCurrentMonth = await getEmployeesWithBirthdayThisMonth();
        const employeesOverDays = await showEmployeeInfo();
        // ...
        return res.status(200).json({
            birthday: birthdaysCurrentMonth,
            exceeded: employeesOverDays
            // ...
        })
    } catch {
        return res.status(500).json({
            error: 'Error'
        })
    }
}

module.exports = {
    getTotalEarning, getAllVacationDays, getAllNotifications
}