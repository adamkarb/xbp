'use strict';

(() => {

	var mongoose = require('mongoose');

	var schema = new mongoose.Schema({
		'name': { 'type': String, 'required': true },
		'email': { 'type': String, 'default': null },
		'metadata': { 'type': mongoose.Schema.Types.Mixed },
		'date_created': { 'type': Date, 'default': Date.now() },
		'date_modified': { 'type': Date, 'default': Date.now() }
	});

	schema.post( 'findOneAndUpdate', ( doc ) => {

	    doc.date_modified = Date.now();
	    doc.update();

	});

	var SampleRecord = mongoose.model( 'SampleRecord', schema );
	module.exports = SampleRecord;

})();
