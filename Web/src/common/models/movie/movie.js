angular.module('amdb.models.Movie', [
    'amdb.models.CastCrew'
])
    .factory('Movie', function(CastCrew) {

        /**
         * The Movie model constructor
         * @constructor
         */
        var Movie = function() {
            this.name = '';
            this.rating = '';
            this.releaseDate = new Date();
            this.createdBy = '';
            this.createdDate = new Date();
            this.updatedBy = '';
            this.updatedDate = new Date();
            this.cast = [];
            this.crew = [];
        };

        /**
         * Transforms a Server API MovieDTO to our Movie Model
         * @param dto
         */
        Movie.prototype.fromDTO = function(dto) {
            var self = this;
            this.name = dto.name;
            this.rating = dto.rating;
            this.releaseDate = dto.releaseDate;
            this.createdBy = dto.createdBy;
            this.createdDate = dto.createdDate;
            this.updatedBy = dto.updatedBy;
            this.updatedDate = dto.updatedDate;

            // Iterate through Cast
            _.each(dto.cast, function(castMember){
                var castCrew = new CastCrew();
                castCrew.fromDTO(castMember);
                self.cast.push(castCrew);
            });

            _.each(dto.crew, function(crewMember){
                var castCrew = new CastCrew();
                castCrew.fromDTO(crewMember);
                self.crew.push(castCrew);
            });
        };


        return Movie;
    });