const fs = require('fs');
const path = require('path');

function readJSONFile(filepath) {
    try {
        // Đọc nội dung của file JSON
        const data = fs.readFileSync(filepath, 'utf8');
        
        // Parse JSON thành mảng các đối tượng
        const jsonArray = JSON.parse(data);
        
        // Trả về mảng các đối tượng
        return jsonArray;
    } catch (error) {
        console.error('Error reading JSON file:', error);
        return []; // Trả về một mảng rỗng trong trường hợp có lỗi xảy ra
    }
}

// Sử dụng hàm để đọc file và lấy mảng các đối tượng
const messages = readJSONFile(path.join(__dirname, 'message.json'));


module.exports = messages;
