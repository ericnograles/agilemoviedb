angular.module('amdb', [
        'templates-app',
        'templates-common',
        'ui.router',
        'amdb.home'
    ])

    .factory('tokenInterceptor', function ($rootScope, $q, $window) {
        return {
            request: function (config) {
                config.headers = config.headers || {};
                if ($window.sessionStorage.token) {
                    config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
                }
                return config;
            },
            response: function (response) {
                if (response.status === 401) {
                }
                return response || $q.when(response);
            }
        };
    })

    .config(function($stateProvider, $urlRouterProvider, $httpProvider) {
        $urlRouterProvider
            .rule(function ($injector, $location) {
                // Only good guys are allowed.  No IE support.
                if ((/Chrome/.test(navigator.userAgent) || /Safari/.test(navigator.userAgent) || /Firefox/.test(navigator.userAgent)) === false) {
                    return '/evil';
                }
            })
            .otherwise('/home');

        $httpProvider.interceptors.push('tokenInterceptor');
        //delete $httpProvider.defaults.headers.common["X-Requested-With"];
    })

    .run(function run() {
    })

    .controller('AppCtrl', function AppCtrl($scope, $window, $location, $state) {
        $scope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            // Only good guys are allowed.  No IE support.
            if ((/Chrome/.test(navigator.userAgent) || /Safari/.test(navigator.userAgent) || /Firefox/.test(navigator.userAgent)) === false) {
                if (toState.name != 'evil') {
                    event.preventDefault();
                    $state.transitionTo('evil');
                }
            }
        });

        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            if (angular.isDefined(toState.data.pageTitle)) {
                $scope.pageTitle = toState.data.pageTitle + ' | AMDB';
                $scope.loggedIn = $window.sessionStorage.loggedIn;
            }
        });
    })

;

