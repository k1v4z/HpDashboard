var choice;

const inputData = () => {
    option.addEventListener('click', function() {
        const selectedOption = this.textContent.trim();
        if (selectedOption === 'Shareholder' || selectedOption === 'Non-Shareholder') {
            choice = selectedOption === 'Shareholder' ? 1 : 0;
        } else {
            console.error('Invalid choice:', selectedOption);
        }
    });
};

const pre_process_data = () => {
    if (choice === 'Shareholder') {
        choice = 1;
    }
    if (choice === 'Non-Shareholder') {
        choice = 0;
    }
};

const getData = async () => {
    // Pre-process data based on choice
    
    inputData();
    pre_process_data();
    const formData = new URLSearchParams();
    formData.append('choice', choice);
    const url = 'http://localhost:4080/api/v1/average-benefit-paid';
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
        renderData(data);
};
const renderData = (data) => {
    let tabledata = document.querySelector('.Benefit-table-data');
    tabledata.innerHTML = '';

    if ((data.result).length === 0) {
        tabledata.innerHTML = `
            <tr>
                <td>None</td>
                <td>None</td>
                <td>None</td>
                <td>None</td>
                <td>None</td>
            </tr>`;
    } else {
        data.result.forEach((data_Item) => {
            const firstName = data_Item.CURRENT_FIRST_NAME;
            const lastName = data_Item.CURRENT_LAST_NAME;
            const planName = data_Item.BENEFIT_PLAN.PLAN_NAME;
            const deductible = data_Item.BENEFIT_PLAN.DEDUCTABLE;
            const percentageCopay = data_Item.BENEFIT_PLAN.PERCENTAGE_COPAY;

            tabledata.innerHTML += `
                <tr>
                    <td>${firstName}</td>
                    <td>${lastName}</td>
                    <td>${planName}</td>
                    <td>${deductible}</td>
                    <td>${percentageCopay}</td>
                </tr>`;
        });
    }
};

// Khởi chạy hàm inputData khi trang được tải

