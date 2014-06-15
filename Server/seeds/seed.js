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
    diskAdapter = require('sails-disk');

// Match our config
mongoAdapter.database = adaptersConfig.adapters.mongo.database;
mongoAdapter.host = adaptersConfig.adapters.mongo.host;
mongoAdapter.port = adaptersConfig.adapters.mongo.port;
mongoAdapter.user = '';
mongoAdapter.password = '';
mongoAdapter.config = { url: 'mongodb://127.0.0.1:27017/AMDB' };


// Seed Movie Data from our JSON
MovieModel.adapter = 'mongo';
var Movie = Waterline.Collection.extend(MovieModel);
new Movie({ adapters: { mongo: mongoAdapter }}, function(err, collection) {
    if (err){
        throw(err);
    }
    else {
        // First nuke all existing movies
        collection.destroy().exec(function(err, deletedMovies) {
            console.log('Successfully deleted Movies!');
            collection.createEach(MovieData, function(err, models) {
                if (err || _.isUndefined(models)) {
                    console.log(err);
                }
                else {
                    console.log('Successfully seeded Movies!');
                }
            });
        });


    }
});
