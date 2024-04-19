var choice;

const inputData = () => {
    document.querySelectorAll('.option').forEach(option => {
        option.addEventListener('click', function() {
            choice = this.textContent.trim();
            // Sau khi lựa chọn được thiết lập, tiến hành xử lý dữ liệu
            getData();
        });
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
    pre_process_data();

    const formData = new URLSearchParams();
    formData.append('choice', choice);
    const url = 'http://localhost:3000/api/v1/average-benefit-paid';
    const urlWithParams = `${url}?${formData.toString()}`;

    try {
        const response = await fetch(urlWithParams);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data); // You can do something with the data here
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
};

// Khởi chạy hàm inputData khi trang được tải
inputData();
