/* ==========================================================
   STORE – shtresa e të dhënave.
   Në prototip gjithçka ruhet në localStorage të shfletuesit.
   Në fazën e publikimit kjo shtresë zëvendësohet me një backend
   të vërtetë (p.sh. Supabase) pa ndryshuar faqet.
   ========================================================== */
(function () {
  const KEY = 'ndoj_db_v1';
  const SESSION = 'ndoj_session_v1';

  const clone = (o) => JSON.parse(JSON.stringify(o));
  const uid = (p = 'id') => p + '_' + Math.random().toString(36).slice(2, 9) + Date.now().toString(36).slice(-4);

  async function hash(text) {
    const data = new TextEncoder().encode('ndoj::' + text);
    const buf = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, '0')).join('');
  }

  /* 25 temat e manualit + përmbajtja shtesë e seed-it (objektiva, teori, shembuj) */
  function buildChapters() {
    const extra = {};
    clone(window.SEED.chapters).forEach((c) => { extra[c.id] = c; });
    if (!window.Manual || !Manual.ready) return Object.values(extra);
    return Manual.topics().map((t) => {
      const e = extra[t.id] || {};
      return {
        id: t.id, order: t.num, title: t.title, fullTitle: t.fullTitle,
        objectives: e.objectives || [], theory: e.theory || [], signs: e.signs || [],
        video: e.video || '', examples: e.examples || [], summary: e.summary || ''
      };
    });
  }

  function freshDb() {
    const s = clone(window.SEED);
    return {
      version: s.version,
      site: s.site,
      categories: s.categories,
      chapters: buildChapters(),
      questions: s.questions,
      schools: s.schools,
      users: [],            // {id, name, email, phone, category, passHash, role, createdAt}
      progress: {}          // userId -> {lessons:{chId:date}, tests:[], exams:[], lastChapter}
    };
  }

  let memSession = null;
  const sess = {
    get() { try { return localStorage.getItem(SESSION); } catch (e) { return memSession; } },
    set(v) { memSession = v; try { localStorage.setItem(SESSION, v); } catch (e) {} },
    clear() { memSession = null; try { localStorage.removeItem(SESSION); } catch (e) {} }
  };

  let db;
  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      db = raw ? JSON.parse(raw) : freshDb();
    } catch (e) {
      db = freshDb();
    }
    return db;
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(db)); } catch (e) { console.warn('Ruajtja dështoi', e); }
  }

  async function ensureAdmin() {
    if (!db.users.some((u) => u.role === 'admin')) {
      db.users.push({
        id: 'admin', name: 'Administrator', email: 'admin@autoshkollandoj.com', phone: '',
        category: 'B', role: 'admin', passHash: await hash('Ndoj2026!'), createdAt: new Date().toISOString()
      });
      save();
    }
  }

  const Store = {
    async init() {
      await Promise.all([window.Manual ? Manual.load() : null, window.Book ? Book.load() : null]);
      load();
      // Migrimi nga versioni 1 (pyetje shembull) te manuali zyrtar
      if ((db.version || 1) < window.SEED.version) {
        const s = clone(window.SEED);
        if ((db.version || 1) < 2) { db.categories = s.categories; db.chapters = buildChapters(); db.questions = []; }
        if ((db.version || 1) < 3) {   // vendndodhja: Rrëshen, Mirditë
          db.site = s.site;
          db.schools = db.schools.filter((x) => x.id !== 's1'); db.schools.unshift(s.schools[0]);
        }
        if ((db.version || 1) < 4) {   // email-i info@autoshkollandoj.com nuk ekziston
          if (db.site.email === 'info@autoshkollandoj.com') db.site.email = '';
          db.schools.forEach((x) => { if (x.email === 'info@autoshkollandoj.com') x.email = ''; });
        }
        if ((db.version || 1) < 5 && db.site.heroText) db.site.heroText = db.site.heroText.replace('teste për çdo kapitull', 'teste për çdo temë');
        db.version = s.version;
        save();
      } else if (Manual.ready && db.chapters.length < Manual.topics().length) {
        db.chapters = buildChapters(); save();
      }
      await ensureAdmin();
    },
    get db() { return db; },
    save,
    uid,

    /* ---------- Përmbajtja ---------- */
    site() { return db.site; },
    categories() { return db.categories; },
    category(id) { return db.categories.find((c) => c.id === id); },
    chapters() { return [...db.chapters].sort((a, b) => a.order - b.order); },
    chapter(id) { return db.chapters.find((c) => c.id === id); },
    customQuestions() { return db.questions; },
    questions() { return db.questions.concat(window.Manual ? Manual.questions : []); },
    questionsFor(chapterId) { return this.questions().filter((q) => q.chapter === chapterId); },
    questionsForCategory(cat) { return this.questions().filter((q) => (q.cats || []).includes(cat)); },
    question(id) { return db.questions.find((q) => q.id === id) || (window.Manual ? Manual.question(id) : null); },
    schools() { return db.schools; },
    school(id) { return db.schools.find((s) => s.id === id); },

    upsert(collection, item) {
      const list = db[collection];
      const i = list.findIndex((x) => x.id === item.id);
      if (i >= 0) list[i] = item; else list.push(item);
      save();
    },
    remove(collection, id) {
      db[collection] = db[collection].filter((x) => x.id !== id);
      save();
    },
    resetContent() {
      const s = clone(window.SEED);
      Object.assign(db, { site: s.site, categories: s.categories, chapters: buildChapters(), questions: s.questions, schools: s.schools });
      save();
    },

    /* ---------- Llogaritë ---------- */
    currentUser() {
      const id = sess.get();
      return id ? db.users.find((u) => u.id === id) || null : null;
    },
    isAdmin() { const u = this.currentUser(); return !!u && u.role === 'admin'; },
    async register({ name, email, phone, category, password }) {
      email = email.trim().toLowerCase();
      if (db.users.some((u) => u.email === email)) throw new Error('Ky email është i regjistruar. Provo të hysh.');
      const user = { id: uid('u'), name: name.trim(), email, phone: (phone || '').trim(), category: category || 'B', role: 'student', passHash: await hash(password), createdAt: new Date().toISOString() };
      db.users.push(user);
      save();
      sess.set(user.id);
      return user;
    },
    async login(email, password) {
      email = email.trim().toLowerCase();
      const user = db.users.find((u) => u.email === email);
      if (!user || user.passHash !== (await hash(password))) throw new Error('Email-i ose fjalëkalimi është i pasaktë.');
      sess.set(user.id);
      return user;
    },
    logout() { sess.clear(); },
    students() { return db.users.filter((u) => u.role === 'student'); },
    deleteUser(id) {
      db.users = db.users.filter((u) => u.id !== id);
      delete db.progress[id];
      save();
    },

    /* ---------- Përparimi ---------- */
    progressOf(userId) {
      if (!db.progress[userId]) db.progress[userId] = { lessons: {}, tests: [], exams: [], lastChapter: null };
      return db.progress[userId];
    },
    myProgress() { const u = this.currentUser(); return u ? this.progressOf(u.id) : null; },
    markLesson(chapterId) {
      const p = this.myProgress(); if (!p) return false;
      p.lessons[chapterId] = new Date().toISOString();
      p.lastChapter = chapterId;
      save(); return true;
    },
    setLastChapter(chapterId) {
      const p = this.myProgress(); if (!p) return;
      p.lastChapter = chapterId; save();
    },
    addTest(rec) { const p = this.myProgress(); if (!p) return false; p.tests.push(rec); save(); return true; },
    addExam(rec) { const p = this.myProgress(); if (!p) return false; p.exams.push(rec); save(); return true; },

    /* Statistika për një nxënës */
    statsOf(userId) {
      const p = this.progressOf(userId);
      const chapters = (window.Book && Book.ready) ? Book.order().map((sid) => ({ id: Book.routeId(sid) })) : this.chapters();
      const lessonsDone = chapters.filter((c) => p.lessons[c.id]).length;
      const exams = p.exams;
      const passed = exams.filter((e) => e.passed).length;
      const answered = [...p.tests, ...exams].reduce((s, r) => s + r.total, 0);
      const correct = [...p.tests, ...exams].reduce((s, r) => s + r.correct, 0);
      const wrongIds = {};
      [...p.tests, ...exams].forEach((r) => (r.wrong || []).forEach((id) => { wrongIds[id] = (wrongIds[id] || 0) + 1; }));
      return {
        lessonsDone, lessonsTotal: chapters.length,
        lessonPct: chapters.length ? Math.round((lessonsDone / chapters.length) * 100) : 0,
        testsDone: p.tests.length, examsDone: exams.length, examsPassed: passed,
        accuracy: answered ? Math.round((correct / answered) * 100) : 0,
        wrongIds, lastChapter: p.lastChapter
      };
    }
  };

  window.Store = Store;
})();
