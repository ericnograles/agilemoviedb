// Dependent objects
var _ = require('underscore'),
    assert = require('assert'),
    MovieDTO = require('../../api/dto/MovieDTO'),
    PersonDTO = require('../../api/dto/PersonDTO'),
    CastCrewDTO = require('../../api/dto/CastCrewDTO'),
    proxyquire = require('proxyquire'),
    Promise = require('promise');

// Mock objects
var req, res,
    SearchController;

describe('SearchController', function(){

    /**
     * Shared objects
     */
    before(function() {
        // Mock req
        req = {
            params: {
                id: 'wedding'
            }
        };

        // Mock res
        // Create fields to hold the res responses and server errors
        res = {
            rawObject: null,
            jsonObject: null,
            errorObject: null,

            json: function(object) {
                this.rawObject = object;
                this.jsonObject = JSON.stringify(object);
                return object;
            },
            serverError: function(error) {
                this.errorObject = error;
                return error;
            }
        };
    });

    describe('on failure of getting data from SearchManager', function() {
        /**
         * Setup Mock Managers for failed calls
         */
        before(function(){

            // Mock SearchManager
            function SearchManager() {
                var searchByMovie = function(movieText) {
                    var then = function(cb, error) {
                        return error('Oh noes!')
                    };

                    return {
                        then: then
                    }
                };

                var searchByPersonText = function(personText) {
                    var then = function(cb, error) {
                        return error('Oh noes!');
                    };

                    return {
                        then: then
                    }
                };

                return {
                    searchByMovie: searchByMovie,
                    searchByPersonText: searchByPersonText
                };
            };

            // Setup the Controller
            SearchController = proxyquire('../../api/controllers/SearchController', { '../managers/SearchManager': SearchManager });
            res.rawObject = null;
            res.jsonObject = null;
            res.errorObject = null;
        });

        it('byActorOrMovie should report a server error', function() {
            SearchController.byActorOrMovie(req, res);
            assert(_.isNull(res.jsonObject));
            assert(!_.isNull(res.errorObject));
            assert(res.errorObject === 'Oh noes!');

        });

    });

    describe('on successfully getting data from SearchManager', function() {
        /**
         * Setup Mock Managers for successful calls
         */
        before(function(){

            // Mock SearchManager
            function SearchManager() {
                var searchByMovie = function(movieText) {
                    var then = function(cb) {
                        var movieDtos = [];
                        var movieDto = new MovieDTO();
                        movieDto.id = 1;
                        movieDto.name = 'Wedding Crashers';
                        movieDto.rating = 'R';
                        movieDto.grossEarnings = 1337000.00

                        var castCrewDto = new CastCrewDTO();
                        castCrewDto.firstName = 'Owen';
                        castCrewDto.lastName = 'Wilson';
                        castCrewDto.displayName = 'Wilson, Owen';
                        castCrewDto.role = 'John Beckwith';
                        castCrewDto.personId = 1;

                        movieDto.cast.push(castCrewDto);
                        movieDtos.push(movieDto);
                        return cb(movieDtos)
                    };

                    return {
                        then: then
                    }
                };

                var searchByPersonText = function(personText) {
                    var then = function(cb) {
                        var personDtos = [];
                        var personDto = new PersonDTO();
                        personDto.id = 1;
                        personDto.firstName = 'Owen';
                        personDto.lastName = 'Wilson';
                        personDto.displayName = 'Wilson, Owen';
                        personDto.dateOfBirth = new Date('1968-11-18');
                        personDto.nationality = 'American';
                        personDto.grossEarnings = 133700.00
                        personDtos.push(personDto);
                        return cb(personDtos);
                    };

                    return {
                        then: then
                    }
                };

                return {
                    searchByMovie: searchByMovie,
                    searchByPersonText: searchByPersonText
                };
            };

            // Setup the Controller
            SearchController = proxyquire('../../api/controllers/SearchController', { '../managers/SearchManager': SearchManager });
            res.rawObject = null;
            res.jsonObject = null;
            res.errorObject = null;
        });

        it('byActorOrMovie should return results', function(){
            SearchController.byActorOrMovie(req, res);
            assert(!_.isNull(res.rawObject));
            assert(!_.isNull(res.jsonObject));
            assert(_.isNull(res.errorObject));
            assert(res.rawObject.searchText === 'wedding');
            assert(res.rawObject.movieDtos.length === 1);
            assert(res.rawObject.personDtos.length === 1);
            assert(res.rawObject.personDtos[0].firstName === 'Owen', 'PersonDTO.firstName');
            assert(res.rawObject.personDtos[0].lastName === 'Wilson', 'PersonDTO.lastName');
            assert(res.rawObject.personDtos[0].displayName === 'Wilson, Owen', 'PersonDTO.displayName');
            assert(res.rawObject.personDtos[0].nationality === 'American', 'PersonDTO.nationality');
            assert(res.rawObject.personDtos[0].grossEarnings === 133700.00, 'PersonDTO.grossEarnings');
            assert(res.rawObject.movieDtos[0].name === 'Wedding Crashers', 'MovieDTO.name');
            assert(res.rawObject.movieDtos[0].rating === 'R', 'MovieDTO.rating')
            assert(res.rawObject.movieDtos[0].grossEarnings === 1337000.00, 'MovieDTO.grossEarnings');
            assert(res.rawObject.movieDtos[0].cast[0].lastName === 'Wilson', 'MovieDTO.cast.lastName');
            assert(res.rawObject.movieDtos[0].cast[0].firstName === 'Owen', 'MovieDTO.cast.firstName');
            assert(res.rawObject.movieDtos[0].cast[0].role === 'John Beckwith', 'MovieDTO.cast.role');
            assert(res.rawObject.movieDtos[0].cast[0].displayName === 'Wilson, Owen', 'MovieDTO.cast.lastName');
        });
    });
});
