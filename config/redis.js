'use strict';

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

var redisPromise = require('promise-redis')();

var redis = redisPromise.createClient(REDIS_URL);

redis.on('error', (err) => {

	console.log(`An error has occurred with the redis database connection: ${err.stack}`);

});

redis.on('ready', () => {

	console.log(`:: Connected to redis database @ ${REDIS_URL} ::`);

});

module.exports = redis;
