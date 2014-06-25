angular.module('amdb.models.Person', [])
    .factory('Person', function() {

        /**
         * The Person model constructor
         * @constructor
         */
        var Person = function() {
            this.firstName = '';
            this.lastName = '';
            this.displayName = '';
            this.nationality = '';
            this.grossEarnings = '';
            this.dateOfBirth = new Date();
        };

        /**
         * Transforms a Server API PersonDTO to our Person Model
         * @param dto
         */
        Person.prototype.fromDTO = function(dto) {
            this.firstName = dto.firstName;
            this.lastName = dto.lastName;
            this.displayName = dto.displayName;
            this.nationality = dto.nationality;
            this.grossEarnings = dto.grossEarnings;
            this.dateOfBirth = dto.dateOfBirth;
        };


        return Person;
    });