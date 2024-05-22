const btnAdd = document.querySelector('.btn-add')

const getAllModule = async () => {
    const modules = await fetch(`http://localhost:4080/api/v1/modules/findAll`)
        .then(res => res.json())
        .catch(err => console.log(err))

    return modules
}

const addGroup = async () => {
    const inputValue = document.querySelector('.enter-group').value
    await fetch(`http://localhost:4080/api/v1/groups/add?groupName=${inputValue}`, {
        method: 'POST'
    })
        .then(res => alert("Successful"))
        .catch(err => console.log(err))
}

const addFunction = async () => {
    const inputValue = document.querySelector('.enter-function').value
    const moduleValue = document.getElementById('module-function').value

    await fetch(`http://localhost:4080/api/v1/functions/add?functionName=${inputValue}&moduleId=${moduleValue}`, {
        method: 'POST'
    })
        .then(res => alert("Successful"))
        .catch(err => console.log(err))
}


const addModule = async () => {
    const inputValue = document.querySelector('.enter-module').value
    await fetch(`http://localhost:4080/api/v1/modules/add?moduleName=${inputValue}`, {
        method: 'POST'
    })
        .then(res => alert("Successful"))
        .catch(err => console.log(err))
}

const add = () => {
    const selectedItem = document.getElementById("dropdown-select").value

    if (selectedItem == 'function') {
        addFunction()
    }

    if (selectedItem == 'group') {
        addGroup()
    }

    if (selectedItem == 'module') {
        addModule()
    }
}

const loadModuleIntoView = async () => {
    const module_function = document.getElementById('module-function')
    let moduleFunctionHTML = ''

    if (document.getElementById("dropdown-select").value == 'function') {
        const modules = await getAllModule()
        modules.modules.forEach((module) => {
            moduleFunctionHTML += `<option value=${module.MODULE_ID}>${module.MODULE_NAME}</option>`
        })

        module_function.innerHTML = moduleFunctionHTML
    }
}

loadModuleIntoView()

btnAdd.addEventListener('click', () => {
    add()
})