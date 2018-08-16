#!/usr/bin/env node
"use strict";

//module dependencies
var server = require("../dist/server");
var debug = require("debug")("express:server");
var https = require("https");
var fs = require("fs");
var express = require('express');
var cors = require('cors');
var open = require('open');

var privateKey = fs.readFileSync("sslcert/server.key", "utf8");
//var certificate = fs.readFileSync('sslcert/server.crt', 'utf8');
var certificate = fs.readFileSync("sslcert/server.crt", "utf8");
var credentials = { key: privateKey, cert: certificate };

//create http server
var httpPort = normalizePort(process.env.PORT || 8080);
var app = server.Server.bootstrap().app;
app.set("port", httpPort);
var httpServer = https.createServer(credentials, app);

//listen on provided ports
httpServer.listen(httpPort + 1);

//add error handler
httpServer.on("error", onError);

//start listening on port
httpServer.on("listening", onListening);

// Static file server for images
// (function () {
//   var serverPort = 8000;
//   var delayImgResponse = false;
//   var privateKey = fs.readFileSync('sslcert/server.key', 'utf8');
//   var certificate = fs.readFileSync('sslcert/server.crt', 'utf8');
//   var credentials = { key: privateKey, cert: certificate };
//
//   var expressvar = express();
//
//   expressvar.use(cors());
//
//   if (delayImgResponse) {
//     expressvar.get('/img',
// 			/*function (req, res) {
// 				setTimeout(function() {
// 			  		res.send('Hello World!');
// 			  	}, 20000);
// 			}*/
//       (req, res, next) => {
//         setTimeout(function () {
//
//           next();
//         }, 4500);
//       }
//     );
//   }
//   expressvar.use(express.static(__dirname));
//   expressvar.use('/socket.io', express.static('../socket.io'));
//
//   var app = https.createServer(credentials, expressvar);
//   var io = require('socket.io').listen(app);
//   app.listen(serverPort, function () {
//     console.log('Images server: HTTPS Server listening on port ' + (serverPort) + '!');
//
//     // to test
//     //open('https://localhost:' + serverPort + '/img');
//   });
//
// })();

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + httpPort : "Port " + httpPort;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  var addr = httpServer.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
}
