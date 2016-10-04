// Setting up libraries and configuration
var express = require('express');		// The require() function includes the code for Express
var app = express();					// Initialize the Express library
var http = require('http').Server(app);	// Initialize an HTTP server
var io = require('socket.io')(http);	// Include and initialize SocketIO
var port = process.env.PORT || 8000;	// Set the default port number to 8000, or use Heroku's settings (process.env.PORT)

// Use Express to serve everything in the "public" folder as static files
app.use(express.static('public'));

// Activate the server and listen on our specified port number
http.listen(port, function() {
	// Display this message in the server console once the server is active
	console.log('Listening on port ' + port);

});

// When a user connects over websocket,
io.on('connection', function(socket) {
	var hello = {sender: "hello", randomnumber: 5};
	// Display this message in the server console
	console.log('A user connected!');

	// Send an event named "test" to every client with io.sockets.emit() function (or just io.emit() for short)
	// and with this event, send the string 'Hey everyone...' as the data
	io.sockets.emit('test', {sender: 'server', randomNumber: 5});

	// When the server receives an event named "test",
	socket.on('test', function(data) {
		// Take whatever data was received and display it in the server console
		console.log(data);
		socket.emit('test', 'I saw you click1');
		socket.broadcast.emit('test', 'off with their head!');
	});

});	// End of SocketIO code