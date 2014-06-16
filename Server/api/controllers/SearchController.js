var SearchManager = require('../managers/SearchManager');
var SearchResultDTO = require('../dto/SearchResultDTO');

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
   *    `/search/byActorOrMovie/{someSearchText}`
   */
   byActorOrMovie: function (req, res) {
      var searchManager = new SearchManager();
      var searchResultDto = new SearchResultDTO();

      // Search by movies, then by persons
      searchManager.searchByMovie(req.params.id).then(
          function(movieDtos) {
              searchResultDto.fromMovieDtos(movieDtos);
              searchManager.searchByPersonText(req.params.id).then(
                  function(personDtos) {
                      searchResultDto.fromPersonDtos(personDtos);
                      searchResultDto.searchText = req.params.id;
                      return res.json(searchResultDto);
                  },
                  function(error){
                      res.serverError(error);
                  }
              )
          },
          function(error) {
              res.serverError(error);
          }
      )
  },

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to SearchController)
   */
  _config: {}

  
};
