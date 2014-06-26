/**
 * Integration with eSports related API
 */
angular.module('amdb.services.socketIO',
    [
        'amdb.config',
        'btford.socket-io'
    ])
    .service('socketIOService', function ($rootScope, ENVIRONMENT) {
        var socket = io.connect(ENVIRONMENT.API_ROOT);
        return {
            on: function (eventName, callback) {
                socket.on(eventName, function () {
                    var args = arguments;
                    $rootScope.$apply(function () {
                        callback.apply(socket, args);
                    });
                });
            },
            emit: function (eventName, data, callback) {
                socket.emit(eventName, data, function () {
                    var args = arguments;
                    $rootScope.$apply(function () {
                        if (callback) {
                            callback.apply(socket, args);
                        }
                    });
                });
            }
        };
    })
;