'use strict';

var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	'name': { 'type': String, 'required': true },
	'email': { 'type': String, 'default': null },
	'metadata': { 'type': mongoose.Schema.Types.Mixed },
}, { timestamps: true, versionKey: false });

var SampleRecord = mongoose.model('SampleRecord', schema);
module.exports = SampleRecord;
