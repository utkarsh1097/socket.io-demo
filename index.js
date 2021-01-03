//Dependencies 
const express = require('express');
const http = require('http');
const path = require('path');
const socketio = require('socket.io');

//app.listen() vs server.listen(): https://stackoverflow.com/questions/17696801/express-js-app-listen-vs-server-listen
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const port = 3000;

//Set app properties
app.use('/static', express.static(path.join(__dirname, 'public')));   //adds a `/static` prefix to all static file paths

//Set routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/index.html'));
});

let totalUsers = 0;

//Set io
//"connection" event checks for incoming sockets. 
//add <script> snippet to html for client to be able to send these events to backend?
io.on('connection', (socket) => {
    socket.on('join room', (username) => {
        socket.username = username;
        totalUsers++;
        socket.broadcast.emit('chat message', `User ${socket.username} just joined.`);
    });
    
    socket.on('disconnect', () => {     //"disconnect" event fired when user disconnects
        socket.broadcast.emit(`User ${socket.username} got disconnected.`);
        totalUsers--;
    });
    
    socket.on('chat message', (msg) => {
        console.log('message: ', msg);
        io.emit('chat message', msg);   //send the event to frontend
    });
});

server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});