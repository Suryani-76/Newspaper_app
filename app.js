/* ============================================================
   CineWire — Complete App Script (v3)
   ============================================================ */
'use strict';
const $  = id  => document.getElementById(id);
const $$ = sel => document.querySelectorAll(sel);



/* ============================================================
   DATA
   ============================================================ */
const COUNTRIES = [
  {code:'GL',name:'Global'},
  {code:'US',name:'United States'},{code:'GB',name:'United Kingdom'},
  {code:'JP',name:'Japan'},{code:'KR',name:'South Korea'},
  {code:'IN',name:'India'},{code:'FR',name:'France'},
  {code:'DE',name:'Germany'},{code:'IT',name:'Italy'},
  {code:'MX',name:'Mexico'},{code:'CN',name:'China'},
  {code:'AU',name:'Australia'},{code:'BR',name:'Brazil'},
  {code:'ES',name:'Spain'},{code:'SE',name:'Sweden'},
  {code:'CA',name:'Canada'},{code:'TH',name:'Thailand'},
];
const COUNTRY_MAP = {};
COUNTRIES.forEach(c => { COUNTRY_MAP[c.code] = c; });

const BOX_OFFICE = [
  {rank:1,title:'Neon Horizon: Legacy',gross:'$342M',trend:'up'},
  {rank:2,title:'Godzilla: Fall of the Empire',gross:'$288M',trend:'same'},
  {rank:3,title:'Anatomy of a Whisper',gross:'$201M',trend:'up'},
  {rank:4,title:'Dune: Messiah',gross:'$198M',trend:'down'},
  {rank:5,title:'The Wind and the Seed',gross:'$155M',trend:'same'},
];

const AWARDS = {
  name:'99th Academy Awards',
  date: new Date('2027-03-14T19:00:00-08:00'),
  nominees:[
    {cat:'Best Picture',  name:'Anatomy of a Whisper', odds:'3/1'},
    {cat:'Best Director', name:'Denis Villeneuve',      odds:'2/1'},
    {cat:'Best Actress',  name:'Saoirse Ronan',         odds:'5/2'},
    {cat:'Best Actor',    name:'Song Kang-ho',          odds:'4/1'},
    {cat:'Best Animated', name:'The Wind and the Seed', odds:'1/1'},
  ]
};

const POLL = {
  id:'poll-jul-2026',
  question:'Which 2027 sequel are you most excited for?',
  options:[
    {id:'a',text:'Dune: Messiah',         votes:4820},
    {id:'b',text:'Godzilla: Fall of Empire',votes:3210},
    {id:'c',text:'Squid Game Season 3',   votes:5540},
    {id:'d',text:'Bond 26',               votes:2900},
  ],
};

const NOTIFICATIONS = [
  {id:'n1',text:'BREAKING: Cannes Palme d\'Or winner announced.',time:'2 min ago',read:false},
  {id:'n2',text:'New trailer: Dune Messiah official teaser.',    time:'18 min ago',read:false},
  {id:'n3',text:'Godzilla sequel: $288M opening weekend.',       time:'1 hr ago',  read:false},
  {id:'n4',text:'TIFF 2026 lineup: 52 world premieres.',         time:'3 hrs ago', read:true},
  {id:'n5',text:'Studio Ghibli confirms new Miyazaki film.',     time:'5 hrs ago', read:true},
];

const STREAMING = [
  {title:'Neon Horizon: Legacy', platform:'Prime Video',genre:'Sci-Fi', grad:'article-bg-grad-2',img:'https://picsum.photos/id/450/600/340'},
  {title:'Quiet Echoes',         platform:'Apple TV+',  genre:'Drama',  grad:'article-bg-grad-3',img:'https://picsum.photos/id/1045/600/340'},
  {title:'Squid Game S3',        platform:'Netflix',    genre:'Thriller',grad:'article-bg-grad-4',img:'https://picsum.photos/id/1062/600/340'},
  {title:'Parisian Rhapsody',    platform:'Mubi',       genre:'Romance',grad:'article-bg-grad-3',img:'https://picsum.photos/id/318/600/340'},
  {title:'The Subterrene Epoch', platform:'Disney+',    genre:'Sci-Fi', grad:'article-bg-grad-6',img:'https://picsum.photos/id/1080/600/340'},
  {title:'Anatomy of a Whisper', platform:'Netflix',    genre:'Drama',  grad:'article-bg-grad-1',img:'https://picsum.photos/id/1067/600/340'},
];

const EDITORS_PICKS_IDS = ['gl-1','us-1','jp-1','kr-1'];

