/*
 Jasmine specs for Big Bluster Service tests
 */

describe('Big Bluster Service Tests', function () {

    beforeEach(function () {
        this.addMatchers({
            toEqualData: function (expected) {
                return angular.equals(this.actual, expected);
            }
        });
    });

    beforeEach(module('bigbluster.externalsystems.bigblusterservice'));

    describe('Big Bluster Service GET Tests', function () {

    });
});