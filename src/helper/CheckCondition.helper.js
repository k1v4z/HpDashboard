const checkPersonalWhere = (choice, value) => {
    if (choice == 'CURRENT_ GENDER' || choice == 'ETHNICICTY' || choice == 'SHAREHOLDER_STATUS') {
        return { [choice]: value };
    }

    return {};
}

const checkEmploymentWhere = (choice, value) => {
    if (choice == 'TYPE_OF_WORK') {
        return { [choice]: value }
    }

    return {};
}

module.exports = {
    checkPersonalWhere, checkEmploymentWhere
}