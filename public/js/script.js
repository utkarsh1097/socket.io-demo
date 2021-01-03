$(function() { //same as $(document).ready(function() {})
    var usernameSet = false, username = "";
    var socket = io({
        autoConnect: false
    });  //This is what fires all the events
    
    $('#intro').fadeIn(1000);
    $('#chatUsername').delay(500).fadeIn({duration: 1000});
    // $('#chatUsername').delay(500).animation({top: "-=200px"}, 1000); TODO: Try out fadeIn + box movement animation
    
    $('#entryForm').submit(function(e) {
        e.preventDefault();
        username = $("#chatUsername").val();
        usernameSet = true;
        console.log(`Username = ${username}.`)
        socket.open();
        $('.overlay').fadeOut(200);
    });
    
    // $('form').submit(function(e) {
    //     e.preventDefault();
    //     socket.emit('chat message', $('#m').val());
    //     $('#m').val('');
    //     return false;
    // });
    socket.on('connect', function() {
        if(usernameSet) {
            socket.emit("join room", username);
        }
    })
    socket.on('chat message', function(msg) {
        $('#messages').append($('<li>').text(msg));
    })
});