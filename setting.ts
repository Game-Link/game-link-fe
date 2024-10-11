import * as encoding from 'text-encoding';
import websocket from 'websocket';

export function assignModule() {
  Object.assign('global', {
    TextEncoder: encoding.TextEncoder,
    TextDecoder: encoding.TextDecoder,
    WebSocket: websocket.w3cwebsocket,
  });
}
