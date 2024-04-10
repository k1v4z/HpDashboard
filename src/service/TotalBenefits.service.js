const Employment = require("../model/human/Employment");
const Job_History = require("../model/human/Job_History");
const Personal = require("../model/human/Personal");

const CalculateTotalBenefits = async () => {
    const department = 'Marketing';
    const employment_status = 'Part-Time';
    const choice = 'Gender'; //Gender or Ethinicity or Shareholder status
    const choiceValue = true; 

    const personalAttribute = await Job_History.findAll({
        attributes: ['Employee_ID', 'Department'],
        where: { Department: department },
        include: [{
            model: Personal,
            attributes: ['First_Name', 'Last_Name', 'Middle_Initial'],
            where: {[choice]: choiceValue},
            include: [{
                model: Employment,
                attributes: ['Employment_Status'],
                where: { Employment_Status: employment_status }
            }]
        }]
    }).then(res => JSON.stringify(res))
        .then(StringJSON => JSON.parse(StringJSON))
        .catch(err => console.log(err));

    console.log(personalAttribute);
}

CalculateTotalBenefits();