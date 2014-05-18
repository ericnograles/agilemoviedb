describe('HomeCtrl', function () {
    describe('isCurrentUrl', function () {
/*        var AppCtrl, $location, $scope;*/

        beforeEach(module('amdb'));

/*        beforeEach(inject(function ($controller, _$location_, $rootScope) {
            $location = _$location_;
            $scope = $rootScope.$new();
            AppCtrl = $controller('AppCtrl', { $location: $location, $scope: $scope });
        }));*/

        it('should pass a dummy test', inject(function () {
            expect(true).toBeTruthy();
        }));
    });
});
