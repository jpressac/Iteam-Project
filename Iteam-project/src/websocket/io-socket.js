/**
 * Created by Usuario on 02/01/2017.
 */

var express = require('express');
var http = require('http');

var socket = require('../routes/socket.js');

var app = express();
var server = http.createServer(app);

/* Configuration */
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.set('port', 3000);

if (process.env.NODE_ENV === 'development') {
  app.use(express.errorHandler({dumpExceptions: true, showStack: true}));
}

