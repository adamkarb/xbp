'use strict';

const REDIS_HOST = process.env.REDIS_CLOUD_HOST || process.env.REDIS_HOST || '127.0.0.1';
const REDIS_PORT = process.env.REDIS_CLOUD_PORT || process.env.REDIS_PORT || 6379;
const REDIS_PW = process.env.REDIS_CLOUD_PW || process.env.REDIS_PW || null;

var promiseBinding = require("q").Promise;
var redisPromise = require('promise-redis')(promiseBinding);
var redisOpts = {
	host: REDIS_HOST,
	port: REDIS_PORT
};

if (REDIS_PW) { redisOpts.password = REDIS_PW; }

var redis = redisPromise.createClient(redisOpts);

redis.on('error' , (err)=>{

	console.log(`an error has occurred with the redis database connection: ${err.stack}`);

});

redis.on('ready' , ()=>{

	console.log(`:: Connected to redis database @ port ${REDIS_PORT} ::`);

});

module.exports = redis;

