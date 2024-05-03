const { QueryTypes } = require("sequelize")
const { sequelize_mysql, sequelize_sqlserver } = require("../config/Sequelize")
const defineAssociation = require("../model/association/Association")
const Personal = require("../model/human/Personal")

defineAssociation()

//convert shareholder status from string to small int
//Shareholder -> 1, Non-shareholder -> 0
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
        .then((StringJSON) => {
            const count = JSON.parse(StringJSON)
            const num = count[0]['count(idEmployee)'] + 1 //get Number in json

            const result = 'EMP' + num //get Employee code, EMP stand for employment meanings employee code
            return result
        })
        .catch(err => console.log(err));

    return code
}

//my lecturer send db, PERSONAL_ID field don't have auto increment attribute
const generatePersonalId = async () =>{ 
    const personalId = await Personal.max('PERSONAL_ID')
    .then(res => JSON.stringify(res))
    .then(StringJSON => JSON.parse(StringJSON))
    .catch(err => console.log(err))

    return personalId + 1
}

async function test(){
    console.log(await generatePersonalId())
}

test()

module.exports = {
    convertShareHolder, generateEmployeeCode
}