const defineAssociation = require("../model/association/Association");
const Personal = require("../model/human/Personal");

defineAssociation();

const getPersonalById = async (id) => {
    const PersonalByID = await Personal.findOne({
        where: {
            PERSONAL_ID: id
        }
    }).then(res => JSON.stringify(res))
        .then(StringJSON => JSON.parse(StringJSON))
        .catch(err => console.log(err));

    return PersonalByID;
}

module.exports = {
    getPersonalById
}