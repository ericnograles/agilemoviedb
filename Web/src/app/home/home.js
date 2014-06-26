angular.module('amdb.home', [
    'ui.router',
    'amdb.constants'
])
    .config(function($stateProvider, STATES) {
        $stateProvider
            .state(STATES.amdb.default, {
                abstract: true,
                templateUrl: 'templates/amdb.main.tpl.html'
            })
            .state(STATES.amdb.home, {
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
        $scope.createdMovie = null;

        // Socket.io Subscriber
        try {
            var sockets = io.connect('http://localhost:1337/');
            sockets.on('movie:created', function (movie) {
                $scope.createdMovie = movie;
                $scope.$apply();
            });
        }
        catch (err){
            console.log(err);
        }

        $scope.searchAMDB = function() {
            $log.info('Search - Search AMDB - ' + $scope.searchText);
            searchService.searchByActorOrMovie($scope.searchText).promise.then(function(searchResult){
                $scope.searchResult = searchResult;
            });
        };
    })
;

