const { sequelize_mysql } = require("../config/Sequelize");
const { sequelize_sqlserver } = require('../config/Sequelize');
const Personal = require("../model/human/Personal");
const BenefitPlan=require("../model/human/Benefit_Plans");
const { QueryTypes } = require('sequelize');
const defineAssociation = require("../model/association/Association");
//Shareholder=1,Non_Shareholder=0
const {Getdropdownlist}= require('../helper/GetDropdowlistStatusHolder')
const Choice=0
Getdropdownlist(Choice);
const getAllStatusShareholders = async ()=> {
        const nonShareholders = await Personal.findAll({
            where: {
                SHAREHOLDER_STATUS: Choice
            }
        });
        return nonShareholders;
    }


const getDatabycomlum = async (columnName) => {

    await defineAssociation();
    const values = await BenefitPlan.findAll({
        attributes: [columnName],
        include: [{
            model: Personal,
            attributes: [],
            where: {
                SHAREHOLDER_STATUS:Choice  // Filter to get only non-shareholders
            }
        }]
    });
    return values;
}

const getPlanNames = async () => {
    return getDatabycomlum('PLAN_NAME');
}

const getDeductable = async () => {
    return getDatabycomlum('DEDUCTABLE');
}

const getPercentageCopay = async () => {
    return getDatabycomlum('PERCENTAGE_COPAY');
}
    module.exports= {
        getAllStatusShareholders,getPlanNames,getDeductable,getPercentageCopay
    }

