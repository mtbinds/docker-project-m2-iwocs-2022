/*
fetches hash messaage from client
* */
const WebSocketServer = require('websocket').server;
var http = require('http');

var server = http.createServer(function(request, response) {
});
server.listen(8080, function() { });

var clients = [];
// ws server initialization
wsServer = new WebSocketServer({
    httpServer: server
});
// called on each client request
wsServer.on('request', function(request) {
    var connection = request.accept(null, request.origin);
    // id client
    var index = clients.push(connection) - 1;

    console.log((new Date()) + ' Connection accepted.');
    // handles client messages
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            console.log(message.utf8Data);
        }
    });

    connection.on('close', function(connection) {
    });
});
