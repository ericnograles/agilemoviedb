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

    .controller('SearchCtrl', function($scope, $http, $log, searchService) {
        $log.info('SearchCtrl');
        $scope.searchResult = null;
        $scope.searchAMDB = function() {
            $log.info('Search - Search AMDB - ' + $scope.searchText);
            searchService.searchByActorOrMovie($scope.searchText).promise.then(function(searchResult){
                $scope.searchResult = searchResult;
            });
        };
    })
;