const ARTICLES = [
  {id:'gl-1',region:'GL',category:'Festival',badge:'BREAKING',tab:'latest',criticScore:92,audienceScore:87,readTimeMins:5,trailerUrl:true,
   grad:'article-bg-grad-1',img:'https://picsum.photos/id/1067/1400/700',
   title:"Cannes 2026: Palm d'Or Nominations Officially Revealed",
   dek:"The 80th Cannes Film Festival unveils its most diverse competition roster in decades.",
   body:["The committee for the 80th Cannes Film Festival has officially unveiled the Palm d'Or competition selection for 2026. This year's lineup bridges mainstream masters and radical new voices from emerging regions.","Female-led directorships make up nearly 40% of the main competition roster. Themes focus on ecological anxieties, AI-human philosophy, and speculative historical fiction.","<blockquote>We are looking for films that shake our foundations. Cinema is meant to confront, soothe, and expand.</blockquote>","The festival opens on May 14. Among the most talked-about entries is a debut feature from a 28-year-old Senegalese director, shot on 16mm in a remote fishing village."],
   author:{name:'Elena Rostova',avatar:'E',bio:'Senior Festival Correspondent. Covers Cannes, Venice, and Berlin annually.'},
   publishedAt:'2026-07-28T08:00:00Z',
   gallery:['article-bg-grad-1','article-bg-grad-2','article-bg-grad-3'],
   tags:['Cannes','Festival','Palm d\'Or','2026','Greta Gerwig'],
   streamingOn:['Mubi','Apple TV+'],
   relatedMovies:[{title:'Specters of Tomorrow',date:'Nov 2026',rating:'8.4',grad:'article-bg-grad-1',img:'https://picsum.photos/id/1067/400/600'},{title:'La Luce Perduta',date:'Sep 2026',rating:'8.3',grad:'article-bg-grad-4',img:'https://picsum.photos/id/365/400/600'}],
   cast:[{name:'Greta Gerwig',role:'Jury President',grad:'article-bg-grad-1'},{name:'Wim Wenders',role:'Competition',grad:'article-bg-grad-5'}],
   reactions:{like:2840,fire:1320,wow:640,love:980},
   comments:[{id:'c1',user:'Cinephile99',avatar:'C',verified:false,text:'Incredibly excited for the Senegalese debut!',time:'1 hour ago',likes:142,replies:[{id:'r1',user:'WellesFan',avatar:'W',verified:false,text:'Cannes discovering world cinema at its finest.',time:'45 min ago',likes:38}]},{id:'c2',user:'FestivalCritic',avatar:'F',verified:true,text:'40% female directors is historic. Long overdue.',time:'30 min ago',likes:211,replies:[]}]},

  {id:'gl-2',region:'GL',category:'Box Office',badge:'EXCLUSIVE',tab:'boxoffice',criticScore:78,audienceScore:88,readTimeMins:4,trailerUrl:false,
   grad:'article-bg-grad-2',img:'https://picsum.photos/id/2/1400/700',
   title:'Global Box Office Smashes Records: $12 Billion Summer Season',
   dek:'Theater chains worldwide celebrate a massive resurgence as blockbuster season obliterates post-pandemic benchmarks.',
   body:['The global box office crossed $12 billion this summer — the highest single-season figure ever recorded.','IMAX and Dolby Cinema locations reported sold-out weekends for six consecutive weeks. Premium large-format admissions accounted for a record 24% of total revenue.','<blockquote>People want the communal, spectacular experience that only cinema can provide.</blockquote>','Mid-budget films also saw recovery, with several $40M–$80M productions performing above expectations.'],
   author:{name:'Marcus Vane',avatar:'M',bio:'Box Office and Industry Analyst.'},
   publishedAt:'2026-07-27T14:00:00Z',
   gallery:['article-bg-grad-2','article-bg-grad-5'],tags:['Box Office','IMAX','Industry'],
   streamingOn:['Prime Video'],relatedMovies:[],cast:[],
   reactions:{like:1840,fire:920,wow:430,love:620},
   comments:[{id:'c3',user:'PopcornJunkie',avatar:'P',verified:false,text:'IMAX experience was absolutely mind-blowing.',time:'4 hours ago',likes:88,replies:[]}]},

  {id:'gl-3',region:'GL',category:'Festival',badge:null,tab:'latest',criticScore:85,audienceScore:80,readTimeMins:3,trailerUrl:false,
   grad:'article-bg-grad-3',img:'https://picsum.photos/id/1053/1400/700',
   title:'TIFF 2026: Toronto Sets Stage for Massive International Showcase',
   dek:'52 world premieres from 38 countries — TIFF confirms its most international lineup ever.',
   body:['The Toronto International Film Festival has laid out its program for 2026, featuring 52 world premieres from 38 countries.','Toronto is placing special emphasis on international co-productions.','Three of the ten lead films in Special Presentations are female-directed.'],
   author:{name:'Sarah Jenkins',avatar:'S',bio:'Awards Season Editor.'},
   publishedAt:'2026-07-26T10:00:00Z',
   gallery:['article-bg-grad-3'],tags:['TIFF','Festival','Toronto','Awards'],
   streamingOn:['Apple TV+'],relatedMovies:[],cast:[],
   reactions:{like:1210,fire:440,wow:210,love:390},comments:[]},

  {id:'gl-4',region:'GL',category:'Editorial',badge:null,tab:'editorial',criticScore:0,audienceScore:0,readTimeMins:6,trailerUrl:false,
   grad:'article-bg-grad-4',img:'https://picsum.photos/id/180/1400/700',
   title:'Streaming vs Theatrical: The Great 2026 Reckoning',
   dek:'A deep-dive into how studios are rethinking streaming-first after the most lucrative summer box office in history.',
   body:['The battle between streaming and theatrical has taken a dramatic new turn. Studios are revisiting their streaming-first policies as theaters report their highest attendance in over a decade.','<blockquote>We are not in competition with theaters. We are in partnership.</blockquote>','Studios that maintained exclusive theatrical windows of 45+ days saw 32% higher streaming premiere viewership.'],
   author:{name:'Priya Nair',avatar:'P',bio:'Industry analyst and editor at large.'},
   publishedAt:'2026-07-25T12:00:00Z',
   gallery:[],tags:['Editorial','Streaming','Industry','Business'],
   streamingOn:[],relatedMovies:[],cast:[],
   reactions:{like:2100,fire:880,wow:340,love:560},
   comments:[{id:'c4',user:'IndieProd',avatar:'I',verified:true,text:'Most important industry shift of the decade.',time:'12 hours ago',likes:320,replies:[]}]},

  {id:'us-1',region:'US',category:'Awards',badge:'EXCLUSIVE',tab:'latest',criticScore:88,audienceScore:84,readTimeMins:6,trailerUrl:false,
   grad:'article-bg-grad-1',img:'https://picsum.photos/id/1074/1400/700',
   title:"Oscars 2027: Inside the Best Picture Race — Five Films You Need to Watch",
   dek:"The 99th Academy Awards is shaping up to be the most unpredictable in years, with no clear frontrunner after the fall festival season.",
   body:["With the fall festival season in full swing, Hollywood insiders are projecting frontrunners for the 99th Academy Awards. Unlike previous years, the 2027 Best Picture race is a chaotic multi-way clash of genres.","Early critical darlings from Sundance maintain momentum, but face competition from summer blockbusters.","<blockquote>This is the most open race I've covered in 18 years. Any of the top six films could genuinely win.</blockquote>","Academy voting guidelines modified last year have resulted in a more democratic field."],
   author:{name:'Clayton Davis',avatar:'C',bio:'Awards analyst. Covers the Oscar race August through March.'},
   publishedAt:'2026-07-28T07:00:00Z',
   gallery:['article-bg-grad-1'],tags:['Oscars','Awards','Academy Awards','2027'],
   streamingOn:['Netflix'],relatedMovies:[{title:'Anatomy of a Whisper',date:'Nov 2026',rating:'8.5',grad:'article-bg-grad-1',img:'https://picsum.photos/id/1074/400/600'}],
   cast:[{name:'Saoirse Ronan',role:'Lead Actress',grad:'article-bg-grad-1'},{name:'Denis Villeneuve',role:'Director',grad:'article-bg-grad-2'}],
   reactions:{like:3840,fire:2100,wow:780,love:1640},
   comments:[{id:'c5',user:'OscarNerd',avatar:'O',verified:true,text:'Saoirse Ronan is locking in her nomination.',time:'30 min ago',likes:428,replies:[]}]},

  {id:'us-2',region:'US',category:'Production',badge:null,tab:'upcoming',criticScore:0,audienceScore:0,readTimeMins:3,trailerUrl:false,
   grad:'article-bg-grad-2',img:'https://picsum.photos/id/1084/1400/700',
   title:"Denis Villeneuve Confirms Dune: Messiah Script is Complete",
   dek:"The trilogy concludes — Villeneuve promises his darkest film yet.",
   body:["Denis Villeneuve officially confirmed that the screenplay for 'Dune: Messiah' has been finalised.","The film is considerably darker — focusing on the terrible cost of messianic prophecy and religious fanaticism.","<blockquote>Paul Atreides is not a hero in Messiah. He is a warning. That's what Herbert intended.</blockquote>","Pre-production is underway at Warner Bros. The returning cast includes Timothée Chalamet, Zendaya, and Florence Pugh."],
   author:{name:'Justin Kroll',avatar:'J',bio:'Production and casting correspondent.'},
   publishedAt:'2026-07-27T11:00:00Z',
   gallery:['article-bg-grad-2'],tags:['Dune','Denis Villeneuve','Sci-Fi','Warner Bros'],
   streamingOn:['Max'],relatedMovies:[{title:'Dune: Part Two',date:'2024',rating:'8.8',grad:'article-bg-grad-2',img:'https://picsum.photos/id/1084/400/600'}],
   cast:[{name:'Timothée Chalamet',role:'Paul Atreides',grad:'article-bg-grad-2'},{name:'Zendaya',role:'Chani',grad:'article-bg-grad-3'}],
   reactions:{like:5210,fire:3840,wow:1200,love:2980},
   comments:[{id:'c6',user:'ArrakisDreamer',avatar:'A',verified:false,text:'Villeneuve describing Paul as a warning — this will be devastating.',time:'6 hours ago',likes:612,replies:[]}]},

  {id:'us-3',region:'US',category:'Marvel',badge:null,tab:'upcoming',criticScore:0,audienceScore:0,readTimeMins:4,trailerUrl:false,
   grad:'article-bg-grad-5',img:'https://picsum.photos/id/1076/1400/700',
   title:"Marvel Phase 6 Roadmap Confirmed: Four Films, Two Series, One Event",
   dek:"An internal Marvel presentation has been verified, detailing a packed 2027 slate headlined by a fully rebooted X-Men.",
   body:["Marvel Studios has confirmed its Phase 6 lineup. The announcement details four theatrical releases, two Disney+ series, and one large-scale event production.","The centerpiece is a full X-Men reboot helmed by a director described only as 'a major filmmaker making their Marvel debut.'","Kevin Feige stated: <blockquote>Phase 6 is the beginning of a new era. The Multiverse Saga ends. Something entirely new begins.</blockquote>"],
   author:{name:'Brandon Davis',avatar:'B',bio:'Marvel and DC correspondent.'},
   publishedAt:'2026-07-26T15:00:00Z',
   gallery:['article-bg-grad-5'],tags:['Marvel','Phase 6','X-Men','Avengers','Disney'],
   streamingOn:['Disney+'],relatedMovies:[],cast:[],
   reactions:{like:6820,fire:4400,wow:2100,love:3200},comments:[]},

  {id:'jp-1',region:'JP',category:'Anime',badge:'BREAKING',tab:'latest',criticScore:96,audienceScore:98,readTimeMins:4,trailerUrl:false,
   grad:'article-bg-grad-3',img:'https://picsum.photos/id/1016/1400/700',
   title:"Studio Ghibli Confirms New Hand-Drawn Feature: Miyazaki Begins Production",
   dek:"In a move that surprised the animation world, Hayao Miyazaki has commenced storyboarding on a brand-new feature.",
   body:["Studio Ghibli confirmed that Hayao Miyazaki has officially commenced storyboarding on a new feature film. The project is described as a highly personal fantasy adventure returning to Ghibli's hand-drawn foundations.","<blockquote>Miyazaki cannot stop creating. As long as he is alive, he will paint worlds. This project has a profound, reflective soul.</blockquote>","The film has no confirmed release date but a 2028–2029 window is widely expected."],
   author:{name:'Hiroshi Sato',avatar:'H',bio:'Tokyo-based animation correspondent.'},
   publishedAt:'2026-07-28T06:00:00Z',
   gallery:['article-bg-grad-3','article-bg-grad-6'],tags:['Ghibli','Miyazaki','Animation','Anime','Japan'],
   streamingOn:['Netflix','Max'],relatedMovies:[{title:'The Boy and the Heron',date:'2023',rating:'9.0',grad:'article-bg-grad-3',img:'https://picsum.photos/id/1016/400/600'}],
   cast:[{name:'Hayao Miyazaki',role:'Director',grad:'article-bg-grad-3'}],
   reactions:{like:8420,fire:6200,wow:3400,love:7100},
   comments:[{id:'c7',user:'GhibliStan',avatar:'G',verified:false,text:"Miyazaki 'retiring' is the greatest running joke in cinema history.",time:'2 hours ago',likes:1820,replies:[]}]},

  {id:'jp-2',region:'JP',category:'Kaiju',badge:null,tab:'boxoffice',criticScore:0,audienceScore:0,readTimeMins:3,trailerUrl:false,
   grad:'article-bg-grad-1',img:'https://picsum.photos/id/1036/1400/700',
   title:"Godzilla: Fall of the Empire — Sequel Confirmed, Yamazaki Returns",
   dek:"Toho greenlit the follow-up to the Oscar-winning Minus One.",
   body:["Toho Studios officially greenlit a sequel to 'Godzilla Minus One'. Director Takashi Yamazaki will return to write and direct.","The next film explores the lingering radioactive fallout of post-war Tokyo."],
   author:{name:'Takahiro Mori',avatar:'T',bio:'Toho correspondent and Kaiju cinema historian.'},
   publishedAt:'2026-07-27T09:00:00Z',
   gallery:['article-bg-grad-1'],tags:['Godzilla','Kaiju','Toho','Japan','Sequel'],
   streamingOn:['Prime Video'],relatedMovies:[{title:'Godzilla Minus One',date:'2023',rating:'8.7',grad:'article-bg-grad-1',img:'https://picsum.photos/id/1036/400/600'}],
   cast:[{name:'Takashi Yamazaki',role:'Director',grad:'article-bg-grad-1'}],
   reactions:{like:4200,fire:2800,wow:1100,love:1900},
   comments:[{id:'c8',user:'GojiraFan',avatar:'G',verified:false,text:'Minus One was one of the best films of the decade.',time:'5 hours ago',likes:388,replies:[]}]},

  {id:'kr-1',region:'KR',category:'Production',badge:'EXCLUSIVE',tab:'latest',criticScore:0,audienceScore:0,readTimeMins:5,trailerUrl:false,
   grad:'article-bg-grad-2',img:'https://picsum.photos/id/1060/1400/700',
   title:"Bong Joon-ho Begins Casting Sci-Fi Thriller with Song Kang-ho",
   dek:"The Parasite director reunites with his favourite collaborator for a claustrophobic underground sci-fi thriller.",
   body:["Bong Joon-ho has officially entered pre-production on his next Korean-language feature, casting Song Kang-ho in the lead role.","The project is a high-concept sci-fi social thriller set in a dystopian underground transit colony.","<blockquote>The underground is the new above. Power, class, survival — they follow us wherever we go.</blockquote>","Filming begins in Seoul and Busan in early autumn."],
   author:{name:'Kim Min-soo',avatar:'K',bio:'Seoul-based film correspondent.'},
   publishedAt:'2026-07-28T05:00:00Z',
   gallery:['article-bg-grad-2'],tags:['Bong Joon-ho','Song Kang-ho','Korea','Sci-Fi'],
   streamingOn:['Netflix'],relatedMovies:[{title:'Parasite',date:'2019',rating:'9.0',grad:'article-bg-grad-2',img:'https://picsum.photos/id/1060/400/600'}],
   cast:[{name:'Bong Joon-ho',role:'Director',grad:'article-bg-grad-2'},{name:'Song Kang-ho',role:'Lead',grad:'article-bg-grad-4'}],
   reactions:{like:5600,fire:4100,wow:1600,love:3300},
   comments:[{id:'c9',user:'ParasiteWinner',avatar:'P',verified:true,text:'Bong + Song Kang-ho is the greatest director-actor duo in modern cinema.',time:'20 min ago',likes:820,replies:[]}]},

  {id:'in-1',region:'IN',category:'Tollywood',badge:null,tab:'latest',criticScore:0,audienceScore:0,readTimeMins:5,trailerUrl:false,
   grad:'article-bg-grad-2',img:'https://picsum.photos/id/1051/1400/700',
   title:"SS Rajamouli Reveals SSMB29 Title, Scale, and Global Production Partners",
   dek:"Following RRR, India's most bankable director breaks silence on his next chapter with Mahesh Babu.",
   body:["Rajamouli shared that SSMB29 will be a globetrotting forest adventure, deeply rooted in Indian mythology but designed for universal audiences.","Mahesh Babu has completed rigorous physical training in Germany. The budget is set to comfortably exceed RRR — the most expensive Indian production ever.","<blockquote>I want to take Indian cinema to the audience that has never thought to look for it. This film is for the world.</blockquote>"],
   author:{name:'Ramesh Bala',avatar:'R',bio:'South Indian cinema correspondent.'},
   publishedAt:'2026-07-28T04:00:00Z',
   gallery:['article-bg-grad-2'],tags:['Rajamouli','SSMB29','Mahesh Babu','Tollywood'],
   streamingOn:['Prime Video'],relatedMovies:[{title:'RRR',date:'2022',rating:'8.0',grad:'article-bg-grad-2',img:'https://picsum.photos/id/1051/400/600'}],
   cast:[{name:'SS Rajamouli',role:'Director',grad:'article-bg-grad-2'},{name:'Mahesh Babu',role:'Lead',grad:'article-bg-grad-5'}],
   reactions:{like:7400,fire:5600,wow:2200,love:4800},
   comments:[{id:'c10',user:'RRRFan',avatar:'R',verified:false,text:'RRR proved Rajamouli can sell Indian cinema globally.',time:'40 min ago',likes:932,replies:[]}]},

  {id:'gb-1',region:'GB',category:'Casting',badge:'EXCLUSIVE',tab:'latest',criticScore:0,audienceScore:0,readTimeMins:4,trailerUrl:false,
   grad:'article-bg-grad-1',img:'https://picsum.photos/id/325/1400/700',
   title:"Bond 26: Final Screen Tests Underway — Three Actors in Contention for 007",
   dek:"Sources inside Pinewood confirm the producer team has shortlisted three British actors.",
   body:["EON Productions has narrowed the field to three British actors currently in final screen tests at Pinewood Studios.","Producers Barbara Broccoli and Michael G. Wilson are seeking a candidate willing to commit to a decade-long, multi-film contract.","<blockquote>This is perhaps the most consequential casting decision in franchise cinema history. We will get it right.</blockquote>"],
   author:{name:'Simon Thompson',avatar:'S',bio:'UK film correspondent. Bond franchise specialist.'},
   publishedAt:'2026-07-28T08:30:00Z',
   gallery:['article-bg-grad-1'],tags:['James Bond','007','Casting','UK'],
   streamingOn:['Prime Video'],relatedMovies:[],cast:[],
   reactions:{like:4100,fire:2200,wow:900,love:1600},
   comments:[{id:'c11',user:'Double07',avatar:'D',verified:false,text:'Aaron Taylor-Johnson would be absolutely perfect.',time:'1 hour ago',likes:540,replies:[]}]},

  {id:'fr-1',region:'FR',category:'Industry',badge:null,tab:'editorial',criticScore:0,audienceScore:0,readTimeMins:3,trailerUrl:false,
   grad:'article-bg-grad-3',img:'https://picsum.photos/id/318/1400/700',
   title:"French Cinema Attendance Hits 50-Year High: Local Films Beat Hollywood",
   dek:"The CNC reports French films outperformed Hollywood imports for the first time since the 1970s.",
   body:["France's National Center for Cinema reports that theatrical attendance has reached levels not seen since the late 1960s.","The boom is fueled by generous government subsidies allowing young directors to execute ambitious scripts."],
   author:{name:'Chloé Dupont',avatar:'C',bio:'Paris-based film journalist.'},
   publishedAt:'2026-07-27T13:00:00Z',
   gallery:['article-bg-grad-3'],tags:['France','Box Office','Industry','French Cinema'],
   streamingOn:['Mubi'],relatedMovies:[],cast:[],
   reactions:{like:1200,fire:480,wow:210,love:380},comments:[]},

  {id:'de-1',region:'DE',category:'Cinema',badge:null,tab:'editorial',criticScore:0,audienceScore:0,readTimeMins:5,trailerUrl:false,
   grad:'article-bg-grad-5',img:'https://picsum.photos/id/338/1400/700',
   title:"Wim Wenders Announces His Final Feature Film After Six Decades",
   dek:"The 80-year-old master is embarking on a farewell road movie across three European countries.",
   body:["Wim Wenders announced his next feature will be his last. The filmmaker describes the project as 'a final letter to the landscape of Europe.'","The film will follow an elderly musician traveling through Germany, France, and Portugal, shot on 16mm film."],
   author:{name:'Klaus Fischer',avatar:'K',bio:'German cinema correspondent.'},
   publishedAt:'2026-07-27T10:00:00Z',
   gallery:['article-bg-grad-5'],tags:['Wim Wenders','Germany','European Cinema','16mm'],
   streamingOn:['Mubi'],relatedMovies:[],
   cast:[{name:'Wim Wenders',role:'Director',grad:'article-bg-grad-5'}],
   reactions:{like:980,fire:340,wow:420,love:760},
   comments:[{id:'c12',user:'RoadMovieFan',avatar:'R',verified:false,text:'Paris, Texas still hits like nothing else.',time:'1 hour ago',likes:210,replies:[]}]},

  {id:'it-1',region:'IT',category:'Festival',badge:null,tab:'latest',criticScore:88,audienceScore:82,readTimeMins:4,trailerUrl:false,
   grad:'article-bg-grad-1',img:'https://picsum.photos/id/365/1400/700',
   title:"Venice 2026: Guadagnino's La Luce Perduta is the Golden Lion Frontrunner",
   dek:"The 83rd Venice Film Festival competition is dominated by one film — but jury president Almodóvar promises surprises.",
   body:["The 83rd Venice Film Festival has unveiled its competition lineup. Luca Guadagnino's 'La Luce Perduta' is the overwhelming critical favourite after press screenings.","Jury President Pedro Almodóvar has committed to seeking films that 'disrupt comfortable viewing.'"],
   author:{name:'Marco Rossi',avatar:'M',bio:'Venice and Rome correspondent.'},
   publishedAt:'2026-07-28T07:30:00Z',
   gallery:['article-bg-grad-1'],tags:['Venice','Festival','Guadagnino','Golden Lion','Italy'],
   streamingOn:['Mubi'],relatedMovies:[],
   cast:[{name:'Luca Guadagnino',role:'Director',grad:'article-bg-grad-1'},{name:'Tilda Swinton',role:'Lead',grad:'article-bg-grad-4'}],
   reactions:{like:1600,fire:720,wow:340,love:840},
   comments:[{id:'c13',user:'VeniceWatcher',avatar:'V',verified:true,text:'Guadagnino and Tilda Swinton together again.',time:'2 hours ago',likes:310,replies:[]}]},

  {id:'mx-1',region:'MX',category:'Production',badge:null,tab:'upcoming',criticScore:0,audienceScore:0,readTimeMins:4,trailerUrl:false,
   grad:'article-bg-grad-6',img:'https://picsum.photos/id/372/1400/700',
   title:"Alfonso Cuarón Returns to Mexico for His Most Personal Film Since Roma",
   dek:"The Oscar-winner is shooting an intimate 24-hour portrait of Mexico City.",
   body:["Cuarón confirmed his next feature will be filmed entirely in Mexico City — his most personal project since Roma.","An open casting call drew over 18,000 submissions.","<blockquote>This is about finding the invisible threads connecting working-class and elite lives in a sprawling metropolis.</blockquote>"],
   author:{name:'Carlos Mendoza',avatar:'C',bio:'Latin American cinema correspondent.'},
   publishedAt:'2026-07-28T06:30:00Z',
   gallery:['article-bg-grad-6'],tags:['Cuarón','Mexico','Roma','Production'],
   streamingOn:['Netflix'],relatedMovies:[],
   cast:[{name:'Alfonso Cuarón',role:'Director',grad:'article-bg-grad-6'}],
   reactions:{like:2200,fire:980,wow:420,love:1600},
   comments:[{id:'c14',user:'RomaFan',avatar:'R',verified:false,text:'Roma is one of the most beautiful films ever made.',time:'30 min ago',likes:420,replies:[]}]},
];

