const { QueryTypes } = require("sequelize")
const { sequelize_mysql } = require("../config/Sequelize")

const checkIdPayRates = async (id) => {
    const count = await sequelize_mysql.query(`
        SELECT COUNT(\`idPay Rates\`) FROM mydb.\`pay rates\` WHERE \`idPay Rates\` = ${id}
    `, { type: QueryTypes.SELECT })
        .then(res => (res[0])['COUNT(`idPay Rates`)'])
        .catch(err => console.log(err))
    
    return count 
}

module.exports = checkIdPayRates