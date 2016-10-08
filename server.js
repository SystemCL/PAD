/**
 * Created by Vlad on 02-Oct-16.
 */
var net = require("net");
//load filestream for read/write ops
var fs = require('fs');

//Queue for message storage
var msgqueue = [];
var host = "0.0.0.0";
var port = 5000;

//TCP server creation
var server = net.createServer(function(socket){
    socket.name = socket.remoteAddress + ":" + socket.remotePort;
    console.log("Client connected: " + socket.name);

    socket.on("data", function(data){
        var msg = JSON.parse(data);
        console.log(msg.type);
        console.log("Client transmitted: " +msg.text);
        console.log(msg.msg_queue);

        //switch for determine type operation(push or pop) from queue
        switch(msg.type){
            case "post":
                console.log("Sending...");
                msgqueue.push(msg.text.trim()); //push message to queue
                saveFile();
                break;
            case "get":
                if(msgqueue.length > 0){
                    var i = msgqueue.indexOf("\u0005".toString());
                        if(i != -1){
                            msgqueue.splice(i,1);
                        }
                    socket.write(msgqueue.pop()); //pop message from queue

                } else {
                    console.log("0 messages in queue");
                }
                console.log(msgqueue.toString());
                break;
        }
    });

    socket.on("error", function(err){
       saveFile();
        //console.log(ex);
        console.log("Messages from queue saved to file.")
    });

    socket.on("close", function(closed){
       console.log("Client " + socket.name + " disconnected!");
    });

   // process.on("exit", console.log("Server disconnected!!"));
 /*   socket.on("exit", function(closedServ){
        if(options.exit(0)){
        console.log("Server disconnected!");
        }
    });*/

/*    socket.on("exit", function(exited) {
     console.log("Server disconnected!");
     });*/

/*process.on('exit', exitHandler.bind(null), {cleanup:true});*/

}).
    listen(port, host, function(){
         console.log("-----Server on!-----");

});

/*function exitHandler(options, err){
    if(options.cleanup) console.log('clean');
    if(err) console.log(err.stack);
    if(options.exit) process.exit()
}*/

function saveFile(){
    var outputFilename = "/tmp/my.json";
    fs.writeFile(outputFilename, JSON.stringify(msgqueue, null, 4), function(err){
        if(err){
            console.log(err);
        } else {
            console.log("JSON saved to " + outputFilename);
        }
    });
}