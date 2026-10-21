# Translation brief — game «Свинец или серебро» (Plata o Plomo), 18+ street-brawler

Setting: fictional Latin-American port city **Ciudad Oro, 1985**. The player rises from a poor barrio to the top of a crime world. Money = **pesos**. Cargo = **emeralds**. The game code was converted from a Russian 80s-street game, so many strings still use Soviet slang/places — ADAPT them to the Latin-American 80s setting rather than translating literally (e.g. менты → cops / policías, КПЗ → lockup / calabozo, ментовка → police station / comisaría, электричка → train / tren, дискотека → disco / discoteca, пацан → kid/homeboy / chamaco/compa, разрулить → talk it out / negociar, по понятиям → by street rules / por las reglas de la calle, барахолка/лавка → Shop / Tienda, рынок → market / mercado).

Glossary (use exactly):
- песо → pesos / pesos; джип → jeep / jeep; тагшим → Tagshim; Тагшим → Tagshim
- СВИНЕЦ → LEAD / PLOMO; СЕРЕБРО → SILVER / PLATA; СВИНЕЦ ИЛИ СЕРЕБРО → PLATA O PLOMO (both languages); Свинец или серебро → Plata o plomo
- Эль Патрон → El Patrón; Дон Эрнесто → Don Ernesto; Полковник Варгас → Colonel Vargas / Coronel Vargas; Калеро → Calero; Сьюдад-Оро → Ciudad Oro; Сан-Хасинто → San Jacinto; Кантина «Эль Тигре» → El Tigre cantina / cantina El Tigre; меркадо → mercado
- Heroes: Старший → Big Bro / El Mayor; Шустрый → Quick / El Rápido; Здоровый → Tank / El Grandote; Скорлупа → Kid / El Chamaco; Боксёр → Boxer / Boxeador; Каратист → Karate Kid / Karateca; Кабан → Boar / Jabalí; Дембель → Veteran / Veterano; Рыжий → Red / El Rojo; Маринка → Marina / Marina; Лена → Lena / Lena
- Consumables: кефир → milk / leche; тархун → soda / refresco; жвачка → gum / chicle
- обрез → sawed-off / recortada; арматура → rebar / varilla; бита → bat / bate; кастет → brass knuckles / manopla; нунчаки → nunchucks / nunchakus; цепь → chain / cadena
- Other character names (Турбо, Зима, Кащей, Сутулый…) are nicknames: give a short punchy nickname in each language (e.g. Турбо → Turbo / Turbo, Зима → Winter / Invierno).

Rules:
- Each key is a fragment of UI/canvas text cut out of the game code; the `ctx` field shows surrounding source so you can see where it's used. Translate the fragment ONLY (not the context).
- Short fragments (single words like «на», «из», «Глава») are reused in templates like «Глава 3 из 9», «Стенка · 2 на 2» — translate them so they work there (из → of / de, на → vs / vs when it's «N на N», Глава → Chapter / Capítulo).
- Keep emoji, numbers, symbols. Keep CAPS when the Russian is in CAPS. Keep length close to the original (buttons are small). No quotes around the result unless the Russian has them; convert «» to “ ” in English and keep «» in Spanish.
- If a fragment is code-only junk (a variable comment, a dev note), still give a plausible translation.
- Tone: gritty, short, cinematic 80s crime-movie; 18+ language is fine but no slurs.

Output: write a JSON object mapping each Russian key exactly as given → ["English","Español"]. Every key from your chunk must be present. Validate with python json.load before finishing.
