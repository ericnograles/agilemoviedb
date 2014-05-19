/**
 * Integration with the BigBluster API (aka the /Server Sails.js project)
 * Awesomeness shall happen here!...
 */
angular.module('amdb.services.searchService',
    [
        'amdb.constants',
        'amdb.config'
    ])
    .factory('SearchService', function ($q, $http, $log, END_POINTS, ENVIRONMENT) {
        var apiRoot = ENVIRONMENT.API_ROOT;
        var searchUrl = END_POINTS.search.searchAMDB;

        /**
         * Searches AMDB movies and actors for the search string specified
         * @param searchString
         */
        var searchAMDB = function(searchString) {
            var url = apiRoot + searchUrl + searchString;
            var deferred = $q.defer();

            $http({
                method: 'GET',
                url: url,
                cache: false
            })
                .success(function(dto) {
                    // Transform DTO to model

                    // Pass to the deferred

                })
                .error(function(data, status, headers, config) {

                });


            return deferred;
        };

        return {
            searchAMDB: searchAMDB
        };
    })
;