/**
 * The DTO for a MoviePerson domain model
 * @constructor
 */
function MoviePersonDTO() {
    // MoviePerson model details
    this.movieId = '';
    this.personId = '';
    this.role = '';
    this.type = '';

    // Person Model details
    this.firstName = '';
    this.lastName = '';
    this.displayName = '';
    this.dateOfBirth = new Date();
    this.nationality = '';
    this.grossEarnings = 0.00;
}

MoviePersonDTO.prototype.fromMoviePersonEntity = function(moviePerson) {
    this.movieId = moviePerson.movieId;
    this.personId = moviePerson.personId;
    this.role = moviePerson.role;
    this.type = moviePerson.type;
};

MoviePersonDTO.prototype.fromPersonEntity = function(person) {
    this.firstName = person.firstName;
    this.lastName = person.lastName;
    this.displayName = person.lastName + ', ' + person.firstName;
    this.dateOfBirth = person.dateOfBirth;
    this.nationality = person.nationality;
    this.grossEarnings = person.grossEarnings;
};


module.exports = MoviePersonDTO;