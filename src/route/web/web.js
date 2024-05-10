const express = require('express')
const router = express.Router();
const { getEmployeeViewEdit, getEmployeeAdd, getEmployeeView,
    getDashBoard, getTotalEarnings, getVacationDays,
    getAverageBenefitPaid, getAnnouncementOne, getAnnouncementTwo, getAccessControl, 
    getChangeBenefitPlan} = require('../../controller/HomeController')

router.get('/', getDashBoard);
router.get('/total-earnings', getTotalEarnings);
router.get('/vacation-days', getVacationDays);
router.get('/average-benefit-paid', getAverageBenefitPaid);
router.get('/detail_announcement_1', getAnnouncementOne);
router.get('/detail_announcement_2', getAnnouncementTwo);
router.get('/access_control', getAccessControl);
router.get('/change_benefit_plan/:id', getChangeBenefitPlan)

module.exports = router;