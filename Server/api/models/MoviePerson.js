/**
 * The MoviePerson model
 */
var MoviePerson = {
    tableName: 'MoviePerson',
    attributes: {
        movieId: {
            type: 'STRING',
            required: true
        },
        personId: {
            type: 'STRING',
            required: true
        },
        role: {
            type: 'DATE',
            required: true
        },
        type: {
            type: 'STRING',
            required: true
        }
    }
};

module.exports = MoviePerson;

