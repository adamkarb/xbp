'use strict';

const REDIS_URL = process.env.REDISCLOUD_URL || process.env.REDIS_URL;

var redis = require('redis');

var client = redis.createClient(REDIS_URL);

client.on('error' , (err) => {

	console.log(`An error has occurred with the redis database connection: ${err.stack}`);

});

client.on('ready' , () => {

	console.log(`:: Connected to redis database @ ${REDIS_URL} ::`);

});

module.exports = client;
