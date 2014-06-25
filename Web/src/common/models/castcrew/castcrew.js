angular.module('amdb.models.CastCrew', [])
    .factory('CastCrew', function() {

        /**
         * The CastCrew model constructor
         * @constructor
         */
        var CastCrew = function() {
            this.firstName = '';
            this.lastName = '';
            this.displayName = '';
            this.role = '';
        };

        /**
         * Transforms a Server API CastCrewDTO to our CastCrew Model
         * @param dto
         */
        CastCrew.prototype.fromDTO = function(dto) {
            this.firstName = dto.firstName;
            this.lastName = dto.lastName;
            this.displayName = dto.displayName;
            this.role = dto.role;
        };


        return CastCrew;
    });