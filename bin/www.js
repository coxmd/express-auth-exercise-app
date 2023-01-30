/* 
We want to separate our app logic from actually running the app
in production - you would want to use something else that is more
robust such as unitech
*/

const app = require('../app');
const http = require('http');
const debug = require('debug')('exer:server');

// get port from environment and store it in epress
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);


// create an HTTP server

const server = http.createServer(app);

// listen on provide port, on all network interface

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

// normalize a port into a number, string or false

function normalizePort(val){
    const port = parseInt(val, 10);

    if(isNaN(port)){
        return val;
    }

    if(port >= 0){
        return port;
    }

    return false;
}

// error event
function onError(error) {
    if(error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string'
    ? 'Pipe' + port : 'Port' + port;

    switch(error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
        break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
        break;
        default: throw error;
    }
}

function onListening() {
    const addr = server.address();
    const bind = typeof port === 'string'
    ? `'Pipe ${addr}` : `Port ${addr}`;

    debug(`Listening on ${bind}`);

    console.log(`server running on ${bind}`);
}