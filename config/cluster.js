'use strict'

const cluster   = require('cluster');
const http      = require('http');
const numCPUs   = require('os').cpus().length;

if(cluster.isMaster) {
    console.log("Starting master");
    console.log("Number of cpu's available: " + numCPUs);
    //Fork workers
    for(var i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    console.log("Workers started");
    cluster.on('exit', (worker, code, signale) => {
        console.log(`worker ${worker.process.pid} died`);
        cluster.fork();//CREATE A NEW FORK TO REPLACE THE ONE THAT DIED
    });
} else {
    // Workers can share any TCP connection
    // Start server
    require('../bin/www');
}