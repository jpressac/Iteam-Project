var stompClient;

export function connect(){
  var SockJs = require('sockjs-client');
  require('stompjs');

  var socket = SockJs('/channel');
  stompClient = Stomp.over(socket);

  //TODO: sacar el console.log
  stompClient.connect({}, function (frame) {
    console.log('Connected: ' + frame);
  });
}

export function connectAndSubscribe(channelId, resolve){
  var SockJs = require('sockjs-client');
  require('stompjs');

  var socket = SockJs('/channel');
  stompClient = Stomp.over(socket);

  //TODO: sacar el console.log
  stompClient.connect({}, function (frame) {
    console.log('Connected: ' + frame);
    stompClient.subscribe('/topic/' + channelId, (data)=> {
      resolve(data.body)
    });
  });
}

export function subscribe(channelId, data){

}

export function sendNote(channelId, content){
  //en el 13 va el meeting id y en el channel va tambien el meetingid
  stompClient.send("/channel", {},JSON.stringify(
    { "channel": channelId,
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

