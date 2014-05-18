var frisby = require('frisby');

frisby.create('/api/find on the root folder')
    .get('http://bigbluster.jit.su/api/find?userName=grales@gmail.com')
    .expectStatus(200)
    .expectJSON({
        userName: 'grales@gmail.com',
        emailAddress: 'grales@gmail.com',
        firstName: 'Eric',
        lastName: 'Nograles'
    })
    .expectJSONTypes({
        userName: String,
        emailAddress: String,
        firstName: String,
        lastName: function (val) {
            expect(val).toMatchOrBeNull('Nograles');
        }
    })
    .toss();