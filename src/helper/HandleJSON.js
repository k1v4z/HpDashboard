// Hàm để ghi dữ liệu vào file JSON
const fs = require('fs');

function readJSONFile(filepath) {
    try {
        const data = fs.readFileSync(filepath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading JSON file:', error);
        return [];
    }
}


function writeJSONFile(filepath, data) {
    try {
        fs.writeFileSync(filepath, JSON.stringify(data, null, 4));
        console.log('Data has been written to', filepath);
    } catch (error) {
        console.error('Error writing JSON file:', error);
    }
}



module.exports = { readJSONFile, writeJSONFile };