angular.module('amdb.models.SearchResult', [
    'amdb.models.Movie',
    'amdb.models.Person'
])
    .factory('SearchResult', function(Movie, Person) {

        /**
         * The SearchResult model constructor
         * @constructor
         */
        var SearchResult = function() {
            this.searchText = '';
            this.persons = [];
            this.movies = [];
        };

        /**
         * Transforms a Server API SearchResultDTO to our Search Model
         * @param dto
         */
        SearchResult.prototype.fromDTO = function(dto) {
            var self = this;
            this.searchText = dto.searchText;

            // Iterate through array of movies from DTO
            _.each(dto.movieDtos, function(movieDto){
                var movie = new Movie();
                movie.fromDTO(movieDto);
                self.movies.push(movieDto);
            });

            // Iterate through array of persons from DTO
            _.each(dto.personDtos, function(personDto){
                var person = new Person();
                person.fromDTO(personDto);
                self.persons.push(person);
            });
        };

        return SearchResult;
    });