const Employment = require('../model/human/Employment');

const isEmployee = async (id) => {
    try {
        const employee = await Employment.findOne({
            where: { PERSONAL_ID: id }
        });
        return employee !== null;  
    } catch (err) {
        console.log(err);
        return false;  
    }
}

module.exports = isEmployee;