var stompClient;
var stompChatClient;

export function connect() {
  stompClient.connect({}, function (frame) {
  });
}

export function initWebSocket() {
  var SockJs = require('sockjs-client');
  require('stompjs');

  var socket = SockJs('/channel');
  stompClient = Stomp.over(socket);
}

export function connectAndSubscribe(topic, resolve) {
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


export function sendMessage(action, topic, content, users) {
  stompClient.send("/channel", {}, JSON.stringify(
    {
      "topic": topic,
      "message": {
        "payload": content,
        "action": action
      }
    })
  );
}

export function disconnect() {
  if (stompClient != null) {
    stompClient.disconnect();
  }
}


export function joinChat(topic, resolve) {
  var SockJs = require('sockjs-client');
  require('stompjs');

  var socket = SockJs('/chat');
  stompChatClient = Stomp.over(socket);

  stompChatClient.connect({}, function (frame) {
    stompChatClient.subscribe('/chatRoom/' + topic, (data)=> {
      resolve(data.body)
    });
  });
}


export function sendMessageToChat(topic, user, text, time) {
  stompChatClient.send("/chat", {}, JSON.stringify(
    {
      "topic": topic,
      "payload": {
        "user": user,
        "text": text,
        "time": time
      }
    })
  );
}

export function disconnectChat() {
  if (stompChatClient != null) {
    stompChatClient.disconnect();
  }
}

export function connectChat() {
  stompChatClient.connect({}, function (frame) {
  });
}

export function initWebSocketChat() {
  var SockJs = require('sockjs-client');
  require('stompjs');

  var socket = SockJs('/chat');
  stompChatClient = Stomp.over(socket);
}
