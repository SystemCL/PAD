/**
 * Created by Vlad on 02-Oct-16.
 */
var net = require("net");
var fs = require('fs');
var client = new net.Socket();
client.setEncoding("utf8");
client.connect(5000, function(){
    console.log("-----client start------");
});

client.on("connect", function(){

    console.log("connected: ");
    process.stdin.resume();
    process.stdin.on("data",function(data){
        msg = { type: "post", text:"", msg_queue: "" };
        msg.text = data.toString();
        var stringfymsg = JSON.stringify(msg);
        client.write(stringfymsg);
    })
});

/*function saveFile(){
    var outputFilename = "/tmp/my.json";
    fs.writeFile(outputFilename, JSON.stringify(msgqueue, null, 4), function(err){
        if(err){
            console.log(err);
        } else {
            console.log("JSON saved to " + outputFilename);
        }
    });
}*/

client.on("error", function(err){
  //  saveFile();
    console.log("-Server disconnected-");
});



