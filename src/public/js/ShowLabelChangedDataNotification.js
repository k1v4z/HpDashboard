function getAllNotification() {
    const list = document.querySelector('.box');
    list.innerHTML = '';
    getBirthdaysNotification();
    getCertainDayAniversary();
    getExceededNotification();
    getChangedDataMessage();
}
const getChangedDataMessage = async () => {
    const url = 'http://localhost:4080/api/v1/changed-benefit-plan';

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        renderMessage(data);
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}


// Hàm xử lý thông báo khi dữ liệu thay đổi
function renderMessage(data) {
    data.new_data.forEach(notify => {
        const list = document.querySelector('.box');

        const name = notify.name;
        const gender = notify.gender;
        const benefit_plan_id = notify.benefit_plan_id;
        const date_created_at = notify.date_created_at;

        // Tạo một thẻ li mới cho mỗi thông báo
        const newListItem = document.createElement('li');

        // Đặt nội dung văn bản của thẻ li
        if (gender == "Female") {
            newListItem.textContent = `
                ${name} changed her benefit plan on ${date_created_at}, with the new benefit plan ID being ${benefit_plan_id}.
            `;
        } else {
            newListItem.textContent = `
                ${name} changed his benefit plan on ${date_created_at}, with the new benefit plan ID being ${benefit_plan_id}.
            `;
        }

        // Thêm thẻ li mới vào danh sách
        list.appendChild(newListItem);
    });
}
