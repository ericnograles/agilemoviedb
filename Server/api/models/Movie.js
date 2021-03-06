var SocketIOConstants = require('../constants/SocketIOConstants');

/**
 * The Movie model
 */
var Movie = {
    tableName: 'Movie',
    attributes: {
        movieId: {
            type: 'INTEGER',
            required: true,
            unique: true
        },
        name: {
            type: 'STRING',
            required: true
        },
        releaseDate: {
            type: 'DATE',
            required: true
        },
        rating: {
            type: 'STRING',
            required: true
        },
        grossEarnings: 'FLOAT',

        // Instance methods
        unbiasedCriticism: function() {
            if(this.name.toLowerCase().indexOf('godfather') > -1) {
                return 'PHENOMENAL!';
            }
            else {
                return 'It stinks!';
            }
        }
    },

    // Lifecycle callbacks
    afterCreate: function(newRecord, next) {
        sails.io.sockets.emit(SocketIOConstants.EVENT_MOVIE_CREATED, newRecord);
        next();
    },

    afterUpdate: function(updatedRecord, next) {
        sails.io.sockets.emit(SocketIOConstants.EVENT_MOVIE_UPDATED, updatedRecord);
        next();
    }
};

module.exports = Movie;

