function getAllNotification() {
    const list = document.querySelector('.box');
    list.innerHTML = '';
    getBirthdaysNotification();
    getCertainDayAniversary();
    getExceededNotification();
    getChangedDataMessage();
}

const getExceededNotification = async () => {
    const url = 'http://localhost:4080/api/v1/notification';

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        renderExceededData(data);
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

const renderExceededData = (data) => {
    const list = document.querySelector('.box');

    if (data.exceeded.length === 0) {
        list.innerHTML = '<ul><li>None</li></ul>';
    } else if (data.exceeded.length === 1) {
        const name = data.exceeded[0].CURRENT_FIRST_NAME;
        const link = data.exceeded[0].link;
        // Create a new list item for each notification
        const newListItem = document.createElement('li');
        // Set the text content of the list item
        newListItem.textContent = `${name}' is an employee who has exceeded the allotted number of days off.`;
        // Set the onclick event to redirect to the notification link
        newListItem.onclick = function () {
            window.location.href = link;
        };
        // Append the new list item to the list
        list.appendChild(newListItem);
    } else {
        const name = data.exceeded[0].CURRENT_FIRST_NAME;
        const link = data.exceeded[0].link;
        // Create a new list item for each notification
        const newListItem = document.createElement('li');
        // Set the text content of the list item
        newListItem.textContent = `${name}' and ${data.exceeded.length - 1} are employees who have exceeded the allotted number of days off`;
        // Set the onclick event to redirect to the notification link
        newListItem.onclick = function () {
            window.location.href = link;
        };
        // Append the new list item to the list
        list.appendChild(newListItem);
    }
}

