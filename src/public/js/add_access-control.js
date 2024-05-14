// ADD ACCESS CONTROL
const addAccessControl = document.querySelector('.btn-add_ac');
console.log(addAccessControl);
document.addEventListener("DOMContentLoaded", () => {
    addAccessControl.addEventListener('click', () => {
        window.location.href = "/add_access-control";
    });
})

// END ACCESS CONTROL 

const functions = document.querySelector('.enter-function');
const group = document.querySelector('.enter-group');
const moduleInput = document.querySelector('.enter-module');
const dropdownSelect = document.getElementById('dropdown-select');

functions.classList.add('active');

dropdownSelect.addEventListener('change', function (e) {
    let selectedValue = e.target.value;
    document.querySelectorAll('.active').forEach((element) => {
        element.classList.remove('active');
    });

    if (selectedValue === 'function') {
        functions.classList.add('active');
    } else if (selectedValue === 'group') {
        document.querySelectorAll('.active').forEach((element) => {
            element.classList.remove('active');
        });
        group.classList.add('active');

    } else if (selectedValue === 'module') {
        document.querySelectorAll('.active').forEach((element) => {
            element.classList.remove('active');
        });
        moduleInput.classList.add('active');

    }
});

// BACK

const back = document.querySelector('.btn-back');
console.log(back);
back.addEventListener('click', () => {
    window.location.href = "/access_control";
})

// END BACK


