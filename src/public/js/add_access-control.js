
const functions = document.querySelector('.enter-function');
const modeuleFunction = document.getElementById('module-function');
const group = document.querySelector('.enter-group');
const moduleInput = document.querySelector('.enter-module');
const dropdownSelect = document.getElementById('dropdown-select');

functions.classList.add('active');
modeuleFunction.classList.add('active');

dropdownSelect.addEventListener('change', function (e) {
    let selectedValue = e.target.value;
    document.querySelectorAll('.active').forEach((element) => {
        element.classList.remove('active');
    });

    if (selectedValue === 'function') {
        functions.classList.add('active');
        modeuleFunction.classList.add('active');
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
// console.log(back);
back.addEventListener('click', () => {
    // alert('Back');
    window.location.href = '/access_control';

})

// END BACK


