
const getExceeded = async () => {
    const formData = new URLSearchParams();
    const url = 'http://localhost:4080/api/v1/notification';
    const urlWithParams = `${url}?${formData.toString()}`;

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
    renderExceededTable(data);
}

const renderExceededTable = (data) => {
    let tabledata = document.querySelector('.exceeded-table-data');
    tabledata.innerHTML = '';

    if ((data.exceeded).length === 0) {
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
        data.exceeded.forEach((data_Item) => {
            const fullname = data_Item.CURRENT_LAST_NAME + ' ' + data_Item.CURRENT_MIDDLE_NAME + ' ' + data_Item.CURRENT_FIRST_NAME;
            const gender = data_Item.CURRENT_GENDER;
            const ethnicity = data_Item.ETHNICITY;
            const email = data_Item.CURRENT_PERSONAL_EMAIL;
            const phoneNumber = data_Item.CURRENT_PHONE_NUMBER;
            const requireDays = data_Item.NUMBER_DAYS_REQUIREMENT_OF_WORKING_PER_MONTH;
            const actualDays = data_Item.NUMBER_DAYS_ACTUAL_OF_WORKING_PER_MONTH;
            const overDays = data_Item.TOTAL_NUMBER_VACATION_WORKING_DAYS_PER_MONTH


            tabledata.innerHTML += `
                <tr>
                    <td>${fullname}</td>
                    <td>${ethnicity}</td>
                    <td>${gender}</td>
                    <td>${email}</td>
                    <td>${phoneNumber}</td>
                    <td>${requireDays}</td>
                    <td>${actualDays}</td>
                    <td>${overDays}</td>
                </tr>`;
        });
    }
}

getExceeded();