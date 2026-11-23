/* ==========================================================
   Të dhënat fillestare (seed) të platformës.
   KUJDES: pyetjet dhe parametrat e provimit janë SHEMBUJ
   për prototipin. Para publikimit duhen kontrolluar me
   pyetësorin zyrtar dhe rregullat e DPSHTRR-së.
   Administratori mund t'i ndryshojë të gjitha nga Paneli Admin.
   ========================================================== */
window.SEED = {
  version: 1,

  site: {
    name: 'Autoshkolla Ndoj',
    slogan: 'Më e mira në Tiranë',
    heroTitle: 'Mëso teorinë, ushtrohu dhe përgatitu për provimin',
    heroText: 'Platforma online e Autoshkolla Ndoj: leksione të qarta me figura, teste për çdo kapitull dhe simulim i provimit teorik të patentës – nga kompjuteri, tableti ose telefoni.',
    about: 'Kjo platformë është krijuar nga Autoshkolla Ndoj për të ndihmuar nxënësit të mësojnë rregullat e qarkullimit rrugor dhe të përgatiten me siguri për provimin teorik.',
    phone: '068 20 81 109',
    email: 'info@autoshkollandoj.com',
    website: 'www.autoshkollandoj.com',
    city: 'Tiranë',
    address: 'Tiranë'
  },

  /* Parametrat e simulimit të provimit sipas kategorisë.
     Vlerat fillestare: 40 pyetje / maks. 4 gabime – PËR T'U KONFIRMUAR me DPSHTRR. */
  categories: [
    { id: 'A', name: 'Kategoria A', label: 'Motoçikleta', icon: '🏍️', questions: 40, maxErrors: 4, minutes: 40 },
    { id: 'B', name: 'Kategoria B', label: 'Automjete', icon: '🚗', questions: 40, maxErrors: 4, minutes: 40 },
    { id: 'C', name: 'Kategoria C', label: 'Kamionë', icon: '🚚', questions: 40, maxErrors: 4, minutes: 40 },
    { id: 'D', name: 'Kategoria D', label: 'Autobusë', icon: '🚌', questions: 40, maxErrors: 4, minutes: 40 }
  ],

  chapters: [
    {
      id: 'ch1', order: 1,
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
      id: 'ch2', order: 2,
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
      id: 'ch3', order: 3,
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
      id: 'ch4', order: 4,
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
      id: 'ch5', order: 5,
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
      id: 'ch6', order: 6,
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
      id: 'ch7', order: 7,
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

  /* type: 'tf' = E saktë / E gabuar (si pyetësori zyrtar me fjali)
     type: 'mc' = me alternativa
     cats: kategoritë ku përdoret pyetja në simulimin e provimit */
  questions: [
    // Kapitulli 1
    { id: 'q1', chapter: 'ch1', type: 'tf', text: 'Drejtuesi i mjetit duhet të ketë me vete lejen e drejtimit gjatë drejtimit.', answer: true, explain: 'Leja e drejtimit duhet të jetë me drejtuesin sa herë që drejton mjetin.', cats: ['A', 'B', 'C', 'D'] },
    { id: 'q2', chapter: 'ch1', type: 'tf', text: 'Këmbësorët janë përdorues të rrugës.', answer: true, explain: 'Përdorues të rrugës janë të gjithë ata që lëvizin në të: drejtues, çiklistë dhe këmbësorë.', cats: ['A', 'B', 'C', 'D'] },
    { id: 'q3', chapter: 'ch1', type: 'tf', text: 'Drejtuesi mund të përdorë telefonin me dorë gjatë drejtimit nëse trafiku është i qetë.', answer: false, explain: 'Përdorimi i telefonit me dorë gjatë drejtimit nuk lejohet, sepse shpërqendron drejtuesin.', cats: ['A', 'B', 'C', 'D'] },
    { id: 'q4', chapter: 'ch1', type: 'tf', text: 'Rripi i sigurimit duhet të përdoret edhe nga pasagjerët e ndenjëseve të pasme.', answer: true, explain: 'Rripi duhet përdorur nga të gjithë udhëtarët, para dhe prapa.', cats: ['B', 'C', 'D'] },
    { id: 'q5', chapter: 'ch1', type: 'tf', text: 'Para nisjes, drejtuesi duhet të sigurohet që pasqyrat janë të rregulluara mirë.', answer: true, explain: 'Pasqyrat rregullohen para nisjes, jo gjatë drejtimit.', cats: ['A', 'B', 'C', 'D'] },
    { id: 'q6', chapter: 'ch1', type: 'tf', text: 'Qarkullimi në Shqipëri bëhet në anën e majtë të rrugës.', answer: false, explain: 'Në Shqipëri qarkullohet në anën e djathtë.', cats: ['A', 'B', 'C', 'D'] },
    { id: 'q7', chapter: 'ch1', type: 'tf', text: 'Me lejen e drejtimit të kategorisë B lejohet drejtimi i autobusëve për transport pasagjerësh.', answer: false, explain: 'Autobusët kërkojnë leje drejtimi të kategorisë D.', cats: ['B', 'D'] },

    // Kapitulli 2
    { id: 'q8', chapter: 'ch2', type: 'tf', sign: 'rrezik', text: 'Ky sinjal paralajmëron një rrezik të përgjithshëm.', answer: true, explain: 'Trekëndëshi me pikëçuditëse = rrezik i përgjithshëm.', cats: ['A', 'B', 'C', 'D'] },
    { id: 'q9', chapter: 'ch2', type: 'tf', sign: 'vendkalimKembesoresh', text: 'Ky sinjal tregon se ndalohet kalimi i këmbësorëve.', answer: false, explain: 'Sinjali paralajmëron që më përpara ka vendkalim këmbësorësh.', cats: ['A', 'B', 'C', 'D'] },
    { id: 'q10', chapter: 'ch2', type: 'tf', sign: 'femije', text: 'Ky sinjal kërkon kujdes të shtuar sepse mund të ketë fëmijë në rrugë.', answer: true, explain: 'Vendoset afër shkollave dhe këndeve të lojërave.', cats: ['A', 'B', 'C', 'D'] },
    { id: 'q11', chapter: 'ch2', type: 'tf', sign: 'semafor', text: 'Ky sinjal paralajmëron se më përpara ka semafor.', answer: true, explain: 'Trekëndëshi me semafor paralajmëron një kryqëzim të rregulluar me drita.', cats: ['A', 'B', 'C', 'D'] },
    { id: 'q12', chapter: 'ch2', type: 'tf', sign: 'rrugeRreshqitese', text: 'Ky sinjal tregon rrugë që mund të bëhet e rrëshqitshme.', answer: true, explain: 'Shmang frenimet e forta dhe kthesat e menjëhershme.', cats: ['A', 'B', 'C', 'D'] },
    { id: 'q13', chapter: 'ch2', type: 'tf', sign: 'kthesePerdredhur', text: 'Ky sinjal tregon kthesë të rrezikshme në të majtë.', answer: false, explain: 'Kthesa e treguar në sinjal është në të djathtë.', cats: ['A', 'B', 'C', 'D'] },
    { id: 'q14', chapter: 'ch2', type: 'tf', text: 'Sinjalet e rrezikut zakonisht kanë formë trekëndëshi me buzë të kuqe.', answer: true, explain: 'Forma trekëndore me buzë të kuqe është karakteristike për sinjalet e rrezikut.', cats: ['A', 'B', 'C', 'D'] },
    { id: 'q15', chapter: 'ch2', type: 'mc', sign: 'rrezik', text: 'Çfarë tregon kjo shenjë?', options: ['Rrezik i përgjithshëm', 'Punime në rrugë', 'Kryqëzim i rrezikshëm', 'Kufizim shpejtësie'], answer: 0, explain: 'Pikëçuditësja në trekëndësh = rrezik i përgjithshëm.', cats: [] },

    // Kapitulli 3
    { id: 'q16', chapter: 'ch3', type: 'tf', sign: 'ndalohetHyrja', text: 'Ky sinjal ndalon hyrjen për të gjitha mjetet.', answer: true, explain: 'Rrethi i kuq me vijë të bardhë horizontale = ndalohet hyrja.', cats: ['A', 'B', 'C', 'D'] },
    { id: 'q17', chapter: 'ch3', type: 'tf', sign: 'ndalohetParakalimi', text: 'Ky sinjal lejon parakalimin e automjeteve.', answer: false, explain: 'Ky sinjal NDALON parakalimin e automjeteve.', cats: ['A', 'B', 'C', 'D'] },
    { id: 'q18', chapter: 'ch3', type: 'tf', sign: 'kufizimShpejtesie', text: 'Ky sinjal tregon shpejtësinë minimale të detyrueshme.', answer: false, explain: 'Numri brenda rrethit të kuq tregon shpejtësinë MAKSIMALE.', cats: ['A', 'B', 'C', 'D'] },
    { id: 'q19', chapter: 'ch3', type: 'tf', sign: 'ndalohetParkimi', text: 'Ky sinjal ndalon qëndrimin dhe parkimin.', answer: true, explain: 'Kryqi i kuq mbi sfond blu = ndalohet qëndrimi dhe parkimi.', cats: ['A', 'B', 'C', 'D'] },
    { id: 'q20', chapter: 'ch3', type: 'tf', sign: 'mbajDjathtas', text: 'Ky sinjal detyron drejtuesin të kalojë nga ana e djathtë.', answer: true, explain: 'Rrethi blu me shigjetë poshtë-djathtas = kalim i detyruar djathtas.', cats: ['A', 'B', 'C', 'D'] },
    { id: 'q21', chapter: 'ch3', type: 'tf', sign: 'rrethrrotullim', text: 'Ky sinjal tregon qarkullim të detyruar rrotull sheshit.', answer: true, explain: 'Tri shigjetat në rreth blu = rrethrrotullim.', cats: ['A', 'B', 'C', 'D'] },
    { id: 'q22', chapter: 'ch3', type: 'tf', sign: 'parkim', text: 'Ky sinjal tregon një zonë ku parkimi është i lejuar.', answer: true, explain: 'Shkronja P në sfond blu tregon vend parkimi.', cats: ['A', 'B', 'C', 'D'] },
    { id: 'q23', chapter: 'ch3', type: 'tf', text: 'Sinjalet e detyrimit kanë zakonisht formë rrethore me ngjyrë blu.', answer: true, explain: 'Rreth blu me figurë të bardhë = sinjal detyrimi.', cats: ['A', 'B', 'C', 'D'] },
    { id: 'q24', chapter: 'ch3', type: 'mc', sign: 'ndalohetHyrja', text: 'Çfarë do të thotë ky sinjal?', options: ['Ndalohet hyrja', 'Rrugë pa krye', 'Ndalohet parkimi', 'Fund i rrugës me përparësi'], answer: 0, explain: 'Rrethi i kuq i mbushur me vijë të bardhë = ndalohet hyrja.', cats: [] },

    // Kapitulli 4
    { id: 'q25', chapter: 'ch4', type: 'tf', sign: 'stop', text: 'Te ky sinjal mjafton të ngadalësosh pa ndaluar nëse nuk vjen asnjë mjet.', answer: false, explain: 'Te STOP ndalimi është gjithmonë i plotë dhe i detyrueshëm.', cats: ['A', 'B', 'C', 'D'] },
    { id: 'q26', chapter: 'ch4', type: 'tf', sign: 'jepPerparesi', text: 'Ky sinjal detyron drejtuesin t’u japë përparësi mjeteve në rrugën ku hyn.', answer: true, explain: 'Trekëndëshi me kulm poshtë = jep përparësi.', cats: ['A', 'B', 'C', 'D'] },
    { id: 'q27', chapter: 'ch4', type: 'tf', sign: 'rrugeMePerparesi', text: 'Ky sinjal tregon që je në rrugë me përparësi.', answer: true, explain: 'Rombi i verdhë me buzë të bardhë = rrugë me përparësi.', cats: ['A', 'B', 'C', 'D'] },
    { id: 'q28', chapter: 'ch4', type: 'tf', text: 'Në vendkalimin e këmbësorëve, drejtuesi duhet t’u japë përparësi këmbësorëve që po kalojnë.', answer: true, explain: 'Këmbësorët në vendkalim kanë përparësi.', cats: ['A', 'B', 'C', 'D'] },
    { id: 'q29', chapter: 'ch4', type: 'tf', text: 'Mjeteve të urgjencës me sirenë dhe drita blu të ndezura duhet t’u lehtësohet kalimi.', answer: true, explain: 'Afrohu djathtas në mënyrë të sigurt dhe lëri të kalojnë.', cats: ['A', 'B', 'C', 'D'] },
    { id: 'q30', chapter: 'ch4', type: 'tf', text: 'Në një kryqëzim pa sinjale, drejtuesi ka përparësi ndaj mjeteve që vijnë nga e djathta.', answer: false, explain: 'Pa sinjale, përparësia u jepet mjeteve që vijnë nga e djathta.', cats: ['A', 'B', 'C', 'D'] },
    { id: 'q31', chapter: 'ch4', type: 'mc', sign: 'stop', text: 'Çfarë duhet të bësh te ky sinjal?', options: ['Të ngadalësosh dhe të vazhdosh', 'Të ndalosh plotësisht dhe të japësh përparësi', 'Të bësh me drita', 'Të ndalosh vetëm natën'], answer: 1, explain: 'STOP kërkon ndalim të plotë dhe dhënie përparësie.', cats: [] },

    // Kapitulli 5
    { id: 'q32', chapter: 'ch5', type: 'tf', sign: 'driteKuqe', text: 'Me dritë të kuqe lejohet kalimi nëse kryqëzimi është bosh.', answer: false, explain: 'Me dritë të kuqe ndalon gjithmonë para vijës së ndalimit.', cats: ['A', 'B', 'C', 'D'] },
    { id: 'q33', chapter: 'ch5', type: 'tf', sign: 'driteVerdhe', text: 'Drita e verdhë fikse paralajmëron se do të ndizet drita e kuqe.', answer: true, explain: 'E verdha fikse vjen pas së gjelbrës dhe para së kuqes.', cats: ['A', 'B', 'C', 'D'] },
    { id: 'q34', chapter: 'ch5', type: 'tf', text: 'Udhëzimet e policit rrugor kanë përparësi ndaj sinjaleve të semaforit.', answer: true, explain: 'Udhëzimet e policit kanë përparësi ndaj semaforëve dhe sinjaleve.', cats: ['A', 'B', 'C', 'D'] },
    { id: 'q35', chapter: 'ch5', type: 'tf', text: 'Drita e gjelbër lejon kalimin, por drejtuesi duhet të sigurohet që kryqëzimi është i lirë.', answer: true, explain: 'Mos hyr në kryqëzim nëse nuk ke vend ta kalosh plotësisht.', cats: ['A', 'B', 'C', 'D'] },
    { id: 'q36', chapter: 'ch5', type: 'tf', text: 'Drita e verdhë që pulson do të thotë se mund të kalosh pa pasur nevojë për kujdes.', answer: false, explain: 'E verdha që pulson kërkon kujdes të shtuar dhe zbatim të rregullave të përparësisë.', cats: ['A', 'B', 'C', 'D'] },

    // Kapitulli 6
    { id: 'q37', chapter: 'ch6', type: 'tf', text: 'Distanca e sigurisë duhet të rritet kur rruga është e lagur.', answer: true, explain: 'Në rrugë të lagur frenimi zgjat më shumë.', cats: ['A', 'B', 'C', 'D'] },
    { id: 'q38', chapter: 'ch6', type: 'tf', text: 'Shpejtësia duhet përshtatur me kushtet e rrugës, motit dhe trafikut.', answer: true, explain: 'Kufiri i shpejtësisë është maksimumi, jo shpejtësia e detyrueshme.', cats: ['A', 'B', 'C', 'D'] },
    { id: 'q39', chapter: 'ch6', type: 'tf', text: 'Parakalimi në kthesa me dukshmëri të kufizuar lejohet nëse bëhet shpejt.', answer: false, explain: 'Në kthesa me dukshmëri të kufizuar parakalimi është i rrezikshëm dhe i ndaluar.', cats: ['A', 'B', 'C', 'D'] },
    { id: 'q40', chapter: 'ch6', type: 'tf', text: 'Para parakalimit duhet kontrolluar pasqyra dhe të ndizet sinjalizuesi.', answer: true, explain: 'Pasqyrë – sinjal – manovër.', cats: ['A', 'B', 'C', 'D'] },
    { id: 'q41', chapter: 'ch6', type: 'tf', text: 'Parakalimi bëhet zakonisht nga ana e majtë.', answer: true, explain: 'Në qarkullimin me krahun e djathtë, parakalimi bëhet nga e majta.', cats: ['A', 'B', 'C', 'D'] },
    { id: 'q42', chapter: 'ch6', type: 'tf', text: 'Distanca e frenimit zvogëlohet kur shpejtësia rritet.', answer: false, explain: 'Sa më e madhe shpejtësia, aq më e gjatë distanca e frenimit.', cats: ['A', 'B', 'C', 'D'] },
    { id: 'q43', chapter: 'ch6', type: 'tf', text: 'Në mjegull të dendur duhet ulur shpejtësia dhe ndezur dritat përkatëse.', answer: true, explain: 'Mjegulla ul dukshmërinë – ngadalëso dhe bëhu i dukshëm.', cats: ['A', 'B', 'C', 'D'] },

    // Kapitulli 7
    { id: 'q44', chapter: 'ch7', type: 'tf', text: 'Alkooli e ngadalëson kohën e reagimit të drejtuesit.', answer: true, explain: 'Alkooli ul vëmendjen dhe zgjat kohën e reagimit.', cats: ['A', 'B', 'C', 'D'] },
    { id: 'q45', chapter: 'ch7', type: 'tf', text: 'Lodhja nuk ndikon në drejtimin e mjetit.', answer: false, explain: 'Lodhja ul vëmendjen dhe mund të shkaktojë gjumë në timon.', cats: ['A', 'B', 'C', 'D'] },
    { id: 'q46', chapter: 'ch7', type: 'tf', text: 'Fëmijët e vegjël duhet të transportohen me karrige sigurie të përshtatshme.', answer: true, explain: 'Karrigia e fëmijës duhet të përshtatet me moshën dhe peshën.', cats: ['B', 'C', 'D'] },
    { id: 'q47', chapter: 'ch7', type: 'tf', text: 'Në rast aksidenti, vendi duhet sinjalizuar për të paralajmëruar mjetet e tjera.', answer: true, explain: 'Dritat e emergjencës dhe trekëndëshi parandalojnë aksidente të tjera.', cats: ['A', 'B', 'C', 'D'] },
    { id: 'q48', chapter: 'ch7', type: 'tf', text: 'Një i plagosur me dëmtim të mundshëm të shtyllës kurrizore duhet lëvizur menjëherë, edhe pa nevojë.', answer: false, explain: 'Mos e lëviz të plagosurin pa nevojë – mund ta rëndosh dëmtimin.', cats: ['A', 'B', 'C', 'D'] },
    { id: 'q49', chapter: 'ch7', type: 'tf', text: 'Gomat me vija të konsumuara rrisin rrezikun e rrëshqitjes.', answer: true, explain: 'Gomat e konsumuara kapin më pak rrugën, sidomos në të lagësht.', cats: ['A', 'B', 'C', 'D'] },
    { id: 'q50', chapter: 'ch7', type: 'tf', text: 'Helmeta mbrojtëse është e detyrueshme për drejtuesin e motoçikletës.', answer: true, explain: 'Helmeta mbron kokën dhe është e detyrueshme.', cats: ['A'] },
    { id: 'q51', chapter: 'ch7', type: 'tf', text: 'Trekëndëshi i sinjalizimit përdoret kur mjeti ndalet në rrugë për defekt.', answer: true, explain: 'Vendoset në distancë të përshtatshme pas mjetit.', cats: ['A', 'B', 'C', 'D'] },
    { id: 'q52', chapter: 'ch7', type: 'mc', text: 'Ndihesh i përgjumur gjatë drejtimit. Çfarë bën?', options: ['Hap dritaren dhe vazhdoj', 'Rris shpejtësinë që të mbërrij shpejt', 'Ndaloj në vend të sigurt dhe pushoj', 'Ndez muzikën me zë të lartë'], answer: 2, explain: 'E vetmja zgjidhje e sigurt për lodhjen është pushimi.', cats: [] }
  ],

  /* Autoshkollat – të dhënat mblidhen dhe verifikohen përpara publikimit.
     Hyrjet me demo:true janë vetëm shembuj për prototipin. */
  schools: [
    {
      id: 's1', name: 'Autoshkolla Ndoj', city: 'Tiranë', address: 'Tiranë (adresa e saktë për t’u plotësuar)',
      phone: '068 20 81 109', email: 'info@autoshkollandoj.com', website: 'www.autoshkollandoj.com',
      lat: 41.3275, lng: 19.8187, categories: ['A', 'B', 'C', 'D'],
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
