const { getBenefitEachPersonal } = require("../service/TotalBenefits.service")
const { getVacationDays } = require("../service/GetVacationDays")
const { getEmployeesWithBirthdayThisMonth } = require("../service/GetBirthdaysThisMonth");
const { getEmployeeCertainDayAniversary } = require("../service/Aniversary.service");
const showEmployeeInfo = require("../service/CheckExceededLeaveDays");
const { GetAllShareHolderStatus } = require("../service/GetShareHolder_status");

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
const getAllBenefitPlan = async (req, res) => {
    const { choice } = req.query;
    try {
        const result = await GetAllShareHolderStatus(choice);
        return res.status(200).json({
            result: result
        });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({
            error: 'Error'
        });
    }
};



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

const getAniversaryNotifications = async (req, res) => {
    try {
        const employee = await getEmployeeCertainDayAniversary();

        return res.status(200).json({
            Fullname: employee.FullName,
            CertainDay: employee.certainDay,
            Sex: employee.CURRENT_GENDER,
            HiringDay: employee.EMPLOYMENTs[0].HIRE_DATE_FOR_WORKING
        })
    } catch {
        return res.status(500).json({
            error: 'Error'
        })
    }
}
const getAllPersonalImformationdata = async (req, res, next) => {
    try {
        const result = await getAllPersonalImfomations();
        return res.status(200).json({
            result: result
        })
    } catch {
        return res.status(500).json({
            error: 'Error'
        })
    }
}

const getValuesFromDBToInputs = async (req, res) => {
    try {
        const { id } = req.query; 
    } catch {
        return res.status(500).json({
            error: 'Error'
        })
    }
}


module.exports = {
    getTotalEarning, getAllVacationDays, getAllNotifications,
    getAniversaryNotifications, getAllBenefitPlan
}