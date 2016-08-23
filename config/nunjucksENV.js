'use strict';

(() => {

    const ROOT_DIR = process.env.ROOT_DIR;

    var nunjucks = require('nunjucks');
    var express = require('express');

    var pathToViews = `${ROOT_DIR}/public/static/views`;

    var env = new nunjucks.Environment( new nunjucks.FileSystemLoader( pathToViews ) );

    module.exports = env;

})();
