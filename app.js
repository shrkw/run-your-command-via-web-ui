/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var socketio = require("socket.io");

// var app = express();
var app = module.exports = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler({
    dumpExceptions: true,
    showStack: true
  }));
}

app.get('/', function(req, res){
      res.sendfile('views/index.html');
});

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

/* Socket.IO */
var io = socketio.listen(server);
var log = console.log;

io.sockets.on("connection", function (socket) {
  log("connected");

  socket.on("run", function (data) {
    name = data.value;
    log(name);
    var spawn = require('child_process').spawn,
        cmd = spawn('/bin/sh', ['scripts/run.sh', name]);
    cmd.stdout.setEncoding('utf8');
    cmd.stdout.on('data', function(data) {
      console.log('stdout: ' + data);
      socket.volatile.emit("receive_stdout", {value:data});
    })
    cmd.stderr.setEncoding('utf8');
    cmd.stderr.on('data', function(data) {
      console.log('stderr: ' + data);
      socket.volatile.emit("receive_stderr", {value:data});
    })
    cmd.on('exit', function(code) {
      console.log('exit code: ' + code);
      socket.volatile.emit("receive_exit", {});
    })
  });
  socket.on("disconnect", function () {
    log("disconnected");
  });
});
