/*
fetches hash messaage from client
* */
const WebSocketServer = require('websocket').server;
var http = require('http');
var redis = require('redis');

var server = http.createServer(function(request, response) {
});
server.listen(8080, function() { });

var clients = [];
// ws server initialization
wsServer = new WebSocketServer({
    httpServer: server
});

const redisClient = redis.createClient(6379);

redisClient.on('error', function(error) {
    console.warn('REDIS ERROR: ' + error);
});

// called on each client request
wsServer.on('request', function(request) {
    var connection = request.accept(null, request.origin);
    var index = clients.push(connection) - 1;
    // handles client messages
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            const messageValue = JSON.parse(message.utf8Data);
            // storing inside redis database
            redisClient.get(messageValue.user, async function (err, expected) {
                if(err) throw err;
                if(expected) {
                    const storedValue = JSON.parse(expected);
                    redisClient.set(messageValue.user, JSON.stringify([...storedValue, {
                        hash: messageValue._hash, date: new Date()
                    }]));
                } else {
                    const newValue = JSON.stringify([{ hash: messageValue._hash, date: new Date()}])
                    redisClient.set(messageValue.user, newValue);
                }
            });
        }
    });

    connection.on('close', function(connection) {
    });
});
