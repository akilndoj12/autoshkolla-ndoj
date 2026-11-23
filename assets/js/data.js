/* ==========================================================
   Të dhënat fillestare (seed) të platformës.
   KUJDES: pyetjet dhe parametrat e provimit janë SHEMBUJ
   për prototipin. Para publikimit duhen kontrolluar me
   pyetësorin zyrtar dhe rregullat e DPSHTRR-së.
   Administratori mund t'i ndryshojë të gjitha nga Paneli Admin.
   ========================================================== */
window.SEED = {
  version: 3,

  site: {
    name: 'Autoshkolla Ndoj',
    slogan: 'Rrëshen, Mirditë',
    heroTitle: 'Mëso teorinë, ushtrohu dhe përgatitu për provimin',
    heroText: 'Platforma online e Autoshkolla Ndoj: leksione të qarta me figura, teste për çdo kapitull dhe simulim i provimit teorik të patentës – nga kompjuteri, tableti ose telefoni.',
    about: 'Kjo platformë është krijuar nga Autoshkolla Ndoj për të ndihmuar nxënësit të mësojnë rregullat e qarkullimit rrugor dhe të përgatiten me siguri për provimin teorik.',
    phone: '068 20 81 109',
    email: 'info@autoshkollandoj.com',
    website: 'www.autoshkollandoj.com',
    city: 'Rrëshen',
    address: 'Rrëshen, Mirditë'
  },

  /* Parametrat e provimit sipas Manualit të DPSHTRR (2019) për kat. A1, A2, B1, B:
     40 pyetje (2 nga çdo temë 1–15, 1 nga çdo temë 16–25), 40 minuta, maks. 4 gabime. */
  categories: [
    { id: 'A1', name: 'Kategoria A1', label: 'Motoçikleta të lehta', icon: '🛵', questions: 40, maxErrors: 4, minutes: 40 },
    { id: 'A2', name: 'Kategoria A2', label: 'Motoçikleta', icon: '🏍️', questions: 40, maxErrors: 4, minutes: 40 },
    { id: 'B1', name: 'Kategoria B1', label: 'Katroçikla', icon: '🚙', questions: 40, maxErrors: 4, minutes: 40 },
    { id: 'B', name: 'Kategoria B', label: 'Automjete', icon: '🚗', questions: 40, maxErrors: 4, minutes: 40 }
  ],

  /* Përmbajtje shtesë (objektiva, shpjegim, shembuj) për disa nga 25 temat e manualit.
     Temat vetë dhe fjalitë zyrtare ngarkohen nga assets/manual/manual.json */
  chapters: [
    {
      id: 't16', order: 1,
      title: 'Rregullat bazë të trafikut',
      objectives: [
        'Të njohësh përdoruesit e rrugës dhe përgjegjësitë e drejtuesit.',
        'Të kuptosh pse rregullat e qarkullimit janë të detyrueshme.',
        'Të dish çfarë duhet kontrolluar para nisjes.'
      ],
      theory: [
        'Rruga ndahet nga shumë përdorues: drejtues automjetesh, motoçiklistë, çiklistë dhe këmbësorë. Secili ka të drejta dhe detyrime, por drejtuesi i mjetit mban përgjegjësi më të madhe sepse drejton një mjet që mund të shkaktojë dëme të rënda.',
        'Në Shqipëri qarkullimi bëhet në anën e djathtë të rrugës. Drejtuesi duhet të mbajë me vete lejen e drejtimit dhe dokumentet e mjetit, dhe të jetë në gjendje fizike e mendore të përshtatshme për drejtim.',
        'Para nisjes kontrollo: pozicionin e ndenjëses, pasqyrat, rripin e sigurimit (për të gjithë pasagjerët) dhe që asgjë në kabinë nuk të pengon gjatë drejtimit.'
      ],
      signs: [],
      video: '',
      examples: [
        { title: 'Situata', text: 'Je gati të nisesh, por pasqyra e majtë nuk të tregon shiritin ngjitur. Rregulloje para se të lëvizësh – jo gjatë drejtimit.' },
        { title: 'Situata', text: 'Një pasagjer në ndenjësen e pasme nuk ka vënë rripin. Rripi duhet përdorur nga të gjithë, jo vetëm nga drejtuesi.' }
      ],
      summary: 'Drejto në anën e djathtë, ki dokumentet me vete, kontrollo mjetin para nisjes dhe kujto që rripi është për të gjithë.'
    },
    {
      id: 't01', order: 2,
      title: 'Sinjalet e rrezikut',
      objectives: [
        'Të njohësh formën dhe ngjyrat e sinjaleve të rrezikut.',
        'Të dallosh kuptimin e sinjaleve më të shpeshta.',
        'Të dish si të reagosh kur sheh një sinjal rreziku.'
      ],
      theory: [
        'Sinjalet e rrezikut kanë formë trekëndëshi barabrinjës me kulmin lart, sfond të bardhë dhe buzë të kuqe. Ato vendosen para vendit të rrezikshëm për t’i dhënë drejtuesit kohë të reagojë.',
        'Kur sheh një sinjal rreziku: ul shpejtësinë, rrit vëmendjen dhe përgatitu të ndalosh nëse duhet.'
      ],
      signs: ['rrezik', 'vendkalimKembesoresh', 'femije', 'semafor', 'rrugeRreshqitese', 'kthesePerdredhur'],
      video: '',
      examples: [
        { title: 'Situata', text: 'Sheh sinjalin “Kujdes, fëmijë” afër një shkolle në orën 8:00. Ul shpejtësinë dhe ki parasysh që një fëmijë mund të dalë papritur mes makinave të parkuara.' },
        { title: 'Situata', text: 'Bie shi dhe sheh sinjalin “Rrugë rrëshqitëse”. Shmang frenimet e forta dhe rrit distancën nga mjeti përpara.' }
      ],
      summary: 'Trekëndësh me buzë të kuqe = rrezik përpara. Ngadalëso dhe ki vëmendje.'
    },
    {
      id: 't02', order: 3,
      title: 'Sinjalet e ndalimit dhe të detyrimit',
      objectives: [
        'Të dallosh sinjalet e ndalimit (rreth i kuq) nga ato të detyrimit (rreth blu).',
        'Të kuptosh kufizimin e shpejtësisë dhe ndalimin e parakalimit.',
        'Të njohësh sinjalet e parkimit.'
      ],
      theory: [
        'Sinjalet e ndalimit janë zakonisht rrethore me buzë të kuqe. Ato ndalojnë një veprim të caktuar: hyrjen, parakalimin, parkimin ose kalimin mbi një shpejtësi të caktuar. Numri brenda rrethit të kuq tregon shpejtësinë MAKSIMALE.',
        'Sinjalet e detyrimit janë rrethore me sfond blu dhe figurë të bardhë. Ato tregojnë një veprim që DUHET bërë, p.sh. kalimin nga ana e djathtë ose qarkullimin rrotull sheshit.',
        'Sinjalet e informacionit, si “Parkim”, janë zakonisht katrore ose drejtkëndëshe me sfond blu.'
      ],
      signs: ['ndalohetHyrja', 'ndalohetQarkullimi', 'kufizimShpejtesie', 'ndalohetParakalimi', 'ndalohetParkimi', 'mbajDjathtas', 'rrethrrotullim', 'parkim'],
      video: '',
      examples: [
        { title: 'Situata', text: 'Sheh sinjalin “Ndalohet parakalimi” dhe para teje ecën ngadalë një kamion. Duhet të qëndrosh pas tij derisa ndalimi të mbarojë.' },
        { title: 'Situata', text: 'Rrethi blu me shigjetë poshtë-djathtas para një ishulli trafiku: kalo nga ana e djathtë e ishullit.' }
      ],
      summary: 'Rreth i kuq = ndalim. Rreth blu = detyrim. Numri në rreth të kuq = shpejtësia maksimale.'
    },
    {
      id: 't04', order: 4,
      title: 'Përparësia e kalimit',
      objectives: [
        'Të njohësh sinjalet STOP, “Jep përparësi” dhe “Rrugë me përparësi”.',
        'Të dish kur u jep përparësi këmbësorëve dhe mjeteve të urgjencës.',
        'Të kuptosh rregullin e përparësisë në kryqëzime pa sinjale.'
      ],
      theory: [
        'Te sinjali STOP duhet të ndalosh PLOTËSISHT te vija e ndalimit, edhe nëse nuk sheh mjete, dhe pastaj të japësh përparësi.',
        'Sinjali “Jep përparësi” (trekëndësh me kulm poshtë) kërkon të ngadalësosh dhe të ndalosh nëse duhet, për t’u dhënë përparësi mjeteve në rrugën ku hyn.',
        'Në kryqëzimet pa sinjale, përparësia u jepet mjeteve që vijnë nga e djathta. Këmbësorëve që po kalojnë në vendkalim u jepet gjithmonë përparësi, ashtu si edhe mjeteve të urgjencës me sirenë dhe drita blu.'
      ],
      signs: ['stop', 'jepPerparesi', 'rrugeMePerparesi'],
      video: '',
      examples: [
        { title: 'Situata', text: 'Mbërrin te STOP në orët e natës dhe rruga duket bosh. Edhe kështu, ndalo plotësisht para se të vazhdosh.' },
        { title: 'Situata', text: 'Dëgjon sirenë ambulance pas teje. Sinjalizo, afrohu djathtas në mënyrë të sigurt dhe lëre të kalojë.' }
      ],
      summary: 'STOP = ndalim i plotë. Pa sinjale = përparësi nga e djathta. Këmbësorët dhe urgjenca kanë përparësi.'
    },
    {
      id: 't06', order: 5,
      title: 'Semaforët dhe policia rrugore',
      objectives: [
        'Të njohësh kuptimin e secilës dritë të semaforit.',
        'Të dish çfarë të bësh me dritë të verdhë që pulson.',
        'Të kuptosh që udhëzimet e policit kanë përparësi.'
      ],
      theory: [
        'Drita e kuqe: ndalo para vijës së ndalimit. Drita e verdhë fikse: përgatitu të ndalosh, sepse vjen e kuqja. Drita e gjelbër: lejohet kalimi, por vetëm nëse kryqëzimi është i lirë.',
        'Drita e verdhë që pulson do të thotë që semafori nuk rregullon trafikun: kalo me kujdes të shtuar dhe zbato rregullat e përparësisë.',
        'Udhëzimet e policit rrugor kanë përparësi ndaj semaforëve dhe sinjaleve rrugore.'
      ],
      signs: ['driteKuqe', 'driteVerdhe', 'semafor'],
      video: '',
      examples: [
        { title: 'Situata', text: 'Drita e gjelbër ndizet, por kryqëzimi është ende i bllokuar nga makinat. Mos hyr derisa të kesh vend për ta kaluar plotësisht.' }
      ],
      summary: 'E kuqe = ndalo. E verdhë = përgatitu të ndalosh. E gjelbër = kalo nëse është e lirë. Polici ka fjalën e fundit.'
    },
    {
      id: 't08', order: 6,
      title: 'Shpejtësia, distanca dhe parakalimi',
      objectives: [
        'Të përshtatësh shpejtësinë me kushtet e rrugës.',
        'Të ruash distancën e sigurisë.',
        'Të parakalosh në mënyrë të sigurt dhe vetëm kur lejohet.'
      ],
      theory: [
        'Shpejtësia duhet përshtatur gjithmonë me kushtet e rrugës, motit, dukshmërisë dhe trafikut – edhe kur je nën kufirin e lejuar.',
        'Sa më e madhe shpejtësia, aq më e gjatë distanca e frenimit. Në rrugë të lagur ose me mjegull, rrit distancën nga mjeti përpara.',
        'Parakalimi bëhet zakonisht nga ana e majtë. Para tij kontrollo pasqyrat, ndiz sinjalizuesin dhe sigurohu që ke dukshmëri dhe hapësirë të mjaftueshme. Mos parakalo në kthesa, në kreshta ose aty ku ndalohet me sinjal.'
      ],
      signs: ['kufizimShpejtesie', 'ndalohetParakalimi'],
      video: '',
      examples: [
        { title: 'Situata', text: 'Mjegull e dendur në autostradë: ul shpejtësinë, ndiz dritat e duhura dhe rrit shumë distancën nga mjeti përpara.' }
      ],
      summary: 'Përshtat shpejtësinë, mbaj distancë dhe parakalo vetëm kur është e sigurt dhe e lejuar.'
    },
    {
      id: 't15', order: 7,
      title: 'Siguria dhe ndihma e parë',
      objectives: [
        'Të kuptosh ndikimin e alkoolit, lodhjes dhe telefonit.',
        'Të dish si të sinjalizosh një mjet të ndaluar në rrugë.',
        'Të njohësh hapat bazë në rast aksidenti.'
      ],
      theory: [
        'Alkooli, lodhja dhe shpërqendrimi (p.sh. telefoni në dorë) e zgjatin kohën e reagimit dhe rrisin rrezikun e aksidentit.',
        'Kur mjeti ndalet në rrugë për defekt, ndiz dritat e emergjencës dhe vendos trekëndëshin e sinjalizimit në distancë të përshtatshme.',
        'Në rast aksidenti: siguro vendin, njofto shërbimet e urgjencës dhe mos e lëviz të plagosurin pa nevojë, sidomos nëse dyshon për dëmtim të shtyllës kurrizore.'
      ],
      signs: ['rrezik'],
      video: '',
      examples: [
        { title: 'Situata', text: 'Ndihesh i përgjumur pas 2 orësh drejtim. Ndalo në një vend të sigurt dhe pusho – kafeja nuk e zëvendëson gjumin.' }
      ],
      summary: 'Pa alkool, pa telefon në dorë, me pushim kur je i lodhur. Në aksident: siguro vendin, thirr ndihmë.'
    }
  ],

  /* Pyetjet zyrtare vijnë nga manuali; këtu ruhen vetëm pyetjet shtesë të adminit. */
  questions: [],

  /* Autoshkollat – të dhënat mblidhen dhe verifikohen përpara publikimit.
     Hyrjet me demo:true janë vetëm shembuj për prototipin. */
  schools: [
    {
      id: 's1', name: 'Autoshkolla Ndoj', city: 'Rrëshen', address: 'Rrëshen, Mirditë (adresa e saktë për t’u plotësuar)',
      phone: '068 20 81 109', email: 'info@autoshkollandoj.com', website: 'www.autoshkollandoj.com',
      lat: 41.7675, lng: 19.8757, categories: ['A1', 'A2', 'B1', 'B'],
      description: 'Autoshkolla që ka krijuar këtë platformë. Kurse teorike dhe praktike për patentë.',
      verified: true, demo: false
    },
    {
      id: 's2', name: 'Autoshkolla Alfa (shembull)', city: 'Durrës', address: 'Durrës – shembull',
      phone: '', email: '', website: '', lat: 41.3231, lng: 19.4414, categories: ['B'],
      description: 'Listim shembull për prototipin. Do të zëvendësohet me të dhëna të verifikuara.',
      verified: false, demo: true
    },
    {
      id: 's3', name: 'Autoshkolla Beta (shembull)', city: 'Vlorë', address: 'Vlorë – shembull',
      phone: '', email: '', website: '', lat: 40.4661, lng: 19.4914, categories: ['A', 'B'],
      description: 'Listim shembull për prototipin. Do të zëvendësohet me të dhëna të verifikuara.',
      verified: false, demo: true
    }
  ]
};
