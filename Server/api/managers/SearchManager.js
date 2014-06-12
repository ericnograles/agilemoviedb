require('underscore');
var Promise = require('promise');
var MovieDTO = require('../dto/MovieDTO');
var PersonDTO = require('../dto/PersonDTO');
var SearchResultDTO = require('../dto/SearchResultDTO');

/**
 * Events are the abstractions for the ESports, Leagues, Series, Tournaments, and Matches constructs.
 * The SearchManager parses through these and spits out the appropriate DTO's.
 * @constructor
 */
function SearchManager() {

};

SearchManager.prototype.searchByMovie = function(movieText) {
    var movieDtos = [];
    return new Promise(
        function(fulfill, reject) {
            Movie.find(
                {
                    or: [
                        { like: { name: '%' + movieText + '%' }}
                    ]
                })
                .done(function(err, movies) {
                    // Find movie persons associated to the movie
                    _.each(movies, function(movie) {
                        var movieDto = new MovieDTO();
                        MoviePerson.find({ movieId: movie.id} )
                            .done(function(err, moviePersons) {
                                _.each(moviePersons, function(moviePerson) {
                                    if (moviePerson.type === 'Cast') {
                                        movie.cast.push(moviePerson);
                                    }
                                    else if (moviePerson.type === 'Crew') {
                                        movie.crew.push(moviePerson);
                                    }
                                });
                                // Add the DTO
                                movieDto.fromEntity(movie);
                                movieDtos.push(movieDto);
                            });
                    });
                    // Resolve the fully formed array
                    fulfill(movieDtos);
                });
        }
    );
};


SearchManager.prototype.searchByPersonText = function(personText) {
    var personDtos = [];
    return new Promise(
        function(fulfill, reject) {
            Person.find({
                or: [
                    { like: { firstName: '%' + personText + '%'} },
                    { like: { lastName: '%' + personText + '%'} }
                ]
            })
                .done(function(err, persons) {
                    _.each(persons, function(person) {
                        var personDto = new PersonDTO();
                        personDto.fromEntity(person);
                        personDtos.push(personDto);
                    });
                    fulfill(personDtos);
                });
        }
    );
};

SearchManager.prototype.searchByReleaseYear = function(releaseYear) {

};

module.exports = SearchManager;