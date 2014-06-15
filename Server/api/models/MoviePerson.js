/**
 * The MoviePerson model
 */
var MoviePerson = {
    tableName: 'MoviePerson',
    attributes: {
        movieId: {
            type: 'INTEGER',
            required: true
        },
        personId: {
            type: 'INTEGER',
            required: true
        },
        role: {
            type: 'STRING',
            required: true
        },
        type: {
            type: 'STRING',
            required: true
        }
    }
};

module.exports = MoviePerson;

