#Message broker in NodeJs#
###created by Ploaia Vladislav###

###Requirements:###
    - NodeJs version 4.+ for run
	- npm
	
###How to install:###

     For use this project, you will need to install:
     
	 - NodeJs - visit [https://nodejs.org/en/] then download and install it.
     - npm - (node package manager) comes with nodejs
     - prompt - install this package with nmp in terminal. Ex: npm install prompt
	 
###How about running this project:###

First, we have 3 files:
- client.js
- server.js
- recv.js
P.S. Run server.js first! 

#####Client
Client connect to server automatically when is started.
Client can post messages to your own created queue, if queue is not specified then
message will be stored in 'default' queue
#####Server
Server runs on port 5000, listen for new connection and if there is new
connection show addres of new connected node. Also server store
messages from 'Client' in queue and every time when new message arrives
it`s stored into file. If message queue  does not exits then server 
create new one and store message. If 'Receiver' ask a new message from 
queue then server get first message from queue and send to them.
#####Receiver 
Reciever can make two actions:
- Get messages one by one from queue with method 'get'
- Subscribe/Unsubcribe to a queue and get all new messages.

Attention: This method of communication works concurently, it seems that we can run 
at the same time few clients and few receivers and transfer data bewtween them. 
	 
###Demo of project:	
 ```sh
1. Go to your cmd/console/terminal and type:
$node server.js
-----Server on!-----
{ q1: [ 'abc', '12345' ]}
```
Now server is started and display queue content when it has somethis.

2. Open second cmd/console/terminal and type:
 ```sh
$ node client.js
-----client start------
prompt: queue: q1
prompt: type: message
prompt: text: abcde12345
==== Message sent ====
```
Now Client started, and ask you to specify queue name, message type, and message 
for send to server.  
The message: 
 '==== Message sent ===='
signalize that message has been send to receiver.

3.Open third cmd/console/terminal and type:
```sh
$ node recv.js
-----Receiver started------
prompt: queue: q1
prompt: type: get
prompt: text: get
==== Message sent ====

New message from queue[q1]: abcde12345
```
Finally receiver started, and prompt will ask you to get a message with 'get',
'subscribe' or 'unsubscribe' for specified queue. If message is sended with 
success then on console will be printed '==== Message sent ===='. On subscribe
with succes will be displayed 'New message from queue[q1]: Subscribe succesed'
message sended by broker.
Receiver also listen for messages, when message arrives, then is imediatly
displayed on console.

###Conclusion###
This message broker has possibillity to support concurently many clients and receivers, it seems that
everybody can send and receive at the same time, without blocking. Recievers are able
to subscribe and unsubscribe from queues or just get message one by one.

####I had used TCP as transfer protocol (net module in NodeJs).####
