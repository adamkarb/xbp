'use strict';

const ROOT_DIR = process.env.ROOT_DIR;

var winston = require('winston');

// TODO: revisit log size and number of archives.
var fileTransport = new winston.transports.File({
    'name': 'file' ,
    'filename': ROOT_DIR + '/error.log' ,
    'maxsize': 2097152 ,
    'maxFiles': 10 ,
    'zippedArchive': true ,
    'timestamp': true
});

var Logger = new winston.Logger({
    'transports': [ fileTransport ],
    'exitOnError': false
});

module.exports = Logger;
