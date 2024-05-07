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

module.exports = formatDate;