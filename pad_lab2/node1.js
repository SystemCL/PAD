/**
 * Created by Vlad on 04-Nov-16.
 */

var args = process.argv.slice(2);
//var PORT = args[0];
var PORT = args[0];
var MULTICAST_ADDR = '239.255.255.250';
var dgram = require('dgram');
var server = dgram.createSocket({ type: 'udp4', reuseAddr: true });

server.on('listening', function () {
    var address = server.address();
    console.log('UDP Server listening on ' + address.address + ":" + address.port);
});

server.on('message', function (message, rinfo) {
    console.log('Message from: ' + rinfo.address + ':' + rinfo.port + ' - ' + message);
});

server.bind(PORT, function () {
    server.addMembership(MULTICAST_ADDR);
});