function getAllNotification() {
    getBirthdaysNotification();
    // alert("Lên rồi nhé!")
    // console.log("Gọi đến get all notify")
}

const getBirthdaysNotification = async () => {
    const url = 'http://localhost:4080/api/v1/notification';

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        renderView(data);
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

const renderView = (data) => {
    const list = document.querySelector('.box');
    list.innerHTML = '';

    if (data.birthday.length === 0) {
        list.innerHTML = '<ul><li>None</li></ul>';
    } else {
        const name = data.birthday[0].CURRENT_FIRST_NAME;
        const link = data.birthday[0].link;

        // Create a new list item for each notification
        const newListItem = document.createElement('li');

        // Set the text content of the list item
        newListItem.textContent = `This month is ${name}'s birthday and ${data.birthday.length - 1} other members.`;

        // Set the onclick event to redirect to the notification link
        newListItem.onclick = function () {
            window.location.href = link;
            // getBirthdaysIntoTable();
        };

        // Append the new list item to the list
        list.appendChild(newListItem);
    }
}

