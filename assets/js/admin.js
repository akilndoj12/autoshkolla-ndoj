/* ==========================================================
   PANELI I ADMINISTRATORIT
   ========================================================== */
(function () {
  const { esc, toast, fmtDate, ask } = Views;
  let tab = 'overview';
  let qFilter = '';

  const TABS = [
    ['overview', '📊 Përmbledhje'],
    ['lessons', '📖 Leksionet'],
    ['questions', '❓ Pyetjet & testet'],
    ['exam', '⏱️ Parametrat e provimit'],
    ['students', '👥 Nxënësit'],
    ['schools', '📍 Autoshkollat'],
    ['site', '🏠 Kryefaqja'],
    ['data', '💾 Të dhënat']
  ];

  /* ---------- Formë e përgjithshme në modal ---------- */
  function field(f, v) {
    const id = 'f-' + f.name;
    const val = v === undefined || v === null ? '' : v;
    if (f.type === 'textarea') return `<div class="field"><label for="${id}">${f.label}</label><textarea id="${id}" name="${f.name}" rows="${f.rows || 4}">${esc(val)}</textarea>${f.help ? `<div class="small muted">${f.help}</div>` : ''}</div>`;
    if (f.type === 'select') return `<div class="field"><label for="${id}">${f.label}</label><select id="${id}" name="${f.name}">${f.options.map(([k, l]) => `<option value="${esc(k)}" ${String(k) === String(val) ? 'selected' : ''}>${esc(l)}</option>`).join('')}</select></div>`;
    if (f.type === 'checks') return `<div class="field"><label>${f.label}</label><div class="flex">${f.options.map(([k, l]) => `<label class="flex" style="font-weight:500;margin:0 10px 0 0"><input type="checkbox" name="${f.name}" value="${esc(k)}" style="width:auto;min-height:0" ${(val || []).includes(k) ? 'checked' : ''}/> ${esc(l)}</label>`).join('')}</div></div>`;
    if (f.type === 'bool') return `<div class="field"><label class="flex" style="font-weight:600"><input type="checkbox" name="${f.name}" style="width:auto;min-height:0" ${val ? 'checked' : ''}/> ${f.label}</label></div>`;
    return `<div class="field"><label for="${id}">${f.label}</label><input id="${id}" name="${f.name}" type="${f.type || 'text'}" value="${esc(val)}" ${f.step ? `step="${f.step}"` : ''}/>${f.help ? `<div class="small muted">${f.help}</div>` : ''}</div>`;
  }

  function openForm(title, fields, values, onSave) {
    closeModal();
    const back = document.createElement('div');
    back.className = 'modal-back';
    back.innerHTML = `<div class="modal" role="dialog" aria-modal="true" aria-label="${esc(title)}">
      <h3>${esc(title)}</h3>
      <form id="admin-form" novalidate>
        ${fields.map((f) => field(f, values[f.name])).join('')}
        <div class="form-error" id="admin-err"></div>
        <div class="btn-row between"><button type="button" class="btn btn-outline" data-close>Anulo</button><button class="btn btn-green" type="submit">Ruaj</button></div>
      </form></div>`;
    document.body.appendChild(back);
    back.addEventListener('click', (e) => { if (e.target === back || e.target.hasAttribute('data-close')) closeModal(); });
    back.querySelector('form').addEventListener('submit', (e) => {
      e.preventDefault();
      const fd = e.target;
      const out = {};
      fields.forEach((f) => {
        if (f.type === 'checks') out[f.name] = [...fd.querySelectorAll(`input[name="${f.name}"]:checked`)].map((i) => i.value);
        else if (f.type === 'bool') out[f.name] = fd.querySelector(`input[name="${f.name}"]`).checked;
        else if (f.type === 'number') out[f.name] = Number(fd.elements[f.name].value);
        else out[f.name] = fd.elements[f.name].value.trim();
      });
      try { onSave(out); closeModal(); App.render(); toast('U ruajt me sukses'); }
      catch (ex) { document.getElementById('admin-err').textContent = ex.message; }
    });
    const first = back.querySelector('input,textarea,select'); if (first) first.focus();
  }
  function closeModal() { document.querySelectorAll('.modal-back').forEach((m) => m.remove()); }

  function openHtml(title, html) {
    closeModal();
    const back = document.createElement('div');
    back.className = 'modal-back';
    back.innerHTML = `<div class="modal" style="width:min(1000px,100%)"><div class="flex between"><h3 class="mb-0">${esc(title)}</h3><button class="btn btn-outline btn-sm" data-close>Mbyll ✕</button></div><div class="mt-2">${html}</div></div>`;
    document.body.appendChild(back);
    back.addEventListener('click', (e) => { if (e.target === back || e.target.hasAttribute('data-close')) closeModal(); });
  }

  const req = (v, name) => { if (!v) throw new Error(`Fusha “${name}” është e detyrueshme.`); };
  const lines = (t) => String(t || '').split('\n').map((s) => s.trim()).filter(Boolean);
  const paras = (t) => String(t || '').split(/\n\s*\n/).map((s) => s.replace(/\n/g, ' ').trim()).filter(Boolean);
  const catOpts = () => Store.categories().map((c) => [c.id, c.id]);
  const chapterOpts = () => Store.chapters().map((c) => [c.id, `${c.order}. ${c.title}`]);
  const signOpts = () => [['', '– Pa figurë –'], ...SIGNS.keys.map((k) => [k, SIGNS.name(k)])];

  /* ---------- Seksionet ---------- */
  function overview() {
    const students = Store.students();
    const all = students.map((u) => ({ u, st: Store.statsOf(u.id) }));
    const exams = all.reduce((s, x) => s + x.st.examsDone, 0);
    const passed = all.reduce((s, x) => s + x.st.examsPassed, 0);
    const avgAcc = all.length ? Math.round(all.reduce((s, x) => s + x.st.accuracy, 0) / all.length) : 0;
    const wrong = {};
    students.forEach((u) => Object.entries(Store.statsOf(u.id).wrongIds).forEach(([id, n]) => { wrong[id] = (wrong[id] || 0) + n; }));
    const hardest = Object.entries(wrong).sort((a, b) => b[1] - a[1]).slice(0, 8).map(([id, n]) => ({ q: Store.question(id), n })).filter((x) => x.q);
    return `
      <div class="grid grid-4">
        <div class="card stat"><div class="num">${students.length}</div><div class="lbl">Nxënës të regjistruar</div></div>
        <div class="card stat"><div class="num">${Store.chapters().length}</div><div class="lbl">Kapituj</div></div>
        <div class="card stat"><div class="num">${Store.questions().length}</div><div class="lbl">Pyetje</div></div>
        <div class="card stat"><div class="num">${Store.schools().length}</div><div class="lbl">Autoshkolla</div></div>
      </div>
      <div class="grid grid-3 mt-2">
        <div class="card stat"><div class="num">${exams}</div><div class="lbl">Provime të bëra</div></div>
        <div class="card stat"><div class="num">${exams ? Math.round((passed / exams) * 100) : 0}%</div><div class="lbl">Shkalla e kalimit</div></div>
        <div class="card stat"><div class="num">${avgAcc}%</div><div class="lbl">Saktësia mesatare</div></div>
      </div>
      <div class="card mt-2">
        <h3>Pyetjet më të gabuara nga nxënësit</h3>
        ${hardest.length ? `<div class="table-wrap"><table class="data"><thead><tr><th>Pyetja</th><th>Gabime</th></tr></thead><tbody>
          ${hardest.map((h) => `<tr><td>${esc(h.q.text)}</td><td><span class="badge badge-red">${h.n}</span></td></tr>`).join('')}</tbody></table></div>`
          : '<p class="muted">Ende nuk ka të dhëna.</p>'}
      </div>`;
  }

  function lessonsTab() {
    return `
      <div class="admin-toolbar"><h2 class="mb-0">Leksionet</h2><button class="btn btn-green" data-admin="lesson-new">+ Shto kapitull</button></div>
      <div class="card table-wrap" style="padding:0"><table class="data"><thead><tr><th>#</th><th>Titulli</th><th>Sinjale</th><th>Pyetje</th><th>Video</th><th></th></tr></thead><tbody>
        ${Store.chapters().map((c) => `<tr>
          <td>${c.order}</td><td><strong>${esc(c.title)}</strong></td><td>${(c.signs || []).length}</td>
          <td>${Store.questionsFor(c.id).length}</td><td>${c.video ? '✓' : '–'}</td>
          <td style="white-space:nowrap;text-align:right">
            <a class="btn btn-outline btn-sm" href="#/leksione/${c.id}" target="_blank">Shiko</a>
            <button class="btn btn-outline btn-sm" data-admin="lesson-edit" data-id="${c.id}">Ndrysho</button>
            <button class="btn btn-ghost btn-sm" data-admin="lesson-del" data-id="${c.id}" style="color:var(--red)">Fshi</button>
          </td></tr>`).join('')}
      </tbody></table></div>`;
  }

  function editLesson(id) {
    const c = id ? Store.chapter(id) : null;
    const v = c ? {
      title: c.title, order: c.order, objectives: c.objectives.join('\n'), theory: c.theory.join('\n\n'),
      signs: c.signs || [], video: c.video, examples: (c.examples || []).map((e) => `${e.title} | ${e.text}`).join('\n'), summary: c.summary
    } : { order: Store.chapters().length + 1, signs: [] };
    openForm(c ? 'Ndrysho kapitullin' : 'Kapitull i ri', [
      { name: 'title', label: 'Titulli' },
      { name: 'order', label: 'Renditja', type: 'number' },
      { name: 'objectives', label: 'Objektivat (një për rresht)', type: 'textarea', rows: 3 },
      { name: 'theory', label: 'Shpjegimi teorik (paragrafët ndahen me një rresht bosh)', type: 'textarea', rows: 7 },
      { name: 'signs', label: 'Figurat / sinjalet e kapitullit', type: 'checks', options: SIGNS.keys.map((k) => [k, SIGNS.name(k)]) },
      { name: 'video', label: 'Lidhja e videos (YouTube ose MP4)', help: 'P.sh. https://www.youtube.com/watch?v=…' },
      { name: 'examples', label: 'Shembuj praktikë (një për rresht: Titulli | teksti)', type: 'textarea', rows: 4 },
      { name: 'summary', label: 'Përmbledhje', type: 'textarea', rows: 2 }
    ], v, (o) => {
      req(o.title, 'Titulli');
      Store.upsert('chapters', {
        id: c ? c.id : Store.uid('ch'), order: o.order || 1, title: o.title,
        objectives: lines(o.objectives), theory: paras(o.theory), signs: o.signs, video: o.video,
        examples: lines(o.examples).map((l) => { const [t, ...rest] = l.split('|'); return rest.length ? { title: t.trim(), text: rest.join('|').trim() } : { title: 'Situata', text: t.trim() }; }),
        summary: o.summary
      });
    });
  }

  function questionsTab() {
    const list = Store.questions().filter((q) => !qFilter || q.chapter === qFilter);
    return `
      <div class="admin-toolbar">
        <h2 class="mb-0">Pyetjet & testet</h2>
        <div class="flex">
          <select id="q-filter" style="min-width:220px"><option value="">Të gjithë kapitujt</option>${chapterOpts().map(([k, l]) => `<option value="${k}" ${k === qFilter ? 'selected' : ''}>${esc(l)}</option>`).join('')}</select>
          <button class="btn btn-green" data-admin="q-new">+ Shto pyetje</button>
        </div>
      </div>
      <p class="small muted">Pyetjet “E saktë/E gabuar” ndjekin formatin e pyetësorit zyrtar me fjali. Kategoritë e shënuara përcaktojnë në cilin simulim provimi del pyetja; çdo pyetje del edhe në testin e kapitullit të vet.</p>
      <div class="card table-wrap" style="padding:0"><table class="data"><thead><tr><th>Pyetja</th><th>Lloji</th><th>Përgjigja</th><th>Kat.</th><th></th></tr></thead><tbody>
        ${list.map((q) => `<tr>
          <td>${q.sign ? '🖼️ ' : ''}${esc(q.text)}<div class="small muted">${esc((Store.chapter(q.chapter) || {}).title || '')}</div></td>
          <td>${q.type === 'tf' ? 'S/G' : 'Alternativa'}</td>
          <td>${Views.Quiz.answerText(q, q.answer)}</td>
          <td>${(q.cats || []).join(', ') || '<span class="muted">vetëm test</span>'}</td>
          <td style="white-space:nowrap;text-align:right">
            <button class="btn btn-outline btn-sm" data-admin="q-edit" data-id="${q.id}">Ndrysho</button>
            <button class="btn btn-ghost btn-sm" data-admin="q-del" data-id="${q.id}" style="color:var(--red)">Fshi</button>
          </td></tr>`).join('') || '<tr><td colspan="5" class="empty">Asnjë pyetje.</td></tr>'}
      </tbody></table></div>`;
  }

  function editQuestion(id) {
    const q = id ? Store.question(id) : null;
    const v = q ? {
      chapter: q.chapter, type: q.type, text: q.text, sign: q.sign || '', explain: q.explain, cats: q.cats || [],
      tfAnswer: q.type === 'tf' ? String(q.answer) : 'true',
      options: q.type === 'mc' ? q.options.join('\n') : '', mcAnswer: q.type === 'mc' ? q.answer + 1 : 1
    } : { chapter: qFilter || (Store.chapters()[0] || {}).id, type: 'tf', tfAnswer: 'true', cats: Store.categories().map((c) => c.id), mcAnswer: 1 };
    openForm(q ? 'Ndrysho pyetjen' : 'Pyetje e re', [
      { name: 'chapter', label: 'Kapitulli', type: 'select', options: chapterOpts() },
      { name: 'type', label: 'Lloji', type: 'select', options: [['tf', 'E saktë / E gabuar (fjali)'], ['mc', 'Me alternativa']] },
      { name: 'text', label: 'Teksti i pyetjes / fjalia', type: 'textarea', rows: 3 },
      { name: 'sign', label: 'Figura', type: 'select', options: signOpts() },
      { name: 'tfAnswer', label: 'Përgjigja (për S/G)', type: 'select', options: [['true', 'E saktë'], ['false', 'E gabuar']] },
      { name: 'options', label: 'Alternativat (për pyetje me alternativa – një për rresht)', type: 'textarea', rows: 4 },
      { name: 'mcAnswer', label: 'Numri i alternativës së saktë (1, 2, 3…)', type: 'number' },
      { name: 'explain', label: 'Shpjegimi (shfaqet kur nxënësi gabon)', type: 'textarea', rows: 2 },
      { name: 'cats', label: 'Përdoret në provimin e kategorive', type: 'checks', options: catOpts() }
    ], v, (o) => {
      req(o.text, 'Teksti');
      const item = { id: q ? q.id : Store.uid('q'), chapter: o.chapter, type: o.type, text: o.text, explain: o.explain, cats: o.cats };
      if (o.sign) item.sign = o.sign;
      if (o.type === 'tf') item.answer = o.tfAnswer === 'true';
      else {
        const opts = lines(o.options);
        if (opts.length < 2) throw new Error('Shkruaj të paktën 2 alternativa.');
        if (!(o.mcAnswer >= 1 && o.mcAnswer <= opts.length)) throw new Error('Numri i alternativës së saktë nuk është i vlefshëm.');
        item.options = opts; item.answer = o.mcAnswer - 1;
      }
      Store.upsert('questions', item);
    });
  }

  function examTab() {
    return `
      <h2>Parametrat e simulimit të provimit</h2>
      <div class="notice notice-red mb-2"><span class="ico">!</span><div>Vendos numrin e pyetjeve, kohën dhe kufirin e gabimeve sipas rregullave zyrtare të DPSHTRR-së për secilën kategori.</div></div>
      <form id="exam-form" class="card table-wrap" style="padding:0">
        <table class="data"><thead><tr><th>Kategoria</th><th>Përshkrimi</th><th>Nr. pyetjesh</th><th>Maks. gabime</th><th>Koha (min)</th><th>Pyetje në bankë</th></tr></thead><tbody>
          ${Store.categories().map((c) => `<tr>
            <td><strong>${esc(c.id)}</strong></td>
            <td><input name="label-${c.id}" value="${esc(c.label)}" /></td>
            <td><input type="number" min="1" name="q-${c.id}" value="${c.questions}" style="max-width:110px" /></td>
            <td><input type="number" min="0" name="e-${c.id}" value="${c.maxErrors}" style="max-width:110px" /></td>
            <td><input type="number" min="1" name="m-${c.id}" value="${c.minutes}" style="max-width:110px" /></td>
            <td>${Store.questionsForCategory(c.id).length}</td></tr>`).join('')}
        </tbody></table>
        <div style="padding:14px"><button class="btn btn-green" type="submit">Ruaj parametrat</button></div>
      </form>`;
  }

  function studentsTab() {
    const list = Store.students();
    return `
      <h2>Nxënësit e regjistruar (${list.length})</h2>
      <div class="card table-wrap" style="padding:0"><table class="data"><thead><tr><th>Emri</th><th>Kontakti</th><th>Kat.</th><th>Leksione</th><th>Teste</th><th>Provime</th><th>Saktësia</th><th></th></tr></thead><tbody>
        ${list.map((u) => { const st = Store.statsOf(u.id); return `<tr>
          <td><strong>${esc(u.name)}</strong><div class="small muted">Që nga ${fmtDate(u.createdAt).split(',')[0]}</div></td>
          <td>${esc(u.email)}<div class="small muted">${esc(u.phone || '')}</div></td>
          <td>${esc(u.category)}</td>
          <td>${st.lessonsDone}/${st.lessonsTotal}</td><td>${st.testsDone}</td>
          <td>${st.examsPassed}/${st.examsDone}</td><td>${st.accuracy}%</td>
          <td style="white-space:nowrap;text-align:right">
            <button class="btn btn-outline btn-sm" data-admin="stu-view" data-id="${u.id}">Detajet</button>
            <button class="btn btn-ghost btn-sm" data-admin="stu-del" data-id="${u.id}" style="color:var(--red)">Fshi</button>
          </td></tr>`; }).join('') || '<tr><td colspan="8" class="empty">Ende nuk ka nxënës të regjistruar.</td></tr>'}
      </tbody></table></div>`;
  }

  function schoolsTab() {
    return `
      <div class="admin-toolbar"><h2 class="mb-0">Autoshkollat në hartë</h2><button class="btn btn-green" data-admin="sch-new">+ Shto autoshkollë</button></div>
      <p class="small muted">Shëno “E verifikuar” vetëm pasi të dhënat të jenë kontrolluar. Koordinatat merren nga Google Maps (kliko me të djathtën mbi vendin → kopjo numrat).</p>
      <div class="card table-wrap" style="padding:0"><table class="data"><thead><tr><th>Emri</th><th>Qyteti</th><th>Telefoni</th><th>Statusi</th><th></th></tr></thead><tbody>
        ${Store.schools().map((s) => `<tr>
          <td><strong>${esc(s.name)}</strong></td><td>${esc(s.city)}</td><td>${esc(s.phone || '–')}</td>
          <td>${s.verified ? '<span class="badge badge-green">E verifikuar</span>' : s.demo ? '<span class="badge">Shembull</span>' : '<span class="badge">Në verifikim</span>'}</td>
          <td style="white-space:nowrap;text-align:right">
            <button class="btn btn-outline btn-sm" data-admin="sch-edit" data-id="${s.id}">Ndrysho</button>
            <button class="btn btn-ghost btn-sm" data-admin="sch-del" data-id="${s.id}" style="color:var(--red)">Fshi</button>
          </td></tr>`).join('')}
      </tbody></table></div>`;
  }

  function editSchool(id) {
    const s = id ? Store.school(id) : null;
    openForm(s ? 'Ndrysho autoshkollën' : 'Autoshkollë e re', [
      { name: 'name', label: 'Emri' },
      { name: 'city', label: 'Qyteti' },
      { name: 'address', label: 'Adresa' },
      { name: 'phone', label: 'Telefoni' },
      { name: 'email', label: 'Email', type: 'email' },
      { name: 'website', label: 'Website' },
      { name: 'lat', label: 'Gjerësia gjeografike (lat)', type: 'number', step: 'any', help: 'P.sh. 41.3275' },
      { name: 'lng', label: 'Gjatësia gjeografike (lng)', type: 'number', step: 'any', help: 'P.sh. 19.8187' },
      { name: 'categories', label: 'Kategoritë', type: 'checks', options: catOpts() },
      { name: 'description', label: 'Përshkrimi', type: 'textarea', rows: 3 },
      { name: 'verified', label: 'Të dhënat janë verifikuar', type: 'bool' },
      { name: 'demo', label: 'Listim shembull (demo)', type: 'bool' }
    ], s || { categories: ['B'], lat: 41.3275, lng: 19.8187 }, (o) => {
      req(o.name, 'Emri'); req(o.city, 'Qyteti');
      if (!(o.lat > 39 && o.lat < 43 && o.lng > 18.5 && o.lng < 21.5)) throw new Error('Koordinatat duket se nuk janë brenda Shqipërisë.');
      Store.upsert('schools', Object.assign({ id: s ? s.id : Store.uid('s') }, o));
    });
  }

  function siteTab() {
    const s = Store.site();
    const fields = [
      ['name', 'Emri'], ['slogan', 'Slogani'], ['heroTitle', 'Titulli i kryefaqes'], ['heroText', 'Teksti hyrës', 'textarea'],
      ['about', 'Rreth nesh', 'textarea'], ['phone', 'Telefoni'], ['email', 'Email'], ['website', 'Website'], ['address', 'Adresa']
    ];
    return `
      <h2>Informacioni i faqes kryesore</h2>
      <form id="site-form" class="card">
        ${fields.map(([k, l, t]) => field({ name: k, label: l, type: t, rows: 3 }, s[k])).join('')}
        <button class="btn btn-green" type="submit">Ruaj ndryshimet</button>
      </form>`;
  }

  function dataTab() {
    return `
      <h2>Të dhënat</h2>
      <div class="notice mb-2"><span class="ico">i</span><div>Në këtë version prototip, të dhënat ruhen në këtë shfletues. Para publikimit online do të lidhen me një bazë të dhënash në server, që të gjithë nxënësit dhe administratori të shohin të njëjtat të dhëna.</div></div>
      <div class="grid grid-3">
        <div class="card"><h3>Eksporto</h3><p class="small muted">Shkarko gjithë përmbajtjen dhe rezultatet si skedar JSON (kopje rezervë).</p><button class="btn btn-blue" data-admin="export">⬇ Shkarko JSON</button></div>
        <div class="card"><h3>Importo</h3><p class="small muted">Ngarko një kopje rezervë të mëparshme.</p><input type="file" id="import-file" accept="application/json" /></div>
        <div class="card"><h3>Rikthe përmbajtjen fillestare</h3><p class="small muted">Leksionet, pyetjet, autoshkollat dhe faqja kthehen si në fillim. Llogaritë dhe rezultatet mbeten.</p><button class="btn btn-red" data-admin="reset">↺ Rikthe</button></div>
      </div>`;
  }

  /* ---------- Faqja kryesore e panelit ---------- */
  function render() {
    if (!Store.isAdmin()) {
      return `<div class="container section"><div class="card auth-box" style="text-align:center">
        <h2>Paneli i administratorit</h2><p class="muted">Kjo faqe është vetëm për administratorin e Autoshkolla Ndoj.</p>
        <a class="btn btn-green" href="#/hyr">Hyr si administrator</a></div></div>`;
    }
    const body = { overview, lessons: lessonsTab, questions: questionsTab, exam: examTab, students: studentsTab, schools: schoolsTab, site: siteTab, data: dataTab }[tab]();
    return `
    <div class="container page-head flex between">
      <div><h1 class="mb-0">Paneli Admin</h1><p class="mb-0">Menaxho përmbajtjen, nxënësit dhe autoshkollat.</p></div>
      <button class="btn btn-outline" data-action="logout">Dil</button>
    </div>
    <div class="container section-sm">
      <div class="admin-layout">
        <nav class="card admin-side" aria-label="Seksionet e panelit">${TABS.map(([k, l]) => `<button class="${k === tab ? 'active' : ''}" data-tab="${k}">${l}</button>`).join('')}</nav>
        <div>${body}</div>
      </div>
    </div>`;
  }

  function bind(root) {
    root.querySelectorAll('[data-tab]').forEach((b) => b.addEventListener('click', () => { tab = b.dataset.tab; App.render(); }));
    const qf = root.querySelector('#q-filter');
    if (qf) qf.addEventListener('change', () => { qFilter = qf.value; App.render(); });

    root.querySelectorAll('[data-admin]').forEach((b) => b.addEventListener('click', async () => {
      const id = b.dataset.id;
      switch (b.dataset.admin) {
        case 'lesson-new': return editLesson();
        case 'lesson-edit': return editLesson(id);
        case 'lesson-del':
          if (await ask('Të fshihet ky kapitull? Pyetjet e tij mbeten pa kapitull.', 'Po', true)) { Store.remove('chapters', id); App.render(); toast('Kapitulli u fshi'); }
          return;
        case 'q-new': return editQuestion();
        case 'q-edit': return editQuestion(id);
        case 'q-del': if (await ask('Të fshihet kjo pyetje?', 'Po', true)) { Store.remove('questions', id); App.render(); toast('Pyetja u fshi'); } return;
        case 'sch-new': return editSchool();
        case 'sch-edit': return editSchool(id);
        case 'sch-del': if (await ask('Të fshihet kjo autoshkollë?', 'Po', true)) { Store.remove('schools', id); App.render(); toast('U fshi'); } return;
        case 'stu-view': { const u = Store.db.users.find((x) => x.id === id); return openHtml(u.name + ' – ' + u.email, Views.studentReport(u, { admin: true })); }
        case 'stu-del': if (await ask('Të fshihet ky nxënës dhe gjithë përparimi i tij?', 'Po', true)) { Store.deleteUser(id); App.render(); toast('Nxënësi u fshi'); } return;
        case 'export': {
          if (window.top !== window) { navigator.clipboard.writeText(JSON.stringify(Store.db)).then(() => toast('Të dhënat u kopjuan (JSON)'), () => toast('Shkarkimi nuk lejohet në këtë pamje')); return; }
          const blob = new Blob([JSON.stringify(Store.db, null, 2)], { type: 'application/json' });
          const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
          a.download = 'autoshkolla-ndoj-' + new Date().toISOString().slice(0, 10) + '.json'; a.click();
          return;
        }
        case 'reset': if (await ask('Të rikthehet përmbajtja fillestare?', 'Po', true)) { Store.resetContent(); App.render(); toast('Përmbajtja u rikthye'); } return;
      }
    }));

    const ef = root.querySelector('#exam-form');
    if (ef) ef.addEventListener('submit', (e) => {
      e.preventDefault();
      Store.categories().forEach((c) => {
        c.label = ef.elements['label-' + c.id].value.trim() || c.label;
        c.questions = Math.max(1, Number(ef.elements['q-' + c.id].value) || c.questions);
        c.maxErrors = Math.max(0, Number(ef.elements['e-' + c.id].value));
        c.minutes = Math.max(1, Number(ef.elements['m-' + c.id].value) || c.minutes);
      });
      Store.save(); toast('Parametrat u ruajtën'); App.render();
    });

    const sf = root.querySelector('#site-form');
    if (sf) sf.addEventListener('submit', (e) => {
      e.preventDefault();
      const s = Store.site();
      Object.keys(s).forEach((k) => { if (sf.elements[k]) s[k] = sf.elements[k].value.trim(); });
      Store.save(); toast('Faqja kryesore u përditësua'); App.render();
    });

    const imp = root.querySelector('#import-file');
    if (imp) imp.addEventListener('change', async () => {
      const f = imp.files[0]; if (!f) return;
      try {
        const data = JSON.parse(await f.text());
        if (!data.chapters || !data.questions || !data.users) throw new Error('Skedari nuk është kopje e vlefshme.');
        if (!(await ask('Importimi zëvendëson të gjitha të dhënat aktuale. Vazhdo?', 'Po, importo', true))) return;
        Object.keys(Store.db).forEach((k) => delete Store.db[k]);
        Object.assign(Store.db, data); Store.save(); toast('Të dhënat u importuan'); App.render();
      } catch (ex) { toast('Gabim: ' + ex.message); }
    });
  }

  window.Admin = { render, bind, closeModal };
})();
