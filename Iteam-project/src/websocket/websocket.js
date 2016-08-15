var stompClient;

export function connect(){
  var SockJs = require('sockjs-client');
  require('stompjs');

  var socket = SockJs('/channel');
  stompClient = Stomp.over(socket);

  stompClient.connect({}, function (frame) {
    console.log('Connected: ' + frame);
    //en el 13 va el meeting id
    stompClient.subscribe('/topic/' + 13, (data)=> {
    });
  });
}

export function stompSubscribe(){
  stompClient.subscribe('/topic/' + 13, (data)=> { 
  });
}

export function sendNote(content){
  //en el 13 va el meeting id y en el channel va tambien el meetingid
  stompClient.send("/channel", {},JSON.stringify(
    { "channel": "13",
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

