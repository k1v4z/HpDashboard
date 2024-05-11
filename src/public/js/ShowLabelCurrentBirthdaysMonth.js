function getAllNotification() {
    const list = document.querySelector('.box');
    list.innerHTML = '';
    getBirthdaysNotification();
    getCertainDayAniversary();
    getExceededNotification();
    getChangedDataMessage();
}

const getBirthdaysNotification = async () => {
    const url = 'http://localhost:4080/api/v1/notification';

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        renderBirthdaysData(data);
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

const renderBirthdaysData = (data) => {
    const list = document.querySelector('.box');
    
    if (data.birthday.length === 0) {
        list.innerHTML = '<ul><li>Birthday: none</li></ul>';
    } else if (data.birthday.length === 1) {
        const name = data.birthday[0].CURRENT_FIRST_NAME;
        const link = data.birthday[0].link;
        // Create a new list item for each notification
        const newListItem = document.createElement('li');
        // Set the text content of the list item
        newListItem.textContent = `This month is ${name}'s birthday!`;
        newListItem.onclick = function () {
            window.location.href = link;
        };
        // Append the new list item to the list
        list.appendChild(newListItem);
    } else {
        const name = data.birthday[0].CURRENT_FIRST_NAME;
        const link = data.birthday[0].link;
        // Create a new list item for each notification
        const newListItem = document.createElement('li');
        // Set the text content of the list item
        newListItem.textContent = `This month is ${name}'s birthday and ${data.birthday.length - 1} other members.`;
        newListItem.onclick = function () {
            window.location.href = link;
        };
        // Append the new list item to the list
        list.appendChild(newListItem);
    }
}

