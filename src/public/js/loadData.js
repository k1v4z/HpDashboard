const moduleElement = document.getElementById('modules')

const getAllModules = async () => {
    const modules = await fetch(`http://localhost:4080/api/v1/modules/findAll`)
        .then(res => res.json())
        .catch(err => console.log(err))

    return modules.modules
}

const loadModule = async () => {
    
    let moduleHTML = ''

    const modules = await getAllModules()
    modules.forEach((module) => {
        moduleHTML += `<option id=${module.MODULE_ID} value="${module.MODULE_ID}">${module.MODULE_NAME}</option>`
    })

    moduleElement.innerHTML = moduleHTML
}

const loadGroup = async () => {

}

loadModule()