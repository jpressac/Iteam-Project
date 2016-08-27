var stompClient;

export function connect(){

  //TODO: sacar el console.log
  stompClient.connect({}, function (frame) {
    console.log('Connected: ' + frame);
  });
}

export function initWebSocket(){
  var SockJs = require('sockjs-client');
  require('stompjs');

  var socket = SockJs('/channel');
  stompClient = Stomp.over(socket);
}

export function connectAndSubscribe(action, topic, resolve){
  var SockJs = require('sockjs-client');
  require('stompjs');

  var socket = SockJs('/channel');
  stompClient = Stomp.over(socket);
  
  //TODO: sacar el console.log
  stompClient.connect({}, function (frame) {
    console.log('Connected: ' + frame);
    stompClient.subscribe('/topic/' + action + '/' + topic, (data)=> {
      console.log("belu estuvo aqui");
      resolve(data.body)
    });
  });
}


export function sendNote(action, topic, content){
  //en el 13 va el meeting id y en el channel va tambien el meetingid
  stompClient.send("/channel", {},JSON.stringify(
    { "action": action,
      "topic": topic,
      "payload" : content
    })
  );
}

export function disconnect(){
  if (stompClient != null) {
    stompClient.disconnect();
  }
  console.log("Disconnected");
}

