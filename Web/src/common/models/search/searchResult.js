angular.module('amdb.models.SearchResult', [])
    .factory('SearchResult', function() {

        /**
         * The SearchResult model constructor
         * @constructor
         */
        var SearchResult = function() {
            this.actors = [];
            this.movies = [];
        };

        SearchResult.prototype.fromDTO = function(dto) {
            // Iterate through array of actors from DTO

            // Iterate through array of movies from DTO
        };

        return SearchResult;
    });