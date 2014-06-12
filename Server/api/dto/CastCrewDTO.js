function CastCrewDTO() {
    this.firstName = '';
    this.lastName = '';
    this.displayName = '';
    this.role = '';
}

CastCrewDTO.prototype.fromEntity = function(moviePerson) {
    this.firstName = moviePerson.firstName;
    this.lastName = moviePerson.lastName;
    this.displayName = moviePerson.lastName + ', ' + moviePerson.firstName;
    this.role = moviePerson.role;
};


module.exports = CastCrewDTO;