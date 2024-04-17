let department;
let choice_year;
let choice_value;
var choice;
let radioButtons;

const inputData = () => {
    department = document.querySelector('.department').innerText;
    choice = document.getElementById('titleOption').innerText;
    document.querySelectorAll('.dynamic-box').forEach((item) => {
        if (item.classList.contains('active')) {
            choice_value = item.innerText;
        }
    });
    radioButtons = document.getElementsByName("age");
    for (var i = 0; i < radioButtons.length; i++) {
        // Check if the radio button is checked
        if (radioButtons[i].checked) {
            // If checked, set the selected value
            choice_year = radioButtons[i].value;
            // Break the loop since we found the selected value
            break;
        }
    }
    console.log('department',department);
}

const pre_process_data = () => {
    if (choice_value == 'Shareholder') {
        choice_value = 1;
    }
    if (choice_value == 'Non-shareholder') {
        choice_value = 0;
    }
    if (choice_value == 'Full-time') {
        choice_value = 1;
    }
    if (choice_value == 'Part-time') {
        choice_value = 0;
    }

    if (choice == 'Shareholder') {
        choice = 'SHAREHOLDER_STATUS'
    } else if (choice == 'Gender') {
        choice = 'CURRENT_GENDER'
    } else if (choice == 'Employee Status') {
        choice = 'TYPE_OF_WORK'
    } else if (choice == 'Ethnicity') {
        choice = 'ETHNICITY'
    }
}

const getData = async () => {
    inputData();
    pre_process_data();

    console.log("Hi",department, choice, choice_value, choice_year);
    const formData = new URLSearchParams();
    formData.append('department', department);
    formData.append('choice_year', choice_year);
    formData.append('choice', choice);
    formData.append('choice_value', choice_value);
    const url = 'http://localhost:4080/api/v1/total-earnings';
    const urlWithParams = `${url}?${formData.toString()}`;

    // Make the fetch request with the modified URL
    const data = await fetch(urlWithParams)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // or response.text() if the response is not JSON
        })
        .catch(error => {
            // Handle errors
            console.error('There was a problem with the fetch operation:', error);
        });
    console.log(data);
    renderView(data);

}

const renderView = (data) => {
    let tabledata = document.querySelector('.benefit-table-data');
    tabledata.innerHTML = ''
    if ((data.result).length == 0) {
        tabledata.innerHTML = `
        <tr>
            <td>None</td>
            <td>None</td>
            <td>None</td>
            <td>None</td>
        </tr>`
    } else {
        data.result.forEach((data_Item) => {
            const fullname = data_Item.CURRENT_LAST_NAME + ' ' + data_Item.CURRENT_MIDDLE_NAME + ' ' + data_Item.CURRENT_FIRST_NAME;
            const department = data_Item.EMPLOYMENTs[0].JOB_HISTORies[0].DEPARTMENT;
            const ethnicity = data_Item.ETHNICITY;
            const earnings = data_Item.benefit;
            tabledata.innerHTML += `
        <tr>
            <td>${fullname}</td>
            <td>${department}</td>
            <td>${ethnicity}</td>
            <td>${earnings}</td>
        </tr>
    `;
        });
    }

}

