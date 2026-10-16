# Shorties rooms server

Cloudflare Worker + Durable Objects. One Durable Object per game room relays WebSocket messages between players.
Endpoint: `wss://rooms.tagshim.com/ws/<room-topic>` (games fall back to the public MQTT broker if it is unreachable).

Deploy: Cloudflare dashboard → Workers & Pages → Create → Import a repository → this repo, root directory `server`.
Then Worker → Settings → Domains & Routes → Add custom domain `rooms.tagshim.com`.
