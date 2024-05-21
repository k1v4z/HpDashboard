const btnAdd = document.querySelector('.btn-add')

const addGroup = async () => {
    const inputValue = document.querySelector('.enter-group').value
    await fetch(`http://localhost:4080/api/v1/groups/add?groupName=${inputValue}`,{
        method: 'POST'
    })
        .then(res => alert("Successful"))
        .catch(err => console.log(err))
}

const add = () => {
    const selectedItem = document.getElementById("dropdown-select").value

    if (selectedItem == 'function') {

    }

    if (selectedItem == 'group') {
        addGroup()
    }

    if (selectedItem == 'module') {

    }
}

btnAdd.addEventListener('click', () => {
    add()
})