'use strict';

(() => {

    const ROOT_DIR = process.env.ROOT_DIR;

    var express = require('express');
    var Router = new express.Router();

    Router.get( '/', ( req, res, next ) => {

        res.render( '/home' );

    });

    module.exports = Router;

})();
