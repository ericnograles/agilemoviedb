// Injected objects
var _ = require('lodash'),
    assert = require('assert'),
    SearchManager = require('../../api/managers/SearchManager.js'),
    MovieData = require('../mockData/SearchManager/Movie.json'),
    MoviePersonData = require('../mockData/SearchManager/MoviePerson.json'),
    PersonData = require('../mockData/SearchManager/Person.json');

// Mock domain objects
var mockMovie,
    mockMoviePerson,
    mockPerson,
    searchManager;

describe('SearchManager', function(){

    /**
     * Setup mock models
     */
    before(function(){
        // Mocked Movie model
        mockMovie =  {
            find: function(args) {
                {
                    var done = function(cb) {
                        return cb(null, MovieData);
                    };

                    return {
                        done: done
                    };
                }
            }
        };

        // Mocked MoviePersonModel
        mockMoviePerson =  {
            find: function(args) {
                {
                    var done = function(cb) {
                        return cb(null, MoviePersonData);
                    };

                    return {
                        done: done
                    };
                }
            }
        };

        // Mocked Person Data
        mockPerson =  {
            find: function(args) {
                {
                    var done = function(cb) {
                        return cb(null, PersonData);
                    };

                    return {
                        done: done
                    };
                }
            }
        };

        // Set expected globals
        global.Movie = mockMovie;
        global.MoviePerson = mockMoviePerson;
        global.Person = mockPerson;

        // Setup the SearchManager
        searchManager = new SearchManager();

    });

    describe('searchByMovie', function() {
        it('Should get movies with cast and crew', function(done){
            searchManager.searchByMovie('Godfather')
                .then(
                    function(movieDtos) {

                        // Assert that an array of movieDto's was created
                        assert(movieDtos.length > 0);
                        assert(movieDtos[0].name === MovieData[0].name, 'Invalid name');
                        assert(movieDtos[0].movieId === MovieData[0].movieId, 'Invalid movieId');
                        assert(movieDtos[0].releaseDate === MovieData[0].releaseDate, 'Invalid releaseDate');
                        assert(movieDtos[0].rating === MovieData[0].rating, 'Invalid rating');
                        assert(movieDtos[0].grossEarnings === MovieData[0].grossEarnings, 'Invalid grossEarnings');
                        assert(movieDtos[0].cast.length === 2, 'Wrong number of cast members');
                        done();
                    },
                    function(error) {
                        done('General error');
                    }
                )
                .catch(done); // Promise has its own error handler so we need to pass the done function here

        });
    });
});

// NOTE: To run the unit tests, go to the command line of /Server and execute "grunt mochaTest"