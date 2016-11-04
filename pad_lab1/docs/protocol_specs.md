## Description of the `messagebroker` protocol

##### `messagebroker` protocol is based on JSON.
 `messagebroker` has the following types:

- `get` - read a message from the queue;
- `post` - send a message to the queue;
- `subscribe` - subscribe for messages of selected queue;
- `unsubcribe`- unsubscribe for messages of selected queue;

##### Also, there are other types of messages, like:
- `queue` - name of queue;
- `text` - message text;
- `error` - an error message;

###Usage of protocol

#####Protocol can be used with basic parameters:
```json
{
    "type": "<get|post|subscribe|subscribe>",
    "queue": "<queue_name>",
    "text": "<message_string>"
}
```

#####Get exemple:
```json
{
    "type": "get",
    "queue": "<queue_name>",
    "text": "your_message_here"
}
```
`type` and `text` parameters are required.
If queue is not specified massage will be saved in default queue, also
producer and reciever can subscribe/unsubscribe ;
If massage is plain than message will be deleted;

#####Post exemple:
```json
{
    "type": "post",
    "queue": "<queue_name>",
    "text": "your_message_here"
}
```
In case when queue doesn't exist then protocol will throw an error message;

#####Subscribe exemple:
```json
{
    "type": "subscribe",
    "queue": "<queue_name>",
    "text": "your_message_here"
}
```
If queue doesn`t exist it will be created and message will be inserted;

#####Unsubscribe exemple:
```json
{
    "type": "unsubscribe",
    "queue": "<queue_name>",
    "text": "your_message_here"
}
```
If queue does not exist then protocol will throw an error.
 `text` will be ingorated;
