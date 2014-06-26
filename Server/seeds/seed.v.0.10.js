/**
 * This Node.js stand-alone file will seed the database using our JSON's
 * and the Waterline ORM which Sails.js uses
 * @type {exports}
 * @private
 */
var _ = require('lodash'),
    Waterline = require('waterline'),
    adaptersConfig = require('../config/adapters'),
    mongoAdapter = require('sails-mongo'),
    Promise = require('promise');

// Match our config
var mongoUrl = 'mongodb://' +
    adaptersConfig.adapters.mongo.user + ':' + adaptersConfig.adapters.mongo.password + '@' +
    adaptersConfig.adapters.mongo.host + ':' + adaptersConfig.adapters.mongo.port + '/' +
    adaptersConfig.adapters.mongo.database;

mongoAdapter.database = adaptersConfig.adapters.mongo.database;
mongoAdapter.host = adaptersConfig.adapters.mongo.host;
mongoAdapter.port = adaptersConfig.adapters.mongo.port;
mongoAdapter.user = adaptersConfig.adapters.mongo.user;
mongoAdapter.password = adaptersConfig.adapters.mongo.password;
mongoAdapter.config = { url: mongoUrl };

// Setup Waterline
var adapters = {
    'sails-mongo' : require('sails-mongo')
};


/**
 * Seeds movies in a promise-y way
 */
var seedMovie = function() {
    var MovieModel = require('../api/models/Movie'),
        MovieData = require('./Movie.json');

    return new Promise(
        function(fulfill, reject) {
            // Seed Movie Data from our JSON
            MovieModel.adapter = 'mongo';
            var Movie = Waterline.Collection.extend(MovieModel);

            // Invoke Waterline
            new Movie({ adapters: { mongo: mongoAdapter }}, function(err, collection) {
                if (err){
                    console.log('There was a problem initializing the Movie collection.');
                }
                else {
                    // First nuke all existing movies
                    collection.destroy().done(function(err, deletedMovies) {
                        console.log('Successfully deleted Movies!');
                        collection.createEach(MovieData, function(err, models) {
                            if (err || _.isUndefined(models)) {
                                console.log('Could not create Movie collection!');
                                fulfill();
                            }
                            else {
                                console.log('Successfully inserted Movies');
                                collection.find().done(function(err, existingMovies) {
                                    fulfill(existingMovies);
                                });
                            }
                        });
                    });
                }
            });
        }
    );
};

/**
 * Seeds Person collection using Person.json
 * @returns {Promise}
 */
var seedPerson = function() {
    var PersonModel = require('../api/models/Person');
    var PersonData = require('./Person.json');

    return new Promise(
        function(fulfill, reject) {
            PersonModel.adapter = 'mongo';
            var Person = Waterline.Collection.extend(PersonModel);

            new Person({ adapters: { mongo: mongoAdapter }}, function(err, collection) {
                if (err) {
                    console.log('There was a problem initializing the Person collection.');
                }
                else {
                    // First nuke all existing Persons
                    collection.destroy().done(function(err, deletedPersons){
                        console.log('Successfully deleted Persons!');
                        collection.createEach(PersonData, function(err, models){
                            if (err || _.isUndefined(models)) {
                                console.log('Could not create Person collection!');
                                fulfill();
                            }
                            else {
                                console.log('Successfully inserted Persons!');
                                collection.find().done(function(err, existingPersons) {
                                    fulfill(existingPersons);
                                });
                            }
                        });
                    });
                }
            });
        }
    );
};

/**
 * Seeds MoviePerson collection using MoviePerson.json
 * @returns {Promise}
 */
var seedMoviePerson = function() {
    var MoviePersonModel = require('../api/models/MoviePerson');
    var MoviePersonData = require('./MoviePerson.json');
    return new Promise(
        function(fulfill, reject) {
            MoviePersonModel.adapter = 'mongo';
            var MoviePerson = Waterline.Collection.extend(MoviePersonModel);

            new MoviePerson({ adapters: { mongo: mongoAdapter }}, function(err, collection) {
                if (err) {
                    console.log('There was a problem initializing the MoviePerson collection.');
                }
                else {
                    // First nuke all existing MoviePersons
                    collection.destroy().done(function(err, deletedMoviePersons){
                        console.log('Successfully deleted MoviePersons!');
                        collection.createEach(MoviePersonData, function(err, models){
                            if (err || _.isUndefined(models)) {
                                console.log('Could not create MoviePerson collection!');
                                fulfill();
                            }
                            else {
                                console.log('Successfully inserted MoviePersons!');
                                collection.find().done(function(err, existingMoviePersons) {
                                    fulfill(existingMoviePersons);
                                });
                            }
                        });
                    });
                }
            });
        }
    );
};

// Node.js: fulfilling more promises than all politicians combined in history
seedMovie()
    .then(function(movies) {
        seedPerson().then(function(persons) {
            seedMoviePerson().then(function(moviePersons){
                console.log('Seeding process complete!');
                process.exit();
            });
        });
    });
