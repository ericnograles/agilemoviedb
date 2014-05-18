/**
 * See https://github.com/flatiron/api-easy
 */
var apiEasy = require('api-easy'),
    assert = require('assert');

var bigBlusterApi = apiEasy.describe('http://bigbluster.jit.su/api');

bigBlusterApi.discuss('When using the BigBluster API\'s find operation (GET)')
    .use('bigbluster.jit.su', 80)
    .get('/api/find?userName=grales@gmail.com')
    .expect(200)
    .expect('should follow the User contract', function (err, res, body) {
        var userObject = JSON.parse(body);
        assert.equal(userObject.userName, 'grales@gmail.com');
    })
    .export(module);