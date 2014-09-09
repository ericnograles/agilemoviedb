var _ = require('underscore'),
    async = require('async'),
    Promise = require('promise'),
    MovieDTO = require('../dto/MovieDTO'),
    PersonDTO = require('../dto/PersonDTO'),
    CastCrewDTO = require('../dto/CastCrewDTO'),
    MoviePersonDTO = require('../dto/MoviePersonDTO');


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
    return new Promise(
        function (fulfill, reject) {
            async.waterfall([
                    // Get movies
                    function(callback) {
                        var movieDtos = [];
                        Movie.find({ or: [ { like: { name: '%' + movieText + '%' }} ] })
                            .done(function (err, movies) {
                                _.each(movies, function (movie) {
                                    var movieDto = new MovieDTO();
                                    // Add the DTO
                                    movieDto.fromMovieEntity(movie);
                                    movieDtos.push(movieDto);
                                });

                                callback(err, movieDtos);
                            });
                    },
                    // Find all people associated with the movies
                    function(movieDtos, callback) {
                        var movieIds = [];
                        var moviePersonDtos = [];
                        _.each(movieDtos, function(movieDto) {
                            movieIds.push(movieDto.id);
                        });

                        MoviePerson.find({ movieId: movieIds })
                            .done(function(err, moviePersons) {
                                _.each(moviePersons, function(moviePerson){
                                    var moviePersonDto = new MoviePersonDTO();
                                    moviePersonDto.fromMoviePersonEntity(moviePerson);
                                    moviePersonDtos.push(moviePersonDto);
                                });

                                callback(err, movieDtos, moviePersonDtos);
                            });
                    },
                    // Get person details -- firstName, lastName, etc.
                    function(movieDtos, moviePersonDtos, callback) {
                        var personIds = [];
                        _.each(moviePersonDtos, function(moviePerson) {
                            personIds.push(moviePerson.personId);
                        });

                        Person.find({ personId: personIds })
                            .done(function(err, persons) {
                                _.each(persons, function(person) {
                                    // Complete the MoviePersonDTO
                                    var matchedMoviePersonDtos = _.filter(moviePersonDtos, function(moviePersonDto) {
                                        return moviePersonDto.personId === person.id;
                                    });
                                    _.each(matchedMoviePersonDtos, function(matchedMoviePersonDto){
                                        matchedMoviePersonDto.fromPersonEntity(person);
                                    });
                                });
                                callback(err, movieDtos, moviePersonDtos);
                            });
                    },
                    // Assign movie persons to movies
                    function(movieDtos, moviePersonDtos, callback) {
                        _.each(moviePersonDtos, function(moviePersonDto){
                            var matchedMovieDtos = _.filter(movieDtos, function(movieDto) {
                                return movieDto.id === moviePersonDto.movieId;
                            });
                            _.each(matchedMovieDtos, function(matchedMovieDto){
                                if (moviePersonDto.type === 'Cast'){
                                    matchedMovieDto.cast.push(moviePersonDto);
                                }
                                else {
                                    matchedMovieDto.crew.push(moviePersonDto);
                                }
                            });
                        });
                        callback(null, movieDtos);
                    }
                ],
            function(err, movieDtos){
                if (err) {
                    reject(err);
                }
                else {
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
    var personTextLower = personText.toLowerCase();
    return new Promise(
        function (fulfill, reject) {
            Person.find()
                .done(function (err, persons) {
                    if (err || _.isUndefined(persons)) {
                        reject(err || persons);
                    }
                    else {
                        _.each(persons, function (person) {
                            // Find a match on firstName, lastName, or a concat of both
                            // No native way to do this in Waterline (yet)
                            var fullName = person.firstName + ' ' + person.lastName;
                            if (person.firstName.toLowerCase().indexOf(personTextLower) > -1 ||
                                person.lastName.toLowerCase().indexOf(personTextLower) > -1 ||
                                fullName.toLowerCase().indexOf(personTextLower) > -1
                                ) {
                                var personDto = new PersonDTO();
                                personDto.fromMoviePersonEntity(person);
                                personDtos.push(personDto);
                            }
                        });
                        fulfill(personDtos);
                    }
                });
        }
    );
};

module.exports = SearchManager;