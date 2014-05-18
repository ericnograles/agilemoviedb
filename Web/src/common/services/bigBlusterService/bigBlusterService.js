/**
 * Integration with the BigBluster API (aka the /Server Sails.js project)
 * Awesomeness shall happen here!...
 */
angular.module('bigBluster.externalSystems.bigBlusterService',
    [
        'ngResource',
        'ngRoute',
        'bigBluster.externalSystems.config'
    ])
    .factory('BigBlusterService', function ($resource, $q, $http, $log, ENVIRONMENT) {
        var apiAddress = ENVIRONMENT.BIG_BLUSTER_API;
        return {
            getUserProfileData: function (userName, platform, successCallback) {
                $log.info('Starting getUserProfileData');

                // Call out the BB service to get the user profile data
                return $http.get(apiAddress + 'bf4Stats', { userName: userName, platform: platform})
                    .success(successCallback);
            },

            login: function (userName, password, successCallback) {
                $log.info('Starting login');
                return $http.post(apiAddress + 'authenticate', { userName: userName, password: password})
                    .success(successCallback);
            },

            createUser: function (userObject, successCallback) {
                $log.info('Starting createUser');
                // Translate a standard userObject to a bigBlusterUser
                var bigBlusterUser = {
                    userName: userObject.email,
                    password: userObject.password,
                    emailAddress: userObject.email,
                    firstName: userObject.firstName,
                    lastName: userObject.lastName
                };

                return $http.post(apiAddress + 'create', bigBlusterUser).success(successCallback);
            }
        };
    })
;