/* 
We want to separate our app logic from actually running the app
in production - you would want to use something else that is more
robust such as unitech
*/

const app = require('../app');
const http = require('http');

// get port from environment and store it in epress
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);


// create an HTTP server

const server = http.createServer(app);

// listen on provide port, on all network interface

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);