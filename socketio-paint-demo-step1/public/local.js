// Start a WebSocket connection with the server using SocketIO
var socket = io();

// Send an event named "test" to the server with socket.emit() function
// and with this event, send the string 'Hi, this is...' as the data
socket.emit('test', {sender: 'client', randomNumber: 99});

// When the client receives an event named "test",
socket.on('test', function(data) {
	// Take whatever data was received and display it in the client console
	console.log(data);
});

document.addEventListener('click', function(event) {
	console.log(event);
	socket.emit('test', event);
});