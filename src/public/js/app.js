document.addEventListener("DOMContentLoaded", () => {
    let btnLogin = document.getElementById('login');
    let dashboardWindow;
    btnLogin.addEventListener('click', () => {
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;
        if (username == 'admin' && password == '123') {
            window.close();
            dashboardWindow = window.open("dashboard.html", "_blank");
        }
        else {
            alert("Username or Password incorrect");
        }
    });
});

let menus = document.querySelectorAll('.content');
let box = document.querySelector(".container-box");
let BtnNav = document.querySelectorAll('.btn');
let showUI1 = document.querySelector('.content.ui1');
let showUI2 = document.querySelector('.content.ui2');
let showUI3 = document.querySelector('.content.ui3');
let showUI4 = document.querySelector('.content.ui4');
let BtnN1 = document.querySelector('li.btn.n1');
let BtnN2 = document.querySelector('li.btn.n2');
let BtnN3 = document.querySelector('li.btn.n3');
let BtnN4 = document.querySelector('li.btn.n4');
let BtnN5 = document.querySelector('li.btn.n5');
let alertBtn = document.querySelector('.alert');
document.querySelector('#alert-btn').onclick = () => {
    alertBtn.classList.toggle('active');
    // window.location.href = "/notification";
}
let destroyAlert = document.querySelectorAll('.content');
for (let i = 0; i < destroyAlert.length; i++) {
    destroyAlert[i].addEventListener('click', function (event) {
        alertBtn.classList.remove('active');
    });
}
let overlay = document.createElement('div');
overlay.className = 'container-box';
overlay.innerHTML = `
    <div class="question-box">
        <p class="question">Are you sure want to exit the system?</p>
        <div class="options">
            <button class="option yes">Yes</button>
            <button class="option no">No</button>
        </div>
    </div>
`;
document.body.appendChild(overlay);

document.getElementById('logout').onclick = () => {
    BtnNav.forEach(navbar => {
        navbar.classList.remove('active');
    });
    overlay.style.display = 'block';
    BtnN5.classList.add('active');
}

let btnYes = overlay.querySelector('.option.yes');
let btnNo = overlay.querySelector('.option.no');
btnYes.addEventListener('click', () => {

    window.location.href = "index.html";
});
btnNo.addEventListener('click', () => {
    overlay.style.display = 'none';
    BtnN5.classList.remove('active');
});
/// thay đổi nôi dung dropdown list
document.addEventListener("DOMContentLoaded", function () {
    var dropdownContents = document.querySelectorAll('.dropdown-content');
    var dropbtns = document.querySelectorAll('.dropbtn');
    dropdownContents.forEach(function (dropdownContent, index) {
        dropdownContent.addEventListener('click', function (event) {
            if (event.target.tagName === 'A') {
                dropbtns[index].textContent = event.target.textContent;
            }
        });
    });
});
// tuong tac cá dropdown list
let dynamicBtns = document.getElementsByClassName('btn-dynamic');
let dynamicBoxes = document.getElementsByClassName('dynamic-box');
for (let i = 0; i < dynamicBtns.length; i++) {
    dynamicBtns[i].addEventListener('click', () => {
        for (let j = 0; j < dynamicBoxes.length; j++) {
            dynamicBoxes[j].classList.remove('active');
        }
        dynamicBoxes[i].classList.add('active');
    });
}
let Derpartmentbtn = document.getElementsByClassName('btn1');
for (let i = 0; i < Derpartmentbtn.length; i++) {
    Derpartmentbtn[i].addEventListener('click', removeActiveClasses)
}


function removeActiveClasses() {
    for (let j = 0; j < dynamicBoxes.length; j++) {
        dynamicBoxes[j].classList.remove('active');
    }
    let button = document.getElementById("titleOption");
    button.innerText = "Option";

}



// menu 
document.querySelector('#earnings').onclick = () => {
    window.location.href = "/total-earnings";
    //showUI2.classList.add('active');
    BtnN2.classList.add('active');
    alertBtn.classList.remove('active');
}
document.querySelector('#dash').onclick = () => {
    window.location.href = "/"
    // showUI1.classList.add('active');
    // BtnN1.classList.add('active');
    alertBtn.classList.remove('active');

}
document.querySelector('#vacationdays').onclick = () => {
    window.location.href = "/vacation-days";
    showUI3.classList.add('active');
    BtnN3.classList.add('active');
    alertBtn.classList.remove('active');
}
document.querySelector('#benefits').onclick = () => {
    window.location.href = "/average-benefit-paid";
    // hideAllContent();
    showUI4.classList.add('active');
    BtnN4.classList.add('active');
    alertBtn.classList.remove('active');
}

function hideAllContent() {
    menus.forEach(menu => {
        menu.classList.remove('active');
    });
    BtnNav.forEach(navbar => {
        navbar.classList.remove('active');
    });
}

const data = [80, 20];
const total = data.reduce((acc, val) => acc + val, 0);
const percentages = data.map(value => ((value / total) * 100).toFixed(2) + "%");

new Chart(document.getElementById('pie-chart'), {
    type: 'pie',
    data: {
        labels: ["Shareholder (" + percentages[0] + ")", "Non-Shareholder (" + percentages[1] + ")"],
        datasets: [{
            backgroundColor: ["#e63946", "#254BDD"],
            data: data
        }]
    },
    options: {
        title: {
            display: true,
            text: 'Pie Chart for admin panel'
        },
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    font: {
                        size: 14
                    },
                    color: 'black',
                    padding: 30,
                    magin: 30
                }
            }
        },
        layout: {
            padding: {
                top: 10,
            }
        }

    }
});

// ShowAlert
function showAlert1() {
    var alertBirthday = document.querySelector('.alert-birthday');
    hideAllContent();
    BtnNav.forEach(navbar => {
        navbar.classList.remove('active');
    });
    alertBirthday.classList.add('active');
    alertBtn.classList.remove('active');
}
function showAlert2() {
    var alertVacationsday = document.querySelector('.alert-vacations__day');
    hideAllContent();
    BtnNav.forEach(navbar => {
        navbar.classList.remove('active');
    });
    alertVacationsday.classList.add('active');
    alertBtn.classList.remove('active');
}
