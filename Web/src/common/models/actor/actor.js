angular.module('amdb.models.Actor', [])
    .factory('Actor', function() {

        /**
         * The Actor model constructor
         * @constructor
         */
        var Actor = function() {
            this.id = '';
            this.firstName = '';
            this.lastName = '';
            this.displayName = '';
            this.dateOfBirth = new Date();
            this.createdBy = '';
            this.createdDate = new Date();
            this.updatedBy = '';
            this.updatedDate = new Date();
        };

        Actor.prototype.fromDTO = function(dto) {
            this.id = dto.id;
            this.firstName = dto.firstName;
            this.lastName = dto.lastName;
            this.displayName = dto.LastName + ', ' + dto.FirstName;
            this.dateOfBirth = dto.dateOfBirth;
            this.createdBy = dto.createdBy;
            this.createdDate = dto.createdDate;
            this.updatedBy = dto.updatedBy;
            this.updatedDate = dto.updatedDate;
        };

        Actor.prototype.toDTO = function() {
            var dto = {
                id: this.id,
                firstName: this.firstName,
                lastName: this.lastName,
                dateOfBirth: this.dateOfBirth,
                createdBy: this.createdBy,
                createdDate: this.createdDate,
                updatedBy: this.updatedBy,
                updatedDate: this.updatedDate
            };

            return dto;
        };

        return Actor;
    });