const ARTICLE_MAP = {};
ARTICLES.forEach(a => { ARTICLE_MAP[a.id] = a; });

/* ============================================================
   STATE
   ============================================================ */
const STATE = {
  theme:           localStorage.getItem('cw_theme')            || 'dark',
  activeRegion:    localStorage.getItem('cw_region')           || 'GL',
  followedRegions: JSON.parse(localStorage.getItem('cw_followed') || '["GL"]'),
  bookmarks:       JSON.parse(localStorage.getItem('cw_bookmarks')|| '[]'),
  pollVote:        localStorage.getItem('cw_poll')             || null,
  notifRead:       JSON.parse(localStorage.getItem('cw_nread') || '[]'),
  isLoggedIn:      JSON.parse(localStorage.getItem('cw_auth')  || 'false'),
  user:            JSON.parse(localStorage.getItem('cw_user')  || 'null'),
  watchlist:       JSON.parse(localStorage.getItem('cw_wl')    || '[]'),
  recentSearches:  JSON.parse(localStorage.getItem('cw_sch')   || '[]'),
  // Session
  activeTab:   'latest',
  activeSort:  'newest',
  viewMode:    'grid',
  filterGenre: null,
  feedPage:    1,
  latency:     0,
  errorRate:   0,
  queryCache:  {},
  eventLog:    [],
  heroIdx:     0,
  heroPaused:  false,
  heroTimer:   null,
  openArticle: null,
  articleFontScale: 1,
  trailerPlaying: false,
  trailerTimer:   null,
  commentSort:  'top',
  lboxImages:   [],
  lboxIdx:      0,
  pendingRegion:'GL',
};

function save() {
  localStorage.setItem('cw_theme',    STATE.theme);
  localStorage.setItem('cw_region',   STATE.activeRegion);
  localStorage.setItem('cw_followed', JSON.stringify(STATE.followedRegions));
  localStorage.setItem('cw_bookmarks',JSON.stringify(STATE.bookmarks));
  localStorage.setItem('cw_poll',     STATE.pollVote || '');
  localStorage.setItem('cw_nread',    JSON.stringify(STATE.notifRead));
  localStorage.setItem('cw_auth',     JSON.stringify(STATE.isLoggedIn));
  localStorage.setItem('cw_user',     JSON.stringify(STATE.user));
  localStorage.setItem('cw_wl',       JSON.stringify(STATE.watchlist));
  localStorage.setItem('cw_sch',      JSON.stringify(STATE.recentSearches));
  devRefresh();
}

/* ============================================================
   UTILS
   ============================================================ */
function fmt(n) { return n>=1000000?(n/1000000).toFixed(1)+'M':n>=1000?(n/1000).toFixed(1)+'K':String(n); }
function ago(iso) {
  const d = Date.now() - new Date(iso);
  const m = Math.floor(d/60000);
  if(m<1) return 'just now'; if(m<60) return m+' min ago';
  const h=Math.floor(m/60); if(h<24) return h+' hr'+(h>1?'s':'')+' ago';
  const days=Math.floor(h/24); if(days<7) return days+' day'+(days>1?'s':'')+' ago';
  return new Date(iso).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'});
}
function hl(text,q) {
  if(!q) return text;
  const re=new RegExp('('+q.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+')','gi');
  return text.replace(re,'<mark style="background:var(--red);color:#fff;border-radius:2px;padding:0 2px">$1</mark>');
}
function dbn(fn,ms){let t;return(...a)=>{clearTimeout(t);t=setTimeout(()=>fn(...a),ms);};}
function log(type,msg) {
  STATE.eventLog.unshift({time:new Date().toLocaleTimeString(),type,msg});
  if(STATE.eventLog.length>100) STATE.eventLog.pop();
  devRefreshEvents();
}

/* ============================================================
   VISUAL ENHANCEMENTS
   ============================================================ */
function createParticles(x, y, count = 12) {
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    const angle = (Math.PI * 2 * i) / count;
    const distance = 50 + Math.random() * 50;
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.setProperty('--tx', Math.cos(angle) * distance + 'px');
    particle.style.setProperty('--ty', Math.sin(angle) * distance + 'px');
    const colors = ['var(--red)', 'var(--gold)', 'var(--accent-purple)', 'var(--accent-cyan)'];
    particle.style.background = colors[i % colors.length];
    document.body.appendChild(particle);
    particle.addEventListener('animationend', () => particle.remove());
  }
}

function updateAmbientBg(imageUrl) {
  let ambientEl = document.querySelector('.ambient-bg');
  if (!ambientEl) {
    ambientEl = document.createElement('div');
    ambientEl.className = 'ambient-bg';
    const modal = $('article-modal');
    if (modal) modal.insertBefore(ambientEl, modal.firstChild);
  }
  if (imageUrl) {
    ambientEl.style.backgroundImage = `url('${imageUrl}')`;
  }
}

function transitionFeed(callback) {
  grid.style.opacity = '0';
  grid.style.transform = 'scale(0.98)';
  setTimeout(() => {
    callback();
    requestAnimationFrame(() => {
      grid.style.opacity = '1';
      grid.style.transform = 'scale(1)';
    });
  }, 200);
}

const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

function toast(msg,type='info') {
  const c=$('toast-container'),el=document.createElement('div');
  el.className='toast '+type;
  el.innerHTML=`<span class="toast-txt">${msg}</span>`;
  c.appendChild(el);
  setTimeout(()=>{el.classList.add('removing');el.addEventListener('animationend',()=>el.remove(),{once:true});},3000);
}

// Animated counter function
function animateCounter(element, target, duration = 1000) {
  const start = parseInt(element.textContent) || 0;
  const increment = (target - start) / (duration / 16);
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    if ((increment > 0 && current >= target) || (increment < 0 && current <= target)) {
      element.textContent = Math.round(target);
      clearInterval(timer);
    } else {
      element.textContent = Math.round(current);
    }
  }, 16);
}

// Particle creation function
function createParticles(x, y, count = 8) {
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    const angle = (Math.PI * 2 * i) / count;
    const distance = 50 + Math.random() * 50;
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.setProperty('--tx', Math.cos(angle) * distance + 'px');
    particle.style.setProperty('--ty', Math.sin(angle) * distance + 'px');
    particle.style.background = ['var(--red)', 'var(--gold)', 'var(--accent-purple)'][i % 3];
    document.body.appendChild(particle);
    particle.addEventListener('animationend', () => particle.remove());
  }
}

/* ============================================================
   THEME
   ============================================================ */
function applyTheme(t) {
  STATE.theme=t;
  document.documentElement.setAttribute('data-theme',t);
  save(); log('nav','Theme: '+t);
}
$('btn-theme').addEventListener('click',()=>applyTheme(STATE.theme==='dark'?'light':'dark'));

/* ============================================================
   TAB CONFIG & FILTERING
   ============================================================ */
const TAB_CFG = {
  latest:    {eyebrow:'LATEST NEWS',     h:'Latest Stories',             p:'Breaking news, exclusives and the freshest stories from global cinema'},
  trending:  {eyebrow:'TRENDING',        h:'Trending Now',               p:'The most-read and most-discussed stories across all regions right now'},
  reviews:   {eyebrow:'REVIEWS & SCORES',h:'Critics & Audience Scores',  p:'Festival reactions, critic scores and audience verdicts on new releases'},
  upcoming:  {eyebrow:'UPCOMING',        h:'In Production & Coming Soon', p:"What's in development, casting news and release date announcements"},
  boxoffice: {eyebrow:'BOX OFFICE',      h:'Box Office Results',          p:'Weekend grosses, chart rankings and industry performance analysis'},
  interviews:{eyebrow:'LONG READS',      h:'In Depth',                   p:'Long-form features, analysis and in-depth profiles from around the world'},
  editorial: {eyebrow:'EDITORIALS',      h:'Analysis & Opinion',         p:'Long-form editorial, industry analysis and critical perspectives'},
};

function filteredArticles() {
  let pool=[...ARTICLES];
  // Region
  if(STATE.activeRegion!=='GL') pool=pool.filter(a=>a.region===STATE.activeRegion||a.region==='GL');
  // Genre
  if(STATE.filterGenre) pool=pool.filter(a=>a.tags.some(t=>t.toLowerCase()===STATE.filterGenre.toLowerCase())||a.category.toLowerCase()===STATE.filterGenre.toLowerCase());
  // Tab
  const t=STATE.activeTab;
  if(t==='trending')  pool=pool.sort((a,b)=>(b.reactions.like+b.reactions.fire)-(a.reactions.like+a.reactions.fire));
  else if(t==='reviews')   { const cats=['Festival','Awards','Kaiju','Anime','Cinema']; let f=pool.filter(a=>a.criticScore>0||cats.includes(a.category)); if(f.length<3)f=[...pool].sort((a,b)=>b.criticScore-a.criticScore); pool=f; }
  else if(t==='upcoming')  { const cats=['Production','Casting','Marvel','Anime','Tollywood','Kaiju']; let f=pool.filter(a=>cats.includes(a.category)); if(f.length<3)f=[...pool].reverse(); pool=f; }
  else if(t==='boxoffice') { const cats=['Box Office','Industry','Festival']; let f=pool.filter(a=>cats.includes(a.category)||a.tab==='boxoffice'); if(f.length<3)f=pool; pool=f; }
  else if(t==='interviews'){ let f=pool.filter(a=>a.readTimeMins>=5); if(f.length<3)f=[...pool].sort((a,b)=>b.readTimeMins-a.readTimeMins); pool=f; }
  else if(t==='editorial') { const cats=['Editorial','Industry','Cinema']; let f=pool.filter(a=>cats.includes(a.category)); if(f.length<3)f=pool; pool=f; }
  // Sort
  if(STATE.activeSort==='popular')   pool=[...pool].sort((a,b)=>(b.reactions.like+b.reactions.fire)-(a.reactions.like+a.reactions.fire));
  else if(STATE.activeSort==='discussed') pool=[...pool].sort((a,b)=>b.comments.length-a.comments.length);
  else if(STATE.activeSort==='editors')   { const ep=new Set(EDITORS_PICKS_IDS); pool=[...pool].sort((a,b)=>(ep.has(b.id)?1:0)-(ep.has(a.id)?1:0)); }
  else if(t!=='trending') pool=[...pool].sort((a,b)=>new Date(b.publishedAt)-new Date(a.publishedAt));
  return pool;
}

