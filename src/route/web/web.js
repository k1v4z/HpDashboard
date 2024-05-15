const express = require('express')
const router = express.Router();
const { getEmployeeViewEdit, getEmployeeAdd, getEmployeeView,
    getDashBoard, getTotalEarnings, getVacationDays,
    getAverageBenefitPaid, getAnnouncementOne, getAnnouncementTwo, getAccessControl } = require('../../controller/HomeController');
const { requireLogin } = require('../../middleware/login_middleware');
const requireModulePermission = require('../../middleware/module_middleware');

router.get('/', requireLogin, getDashBoard);
router.get('/total-earnings', requireLogin, requireModulePermission, getTotalEarnings);
router.get('/vacation-days', getVacationDays);
router.get('/average-benefit-paid', getAverageBenefitPaid);
router.get('/detail_announcement_1', getAnnouncementOne);
router.get('/detail_announcement_2', getAnnouncementTwo);
router.get('/access_control', getAccessControl);


module.exports = router;