import assert from 'assert';
import {startHttpServer} from './httpServer.js';
import {startWebSocketServer} from './webSocketServer.js';

const httpPort = process.env.HTTP_PORT;
const internalAccessKey = process.env.INTERNAL_ACCESS_KEY;
const webSocketPort = process.env.WEBSOCKET_PORT;

assert(httpPort, 'HTTP_PORT is required');
assert(internalAccessKey, 'INTERNAL_ACCESS_KEY is required');
assert(webSocketPort, 'WEBSOCKET_PORT is required');

startHttpServer({
  port: parseInt(httpPort),
  internalAccessKey,
});

startWebSocketServer({
  port: parseInt(webSocketPort),
});
