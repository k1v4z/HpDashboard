const getDashBoard = (req, res) => {
    return res.render('dashboard.ejs');
}

const getTotalEarnings = (req, res) => {
    return res.render('total_earning.ejs');
}

const getVacationDays = (req, res) => {
    return res.render('number_of_vacation_days.ejs');
}

const getAverageBenefitPaid = (req, res) => {
    return res.render('average_benefit_paid.ejs');
}

const getAnnouncementOne = (req, res) => {
    //Notify all employees have birthday in curent month
    return res.render('detail_announcement_1.ejs');
}

const getAnnouncementTwo = (req, res) => {
    //All employees have vacations day over standard
    return res.render('detail_announcement_2.ejs');
}

module.exports = {
    getDashBoard, getTotalEarnings, getVacationDays, getAverageBenefitPaid,
    getAnnouncementOne, getAnnouncementTwo
}