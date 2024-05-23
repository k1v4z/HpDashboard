const listUser = document.getElementById('tag-select_user')
let listUserHTML = ''


const fillListUserIntoSelectTag = async () => {
    const users = await getAllUser()

    users.forEach((user) => {
        listUserHTML += `<option value=${user.USER_ID}>${user.USER_NAME}</option>`
    })

    listUser.innerHTML = listUserHTML
}

const fillGroup = async () => {
    const groups = await getAllGroup()
    const userId = listUser.value
    const groupElement = document.querySelector('.group .group-left')
    const groupOfUser = await getGroupByUserId(userId)

    let groupHTML = ''

    groups.forEach((group) => {
        let isChecked = groupOfUser.some(item => group.GROUP_ID === item.GROUP_ID);

        groupHTML += `
        <div class="group-left_item">
            <input type="checkbox" name="" ${isChecked ? 'checked' : ''} id=${group.GROUP_ID}>
            <label for="">${group.GROUP_NAME}</label>
        </div>`
    })

    groupElement.innerHTML = groupHTML
}

const fillFunction = async () => {
    const functions = await getAllFunction()
    const userId = listUser.value
    const functionElement = document.querySelector('.function .function-left')
    const functionOfUser = await getFunctionByUserId(userId)

    let functionHTML = ''

    functions.forEach((func) => {
        let isChecked = functionOfUser.some(item => func.FUNCTION_ID === item.FUNCTION_ID);
        console.log("FuncId: ",func.FUNCTION_ID)
        functionHTML += `
        <div class="function-left_item">
            <input type="checkbox" name="" ${isChecked ? 'checked' : ''} id=${func.FUNCTION_ID}>
            <label for="">${func.FUNCTION_NAME}</label>
        </div>`
    })

    functionElement.innerHTML = functionHTML
}

const getAllUser = async () => {
    const users = await fetch(`http://localhost:4080/api/v1/users/findAll`)
        .then(res => res.json())
        .catch(err => console.log(err))

    return users.usersArray
}

const getAllGroup = async () => {
    const groups = await fetch(`http://localhost:4080/api/v1/groups/findAll`)
        .then(res => res.json())
        .catch(err => console.log(err))

    return groups.groupsArray
}

const getAllFunction = async () => {
    const funcs = await fetch(`http://localhost:4080/api/v1/functions/findAll`)
        .then(res => res.json())
        .catch(err => console.log(err))

    return funcs.funcsArray
}

const getGroupByUserId = async (id) => {
    const groups = await fetch(`http://localhost:4080/api/v1/groups/findGroup?userId=${id}`)
        .then(res => res.json())
        .catch(err => console.log(err))

    return groups.groupsArray
}

const getFunctionByUserId = async (id) => {
    const functions = await fetch(`http://localhost:4080/api/v1/functions/findFunction?userId=${id}`)
        .then(res => res.json())
        .catch(err => console.log(err))

    return functions.functionsArray
}

listUser.addEventListener('change',async function(){
    await fillGroup()
    await fillFunction()
})

fillListUserIntoSelectTag()
    .then(() => {
        fillGroup()
    })
    .then(() => {
        fillFunction()
    })
