/* ==========================================================
   VIEWS – faqet publike dhe të nxënësit
   ========================================================== */
(function () {
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const fmtDate = (iso) => { try { return new Date(iso).toLocaleString('sq-AL', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }); } catch (e) { return iso; } };
  const shuffle = (arr, rnd = Math.random) => { const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  /* Gjenerator i rastësishëm me farë (seed): i njëjti numër testi → të njëjtat pyetje */
  const seeded = (seed) => () => { seed |= 0; seed = (seed + 0x6D2B79F5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  const FIXED_TESTS = 100;
  const telHref = (p) => 'tel:+355' + String(p).replace(/\D/g, '').replace(/^0/, '');
  const mapsDir = (s) => `https://www.google.com/maps/dir/?api=1&destination=${s.lat},${s.lng}`;

  function toast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg; t.classList.add('show');
    clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove('show'), 2600);
  }

  /* Dritare konfirmimi brenda faqes (në vend të confirm() të shfletuesit) */
  function ask(message, okLabel = 'Po, vazhdo', danger = false) {
    return new Promise((resolve) => {
      const back = document.createElement('div');
      back.className = 'modal-back';
      back.innerHTML = `<div class="modal" role="alertdialog" aria-modal="true" style="width:min(460px,100%)">
        <p style="font-size:1.08rem;font-weight:600;color:var(--ink)">${esc(message)}</p>
        <div class="btn-row between mt-2"><button class="btn btn-outline" data-no>Anulo</button>
        <button class="btn ${danger ? 'btn-red' : 'btn-green'}" data-yes>${esc(okLabel)}</button></div></div>`;
      const done = (v) => { back.remove(); resolve(v); };
      back.addEventListener('click', (e) => {
        if (e.target === back || e.target.hasAttribute('data-no')) done(false);
        else if (e.target.hasAttribute('data-yes')) done(true);
      });
      document.body.appendChild(back);
      back.querySelector('[data-yes]').focus();
    });
  }

  function guestNotice() {
    if (Store.currentUser()) return '';
    return `<div class="notice mb-2"><span class="ico">i</span><div>Mund të mësosh dhe të testohesh pa llogari. <a href="#/regjistrohu"><strong>Krijo llogari</strong></a> nëse do që të ruhen rezultatet dhe përparimi yt.</div></div>`;
  }

  /* ======================= KRYEFAQJA ======================= */
  function home() {
    const s = Store.site();
    const u = Store.currentUser();
    const cats = Store.categories();
    const st = u ? Store.statsOf(u.id) : null;
    return `
    <section class="hero">
      <div class="container hero-inner">
        <div>
          <span class="badge badge-green">${window.Manual && Manual.ready ? Manual.questions.length.toLocaleString('sq-AL') + ' pyetje zyrtare nga manuali i DPSHTRR' : 'Platformë online për teorinë e patentës'}</span>
          <h1 class="mt-1">Mirë se vini në <span>${esc(s.name)}</span></h1>
          <p class="lead">${esc(s.heroText)}</p>
          <p class="hero-by">Krijuar nga ${esc(s.name)} · ${esc(s.slogan)}</p>
          <div class="btn-row mt-2">
            <a class="btn btn-green btn-lg" href="#/leksione${st && st.lastChapter ? '/' + st.lastChapter : ''}">▶ ${st && st.lastChapter ? 'Vazhdo mësimin' : 'Fillo mësimin'}</a>
            <a class="btn btn-red btn-lg" href="#/provimi">🏆 Bëj provim</a>
          </div>
        </div>
        <img class="hero-logo" src="assets/img/logo.png?v=2" alt="Logo e ${esc(s.name)}" width="360" height="360" />
      </div>
    </section>

    ${st ? `
    <section class="section-sm"><div class="container">
      <div class="card flex between">
        <div><strong>Përshëndetje, ${esc(u.name.split(' ')[0])}!</strong>
          <div class="muted small">Ke përfunduar ${st.lessonsDone} nga ${st.lessonsTotal} tema · ${st.examsDone} provime (${st.examsPassed} kaluar)</div></div>
        <div style="flex:1 1 200px;max-width:320px"><div class="progress"><div style="width:${st.lessonPct}%"></div></div></div>
        <a class="btn btn-outline" href="#/profili">Profili im</a>
      </div>
    </div></section>` : ''}

    <section class="section">
      <div class="container">
        <h2>Çfarë ofron platforma</h2>
        <p class="muted">Gjithçka që të duhet për provimin teorik, në një vend.</p>
        <div class="grid grid-4 mt-2">
          <a class="card feature" href="#/leksione"><div class="ico-circle">📖</div><h3 class="mb-0">25 tema mësimore</h3><p>Figurat dhe fjalitë zyrtare të manualit, me përgjigje, shpjegime dhe video.</p></a>
          <a class="card feature" href="#/teste"><div class="ico-circle">✅</div><h3 class="mb-0">Teste për çdo temë</h3><p>Ushtrohu me pyetjet zyrtare dhe shiko ku gabove.</p></a>
          <a class="card feature" href="#/provimi"><div class="ico-circle">⏱️</div><h3 class="mb-0">Simulim provimi</h3><p>40 pyetje, 40 minuta, maks. 4 gabime – si në provimin zyrtar.</p></a>
          <a class="card feature" href="#/autoshkollat"><div class="ico-circle">📍</div><h3 class="mb-0">Autoshkollat</h3><p>Harta e autoshkollave në Shqipëri me kontakte.</p></a>
        </div>
      </div>
    </section>

    <section class="section" style="background:#fff;border-block:1px solid var(--line)">
      <div class="container">
        <h2>Kategoritë e lejeve</h2>
        <p class="muted">Zgjidh kategorinë dhe fillo simulimin e provimit.</p>
        <div class="grid grid-4 mt-2">
          ${cats.map((c) => `
            <a class="card cat-card" href="#/provimi/${c.id}">
              <div class="cat-ico">${c.icon}</div>
              <div class="cat-letter">${esc(c.id)}</div>
              <div class="muted small">${esc(c.label)}</div>
            </a>`).join('')}
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container grid grid-2">
        <div>
          <h2>Rreth nesh</h2>
          <p>${esc(s.about)}</p>
          <div class="notice notice-green"><span class="ico">✓</span><div>Mësimet dhe testet bazë mund të hapen pa regjistrim. Nxënësi krijon llogari vetëm nëse dëshiron t’i ruhen rezultatet dhe përparimi.</div></div>
          ${!u ? `<div class="btn-row mt-2"><a class="btn btn-blue" href="#/regjistrohu">Krijo llogari falas</a><a class="btn btn-outline" href="#/hyr">Hyr</a></div>` : ''}
        </div>
        <div class="card" id="kontakt">
          <h3>Na kontaktoni</h3>
          <ul class="plain" style="display:grid;gap:12px">
            <li>📞 <a href="${telHref(s.phone)}"><strong>${esc(s.phone)}</strong></a></li>
            ${s.email ? `<li>✉️ <a href="mailto:${esc(s.email)}">${esc(s.email)}</a></li>` : ''}
            <li>🌐 ${esc(s.website)}</li>
            <li>📍 ${esc(s.address)}</li>
          </ul>
          <div class="btn-row mt-2">
            <a class="btn btn-green" href="${telHref(s.phone)}">Telefono tani</a>
            <a class="btn btn-outline" href="https://wa.me/355${String(s.phone).replace(/\D/g, '').replace(/^0/, '')}" target="_blank" rel="noopener">WhatsApp</a>
          </div>
        </div>
      </div>
    </section>`;
  }

  /* ======================= LEKSIONET ======================= */
  function chapterNav(activeId) {
    const p = Store.myProgress();
    return `
      <aside class="card chapter-list">
        <h3>Temat</h3>
        ${Store.chapters().map((c) => `
          <a href="#/leksione/${c.id}" class="${c.id === activeId ? 'active' : ''}">
            <span class="num">${c.order}</span><span>${esc(c.title)}</span>
            ${p && p.lessons[c.id] ? '<span class="done-mark" title="E përfunduar">✓</span>' : ''}
          </a>`).join('')}
      </aside>`;
  }

  /* Figura e një pyetjeje (nga manuali ose SVG) */
  function figHtml(q) {
    if (q.fig && window.Manual) {
      const src = Manual.fig(q.fig);
      return src ? `<img class="mfig" src="${src}" alt="Figura ${esc(q.figLabel || '')}" loading="lazy" />` : '';
    }
    if (q.sign) return SIGNS.render(q.sign);
    return '';
  }
  /* Siguron që figurat e temave të jenë ngarkuar; ndërkohë kthen një mesazh pritjeje */
  function ensureFigs(topicIds) {
    const ids = [...new Set(topicIds)].filter((id) => id && window.Manual && Manual.topic(id));
    if (!ids.length || Manual.figsReady(ids)) return null;
    Manual.loadFigs(ids).then(() => App.render());
    return `<div class="container section empty"><div class="spinner"></div><p class="mt-2">Duke ngarkuar figurat…</p></div>`;
  }
  const TEST_SIZE = 20;

  function lessons() {
    const p = Store.myProgress();
    const chs = Store.chapters();
    return `
    <div class="container page-head">
      <h1>Leksionet – 25 temat e programit</h1>
      <p>Programi ndjek temat e Manualit zyrtar të DPSHTRR për lejedrejtimi të kategorive A1, A2, B1 dhe B. Çdo temë ka figurat dhe fjalitë zyrtare me përgjigjet, shpjegime, video dhe testin përkatës.</p>
      ${guestNotice()}
    </div>
    <div class="container grid grid-3 section-sm">
      ${chs.map((c) => `
        <a class="card feature" href="#/leksione/${c.id}">
          <div class="flex between"><span class="badge badge-blue">Tema ${c.order}</span>${p && p.lessons[c.id] ? '<span class="badge badge-green">✓ Përfunduar</span>' : ''}</div>
          <h3 class="mt-1 mb-0">${esc(c.title)}</h3>
          ${c.summary ? `<p>${esc(c.summary)}</p>` : ''}
          <span class="small muted">${Store.questionsFor(c.id).length} pyetje</span>
        </a>`).join('')}
    </div>`;
  }

  function videoBlock(url) {
    if (!url) return `<div class="video-box"><div><div style="font-size:2.4rem">▶</div>Video shpjeguese për këtë temë do të shtohet së shpejti.</div></div>`;
    const m = url.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/);
    if (m) return `<div class="video-box"><iframe src="https://www.youtube-nocookie.com/embed/${m[1]}" title="Video e leksionit" allow="accelerometer; encrypted-media; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>`;
    return `<div class="video-box"><video src="${esc(url)}" controls style="width:100%;height:100%"></video></div>`;
  }

  /* Materiali zyrtar i temës: figura + fjalitë me përgjigje */
  function manualBlocks(topicId) {
    const t = window.Manual && Manual.topic(topicId);
    if (!t) return '';
    return `<div class="manual-list" id="manual-list">
      ${t.blocks.map((b) => ({ b, ok: b.items.filter(([, ans]) => ans) })).filter((x) => x.ok.length).map(({ b, ok }) => `
        <div class="mblock">
          ${b.fig ? `<div class="mblock-fig">${figHtml({ fig: b.id, figLabel: b.label })}<span class="small muted">${esc(b.label)}<br>Nr. ${esc(b.id)}</span></div>` : `<div class="small muted mblock-id">Nr. ${esc(b.id)}</div>`}
          <ol class="mstatements">
            ${ok.map(([text]) => `<li><span class="mtext">${esc(text)}</span></li>`).join('')}
          </ol>
        </div>`).join('')}
    </div>`;
  }

  function lesson(id) {
    const c = Store.chapter(id);
    if (!c) return notFound();
    const wait = ensureFigs([id]);
    if (wait) return wait;
    Store.setLastChapter(id);
    const chs = Store.chapters();
    const idx = chs.findIndex((x) => x.id === id);
    const prev = chs[idx - 1], next = chs[idx + 1];
    const done = Store.myProgress() && Store.myProgress().lessons[id];
    const pct = Math.round(((idx + (done ? 1 : 0)) / chs.length) * 100);
    const lastTest = Store.myProgress() ? [...Store.myProgress().tests].reverse().find((t) => t.chapterId === id) : null;
    const total = Store.questionsFor(id).length;
    const correctCount = Store.questionsFor(id).filter((q) => q.source === 'manual' && q.answer === true).length;
    const objectives = c.objectives && c.objectives.length ? c.objectives
      : [`Të njohësh rregullat e temës “${c.title}” sipas manualit zyrtar të DPSHTRR.`, 'Të dallosh fjalitë e sakta nga ato të gabuara për çdo figurë.', 'Të përgatitesh për pyetjet e kësaj teme në provimin teorik.'];
    const hasTheory = (c.theory && c.theory.length) || (c.signs || []).length;
    let step = 0;

    return `
    <div class="container section-sm">
      <div class="lesson-layout">
        ${chapterNav(id)}
        <article class="card lesson-body">
          <span class="badge badge-blue">Tema ${c.order} nga ${chs.length}</span>
          <h2 class="mt-1 mb-0">${esc(c.title)}</h2>
          ${c.fullTitle && c.fullTitle.toLowerCase() !== c.title.toLowerCase() ? `<p class="small muted mt-1">${esc(c.fullTitle)}</p>` : ''}

          <section class="lesson-section">
            <h3><span class="step">${++step}</span> Objektivat e mësimit</h3>
            <ul class="objectives">${objectives.map((o) => `<li>${esc(o)}</li>`).join('')}</ul>
          </section>

          ${hasTheory ? `
          <section class="lesson-section">
            <h3><span class="step">${++step}</span> Shpjegimi teorik</h3>
            ${(c.theory || []).map((t) => `<p>${esc(t)}</p>`).join('')}
            ${(c.signs || []).length ? `<div class="sign-grid">${c.signs.map((k) => `
              <div class="sign-item">${SIGNS.render(k)}<strong>${esc(SIGNS.all[k] ? SIGNS.all[k].name : k)}</strong><span>${esc(SIGNS.all[k] ? SIGNS.all[k].desc : '')}</span></div>`).join('')}</div>` : ''}
          </section>` : ''}

          <section class="lesson-section">
            <h3><span class="step">${++step}</span> Figurat dhe rregullat e sakta</h3>
            <p class="small muted">Nga Manuali i DPSHTRR – shfaqen vetëm fjalitë e sakta (${correctCount} fjali). Fjalitë e gabuara i gjen te testet.</p>
            ${manualBlocks(id) || '<p class="muted">Materiali i manualit nuk u ngarkua.</p>'}
          </section>

          <section class="lesson-section">
            <h3><span class="step">${++step}</span> Video shpjeguese</h3>
            ${videoBlock(c.video)}
          </section>

          ${(c.examples || []).length || c.summary ? `
          <section class="lesson-section">
            <h3><span class="step">${++step}</span> Shembuj praktikë</h3>
            ${(c.examples || []).map((e) => `<div class="example"><strong>${esc(e.title)}:</strong> ${esc(e.text)}</div>`).join('')}
            ${c.summary ? `<div class="notice notice-green mt-2"><span class="ico">★</span><div><strong>Përmbledhje:</strong> ${esc(c.summary)}</div></div>` : ''}
          </section>` : ''}

          <section class="lesson-section">
            <h3><span class="step">${++step}</span> Testi i temës</h3>
            <p>Test me ${Math.min(TEST_SIZE, total)} pyetje të rastësishme nga kjo temë, ose të gjitha ${total} pyetjet. Në fund shikon rezultatin dhe përgjigjet e sakta për gabimet.</p>
            ${lastTest ? `<p class="small muted">Rezultati yt i fundit: <strong>${lastTest.correct}/${lastTest.total}</strong> (${fmtDate(lastTest.date)})</p>` : ''}
            <div class="btn-row">
              <a class="btn btn-blue btn-lg" href="#/teste/${id}">☑ Bëj testin e temës</a>
              <a class="btn btn-outline btn-lg" href="#/teste/${id}/te-gjitha">Të gjitha pyetjet (${total})</a>
            </div>
          </section>

          <section class="lesson-section">
            <p class="small muted mb-0">Progresi i kursit</p>
            <div class="flex"><div class="progress" style="flex:1"><div style="width:${pct}%"></div></div><strong>${pct}%</strong></div>
            <div class="btn-row mt-2 between">
              ${prev ? `<a class="btn btn-outline" href="#/leksione/${prev.id}">← ${esc(prev.title)}</a>` : '<span></span>'}
              ${Store.currentUser()
                ? (done ? '<span class="badge badge-green">✓ Tema është shënuar si e përfunduar</span>' : `<button class="btn btn-green" data-action="mark-done" data-id="${id}">✓ Shëno si të përfunduar</button>`)
                : '<a class="btn btn-outline" href="#/regjistrohu">Regjistrohu për të ruajtur progresin</a>'}
              ${next ? `<a class="btn btn-outline" href="#/leksione/${next.id}">${esc(next.title)} →</a>` : ''}
            </div>
          </section>
        </article>
      </div>
    </div>`;
  }

  /* ======================= TESTET ======================= */
  function tests() {
    const p = Store.myProgress();
    return `
    <div class="container page-head">
      <h1>Teste për çdo temë</h1>
      <p>Ushtrohu temë pas teme me pyetjet zyrtare të manualit të DPSHTRR. Zgjidh një test me ${TEST_SIZE} pyetje të rastësishme ose të gjitha pyetjet e temës.</p>
      ${guestNotice()}
    </div>
    <div class="container section-sm">
      <div class="card table-wrap" style="padding:0">
        <table class="data">
          <thead><tr><th>Tema</th><th>Pyetje</th><th>Rezultati i fundit</th><th></th></tr></thead>
          <tbody>
            ${Store.chapters().map((c) => {
              const last = p ? [...p.tests].reverse().find((t) => t.chapterId === c.id) : null;
              const n = Store.questionsFor(c.id).length;
              return `<tr>
                <td><strong>${c.order}. ${esc(c.title)}</strong></td>
                <td>${n}</td>
                <td>${last ? `<span class="badge ${last.correct === last.total ? 'badge-green' : 'badge-blue'}">${last.correct}/${last.total}</span>` : '<span class="muted">–</span>'}</td>
                <td style="text-align:right;white-space:nowrap">
                  <a class="btn btn-blue btn-sm" href="#/teste/${c.id}">Test ${Math.min(TEST_SIZE, n)}</a>
                  <a class="btn btn-outline btn-sm" href="#/teste/${c.id}/te-gjitha">Të gjitha</a>
                </td>
              </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>
      <div class="card mt-2 flex between">
        <div><strong>Gati për provë të plotë?</strong><div class="muted small">40 pyetje si në provimin zyrtar, 40 minuta, maks. 4 gabime.</div></div>
        <a class="btn btn-red" href="#/provimi">🏆 Bëj provim</a>
      </div>
    </div>`;
  }

  /* ======================= MOTORI I PYETJEVE ======================= */
  const Quiz = {
    state: null,
    stop() { if (this.state && this.state.timer) clearInterval(this.state.timer); this.state = null; },

    start(opts) {
      this.stop();
      this.state = Object.assign({ idx: 0, answers: [], startedAt: Date.now(), finished: false }, opts);
      this.state.answers = new Array(this.state.questions.length).fill(null);
      if (this.state.mode === 'exam') {
        this.state.deadline = Date.now() + this.state.minutes * 60 * 1000;
        this.state.timer = setInterval(() => this.tick(), 1000);
      }
    },

    tick() {
      const s = this.state; if (!s || s.finished) return;
      const left = Math.max(0, s.deadline - Date.now());
      const el = document.getElementById('timer');
      if (el) {
        const m = Math.floor(left / 60000), sec = Math.floor((left % 60000) / 1000);
        el.textContent = `⏱ ${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
        el.classList.toggle('low', left < 5 * 60 * 1000);
      }
      if (left <= 0) { toast('Koha mbaroi! Provimi u dorëzua automatikisht.'); this.finish(true); }
    },

    isCorrect(q, a) { return a !== null && a !== undefined && a === q.answer; },

    renderQuestion() {
      const s = this.state, q = s.questions[s.idx], a = s.answers[s.idx];
      const total = s.questions.length;
      const optionsHtml = q.type === 'tf'
        ? `<div class="options tf">
            <button class="option ${a === true ? 'selected' : ''}" data-answer="true">Saktë</button>
            <button class="option ${a === false ? 'selected' : ''}" data-answer="false">Gabim</button>
          </div>`
        : `<div class="options">${q.options.map((o, i) => `
            <button class="option ${a === i ? 'selected' : ''}" data-answer="${i}"><span class="letter">${'ABCDEF'[i]}</span>${esc(o)}</button>`).join('')}</div>`;
      const answeredCount = s.answers.filter((x) => x !== null).length;

      return `
      <div class="quiz-wrap">
        <div class="quiz-top">
          <div class="flex">
            ${s.mode === 'exam' ? `<span class="badge badge-red">🚗 ${esc(s.catName)}</span>` : `<span class="badge badge-blue">${esc(s.title)}</span>`}
            <span class="q-count">Pyetja ${s.idx + 1} nga ${total}</span>
          </div>
          ${s.mode === 'exam' ? `<span class="timer" id="timer">⏱ --:--</span>` : ''}
        </div>
        <div class="progress mb-2"><div style="width:${Math.round((answeredCount / total) * 100)}%"></div></div>
        <div class="card">
          ${q.type === 'tf' ? '<div class="small muted">Vlerëso fjalinë: Saktë apo Gabim?</div>' : ''}
          ${q.fig || q.sign ? `<div class="q-figure">${figHtml(q)}</div>` : ''}
          ${q.source === 'manual' ? `<div class="small muted" style="text-align:center">Nr. ${esc(q.block)}</div>` : ''}
          <div class="q-text">${esc(q.text)}</div>
          ${optionsHtml}
          <div class="q-nav">
            <button class="btn btn-outline" data-action="q-prev" ${s.idx === 0 ? 'disabled' : ''}>← Mbrapa</button>
            ${s.idx < total - 1
              ? `<button class="btn btn-blue" data-action="q-next">Pyetja tjetër →</button>`
              : `<button class="btn btn-green" data-action="q-finish">✓ Përfundo dhe shiko rezultatin</button>`}
          </div>
        </div>
        <div class="flex between mt-2">
          <span class="small muted">Përgjigjur: ${answeredCount} / ${total}</span>
          ${s.idx < total - 1 ? `<button class="btn btn-ghost btn-sm" data-action="q-finish">Dorëzo tani</button>` : ''}
        </div>
        <div class="q-dots" aria-label="Lista e pyetjeve">
          ${s.questions.map((_, i) => `<button class="${s.answers[i] !== null ? 'answered' : ''} ${i === s.idx ? 'current' : ''}" data-goto="${i}" aria-label="Pyetja ${i + 1}">${i + 1}</button>`).join('')}
        </div>
      </div>`;
    },

    answerText(q, a) {
      if (a === null || a === undefined) return '<em>Pa përgjigje</em>';
      if (q.type === 'tf') return a ? 'Saktë' : 'Gabim';
      return esc(q.options[a]);
    },

    async finish(auto = false) {
      const s = this.state; if (!s || s.finished) return;
      const unanswered = s.answers.filter((x) => x === null).length;
      if (!auto && unanswered) {
        const extra = s.mode === 'exam' ? ' Pyetjet pa përgjigje llogariten si gabime.' : '';
        if (!(await ask(`Ke ${unanswered} pyetje pa përgjigje.${extra} Do ta dorëzosh?`, 'Po, dorëzo'))) return;
        if (this.state !== s || s.finished) return;
      }
      s.finished = true;
      if (s.timer) clearInterval(s.timer);
      const results = s.questions.map((q, i) => ({ q, a: s.answers[i], ok: this.isCorrect(q, s.answers[i]) }));
      const correct = results.filter((r) => r.ok).length;
      const errors = results.length - correct;
      const rec = {
        id: Store.uid('r'), date: new Date().toISOString(), total: results.length, correct, errors,
        wrong: results.filter((r) => !r.ok).map((r) => r.q.id),
        durationSec: Math.round((Date.now() - s.startedAt) / 1000)
      };
      let saved = false;
      if (s.mode === 'exam') {
        rec.cat = s.cat; rec.testNo = s.testNo || 0; rec.maxErrors = s.maxErrors; rec.passed = errors <= s.maxErrors;
        saved = Store.addExam(rec);
      } else {
        rec.chapterId = s.chapterId;
        saved = Store.addTest(rec);
      }
      s.result = { results, rec, saved };
      App.render();
    },

    renderResult() {
      const s = this.state, { results, rec, saved } = s.result;
      const wrong = results.filter((r) => !r.ok);
      const isExam = s.mode === 'exam';
      const pass = isExam ? rec.passed : rec.correct === rec.total;
      const mm = Math.floor(rec.durationSec / 60), ss = rec.durationSec % 60;
      return `
      <div class="quiz-wrap">
        <div class="card result-hero">
          ${isExam
            ? `<div class="big ${pass ? 'result-pass' : 'result-fail'}">${pass ? '✓ KALON' : '✗ NUK KALON'}</div>
               <p class="mt-2">${esc(s.catName)} · <strong>${rec.correct}</strong> të sakta, <strong>${rec.errors}</strong> gabime (lejohen maks. ${rec.maxErrors})</p>`
            : `<div class="big ${pass ? 'result-pass' : ''}">${rec.correct} / ${rec.total}</div>
               <p class="mt-2">${pass ? 'Shkëlqyeshëm! Të gjitha përgjigjet janë të sakta.' : `Ke ${rec.errors} përgjigje të gabuara. Shiko përgjigjet më poshtë: jeshile = të sakta, të kuqe = gabime.`}</p>`}
          <p class="muted small">Koha: ${mm} min ${ss} sek</p>
          ${saved ? '<span class="badge badge-green">Rezultati u ruajt në profilin tënd</span>' : '<span class="badge">Rezultati nuk u ruajt – <a href="#/regjistrohu">krijo llogari</a> për ta ruajtur</span>'}
          <div class="btn-row mt-2" style="justify-content:center">
            <button class="btn btn-blue" data-action="q-retry">↻ Përsërit ${isExam ? 'provimin' : 'testin'}</button>
            ${isExam ? `${s.testNo && s.testNo < FIXED_TESTS ? `<a class="btn btn-green" href="#/provimi/${s.cat}/${s.testNo + 1}">Testi ${s.testNo + 1} →</a>` : ''}<a class="btn btn-outline" href="#/provimi/${s.cat}">Të gjitha testet</a>` : `<a class="btn btn-outline" href="#/leksione/${s.chapterId}">Kthehu te leksioni</a>`}
            <button class="btn btn-outline" data-action="scroll-review">Shiko përgjigjet</button>
          </div>
        </div>

        <div class="flex between mt-3" id="rishikimi">
          <h2 class="mb-0">Përgjigjet e tua</h2>
          <div class="review-filter" role="tablist">
            <button class="active" data-rfilter="all">Të gjitha (${results.length})</button>
            <button data-rfilter="ok">✓ Të sakta (${results.length - wrong.length})</button>
            <button data-rfilter="no">✗ Të gabuara (${wrong.length})</button>
          </div>
        </div>
        <div class="review-list mt-2" id="review-list">
        ${results.map((r, i) => `
          <div class="rv ${r.ok ? 'rv-ok' : 'rv-no'}">
            <div class="rv-head"><span class="rv-num">${i + 1}</span><span class="rv-status">${r.ok ? '✓ PËRGJIGJE E SAKTË' : (r.a === null || r.a === undefined ? '✗ PA PËRGJIGJE' : '✗ PËRGJIGJE E GABUAR')}</span></div>
            <div class="rv-body">
              ${r.q.fig || r.q.sign ? `<div class="review-fig">${figHtml(r.q)}</div>` : ''}
              <div style="flex:1">
                <div class="rv-text">${esc(r.q.text)}</div>
                <div class="rv-answers">
                  <span class="rv-pill ${r.ok ? 'pill-ok' : 'pill-no'}">Përgjigja jote: ${this.answerText(r.q, r.a)}</span>
                  ${r.ok ? '' : `<span class="rv-pill pill-ok">Përgjigja e duhur: ${this.answerText(r.q, r.q.answer)}</span>`}
                </div>
                ${!r.ok && r.q.explain ? `<div class="explain">💡 ${esc(r.q.explain)}</div>` : ''}
              </div>
            </div>
          </div>`).join('')}
        </div>
      </div>`;
    }
  };

  /* Zgjedh pyetje nga blloqe (figura) të ndryshme */
  function pickDistinct(pool, n, rnd = Math.random) {
    const out = [], usedBlocks = new Set();
    for (const q of shuffle(pool, rnd)) {
      if (out.length >= n) break;
      const key = q.block || q.id;
      if (usedBlocks.has(key)) continue;
      usedBlocks.add(key); out.push(q);
    }
    if (out.length < n) for (const q of shuffle(pool, rnd)) { if (out.length >= n) break; if (!out.includes(q)) out.push(q); }
    return out;
  }

  function chapterTest(id, sub) {
    const c = Store.chapter(id);
    if (!c) return notFound();
    const all = sub === 'te-gjitha';
    const wait = ensureFigs([id]);
    if (wait) return wait;
    const qs = Store.questionsFor(id);
    if (!Quiz.state || Quiz.state.chapterId !== id || Quiz.state.mode !== 'test' || Quiz.state.all !== all) {
      if (!qs.length) return `<div class="container section empty">Kjo temë nuk ka ende pyetje.</div>`;
      Quiz.start({ mode: 'test', chapterId: id, all, title: `Tema ${c.order}: ${c.title}`, questions: all ? qs.slice() : pickDistinct(qs, TEST_SIZE) });
    }
    return `<div class="container section-sm">${Quiz.state.finished ? Quiz.renderResult() : Quiz.renderQuestion()}</div>`;
  }

  /* ======================= PROVIMI ======================= */
  function officialExam() {
    return window.Manual && Manual.ready && Manual.exam;
  }

  function examSelect() {
    const u = Store.currentUser();
    const off = officialExam();
    return `
    <div class="container page-head">
      <h1>Simulimi i provimit të patentës</h1>
      <p>Provim i ndarë nga leksionet, që funksionon si simulim i provimit teorik zyrtar sipas kategorisë së zgjedhur: pyetje me figura, kohëmatës, kufi gabimesh dhe rezultat <strong>Kalon / Nuk kalon</strong>.</p>
      ${off ? `<div class="notice notice-green mb-2"><span class="ico">✓</span><div>Sipas Manualit të DPSHTRR: <strong>40 pyetje</strong> (2 nga çdo temë 1–15 dhe 1 nga çdo temë 16–25), <strong>40 minuta</strong>, lejohen <strong>maks. 4 gabime</strong>. Pyetjet zgjidhen rastësisht nga ${Manual.questions.length.toLocaleString('sq-AL')} fjalitë zyrtare.</div></div>` : ''}
      <div class="notice notice-red"><span class="ico">!</span><div>Ky test është <strong>simulim për përgatitje</strong>, jo provim zyrtar.</div></div>
    </div>
    <div class="container section-sm">
      <h2>Zgjidh kategorinë</h2>
      <div class="grid grid-4 mt-2">
        ${Store.categories().map((c) => {
          const avail = Store.questionsForCategory(c.id).length;
          return `
          <div class="card cat-card ${u && u.category === c.id ? 'selected' : ''}">
            <div class="cat-ico">${c.icon}</div>
            <div class="cat-letter">${esc(c.id)}</div>
            <div class="muted small mb-2">${esc(c.label)}</div>
            <div class="small">📝 ${Math.min(c.questions, avail)} pyetje · ⏱ ${c.minutes} min</div>
            <div class="small mb-2">❌ Maks. ${c.maxErrors} gabime</div>
            <a class="btn btn-red btn-block" href="#/provimi/${c.id}">Hap testet</a>
          </div>`;
        }).join('')}
      </div>
    </div>`;
  }

  function buildExam(c, testNo) {
    const off = officialExam();
    const rnd = testNo ? seeded(testNo * 7919 + 17) : Math.random;
    const pool = Store.questionsForCategory(c.id).filter((q) => !testNo || q.source === 'manual');
    if (off && c.questions === off.questions) {
      const qs = [];
      Store.chapters().forEach((ch) => {
        const t = Manual.topic(ch.id); if (!t) return;
        const n = off.perTopic[String(t.num)] || 0;
        qs.push(...pickDistinct(pool.filter((q) => q.chapter === ch.id), n, rnd));
      });
      if (qs.length >= c.questions) return qs.slice(0, c.questions);
      return qs.concat(shuffle(pool.filter((q) => !qs.includes(q)), rnd).slice(0, c.questions - qs.length));
    }
    return pickDistinct(pool, c.questions, rnd);
  }

  /* Faqja e kategorisë: Simulim i testit zyrtar + Testi 1…N */
  function examCategory(c) {
    const p = Store.myProgress();
    const results = {};
    if (p) p.exams.filter((e) => e.cat === c.id).forEach((e) => {
      const k = e.testNo || 0;
      if (!results[k] || e.correct > results[k].correct) results[k] = e;
    });
    const badge = (r) => !r ? '' : `<span class="tbadge ${r.passed ? 'ok' : 'no'}">${r.passed ? '✓' : '✗'} ${r.errors} gab.</span>`;
    const done = Object.keys(results).filter((k) => k !== '0').length;
    return `
    <div class="container page-head">
      <a href="#/provimi" class="btn btn-ghost btn-sm">← Të gjitha kategoritë</a>
      <h1 class="mt-1">${c.icon} ${esc(c.name)} <span class="muted" style="font-size:.6em">${esc(c.label)}</span></h1>
      <p>Çdo test ka ${c.questions} pyetje, ${c.minutes} minuta dhe lejohen maks. ${c.maxErrors} gabime. <strong>Simulimi i testit zyrtar</strong> zgjedh pyetje të reja çdo herë; <strong>Testet 1–${FIXED_TESTS}</strong> kanë gjithmonë të njëjtat pyetje, që të mund t’i përsërisësh.</p>
      ${p ? `<p class="small muted">Ke kryer ${done} nga ${FIXED_TESTS} testet.</p>` : guestNotice()}
    </div>
    <div class="container section-sm">
      <div class="test-grid">
        <a class="test-btn test-main" href="#/provimi/${c.id}/rastesishem">🎲 Simulim i Testit Zyrtar ${badge(results[0])}</a>
        ${Array.from({ length: FIXED_TESTS }, (_, i) => i + 1).map((n) => `<a class="test-btn ${results[n] ? (results[n].passed ? 'is-ok' : 'is-no') : ''}" href="#/provimi/${c.id}/${n}">Testi ${n}${badge(results[n])}</a>`).join('')}
      </div>
    </div>`;
  }

  function exam(catId, sub) {
    const c = Store.category(catId);
    if (!c) return notFound();
    if (!sub) { if (Quiz.state && Quiz.state.mode === 'exam') Quiz.stop(); return examCategory(c); }
    const testNo = sub === 'rastesishem' ? 0 : parseInt(sub, 10);
    if (sub !== 'rastesishem' && !(testNo >= 1 && testNo <= FIXED_TESTS)) return notFound();
    if (!Quiz.state || Quiz.state.mode !== 'exam' || Quiz.state.cat !== catId || Quiz.state.testNo !== testNo) {
      const wait = ensureFigs(Store.chapters().map((x) => x.id));
      if (wait) return wait;
      const qs = buildExam(c, testNo);
      if (!qs.length) return `<div class="container section empty">Nuk ka ende pyetje për ${esc(c.name)}.</div>`;
      Quiz.start({ mode: 'exam', cat: c.id, testNo, catName: c.name + (testNo ? ` · Testi ${testNo}` : ' · Simulim'), minutes: c.minutes, maxErrors: c.maxErrors, questions: qs });
    }
    return `<div class="container section-sm">${Quiz.state.finished ? Quiz.renderResult() : Quiz.renderQuestion()}</div>`;
  }

  /* ======================= AUTOSHKOLLAT ======================= */
  function schools() {
    const list = Store.schools();
    const cities = [...new Set(list.map((s) => s.city))].sort();
    return `
    <div class="container page-head">
      <h1>Autoshkollat në Shqipëri</h1>
      <p>Gjej autoshkollën më të afërt: kërko sipas qytetit ose emrit, shiko kontaktet dhe hap rrugën në Google Maps. Të dhënat mblidhen dhe verifikohen përpara publikimit.</p>
    </div>
    <div class="container section-sm">
      <div class="search-bar">
        <input type="search" id="school-q" placeholder="Kërko sipas qytetit ose emrit…" aria-label="Kërko autoshkollë" />
        <select id="school-city" aria-label="Filtro sipas qytetit">
          <option value="">Të gjitha qytetet</option>
          ${cities.map((c) => `<option>${esc(c)}</option>`).join('')}
        </select>
      </div>
      <div class="schools-layout">
        <div id="map"><div class="map-fallback">Harta po ngarkohet…</div></div>
        <div class="school-list" id="school-list">${schoolCards(list)}</div>
      </div>
    </div>`;
  }

  function schoolCards(list) {
    if (!list.length) return `<div class="empty">Nuk u gjet asnjë autoshkollë.</div>`;
    return list.map((s) => `
      <div class="card school-card" data-school="${s.id}">
        <div class="flex between">
          <h3>${esc(s.name)}</h3>
          ${s.verified ? '<span class="badge badge-green">✓ E verifikuar</span>' : (s.demo ? '<span class="badge">Shembull</span>' : '<span class="badge">Në verifikim</span>')}
        </div>
        <div class="muted small">📍 ${esc(s.address || s.city)}</div>
        ${s.phone ? `<div class="small">📞 <a href="${telHref(s.phone)}">${esc(s.phone)}</a></div>` : ''}
        <div class="btn-row mt-1">
          <a class="btn btn-outline btn-sm" href="#/autoshkollat/${s.id}">Profili</a>
          <a class="btn btn-green btn-sm" href="${mapsDir(s)}" target="_blank" rel="noopener">📍 Shiko në hartë / Rruga</a>
        </div>
      </div>`).join('');
  }

  /* Kontrollon nëse hartat e OpenStreetMap mund të ngarkohen (p.sh. bllokohen në pamje paraprake) */
  let osmProbe = null;
  function osmAvailable() {
    if (!osmProbe) osmProbe = new Promise((res) => {
      const img = new Image(); const t = setTimeout(() => res(false), 4000);
      img.onload = () => { clearTimeout(t); res(true); };
      img.onerror = () => { clearTimeout(t); res(false); };
      img.src = 'https://tile.openstreetmap.org/7/70/48.png';
    });
    return osmProbe;
  }
  const MAP_OFF = '<div class="map-fallback"><div><div style="font-size:2.4rem">🗺️</div><strong>Harta interaktive</strong><br>Shfaqet kur faqja të jetë online në domain-in e saj.<br>Ndërkohë përdor listën dhe butonin “Shiko në hartë”.</div></div>';

  let mapObj = null, markers = {};
  function initSchoolsMap() {
    const el = document.getElementById('map');
    if (!el) return;
    const q = document.getElementById('school-q'), city = document.getElementById('school-city');
    const filter = () => {
      const t = q.value.trim().toLowerCase(), c = city.value;
      const list = Store.schools().filter((s) => (!c || s.city === c) && (!t || (s.name + ' ' + s.city + ' ' + (s.address || '')).toLowerCase().includes(t)));
      document.getElementById('school-list').innerHTML = schoolCards(list);
      if (mapObj) {
        Object.entries(markers).forEach(([id, m]) => { if (list.some((s) => s.id === id)) m.addTo(mapObj); else m.remove(); });
        if (list.length) mapObj.fitBounds(list.map((s) => [s.lat, s.lng]), { padding: [40, 40], maxZoom: 12 });
      }
    };
    q.addEventListener('input', filter);
    city.addEventListener('change', filter);

    const build = () => {
      if (!window.L) { el.innerHTML = '<div class="map-fallback">Harta nuk mund të ngarkohet tani (kërkon internet). Lista e autoshkollave është në të djathtë.</div>'; return; }
      el.innerHTML = '';
      mapObj = L.map(el, { scrollWheelZoom: false }).setView([41.15, 20.0], 7);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '© OpenStreetMap' }).addTo(mapObj);
      markers = {};
      Store.schools().forEach((s) => {
        markers[s.id] = L.marker([s.lat, s.lng]).addTo(mapObj)
          .bindPopup(`<strong>${esc(s.name)}</strong><br>${esc(s.city)}<br><a href="#/autoshkollat/${s.id}">Profili</a> · <a href="${mapsDir(s)}" target="_blank" rel="noopener">Rruga</a>`);
      });
    };
    mapObj = null;
    osmAvailable().then((ok) => {
      if (document.getElementById('map') !== el) return;
      if (!ok) { el.innerHTML = MAP_OFF; return; }
      if (window.L) build();
      else { let tries = 0; const iv = setInterval(() => { tries++; if (window.L || tries > 20) { clearInterval(iv); if (document.getElementById('map') === el) build(); } }, 250); }
    });
  }

  function schoolProfile(id) {
    const s = Store.school(id);
    if (!s) return notFound();
    return `
    <div class="container section-sm">
      <a href="#/autoshkollat" class="btn btn-ghost btn-sm">← Të gjitha autoshkollat</a>
      <div class="grid grid-2 mt-2">
        <div class="card">
          <div class="flex between"><h1 class="mb-0">${esc(s.name)}</h1>
            ${s.verified ? '<span class="badge badge-green">✓ E verifikuar</span>' : '<span class="badge">Shembull / në verifikim</span>'}</div>
          <p class="muted mt-1">${esc(s.description || '')}</p>
          <ul class="plain" style="display:grid;gap:10px">
            <li>📍 <strong>Adresa:</strong> ${esc(s.address || s.city)}</li>
            <li>🏙️ <strong>Qyteti:</strong> ${esc(s.city)}</li>
            ${s.phone ? `<li>📞 <strong>Telefon:</strong> <a href="${telHref(s.phone)}">${esc(s.phone)}</a></li>` : ''}
            ${s.email ? `<li>✉️ <strong>Email:</strong> <a href="mailto:${esc(s.email)}">${esc(s.email)}</a></li>` : ''}
            ${s.website ? `<li>🌐 <strong>Website:</strong> ${esc(s.website)}</li>` : ''}
            <li>🚗 <strong>Kategoritë:</strong> ${(s.categories || []).map((c) => `<span class="badge badge-blue">${esc(c)}</span>`).join(' ')}</li>
          </ul>
          <div class="btn-row mt-2">
            <a class="btn btn-green" href="${mapsDir(s)}" target="_blank" rel="noopener">📍 Hap rrugën në Google Maps</a>
            ${s.phone ? `<a class="btn btn-outline" href="${telHref(s.phone)}">Telefono</a>` : ''}
          </div>
        </div>
        <div class="card" id="school-map" style="padding:0;overflow:hidden;min-height:340px">
          <iframe title="Harta e ${esc(s.name)}" style="width:100%;height:100%;min-height:340px;border:0" loading="lazy"
            src="https://www.openstreetmap.org/export/embed.html?bbox=${s.lng - 0.02},${s.lat - 0.012},${s.lng + 0.02},${s.lat + 0.012}&layer=mapnik&marker=${s.lat},${s.lng}"></iframe>
        </div>
      </div>
    </div>`;
  }

  /* ======================= LLOGARIA ======================= */
  function auth(mode) {
    if (Store.currentUser()) { location.hash = '#/profili'; return ''; }
    const cats = Store.categories();
    return `
    <div class="container">
      <div class="card auth-box">
        <div class="tabs" role="tablist">
          <button class="${mode === 'login' ? 'active' : ''}" onclick="location.hash='#/hyr'">Hyr</button>
          <button class="${mode === 'register' ? 'active' : ''}" onclick="location.hash='#/regjistrohu'">Regjistrohu</button>
        </div>
        ${mode === 'login' ? `
          <h2>Hyr në llogari</h2>
          <form id="login-form" novalidate>
            <div class="field"><label for="l-email">Email</label><input id="l-email" type="email" required autocomplete="email" /></div>
            <div class="field"><label for="l-pass">Fjalëkalimi</label><input id="l-pass" type="password" required autocomplete="current-password" /></div>
            <div class="form-error" id="auth-err"></div>
            <button class="btn btn-green btn-block btn-lg" type="submit">Hyr</button>
          </form>
          <p class="small muted mt-2">Nuk ke llogari? <a href="#/regjistrohu">Regjistrohu falas</a></p>`
        : `
          <h2>Krijo llogari nxënësi</h2>
          <p class="small muted">Llogaria ruan leksionet që ke studiuar, testet, rezultatet dhe pyetjet që ke gabuar.</p>
          <form id="register-form" novalidate>
            <div class="field"><label for="r-name">Emri dhe mbiemri</label><input id="r-name" required autocomplete="name" /></div>
            <div class="field"><label for="r-email">Email</label><input id="r-email" type="email" required autocomplete="email" /></div>
            <div class="field-row">
              <div class="field"><label for="r-phone">Telefoni (opsional)</label><input id="r-phone" type="tel" autocomplete="tel" /></div>
              <div class="field"><label for="r-cat">Kategoria</label><select id="r-cat">${cats.map((c) => `<option value="${c.id}" ${c.id === 'B' ? 'selected' : ''}>${esc(c.name)} – ${esc(c.label)}</option>`).join('')}</select></div>
            </div>
            <div class="field"><label for="r-pass">Fjalëkalimi (min. 6 karaktere)</label><input id="r-pass" type="password" required minlength="6" autocomplete="new-password" /></div>
            <div class="form-error" id="auth-err"></div>
            <button class="btn btn-green btn-block btn-lg" type="submit">Krijo llogarinë</button>
          </form>
          <p class="small muted mt-2">Ke llogari? <a href="#/hyr">Hyr këtu</a></p>`}
      </div>
    </div>`;
  }

  function bindAuth() {
    const err = (m) => { const e = document.getElementById('auth-err'); if (e) e.textContent = m; };
    const lf = document.getElementById('login-form');
    if (lf) lf.addEventListener('submit', async (e) => {
      e.preventDefault();
      try {
        const u = await Store.login(document.getElementById('l-email').value, document.getElementById('l-pass').value);
        toast('Mirë se erdhe, ' + u.name.split(' ')[0] + '!');
        location.hash = u.role === 'admin' ? '#/admin' : '#/profili';
      } catch (ex) { err(ex.message); }
    });
    const rf = document.getElementById('register-form');
    if (rf) rf.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('r-name').value.trim();
      const email = document.getElementById('r-email').value.trim();
      const pass = document.getElementById('r-pass').value;
      if (name.length < 3) return err('Shkruaj emrin dhe mbiemrin.');
      if (!/^\S+@\S+\.\S+$/.test(email)) return err('Email-i nuk është i saktë.');
      if (pass.length < 6) return err('Fjalëkalimi duhet të ketë të paktën 6 karaktere.');
      try {
        await Store.register({ name, email, phone: document.getElementById('r-phone').value, category: document.getElementById('r-cat').value, password: pass });
        toast('Llogaria u krijua! Progresi yt tani ruhet.');
        location.hash = '#/profili';
      } catch (ex) { err(ex.message); }
    });
  }

  /* ======================= PROFILI ======================= */
  function studentReport(user, opts = {}) {
    const st = Store.statsOf(user.id);
    const p = Store.progressOf(user.id);
    const chs = Store.chapters();
    const wrongList = Object.entries(st.wrongIds).sort((a, b) => b[1] - a[1]).map(([id, n]) => ({ q: Store.question(id), n })).filter((x) => x.q);
    if (window.Manual) {
      const wTopics = [...new Set(wrongList.slice(0, 15).map((w) => w.q.chapter))].filter((id) => Manual.topic(id));
      if (wTopics.length && !Manual.figsReady(wTopics)) Manual.loadFigs(wTopics).then(() => App.render());
    }
    const lastCh = st.lastChapter ? Store.chapter(st.lastChapter) : null;
    return `
      <div class="grid grid-4">
        <div class="card stat"><div class="num">${st.lessonsDone}/${st.lessonsTotal}</div><div class="lbl">Tema të përfunduara</div></div>
        <div class="card stat"><div class="num">${st.testsDone}</div><div class="lbl">Teste temash</div></div>
        <div class="card stat"><div class="num">${st.examsPassed}/${st.examsDone}</div><div class="lbl">Provime të kaluara</div></div>
        <div class="card stat"><div class="num">${st.accuracy}%</div><div class="lbl">Saktësia totale</div></div>
      </div>

      ${!opts.admin ? `
      <div class="card mt-2 flex between">
        <div style="flex:1 1 260px"><strong>Progresi i leksioneve</strong>
          <div class="flex mt-1"><div class="progress" style="flex:1"><div style="width:${st.lessonPct}%"></div></div><strong>${st.lessonPct}%</strong></div></div>
        <a class="btn btn-green" href="#/leksione${lastCh ? '/' + lastCh.id : ''}">▶ ${lastCh ? 'Vazhdo: ' + esc(lastCh.title) : 'Fillo mësimin'}</a>
      </div>` : ''}

      <div class="grid grid-2 mt-2">
        <div class="card">
          <h3>Leksionet</h3>
          <ul class="plain">${chs.map((c) => `<li class="flex between" style="padding:6px 0;border-bottom:1px solid var(--line)">
            <span>${c.order}. ${esc(c.title)}</span>
            ${p.lessons[c.id] ? `<span class="badge badge-green">✓ ${fmtDate(p.lessons[c.id]).split(',')[0]}</span>` : '<span class="badge">Pa përfunduar</span>'}</li>`).join('')}</ul>
        </div>
        <div class="card">
          <h3>Rezultatet e provimeve</h3>
          ${p.exams.length ? `<div class="table-wrap"><table class="data"><thead><tr><th>Data</th><th>Testi</th><th>Gabime</th><th>Rezultati</th></tr></thead><tbody>
            ${[...p.exams].reverse().map((e) => `<tr><td>${fmtDate(e.date)}</td><td>${esc(e.cat)} · ${e.testNo ? 'Testi ' + e.testNo : 'Simulim'}</td><td>${e.errors}/${e.total}</td>
              <td>${e.passed ? '<span class="badge badge-green">Kalon</span>' : '<span class="badge badge-red">Nuk kalon</span>'}</td></tr>`).join('')}
          </tbody></table></div>` : `<p class="muted">Asnjë provim ende. ${!opts.admin ? '<a href="#/provimi">Bëj të parin</a>' : ''}</p>`}
        </div>
      </div>

      <div class="grid grid-2 mt-2">
        <div class="card">
          <h3>Testet e temave</h3>
          ${p.tests.length ? `<div class="table-wrap"><table class="data"><thead><tr><th>Data</th><th>Kapitulli</th><th>Rezultati</th></tr></thead><tbody>
            ${[...p.tests].reverse().map((t) => { const c = Store.chapter(t.chapterId); return `<tr><td>${fmtDate(t.date)}</td><td>${c ? esc(c.title) : '–'}</td><td>${t.correct}/${t.total}</td></tr>`; }).join('')}
          </tbody></table></div>` : '<p class="muted">Asnjë test ende.</p>'}
        </div>
        <div class="card">
          <h3>Pyetjet që ${opts.admin ? 'ka' : 'ke'} gabuar</h3>
          ${wrongList.length ? wrongList.slice(0, 15).map((w) => `
            <div class="review-item is-wrong">
              <div class="flex between" style="align-items:flex-start">${w.q.fig || w.q.sign ? `<div class="review-fig">${figHtml(w.q)}</div>` : ''}<strong style="flex:1">${esc(w.q.text)}</strong><span class="badge badge-red">${w.n}×</span></div>
              <div class="ans small">Përgjigja e saktë: <strong style="color:var(--green)">${Quiz.answerText(w.q, w.q.answer)}</strong></div>
              ${w.q.explain ? `<div class="explain">💡 ${esc(w.q.explain)}</div>` : ''}
            </div>`).join('') : '<p class="muted">Asnjë gabim i regjistruar. 👏</p>'}
        </div>
      </div>`;
  }

  function profile() {
    const u = Store.currentUser();
    if (!u) { location.hash = '#/hyr'; return ''; }
    const cat = Store.category(u.category);
    return `
    <div class="container page-head flex between">
      <div>
        <h1 class="mb-0">Profili im</h1>
        <p class="mb-0">${esc(u.name)} · ${esc(u.email)} · ${cat ? esc(cat.name) : ''}</p>
      </div>
      <div class="btn-row">
        ${u.role === 'admin' ? '<a class="btn btn-red" href="#/admin">Paneli Admin</a>' : ''}
        <a class="btn btn-red" href="#/provimi/${esc(u.category)}">🏆 Provim ${esc(u.category)}</a>
        <button class="btn btn-outline" data-action="logout">Dil</button>
      </div>
    </div>
    <div class="container section-sm">${studentReport(u)}</div>`;
  }

  function notFound() {
    return `<div class="container section empty"><h1>Faqja nuk u gjet</h1><p>Lidhja mund të jetë e pasaktë.</p><a class="btn btn-green" href="#/">Kthehu në kryefaqe</a></div>`;
  }

  function initSchoolProfile() {
    const box = document.getElementById('school-map'); if (!box) return;
    osmAvailable().then((ok) => { if (!ok && document.getElementById('school-map') === box) box.innerHTML = MAP_OFF; });
  }

  window.Views = { home, lessons, lesson, tests, chapterTest, examSelect, exam, schools, initSchoolsMap, schoolProfile, initSchoolProfile, auth, bindAuth, profile, studentReport, notFound, Quiz, toast, esc, fmtDate, ask };
})();
