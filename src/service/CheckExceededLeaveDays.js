const { sequelize_sqlserver } = require('../config/Sequelize'); 
const Personal = require("../model/human/Personal"); 
const Employment = require("../model/human/Employment"); 
const Employment_Working_Time = require("../model/human/Employment_Working_Time"); 
const defineAssociation = require("../model/association/Association");

defineAssociation();

const mergeObjects = (personalInfo, employmentInfo, employmentWorkingTimeInfo) => {
    const map = new Map();
    personalInfo.forEach(info => {
        map.set(info.PERSONAL_ID, { ...info });
    });

    employmentInfo.forEach(info => {
        const id = info.PERSONAL_ID;
        const existingInfo = map.get(id);
        if (existingInfo) {
            map.set(id, { ...existingInfo, ...info });
        } else {
            map.set(id, { ...info });
        }
    });

    employmentWorkingTimeInfo.forEach(info => {
        const id = info.EMPLOYMENT_ID;
        const existingInfo = map.get(id);
        if (existingInfo) {
            map.set(id, { ...existingInfo, ...info });
        } else {
            map.set(id, { ...info });
        }
    });
    const mergedArray = Array.from(map.values());
    return mergedArray;
};


const showEmployeeInfo = async () => {
    try {
        const PersonalInfo = await Personal.findAll({
            attributes: ['PERSONAL_ID', 'CURRENT_FIRST_NAME', 'CURRENT_MIDDLE_NAME', 'CURRENT_LAST_NAME', 'CURRENT_PHONE_NUMBER', 'CURRENT_PERSONAL_EMAIL',
                'SHAREHOLDER_STATUS', 'ETHNICITY']
        }).then(res => JSON.stringify(res))
            .then(StringJSON => JSON.parse(StringJSON))
            .catch(err => console.log(err));

        const EmploymentInfo = await Employment.findAll({
            attributes: ['EMPLOYMENT_ID', 'NUMBER_DAYS_REQUIREMENT_OF_WORKING_PER_MONTH', 'PERSONAL_ID']
        }).then(res => JSON.stringify(res))
            .then(StringJSON => JSON.parse(StringJSON))
            .catch(err => console.log(err));

        const Employment_Working_Time_Info = await Employment_Working_Time.findAll({
            attributes: ['EMPLOYMENT_ID', 'NUMBER_DAYS_ACTUAL_OF_WORKING_PER_MONTH', 'TOTAL_NUMBER_VACATION_WORKING_DAYS_PER_MONTH']
        }).then(res => JSON.stringify(res))
            .then(StringJSON => JSON.parse(StringJSON))
            .catch(err => console.log(err));


        const AllInfo = await mergeObjects(PersonalInfo, EmploymentInfo, Employment_Working_Time_Info);

        const employeesWithVacationDays = AllInfo.filter(employee => employee.TOTAL_NUMBER_VACATION_WORKING_DAYS_PER_MONTH < 0);
        console.error(employeesWithVacationDays);
    } catch (err) {
        console.error(err);
    }
};

/*
Để chạy thử được hàm này cần làm các bước sau:
- Step 1: Sửa lại giá trị của một vài record ở trường NUMBER_DAYS_ACTUAL_OF_WORKING_PER_MONTH 
trong bảng Employment_Working_Time_Info với value < 22
- Step 2: chạy đoạn query này:
UPDATE EWT
SET EWT.TOTAL_NUMBER_VACATION_WORKING_DAYS_PER_MONTH = EWT.NUMBER_DAYS_ACTUAL_OF_WORKING_PER_MONTH - E.NUMBER_DAYS_REQUIREMENT_OF_WORKING_PER_MONTH
FROM dbo.EMPLOYMENT_WORKING_TIME AS EWT
JOIN dbo.EMPLOYMENT AS E ON EWT.EMPLOYMENT_ID = E.EMPLOYMENT_ID;
- Step 3: run run run
*/

showEmployeeInfo();
