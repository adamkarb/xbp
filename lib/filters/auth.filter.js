'use strict';

var AuthFilter = {

    validateCookie: function(req, res, next) {

        var cookie = req.cookies.fh_super;

        if (!cookie) { return res.redirect('/login'); }

        req._fanhero_token = `Bearer ${cookie}`;
        next();

    },

    validateToken: function(req, res, next) {

        var authHeader = req.get('Authorization');

        if (!authHeader || !isJWT(authHeader)) {

            res.status(401);
            var err = new Error('No Authorization provided');
            return next(err);

        }

        req._fanhero_token = `Bearer ${authHeader}`;
        next();

    }

};

module.exports = AuthFilter;