/* ============================================================
   SYNC UI — tabs, nav, hero/banner visibility
   ============================================================ */
function syncUI() {
  // Feed tabs
  $$('.feed-tab').forEach(t=>{
    t.classList.toggle('active',t.dataset.tab===STATE.activeTab);
    t.setAttribute('aria-selected',t.dataset.tab===STATE.activeTab);
  });
  // Nav links
  const t2s={latest:'home',trending:'trending',reviews:'reviews',upcoming:'upcoming',boxoffice:'boxoffice'};
  const sec=t2s[STATE.activeTab]||'home';
  $$('.nav-link[data-section]').forEach(l=>l.classList.toggle('active',l.dataset.section===sec));

  // Hero / Tab Banner / Trending Rail
  const isLatest = STATE.activeTab==='latest';
  $('hero-section').classList.toggle('hidden',!isLatest);
  $('trending-section').classList.toggle('hidden',!isLatest);
  const banner=$('tab-banner');
  if(!isLatest) {
    banner.classList.remove('hidden');
    const cfg=TAB_CFG[STATE.activeTab]||TAB_CFG.latest;
    $('tab-banner-eyebrow').textContent=cfg.eyebrow;
    $('tab-banner-h').textContent=cfg.h;
    $('tab-banner-p').textContent=cfg.p;
  } else {
    banner.classList.add('hidden');
  }

  // Region chip
  const c=COUNTRY_MAP[STATE.activeRegion];
  $('chip-code').textContent  = STATE.activeRegion;
  $('chip-name').textContent  = c?.name||'Global';
  $('region-pill-code').textContent = STATE.activeRegion;
  $('region-pill-name').textContent = c?.name||'Global';
  $('mob-region-code').textContent  = STATE.activeRegion;
  $('mob-region-name').textContent  = c?.name||'Global';

  // Bookmark badge
  const n=STATE.bookmarks.length;
  $('bookmarks-badge').textContent=n;
  $('bookmarks-badge').classList.toggle('hidden',n===0);

  // Notif badge
  const unread=NOTIFICATIONS.filter(n=>!STATE.notifRead.includes(n.id)).length;
  $('notif-badge').textContent=unread;
  $('notif-badge').classList.toggle('hidden',unread===0);

  // Sort select
  $('sort-select').value=STATE.activeSort;

  // User
  if(STATE.isLoggedIn&&STATE.user) {
    const av=STATE.user.name?.[0]?.toUpperCase()||'U';
    $('user-av').textContent=av;
    $('user-av-lg').textContent=av;
    $('user-name-dd').textContent=STATE.user.name;
    $('user-email-dd').textContent=STATE.user.email;
    $('btn-signin-header').classList.add('hidden');
    $('comment-av').textContent=av;
  } else {
    $('user-av').textContent='U';
    $('user-av-lg').textContent='U';
    $('user-name-dd').textContent='Guest';
    $('user-email-dd').textContent='guest@cinewire.com';
    $('btn-signin-header').classList.remove('hidden');
    $('comment-av').textContent='G';
  }
}

/* ============================================================
   SIMULATED FETCH
   ============================================================ */
function simFetch(key,fn) {
  return new Promise((resolve,reject)=>{
    const c=STATE.queryCache[key];
    if(c&&c.status==='fresh'){resolve(fn());return;}
    STATE.queryCache[key]={status:'fetching',ts:Date.now()};
    devRefreshCache();
    if(STATE.latency===-1){STATE.queryCache[key]={status:'error',ts:Date.now()};devRefreshCache();reject(new Error('offline'));return;}
    const d=STATE.latency||0;
    setTimeout(()=>{
      if(Math.random()*100<STATE.errorRate){STATE.queryCache[key]={status:'error',ts:Date.now()};devRefreshCache();reject(new Error('sim error'));return;}
      STATE.queryCache[key]={status:'fresh',ts:Date.now()};
      devRefreshCache();
      resolve(fn());
    },d);
  });
}

/* ============================================================
   HERO SLIDER
   ============================================================ */
const heroSlidesEl=$('hero-slides'),heroDotsEl=$('hero-dots');

