// Tagshim Bank: guest profiles (no registration), wallets, upgrades, chests and teams for Three Rifts.
// One Durable Object ("main") with SQLite storage. Every request is authenticated by the device's id + secret.
const HEROES = 8, UPC = [60, 120, 220, 360, 550], SKC = [150, 250, 400], CHEST = 120;
const DAY_CAP_SOLO = 2500, DAY_CAP_ONLINE = 5000;
const TEAM_UPS = {
  banner: { name: 'Боевое знамя', max: 3, cost: [400, 900, 1600] },   // +10% coins per level for every member
  armor:  { name: 'Командная броня', max: 3, cost: [500, 1100, 1900] }, // +5% armor per level in team battles
  chest:  { name: 'Командный сундук', max: 999, cost: [600] },         // every member gets a chest
  emblem: { name: 'Эмблема', max: 999, cost: [200] },
};
const EMBLEMS = ['🐉', '🦊', '🐺', '🦅', '⚡', '🔥', '🌊', '🌙', '⭐', '👑', '🗡', '🛡'];
const rnd = n => { const a = new Uint8Array(n); crypto.getRandomValues(a); return a; };
const rid = (n, abc) => [...rnd(n)].map(b => abc[b % abc.length]).join('');
const today = () => new Date().toISOString().slice(0, 10);
const blank = () => ({ c: 0, w: Array(HEROES).fill(0), a: Array(HEROES).fill(0), own: Array.from({ length: HEROES }, () => []), sel: Array(HEROES).fill(0), prog: 0, g: 0, day: '', ch: 0 });
function norm(d) { const b = blank(); d = Object.assign(b, d || {}); for (const k of ['w', 'a', 'sel']) { d[k] = Array.from({ length: HEROES }, (_, i) => Math.max(0, (d[k] || [])[i] | 0)) } d.own = Array.from({ length: HEROES }, (_, i) => Array.isArray(d.own[i]) ? d.own[i].filter(x => x >= 1 && x <= 3) : []); d.c = Math.max(0, d.c | 0); return d }

