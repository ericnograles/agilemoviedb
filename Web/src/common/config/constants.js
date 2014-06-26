angular.module('amdb.constants', [])
    .constant('END_POINTS', {
        search: {
            byActorOrMovie: '/search/byActorOrMovie'
        }
    })
    .constant('STATES', {
        amdb: {
            default: 'amdb',
            home: 'amdb.home'
        }
    })
    .constant("LOGGED_IN_EVENT", "event:loggedIn")
;