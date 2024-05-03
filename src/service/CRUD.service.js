
const { sequelize_sqlserver } = require("../config/Sequelize");
const defineAssociation = require("../model/association/Association");
const Job_History = require("../model/human/Job_History");
const Personal = require("../model/human/Personal");
const Employment= require("../model/human/Employment");
defineAssociation();

const getAllDepartment = async () => {
    const department = await Job_History.findAll({
        attributes: [sequelize_sqlserver.fn('DISTINCT', sequelize_sqlserver.col('DEPARTMENT')), 'DEPARTMENT']
    }).then(res => JSON.stringify(res))
        .then(JSON_String => JSON.parse(JSON_String));

    return department;
}

const getAllEthnicity = async () => {
    const ethnicity = await Personal.findAll({
        attributes: [sequelize_sqlserver.fn('DISTINCT', sequelize_sqlserver.col('ETHNICITY')), 'ETHNICITY']
    }).then(res => JSON.stringify(res))
        .then(JSON_String => JSON.parse(JSON_String));

    return ethnicity;
}
const getAllPersonalImfomations= async ()=>{
        const data = await Personal.findAll({
            include: [{
                model: Employment,
            }]
        }).then(res => JSON.stringify(res))
        .then(StringJSON => JSON.parse(StringJSON))
        .catch(err => console.log(err));
        return data;
}
//add Employee Personal Information
const add_EP_Information = async (req) => {
    //data is information of personel
    const { CURRENT_FIRST_NAME, CURRENT_LAST_NAME, CURRENT_MIDDLE_NAME,
        BIRTH_DATE, SOCIAL_SECURITY_NUMBER, DRIVERS_LICENSE,
        CURRENT_ADDRESS_1, CURRENT_ADDRESS_2, CURRENT_CITY,
        CURRENT_COUNTRY, CURRENT_ZIP, CURRENT_GENDER,
        CURRENT_PHONE_NUMBER, CURRENT_PERSONAL_EMAIL, CURRENT_MARITAL_STATUS,
        ETHNICITY, SHAREHOLDER_STATUS } = req.body;

    //add personal
    await Personal.create({
        CURRENT_FIRST_NAME: CURRENT_FIRST_NAME,
        CURRENT_LAST_NAME: CURRENT_LAST_NAME,
        CURRENT_MIDDLE_NAME: CURRENT_MIDDLE_NAME,
        BIRTH_DATE: BIRTH_DATE,
        SOCIAL_SECURITY_NUMBER: SOCIAL_SECURITY_NUMBER,
        DRIVERS_LICENSE: DRIVERS_LICENSE,
        CURRENT_ADDRESS_1: CURRENT_ADDRESS_1,
        CURRENT_ADDRESS_2: CURRENT_ADDRESS_2,
        CURRENT_CITY: CURRENT_CITY,
        CURRENT_COUNTRY: CURRENT_COUNTRY,
        CURRENT_ZIP: CURRENT_ZIP,
        CURRENT_GENDER: CURRENT_GENDER,
        CURRENT_PHONE_NUMBER: CURRENT_PHONE_NUMBER,
        CURRENT_PERSONAL_EMAIL: CURRENT_PERSONAL_EMAIL,
        CURRENT_MARITAL_STATUS: CURRENT_MARITAL_STATUS,
        ETHNICITY: ETHNICITY,
        SHAREHOLDER_STATUS: SHAREHOLDER_STATUS,
    })
}

module.exports = {
    getAllDepartment, getAllEthnicity,getAllPersonalImfomations
}