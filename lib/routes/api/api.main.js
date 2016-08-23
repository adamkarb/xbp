'use strict';

(() => {

    const ROOT_DIR = process.env.ROOT_DIR;

    var express = require('express');
    var Router = new express.Router();

    Router.get( '/', ( req, res, next ) => {

        res.send({
            status: 200,
            message: 'Here is some data'
        });

    });

    module.exports = Router;

})();
