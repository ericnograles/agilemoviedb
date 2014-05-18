// The code below starts a stand-alone Node.js web server to serve up the /Build
// content of Big Bluster Web
var connect = require('connect');
var port = 8080;
console.log('Now starting BigBluster Web (standalone using Node) on port ' + port);
connect.createServer(
    connect.static(__dirname + '/build')
).listen(port);