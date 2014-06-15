var PersonDTO = require('../dto/PersonDTO');
/**
 * The Person model
 */
var Person = {
    tableName: 'Person',
    attributes: {
        personId: {
            type: 'INTEGER',
            required: true,
            unique: true
        },
        firstName: {
            type: 'STRING',
            required: true
        },
        lastName: {
            type: 'STRING',
            required: true
        },
        dateOfBirth: {
            type: 'DATE',
            required: true
        },
        nationality: 'STRING',
        grossEarnings: 'FLOAT',

        /**
         * Convert an instance of this model to a DTO
         */
        toDTO: function() {
            var dto = new PersonDTO();
            dto.personId = this.personId;
            dto.firstName = this.firstName;
            dto.lastName = this.lastName;
            dto.dateOfBirth = this.dateOfBirth;
            dto.nationality = this.nationality;
            dto.grossEarnings = this.grossEarnings;
            return dto;
        }
    }
};

module.exports = Person;

