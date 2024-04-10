const checkPersonalWhere = (choice, value) => {
    if (choice == 'Gender' || choice == 'Ethnicity' || choice == 'Shareholder_Status') {
        return { [choice]: value };
    }

    return {};
}

const checkEmploymentWhere = (choice, value) => {
    if (choice == 'Employment_Status') {
        return { [choice]: value }
    }

    return {};
}

module.exports = {
    checkPersonalWhere, checkEmploymentWhere
}