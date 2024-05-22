const Personal = require("../model/human/Personal");
const BenefitPlan = require("../model/human/Benefit_Plans");
const defineAssociation = require("../model/association/Association");

defineAssociation();

const GetAllShareHolderStatus=async(choice)=>{
    try {
        
        const data = await Personal.findAll({
            where: {
                SHAREHOLDER_STATUS: choice 
            },
            attributes: [
                'CURRENT_FIRST_NAME',
                'CURRENT_LAST_NAME'
            ],
            include: [{
                model: BenefitPlan,
                attributes: [
                    'PLAN_NAME',
                    'DEDUCTABLE',
                    'PERCENTAGE_COPAY'
                ]
            }]
        }).then(res => JSON.stringify(res))
        .then(StringJSON => JSON.parse(StringJSON))
        .catch(err => console.log(err));

        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
    
}
module.exports = {
    GetAllShareHolderStatus
};
