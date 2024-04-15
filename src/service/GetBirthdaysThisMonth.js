const { sequelize_sqlserver } = require("../config/Sequelize");
const Personal = require("../model/human/Personal");
const { Op } = require("sequelize");

const defineAssociation = require("../model/association/Association");

defineAssociation();

const getEmployeesWithBirthdayThisMonth = async () => {
    const currentMonth = new Date().getMonth() + 1; // Lấy tháng hiện tại (chú ý rằng tháng bắt đầu từ 0)

    const getInfo = await Personal.findAll({
        where: sequelize_sqlserver.where(
            sequelize_sqlserver.fn('MONTH', sequelize_sqlserver.col('BIRTH_DATE')),
            currentMonth
        )
    }).then(res => JSON.stringify(res))
        .then(StringJSON => JSON.parse(StringJSON))
        .catch(err => console.log(err));

    console.log(getInfo);

};

getEmployeesWithBirthdayThisMonth();