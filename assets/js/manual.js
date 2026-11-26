/* ==========================================================
   MANUALI ZYRTAR I DPSHTRR (kat. A1, A2, B1, B – Qershor 2019)
   - assets/manual/manual.json  → 25 temat, fjalitë dhe përgjigjet
   - assets/manual/fig/tNN.json → figurat e secilës temë (ngarkohen kur duhen)
   ========================================================== */
(function () {
  const BASE = 'assets/manual/';
  let data = null;
  let questions = [];
  const byId = {};
  const figCache = {};      // blockId -> dataURI
  const loadedTopics = {};  // 't01' -> Promise

  const Manual = {
    get ready() { return !!data; },
    get data() { return data; },
    get questions() { return questions; },
    get exam() { return data ? data.exam : null; },
    topics() { return data ? data.topics : []; },
    topic(id) { return data ? data.topics.find((t) => t.id === id) : null; },
    question(id) { return byId[id]; },

    async load() {
      if (data) return data;
      try {
        const res = await fetch(BASE + 'manual.json');
        if (!res.ok) throw new Error('HTTP ' + res.status);
        data = await res.json();
      } catch (e) {
        console.warn('Manuali nuk u ngarkua', e);
        data = null; return null;
      }
      questions = [];
      data.topics.forEach((t) => {
        t.count = 0;
        t.blocks.forEach((b) => {
          b.items.forEach(([text, answer], i) => {
            const q = {
              id: `m${b.id}-${i + 1}`, chapter: t.id, block: b.id, type: 'tf', text, answer,
              fig: b.fig ? b.id : null, figLabel: b.label, source: 'manual', cats: ['A1', 'A2', 'B1', 'B'], explain: ''
            };
            questions.push(q); byId[q.id] = q; t.count++;
          });
        });
      });
      return data;
    },

    /* Ngarko figurat e temave të dhëna. Kthen true nëse janë gati. */
    figsReady(topicIds) { return topicIds.every((id) => loadedTopics[id] && loadedTopics[id].done); },
    loadFigs(topicIds) {
      return Promise.all(topicIds.map((id) => {
        if (!loadedTopics[id]) {
          const p = fetch(`${BASE}fig/${id}.json`).then((r) => r.json()).then((m) => { Object.assign(figCache, m); p.done = true; })
            .catch((e) => { console.warn('Figurat nuk u ngarkuan', id, e); p.done = true; });
          loadedTopics[id] = p;
        }
        return loadedTopics[id];
      }));
    },
    fig(blockId) { return figCache[blockId] || ''; }
  };

  window.Manual = Manual;
})();

/* ==========================================================
   LIBRI I TEORISË (DPSHTRR 2022) + Libërthi – assets/book/book.json
   ========================================================== */
(function () {
  let data = null;
  const byId = {};
  const order = [];
  const Book = {
    get ready() { return !!data; },
    get data() { return data; },
    temat() { return data ? data.temat : []; },
    routeId(sid) { return 'b' + sid.replace('.', '-'); },
    fromRoute(rid) { return rid && rid[0] === 'b' ? rid.slice(1).replace('-', '.') : null; },
    section(sid) { return byId[sid] || null; },
    order() { return order; },
    async load() {
      if (data) return data;
      try {
        const r = await fetch('assets/book/book.json');
        if (!r.ok) throw new Error('HTTP ' + r.status);
        data = await r.json();
      } catch (e) { console.warn('Libri nuk u ngarkua', e); return null; }
      data.temat.forEach((t) => t.sections.forEach((s) => { s.tema = t; byId[s.id] = s; order.push(s.id); }));
      return data;
    }
  };
  window.Book = Book;
})();
