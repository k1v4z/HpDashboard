const { getBenefitEachPersonal } = require("../service/TotalBenefits.service")
const { getVacationDays } = require("../service/GetVacationDays")
const { getEmployeesWithBirthdayThisMonth } = require("../service/GetBirthdaysThisMonth");
const { getEmployeeCertainDayAniversary } = require("../service/Aniversary.service");

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
        // ...
        return res.status(200).json({
            birthday: birthdaysCurrentMonth,
            // ...
        })
    } catch {
        return res.status(500).json({
            error: 'Error'
        })
    }
}

const getAniversaryNotifications = async (req, res) => {
    try {
        const employee = await getEmployeeCertainDayAniversary();

        return res.status(200).json({
            Fullname: employee.FullName,
            CertainDay: employee.certainDay,
            Sex: employee.CURRENT_GENDER,
            HiringDay: employee.EMPLOYMENTs[0].HIRE_DATE_FOR_WORKING
        })
    }catch{
        return res.status(500).json({
            error: 'Error'
        })
    }
}

module.exports = {
    getTotalEarning, getAllVacationDays, getAllNotifications,
    getAniversaryNotifications
}