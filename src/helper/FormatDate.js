const formatDate = (dateString) => {
    if (!dateString || dateString.toLowerCase() === 'invalid date') {
        return null; // Trả về null nếu ngày không hợp lệ
    }
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
        return null; // Trả về null nếu ngày không hợp lệ
    }
    return date.toISOString().split('T')[0]; // Chuyển đổi ngày thành dạng 'YYYY-MM-DD'
};


const getCurrentDateTime = () => {
    const now = new Date();
    const options = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
        hour12: true
    };
    const formatter = new Intl.DateTimeFormat('en-US', options);
    return formatter.format(now);
};

module.exports = { getCurrentDateTime, formatDate };