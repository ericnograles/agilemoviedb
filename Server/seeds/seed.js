/**
 * This Node.js stand-alone file will seed the database using our JSON's
 * and the Waterline ORM which Sails.js uses
 * @type {exports}
 * @private
 */
var _ = require('lodash'),
    Waterline = require('waterline'),
    MovieModel = require('../api/models/Movie'),
    MovieData = require('./Movie.json'),
    adaptersConfig = require('../config/adapters'),
    mongoAdapter = require('sails-mongo'),
    Promise = require('promise');

// Match our config
var mongoUrl = 'mongodb://'
    + adaptersConfig.adapters.mongo.user + ':' + adaptersConfig.adapters.mongo.password +
    '@' + adaptersConfig.adapters.mongo.host + ':' + adaptersConfig.adapters.mongo.port + '/' +
    adaptersConfig.adapters.mongo.database;
mongoAdapter.database = adaptersConfig.adapters.mongo.database;
mongoAdapter.host = adaptersConfig.adapters.mongo.host;
mongoAdapter.port = adaptersConfig.adapters.mongo.port;
mongoAdapter.user = adaptersConfig.adapters.mongo.user;
mongoAdapter.password = adaptersConfig.adapters.mongo.password;
mongoAdapter.config = { url: mongoUrl };

/**
 * Seeds movies in a promise-y way
 */
var seedMovies = function() {
    return new Promise(
        function(fulfill, reject) {
            // Seed Movie Data from our JSON
            MovieModel.adapter = 'mongo';
            var Movie = Waterline.Collection.extend(MovieModel);

            new Movie({ adapters: { mongo: mongoAdapter }}, function(err, collection) {
                if (err){
                    console.log('There was a problem seeding Movies.')
                }
                else {
                    // First nuke all existing movies
                    collection.destroy().exec(function(err, deletedMovies) {
                        console.log('Successfully deleted Movies!');
                        collection.createEach(MovieData, function(err, models) {
                            if (err || _.isUndefined(models)) {
                                reject();
                            }
                            else {
                                console.log('Successfully inserted Movies');
                                // Spit back the literal object representations of the movies
                                // As further processes may need attributes as a reference back to the store
                                collection.find().exec(function(err, existingMovies) {
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

// Node.js: fulfilling more promises than all politicians combined in history
seedMovies()
    .then(
        function(movies) {
            // TODO: Chain the next bits here.
            console.log('Seeding process complete!');
        },
        function(err) {
            console.log('Seeding process had an issue');
        }
    );


