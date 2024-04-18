
let choice_year;
let choice_value;
var choice;
let radioButtons;

const inputData = () => {
    choice = document.getElementById('titleOption').innerText;
    document.querySelectorAll('.dynamic-box').forEach((item) => {
        if (item.classList.contains('active')) {
            choice_value = item.innerText;
        }
    });
    radioButtons = document.getElementsByName("year");
    for (var i = 0; i < radioButtons.length; i++) {
        // Check if the radio button is checked
        if (radioButtons[i].checked) {
            // If checked, set the selected value
            choice_year = radioButtons[i].value;
            // Break the loop since we found the selected value
            break;
        }
    }
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

    console.log("Hi", choice, choice_value, choice_year);
    const formData = new URLSearchParams();
    formData.append('choice_year', choice_year);
    formData.append('choice', choice);
    formData.append('choice_value', choice_value);
    const url = 'http://localhost:4080/api/v1/vacation-days';
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
    renderVacationDaysTable(data, choice_year);
}
const renderVacationDaysTable = (data, selectedColumn) => {
    let tabledata = document.querySelector('.vacation_days-table-data');
    tabledata.innerHTML = '';

    // Row naming will choose based on the selected
    const selectedColumnTitle = selectedColumn === 'Paid To Date' ? 'Paid To Date' : 'Paid Last Year';

    if ((data.result).length === 0) {
        tabledata.innerHTML = `
            <tr>
                <td>None</td>
                <td>None</td>
                <td>None</td>
                <td>None</td>
                <td>None</td>
                <td>None</td>
                <td>None</td>
                <td>None</td>
            </tr>`;
    } else {
        data.result.forEach((data_Item) => {
            const fullname = data_Item.CURRENT_LAST_NAME + ' ' + data_Item.CURRENT_MIDDLE_NAME + ' ' + data_Item.CURRENT_FIRST_NAME;
            const gender = data_Item.CURRENT_GENDER;
            const ethnicity = data_Item.ETHNICITY;
            const email = data_Item.CURRENT_PERSONAL_EMAIL;
            const phoneNumber = data_Item.CURRENT_PHONE_NUMBER;
            const paidToDate = data_Item['Paid To Date'];
            const paidLastYear = data_Item['Paid Last Year'];
            const vacationDays = data_Item['Vacation Days'];

            // Store 'Paid To Date' col 
            let paidToDateColumn = '';
            if (selectedColumn === 'Paid Last Year') {
                paidToDateColumn = ''; //If 'Paid Last Year' has chosen, invisible 'Paid To Date' col
            } else {
                paidToDateColumn = `<td>${paidToDate}</td>`;
            }

            // Store 'Paid Last Year' col
            let paidLastYearColumn = '';
            if (selectedColumn === 'Paid To Date') {
                paidLastYearColumn = ''; // If 'Paid To Date' has chosen, invisible 'Paid Last Year' col
            } else {
                paidLastYearColumn = `<td>${paidLastYear}</td>`;
            }

            tabledata.innerHTML += `
                <tr>
                    <td>${fullname}</td>
                    <td>${gender}</td>
                    <td>${ethnicity}</td>
                    ${paidToDateColumn}
                    ${paidLastYearColumn}
                    <td>${email}</td>
                    <td>${phoneNumber}</td>
                    <td>${vacationDays}</td>
                </tr>`;
        });
    }

    // Update row name
    const tableHeaders = document.querySelectorAll('.table.table-bordered th');
    tableHeaders[3].innerText = selectedColumnTitle;
};
