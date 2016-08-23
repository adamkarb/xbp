'use strict';

(() => {

	const ROOT_DIR = process.env.ROOT_DIR = __dirname;
	const SERVER_PORT = process.env.PORT || process.env.SERVER_PORT || 8989;

	// Pull in environmental variables
	require('dotenv').config({ path: `${ROOT_DIR}/.env` });

    // Import Components
	var express = require('express');
	var app = express();
	var bodyParser = require('body-parser');
	var cookieParser = require('cookie-parser');
	var logger = require( `${ROOT_DIR}/config/winston` );
	var nunjucksENV = require( `${ROOT_DIR}/config/nunjucksENV` );

    // Import Routes
    var viewRoutes = require( `${ROOT_DIR}/lib/routes/views/views.main` );
	var apiRoutes = require( `${ROOT_DIR}/lib/routes/api/api.main` );

	// CORS
	app.use(( req , res , next ) => {

		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
		res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
		next();

	});

	app.use( express.static( `${ROOT_DIR}/public/static` ) );
	app.set( 'view engine', 'nunjucks' );
	nunjucksENV.express( app );


	app.options( '*' , ( req , res , next ) => { res.send( '' ); } );

	app.use( bodyParser.json({ limit: '5mb' }) );
	app.use( cookieParser() );

	// Configure routes
	app.use( '/', viewRoutes );
	app.use( '/api', apiAuthRoutes );

    // Configure Error Handling
	app.all( '*' , ( req , res , next ) => {

		res.status( 404 );

		// DEPENDING ON API OR VIEW, RENDER 404 OR SEND 404

		res.render( '404' );

	    // res.send({
		// 	'status': res.statusCode,
		// 	'message': 'No resource exists at this route.'
		// });

	});

	app.use(( err , req , res , next ) => {

		var errorStatus = err.status || 500;

		if ( res.statusCode == 200 ) { res.status( errorStatus ); }

		var status = res.statusCode;
		var message = err.message || 'no message';
		var stack = err.stack || 'no stack';
		var raw = err._raw || 'no raw';

		logger.log( 'error' , { 'status': status , 'message': message , 'stack': stack , 'raw': raw } );

		next( err );

	});

	app.use(( err , req , res , next ) => {

		res.send({
			'status': res.statusCode,
			'message': err.message
		});

		if ( err.stack ) { console.log( err.stack ); }

	});

	// Start the server

	app.listen( SERVER_PORT , () => {

	    console.log( `:: express server listening @ port ${SERVER_PORT} ::` );

	});

})();
