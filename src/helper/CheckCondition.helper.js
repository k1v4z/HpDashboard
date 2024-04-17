const checkPersonalWhere = (choice, value) => {
    if (choice == 'CURRENT_GENDER' || choice == 'ETHNICITY' || choice == 'SHAREHOLDER_STATUS') {
        return { [choice]: value };
    }

    return {};
}

const checkJobHistoryWhere = (choice, value, department) => {
    if (choice == 'TYPE_OF_WORK') {
        return {
            DEPARTMENT: department,
            [choice]: value
        }
    }

    return { DEPARTMENT: department };
}

module.exports = {
    checkPersonalWhere, checkJobHistoryWhere
}