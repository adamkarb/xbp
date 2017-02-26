'use strict';

var AuthFilter = {

    validateCookie: function(req, res, next) {

        var cookie = req.cookies.auth;

        if (!cookie) { return res.redirect('/login'); }

        req._token = cookie;
        next();

    },

    validateToken: function(req, res, next) {

        var authHeader = req.headers.authorization;

        if (!authHeader) {

            res.status(401);
            var err = new Error('No Authorization provided');
            return next(err);

        }

        req._token = authHeader;
        next();

    }

};

module.exports = AuthFilter;
