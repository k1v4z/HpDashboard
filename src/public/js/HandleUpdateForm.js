document.addEventListener('DOMContentLoaded', () => {
    const checkbox = document.getElementById('employee-showInfo_update');
    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            document.querySelector('.employee-infor_update').style.display = "flex";
            document.querySelector('.employee-title_update').style.display = "block";
        } else {
            document.querySelector('.employee-infor_update').style.display = "none";
            document.querySelector('.employee-title_update').style.display = "none";
        }
    });
});