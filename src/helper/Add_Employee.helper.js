//convert shareholder status from string to small int

const { QueryTypes } = require("sequelize")
const { sequelize_mysql } = require("../config/Sequelize")
const defineAssociation = require("../model/association/Association")

//Shareholder -> 1, Non-shareholder -> 0
defineAssociation()

const convertShareHolder = (text) => {
    if (text == 'Shareholder')
        return 1
    else
        return 0
}

const generateEmployeeCode = async () => {
    const code = await sequelize_mysql.query(
        `SELECT count(idEmployee) FROM mydb.employee`,
        { type: QueryTypes.SELECT }
    ).then(res => JSON.stringify(res))
        .then((StringJSON)=> {
            const count = JSON.parse(StringJSON)
            const num = count[0]['count(idEmployee)'] + 1 //get Number in json

            const result = 'EMP' + num //get Employee code
            return result
        })
        .catch(err => console.log(err));

    return code
}

module.exports = {
    convertShareHolder, generateEmployeeCode
}