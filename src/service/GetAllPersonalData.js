const { sequelize_mysql } = require("../config/Sequelize");
const { sequelize_sqlserver } = require('../config/Sequelize');
const Personal = require("../model/human/Personal");



const getAllPersonalImfomations= async (req,res)=>{
try {
    const data = await Personal.findAll().then(res => JSON.stringify(res))
    .then(StringJSON => JSON.parse(StringJSON))
    .catch(err => console.log(err));
    return data;
} catch (error) {
    console.error(error);
}
}
module.exports ={
    getAllPersonalImfomations
}