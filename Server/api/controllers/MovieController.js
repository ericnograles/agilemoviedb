/**
 * MovieController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
    
  
  /**
   * Action blueprints:
   *    `/movie/create`
   */
   create: function (req, res) {
    // TODO: Actually move off to a MovieManager
    var movieDto = req.body;
    Movie.create(movieDto).done(function(err, movie){
        if (err) {
            res.serverError(err);
        }
        else {
            return res.json(movie)
        }
    });
  },




  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to MovieController)
   */
  _config: {}

  
};
