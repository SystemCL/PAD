var net = require('net');

var HOST = '127.0.0.1';
var PORT = 8000;

var client = new net.Socket();
client.connect(PORT, HOST, function() {

    console.log('CONNECTED TO: ' + HOST + ':' + PORT);
    // Write a message to the socket as soon as the client is connected, the server will receive it as message from the client 
	client.write('Client says: I am Chuck Norris!');


});

// Add a 'data' event handler for the client socket
// data is what the server sent to this socket
client.on('data', function(data) {
    
    console.log('DATA: ' + data);
	if (data == 'exit\n') {
      console.log('exit command received: ' + client.remoteAddress + ':' + client.remotePort + '\n');
      client.destroy();
      var idx = clients.indexOf(client);
      if (idx != -1) {
        delete clients[idx];
      }
      return;
    }

    // Close the client socket completely
    //client.destroy();
    
});


// Add a 'close' event handler for the client socket
client.on('close', function() {
    console.log('Connection closed');
});
