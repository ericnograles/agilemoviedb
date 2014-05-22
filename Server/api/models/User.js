var bcrypt = require('bcrypt');

/**
 * The User model
 */
var User = {
    tableName: 'User',
    attributes: {
        userName: {
            type: 'STRING',
            required: true
        },
        password: {
            type: 'STRING',
            required: true
        },
        emailAddress: {
            type: 'STRING',
            required: true
        },
        dateOfBirth: {
            type: 'DATE',
            required: true
        },
        joinDate: {
            type: 'DATE',
            required: true
        }
    },

    // Lifecycle callbacks
    beforeCreate: function (values, next) {
        bcrypt.hash(values.password, 10, function (err, hash) {
            if (err) return next(err);
            values.password = hash;
            next();
        });
    }
};

module.exports = User;

