const { sequelize_sqlserver } = require("../config/Sequelize");
const Personal = require("../model/human/Personal");

const defineAssociation = require("../model/association/Association");

defineAssociation();

const getEmployeesWithBirthdayThisMonth = async () => {
    const currentMonth = new Date().getMonth() + 1; // Get current month (January = 0, ...)

    const getInfo = await Personal.findAll({
        // attributes: ['PERSONAL_ID', 'CURRENT_FIRST_NAME', 'BIRTH_DATE'],
        where: sequelize_sqlserver.where(
            sequelize_sqlserver.fn('MONTH', sequelize_sqlserver.col('BIRTH_DATE')),
            currentMonth
        )
    }).then(res => {
        // Add the 'link' key with the value './detail_announcement_1' to each item in the result
        return res.map(item => ({
            ...item.toJSON(),
            link: 'http://localhost:4080/detail_announcement_1'
        }));
    }).catch(err => console.log(err));

    return getInfo;
};


module.exports = {
    getEmployeesWithBirthdayThisMonth
}
