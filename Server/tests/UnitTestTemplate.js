/*

Step 1: Require in anything your unit test needs.
Always include sinon (for Mocking/Stubbing/Spying) and
assert (for assertions).

var User = require('../../api/models/User'),
    UserInfoDTO = require('../../api/dto/UserInfoDTO'),
    sinon = require('sinon'),
    assert = require('assert');
*/

/* Step 2: Describe what component you're testing.  For example, the User Model */
describe('A component you are testing', function(){

    /* Step 3: Describe what grouping of component functionality you're testing */
    describe('a functionality grouping the component', function() {

        /* Step 4: Describe the specific functionality you're testing.  Call done() when it finishes. */
        it('should do something #1', function(done){
            done();
        });

        it('should do something #2', function(done){
            done();
        });
    });
});

// NOTE: To run the unit tests, go to the command line of /Server and execute "grunt mochaTest"