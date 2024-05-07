async function configRedis(redis) {
    const client = redis.createClient({
        host: 'localhost',
        port: 6379
    })

    client.on('error', err => console.log('Redis Client Error', err));
    client.on('connect', function () {
        console.log('Connected to Redis')
    })

    await client.connect()
}

module.exports = configRedis