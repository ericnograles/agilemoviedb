/**
 * The MovieUserComment model
 */
var MovieUserComment = {
    tableName: 'MovieUserComment',
    attributes: {
        movieId: {
            type: 'STRING',
            required: true
        },
        userId: {
            type: 'STRING',
            required: true
        },
        comment: {
            type: 'STRING',
            required: true
        },
        commentDate: {
            type: 'DATE',
            required: true
        }
    }
};

module.exports = MovieUserComment;