export class Bank {
  constructor(state) {
    this.state = state; const sql = state.storage.sql; this.sql = sql;
    sql.exec(`CREATE TABLE IF NOT EXISTS players(id TEXT PRIMARY KEY, secret TEXT, name TEXT, data TEXT, team TEXT, eday TEXT, esolo INTEGER, eonline INTEGER, flags INTEGER DEFAULT 0, created INTEGER, seen INTEGER)`);
    sql.exec(`CREATE TABLE IF NOT EXISTS teams(code TEXT PRIMARY KEY, name TEXT, captain TEXT, officers TEXT, bank INTEGER, ups TEXT, emblem TEXT, created INTEGER)`);
    sql.exec(`CREATE TABLE IF NOT EXISTS ledger(ts INTEGER, pid TEXT, team TEXT, delta INTEGER, kind TEXT)`);
  }
  one(q, ...a) { const r = this.sql.exec(q, ...a).toArray(); return r[0] || null }
  all(q, ...a) { return this.sql.exec(q, ...a).toArray() }
  auth(b) { const p = b && b.id ? this.one('SELECT * FROM players WHERE id=?', String(b.id)) : null; if (!p || p.secret !== b.secret) return null; p.data = norm(JSON.parse(p.data || '{}')); return p }
  save(p) { this.sql.exec('UPDATE players SET data=?, name=?, team=?, eday=?, esolo=?, eonline=?, seen=? WHERE id=?', JSON.stringify(p.data), p.name || '', p.team || null, p.eday || '', p.esolo | 0, p.eonline | 0, Date.now(), p.id) }
  team(code) { const t = code ? this.one('SELECT * FROM teams WHERE code=?', code) : null; if (!t) return null; t.officers = JSON.parse(t.officers || '[]'); t.ups = JSON.parse(t.ups || '{}'); return t }
  saveTeam(t) { this.sql.exec('UPDATE teams SET name=?, captain=?, officers=?, bank=?, ups=?, emblem=? WHERE code=?', t.name, t.captain, JSON.stringify(t.officers), t.bank | 0, JSON.stringify(t.ups), t.emblem || '', t.code) }
  view(p) {
    const t = this.team(p.team); let team = null;
    if (t) { const mem = this.all('SELECT id, name FROM players WHERE team=?', t.code).map(m => ({ id: m.id, name: m.name, role: m.id === t.captain ? 'captain' : t.officers.includes(m.id) ? 'officer' : 'member' }));
      team = { code: t.code, name: t.name, bank: t.bank, ups: t.ups, emblem: t.emblem, captain: t.captain, me: p.id === t.captain ? 'captain' : t.officers.includes(p.id) ? 'officer' : 'member', members: mem, shop: TEAM_UPS } }
    return { ok: 1, id: p.id, name: p.name, data: p.data, team, emblems: EMBLEMS }
  }
  roll(d) {
    const r = Math.random();
    if (r < 0.55) { const n = 40 + (Math.random() * 110 | 0); d.c += n; return `+${n} ₮ тагшим` }
    if (r < 0.85) { const h = Math.random() * HEROES | 0, k = Math.random() < 0.5 ? 'w' : 'a'; if (d[k][h] < 5) { d[k][h]++; return { up: k, h, lvl: d[k][h] } } d.c += 120; return '+120 ₮ тагшим' }
    const free = []; for (let h = 0; h < HEROES; h++) for (let i = 1; i <= 3; i++) if (!d.own[h].includes(i)) free.push([h, i]);
    if (free.length) { const [h, i] = free[Math.random() * free.length | 0]; d.own[h].push(i); return { skin: i, h } } d.c += 200; return '+200 ₮ тагшим'
  }
  async fetch(req) {
    let b = {}; try { b = await req.json() } catch (e) {}
    const op = new URL(req.url).pathname.replace('/api/', '');
    if (op === 'hello') {
      let p = this.auth(b);
      if (!p) {
        const id = rid(8, 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'), secret = rid(24, 'abcdefghijkmnopqrstuvwxyz0123456789');
        // first visit: the device may bring its local progress once (small, capped so it cannot be abused)
        const d = norm(b.local || {}); d.c = Math.min(d.c, 1500); for (let h = 0; h < HEROES; h++) { d.w[h] = Math.min(d.w[h], 2); d.a[h] = Math.min(d.a[h], 2) } d.prog = Math.min(d.prog | 0, 11);
        this.sql.exec('INSERT INTO players(id,secret,name,data,team,eday,esolo,eonline,created,seen) VALUES(?,?,?,?,NULL,?,0,0,?,?)', id, secret, String(b.name || 'Игрок').slice(0, 14), JSON.stringify(d), today(), Date.now(), Date.now());
        p = this.auth({ id, secret });
        return json({ ...this.view(p), secret })
      }
      if (b.name) p.name = String(b.name).slice(0, 14);
      this.save(p); return json(this.view(p))
    }
    const p = this.auth(b); if (!p) return json({ ok: 0, err: 'auth' }, 401);
    const d = p.data;
    if (op === 'state') return json(this.view(p));
    if (op === 'earn') {
      // anti-farming: coins per run are capped by run length and kills, plus a daily cap; team battles split 50/50
      const secs = Math.max(0, Math.min(3600, +b.secs || 0)), kills = Math.max(0, Math.min(2000, b.kills | 0)), online = !!b.online;
      let n = Math.max(0, Math.min(b.coins | 0, kills * 3 + Math.floor(secs * 0.6) + (b.bosses | 0) * 40 + 60));
      if (p.eday !== today()) { p.eday = today(); p.esolo = 0; p.eonline = 0 }
      const cap = online ? DAY_CAP_ONLINE - p.eonline : DAY_CAP_SOLO - p.esolo; n = Math.max(0, Math.min(n, cap));
      if (online) p.eonline += n; else p.esolo += n;
      const t = this.team(p.team); let toTeam = 0;
      if (t) { const bonus = 1 + 0.1 * (t.ups.banner | 0); n = Math.round(n * bonus); if (online && b.teamBattle) { toTeam = Math.floor(n / 2); n -= toTeam; t.bank += toTeam; this.saveTeam(t) } }
      d.c += n; if (b.prog != null) d.prog = Math.max(d.prog | 0, Math.min(11, b.prog | 0)); if (b.games) d.g = (d.g | 0) + 1, d.g % 3 === 0 && (d.ch = (d.ch | 0) + 1);
      this.sql.exec('INSERT INTO ledger VALUES(?,?,?,?,?)', Date.now(), p.id, p.team || null, n, toTeam ? 'earn+team' + toTeam : 'earn');
      this.save(p); return json({ ...this.view(p), got: n, toTeam })
    }
    if (op === 'buy') {
      const it = String(b.item || ''); let msg = null;
      if (/^[wa][0-7]$/.test(it)) { const k = it[0], h = +it[1], L = d[k][h]; if (L >= 5 || d.c < UPC[L]) return json({ ok: 0, err: 'money' }); d.c -= UPC[L]; d[k][h]++ }
      else if (/^s[0-7][0-3]$/.test(it)) { const h = +it[1], i = +it[2]; if (i > 0 && !d.own[h].includes(i)) { if (d.c < SKC[i - 1]) return json({ ok: 0, err: 'money' }); d.c -= SKC[i - 1]; d.own[h].push(i) } d.sel[h] = i }
      else if (it === 'chest') { if (d.day !== today()) d.day = today(); else if (d.ch > 0) d.ch--; else return json({ ok: 0, err: 'nochest' }); msg = this.roll(d) }
      else if (it === 'buychest') { if (d.c < CHEST) return json({ ok: 0, err: 'money' }); d.c -= CHEST; msg = this.roll(d) }
      else return json({ ok: 0, err: 'item' });
      this.save(p); return json({ ...this.view(p), msg })
    }
    if (op === 'team/create') {
      if (p.team) return json({ ok: 0, err: 'inteam' });
      const code = rid(5, 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789');
      this.sql.exec('INSERT INTO teams VALUES(?,?,?,?,?,?,?,?)', code, String(b.name || 'Команда').slice(0, 20), p.id, '[]', 0, '{}', EMBLEMS[Math.random() * EMBLEMS.length | 0], Date.now());
      p.team = code; this.save(p); return json(this.view(p))
    }
    if (op === 'team/join') {
      const t = this.team(String(b.code || '').toUpperCase()); if (!t) return json({ ok: 0, err: 'nocode' });
      if (this.all('SELECT id FROM players WHERE team=?', t.code).length >= 12) return json({ ok: 0, err: 'full' });
      p.team = t.code; this.save(p); return json(this.view(p))
    }
    if (op === 'team/leave') {
      const t = this.team(p.team); p.team = null; this.save(p);
      if (t) { const rest = this.all('SELECT id FROM players WHERE team=?', t.code); if (!rest.length) this.sql.exec('DELETE FROM teams WHERE code=?', t.code); else if (t.captain === p.id) { t.captain = (t.officers.find(o => rest.some(r => r.id === o))) || rest[0].id; t.officers = t.officers.filter(o => o !== t.captain && o !== p.id); this.saveTeam(t) } }
      return json(this.view(p))
    }
    if (op === 'team/role') {
      const t = this.team(p.team); if (!t || t.captain !== p.id) return json({ ok: 0, err: 'captain' });
      const m = String(b.pid || ''); if (b.role === 'officer' && !t.officers.includes(m)) t.officers.push(m); if (b.role === 'member') t.officers = t.officers.filter(o => o !== m); if (b.role === 'captain') { t.officers = t.officers.filter(o => o !== m); t.officers.push(t.captain); t.captain = m }
      this.saveTeam(t); return json(this.view(p))
    }
    if (op === 'team/buy') {
      const t = this.team(p.team); if (!t) return json({ ok: 0, err: 'noteam' });
      if (t.captain !== p.id && !t.officers.includes(p.id)) return json({ ok: 0, err: 'captain' });
      const k = String(b.item || ''), U = TEAM_UPS[k]; if (!U) return json({ ok: 0, err: 'item' });
      const L = t.ups[k] | 0; if (L >= U.max) return json({ ok: 0, err: 'max' }); const cost = U.cost[Math.min(L, U.cost.length - 1)]; if (t.bank < cost) return json({ ok: 0, err: 'money' });
      t.bank -= cost;
      if (k === 'chest') { for (const m of this.all('SELECT id, secret FROM players WHERE team=?', t.code)) { const q = this.auth(m); q.data.ch = (q.data.ch | 0) + 1; this.save(q) } }
      else if (k === 'emblem') { if (EMBLEMS.includes(b.emblem)) t.emblem = b.emblem }
      else t.ups[k] = L + 1;
      this.saveTeam(t); this.sql.exec('INSERT INTO ledger VALUES(?,?,?,?,?)', Date.now(), p.id, t.code, -cost, 'team:' + k);
      return json(this.view(this.auth(b)))
    }
    if (op === 'restore') { // move the profile to another phone with the recovery code (id-secret)
      return json(this.view(p))
    }
    return json({ ok: 0, err: 'op' }, 404);
  }
}
const CORS = { 'access-control-allow-origin': '*', 'access-control-allow-methods': 'POST, OPTIONS', 'access-control-allow-headers': 'content-type' };
function json(o, s) { return new Response(JSON.stringify(o), { status: s || 200, headers: { 'content-type': 'application/json; charset=utf-8', ...CORS } }) }
export function bankRoute(req, env) {
  if (req.method === 'OPTIONS') return new Response(null, { headers: CORS });
  return env.BANK.get(env.BANK.idFromName('main')).fetch(req);
}
