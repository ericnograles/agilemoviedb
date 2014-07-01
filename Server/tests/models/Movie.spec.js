var MovieModel = require('../../api/models/Movie'),
    assert = require('assert'),
    _ = require('underscore'),
    Waterline = require('waterline'),
    SocketIOConstants = require('../../api/constants/SocketIOConstants'),
    diskAdapter = require('sails-disk'); // FYI, sails-memory doesn't seem to play well in a mock situation

var Movie, movie, movieCollection, sails;
var socketEvents = [];


/**
 * Unit tests for the Movie Model.  Intended only to test attribute methods, not Sails or Waterline functionality.
 */
describe('The Movie model', function () {

    /**
     * Create a "sham" model from sails-disk
     */
    before(function(done) {
        // Create a sails stub for socket.io
        sails = {
            io: {
                sockets: {
                    emit: function(event, data) {
                        socketEvents.push(event);
                        return;
                    }
                }
            }
        }
        global.sails = sails;

        // Create a model using sails-disk
        MovieModel.adapter = 'disk';
        Movie = Waterline.Collection.extend(MovieModel);
        new Movie({ adapters: { disk: diskAdapter }}, function(err, collection) {
            if (err) {
                done(err);
            }
            else {
                movieCollection = collection;
                collection.create({ movieId: '1', name: 'The Godfather', releaseDate: new Date(), rating: 'R'})
                    .done(function(err, mockMovie) {
                        if (err) {
                            done(err);
                        }
                        else {
                            movie = mockMovie;
                            done();
                        }
                    });
            }
        });
    });

    describe('attribute methods', function () {
        it('should produce unbiased criticism of the Godfather', function () {
            var criticism = movie.unbiasedCriticism();
            assert(criticism === 'PHENOMENAL!');
        });

        it('should have emitted a movie created event on the socket', function() {
            assert(_.contains(socketEvents, SocketIOConstants.EVENT_MOVIE_CREATED));
        });
    });

    /**
     * Delete everything from sails-disk.  A clean HD is a happy HD.
     */
    after(function(done) {
        movieCollection.destroy().done(function(err) {
            if (err) {
                done(err);
            }
            else {
                done();
            }
        });
    });
});