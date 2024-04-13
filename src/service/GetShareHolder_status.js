const { sequelize_mysql } = require("../config/Sequelize");
const Personal = require("../model/human/Personal");
const BenefitPlan=require("../model/human/Benefit_Plans");
const { QueryTypes } = require('sequelize');

const Choice=0;//Shareholder=1,Non_Shareholder=0

const getAllStatusShareholders= async ()=> {
    try {
        const nonShareholders = await Personal.findAll({
            where: {
                SHAREHOLDER_STATUS: Choice 
            }
        });
        
        return nonShareholders;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

// Sử dụng hàm để lấy kết quả
getAllStatusShareholders()
    .then(result => {
        console.log('Non-shareholders:', result);
    })
    .catch(error => {
        console.error('Error:', error);
    });
    module.exports= getAllStatusShareholders()

