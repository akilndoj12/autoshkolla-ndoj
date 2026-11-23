/* ==========================================================
   APP – drejtuesi i faqeve (router) dhe ngjarjet
   ========================================================== */
(function () {
  const app = document.getElementById('app');
  const { esc, toast, Quiz } = Views;

  function parse() {
    const parts = (location.hash.replace(/^#\/?/, '') || '').split('/').filter(Boolean);
    return { page: parts[0] || '', id: parts[1] ? decodeURIComponent(parts[1]) : null, sub: parts[2] || null };
  }

  function renderNav(page) {
    const map = { '': 'home', leksione: 'leksione', teste: 'teste', provimi: 'provimi', autoshkollat: 'autoshkollat' };
    document.querySelectorAll('[data-nav]').forEach((a) => a.classList.toggle('active', a.dataset.nav === map[page]));
    const u = Store.currentUser();
    document.getElementById('nav-user').innerHTML = u
      ? `${u.role === 'admin' ? '<a href="#/admin" class="btn btn-red btn-sm">Paneli Admin</a>' : ''}<a href="#/profili" class="btn btn-outline btn-sm">👤 ${esc(u.name.split(' ')[0])}</a>`
      : `<a href="#/hyr" class="btn btn-outline btn-sm">👤 Hyr</a>`;
  }

  function renderFooter() {
    const s = Store.site();
    document.getElementById('footer-about').textContent = s.about;
    document.getElementById('footer-contact').innerHTML = `
      <li>📞 <a href="tel:+355${String(s.phone).replace(/\D/g, '').replace(/^0/, '')}">${esc(s.phone)}</a></li>
      ${s.email ? `<li>✉️ <a href="mailto:${esc(s.email)}">${esc(s.email)}</a></li>` : ''}
      <li>📍 ${esc(s.address)}</li>`;
    document.getElementById('year').textContent = new Date().getFullYear();
  }

  let lastRoute = '';
  function render() {
    const { page, id, sub } = parse();
    const route = page + '/' + (id || '') + '/' + (sub || '');

    // Kur largohesh nga një test/provim, ndalo kohëmatësin
    if (route !== lastRoute && Quiz.state) {
      const inQuiz = (page === 'teste' && id) || (page === 'provimi' && id && sub);
      if (!inQuiz) Quiz.stop();
    }
    if (route !== lastRoute) Admin.closeModal();

    let html;
    switch (page) {
      case '': html = Views.home(); break;
      case 'leksione': html = id ? Views.lesson(id) : Views.lessons(); break;
      case 'teste': html = id ? Views.chapterTest(id, sub) : Views.tests(); break;
      case 'provimi': html = id ? Views.exam(id, sub) : Views.examSelect(); break;
      case 'autoshkollat': html = id ? Views.schoolProfile(id) : Views.schools(); break;
      case 'hyr': html = Views.auth('login'); break;
      case 'regjistrohu': html = Views.auth('register'); break;
      case 'profili': html = Views.profile(); break;
      case 'admin': html = Admin.render(); break;
      default: html = Views.notFound();
    }
    app.innerHTML = html;
    renderNav(page);
    renderFooter();

    if (page === 'autoshkollat' && !id) Views.initSchoolsMap();
    if (page === 'autoshkollat' && id) Views.initSchoolProfile();
    if (page === 'hyr' || page === 'regjistrohu') Views.bindAuth();
    if (page === 'admin') Admin.bind(app);
    if (Quiz.state && !Quiz.state.finished && Quiz.state.mode === 'exam') Quiz.tick();

    if (route !== lastRoute) { window.scrollTo(0, 0); }
    lastRoute = route;
    document.getElementById('main-nav').classList.remove('open');
    document.querySelector('.menu-toggle').setAttribute('aria-expanded', 'false');
  }

  /* ---------- Ngjarjet (delegim) ---------- */
  app.addEventListener('click', (e) => {
    const rev = e.target.closest('[data-reveal]');
    if (rev) { rev.classList.toggle('show'); return; }
    const opt = e.target.closest('.option');
    if (opt && Quiz.state && !Quiz.state.finished) {
      const raw = opt.dataset.answer;
      Quiz.state.answers[Quiz.state.idx] = raw === 'true' ? true : raw === 'false' ? false : Number(raw);
      render();
      return;
    }
    const go = e.target.closest('[data-goto]');
    if (go && Quiz.state) { Quiz.state.idx = Number(go.dataset.goto); render(); return; }

    const act = e.target.closest('[data-action]');
    if (!act) return;
    switch (act.dataset.action) {
      case 'q-prev': if (Quiz.state.idx > 0) { Quiz.state.idx--; render(); } break;
      case 'q-next': if (Quiz.state.idx < Quiz.state.questions.length - 1) { Quiz.state.idx++; render(); } break;
      case 'q-finish': Quiz.finish(); break;
      case 'q-retry': {
        const s = Quiz.state;
        Quiz.stop();
        render();
        toast(s && s.mode === 'exam' ? 'Provim i ri me pyetje të reja' : 'Testi filloi përsëri');
        break;
      }
      case 'toggle-answers': {
        const list = document.getElementById('manual-list'); if (!list) break;
        const hidden = list.classList.toggle('hide-answers');
        list.querySelectorAll('.show').forEach((x) => x.classList.remove('show'));
        act.textContent = hidden ? '👁 Shfaq përgjigjet' : '🙈 Fshih përgjigjet';
        break;
      }
      case 'scroll-review': { const r = document.getElementById('rishikimi'); if (r) r.scrollIntoView({ behavior: 'smooth' }); break; }
      case 'mark-done':
        if (Store.markLesson(act.dataset.id)) { toast('Kapitulli u shënua si i përfunduar ✓'); render(); }
        break;
      case 'logout':
        Store.logout(); toast('Dole nga llogaria'); location.hash = '#/';
        break;
    }
  });

  // Tastiera gjatë testit: S/G ose 1-4, shigjetat
  document.addEventListener('keydown', (e) => {
    if (!Quiz.state || Quiz.state.finished || /INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)) return;
    const q = Quiz.state.questions[Quiz.state.idx];
    const k = e.key.toLowerCase();
    if (k === 'arrowright' && Quiz.state.idx < Quiz.state.questions.length - 1) { Quiz.state.idx++; render(); }
    else if (k === 'arrowleft' && Quiz.state.idx > 0) { Quiz.state.idx--; render(); }
    else if (q.type === 'tf' && (k === 's' || k === 'g')) { Quiz.state.answers[Quiz.state.idx] = k === 's'; render(); }
    else if (q.type === 'mc' && /^[1-6]$/.test(k) && Number(k) <= q.options.length) { Quiz.state.answers[Quiz.state.idx] = Number(k) - 1; render(); }
  });

  // Paralajmërim kur mbyllet faqja gjatë provimit
  window.addEventListener('beforeunload', (e) => {
    if (Quiz.state && !Quiz.state.finished && Quiz.state.mode === 'exam') { e.preventDefault(); e.returnValue = ''; }
  });

  // Menuja në telefon
  const toggle = document.querySelector('.menu-toggle');
  toggle.addEventListener('click', () => {
    const nav = document.getElementById('main-nav');
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  window.addEventListener('hashchange', render);

  window.App = { render };
  Store.init().then(render);
})();
