//Dependencies 
var express = require('express');
var http = require('http');
var path = require('path');
var socketio = require('socket.io');

//app.listen() vs server.listen(): https://stackoverflow.com/questions/17696801/express-js-app-listen-vs-server-listen
var app = express();
var server = http.createServer(app);
var io = socketio(server);
port = 3000;

//Set app properties
app.use('/static', express.static(path.join(__dirname, 'public')));   //adds a `/static` prefix to all static file paths

//Set routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/index.html'));
});

//Set io
//"connection" event checks for incoming sockets. 
//add <script> snippet to html for client to be able to send these events to backend?
io.on('connection', (socket) => {
    console.log('user got connected.');
    // socket.broadcast.emit('broadcast', 'A user just connected!');
    socket.on('disconnect', () => {     //"disconnect" event fired when user disconnects
        console.log('user got disconnected.');
    });
    socket.on('chat message', (msg) => {
        console.log('message: ', msg);
        io.emit('chat message', msg);   //send the event to frontend
    });
});

server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});