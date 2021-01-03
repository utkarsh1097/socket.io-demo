$(function() { //same as $(document).ready(function() {})
    $('#intro').fadeIn(1000);
    $('#chatUsername').delay(1000).fadeIn(1000);
    var socket = io();  //This is what fires all the events
    $('form').submit(function(e) {
        e.preventDefault();
        socket.emit('chat message', $('#m').val());
        $('#m').val('');
        return false;
    });
    socket.on('connect', function() {
        socket.emit("join room", "xyzbaby");
    })
    socket.on('chat message', function(msg) {
        $('#messages').append($('<li>').text(msg));
    })
});