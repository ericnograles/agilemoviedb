angular.module('amdb.constants', [])
    .constant('END_POINTS', {
        search: {
            byActorOrMovie: '/search/byActorOrMovie'
        }
    })
    .constant("LOGGED_IN_EVENT", "event:loggedIn")
;