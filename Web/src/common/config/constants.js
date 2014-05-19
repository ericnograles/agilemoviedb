angular.module('amdb.constants', [])
    .constant('END_POINTS', {
        search: {
            searchAMDB: '/api/search/'
        },
        movie: {
            getMovie: '/api/movie/:id',
            createMovie: '/api/movie'
        },
        actor: {
            getActor: '/api/actor/:id',
            createActor: '/api/actor'
        }
    })
    .constant("LOGGED_IN_EVENT", "event:loggedIn")
;