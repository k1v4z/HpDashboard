const redis = require('redis')
const fs = require('fs')
const util = require('util')

const client = redis.createClient({
    host: 'localhost',
    port: 6379
})
const writeFile = util.promisify(fs.writeFile)
const readFile = util.promisify(fs.readFile)

async function connectRedis() {
    client.on('error', err => console.log('Redis Client Error', err));
    client.on('connect', function () {
        console.log('Connected to Redis')
    })

    await client.connect()
}

async function saveMessageToFile(message) {
    try {
        const data = { message: message }
        const jsonData = JSON.stringify(data);
        await writeFile('D:/CEO-Memo-Dashboard/src/message.json', jsonData)
        console.log('Message saved to file: ', message)
    } catch (err) {
        console.error('Error saving message to file: ', err);
    }
}

async function readMessageFromFile() {
    try {
        const jsonData = await readFile('D:/CEO-Memo-Dashboard/src/message.json', 'utf8')
        await client.get('message', function (err, reply) {
            if (err) {
                console.error('Error getting message from Redis:', err);
            } else {
                console.log('Message retrieved from cache:', reply);
            }
        });

        const data = JSON.parse(jsonData)
        const message = data.message
        console.log('Message read from file:', message);
        return message;
    } catch (error) {
        console.error('Error reading message from file:', error);
        return null;
    }
}

async function handleCacheExpiration() {
    // Read message from file
    const message = await readMessageFromFile()
    if (message) {
        // If message exists in file, store it in cache
        await client.set('message', message)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }
}

// Listen for cache expiry event or server restart
client.on('ready', async function () {
    console.log('Connected to Redis, server restart');
    // Handle cache expiry or server restart
    await handleCacheExpiration();
});

async function saveMessageFromClient(message) {
    // Save message to cache
    await client.set('message', message)
        .then((res) => {
            console.log("Message saved ")
            saveMessageToFile(message)
        })
        .catch(err => console.log(err))
}

module.exports = connectRedis