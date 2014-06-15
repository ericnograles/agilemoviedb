var _ = require('underscore');
var Promise = require('promise');
var MovieDTO = require('../dto/MovieDTO');
var PersonDTO = require('../dto/PersonDTO');
var SearchResultDTO = require('../dto/SearchResultDTO');
var CastCrewDTO = require('../dto/CastCrewDTO');

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
    var self = this;
    return new Promise(
        function (fulfill, reject) {
            Movie.find({ or: [ { like: { name: '%' + movieText + '%' }} ] })
                .done(function (err, movies) {
                    var movieIds = [];
                    if (err || _.isUndefined(movies)) {
                        reject(err || movies);
                    }
                    else {
                        _.each(movies, function (movie) {
                            var movieDto = new MovieDTO();
                            // Add the DTO
                            movieDto.fromEntity(movie);
                            movieDtos.push(movieDto);
                            movieIds.push(movie.movieId);
                        });

                        // Get cast and crew
                        MoviePerson.find({ movieId: movieIds })
                            .done(function(err, moviePersons) {
                                var personIds = [];
                                _.each(moviePersons, function(moviePerson) {
                                    personIds.push(moviePerson.personId);
                                    var castCrewDto = new CastCrewDTO();
                                    castCrewDto.personId = moviePerson.personId;
                                    castCrewDto.role = moviePerson.role;
                                    var movieDto = _.find(movieDtos, function(movieDto) { return movieDto.movieId === moviePerson.movieId });
                                    if (moviePerson.type === 'Cast') {
                                        movieDto.cast.push(castCrewDto);
                                    }
                                    else if (moviePerson.type === 'Crew') {
                                        movieDto.crew.push(castCrewDto);
                                    }
                                });

                                Person.find({ personId: personIds })
                                    .done(function(err, persons) {
                                        _.each(persons, function(person) {
                                            _.each(movieDtos, function(movieDto) {
                                                var matchedCast = _.find(movieDto.cast, function(castDto) { return castDto.personId === person.personId });
                                                var matchedCrew = _.find(movieDto.crew, function(crewDto) { return crewDto.personId === person.personId });
                                                if (!_.isUndefined(matchedCast)){
                                                    matchedCast.firstName = person.firstName;
                                                    matchedCast.lastName = person.lastName;
                                                    matchedCast.displayName = person.lastName + ', ' + person.firstName;
                                                }
                                                if (!_.isUndefined(matchedCrew)){
                                                    matchedCrew.firstName = person.firstName;
                                                    matchedCrew.lastName = person.lastName;
                                                    matchedCrew.displayName = person.lastName + ', ' + person.firstName;
                                                }
                                            });
                                        });
                                        fulfill(movieDtos);
                                    });
                            }
                        );
                    }
                }
            );
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