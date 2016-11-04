/**
 * Created by Vlad on 04-Nov-16.
 */

var SRC_PORT = 6025;
var PORT = 6024;
var MULTICAST_ADDR = '239.255.255.250';
var dgram = require('dgram');
var client = dgram.createSocket("udp4");

client.bind(SRC_PORT, function () {
    setInterval(multicastNew, 1000);
});

function multicastNew() {
    var message = new Buffer("Multicast message!");
    client.send(message, 0, message.length, PORT, MULTICAST_ADDR, function () {
        console.log("Sent '" + message + "'");
    });
}