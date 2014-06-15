var _ = require('underscore');
var Promise = require('promise');
var MovieDTO = require('../dto/MovieDTO');
var PersonDTO = require('../dto/PersonDTO');
var SearchResultDTO = require('../dto/SearchResultDTO');

/**
 * The Manager layer acts as an intermediary between controllers and the domain
 * For this pattern, the Manager layer simply spits back DTO's for the Controller
 */
function SearchManager() {

};

/**
 * Searches movies by a particular text
 * @param movieText
 * @returns {Promise}
 */
SearchManager.prototype.searchByMovie = function (movieText) {
    var movieDtos = [];
    return new Promise(
        function (fulfill, reject) {
            Movie.find(
                {
                    or: [
                        { like: { name: '%' + movieText + '%' }}
                    ]
                })
                .done(function (err, movies) {
                    if (err || _.isUndefined(movies)) {
                        reject(err || movies);
                    }
                    else {
                        // Find movie persons associated to the movie
                        _.each(movies, function (movie) {
                            var movieDto = new MovieDTO();
                            MoviePerson.find({ movieId: movie.id})
                                .done(function (err, moviePersons) {
                                    _.each(moviePersons, function (moviePerson) {
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
                    }
                });
        }
    );
};

/**
 * Searches Persons by a particular text
 * @param personText
 * @returns {Promise}
 */
SearchManager.prototype.searchByPersonText = function (personText) {
    var personDtos = [];
    return new Promise(
        function (fulfill, reject) {
            Person.find({
                or: [
                    { like: { firstName: '%' + personText + '%'} },
                    { like: { lastName: '%' + personText + '%'} }
                ]
            })
                .done(function (err, persons) {
                    if (err || _.isUndefined(persons)) {
                        reject(err || persons);
                    }
                    else {
                        _.each(persons, function (person) {
                            var personDto = new PersonDTO();
                            personDto.fromEntity(person);
                            personDtos.push(personDto);
                        });
                        fulfill(personDtos);
                    }
                });
        }
    );
};

module.exports = SearchManager;