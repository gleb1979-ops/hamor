import { Bank, bankRoute } from './bank.js';
export { Bank };
// Shorties rooms server: one Durable Object per game room relays messages between players (WebSocket, hibernation API).
const MAX_SOCKETS = 16;
export class Room {
  constructor(state) { this.state = state; }
  async fetch(req) {
    if (req.headers.get('Upgrade') !== 'websocket') return new Response('Expected WebSocket', { status: 426 });
    if (this.state.getWebSockets().length >= MAX_SOCKETS) return new Response('Room is full', { status: 429 });
    const pair = new WebSocketPair();
    const [client, server] = Object.values(pair);
    this.state.acceptWebSocket(server);
    return new Response(null, { status: 101, webSocket: client });
  }
  webSocketMessage(ws, msg) {
    if (typeof msg !== 'string' || msg.length > 65536) return;
    for (const s of this.state.getWebSockets()) { try { s.send(msg); } catch (e) {} }
  }
  webSocketClose(ws, code, reason) { try { ws.close(code, reason); } catch (e) {} }
  webSocketError(ws) { try { ws.close(1011, 'error'); } catch (e) {} }
}
export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    const m = url.pathname.match(/^\/ws\/([A-Za-z0-9_.%-]{1,120})$/);
    if (m) return env.ROOMS.get(env.ROOMS.idFromName(m[1])).fetch(req);
    if (url.pathname.startsWith('/api/')) return bankRoute(req, env);
    if (url.pathname === '/health') return new Response('ok');
    return new Response('Shorties rooms server is running', { headers: { 'content-type': 'text/plain; charset=utf-8' } });
  },
};