function buildHero() {
  const pool=filteredArticles().filter(a=>a.img).slice(0,5);
  if(!pool.length) return;
  heroSlidesEl.innerHTML=''; heroDotsEl.innerHTML='';
  pool.forEach((a,i)=>{
    const s=document.createElement('div');
    s.className='hero-slide'+(i===0?' active':'');
    s.dataset.id=a.id;
    s.innerHTML=`
      <div class="hero-slide-bg ${a.grad}" style="background-image:url('${a.img}');background-size:cover;background-position:center"></div>
      <div class="hero-slide-scrim"></div>
      <div class="hero-content">
        <span class="hero-badge">${a.badge||a.category.toUpperCase()}</span>
        <h2 class="hero-title">${a.title}</h2>
        <p class="hero-dek">${a.dek}</p>
        <div class="hero-meta">
          <div class="hero-av">${a.author.avatar}</div>
          <span>${a.author.name}</span>
          <span style="color:rgba(255,255,255,.4)">·</span>
          <span>${ago(a.publishedAt)}</span>
          <span style="color:rgba(255,255,255,.4)">·</span>
          <span>${a.readTimeMins} min read</span>
        </div>
        <div class="hero-actions">
          <button class="hero-read-btn" data-id="${a.id}">Read Full Story</button>
          ${a.trailerUrl?`<button class="hero-trailer-btn" data-id="${a.id}"><span class="play-ring">&#9654;</span> Watch Trailer</button>`:''}
          <button class="hero-bk-btn${STATE.bookmarks.includes(a.id)?' saved':''}" data-id="${a.id}" aria-label="Bookmark">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m19 21-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
          </button>
        </div>
      </div>`;
    heroSlidesEl.appendChild(s);
    const d=document.createElement('button');
    d.className='hero-dot'+(i===0?' active':'');
    d.setAttribute('aria-label','Slide '+(i+1));
    d.addEventListener('click',()=>{heroGo(i);heroRestart();});
    heroDotsEl.appendChild(d);
    s.addEventListener('click',e=>{if(!e.target.closest('button'))openArticle(a.id);});
    s.querySelector('.hero-read-btn').addEventListener('click',()=>openArticle(a.id));
    if(a.trailerUrl) s.querySelector('.hero-trailer-btn')?.addEventListener('click',()=>openTrailer(a.id));
    s.querySelector('.hero-bk-btn').addEventListener('click',e=>{e.stopPropagation();toggleBk(a.id);s.querySelector('.hero-bk-btn').classList.toggle('saved',STATE.bookmarks.includes(a.id));});
  });
  STATE.heroIdx=0;
  heroAutoStart();
  // touch
  let tx=0;
  $('hero-slider').addEventListener('touchstart',e=>{tx=e.touches[0].clientX;},{passive:true});
  $('hero-slider').addEventListener('touchend',e=>{const dx=e.changedTouches[0].clientX-tx;if(Math.abs(dx)>50){dx<0?heroGo(STATE.heroIdx+1):heroGo(STATE.heroIdx-1);heroRestart();}},{passive:true});
}

function heroGo(idx) {
  const ss=heroSlidesEl.querySelectorAll('.hero-slide'),ds=heroDotsEl.querySelectorAll('.hero-dot');
  if(!ss.length) return;
  ss[STATE.heroIdx]?.classList.remove('active'); ds[STATE.heroIdx]?.classList.remove('active');
  STATE.heroIdx=(idx+ss.length)%ss.length;
  ss[STATE.heroIdx].classList.add('active'); ds[STATE.heroIdx]?.classList.add('active');
}
function heroAutoStart() { if(STATE.heroTimer)clearInterval(STATE.heroTimer); if(!STATE.heroPaused) STATE.heroTimer=setInterval(()=>heroGo(STATE.heroIdx+1),5500); }
function heroRestart()   { if(!STATE.heroPaused)heroAutoStart(); }

$('hero-prev').addEventListener('click',()=>{heroGo(STATE.heroIdx-1);heroRestart();});
$('hero-next').addEventListener('click',()=>{heroGo(STATE.heroIdx+1);heroRestart();});
$('hero-pause').addEventListener('click',()=>{
  STATE.heroPaused=!STATE.heroPaused;
  $('hero-pause').innerHTML=STATE.heroPaused?'&#9654;':'&#9646;&#9646;';
  STATE.heroPaused?clearInterval(STATE.heroTimer):heroAutoStart();
});

/* ============================================================
   FEED
   ============================================================ */
const ITEMS_PER_PAGE=6;
const grid=$('articles-grid');


function loadFeed(append=false) {
  if(!append){ STATE.feedPage=1; renderSkel(); if(STATE.activeTab==='latest') buildHero(); }
  const key=`feed_${STATE.activeRegion}_${STATE.activeTab}_${STATE.activeSort}_${STATE.feedPage}`;
  simFetch(key,()=>filteredArticles())
    .then(arts=>{
      if(!append){ grid.innerHTML=''; log('nav',`Feed: tab=${STATE.activeTab} region=${STATE.activeRegion}`); }
      const start=(STATE.feedPage-1)*ITEMS_PER_PAGE;
      const page=arts.slice(start,start+ITEMS_PER_PAGE);
      if(!append&&!arts.length){renderEmpty();updateLoadMore(false);return;}
      page.forEach((a,i)=>{grid.appendChild(buildCard(a,append?i+99:i));});
      updateLoadMore(arts.length>start+ITEMS_PER_PAGE);
    })
    .catch(()=>{if(!append)renderErr();toast('Failed to load articles','error');});
}

function updateLoadMore(show){ $('load-more-wrap').classList.toggle('hidden',!show); }

function renderSkel(){
  grid.innerHTML='';
  for(let i=0;i<6;i++){
    const s=document.createElement('div');
    s.className='skel-card';
    s.innerHTML='<div class="skel-thumb skeleton"></div><div class="skel-body"><div class="skel-line w9 skeleton"></div><div class="skel-line w7 skeleton"></div><div class="skel-line w5 skeleton"></div></div>';
    grid.appendChild(s);
  }
}

function renderEmpty(){
  grid.innerHTML=`<div class="feed-empty">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="2" width="20" height="20" rx="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/></svg>
    <h3>No articles found</h3><p>Try a different filter or region.</p>
    <button class="btn-ghost-sm" onclick="resetFilters()">Clear Filters</button>
  </div>`;
}

function renderErr(){
  grid.innerHTML=`<div class="feed-error">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="m10.29 3.86-8.65 15A2 2 0 0 0 3.36 22h17.28a2 2 0 0 0 1.72-3.14l-8.65-15a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
    <h3>Could not load articles</h3><p>Check your connection or try again.</p>
    <button class="btn-primary" onclick="loadFeed()">Retry</button>
  </div>`;
}

function resetFilters(){
  STATE.activeTab='latest'; STATE.filterGenre=null; STATE.activeSort='newest';
  syncUI(); loadFeed();
}

function buildCard(a,idx=0){
  const isFeatured=idx===0&&STATE.viewMode==='grid';
  const isSaved=STATE.bookmarks.includes(a.id);
  const card=document.createElement('div');
  card.className='article-card'+(isFeatured?' featured':'');
  card.style.animationDelay=`${idx*.05}s`;
  card.dataset.id=a.id;
    // 3D tilt effect
  if (window.innerWidth > 1024) {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;
      card.style.setProperty('--rx', rotateX + 'deg');
      card.style.setProperty('--ry', rotateY + 'deg');
      card.classList.add('tilt');
    });
    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--rx', '0deg');
      card.style.setProperty('--ry', '0deg');
      setTimeout(() => card.classList.remove('tilt'), 300);
    });
  }

  // Scroll-triggered animation
  card.classList.add('fade-in-on-scroll');
  scrollObserver.observe(card);

  card.innerHTML=`
    <div class="card-thumb">
      <div class="card-thumb-img ${a.grad}" style="${a.img?`background-image:url('${a.img}');background-size:cover;background-position:center`:''}"></div>
      <div class="card-thumb-grad"></div>
      <span class="card-cat-badge${a.badge==='BREAKING'?' breaking':''}">${a.badge||a.category}</span>
      ${a.trailerUrl?`<span class="card-trailer-badge"><span class="play-dot">&#9654;</span> Trailer</span>`:''}
      <button class="btn-card-bk${isSaved?' saved':''}" data-id="${a.id}" aria-label="Save">
        <svg viewBox="0 0 24 24" fill="${isSaved?'currentColor':'none'}" stroke="currentColor" stroke-width="2"><path d="m19 21-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
      </button>
    </div>
    <div class="card-body">
      <h3 class="card-title">${a.title}</h3>
      <p class="card-dek">${a.dek}</p>
      <div class="card-react-bar">
        <button class="react-btn" data-id="${a.id}" data-r="like">+1 ${fmt(a.reactions.like)}</button>
        <button class="react-btn" data-id="${a.id}" data-r="fire">Hot ${fmt(a.reactions.fire)}</button>
        <button class="react-btn" data-id="${a.id}" data-r="wow">Wow ${fmt(a.reactions.wow)}</button>
        <button class="react-btn" data-id="${a.id}" data-r="love">Love ${fmt(a.reactions.love)}</button>
        <button class="btn-card-share" data-id="${a.id}" aria-label="Share">&#8599;</button>
      </div>
      <div class="card-byline">
        <div class="byline-av">${a.author.avatar}</div>
        <span class="byline-name">${a.author.name}</span>
        <span style="color:var(--text-3)">·</span>
        <span>${ago(a.publishedAt)}</span>
        <span class="read-pill">${a.readTimeMins} min</span>
      </div>
    </div>`;
  
  // Add 3D tilt effect on mousemove
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    card.style.setProperty('--rx', rotateX + 'deg');
    card.style.setProperty('--ry', rotateY + 'deg');
    card.classList.add('tilt');
  });
  card.addEventListener('mouseleave', () => {
    card.style.setProperty('--rx', '0deg');
    card.style.setProperty('--ry', '0deg');
    setTimeout(() => card.classList.remove('tilt'), 300);
  });
  
  // Add scroll-triggered fade-in
  card.classList.add('fade-in-on-scroll');
  scrollObserver.observe(card);
  
  card.addEventListener('click',e=>{if(!e.target.closest('button'))openArticle(a.id);});
  card.querySelector('.btn-card-bk').addEventListener('click',e=>{e.stopPropagation();toggleBk(a.id);});
  card.querySelectorAll('.react-btn').forEach(b=>b.addEventListener('click',e=>{e.stopPropagation();doReact(a.id,b.dataset.r,b);}));
  card.querySelector('.btn-card-share').addEventListener('click',e=>{e.stopPropagation();openShare(a.id);});
  if(a.trailerUrl) card.querySelector('.card-trailer-badge')?.addEventListener('click',e=>{e.stopPropagation();openTrailer(a.id);});
  return card;
}

// Feed tabs
$$('.feed-tab').forEach(t=>t.addEventListener('click',()=>{
  STATE.activeTab=t.dataset.tab;
  syncUI();
  transitionFeed(() => loadFeed());
  log('nav','Tab: '+STATE.activeTab);
}));


// Smooth tab transitions
function transitionFeed(callback) {
  grid.style.opacity = '0';
  grid.style.transform = 'scale(0.95)';
  grid.style.transition = 'opacity .2s var(--ease), transform .2s var(--ease)';
  setTimeout(() => {
    callback();
    requestAnimationFrame(() => {
      grid.style.opacity = '1';
      grid.style.transform = 'scale(1)';
    });
  }, 200);
}
$('sort-select').addEventListener('change',e=>{STATE.activeSort=e.target.value;loadFeed();});
$('btn-view-grid').addEventListener('click',()=>{STATE.viewMode='grid';grid.className='articles-grid grid-view';$('btn-view-grid').classList.add('active');$('btn-view-list').classList.remove('active');loadFeed();});
$('btn-view-list').addEventListener('click',()=>{STATE.viewMode='list';grid.className='articles-grid list-view';$('btn-view-list').classList.add('active');$('btn-view-grid').classList.remove('active');loadFeed();});
$('btn-load-more').addEventListener('click',()=>{STATE.feedPage++;loadFeed(true);});
$('chip-clear').addEventListener('click',()=>{STATE.activeRegion='GL';save();syncUI();buildHero();loadFeed();});

// Infinite scroll
new IntersectionObserver(entries=>{if(entries[0].isIntersecting&&!$('load-more-wrap').classList.contains('hidden')){STATE.feedPage++;loadFeed(true);}},{rootMargin:'200px'}).observe($('scroll-sentinel'));

// Nav links
const S2T={home:'latest',trending:'trending',reviews:'reviews',upcoming:'upcoming',boxoffice:'boxoffice'};
$$('.nav-link[data-section]').forEach(l=>l.addEventListener('click',e=>{
  e.preventDefault();
  const section=l.dataset.section;
  const t=S2T[section]||'latest';

  // Streaming → scroll to streaming section
  if(section==='streaming'){
    $('streaming-sec').scrollIntoView({behavior:'smooth',block:'start'});
    return;
  }
  // Awards → scroll to awards widget in sidebar
  if(section==='awards'){
    $('awards-widget').scrollIntoView({behavior:'smooth',block:'center'});
    return;
  }

  STATE.activeTab=t; STATE.filterGenre=null;
  syncUI(); loadFeed();
  if(t!=='latest') $('feed-section').scrollIntoView({behavior:'smooth',block:'start'});
  log('nav','Nav: '+section);
}));
$$('.mega-link').forEach(l=>l.addEventListener('click',e=>{e.preventDefault();STATE.filterGenre=l.dataset.genre;STATE.activeTab='latest';syncUI();loadFeed();}));
$('logo-home').addEventListener('click',e=>{e.preventDefault();STATE.activeTab='latest';STATE.filterGenre=null;syncUI();loadFeed();window.scrollTo({top:0,behavior:'smooth'});});

// Scroll behaviour
window.addEventListener('scroll',()=>{
  $('app-header').classList.toggle('scrolled',window.scrollY>60);
  $('back-top').classList.toggle('hidden',window.scrollY<400);

  // Parallax hero
  const hero = $('hero-slider');
  if (hero && !hero.classList.contains('hidden')) {
    const scroll = window.scrollY;
    hero.style.transform = `translateY(${scroll * 0.3}px)`;
  }
},{passive:true});

$('back-top').addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

/* ============================================================
   BOOKMARKS
   ============================================================ */
function toggleBk(id){
  const a=ARTICLE_MAP[id]; if(!a) return;
  const idx=STATE.bookmarks.indexOf(id);
  if(idx===-1){ 
    STATE.bookmarks.push(id); 
        // Create particles
    const btn = document.querySelector(`.btn-card-bk[data-id="${id}"]`);
    if (btn) {
      const rect = btn.getBoundingClientRect();
      createParticles(rect.left + rect.width / 2, rect.top + rect.height / 2, 16);
    }

    toast(`Saved: "${a.title.slice(0,35)}…"`,'success'); 
    log('bookmark','Saved: '+id);
    
    // Create particles at all bookmark button locations
    $$('.btn-card-bk[data-id="'+id+'"]').forEach(btn => {
      const rect = btn.getBoundingClientRect();
      createParticles(rect.left + rect.width / 2, rect.top + rect.height / 2, 12);
    });
    $$('.hero-bk-btn[data-id="'+id+'"]').forEach(btn => {
      const rect = btn.getBoundingClientRect();
      createParticles(rect.left + rect.width / 2, rect.top + rect.height / 2, 12);
    });
  }
  else { 
    STATE.bookmarks.splice(idx,1); 
    toast('Removed from saved','info'); 
    log('bookmark','Removed: '+id); 
  }
  save(); syncUI(); refreshBkDrawer();
  $$('.btn-card-bk[data-id="'+id+'"]').forEach(b=>{
    b.classList.toggle('saved',STATE.bookmarks.includes(id));
    b.querySelector('svg').setAttribute('fill',STATE.bookmarks.includes(id)?'currentColor':'none');
  });
  $$('.hero-bk-btn[data-id="'+id+'"]').forEach(b=>b.classList.toggle('saved',STATE.bookmarks.includes(id)));
}

function openBkDrawer(){
  $('bookmarks-drawer').classList.remove('hidden');
  $('drawer-overlay').classList.add('active');
  refreshBkDrawer();
  log('modal','Opened bookmarks');
}
function closeBkDrawer(){
  $('bookmarks-drawer').classList.add('hidden');
  $('drawer-overlay').classList.remove('active');
}

function refreshBkDrawer(){
  const scroll=$('drawer-scroll'), empty=$('drawer-empty');
  scroll.querySelectorAll('.bk-item').forEach(e=>e.remove());
  const filter=document.querySelector('.dr-tab.active')?.dataset.filter||'all';
  let ids=[...STATE.bookmarks];
  if($('btn-bk-sort').textContent.trim().startsWith('Oldest')) ids=ids.reverse();
  if(filter!=='all') ids=ids.filter(id=>ARTICLE_MAP[id]?.category===filter);
  if(!ids.length){empty.classList.remove('hidden');return;}
  empty.classList.add('hidden');
  ids.forEach(id=>{
    const a=ARTICLE_MAP[id]; if(!a) return;
    const el=document.createElement('div');
    el.className='bk-item';
    el.innerHTML=`<div class="bk-thumb ${a.grad}" style="${a.img?`background-image:url('${a.img.replace('1400/700','200/130')}');background-size:cover;background-position:center`:''}"></div>
      <div class="bk-body"><div class="bk-cat">${a.category}</div><div class="bk-title">${a.title}</div><div class="bk-time">${ago(a.publishedAt)}</div></div>
      <button class="btn-bk-remove" data-id="${id}" aria-label="Remove">&times;</button>`;
    el.querySelector('.bk-body').addEventListener('click',()=>openArticle(id));
    el.querySelector('.btn-bk-remove').addEventListener('click',()=>toggleBk(id));
    scroll.appendChild(el);
  });
}

$('btn-bookmarks').addEventListener('click',openBkDrawer);
$('btn-close-drawer').addEventListener('click',closeBkDrawer);
$('drawer-overlay').addEventListener('click',closeBkDrawer);
$$('.dr-tab').forEach(t=>t.addEventListener('click',()=>{$$('.dr-tab').forEach(x=>x.classList.remove('active'));t.classList.add('active');refreshBkDrawer();}));
$('btn-bk-sort').addEventListener('click',()=>{$('btn-bk-sort').textContent=$('btn-bk-sort').textContent.trim().startsWith('Newest')?'Oldest':'Newest';refreshBkDrawer();});
$('btn-bk-clear').addEventListener('click',()=>$('confirm-clear').classList.remove('hidden'));
$('btn-no-clear').addEventListener('click',()=>$('confirm-clear').classList.add('hidden'));
$('btn-do-clear').addEventListener('click',()=>{STATE.bookmarks=[];save();syncUI();refreshBkDrawer();$('confirm-clear').classList.add('hidden');toast('All saved articles cleared','info');});

/* ============================================================
   REACTIONS
   ============================================================ */
const reactedMap={};
function doReact(id,type,btn){
  const a=ARTICLE_MAP[id]; if(!a) return;
  if(!reactedMap[id]) reactedMap[id]=new Set();
  if(reactedMap[id].has(type)){a.reactions[type]--;reactedMap[id].delete(type);btn.classList.remove('reacted');}
  else{a.reactions[type]++;reactedMap[id].add(type);btn.classList.add('reacted');}
  const lbl={like:'+1',fire:'Hot',wow:'Wow',love:'Love'};
  btn.textContent=`${lbl[type]} ${fmt(a.reactions[type])}`;
}

/* ============================================================
   ARTICLE MODAL
   ============================================================ */
function openArticle(id){
  const a=ARTICLE_MAP[id]; if(!a) return;
  STATE.openArticle=id;
    // Add ambient background
  updateAmbientBg(a.img);


  // Hero bg
  const bg=document.createElement('div');
  bg.className='bg-fill '+a.grad;
  if(a.img){bg.style.backgroundImage=`url('${a.img}')`;bg.style.backgroundSize='cover';bg.style.backgroundPosition='center';}
  const heroEl=$('article-hero-img');
  heroEl.querySelectorAll('.bg-fill').forEach(e=>e.remove());
  heroEl.insertBefore(bg,heroEl.firstChild);

  $('art-cat-badge').textContent=a.category;
  $('art-title').textContent=a.title;
  $('sticky-title').textContent=a.title;

  // Author
  $('art-author-chip').innerHTML=`<span style="display:inline-flex;align-items:center;gap:8px"><span style="width:26px;height:26px;border-radius:50%;background:var(--red);color:#fff;font-weight:700;display:inline-flex;align-items:center;justify-content:center;font-size:.72rem">${a.author.avatar}</span>${a.author.name}</span>`;
  $('art-time').textContent=ago(a.publishedAt);
  $('art-read-time').textContent=a.readTimeMins+' min read';

  // Body
  const body=$('article-body-txt');
  body.innerHTML=a.body.map(p=>p.includes('<blockquote>')?p:`<p>${p}</p>`).join('');
  body.style.fontSize=`${STATE.articleFontScale}rem`;

  // Scores
  renderScores(a.criticScore,a.audienceScore);

  // Gallery
  if(a.gallery?.length){
    $('art-gallery-sec').classList.remove('hidden');
    $('art-gallery-grid').innerHTML=a.gallery.map((g,i)=>`<div class="gal-cell" data-idx="${i}" role="button" tabindex="0"><div class="gal-fill ${g}"></div></div>`).join('');
    $('art-gallery-grid').querySelectorAll('.gal-cell').forEach(c=>{
      c.addEventListener('click',()=>openLbox(a.gallery,+c.dataset.idx));
      c.addEventListener('keydown',e=>{if(e.key==='Enter')openLbox(a.gallery,+c.dataset.idx);});
    });
  } else $('art-gallery-sec').classList.add('hidden');

  // Cast
  if(a.cast?.length){
    $('art-cast-sec').classList.remove('hidden');
    $('art-cast-row').innerHTML=a.cast.map(c=>`<div class="cast-card"><div class="cast-hs ${c.grad}" style="width:68px;height:68px;border-radius:50%;margin:0 auto 7px;background-size:cover;background-position:center"></div><div class="cast-nm">${c.name}</div><div class="cast-role">${c.role}</div></div>`).join('');
  } else $('art-cast-sec').classList.add('hidden');

  // Tags
  if(a.tags?.length){
    $('art-tags-sec').classList.remove('hidden');
    $('art-tags-row').innerHTML=a.tags.map(t=>`<button class="tag-chip" data-tag="${t}">${t}</button>`).join('');
    $('art-tags-row').querySelectorAll('.tag-chip').forEach(c=>c.addEventListener('click',()=>{closeArticle();STATE.filterGenre=c.dataset.tag;loadFeed();}));
  } else $('art-tags-sec').classList.add('hidden');

  // Related movies
  if(a.relatedMovies?.length){
    $('art-related-sec').classList.remove('hidden');
    $('art-related-row').innerHTML=a.relatedMovies.map(m=>`<div class="rel-movie"><div class="rel-poster ${m.grad}" style="${m.img?`background-image:url('${m.img}');background-size:cover;background-position:center`:''}"></div><div class="rel-title">${m.title}</div><div class="rel-meta">${m.date} · &#9733; ${m.rating}</div><button class="btn-watchlist" onclick="addToWl('${m.title}')">+ Watchlist</button></div>`).join('');
  } else $('art-related-sec').classList.add('hidden');

  // Sidebar movie card
  const mv=a.relatedMovies?.[0];
  $('art-movie-card').innerHTML=mv?`
    <div class="art-movie-poster ${mv.grad}" style="${mv.img?`background-image:url('${mv.img}');background-size:cover;background-position:center`:''}">
      <div class="art-movie-grad"></div>
      <div class="art-movie-rating">&#9733; ${mv.rating}</div>
    </div>
    <div class="art-movie-body">
      <div class="art-movie-title">${mv.title}</div>
      <div class="art-movie-genre">${a.category}</div>
      <div class="art-movie-syn">${a.dek}</div>
      <div class="art-movie-specs"><span>Director: <strong>${a.cast?.[0]?.name||a.author.name}</strong></span><span>Release: <strong>${mv.date}</strong></span></div>
    </div>`:`<div class="art-movie-body"><div class="art-movie-title">${a.title}</div><div class="art-movie-genre">${a.category}</div><div class="art-movie-syn">${a.dek}</div></div>`;

  // Streaming
  if(a.streamingOn?.length){$('art-streaming-sec').classList.remove('hidden');$('art-streaming-logos').innerHTML=a.streamingOn.map(s=>`<div class="stream-logo">${s}</div>`).join('');}
  else $('art-streaming-sec').classList.add('hidden');

  // More like this
  const more=ARTICLES.filter(x=>x.id!==id&&(x.region===a.region||x.category===a.category)).slice(0,4);
  $('art-more-list').innerHTML=more.map(m=>`<div class="more-item" data-id="${m.id}" role="button" tabindex="0"><div class="more-thumb ${m.grad}" style="${m.img?`background-image:url('${m.img.replace('1400/700','120/120')}');background-size:cover;background-position:center`:''}"></div><div><div class="more-cat">${m.category}</div><div class="more-title">${m.title}</div></div></div>`).join('');
  $('art-more-list').querySelectorAll('.more-item').forEach(el=>{el.addEventListener('click',()=>openArticle(el.dataset.id));el.addEventListener('keydown',e=>{if(e.key==='Enter')openArticle(el.dataset.id);});});

  // Sticky bookmark sync
  syncStickyBk();

  // Comments
  buildComments(a);

  // Next/Prev
  const ids=ARTICLES.map(x=>x.id), idx=ids.indexOf(id);
  const pb=$('btn-art-prev'),nb=$('btn-art-next');
  if(idx>0){pb.classList.remove('hidden');pb.onclick=()=>openArticle(ids[idx-1]);pb.textContent='&#8592; '+ARTICLES[idx-1].title.slice(0,28)+'...';}else pb.classList.add('hidden');
  if(idx<ids.length-1){nb.classList.remove('hidden');nb.onclick=()=>openArticle(ids[idx+1]);nb.textContent=ARTICLES[idx+1].title.slice(0,28)+'... &#8594;';}else nb.classList.add('hidden');

  // Ambient background
  updateAmbientBg(a.img);

  // Open
  const bd=$('article-bd');
  bd.classList.remove('hidden');
  document.body.style.overflow='hidden';
  $('article-modal').scrollTop=0;

  // Sticky on scroll
  const modal=$('article-modal');
  const stickyBar=$('article-sticky-bar');
  modal.onscroll=()=>{
    stickyBar.classList.toggle('visible',modal.scrollTop>280);
    const bgEl=modal.querySelector('.bg-fill');
    if(bgEl) bgEl.style.transform=`translateY(${modal.scrollTop*.28}px)`;
  };

  log('modal','Opened: '+a.title.slice(0,40));
}

function updateAmbientBg(imageUrl) {
  let ambientEl = document.querySelector('.ambient-bg');
  if (!ambientEl) {
    ambientEl = document.createElement('div');
    ambientEl.className = 'ambient-bg';
    $('article-modal').appendChild(ambientEl);
  }
  if (imageUrl) {
    ambientEl.style.backgroundImage = `url('${imageUrl}')`;
    ambientEl.style.backgroundSize = 'cover';
    ambientEl.style.backgroundPosition = 'center';
  }
}

function closeArticle(){
  $('article-bd').classList.add('hidden');
  document.body.style.overflow='';
  STATE.openArticle=null;
  $('article-sticky-bar').classList.remove('visible');
  log('modal','Closed article');
}

$('btn-close-article').addEventListener('click',closeArticle);
$('article-bd').addEventListener('click',e=>{if(e.target===$('article-bd'))closeArticle();});

function syncStickyBk(){
  const saved=STATE.bookmarks.includes(STATE.openArticle);
  $('sticky-bk').classList.toggle('active',saved);
  $('sticky-bk').title=saved?'Unsave':'Save';
}

$('sticky-bk').addEventListener('click',()=>{if(!STATE.openArticle)return;toggleBk(STATE.openArticle);syncStickyBk();});
$('sticky-share').addEventListener('click',()=>openShare(STATE.openArticle));
$('sticky-font-dn').addEventListener('click',()=>{STATE.articleFontScale=Math.max(.8,STATE.articleFontScale-.08);$('article-body-txt').style.fontSize=STATE.articleFontScale+'rem';});
$('sticky-font-up').addEventListener('click',()=>{STATE.articleFontScale=Math.min(1.3,STATE.articleFontScale+.08);$('article-body-txt').style.fontSize=STATE.articleFontScale+'rem';});

function renderScores(c,aud){
  if(!c&&!aud){$('art-scores-sec').classList.add('hidden');return;}
  $('art-scores-sec').classList.remove('hidden');
  const R=32,circ=2*Math.PI*R;
  $('art-scores-row').innerHTML=[{label:'Critic Score',pct:c,cls:'critic'},{label:'Audience Score',pct:aud,cls:'audience'}].filter(r=>r.pct>0).map(r=>`
    <div class="score-ring-wrap">
      <div class="score-ring">
        <svg width="70" height="70" viewBox="0 0 70 70">
          <circle class="ring-bg" cx="35" cy="35" r="${R}"/>
          <circle class="ring-fill ${r.cls}" cx="35" cy="35" r="${R}" stroke-dasharray="${circ}" stroke-dashoffset="${circ}" data-t="${circ-(r.pct/100)*circ}"/>
        </svg>
        <div class="ring-pct">${r.pct}%</div>
      </div>
      <div class="ring-lbl">${r.label}</div>
    </div>`).join('');
  requestAnimationFrame(()=>{ $('art-scores-row').querySelectorAll('.ring-fill').forEach(c=>{setTimeout(()=>{c.style.strokeDashoffset=c.dataset.t;},120);}); });
}

function addToWl(title){
  if(!STATE.watchlist.includes(title)){STATE.watchlist.push(title);save();toast('Added to Watchlist: '+title,'success');}
  else toast('Already in your Watchlist','info');
}

/* ============================================================
   COMMENTS
   ============================================================ */
function buildComments(a){
  $('comments-count').textContent=a.comments.reduce((n,c)=>n+1+(c.replies?.length||0),0);
  const list=$('comments-list');
  list.innerHTML='';
  let comments=[...a.comments];
  if(STATE.commentSort==='top') comments.sort((a,b)=>b.likes-a.likes);
  if(!comments.length){list.innerHTML='<p style="color:var(--text-3);font-style:italic;font-size:.84rem">No comments yet — start the conversation!</p>';return;}
  comments.forEach(c=>{
    const el=document.createElement('div');
    el.style.cssText='display:flex;gap:10px;margin-bottom:16px';
    el.innerHTML=`
      <div style="width:34px;height:34px;border-radius:50%;background:var(--bg-e);display:flex;align-items:center;justify-content:center;font-weight:700;font-size:.82rem;flex-shrink:0;${c.verified?'border:2px solid var(--gold)':''}">${c.avatar}</div>
      <div style="flex:1">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px">
          <span style="font-size:.82rem;font-weight:700">${c.user}</span>
          ${c.verified?'<span style="background:var(--gold);color:#000;font-size:.58rem;font-weight:800;padding:1px 5px;border-radius:3px;text-transform:uppercase">Critic</span>':''}
          <span style="font-size:.7rem;color:var(--text-3)">${c.time}</span>
        </div>
        <div style="font-size:.84rem;color:var(--text-2);line-height:1.5;margin-bottom:7px">${c.text}</div>
        <div style="display:flex;gap:12px">
          <button class="btn-cl" data-cid="${c.id}" style="background:none;font-size:.74rem;color:var(--text-3);cursor:pointer;transition:color .15s">+1 ${c.likes}</button>
          <button class="btn-reply" data-cid="${c.id}" style="background:none;font-size:.74rem;color:var(--text-3);cursor:pointer;transition:color .15s">Reply</button>
        </div>
        ${c.replies?.length?`<div style="margin-top:10px;padding-left:14px;border-left:2px solid var(--border)">${c.replies.map(r=>`<div style="display:flex;gap:8px;margin-bottom:10px"><div style="width:28px;height:28px;border-radius:50%;background:var(--bg-e);display:flex;align-items:center;justify-content:center;font-weight:700;font-size:.72rem;flex-shrink:0">${r.avatar}</div><div><div style="font-size:.78rem;font-weight:700;margin-bottom:3px">${r.user} <span style="color:var(--text-3);font-size:.68rem">${r.time}</span></div><div style="font-size:.82rem;color:var(--text-2)">${r.text}</div></div></div>`).join('')}</div>`:''} 
      </div>`;
    el.querySelector('.btn-cl').addEventListener('click',b=>{c.likes++;b.target.textContent='+1 '+c.likes;b.target.style.color='var(--red)';});
    el.querySelector('.btn-reply').addEventListener('click',()=>{$('comment-input').value='@'+c.user+' ';$('comment-input').focus();$('comment-form-btns').classList.remove('hidden');});
    list.appendChild(el);
  });
}

$$('.csort').forEach(b=>b.addEventListener('click',()=>{
  $$('.csort').forEach(x=>x.classList.remove('active'));b.classList.add('active');
  STATE.commentSort=b.dataset.sort;
  if(STATE.openArticle) buildComments(ARTICLE_MAP[STATE.openArticle]);
}));

$('comment-input').addEventListener('focus',()=>$('comment-form-btns').classList.remove('hidden'));
$('btn-cancel-comment').addEventListener('click',()=>{$('comment-input').value='';$('comment-form-btns').classList.add('hidden');});
$('comment-form').addEventListener('submit',e=>{
  e.preventDefault();
  const txt=$('comment-input').value.trim();
  if(!txt||!STATE.openArticle) return;
  const a=ARTICLE_MAP[STATE.openArticle];
  const name=STATE.isLoggedIn?STATE.user?.name:'Cinema Fan';
  a.comments.unshift({id:'c'+Date.now(),user:name,avatar:(name[0]||'G').toUpperCase(),verified:false,text:txt,time:'Just now',likes:0,replies:[]});
  $('comment-input').value='';$('comment-form-btns').classList.add('hidden');
  buildComments(a);toast('Comment posted!','success');log('modal','Comment posted');
});

/* ============================================================
   LIGHTBOX
   ============================================================ */
function openLbox(imgs,idx){STATE.lboxImages=imgs;STATE.lboxIdx=idx;renderLbox();$('lightbox').classList.remove('hidden');document.body.style.overflow='hidden';}
function closeLbox(){$('lightbox').classList.add('hidden');document.body.style.overflow='';}
function renderLbox(){
  const g=STATE.lboxImages[STATE.lboxIdx];
  $('lbox-img-wrap').innerHTML=`<div class="${g}" style="width:600px;max-width:90vw;height:380px;border-radius:12px;background-size:cover;background-position:center"></div>`;
}
$('btn-lbox-close').addEventListener('click',closeLbox);
$('btn-lbox-prev').addEventListener('click',()=>{STATE.lboxIdx=(STATE.lboxIdx-1+STATE.lboxImages.length)%STATE.lboxImages.length;renderLbox();});
$('btn-lbox-next').addEventListener('click',()=>{STATE.lboxIdx=(STATE.lboxIdx+1)%STATE.lboxImages.length;renderLbox();});
$('lightbox').addEventListener('click',e=>{if(e.target===$('lightbox'))closeLbox();});

/* ============================================================
   SHARE
   ============================================================ */
let shareId=null;
function openShare(id){shareId=id;$('share-bd').classList.remove('hidden');log('modal','Share: '+id);}
$('btn-close-share').addEventListener('click',()=>$('share-bd').classList.add('hidden'));
$('share-bd').addEventListener('click',e=>{if(e.target===$('share-bd'))$('share-bd').classList.add('hidden');});
$$('.share-opt').forEach(b=>b.addEventListener('click',()=>{
  const plat=b.dataset.share,url='https://cinewire.com/article/'+shareId;
  if(plat==='copy'){navigator.clipboard?.writeText(url).then(()=>toast('Link copied!','success')).catch(()=>toast('Link: '+url,'info'));}
  else toast('Opening '+plat+'...','info');
  $('share-bd').classList.add('hidden');log('modal','Shared via '+plat);
}));

/* ============================================================
   TRAILER
   ============================================================ */
function openTrailer(id){
  const a=ARTICLE_MAP[id]; if(!a) return;
  const bg=$('trailer-bg');
  bg.className='trailer-bg '+a.grad;
  if(a.img){bg.style.backgroundImage=`url('${a.img}')`;bg.style.backgroundSize='cover';bg.style.backgroundPosition='center';}
  $('trailer-title-txt').textContent=a.title;
  $('trailer-bd').classList.remove('hidden');
  STATE.trailerPlaying=true;$('btn-t-play').innerHTML='&#9646;&#9646;';
  startTrailer();
  log('modal','Trailer: '+a.title.slice(0,30));
}
function closeTrailer(){$('trailer-bd').classList.add('hidden');STATE.trailerPlaying=false;clearInterval(STATE.trailerTimer);$('t-fill').style.width='0%';}
function startTrailer(){
  if(STATE.trailerTimer)clearInterval(STATE.trailerTimer);
  let pct=0;
  STATE.trailerTimer=setInterval(()=>{if(!STATE.trailerPlaying)return;pct=Math.min(100,pct+.4);$('t-fill').style.width=pct+'%';if(pct>=100){clearInterval(STATE.trailerTimer);$('btn-t-play').innerHTML='&#9654;';STATE.trailerPlaying=false;}},100);
}
$('btn-close-trailer').addEventListener('click',closeTrailer);
$('trailer-bd').addEventListener('click',e=>{if(e.target===$('trailer-bd'))closeTrailer();});
$('btn-t-play').addEventListener('click',()=>{STATE.trailerPlaying=!STATE.trailerPlaying;$('btn-t-play').innerHTML=STATE.trailerPlaying?'&#9646;&#9646;':'&#9654;';if(STATE.trailerPlaying)startTrailer();});
$('btn-t-mute').addEventListener('click',()=>{$('btn-t-mute').textContent=$('btn-t-mute').textContent==='Vol'?'Mute':'Vol';});
$('btn-t-fs').addEventListener('click',()=>toast('Fullscreen available in production build','info'));

/* ============================================================
   AUTH
   ============================================================ */
function openAuth(){$('auth-bd').classList.remove('hidden');log('auth','Auth opened');}
function closeAuth(){$('auth-bd').classList.add('hidden');}
$('btn-close-auth').addEventListener('click',closeAuth);
$('auth-bd').addEventListener('click',e=>{if(e.target===$('auth-bd'))closeAuth();});
$('btn-signin-header').addEventListener('click',openAuth);

function doLogin(name,email,provider){
  STATE.isLoggedIn=true;STATE.user={name,email,provider};save();syncUI();closeAuth();
  if(STATE.followedRegions.length<=1) openRegion();
  toast('Welcome, '+name+'!','success');log('auth','Login: '+name+' via '+provider);
}
$('btn-login-google').addEventListener('click',()=>doLogin('Google User','google@cinewire.com','Google'));
$('btn-login-facebook').addEventListener('click',()=>doLogin('Facebook User','fb@cinewire.com','Facebook'));
$('btn-login-twitter').addEventListener('click',()=>doLogin('X User','x@cinewire.com','X'));
$('btn-auth-guest').addEventListener('click',()=>doLogin('Guest','guest@cinewire.com','Guest'));
$('auth-form').addEventListener('submit',e=>{
  e.preventDefault();
  const email=$('auth-email').value.trim();
  const name=email.split('@')[0].replace(/[._]/g,' ').replace(/\b\w/g,c=>c.toUpperCase());
  doLogin(name,email,'Email');
});
$('btn-signout').addEventListener('click',()=>{
  STATE.isLoggedIn=false;STATE.user=null;save();syncUI();
  $('user-dropdown').classList.add('hidden');
  toast('Signed out. See you next time!','info');log('auth','Signed out');
});
$('btn-user-menu').addEventListener('click',e=>{
  e.stopPropagation();
  if(!STATE.isLoggedIn){openAuth();return;}
  $('user-dropdown').classList.toggle('hidden');$('notif-dropdown').classList.add('hidden');
});
document.addEventListener('click',()=>{$('user-dropdown').classList.add('hidden');$('notif-dropdown').classList.add('hidden');});

/* ============================================================
   NOTIFICATIONS
   ============================================================ */
function renderNotifs(){
  $('notif-list').innerHTML=NOTIFICATIONS.map(n=>`
    <div class="notif-item${!STATE.notifRead.includes(n.id)?' unread':''}" data-id="${n.id}">
      ${!STATE.notifRead.includes(n.id)?'<div class="notif-dot"></div>':'<div style="width:7px"></div>'}
      <div class="notif-body"><div class="notif-text">${n.text}</div><div class="notif-time">${n.time}</div></div>
    </div>`).join('');
  $('notif-list').querySelectorAll('.notif-item').forEach(el=>el.addEventListener('click',()=>{if(!STATE.notifRead.includes(el.dataset.id)){STATE.notifRead.push(el.dataset.id);save();renderNotifs();}el.classList.remove('unread');}));
}
$('btn-notif').addEventListener('click',e=>{e.stopPropagation();$('notif-dropdown').classList.toggle('hidden');$('user-dropdown').classList.add('hidden');if(!$('notif-dropdown').classList.contains('hidden'))renderNotifs();});
$('btn-mark-read').addEventListener('click',()=>{STATE.notifRead=NOTIFICATIONS.map(n=>n.id);save();renderNotifs();toast('All notifications marked as read','success');});

/* ============================================================
   REGION SELECTOR
   ============================================================ */
let pendingReg=STATE.activeRegion;
function openRegion(){pendingReg=STATE.activeRegion;renderRegionModal();$('region-bd').classList.remove('hidden');log('region','Region modal opened');}
function closeRegion(){$('region-bd').classList.add('hidden');}
$('btn-region-pill').addEventListener('click',openRegion);
$('btn-mob-region').addEventListener('click',()=>{closeMobNav();openRegion();});
$('btn-close-region').addEventListener('click',closeRegion);
$('btn-region-cancel').addEventListener('click',closeRegion);
$('region-bd').addEventListener('click',e=>{if(e.target===$('region-bd'))closeRegion();});
$('btn-region-apply').addEventListener('click',()=>{
  STATE.activeRegion=pendingReg;
  if(!STATE.followedRegions.includes(pendingReg))STATE.followedRegions.push(pendingReg);
  save();syncUI();buildHero();loadFeed();closeRegion();
  toast('Region: '+(COUNTRY_MAP[pendingReg]?.name||'Global'),'success');log('region','Switched to: '+pendingReg);
});

function renderRegionModal(){
  const q=$('region-search').value.trim().toLowerCase();
  // Followed chips
  $('region-your-list').innerHTML=STATE.followedRegions.map(code=>{
    const c=COUNTRY_MAP[code]||{code,name:code};
    return `<button class="region-chip-btn${pendingReg===code?' active-region':''}" data-code="${code}"><span class="region-code">${code}</span> ${c.name}</button>`;
  }).join('');
  $('region-your-list').querySelectorAll('.region-chip-btn').forEach(b=>b.addEventListener('click',()=>{pendingReg=b.dataset.code;renderRegionModal();}));
  // All countries
  const filtered=COUNTRIES.filter(c=>!q||c.name.toLowerCase().includes(q)||c.code.toLowerCase().includes(q));
  $('region-all-list').innerHTML=filtered.map(c=>`
    <div class="region-country-row${pendingReg===c.code?' active':''}" data-code="${c.code}" role="button" tabindex="0">
      <span class="rcode">${c.code}</span>
      <span style="flex:1">${c.name}</span>
      ${pendingReg===c.code?'<span class="rcheck">&#10003;</span>':''}
    </div>`).join('');
  $('region-all-list').querySelectorAll('.region-country-row').forEach(r=>{
    const s=()=>{pendingReg=r.dataset.code;if(!STATE.followedRegions.includes(r.dataset.code)){STATE.followedRegions.push(r.dataset.code);}renderRegionModal();};
    r.addEventListener('click',s);r.addEventListener('keydown',e=>{if(e.key==='Enter')s();});
  });
}
$('region-search').addEventListener('input',dbn(()=>renderRegionModal(),200));

/* ============================================================
   MOBILE NAV
   ============================================================ */
function openMobNav(){$('mob-nav').classList.remove('hidden');$('mob-overlay').classList.add('active');$('btn-hamburger').classList.add('open');}
function closeMobNav(){$('mob-nav').classList.add('hidden');$('mob-overlay').classList.remove('active');$('btn-hamburger').classList.remove('open');}
$('btn-hamburger').addEventListener('click',openMobNav);
$('btn-mob-close').addEventListener('click',closeMobNav);
$('mob-overlay').addEventListener('click',closeMobNav);
$$('.mob-link').forEach(l=>l.addEventListener('click',()=>{STATE.activeTab=S2T[l.dataset.section]||'latest';syncUI();loadFeed();closeMobNav();}));

/* ============================================================
   SEARCH
   ============================================================ */
$('header-search-input').addEventListener('input',dbn(e=>{
  const q=e.target.value.trim();
  const ac=$('search-autocomplete');
  if(!q){ac.classList.add('hidden');return;}
  const ql=q.toLowerCase();
  const res=ARTICLES.filter(a=>a.title.toLowerCase().includes(ql)||a.category.toLowerCase().includes(ql)||a.author.name.toLowerCase().includes(ql)||a.tags.some(t=>t.toLowerCase().includes(ql))).slice(0,7);
  if(!res.length){ac.classList.add('hidden');return;}
  ac.innerHTML=res.map(a=>`<div class="ac-item" data-id="${a.id}" role="option" tabindex="0"><div class="ac-thumb ${a.grad}" style="${a.img?`background-image:url('${a.img.replace('1400/700','80/80')}');background-size:cover`:''}"></div><div><div class="ac-info-title">${hl(a.title,q).slice(0,60)}...</div><div class="ac-info-meta">${a.category} · ${a.author.name}</div></div></div>`).join('');
  ac.classList.remove('hidden');
  ac.querySelectorAll('.ac-item').forEach(el=>{
    const open=()=>{openArticle(el.dataset.id);ac.classList.add('hidden');$('header-search-input').value='';};
    el.addEventListener('click',open);el.addEventListener('keydown',e=>{if(e.key==='Enter')open();});
  });
},220));
$('header-search-input').addEventListener('keydown',e=>{if(e.key==='Escape'){$('search-autocomplete').classList.add('hidden');$('header-search-input').value='';}});
document.addEventListener('click',e=>{if(!e.target.closest('.header-search-wrap'))$('search-autocomplete').classList.add('hidden');});

/* ============================================================
   KEYBOARD
   ============================================================ */
document.addEventListener('keydown',e=>{
  if(e.key==='Escape'){
    if(!$('article-bd').classList.contains('hidden')){closeArticle();return;}
    if(!$('auth-bd').classList.contains('hidden')){closeAuth();return;}
    if(!$('region-bd').classList.contains('hidden')){closeRegion();return;}
    if(!$('share-bd').classList.contains('hidden')){$('share-bd').classList.add('hidden');return;}
    if(!$('trailer-bd').classList.contains('hidden')){closeTrailer();return;}
    if(!$('lightbox').classList.contains('hidden')){closeLbox();return;}
    if(!$('bookmarks-drawer').classList.contains('hidden')){closeBkDrawer();return;}
    if(!$('mob-nav').classList.contains('hidden')){closeMobNav();return;}
  }
  if(e.key==='ArrowLeft'&&$('article-bd').classList.contains('hidden'))  {heroGo(STATE.heroIdx-1);heroRestart();}
  if(e.key==='ArrowRight'&&$('article-bd').classList.contains('hidden')) {heroGo(STATE.heroIdx+1);heroRestart();}
});

/* ============================================================
   TRENDING RAIL
   ============================================================ */
function buildTrending(){
  const sorted=[...ARTICLES].sort((a,b)=>(b.reactions.like+b.reactions.fire)-(a.reactions.like+a.reactions.fire)).slice(0,10);
  const rail=$('trending-rail');
  rail.innerHTML=sorted.map((a,i)=>`
    <div class="trend-card" data-id="${a.id}" role="button" tabindex="0">
      <div class="trend-rank">${String(i+1).padStart(2,'0')}</div>
      <div class="trend-thumb ${a.grad}" style="${a.img?`background-image:url('${a.img.replace('1400/700','400/240')}');background-size:cover;background-position:center`:''}">
        <div class="trend-thumb-grad"></div>
      </div>
      <div class="trend-body">
        <div class="trend-cat">${a.category}</div>
        <div class="trend-title">${a.title}</div>
        <div class="trend-time">${ago(a.publishedAt)}</div>
      </div>
    </div>`).join('');
  rail.querySelectorAll('.trend-card').forEach(c=>{
    const open=()=>openArticle(c.dataset.id);
    c.addEventListener('click',open);c.addEventListener('keydown',e=>{if(e.key==='Enter')open();});
  });
  $('trend-prev').addEventListener('click',()=>rail.scrollBy({left:-240,behavior:'smooth'}));
  $('trend-next').addEventListener('click',()=>rail.scrollBy({left:240,behavior:'smooth'}));
}

/* ============================================================
   BOX OFFICE TICKER
   ============================================================ */
function buildTicker(){
  const track=$('ticker-track');
  const items=[...BOX_OFFICE,...BOX_OFFICE].map(b=>`
    <span class="tick-item">
      <span class="tick-rank">#${b.rank}</span>
      <span class="tick-title">${b.title}</span>
      <span class="tick-gross">${b.gross}</span>
      <span class="tick-${b.trend==='up'?'up':b.trend==='down'?'down':''}">${b.trend==='up'?'&#9650;':b.trend==='down'?'&#9660;':'&#8212;'}</span>
    </span>`).join('');
  track.innerHTML=items;
}

/* ============================================================
   AWARDS COUNTDOWN
   ============================================================ */
function buildAwards(){
  $('awards-name').textContent=AWARDS.name;
  $('awards-nominees').innerHTML=AWARDS.nominees.map(n=>`<div class="nominee-row"><span class="ncat">${n.cat}</span><span class="nname">${n.name}</span><span class="nodds">${n.odds}</span></div>`).join('');
  updateCd(); setInterval(updateCd,1000);
}
function updateCd(){
  const diff=AWARDS.date-Date.now();
  if(diff<=0){['cd-d','cd-h','cd-m','cd-s'].forEach(id=>$(id).textContent='00');return;}
  const d=Math.floor(diff/86400000),h=Math.floor((diff%86400000)/3600000),m=Math.floor((diff%3600000)/60000),s=Math.floor((diff%60000)/1000);
  $('cd-d').textContent=String(d).padStart(2,'0');$('cd-h').textContent=String(h).padStart(2,'0');$('cd-m').textContent=String(m).padStart(2,'0');$('cd-s').textContent=String(s).padStart(2,'0');
}

/* ============================================================
   POLL
   ============================================================ */
function buildPoll(){
  $('poll-q').textContent=POLL.question;
  POLL.voted=STATE.pollVote; renderPoll();
}
function renderPoll(){
  const total=POLL.options.reduce((s,o)=>s+o.votes,0);
  $('poll-opts').innerHTML=POLL.options.map(o=>{
    const pct=total?Math.round((o.votes/total)*100):0;
    return `<div class="poll-opt${POLL.voted?' voted':''}" data-id="${o.id}" role="button" tabindex="0" aria-pressed="${POLL.voted===o.id}">
      <div class="poll-fill" style="width:${POLL.voted?pct:0}%"></div>
      <span style="position:relative;z-index:1">${o.text}</span>
      <span class="poll-pct">${pct}%</span>
    </div>`;
  }).join('');
  $('poll-meta').textContent=`${fmt(total)} votes · ${POLL.voted?'You voted':'Vote now'}`;
  if(!POLL.voted){
    $$('.poll-opt').forEach(opt=>{
      const vote=()=>{POLL.options.find(o=>o.id===opt.dataset.id).votes++;STATE.pollVote=opt.dataset.id;POLL.voted=opt.dataset.id;save();renderPoll();toast('Vote recorded!','success');};
      opt.addEventListener('click',vote);opt.addEventListener('keydown',e=>{if(e.key==='Enter')vote();});
    });
  }
}

/* ============================================================
   EDITORS PICKS
   ============================================================ */
function buildEditorsPicks(){
  $('editors-picks').innerHTML=EDITORS_PICKS_IDS.map(id=>{
    const a=ARTICLE_MAP[id]; if(!a) return '';
    return `<div class="ep-item" data-id="${id}" role="button" tabindex="0">
      <div class="ep-thumb ${a.grad}" style="${a.img?`background-image:url('${a.img.replace('1400/700','120/120')}');background-size:cover;background-position:center`:''}"></div>
      <div><div class="ep-cat">${a.category}</div><div class="ep-title">${a.title}</div></div>
    </div>`;
  }).join('');
  $('editors-picks').querySelectorAll('.ep-item').forEach(el=>{
    const open=()=>openArticle(el.dataset.id);
    el.addEventListener('click',open);el.addEventListener('keydown',e=>{if(e.key==='Enter')open();});
  });
}

/* ============================================================
   NEWSLETTER
   ============================================================ */
$('newsletter-form').addEventListener('submit',e=>{
  e.preventDefault();
  const email=$('nl-email').value.trim();
  $('newsletter-form').classList.add('hidden');
  $('nl-success').classList.remove('hidden');
  confetti(); toast('Subscribed with '+email+'!','success');
  log('nav','Newsletter: '+email);
});
function confetti(){
  const c=$('nl-confetti'),colors=['#e50914','#d4a017','#3b82f6','#22c55e','#ec4899'];
  for(let i=0;i<36;i++){
    const p=document.createElement('div');
    p.className='confetti-p';
    p.style.cssText=`left:${Math.random()*100}%;background:${colors[Math.floor(Math.random()*colors.length)]};animation-duration:${1.5+Math.random()*2}s;animation-delay:${Math.random()*.5}s;width:${6+Math.random()*6}px;height:${6+Math.random()*6}px;`;
    c.appendChild(p);p.addEventListener('animationend',()=>p.remove());
  }
}

/* ============================================================
   STREAMING SECTION
   ============================================================ */
function buildStreaming(){
  $('streaming-cards').innerHTML=STREAMING.map(s=>`
    <div class="stream-card">
      <div class="stream-poster ${s.grad}" style="${s.img?`background-image:url('${s.img}');background-size:cover;background-position:center`:''}">
        <div class="stream-badge">${s.platform}</div>
      </div>
      <div class="stream-body"><div class="stream-title">${s.title}</div><div class="stream-meta">${s.genre}</div></div>
    </div>`).join('');
}

/* ============================================================
   DEV PANEL
   ============================================================ */
$('dev-handle').addEventListener('click',toggleDev);
$('dev-handle').addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' ')toggleDev();});
function toggleDev(){
  const open=!$('dev-body').classList.contains('hidden');
  $('dev-body').classList.toggle('hidden',open);
  $('dev-chevron').style.transform=open?'':'rotate(180deg)';
  $('dev-handle').setAttribute('aria-expanded',!open);
  if(!open)devRefresh();
}
$$('.dev-tab-btn').forEach(b=>b.addEventListener('click',()=>{
  $$('.dev-tab-btn').forEach(x=>x.classList.remove('active'));b.classList.add('active');
  $$('.dev-panel-tab').forEach(x=>x.classList.remove('active'));
  $('dev-p-'+b.dataset.dev).classList.add('active');
  if(b.dataset.dev==='state')devRefresh();
  if(b.dataset.dev==='cache')devRefreshCache();
  if(b.dataset.dev==='events')devRefreshEvents();
}));
function devRefresh(){
  const el=$('dev-state-json'); if(!el) return;
  el.textContent=JSON.stringify({theme:STATE.theme,activeRegion:STATE.activeRegion,activeTab:STATE.activeTab,activeSort:STATE.activeSort,viewMode:STATE.viewMode,feedPage:STATE.feedPage,isLoggedIn:STATE.isLoggedIn,bookmarksCount:STATE.bookmarks.length,filterGenre:STATE.filterGenre,latency:STATE.latency,errorRate:STATE.errorRate},null,2);
}
function devRefreshCache(){
  const el=$('dev-cache-list'); if(!el) return;
  const entries=Object.entries(STATE.queryCache);
  if(!entries.length){el.innerHTML='<div style="color:var(--text-3);font-size:.78rem;padding:8px">No cache entries yet.</div>';return;}
  el.innerHTML=entries.map(([k,v])=>`<div style="display:flex;align-items:center;gap:8px;padding:6px 8px;background:var(--bg-card);border-radius:4px;font-size:.72rem;font-family:monospace;margin-bottom:4px"><span style="flex:1;color:var(--text-2)">${k}</span><span style="color:${v.status==='fresh'?'var(--green)':v.status==='fetching'?'var(--blue)':'var(--red)'}">&#9679; ${v.status}</span><button onclick="STATE.queryCache['${k}']={status:'stale',ts:Date.now()};devRefreshCache()" style="background:none;border:1px solid var(--border);color:var(--text-3);padding:2px 6px;border-radius:3px;font-size:.65rem;cursor:pointer">Invalidate</button></div>`).join('');
}
function devRefreshEvents(){
  const el=$('dev-event-log'); if(!el) return;
  const filter=document.querySelector('.dev-filter.active')?.dataset.ef||'all';
  const evts=filter==='all'?STATE.eventLog:STATE.eventLog.filter(e=>e.type===filter);
  if(!evts.length){el.innerHTML='<div style="color:var(--text-3);font-size:.74rem;padding:4px">No events yet.</div>';return;}
  el.innerHTML=evts.slice(0,50).map(e=>`<div style="display:flex;gap:7px;padding:4px 6px;background:var(--bg-card);border-radius:3px;margin-bottom:3px;font-size:.71rem"><span style="color:var(--text-3)">${e.time}</span><span style="padding:1px 6px;border-radius:3px;font-weight:700;background:${e.type==='nav'?'rgba(59,130,246,.18)':e.type==='bookmark'?'rgba(229,9,20,.18)':e.type==='region'?'rgba(34,197,94,.18)':'rgba(234,179,8,.18)'};color:${e.type==='nav'?'#60a5fa':e.type==='bookmark'?'var(--red)':e.type==='region'?'var(--green)':'var(--gold)'}">${e.type}</span><span style="color:var(--text-2)">${e.msg}</span></div>`).join('');
}
$$('.dev-filter').forEach(f=>f.addEventListener('click',()=>{$$('.dev-filter').forEach(x=>x.classList.remove('active'));f.classList.add('active');devRefreshEvents();}));
$('btn-clear-events').addEventListener('click',()=>{STATE.eventLog=[];devRefreshEvents();});
$('btn-reset-state').addEventListener('click',()=>{if(!confirm('Reset all state?'))return;['cw_theme','cw_region','cw_followed','cw_bookmarks','cw_poll','cw_nread','cw_auth','cw_user','cw_wl','cw_sch'].forEach(k=>localStorage.removeItem(k));location.reload();});
$$('.dev-net-btn[data-lat]').forEach(b=>b.addEventListener('click',()=>{$$('.dev-net-btn[data-lat]').forEach(x=>x.classList.remove('active'));b.classList.add('active');STATE.latency=+b.dataset.lat;toast('Latency: '+b.textContent,'info');}));
$('err-rate').addEventListener('input',e=>{STATE.errorRate=+e.target.value;$('err-rate-val').textContent=STATE.errorRate+'%';});
$('sim-loading').addEventListener('click',()=>renderSkel());
$('sim-empty').addEventListener('click',()=>renderEmpty());
$('sim-error').addEventListener('click',()=>renderErr());
$('sim-success').addEventListener('click',()=>loadFeed());
$('sim-login').addEventListener('click',()=>doLogin('Dev Admin','dev@cinewire.com','DevConsole'));
$('sim-logout').addEventListener('click',()=>$('btn-signout').click());

/* ============================================================
   REMAINING CSS & LAYOUT FIXES
   ============================================================ */

/* ============================================================
   INIT
   ============================================================ */
function init() {
  applyTheme(STATE.theme);
  syncUI();
  buildTicker();
  buildTrending();
  buildHero();
  loadFeed();
  // buildEditorsPicks(); // COMMENTED OUT - HTML elements missing
  // buildAwards(); // COMMENTED OUT - HTML elements missing
  // buildPoll(); // COMMENTED OUT - HTML elements missing
  buildStreaming();
  renderNotifs();
  document.body.classList.add('page-enter');
  log('nav','App init');
}

init();
