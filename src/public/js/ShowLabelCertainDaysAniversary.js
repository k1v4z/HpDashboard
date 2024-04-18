function getAllNotification() {
    const list = document.querySelector('.box');
    list.innerHTML = '';
    getBirthdaysNotification();
    getCertainDayAniversary();
    getExceededNotification();
}

const getCertainDayAniversary = async () => {
    const url = 'http://localhost:4080/api/v1/aniversary';
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        renderCertainDayAniversary(data);
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

const renderCertainDayAniversary = (data) => {
    const list = document.querySelector('.box');

    const name = data.Fullname;
    const certainDay = data.CertainDay;
    const sex = data.Sex == 'Male' ? 'his' : 'her';
    const hiringDay = data.HiringDay;

    // Create a new list item for each notification
    const newListItem = document.createElement('li');

    // Set the text content of the list item
    newListItem.textContent = `
        ${name} work in company ${certainDay} days from ${sex} aniversary (${hiringDay}).
    `;

    // Append the new list item to the list
    list.appendChild(newListItem);
}

