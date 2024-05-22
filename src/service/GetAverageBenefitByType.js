const Benefit_Plans = require("../model/human/Benefit_Plans");
const Personal = require("../model/human/Personal");

const getAverage = async () => {
    try {
        const personalData = await Personal.findAll();
        const benefitPlans = await Benefit_Plans.findAll();

        let shareholder = 0;
        let nonShareholder = 0;
        let s_count = 0, ns_count = 0;

        for (const person of personalData) {
            const planID = person.BENEFIT_PLAN_ID;
            const isShareholder = person.SHAREHOLDER_STATUS === 1;

            const matchedPlan = benefitPlans.find(plan => plan.BENEFIT_PLANS_ID === planID);

            if (matchedPlan) {
                const deductible = matchedPlan.DEDUCTABLE;
                const percentageCopay = matchedPlan.PERCENTAGE_COPAY;

                const cost = deductible * percentageCopay;

                if (isShareholder) {
                    s_count++;
                    shareholder += cost;
                } else {
                    ns_count++;
                    nonShareholder += cost;
                }
            }
        }

        let shareholderAverage = shareholder / s_count;
        let nonShareholderAverage = nonShareholder / ns_count;

        return { shareholderAverage, nonShareholderAverage };
    } catch (error) {
        throw error;
    }
}

module.exports = getAverage;
