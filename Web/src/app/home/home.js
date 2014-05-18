angular.module('amdb.home', [
    'ui.router',
    'amdb.constants'
])
    .config(function($stateProvider) {
        $stateProvider
            .state('amdb', {
                abstract: true,
                templateUrl: 'templates/amdb.main.tpl.html'
            })
            .state('amdb.home', {
                url: '/home',
                views: {
                    'search': {
                        templateUrl: 'home/home.search.tpl.html',
                        controller: 'SearchCtrl'
                    }
                }
            });
    })

    .controller('SearchCtrl', function($scope, $http, $log) {
        $log.info('SearchCtrl');
        $scope.searchAMDB = function() {
            $log.info('Search - Search AMDB - ' + $scope.searchText);
        };
    })
;

