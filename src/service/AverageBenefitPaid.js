const Personal = require("../model/human/Personal");
const BenefitPlan=require("../model/human/Benefit_Plans");
const { Where } = require("sequelize/lib/utils");
const { Model } = require("sequelize");



const getAveragebenefit=(req,res)=>{
 try {
    const AverageBenefit=Personal.findAll({
        attributes:[
            'BENEFIT_PLAN_ID',
            [Sequelize.fn('AVG', Sequelize.col('DEDUCTABLE')), 'avg_deductable'],
            [Sequelize.fn('AVG', Sequelize.col('PERCENTAGE_COPAY')), 'avg_percentage_copay']],
            include:
            [{
                model : BenefitPlan,
                where: {
                    SHAREHOLDER_STATUS:0,
                }

            } 
            ],
            group:['BENEFIT_PLAN_ID']
    })
 } catch (error) {
    console.log(error)
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
    module.exports= getAveragebenefit()