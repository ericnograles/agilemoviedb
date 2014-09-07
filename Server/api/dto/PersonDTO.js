/**
 * A DTO to encapsulate all outgoing errors from the API
 * @param User
 * @constructor
 */
function PersonDTO() {
    this.id = '';
    this.firstName = '';
    this.lastName = '';
    this.displayName = '';
    this.dateOfBirth = new Date();
    this.nationality = '';
    this.grossEarnings = 0.00;
}

PersonDTO.prototype.fromMoviePersonEntity = function(person) {
    this.id = person.id;
    this.firstName = person.firstName;
    this.lastName = person.lastName;
    this.displayName = person.lastName + ', ' + person.firstName;
    this.dateOfBirth = person.dateOfBirth;
    this.nationality = person.nationality;
    this.grossEarnings = person.grossEarnings;
};


module.exports = PersonDTO;