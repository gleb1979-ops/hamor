# Cartoon series "Four friends and the Donkey"

Episode sources (canvas animation, vertical 1080x1920, 30 s each). Each `ep_*.js` uses the game engine's own art.

Build: `python3 tools/mkep2.py` creates `_ep/ep.html` from `burger/index.html` (needs fonts in `_ep/fonts`), then
`EP=<name> node tools/eprender2.js` renders frames, `tools/epaudio_all.py` makes the soundtrack, ffmpeg joins them.

Order: donkey(1) burger(2) school(3) soccer(4) snow(5) box(6) villain(7) balloon(8) train(9) dino(10) ghost(11, intro_ghost.js) pirate(12) pizza(13) sniper(14, season 2).
