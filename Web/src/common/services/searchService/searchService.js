/**
 * Integration with the BigBluster API (aka the /Server Sails.js project)
 * Awesomeness shall happen here!...
 */
angular.module('amdb.services.search',
    [
        'amdb.models.SearchResult',
        'amdb.constants',
        'amdb.config'
    ])
    .factory('searchService', function ($q, $http, $log, END_POINTS, ENVIRONMENT, SearchResult) {
        var apiRoot = ENVIRONMENT.API_ROOT;
        var searchUrl = END_POINTS.search.byActorOrMovie;

        /**
         * Searches AMDB movies and actors for the search string specified
         * @param searchString
         */
        var searchByActorOrMovie = function(searchString) {
            var url = apiRoot + searchUrl + '/' + searchString;
            var deferred = $q.defer();

            $http({
                method: 'GET',
                url: url,
                cache: false
            })
                .success(function(dto) {
                    // Transform DTO to model
                    var searchResult = new SearchResult();
                    searchResult.fromDTO(dto);

                    // Pass to the deferred
                    deferred.resolve(searchResult);
                })
                .error(function(data, status, headers, config) {
                    deferred.reject('Oh noes!');
                });


            return deferred;
        };

        return {
            searchByActorOrMovie: searchByActorOrMovie
        };
    })
;