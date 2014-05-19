angular.module('amdb.models.Movie', [])
    .factory('Movie', function() {

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
        };

        Movie.prototype.fromDTO = function(dto) {
            this.name = dto.name;
            this.rating = dto.rating;
            this.releaseDate = dto.releaseDate;
            this.createdBy = dto.createdBy;
            this.createdDate = dto.createdDate;
            this.updatedBy = dto.updatedBy;
            this.updatedDate = dto.updatedDate;
        };

        Movie.prototype.toDTO = function() {
            var dto = {
                name: this.name,
                rating: this.rating,
                releaseDate: this.releaseDate,
                createdBy: this.createdBy,
                createdDate: this.createdDate,
                updateBy: this.updatedBy,
                updatedDate: this.updatedDate
            };

            return dto;
        };

        return Movie;
    });