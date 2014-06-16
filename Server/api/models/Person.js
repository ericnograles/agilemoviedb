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
        grossEarnings: 'FLOAT'
    }
};

module.exports = Person;

