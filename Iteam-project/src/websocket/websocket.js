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


export function sendNote(action, topic, content){
  //en el 13 va el meeting id y en el channel va tambien el meetingid
  stompClient.send("/channel", {},JSON.stringify(
    { 
      "topic": topic,
      "message":{
        "action": action,
        "payload" : content
      }      
    })
  );
}

export function disconnect(){
  if (stompClient != null) {
    stompClient.disconnect();
  }
}

