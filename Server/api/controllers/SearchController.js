/**
 * SearchController
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
   *    `/search/byActorOrMovie`
   */
   byActorOrMovie: function (req, res) {
    
    // Send a JSON response
    return res.json({
      hello: 'byActorOrMovie'
    });
  },


  /**
   * Action blueprints:
   *    `/search/byMovie`
   */
   byMovie: function (req, res) {
    
    // Send a JSON response
    return res.json({
      hello: 'byMovie'
    });
  },


  /**
   * Action blueprints:
   *    `/search/byActor`
   */
   byActor: function (req, res) {
    
    // Send a JSON response
    return res.json({
      hello: 'byActor'
    });
  },


  /**
   * Action blueprints:
   *    `/search/byReleaseYear`
   */
   byReleaseYear: function (req, res) {
    
    // Send a JSON response
    return res.json({
      hello: 'byReleaseYear'
    });
  },




  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to SearchController)
   */
  _config: {}

  
};
