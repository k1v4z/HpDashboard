const fs = require('fs');
const path = require('path');

function readJSONFile(filepath) {
    try {
        // Read content of JSON file
        const data = fs.readFileSync(filepath, 'utf8');
        
        // Parse JSON to array of objects
        const jsonArray = JSON.parse(data);
        
        // Returns array of objects
        return jsonArray;
    } catch (error) {
        console.error('Error reading JSON file:', error);
        return []; // Returns an empty array in case an error occurs
    }
}

// Use the function to read the file and get the array of objects
const messages = readJSONFile(path.join(__dirname, 'message.json'));


module.exports = messages;
