'use strict';

var schema = require('schemajs');
var flatten = require('flat');
var unflatten = flatten.unflatten;

schema.properties.hasLength = function(arr) { return arr.length > 0 };

var SchemaFilter = {

    validateSample: function(req, res, next) {

        var flatObj = flatten(req.body);

        var model = schema.create({

            'name':                    { type: 'string', required: true, error: { required: 'No name was provided.' } },
            'email':                   { type: 'string', filters:'lowercase', required: true, error: { required: 'No email was provided.' } },
            'password':                { type: 'string', required: true, error: { required: 'No password was provided' } },
            'settings.accountType':    { type: 'string', required: true,  error: { required: 'No accountType was provided.' } },
            'settings.preferences':    { type: 'string', required: true,  error: { required: 'No preferences were provided.' } }

        });

        var test = model.validate(flatObj);

        if (!test.valid) {

            res.status(400);
            var err = getError(test.errors);
            return next(err);

        }

        var passTest = unflatten(test.data);

        req._data = passTest;
        next();

    },

};

module.exports = SchemaFilter;

function getError(errorObj) {

    var keys = Object.keys(errorObj);

    var err = new Error(errorObj[ keys[0] ]);

    return err;

}
