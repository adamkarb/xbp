'use strict';

const DB_NAME = 'ANYTHINGYOUWANT';
const MONGO_HOST = process.env.MONGO_HOST || `mongodb://localhost/${DB_NAME}`;

var mongoose = require('mongoose');
mongoose.Promise = Promise;
var mongooseOptions = {};

connect(MONGO_HOST, mongooseOptions);

mongoose.connection.on('connecting', () => {

    console.log(`:: Establishing connection with mongo database @ ${MONGO_HOST} ::`);

});

mongoose.connection.on('connected', () => {

    console.log(`:: Connected with mongo database @ ${MONGO_HOST} ::`);

});

mongoose.connection.on('error', (err) => {

    console.log(`:: Error with mongo database @ ${MONGO_HOST} ::`);
    console.log(err.stack);

});

mongoose.connection.on('disconnected', () => {

    setTimeout(() => {

        connect(MONGO_HOST, mongooseOptions);

    }, 1000);

});

function connect(host, opts) {

	// TODO: define keepAlive, connectTimeoutMS, socketTimeoutMS
	opts = opts || {};
	mongoose.connect(host, opts);

}

module.exports = mongoose.connection;
