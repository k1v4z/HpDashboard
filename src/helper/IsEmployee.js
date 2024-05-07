const Employment = require('../model/human/Employment');

const isEmployee = async (id) => {
    try {
        const employee = await Employment.findOne({
            where: { PERSONAL_ID: id }
        });
        return !!employee; 
    } catch (err) {
        console.error("Error retrieving employee data:", err);
        return false; 
    }
}

module.exports = isEmployee;
