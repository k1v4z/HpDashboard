const express = require('express')
const router = express.Router();
const { 
    getDashBoard, getTotalEarnings, getVacationDays,
    getAverageBenefitPaid, getAddAccessControl, getAnnouncementOne, getAnnouncementTwo, getAccessControl,
    getManagementForm,
    getAuthorization } = require('../../controller/HomeController');
const { requireLogin } = require('../../middleware/login_middleware');
const requireModulePermission = require('../../middleware/module_middleware');

router.get('/', requireLogin, getDashBoard);
router.get('/total-earnings', requireLogin, requireModulePermission, getTotalEarnings);
router.get('/vacation-days', requireLogin, requireModulePermission, getVacationDays);
router.get('/average-benefit-paid', requireLogin, requireModulePermission, getAverageBenefitPaid);
router.get('/detail_announcement_1', getAnnouncementOne);
router.get('/detail_announcement_2', getAnnouncementTwo);
router.get('/access_control', requireLogin, requireModulePermission, getAccessControl);
router.get('/add_authorization', requireLogin, requireModulePermission, getAddAccessControl);
router.get('/management', requireLogin, requireModulePermission, getManagementForm)
router.get('/authorize', requireLogin, getAuthorization)

module.exports = router;