
/**
 * Created by Vlad on 02-Oct-16.
 */
var net = require("net");
var fs = require('fs');
var receiver = new net.Socket();
//receiver.setEncoding('utf8');

receiver.connect(5000, function(){
    console.log("-----Receiver started------");
});
//listen keyboard events
process.stdin.resume();
process.stdin.on("data",function(data){

    var msg = {type: "get", text:"", msg_queue: ""};
    //send to broker
    receiver.write(JSON.stringify(msg));
});


receiver.on("data", function(data){

        console.log("Receiver receive: " + data.toString());
     //receiver.destroy();
});

//on error event
//When miss connection from server, retrieve from file my.json
receiver.on("error", function(ex){
    process.stdin.resume();
    var fs = require('fs');
    var obj;
    fs.readFile('/tmp/my.json', 'utf8', function (err, data) {
        if (err) throw err;
        obj = JSON.parse(data);
        for (var i = 0; i < obj.length && i < data.length; i++) {
            console.log("From file: " + obj[i].toString());
        }
    })

});
