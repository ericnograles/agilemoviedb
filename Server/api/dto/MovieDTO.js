/**
 * The DTO for a Movie domain model
 * @constructor
 */
function MovieDTO() {
    this.id = '';
    this.movieId = '';
    this.name = '';
    this.releaseDate = new Date();
    this.rating = '';
    this.grossEarnings = 0.00;
    this.cast = [];
    this.crew = [];
}

MovieDTO.prototype.fromMoviePersonEntity = function(movie) {
    this.id = movie.id;
    this.movieId = movie.movieId;
    this.name = movie.name;
    this.releaseDate = movie.releaseDate;
    this.rating = movie.rating;
    this.grossEarnings = movie.grossEarnings;
};


module.exports = MovieDTO;