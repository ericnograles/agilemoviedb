/**
 * The Person model
 */
var Person = {
    tableName: 'Person',
    attributes: {
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
        grossEarnings: 'DOUBLE'
    }
};

module.exports = Person;

