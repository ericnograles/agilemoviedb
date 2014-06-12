var MovieDTO = require('../dto/MovieDTO');
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
        grossEarnings: 'DOUBLE',

        /**
         * Converts a Movie model instance to a MovieDTO
         */
        toDTO: function() {
            var dto = new MovieDTO();
            dto.id = this.id;
            dto.name = this.name;
            dto.releaseDate = this.releaseDate;
            dto.rating = this.rating;
            dto.grossEarnings = this.grossEarnings;
            return dto;
        }
    }
};

module.exports = Movie;

