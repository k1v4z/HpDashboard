const { getBenefitEachPersonal } = require("../service/TotalBenefits.service")
const { getVacationDays } = require("../service/GetVacationDays")
const { getEmployeesWithBirthdayThisMonth } = require("../service/GetBirthdaysThisMonth");
const { getEmployeeCertainDayAniversary } = require("../service/Aniversary.service");
const showEmployeeInfo = require("../service/CheckExceededLeaveDays");
const { GetAllShareHolderStatus } = require("../service/GetShareHolder_status");
const getAllDataEmployment = require("../service/GetEmploymentInforFrom2DB");
const { getId } = require("./EmController");
const messages = require("../service/GetMessage");
const getAverage = require("../service/GetAverageBenefitByType");

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

const getValuesAverageBenefit = async (req, res) => {
    try {
        const { shareholderAverage, nonShareholderAverage } = await getAverage();
        res.status(200).json({ shareholderAverage, nonShareholderAverage });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({
            error: 'Error'
        });
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

const setDataEmployment = async (req, res) => {
    try {
        const id = getId();
        const employment = await getAllDataEmployment(id);
        return res.status(200).json({
            employment: employment
        })
    } catch {
        return res.status(500).json({
            error: 'Error'
        })
    }
}

const getAllMessage = (req, res) => {

    try {
        const data = messages;
        return res.status(200).json({
            new_data: data
        })
    } catch {
        return res.status(500).json({
            error: 'Error'
        })
    }
}

const logout = (req,res) =>{
    req.session.destroy((err) =>{
        if (err) {
            console.error('Error destroying session:', err);
            res.status(500).send('Error destroying session');
        } else {
            // Optionally clear session-related cookies on the client side
            res.clearCookie('connect.sid');
            res.redirect('/login')
        }
    })
}



module.exports = {
    getTotalEarning,
    getAllVacationDays,
    getAllNotifications,
    getAllMessage,
    getAniversaryNotifications,
    getAllBenefitPlan,
    setDataEmployment,
    logout,
    getValuesAverageBenefit
}