/**
 * The Movie model
 */
var Movie = {
    tableName: 'Movie',
    attributes: {
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
        grossEarnings: 'DOUBLE'
    }
};

module.exports = Movie;

