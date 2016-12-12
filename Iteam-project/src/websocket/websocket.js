var stompClient;

export function connect(){
  stompClient.connect({}, function (frame) {});
}

export function initWebSocket(){
  var SockJs = require('sockjs-client');
  require('stompjs');

  var socket = SockJs('/channel');
  stompClient = Stomp.over(socket);
}

export function connectAndSubscribe(topic, resolve){
  var SockJs = require('sockjs-client');
  require('stompjs');

  var socket = SockJs('/channel');
  stompClient = Stomp.over(socket);
  

  //TODO: sacar el console.log
  stompClient.connect({}, function (frame) {
    stompClient.subscribe('/topic/' + topic, (data)=> {
      resolve(data.body)
    });
  });
}


export function sendMessage(action, topic, content,users){
  stompClient.send("/channel", {},JSON.stringify(
    {
      "topic": topic,
      "message":{
        "payload" : content,
        "action": action
      }
    })
  );
}

export function disconnect(){
  if (stompClient != null) {
    stompClient.disconnect();
  }
}

