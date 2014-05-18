angular.module('bigBluster.models.userProfile', [
        'bigBluster.externalSystems.bigBlusterService'
    ])
    .factory('UserProfile', UserProfileConstructor);

function UserProfileConstructor($injector, BigBlusterService) {
    "use strict";

    function UserProfile(userId, platform) {

        var userProfileViewModel = this;
        userProfileViewModel.name = null;
        userProfileViewModel.blusterScore = null;
        userProfileViewModel.matchesPlayed = null;
        userProfileViewModel.titlesPlayed = null;

        // TODO: Doesn't seem to be setting these properties or returning itself upstream
        // Shouldn't the pattern be that a DTO is constructed ahead of time (using the JSON
        // response from the API it's calling), then dropping that into this constructor
        // instead of the localized VM handling the JSON result directly?
        var response = BigBlusterService.getUserProfileData(userId, platform, function (DTO) {
            userProfileViewModel.name = DTO.userName;
            userProfileViewModel.kills = DTO.kills;
            userProfileViewModel.deaths = DTO.deaths;
            userProfileViewModel.blusterScore = DTO.blusterScore;
            userProfileViewModel.matchesPlayed = DTO.matchesPlayed;
            userProfileViewModel.titlesPlayed = DTO.titlesPlayed;
        });
    }

    return function (userId, platform) {
        return $injector.instantiate(UserProfile, { userId: userId, platform: platform });
    };
}