const moduleElement = document.getElementById('modules');
const groupElement = document.querySelector('.groups');
const groups = document.querySelectorAll('.group input')


const getAllModules = async () => {
    try {
        const response = await fetch(`http://localhost:4080/api/v1/modules/findAll`);
        const modules = await response.json();
        return modules.modules;
    } catch (err) {
        console.error('Error fetching modules:', err);
    }
};

const getAllGroup = async () => {
    try {
        const response = await fetch(`http://localhost:4080/api/v1/groups/findAll`);
        const allGroup = await response.json();
        return allGroup;
    } catch (err) {
        console.error('Error fetching groups:', err);
    }
};

const loadModule = async () => {
    let moduleHTML = '';

    const modules = await getAllModules();
    if (modules) {
        modules.forEach((module) => {
            moduleHTML += `<option id=${module.MODULE_ID} value=${module.MODULE_ID}>${module.MODULE_NAME}</option>`;
        });

        moduleElement.innerHTML = moduleHTML;
    }
};

const loadGroup = async () => {
    let groupHTML = '';

    const moduleId = moduleElement.value;
    if (!moduleId) {
        console.log('No module selected');
        return;
    }

    const allGroup = await getAllGroup();
    if (!allGroup || !allGroup.groupsArray) {
        console.log('Error fetching all groups');
        return;
    }

    try {
        const response = await fetch(`http://localhost:4080/api/v1/modules/getGroup?moduleId=${moduleId}`);
        const groups = await response.json();
        
        allGroup.groupsArray.forEach((group) => {
            let isChecked = groups.groupArray.some(item => group.GROUP_ID === item.GROUP_ID);
            groupHTML += `
                <div class="group">
                    <input type="checkbox" ${isChecked ? 'checked' : ''} value=${group.GROUP_ID}>
                    <label for="group1">${group.GROUP_NAME}</label>
                </div>
            `;
        });

        groupElement.innerHTML = groupHTML;
    } catch (err) {
        console.error('Error fetching module groups:', err);
    }
};

moduleElement.addEventListener('change', loadGroup);

groups.forEach((group) => {
    group.addEventListener('change', () => {
        console.log("val",module.value)
        console.log("gr",groups.value)
    })
})

// Ensure modules are loaded first
loadModule().then(() => {
    loadGroup();
});
