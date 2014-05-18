angular.module('amdb.constants', [])
    .constant("END_POINTS", {
        getProfile: "/api/getProfile/"
    })
    .constant("PLATFORM_CONSTANTS", {
        platformType: {
            pc: 'pc',
            ps3: 'ps3',
            ps4: 'ps4',
            xBoxOne: 'xb1'
        }
    })
    .constant("LOGGED_IN_EVENT", "event:loggedIn")
;