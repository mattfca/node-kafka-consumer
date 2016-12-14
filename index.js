'use strict';
var cluster = require('cluster');  
var http    = require('http');  
var os      = require('os');
var Worker = require('./worker');

var numCPUs = os.cpus().length;

if (cluster.isMaster) {  
    console.log('Master ' + process.pid + ' has started.');

    for (var i = 0; i < numCPUs; ++i) {
        var worker = cluster.fork();
        
        worker.on('message', function(msg) {
             
        });
    }
}else{
    Worker.start();
}