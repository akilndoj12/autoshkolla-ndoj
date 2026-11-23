/* ==========================================================
   Sinjalet rrugore si SVG (të vizatuara nga e para, sipas
   formave standarde të Konventës së Vjenës).
   Përdorim: SIGNS.render('stop')  -> string SVG
   ========================================================== */
(function () {
  const R = '#d93025', B = '#1a56db', Y = '#f9d71c', K = '#111', W = '#fff';

  const triangle = (inner) => `
    <polygon points="50,6 96,88 4,88" fill="${W}" stroke="${R}" stroke-width="9" stroke-linejoin="round"/>
    ${inner}`;
  const circleRed = (inner, fill = W) => `
    <circle cx="50" cy="50" r="43" fill="${fill}" stroke="${R}" stroke-width="9"/>
    ${inner}`;
  const circleBlue = (inner) => `
    <circle cx="50" cy="50" r="46" fill="${B}"/>
    ${inner}`;

  const car = (x, y, color = K, s = 1) => `
    <g transform="translate(${x},${y}) scale(${s})">
      <rect x="0" y="8" width="26" height="9" rx="3" fill="${color}"/>
      <path d="M4 8 L8 1 H18 L22 8 Z" fill="${color}"/>
      <circle cx="6" cy="18" r="3" fill="${color}"/><circle cx="20" cy="18" r="3" fill="${color}"/>
    </g>`;

  const person = (x, y, s = 1) => `
    <g transform="translate(${x},${y}) scale(${s})" fill="${K}" stroke="${K}" stroke-linecap="round">
      <circle cx="10" cy="4" r="4" stroke="none"/>
      <path d="M10 9 L8 22 M8 22 L3 33 M8 22 L14 33 M10 12 L3 18 M10 12 L17 16" stroke-width="3.5" fill="none"/>
    </g>`;

  const SIGNS = {
    stop: {
      name: 'STOP – Ndalim i detyrueshëm',
      desc: 'Ndalo plotësisht dhe jep përparësi.',
      svg: `<polygon points="30,4 70,4 96,30 96,70 70,96 30,96 4,70 4,30" fill="${R}" stroke="${W}" stroke-width="4"/>
            <text x="50" y="61" text-anchor="middle" font-family="Arial Black,Arial" font-weight="900" font-size="27" fill="${W}">STOP</text>`
    },
    jepPerparesi: {
      name: 'Jep përparësi',
      desc: 'Jep përparësi mjeteve në rrugën ku hyn.',
      svg: `<polygon points="4,10 96,10 50,92" fill="${W}" stroke="${R}" stroke-width="9" stroke-linejoin="round"/>`
    },
    rrugeMePerparesi: {
      name: 'Rrugë me përparësi',
      desc: 'Ke përparësi në kryqëzimet që vijojnë.',
      svg: `<rect x="18" y="18" width="64" height="64" transform="rotate(45 50 50)" fill="${W}" stroke="#333" stroke-width="2"/>
            <rect x="29" y="29" width="42" height="42" transform="rotate(45 50 50)" fill="${Y}"/>`
    },
    ndalohetHyrja: {
      name: 'Ndalohet hyrja',
      desc: 'Ndalohet hyrja për të gjitha mjetet.',
      svg: `<circle cx="50" cy="50" r="46" fill="${R}"/><rect x="18" y="42" width="64" height="16" fill="${W}"/>`
    },
    ndalohetQarkullimi: {
      name: 'Ndalohet qarkullimi',
      desc: 'Ndalohet qarkullimi në të dy drejtimet.',
      svg: circleRed('')
    },
    kufizimShpejtesie: {
      name: 'Kufizim shpejtësie',
      desc: 'Shpejtësia maksimale e lejuar (km/h).',
      svg: circleRed(`<text x="50" y="62" text-anchor="middle" font-family="Arial" font-weight="900" font-size="34" fill="${K}">50</text>`)
    },
    ndalohetParakalimi: {
      name: 'Ndalohet parakalimi',
      desc: 'Ndalohet parakalimi i automjeteve.',
      svg: circleRed(`${car(22, 38, R)}${car(52, 38, K)}`)
    },
    ndalohetParkimi: {
      name: 'Ndalohet qëndrimi dhe parkimi',
      desc: 'Ndalohet ndalimi dhe parkimi.',
      svg: `<circle cx="50" cy="50" r="44" fill="${B}" stroke="${R}" stroke-width="9"/>
            <line x1="20" y1="20" x2="80" y2="80" stroke="${R}" stroke-width="9"/>
            <line x1="80" y1="20" x2="20" y2="80" stroke="${R}" stroke-width="9"/>`
    },
    rrezik: {
      name: 'Rrezik i përgjithshëm',
      desc: 'Kujdes: rrezik i papërcaktuar.',
      svg: triangle(`<rect x="45" y="32" width="10" height="32" rx="3" fill="${K}"/><circle cx="50" cy="74" r="6" fill="${K}"/>`)
    },
    vendkalimKembesoresh: {
      name: 'Vendkalim këmbësorësh',
      desc: 'Paralajmëron vendkalim këmbësorësh.',
      svg: triangle(`${person(38, 36, 1.05)}<rect x="22" y="76" width="56" height="4" fill="${K}"/>`)
    },
    femije: {
      name: 'Kujdes, fëmijë',
      desc: 'Zonë me shkolla ose kënde lojërash.',
      svg: triangle(`${person(28, 42, .9)}${person(52, 46, .75)}`)
    },
    semafor: {
      name: 'Semafor',
      desc: 'Paralajmëron semafor më përpara.',
      svg: triangle(`<rect x="41" y="30" width="18" height="48" rx="5" fill="${K}"/>
            <circle cx="50" cy="39" r="5" fill="${R}"/><circle cx="50" cy="54" r="5" fill="${Y}"/><circle cx="50" cy="69" r="5" fill="#1e8e3e"/>`)
    },
    rrugeRreshqitese: {
      name: 'Rrugë rrëshqitëse',
      desc: 'Rruga mund të jetë e rrëshqitshme.',
      svg: triangle(`${car(36, 38, K, 1.05)}<path d="M30 74 q6 -6 12 0 t12 0 M50 74 q6 -6 12 0" stroke="${K}" stroke-width="3" fill="none"/>`)
    },
    kthesePerdredhur: {
      name: 'Kthesë e rrezikshme djathtas',
      desc: 'Kthesë e rrezikshme në të djathtë.',
      svg: triangle(`<path d="M42 80 V52 Q42 40 56 40 H60" stroke="${K}" stroke-width="7" fill="none"/><polygon points="58,30 72,40 58,50" fill="${K}"/>`)
    },
    mbajDjathtas: {
      name: 'Kalim i detyruar djathtas',
      desc: 'Kalo nga ana e djathtë e pengesës.',
      svg: circleBlue(`<path d="M30 30 L64 64" stroke="${W}" stroke-width="11" stroke-linecap="round"/><polygon points="74,74 46,70 70,46" fill="${W}"/>`)
    },
    rrethrrotullim: {
      name: 'Rrethrrotullim',
      desc: 'Qarkullim i detyruar rrotull sheshit.',
      svg: circleBlue(`<g fill="none" stroke="${W}" stroke-width="7">
              <path d="M50 24 A26 26 0 0 1 74 44"/><path d="M72 60 A26 26 0 0 1 40 74"/><path d="M28 62 A26 26 0 0 1 32 32"/></g>
            <polygon points="78,36 80,52 66,46" fill="${W}"/><polygon points="44,82 30,74 44,66" fill="${W}"/><polygon points="22,40 30,26 38,38" fill="${W}"/>`)
    },
    driteKuqe: {
      name: 'Drita e kuqe e semaforit',
      desc: 'Ndalo para vijës së ndalimit.',
      svg: `<rect x="32" y="4" width="36" height="92" rx="10" fill="${K}"/>
            <circle cx="50" cy="24" r="11" fill="${R}"/><circle cx="50" cy="50" r="11" fill="#444"/><circle cx="50" cy="76" r="11" fill="#444"/>`
    },
    driteVerdhe: {
      name: 'Drita e verdhë e semaforit',
      desc: 'Përgatitu të ndalosh.',
      svg: `<rect x="32" y="4" width="36" height="92" rx="10" fill="${K}"/>
            <circle cx="50" cy="24" r="11" fill="#444"/><circle cx="50" cy="50" r="11" fill="${Y}"/><circle cx="50" cy="76" r="11" fill="#444"/>`
    },
    parkim: {
      name: 'Parkim',
      desc: 'Zonë e lejuar për parkim.',
      svg: `<rect x="6" y="6" width="88" height="88" rx="10" fill="${B}"/>
            <text x="50" y="72" text-anchor="middle" font-family="Arial" font-weight="900" font-size="62" fill="${W}">P</text>`
    }
  };

  window.SIGNS = {
    all: SIGNS,
    keys: Object.keys(SIGNS),
    render(key) {
      const s = SIGNS[key];
      if (!s) return '';
      return `<svg viewBox="0 0 100 100" role="img" aria-label="${s.name}" xmlns="http://www.w3.org/2000/svg">${s.svg}</svg>`;
    },
    name(key) { return SIGNS[key] ? SIGNS[key].name : key; }
  };
})();
