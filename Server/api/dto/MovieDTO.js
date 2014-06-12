require('underscore');
var CastCrewDTO = require('../dto/CastCrewDTO');

/**
 * A DTO to encapsulate all outgoing errors from the API
 * @param User
 * @constructor
 */
function MovieDTO() {
    this.id = '';
    this.name = '';
    this.releaseDate = new Date();
    this.rating = '';
    this.grossEarnings = 0.00;
    this.cast = [];
    this.crew = [];

}

MovieDTO.prototype.fromEntity = function(movie) {
    this.id = movie.id
    this.name = movie.name;
    this.releaseDate = movie.releaseDate;
    this.rating = movie.rating;
    this.grossEarnings = movie.grossEarnings;
    _.each(movie.cast, function(castMember){
        var castDto = new CastCrewDTO();
        castDto.fromEntity(castMember);
        this.cast.push(castDto);
    });

    _.each(movie.crew, function(crewMember){
        var crewDto = new CastCrewDTO();
        crewDto.fromEntity(crewMember);
        this.crew.push(crewDto);

    });
};


module.exports = MovieDTO;