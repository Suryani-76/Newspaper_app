/* ============================================================
   CineWire — App Script v4 (Light Theme Redesign)
   ============================================================ */
'use strict';
const $  = id  => document.getElementById(id);
const $$ = sel => document.querySelectorAll(sel);

/* ============================================================
   API LAYER — All 13 endpoints wired to real backend
   ============================================================ */
const API_BASE = 'http://localhost:3001/api';

// Get stored auth token
function getToken() { return localStorage.getItem('cw_token') || ''; }
function setToken(t) { localStorage.setItem('cw_token', t); }
function clearToken() { localStorage.removeItem('cw_token'); }

// Base fetch with auth header
async function apiFetch(path, options = {}) {
  const token = getToken();
  const res = await fetch(API_BASE + path, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'API error');
  return data;
}

// ── News APIs ──
const API = {
  // GET /api/news/trending
  getTrending: () => apiFetch('/news/trending'),

  // GET /api/news/latest?page=1&limit=6&region=GL
  getLatest: (page = 1, limit = 6, region = 'GL') =>
    apiFetch(`/news/latest?page=${page}&limit=${limit}&region=${region}`),

  // GET /api/news/category/:category
  getCategory: (category, page = 1, lang = null) =>
    apiFetch(`/news/category/${encodeURIComponent(category)}?page=${page}${lang ? '&lang=' + lang : ''}`),

  // GET /api/news/search?q=query&filter=all&sort=latest
  search: (q, filter = 'all', sort = 'latest') =>
    apiFetch(`/news/search?q=${encodeURIComponent(q)}&filter=${filter}&sort=${sort}`),

  // GET /api/news/:id
  getArticle: (id) => apiFetch(`/news/${id}`),

  // POST /api/auth/register
  register: (name, email, password) =>
    apiFetch('/auth/register', { method: 'POST', body: { name, email, password } }),

  // POST /api/auth/login
  login: (email, password) =>
    apiFetch('/auth/login', { method: 'POST', body: { email, password } }),

  // GET /api/auth/me
  getMe: () => apiFetch('/auth/me'),

  // GET /api/preferences
  getPrefs: () => apiFetch('/preferences'),

  // PUT /api/preferences
  updatePrefs: (prefs) =>
    apiFetch('/preferences', { method: 'PUT', body: prefs }),

  // GET /api/bookmarks
  getBookmarks: () => apiFetch('/bookmarks'),

  // POST /api/bookmarks/:id
  saveBookmark: (id) =>
    apiFetch(`/bookmarks/${id}`, { method: 'POST' }),

  // DELETE /api/bookmarks/:id
  removeBookmark: (id) =>
    apiFetch(`/bookmarks/${id}`, { method: 'DELETE' }),
};
/* ============================================================
   END API LAYER
   ============================================================ */

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

const NOTIFICATIONS = [
  {id:'n1',text:'BREAKING: Cannes Palme d\'Or winner announced.',time:'2 min ago',read:false},
  {id:'n2',text:'New trailer: Dune Messiah official teaser.',    time:'18 min ago',read:false},
  {id:'n3',text:'Godzilla sequel: $288M opening weekend.',       time:'1 hr ago',  read:false},
  {id:'n4',text:'TIFF 2026 lineup: 52 world premieres.',         time:'3 hrs ago', read:true},
  {id:'n5',text:'Studio Ghibli confirms new Miyazaki film.',     time:'5 hrs ago', read:true},
];

const STREAMING = [
  // Netflix
  {title:'Squid Game S3',           platform:'Netflix',    genre:'Thriller · Drama',  year:'2025', rating:'9.0', grad:'article-bg-grad-4', img:'https://image.tmdb.org/t/p/w780/dDlEmu3EZ0Pgg93K2SVNLCjCSvE.jpg'},
  {title:'The Witcher: Season 4',   platform:'Netflix',    genre:'Fantasy · Action',  year:'2025', rating:'7.8', grad:'article-bg-grad-3', img:'https://image.tmdb.org/t/p/w780/cZ0d3rtvXPVvAGCfoQmFullHspa.jpg'},
  {title:'Stranger Things S5',      platform:'Netflix',    genre:'Sci-Fi · Horror',   year:'2025', rating:'8.7', grad:'article-bg-grad-1', img:'https://image.tmdb.org/t/p/w780/49WJfeN0moxb9IPfGn8AIqMGskD.jpg'},
  {title:'Black Mirror S7',         platform:'Netflix',    genre:'Sci-Fi · Thriller', year:'2025', rating:'7.9', grad:'article-bg-grad-2', img:'https://image.tmdb.org/t/p/w780/7PRddO7z7mcPi21nZTCMGShAyy1.jpg'},
  {title:'Wednesday S2',            platform:'Netflix',    genre:'Comedy · Mystery',  year:'2025', rating:'8.1', grad:'article-bg-grad-6', img:'https://image.tmdb.org/t/p/w780/jeGtaMwGxPmQN5xM4ClnwPQcNQz.jpg'},
  // Prime Video
  {title:'Fallout S2',              platform:'Prime Video',genre:'Sci-Fi · Action',   year:'2025', rating:'8.5', grad:'article-bg-grad-5', img:'https://image.tmdb.org/t/p/w780/rGfGfgL2pEPCfhIvqHXieXFn7gp.jpg'},
  {title:'The Boys S5',             platform:'Prime Video',genre:'Superhero · Satire',year:'2025', rating:'8.8', grad:'article-bg-grad-1', img:'https://image.tmdb.org/t/p/w780/stTEycfG9928HYGEISBFaG1ngjM.jpg'},
  {title:'Rings of Power S3',       platform:'Prime Video',genre:'Fantasy · Epic',    year:'2025', rating:'7.2', grad:'article-bg-grad-3', img:'https://image.tmdb.org/t/p/w780/mYLOqiStMxDK3fYZFirgrMt8z5d.jpg'},
  {title:'Reacher S3',              platform:'Prime Video',genre:'Action · Thriller', year:'2025', rating:'8.0', grad:'article-bg-grad-2', img:'https://image.tmdb.org/t/p/w780/rGfGfgL2pEPCfhIvqHXieXFn7gp.jpg'},
  // Disney+
  {title:'Andor S2',                platform:'Disney+',    genre:'Sci-Fi · Drama',    year:'2025', rating:'8.9', grad:'article-bg-grad-2', img:'https://image.tmdb.org/t/p/w780/59SVNwLfoMnZPPB6ukW6dlPxAdI.jpg'},
  {title:'Agatha All Along',        platform:'Disney+',    genre:'Superhero · Mystery',year:'2025',rating:'7.8', grad:'article-bg-grad-6', img:'https://image.tmdb.org/t/p/w780/jBtYB9vtX7OLcRFMTmyMFq2WiCN.jpg'},
  {title:'Skeleton Crew',           platform:'Disney+',    genre:'Sci-Fi · Adventure',year:'2025',rating:'7.5', grad:'article-bg-grad-4', img:'https://image.tmdb.org/t/p/w780/59SVNwLfoMnZPPB6ukW6dlPxAdI.jpg'},
  // Apple TV+
  {title:'Severance S3',            platform:'Apple TV+',  genre:'Sci-Fi · Thriller', year:'2025', rating:'9.1', grad:'article-bg-grad-3', img:'https://image.tmdb.org/t/p/w780/lm3pQ2QoQ9mBiGlEGdCe3oYBqrN.jpg'},
  {title:'Silo S3',                 platform:'Apple TV+',  genre:'Sci-Fi · Drama',    year:'2025', rating:'8.3', grad:'article-bg-grad-4', img:'https://image.tmdb.org/t/p/w780/7VOEGZXsOKBYsdWRFsFh1HJRMEI.jpg'},
  {title:'Presumed Innocent S2',    platform:'Apple TV+',  genre:'Legal · Thriller',  year:'2025', rating:'7.6', grad:'article-bg-grad-1', img:'https://image.tmdb.org/t/p/w780/lm3pQ2QoQ9mBiGlEGdCe3oYBqrN.jpg'},
  // Max / HBO
  {title:'House of the Dragon S3',  platform:'Max',        genre:'Fantasy · Drama',   year:'2025', rating:'8.6', grad:'article-bg-grad-1', img:'https://image.tmdb.org/t/p/w780/z2yahl2uefxDCl0nogcRBstwruJ.jpg'},
  {title:'The Last of Us S3',       platform:'Max',        genre:'Drama · Horror',    year:'2025', rating:'9.0', grad:'article-bg-grad-3', img:'https://image.tmdb.org/t/p/w780/uKvVjHNqB5VmOrdxqAt2F7J78ED.jpg'},
  {title:'Euphoria S3',             platform:'Max',        genre:'Drama · Teen',      year:'2025', rating:'8.4', grad:'article-bg-grad-6', img:'https://image.tmdb.org/t/p/w780/3Q0hd3heuWwDWpwcDkhQOA6TYWI.jpg'},
  // Mubi / Indie
  {title:'All We Imagine as Light', platform:'Mubi',       genre:'Drama · Arthouse',  year:'2024', rating:'8.1', grad:'article-bg-grad-3', img:'https://image.tmdb.org/t/p/w780/rGfGfgL2pEPCfhIvqHXieXFn7gp.jpg'},
  {title:'The Substance',           platform:'Mubi',       genre:'Horror · Satire',   year:'2024', rating:'7.0', grad:'article-bg-grad-5', img:'https://image.tmdb.org/t/p/w780/lqoMzCcZYEFK729d6qzt349fB4o.jpg'},
];

const CATEGORIES = ['All','Horror','Sci-Fi','Thriller','Action','Comedy','Drama','Romance','Fantasy','Crime','Mystery','Animation'];

const LANGUAGES = [
  {code:'en', name:'English', flag:'🇺🇸'},
  {code:'te', name:'Telugu',  flag:'🇮🇳'},
  {code:'hi', name:'Hindi',   flag:'🇮🇳'},
  {code:'ta', name:'Tamil',   flag:'🇮🇳'},
  {code:'kn', name:'Kannada', flag:'🇮🇳'},
];

const EDITORS_PICKS_IDS = ['gl-1','us-1','jp-1','kr-1'];

const ARTICLES = [
  {id:'gl-1',region:'GL',category:'Festival',badge:'BREAKING',tab:'latest',criticScore:92,audienceScore:87,readTimeMins:5,trailerUrl:true,
   grad:'article-bg-grad-1',img:'https://picsum.photos/id/1067/1400/700',
   title:"Cannes 2026: Palm d'Or Nominations Officially Revealed",
   dek:"The 80th Cannes Film Festival unveils its most diverse competition roster in decades.",
   body:["The committee for the 80th Cannes Film Festival has officially unveiled the Palm d'Or competition selection for 2026. This year's lineup bridges mainstream masters and radical new voices from emerging regions.","Female-led directorships make up nearly 40% of the main competition roster. Themes focus on ecological anxieties, AI-human philosophy, and speculative historical fiction.","<blockquote>We are looking for films that shake our foundations. Cinema is meant to confront, soothe, and expand.</blockquote>","The festival opens on May 14. Among the most talked-about entries is a debut feature from a 28-year-old Senegalese director, shot on 16mm in a remote fishing village."],
   author:{name:'Elena Rostova',avatar:'E',bio:'Senior Festival Correspondent.'},
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
   body:['The global box office crossed $12 billion this summer — the highest single-season figure ever recorded.','IMAX and Dolby Cinema locations reported sold-out weekends for six consecutive weeks.','<blockquote>People want the communal, spectacular experience that only cinema can provide.</blockquote>','Mid-budget films also saw recovery, with several $40M–$80M productions performing above expectations.'],
   author:{name:'Marcus Vane',avatar:'M',bio:'Box Office and Industry Analyst.'},
   publishedAt:'2026-07-27T14:00:00Z',
   gallery:['article-bg-grad-2'],tags:['Box Office','IMAX','Industry'],
   streamingOn:['Prime Video'],relatedMovies:[],cast:[],
   reactions:{like:1840,fire:920,wow:430,love:620},
   comments:[{id:'c3',user:'PopcornJunkie',avatar:'P',verified:false,text:'IMAX was absolutely mind-blowing.',time:'4 hours ago',likes:88,replies:[]}]},

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
   body:['The battle between streaming and theatrical has taken a dramatic new turn.','<blockquote>We are not in competition with theaters. We are in partnership.</blockquote>','Studios that maintained exclusive theatrical windows of 45+ days saw 32% higher streaming premiere viewership.'],
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
   body:["With the fall festival season in full swing, Hollywood insiders are projecting frontrunners for the 99th Academy Awards.","Unlike previous years, the 2027 Best Picture race is a chaotic multi-way clash of genres.","<blockquote>This is the most open race I've covered in 18 years. Any of the top six films could genuinely win.</blockquote>","Academy voting guidelines modified last year have resulted in a more democratic field."],
   author:{name:'Clayton Davis',avatar:'C',bio:'Awards analyst.'},
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
   body:["Denis Villeneuve officially confirmed that the screenplay for 'Dune: Messiah' has been finalised.","The film is considerably darker — focusing on the terrible cost of messianic prophecy.","<blockquote>Paul Atreides is not a hero in Messiah. He is a warning.</blockquote>"],
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
   body:["Marvel Studios has confirmed its Phase 6 lineup.","The centerpiece is a full X-Men reboot.","Kevin Feige stated: <blockquote>Phase 6 is the beginning of a new era. The Multiverse Saga ends. Something entirely new begins.</blockquote>"],
   author:{name:'Brandon Davis',avatar:'B',bio:'Marvel and DC correspondent.'},
   publishedAt:'2026-07-26T15:00:00Z',
   gallery:['article-bg-grad-5'],tags:['Marvel','Phase 6','X-Men','Avengers','Disney'],
   streamingOn:['Disney+'],relatedMovies:[],cast:[],
   reactions:{like:6820,fire:4400,wow:2100,love:3200},comments:[]},

  {id:'jp-1',region:'JP',category:'Anime',badge:'BREAKING',tab:'latest',criticScore:96,audienceScore:98,readTimeMins:4,trailerUrl:false,
   grad:'article-bg-grad-3',img:'https://picsum.photos/id/1016/1400/700',
   title:"Studio Ghibli Confirms New Hand-Drawn Feature: Miyazaki Begins Production",
   dek:"In a move that surprised the animation world, Hayao Miyazaki has commenced storyboarding on a brand-new feature.",
   body:["Studio Ghibli confirmed that Hayao Miyazaki has officially commenced storyboarding on a new feature film.","<blockquote>Miyazaki cannot stop creating. As long as he is alive, he will paint worlds.</blockquote>","The film has no confirmed release date but a 2028–2029 window is widely expected."],
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
   body:["Toho Studios officially greenlit a sequel to 'Godzilla Minus One'. Director Takashi Yamazaki will return.","The next film explores the lingering radioactive fallout of post-war Tokyo."],
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
   body:["Bong Joon-ho has officially entered pre-production on his next Korean-language feature.","The project is a high-concept sci-fi social thriller set in a dystopian underground transit colony.","<blockquote>The underground is the new above. Power, class, survival — they follow us wherever we go.</blockquote>"],
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
   body:["Rajamouli shared that SSMB29 will be a globetrotting forest adventure, deeply rooted in Indian mythology.","<blockquote>I want to take Indian cinema to the audience that has never thought to look for it. This film is for the world.</blockquote>"],
   author:{name:'Ramesh Bala',avatar:'R',bio:'South Indian cinema correspondent.'},
   publishedAt:'2026-07-28T04:00:00Z',
   gallery:['article-bg-grad-2'],tags:['Rajamouli','SSMB29','Mahesh Babu','Tollywood'],
   streamingOn:['Prime Video'],relatedMovies:[{title:'RRR',date:'2022',rating:'8.0',grad:'article-bg-grad-2',img:'https://picsum.photos/id/1051/400/600'}],
   cast:[{name:'SS Rajamouli',role:'Director',grad:'article-bg-grad-2'},{name:'Mahesh Babu',role:'Lead',grad:'article-bg-grad-5'}],
   reactions:{like:7400,fire:5600,wow:2200,love:4800},
   comments:[{id:'c10',user:'RRRFan',avatar:'R',verified:false,text:'RRR proved Rajamouli can sell Indian cinema globally.',time:'40 min ago',likes:932,replies:[]}]},

  {id:'gb-1',region:'GB',category:'Casting',badge:'EXCLUSIVE',tab:'latest',criticScore:0,audienceScore:0,readTimeMins:4,trailerUrl:false,
   grad:'article-bg-grad-1',img:'https://picsum.photos/id/20/1400/700',
   title:"Bond 26: Final Screen Tests Underway — Three Actors in Contention for 007",
   dek:"Sources inside Pinewood confirm the producer team has shortlisted three British actors.",
   body:["EON Productions has narrowed the field to three British actors currently in final screen tests.","<blockquote>This is perhaps the most consequential casting decision in franchise cinema history. We will get it right.</blockquote>"],
   author:{name:'Simon Thompson',avatar:'S',bio:'UK film correspondent. Bond franchise specialist.'},
   publishedAt:'2026-07-28T08:30:00Z',
   gallery:['article-bg-grad-1'],tags:['James Bond','007','Casting','UK'],
   streamingOn:['Prime Video'],relatedMovies:[],cast:[],
   reactions:{like:4100,fire:2200,wow:900,love:1600},
   comments:[{id:'c11',user:'Double07',avatar:'D',verified:false,text:'Aaron Taylor-Johnson would be absolutely perfect.',time:'1 hour ago',likes:540,replies:[]}]},

  {id:'it-1',region:'IT',category:'Festival',badge:null,tab:'latest',criticScore:88,audienceScore:82,readTimeMins:4,trailerUrl:false,
   grad:'article-bg-grad-1',img:'https://picsum.photos/id/365/1400/700',
   title:"Venice 2026: Guadagnino's La Luce Perduta is the Golden Lion Frontrunner",
   dek:"The 83rd Venice Film Festival competition is dominated by one film.",
   body:["The 83rd Venice Film Festival has unveiled its competition lineup. Luca Guadagnino's 'La Luce Perduta' is the overwhelming critical favourite.","Jury President Pedro Almodóvar has committed to seeking films that 'disrupt comfortable viewing.'"],
   author:{name:'Marco Rossi',avatar:'M',bio:'Venice and Rome correspondent.'},
   publishedAt:'2026-07-28T07:30:00Z',
   gallery:['article-bg-grad-1'],tags:['Venice','Festival','Guadagnino','Golden Lion','Italy'],
   streamingOn:['Mubi'],relatedMovies:[],
   cast:[{name:'Luca Guadagnino',role:'Director',grad:'article-bg-grad-1'},{name:'Tilda Swinton',role:'Lead',grad:'article-bg-grad-4'}],
   reactions:{like:1600,fire:720,wow:340,love:840},
   comments:[]},

  {id:'mx-1',region:'MX',category:'Production',badge:null,tab:'upcoming',criticScore:0,audienceScore:0,readTimeMins:4,trailerUrl:false,
   grad:'article-bg-grad-6',img:'https://picsum.photos/id/372/1400/700',
   title:"Alfonso Cuarón Returns to Mexico for His Most Personal Film Since Roma",
   dek:"The Oscar-winner is shooting an intimate 24-hour portrait of Mexico City.",
   body:["Cuarón confirmed his next feature will be filmed entirely in Mexico City.","<blockquote>This is about finding the invisible threads connecting working-class and elite lives in a sprawling metropolis.</blockquote>"],
   author:{name:'Carlos Mendoza',avatar:'C',bio:'Latin American cinema correspondent.'},
   publishedAt:'2026-07-28T06:30:00Z',
   gallery:['article-bg-grad-6'],tags:['Cuarón','Mexico','Roma','Production'],
   streamingOn:['Netflix'],relatedMovies:[],
   cast:[{name:'Alfonso Cuarón',role:'Director',grad:'article-bg-grad-6'}],
   reactions:{like:2200,fire:980,wow:420,love:1600},
   comments:[]},
];

const ARTICLE_MAP = {};
ARTICLES.forEach(a => { ARTICLE_MAP[a.id] = a; });

/* ============================================================
   STATE
   ============================================================ */
const safeParse = (key, fallback) => {
  try {
    const val = localStorage.getItem(key);
    if (!val || val === 'undefined' || val === 'null') return fallback;
    return JSON.parse(val);
  } catch(e) { return fallback; }
};

const STATE = {
  theme:           localStorage.getItem('cw_theme')   || 'dark',
  activeRegion:    localStorage.getItem('cw_region')  || 'GL',
  followedRegions: safeParse('cw_followed', ['GL']),
  bookmarks:       safeParse('cw_bookmarks', []),
  pollVote:        localStorage.getItem('cw_poll')    || null,
  notifRead:       safeParse('cw_nread', []),
  isLoggedIn:      safeParse('cw_auth', false),
  user:            safeParse('cw_user', null),
  watchlist:       safeParse('cw_wl', []),
  recentSearches:  safeParse('cw_sch', []),
  // Session
  activeTab:      'latest',
  activeSort:     'newest',
  viewMode:       'grid',
  filterGenre:    null,
  activeCategory: 'All',
  feedPage:       1,
  latency:        0,
  errorRate:      0,
  queryCache:     {},
  eventLog:       [],
  heroIdx:        0,
  heroPaused:     false,
  heroTimer:      null,
  openArticle:    null,
  articleFontScale: parseFloat(localStorage.getItem('cw_fontscale') || '1'),
  trailerPlaying: false,
  trailerTimer:   null,
  commentSort:    'top',
  lboxImages:     [],
  lboxIdx:        0,
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
  localStorage.setItem('cw_last_visit', Date.now());
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

function toast(msg,type='info') {
  const icons={success:'✓',error:'✕',info:'ℹ'};
  const c=$('toast-container'),el=document.createElement('div');
  el.className='toast '+type;
  el.innerHTML=`<span class="toast-icon">${icons[type]||'ℹ'}</span><span class="toast-txt">${msg}</span>`;
  c.appendChild(el);
  setTimeout(()=>{el.classList.add('removing');el.addEventListener('animationend',()=>el.remove(),{once:true});},3000);
}

const scrollObserver = new IntersectionObserver(entries => {
  entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); });
},{threshold:0.1,rootMargin:'0px 0px -40px 0px'});

/* ============================================================
   ONBOARDING FLOW (Figma: Splash → Auth → OTP → Language → Dashboard)
   ============================================================ */
let pendingAuth = null;

function flowHideAll() {
  ['onboarding-screen','auth-screen','otp-screen','select-lang-screen'].forEach(id => {
    const el = $(id); if(el) el.classList.add('hidden');
  });
}

function flowShowDashboard() {
  flowHideAll();
  $('app-header').style.cssText = '';
  document.body.style.paddingTop = '';
  localStorage.setItem('cw_onboarded','true');
}

// Show onboarding on first visit if not logged in
(function() {
  const seen = localStorage.getItem('cw_onboarded');
  if(!seen && !safeParse('cw_auth', false)) {
    // Show splash after short delay so page renders first
    setTimeout(() => {
      $('onboarding-screen').classList.remove('hidden');
      $('app-header').style.display = 'none';
      document.body.style.paddingTop = '0';
    }, 100);
  }
})();

// SPLASH: Get Started
$('btn-get-started').addEventListener('click', () => {
  $('onboarding-screen').classList.add('hidden');
  $('auth-screen').classList.remove('hidden');
});

// SPLASH: Skip
$('btn-skip-onboard').addEventListener('click', () => {
  flowShowDashboard();
});

// AUTH: Back
$('btn-auth-back').addEventListener('click', () => {
  $('auth-screen').classList.add('hidden');
  $('onboarding-screen').classList.remove('hidden');
});

// AUTH: Toggle sign in / register
$('btn-show-register').addEventListener('click', () => {
  $('auth-signin-view').classList.add('hidden');
  $('auth-register-view').classList.remove('hidden');
});
$('btn-show-signin').addEventListener('click', () => {
  $('auth-register-view').classList.add('hidden');
  $('auth-signin-view').classList.remove('hidden');
});

// AUTH: Social
$('btn-gs-google').addEventListener('click', () => {
  pendingAuth = {name:'Google User', email:'google@cinewire.com', provider:'Google'};
  $('auth-screen').classList.add('hidden');
  $('otp-screen').classList.remove('hidden');
  $('otp-sub-text').textContent = 'We sent a 6-digit code to google@cinewire.com';
  setTimeout(() => { const f=document.querySelector('.otp-box'); if(f) f.focus(); }, 100);
});
$('btn-gs-facebook').addEventListener('click', () => {
  pendingAuth = {name:'Facebook User', email:'fb@cinewire.com', provider:'Facebook'};
  $('auth-screen').classList.add('hidden');
  $('otp-screen').classList.remove('hidden');
  $('otp-sub-text').textContent = 'We sent a 6-digit code to fb@cinewire.com';
  setTimeout(() => { const f=document.querySelector('.otp-box'); if(f) f.focus(); }, 100);
});

// AUTH: Sign in form
$('signin-form').addEventListener('submit', async e => {
  e.preventDefault();
  const email = $('signin-email').value.trim();
  const password = $('signin-password').value;
  const name  = email.split('@')[0].replace(/[._]/g,' ').replace(/\b\w/g,c=>c.toUpperCase());
  // Try real API login
  try {
    const res = await API.login(email, password);
    setToken(res.token);
    pendingAuth = {name: res.user.name, email: res.user.email, provider:'Email'};
  } catch(e) {
    pendingAuth = {name, email, provider:'Email'};
  }
  $('auth-screen').classList.add('hidden');
  $('otp-screen').classList.remove('hidden');
  $('otp-sub-text').textContent = `We sent a 6-digit code to ${email}`;
  setTimeout(() => { const f=document.querySelector('.otp-box'); if(f) f.focus(); }, 100);
});

// AUTH: Register form
$('register-form').addEventListener('submit', async e => {
  e.preventDefault();
  const pw  = $('reg-password').value;
  const cpw = $('reg-confirm').value;
  if(pw !== cpw) { toast('Passwords do not match', 'error'); return; }
  const name  = $('reg-name').value.trim();
  const email = $('reg-email').value.trim();
  // Try real API register
  try {
    const res = await API.register(name, email, pw);
    setToken(res.token);
    pendingAuth = {name: res.user.name, email: res.user.email, provider:'Email', isNew:true};
  } catch(err) {
    if(err.message === 'Email already registered') {
      toast('Email already registered. Please sign in.', 'error');
      return;
    }
    pendingAuth = {name, email, provider:'Email', isNew:true};
  }
  $('auth-screen').classList.add('hidden');
  $('otp-screen').classList.remove('hidden');
  $('otp-sub-text').textContent = `We sent a 6-digit code to ${email}`;
  setTimeout(() => { const f=document.querySelector('.otp-box'); if(f) f.focus(); }, 100);
});

// OTP: Back
$('btn-otp-back').addEventListener('click', () => {
  $('otp-screen').classList.add('hidden');
  $('auth-screen').classList.remove('hidden');
  document.querySelectorAll('.otp-box').forEach(b => { b.value=''; b.classList.remove('otp-filled'); });
});

// OTP: Input logic
const otpBoxes = document.querySelectorAll('.otp-box');
otpBoxes.forEach((box, i) => {
  box.addEventListener('input', e => {
    const val = e.target.value.replace(/[^0-9]/g,'');
    e.target.value = val;
    e.target.classList.toggle('otp-filled', !!val);
    if(val && i < otpBoxes.length-1) otpBoxes[i+1].focus();
    if([...otpBoxes].every(b => b.value.length===1)) setTimeout(doVerifyOtp, 200);
  });
  box.addEventListener('keydown', e => {
    if(e.key==='Backspace' && !box.value && i>0) {
      otpBoxes[i-1].focus();
      otpBoxes[i-1].classList.remove('otp-filled');
    }
  });
  box.addEventListener('paste', e => {
    e.preventDefault();
    const text = (e.clipboardData||window.clipboardData).getData('text').replace(/[^0-9]/g,'').slice(0,6);
    text.split('').forEach((ch,idx) => {
      if(otpBoxes[idx]) { otpBoxes[idx].value=ch; otpBoxes[idx].classList.add('otp-filled'); }
    });
    if(text.length===6) setTimeout(doVerifyOtp, 200);
  });
});

$('btn-verify-otp').addEventListener('click', doVerifyOtp);

function doVerifyOtp() {
  const code = [...otpBoxes].map(b => b.value).join('');
  if(code.length < 6) { toast('Please enter all 6 digits', 'error'); return; }
  otpBoxes.forEach(b => { b.value=''; b.classList.remove('otp-filled'); });
  if(pendingAuth?.isNew) {
    // New user → select language
    $('otp-screen').classList.add('hidden');
    $('select-lang-screen').classList.remove('hidden');
  } else {
    // Returning user → go straight to dashboard
    $('otp-screen').classList.add('hidden');
    finishLogin();
  }
}

$('btn-resend-otp').addEventListener('click', () => {
  otpBoxes.forEach(b => { b.value=''; b.classList.remove('otp-filled'); });
  otpBoxes[0].focus();
  toast('New verification code sent!', 'success');
});

// LANGUAGE: select
document.querySelectorAll('.sel-lang-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.sel-lang-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

// LANGUAGE: continue
$('btn-lang-continue').addEventListener('click', () => {
  const lang = document.querySelector('.sel-lang-btn.active')?.dataset.lang || 'en';
  const sel = $('lang-select');
  if(sel) { sel.value = lang; sel.dispatchEvent(new Event('change')); }
  $('select-lang-screen').classList.add('hidden');
  finishLogin();
});

function finishLogin() {
  if(!pendingAuth) { flowShowDashboard(); return; }
  STATE.isLoggedIn = true;
  STATE.user = {name: pendingAuth.name, email: pendingAuth.email, provider: pendingAuth.provider};
  pendingAuth = null;
  save();
  syncUI();
  flowShowDashboard();
  toast(`Welcome, ${STATE.user.name}! 🎬`, 'success');
  log('auth', 'Flow login: ' + STATE.user.provider);
  setTimeout(()=>{
    if('Notification' in window&&Notification.permission==='default'){
      toast('🔔 Enable notifications for breaking news?','info');
      Notification.requestPermission().then(p=>{if(p==='granted')toast('Notifications enabled!','success');});
    }
  },2500);
}
/* ============================================================
   END ONBOARDING FLOW
   ============================================================ */

/* ============================================================
   THEME
   ============================================================ */
function applyTheme(t, manual=false) {
  STATE.theme = t;
  document.documentElement.setAttribute('data-theme', t);
  if (manual) sessionStorage.setItem('cw_theme_manual', '1');
  save();
  log('nav','Theme: '+t);
}
$('btn-theme').addEventListener('click', () => applyTheme(STATE.theme==='dark'?'light':'dark', true));

/* ============================================================
   TAB CONFIG & FILTERING
   ============================================================ */
const TAB_CFG = {
  latest:    {h:"Today's Top News",      p:'Breaking news, exclusives and the freshest stories from global cinema'},
  trending:  {h:'Trending Now',          p:'The most-read and most-discussed stories across all regions right now'},
  reviews:   {h:'Critics & Audiences',   p:'Festival reactions, critic scores and audience verdicts on new releases'},
  upcoming:  {h:'In Production',         p:"What's in development, casting news and release date announcements"},
  boxoffice: {h:'Box Office Results',    p:'Weekend grosses, chart rankings and industry performance analysis'},
  editorial: {h:'Analysis & Opinion',    p:'Long-form editorial, industry analysis and critical perspectives'},
};

function filteredArticles() {
  let pool = [...ARTICLES];
  if(STATE.activeRegion !== 'GL') pool = pool.filter(a => a.region===STATE.activeRegion || a.region==='GL');
  if(STATE.filterGenre) pool = pool.filter(a => a.tags.some(t=>t.toLowerCase()===STATE.filterGenre.toLowerCase()) || a.category.toLowerCase()===STATE.filterGenre.toLowerCase());
  if(STATE.activeCategory && STATE.activeCategory !== 'All') {
    pool = pool.filter(a => a.tags.some(t=>t.toLowerCase()===STATE.activeCategory.toLowerCase()) || a.category.toLowerCase()===STATE.activeCategory.toLowerCase());
  }
  const t = STATE.activeTab;
  if(t==='trending') pool = pool.sort((a,b) => (b.reactions.like+b.reactions.fire)-(a.reactions.like+a.reactions.fire));
  else if(t==='reviews') { const cats=['Festival','Awards','Kaiju','Anime','Cinema']; let f=pool.filter(a=>a.criticScore>0||cats.includes(a.category)); if(f.length<3) f=[...pool].sort((a,b)=>b.criticScore-a.criticScore); pool=f; }
  else if(t==='upcoming') { const cats=['Production','Casting','Marvel','Anime','Tollywood','Kaiju']; let f=pool.filter(a=>cats.includes(a.category)); if(f.length<3) f=[...pool].reverse(); pool=f; }
  else if(t==='boxoffice') { const cats=['Box Office','Industry','Festival']; let f=pool.filter(a=>cats.includes(a.category)||a.tab==='boxoffice'); if(f.length<3) f=pool; pool=f; }
  else if(t==='editorial') { const cats=['Editorial','Industry','Cinema']; let f=pool.filter(a=>cats.includes(a.category)); if(f.length<3) f=pool; pool=f; }
  if(STATE.activeSort==='popular') pool=[...pool].sort((a,b)=>(b.reactions.like+b.reactions.fire)-(a.reactions.like+a.reactions.fire));
  else if(STATE.activeSort==='discussed') pool=[...pool].sort((a,b)=>b.comments.length-a.comments.length);
  else if(t!=='trending') pool=[...pool].sort((a,b)=>new Date(b.publishedAt)-new Date(a.publishedAt));
  return pool;
}

/* ============================================================
   SYNC UI
   ============================================================ */
function syncUI() {
  const t2s={latest:'home',trending:'trending',reviews:'reviews',upcoming:'upcoming',boxoffice:'boxoffice'};
  const sec = t2s[STATE.activeTab]||'home';
  $$('.nav-link[data-section]').forEach(l => l.classList.toggle('active', l.dataset.section===sec));

  const isLatest = STATE.activeTab === 'latest';
  $('hero-section').classList.toggle('hidden', !isLatest);
  $('trending-section').classList.toggle('hidden', !isLatest);

  const cfg = TAB_CFG[STATE.activeTab] || TAB_CFG.latest;
  $('feed-section-title').textContent = cfg.h;
  $('feed-section-desc').textContent  = cfg.p;

  const c = COUNTRY_MAP[STATE.activeRegion];
  $('chip-code').textContent        = STATE.activeRegion;
  $('chip-name').textContent        = c?.name||'Global';
  $('region-pill-code').textContent = STATE.activeRegion;
  $('region-pill-name').textContent = c?.name||'Global';
  $('mob-region-code').textContent  = STATE.activeRegion;
  $('mob-region-name').textContent  = c?.name||'Global';

  const bkn = STATE.bookmarks.length;
  $('bookmarks-badge').textContent = bkn;
  $('bookmarks-badge').classList.toggle('hidden', bkn===0);

  const unread = NOTIFICATIONS.filter(n=>!STATE.notifRead.includes(n.id)).length;
  $('notif-badge').textContent = unread;
  $('notif-badge').classList.toggle('hidden', unread===0);

  $('sort-select').value = STATE.activeSort;

  if(STATE.isLoggedIn && STATE.user) {
    const av = STATE.user.name?.[0]?.toUpperCase()||'U';
    $('user-av').textContent = av;
    $('user-av-lg').textContent = av;
    $('user-name-dd').textContent = STATE.user.name;
    $('user-email-dd').textContent = STATE.user.email;
    $('btn-signin-header').classList.add('hidden');
    $('comment-av').textContent = av;
  } else {
    $('user-av').textContent = 'U';
    $('user-av-lg').textContent = 'U';
    $('user-name-dd').textContent = 'Guest';
    $('user-email-dd').textContent = 'guest@cinewire.com';
    $('btn-signin-header').classList.remove('hidden');
    $('comment-av').textContent = 'G';
  }

  // Sync feed tabs active state
  $$('.feed-tab').forEach(tab => tab.classList.toggle('active', tab.dataset.tab===STATE.activeTab));
  syncBottomNav(t2s[STATE.activeTab] || 'home');
}

/* ============================================================
   SIMULATED FETCH
   ============================================================ */
function simFetch(key,fn) {
  return new Promise((resolve,reject) => {
    const c = STATE.queryCache[key];
    if(c && c.status==='fresh') { resolve(fn()); return; }
    STATE.queryCache[key] = {status:'fetching',ts:Date.now()};
    devRefreshCache();
    if(STATE.latency===-1) { STATE.queryCache[key]={status:'error',ts:Date.now()}; devRefreshCache(); reject(new Error('offline')); return; }
    setTimeout(() => {
      if(Math.random()*100 < STATE.errorRate) { STATE.queryCache[key]={status:'error',ts:Date.now()}; devRefreshCache(); reject(new Error('sim error')); return; }
      STATE.queryCache[key] = {status:'fresh',ts:Date.now()};
      devRefreshCache();
      resolve(fn());
    }, STATE.latency||0);
  });
}

/* ============================================================
   HERO SLIDER
   ============================================================ */
const heroSlidesEl = $('hero-slides');
const heroDotsEl   = $('hero-dots');

function buildHero() {
  const pool = filteredArticles().filter(a=>a.img).slice(0,5);
  if(!pool.length) return;
  heroSlidesEl.innerHTML = '';
  heroDotsEl.innerHTML = '';
  // Cache hero articles
  pool.forEach(a => { if (!ARTICLE_MAP[a.id]) ARTICLE_MAP[a.id] = a; });
  pool.forEach((a,i) => {
    const s = document.createElement('div');
    s.className = 'hero-slide' + (i===0?' active':'');
    s.dataset.id = a.id;
    s.innerHTML = `
      <div class="hero-slide-bg ${a.grad}" style="background-image:url('${a.img}');background-size:cover;background-position:center"></div>
      <div class="hero-slide-scrim"></div>
      <div class="hero-content">
        <span class="hero-badge">${a.badge||a.category.toUpperCase()}</span>
        <h2 class="hero-title">${a.title}</h2>
        <p class="hero-dek">${a.dek}</p>
        <div class="hero-meta">
          <div class="hero-av">${a.author.avatar}</div>
          <span>${a.author.name}</span>
          <span style="opacity:.5">·</span>
          <span>${ago(a.publishedAt)}</span>
          <span style="opacity:.5">·</span>
          <span>${a.readTimeMins} min read</span>
        </div>
        <div class="hero-actions">
          <button class="hero-read-btn" data-id="${a.id}">Read Article</button>
          <button class="hero-bk-btn${STATE.bookmarks.includes(a.id)?' saved':''}" data-id="${a.id}" aria-label="Bookmark">
            <svg viewBox="0 0 24 24" fill="${STATE.bookmarks.includes(a.id)?'currentColor':'none'}" stroke="currentColor" stroke-width="2"><path d="m19 21-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
          </button>
        </div>
      </div>`;
    heroSlidesEl.appendChild(s);
    const d = document.createElement('button');
    d.className = 'hero-dot' + (i===0?' active':'');
    d.setAttribute('aria-label','Slide '+(i+1));
    d.addEventListener('click', () => { heroGo(i); heroRestart(); });
    heroDotsEl.appendChild(d);
    s.querySelector('.hero-read-btn').addEventListener('click', () => openArticle(a.id));
    s.querySelector('.hero-bk-btn').addEventListener('click', e => { e.stopPropagation(); toggleBk(a.id); });
    s.addEventListener('click', e => { if(!e.target.closest('button')) openArticle(a.id); });
  });
  STATE.heroIdx = 0;
  heroAutoStart();
  // Touch swipe
  let tx = 0;
  $('hero-slider').addEventListener('touchstart', e => { tx = e.touches[0].clientX; },{passive:true});
  $('hero-slider').addEventListener('touchend',   e => {
    const dx = e.changedTouches[0].clientX - tx;
    if(Math.abs(dx) > 50) { dx<0 ? heroGo(STATE.heroIdx+1) : heroGo(STATE.heroIdx-1); heroRestart(); }
  },{passive:true});
  // Pause on hover
  $('hero-slider').addEventListener('mouseenter', () => { if(!STATE.heroPaused) clearInterval(STATE.heroTimer); });
  $('hero-slider').addEventListener('mouseleave', () => { if(!STATE.heroPaused) heroAutoStart(); });
}

function heroGo(idx) {
  const ss = heroSlidesEl.querySelectorAll('.hero-slide');
  const ds = heroDotsEl.querySelectorAll('.hero-dot');
  if(!ss.length) return;
  ss[STATE.heroIdx]?.classList.remove('active');
  ds[STATE.heroIdx]?.classList.remove('active');
  STATE.heroIdx = (idx + ss.length) % ss.length;
  ss[STATE.heroIdx].classList.add('active');
  ds[STATE.heroIdx]?.classList.add('active');
}
function heroAutoStart() { if(STATE.heroTimer) clearInterval(STATE.heroTimer); if(!STATE.heroPaused) STATE.heroTimer = setInterval(() => heroGo(STATE.heroIdx+1), 5500); }
function heroRestart()   { if(!STATE.heroPaused) heroAutoStart(); }

$('hero-prev').addEventListener('click', () => { heroGo(STATE.heroIdx-1); heroRestart(); });
$('hero-next').addEventListener('click', () => { heroGo(STATE.heroIdx+1); heroRestart(); });
$('hero-pause').addEventListener('click', () => {
  STATE.heroPaused = !STATE.heroPaused;
  $('hero-pause').innerHTML = STATE.heroPaused ? '&#9654;' : '&#9646;&#9646;';
  STATE.heroPaused ? clearInterval(STATE.heroTimer) : heroAutoStart();
});

/* ============================================================
   CATEGORY CHIPS
   ============================================================ */
function buildCategoryChips() {
  const container = $('category-chips');
  if (!container) return;
  container.innerHTML = CATEGORIES.map(cat => `
    <button class="cat-chip${STATE.activeCategory===cat?' active':''}" data-cat="${cat}">${cat}</button>
  `).join('');
  container.querySelectorAll('.cat-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      STATE.activeCategory = chip.dataset.cat;
      // Update active state
      container.querySelectorAll('.cat-chip').forEach(c => c.classList.toggle('active', c.dataset.cat===STATE.activeCategory));
      loadFeed();
      log('nav','Category: '+STATE.activeCategory);
      // Scroll to feed
      $('feed-section').scrollIntoView({behavior:'smooth',block:'start'});
    });
  });
}

/* ============================================================
   FEED TABS
   ============================================================ */
$$('.feed-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    STATE.activeTab = tab.dataset.tab;
    STATE.activeCategory = 'All';
    // Reset category chips
    if($('category-chips')) {
      $$('.cat-chip').forEach(c => c.classList.toggle('active', c.dataset.cat==='All'));
    }
    syncUI();
    loadFeed();
    log('nav','Feed tab: '+tab.dataset.tab);
  });
});

/* ============================================================
   FEED
   ============================================================ */
const ITEMS_PER_PAGE = 6;
const grid = $('articles-grid');

function loadFeed(append=false) {
  if(!append) { STATE.feedPage=1; _loadingMore=false; renderSkel(); if(STATE.activeTab==='latest') buildHero(); }
  const key = `feed_${STATE.activeRegion}_${STATE.activeTab}_${STATE.activeSort}_${STATE.activeCategory}_${STATE.feedPage}`;

  // Try real API first, fall back to local data
  const fetchData = async () => {
    try {
      if (STATE.activeTab === 'trending') {
        const res = await API.getTrending();
        return { data: res.data, total: res.count, fromApi: true };
      } else if (STATE.activeCategory !== 'All') {
        const catQuery = GENRE_QUERY_MAP[STATE.activeCategory] || STATE.activeCategory;
        const res = await API.getCategory(catQuery, STATE.feedPage, STATE.industryLang || null);
        return { data: res.data, total: res.total, fromApi: true };
      } else {
        const res = await API.getLatest(STATE.feedPage, 6, STATE.activeRegion);
        return { data: res.data, total: res.total, fromApi: true };
      }
    } catch(e) {
      // API unavailable - use local data
      const all = filteredArticles();
      return { data: all, total: all.length, fromApi: false };
    }
  };

  fetchData()
    .then(({ data: arts, total, fromApi }) => {
      if(!append) { grid.innerHTML=''; log('nav',`Feed: tab=${STATE.activeTab} region=${STATE.activeRegion}`); }
      let page;
      if (fromApi) {
        page = arts;
      } else {
        const start = (STATE.feedPage-1)*ITEMS_PER_PAGE;
        page = arts.slice(start, start+ITEMS_PER_PAGE);
      }
      if(!append && !page.length) { renderEmpty(); updateLoadMore(false); return; }
      page.forEach((a,i) => {
        // Cache every fetched article so openArticle can find it
        if (!ARTICLE_MAP[a.id]) ARTICLE_MAP[a.id] = a;
        grid.appendChild(buildCard(a, append?i+99:i));
      });
      // Update tab badge with total count
      if(!append && total) {
        const activeTabEl = document.querySelector('.feed-tab.active');
        if(activeTabEl) {
          // Remove old badge
          activeTabEl.querySelectorAll('.tab-count').forEach(b => b.remove());
          const badge = document.createElement('span');
          badge.className = 'tab-count';
          badge.textContent = total > 999 ? '999+' : total;
          activeTabEl.appendChild(badge);
        }
      }
      // Magazine layout: first-load, grid view, latest or trending tab, not appending
      if(!append && STATE.viewMode==='grid' && (STATE.activeTab==='latest'||STATE.activeTab==='trending')) {
        grid.classList.add('magazine-layout');
      } else if(!append) {
        grid.classList.remove('magazine-layout');
      }
      const hasMore = fromApi
        ? page.length >= ITEMS_PER_PAGE
        : arts.length > (STATE.feedPage-1)*ITEMS_PER_PAGE + ITEMS_PER_PAGE;
      updateLoadMore(hasMore);
    })
    .catch(() => { if(!append) renderErr(); toast('Failed to load articles','error'); });
}

function updateLoadMore(show) { $('load-more-wrap').classList.toggle('hidden',!show); }

function renderSkel() {
  grid.innerHTML = '';
  const count = STATE.viewMode === 'list' ? 4 : 6;
  for(let i = 0; i < count; i++) {
    const s = document.createElement('div');
    s.className = 'skel-card';
    if(STATE.viewMode === 'list') {
      s.innerHTML = `<div style="display:flex;max-height:140px;overflow:hidden;">
        <div class="skel-thumb skeleton" style="width:180px;flex-shrink:0;height:140px;border-radius:0;"></div>
        <div class="skel-body" style="flex:1;">
          <div class="skeleton" style="width:48px;height:16px;border-radius:4px;margin-bottom:10px;"></div>
          <div class="skeleton" style="width:90%;height:14px;border-radius:3px;margin-bottom:6px;"></div>
          <div class="skeleton" style="width:70%;height:14px;border-radius:3px;margin-bottom:auto;"></div>
          <div style="display:flex;justify-content:space-between;align-items:center;margin-top:12px;">
            <div class="skeleton" style="width:60px;height:10px;border-radius:3px;"></div>
            <div class="skeleton" style="width:56px;height:24px;border-radius:6px;"></div>
          </div>
        </div>
      </div>`;
    } else {
      s.innerHTML = `
        <div class="skel-thumb skeleton"></div>
        <div class="skel-body">
          <div class="skeleton" style="width:52px;height:17px;border-radius:4px;margin-bottom:10px;"></div>
          <div class="skeleton" style="width:92%;height:14px;border-radius:3px;margin-bottom:6px;"></div>
          <div class="skeleton" style="width:75%;height:14px;border-radius:3px;margin-bottom:10px;"></div>
          <div class="skeleton" style="width:100%;height:11px;border-radius:3px;margin-bottom:4px;"></div>
          <div class="skeleton" style="width:82%;height:11px;border-radius:3px;margin-bottom:14px;"></div>
          <div style="display:flex;justify-content:space-between;align-items:center;padding-top:10px;border-top:1px solid var(--border);">
            <div style="display:flex;align-items:center;gap:6px;">
              <div class="skeleton" style="width:18px;height:18px;border-radius:50%;"></div>
              <div class="skeleton" style="width:64px;height:10px;border-radius:3px;"></div>
            </div>
            <div class="skeleton" style="width:64px;height:26px;border-radius:6px;"></div>
          </div>
        </div>`;
    }
    grid.appendChild(s);
  }
}

function renderEmpty() {
  const msgs={
    latest:{emoji:'🎬',title:'No stories yet',sub:'The projector is warming up. Check back soon.'},
    trending:{emoji:'📈',title:'Nothing trending yet',sub:'Be the first to read something today.'},
    reviews:{emoji:'⭐',title:'No reviews found',sub:'Critics are still sharpening their pencils.'},
    boxoffice:{emoji:'🎟️',title:'Box office is empty',sub:'Films are in production. Stay tuned.'},
  };
  // Show industry-specific message when browsing a regional cinema
  if (STATE.filterGenre && INDUSTRY_DESC[STATE.filterGenre]) {
    grid.innerHTML=`<div class="feed-empty">
      <div style="font-size:3rem;margin-bottom:8px">🎬</div>
      <h3>${STATE.filterGenre}</h3>
      <p>Limited coverage available from our news sources for this industry right now.</p>
      <p style="font-size:.8rem;margin-top:8px;color:var(--text-3)">Try searching for specific films or directors from ${STATE.filterGenre}.</p>
      <button class="btn-ghost-sm" onclick="resetFilters()" style="margin-top:16px">Back to All News</button>
    </div>`;
    return;
  }
  const m=msgs[STATE.activeTab]||{emoji:'🎞️',title:'No films found',sub:'Try a different genre or region.'};
  grid.innerHTML=`<div class="feed-empty">
    <div style="font-size:3rem;margin-bottom:8px">${m.emoji}</div>
    <h3>${m.title}</h3><p>${m.sub}</p>
    <button class="btn-ghost-sm" onclick="resetFilters()">Clear Filters</button>
  </div>`;
}

function renderErr() {
  grid.innerHTML = `<div class="feed-error">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="m10.29 3.86-8.65 15A2 2 0 0 0 3.36 22h17.28a2 2 0 0 0 1.72-3.14l-8.65-15a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
    <h3>Could not load articles</h3><p>Check your connection or try again.</p>
    <button class="btn-primary" onclick="loadFeed()">Retry</button>
  </div>`;
}

function resetFilters() {
  STATE.activeTab = 'latest';
  STATE.filterGenre = null;
  STATE.activeSort = 'newest';
  STATE.activeCategory = 'All';
  $$('.cat-chip').forEach(c => c.classList.toggle('active', c.dataset.cat==='All'));
  syncUI(); loadFeed();
}

function buildCard(a, idx=0) {
  const isSaved = STATE.bookmarks.includes(a.id);
  const card = document.createElement('div');
  card.className = 'article-card';
  card.style.animationDelay = `${idx * .05}s`;
  card.dataset.id = a.id;
  card.classList.add('fade-in-on-scroll');
  scrollObserver.observe(card);

  // Compute helpers for new features
  const totalReactions = (a.reactions?.like||0)+(a.reactions?.fire||0)+(a.reactions?.wow||0)+(a.reactions?.love||0);
  const reactionStr = totalReactions >= 1000 ? (totalReactions/1000).toFixed(1)+'K' : String(totalReactions);
  const isLive = a.publishedAt && (Date.now() - new Date(a.publishedAt)) < 30*60*1000;
  const lastVisit = parseInt(localStorage.getItem('cw_last_visit') || '0');
  const isNewSinceVisit = lastVisit > 0 && STATE.activeTab === 'latest' &&
    a.publishedAt && new Date(a.publishedAt).getTime() > lastVisit &&
    !isLive; // don't double-badge with LIVE
  const hasScores = STATE.activeTab==='reviews' && (a.criticScore>0 || a.audienceScore>0);
  const R = 12, circ = 2*Math.PI*R;

  const scoresHTML = hasScores ? `
    <div class="card-scores">
      ${a.criticScore>0?`<div class="card-score-item">
        <div class="card-score-ring">
          <svg width="32" height="32" viewBox="0 0 32 32">
            <circle class="ring-bg-sm" cx="16" cy="16" r="${R}"/>
            <circle class="ring-fill-sm critic-sm" cx="16" cy="16" r="${R}"
              stroke-dasharray="${circ}"
              stroke-dashoffset="${circ - (a.criticScore/100)*circ}"
              data-offset="${circ - (a.criticScore/100)*circ}"/>
          </svg>
          <div class="card-score-pct">${a.criticScore}%</div>
        </div>
        <span>Critics</span>
      </div>`:''}
      ${a.audienceScore>0?`<div class="card-score-item">
        <div class="card-score-ring">
          <svg width="32" height="32" viewBox="0 0 32 32">
            <circle class="ring-bg-sm" cx="16" cy="16" r="${R}"/>
            <circle class="ring-fill-sm audience-sm" cx="16" cy="16" r="${R}"
              stroke-dasharray="${circ}"
              stroke-dashoffset="${circ - (a.audienceScore/100)*circ}"
              data-offset="${circ - (a.audienceScore/100)*circ}"/>
          </svg>
          <div class="card-score-pct">${a.audienceScore}%</div>
        </div>
        <span>Audience</span>
      </div>`:''}
    </div>` : '';

  card.innerHTML = `
    <div class="card-thumb">
      <div class="card-thumb-img ${a.grad}" style="${a.img?`background-image:url('${a.img}');background-size:cover;background-position:center`:''}"></div>
      <span class="card-cat-badge${a.badge==='BREAKING'?' breaking':''}">${a.badge || (STATE.filterGenre && STATE.filterGenre !== a.category ? '🔥 ' + STATE.filterGenre : a.category)}</span>
      ${a.trailerUrl?`<span class="card-trailer-badge"><span class="play-dot">&#9654;</span> Trailer</span>`:''}
      ${isLive?`<span class="card-live-badge"><span class="card-live-dot"></span>LIVE</span>`:isNewSinceVisit?`<span class="card-new-badge">NEW</span>`:''}
      <button class="btn-card-bk${isSaved?' saved':''}" data-id="${a.id}" aria-label="Save">
        <svg viewBox="0 0 24 24" fill="${isSaved?'currentColor':'none'}" stroke="currentColor" stroke-width="2"><path d="m19 21-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
      </button>
    </div>
    <div class="card-body">
      <h3 class="card-title">${a.title}</h3>
      <p class="card-dek" id="dek-${a.id}">${a.dek}</p>
      ${a.body && a.body[0] && a.body[0].length > 100 ? `<button class="card-show-more" data-id="${a.id}" data-preview="${(a.body[0]||'').replace(/"/g,'&quot;').replace(/<[^>]+>/g,'').slice(0,180)}">Show more ▾</button>` : ''}
      ${scoresHTML}
      <div class="card-footer">
        <div class="card-byline">
          <span class="byline-name">${CATEGORY_FLAGS[a.category]||INDUSTRY_FLAGS[a.region]||''} ${a.author.name}</span>
          <span class="card-time">${a.readTimeMins?a.readTimeMins+' min · ':''}${ago(a.publishedAt)}</span>
        </div>
        <div style="display:flex;align-items:center;gap:10px">
          ${totalReactions>0?`<span class="card-reactions"><span class="card-reaction-fire">🔥</span>${reactionStr}</span>`:''}
          <button class="btn-read-more" data-id="${a.id}">Read More</button>
        </div>
      </div>
    </div>`;

  // Show "Continue reading" badge if user has read progress saved
  const savedPos = parseInt(localStorage.getItem('cw_scroll_' + a.id) || '0');
  if(savedPos > 200) {
    const badge = document.createElement('div');
    badge.className = 'card-continue-badge';
    badge.textContent = '▶ Continue';
    card.querySelector('.card-body').appendChild(badge);
  }
  card.addEventListener('click', e => { if(!e.target.closest('button')) openArticle(a.id); });
  card.querySelector('.btn-card-bk').addEventListener('click', e => { e.stopPropagation(); toggleBk(a.id); });
  card.querySelector('.btn-read-more').addEventListener('click', e => { e.stopPropagation(); openArticle(a.id); });
  if(a.trailerUrl) card.querySelector('.card-trailer-badge')?.addEventListener('click', e => { e.stopPropagation(); openTrailer(a.id); });
  card.querySelectorAll('.card-show-more').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const dek = document.getElementById('dek-' + btn.dataset.id);
      if(!dek) return;
      if(btn.dataset.expanded === 'true') {
        dek.style.webkitLineClamp = '2';
        dek.style.overflow = 'hidden';
        btn.textContent = 'Show more ▾';
        btn.dataset.expanded = 'false';
      } else {
        dek.style.webkitLineClamp = 'unset';
        dek.style.overflow = 'visible';
        dek.textContent = btn.dataset.preview + '…';
        btn.textContent = 'Show less ▴';
        btn.dataset.expanded = 'true';
      }
    });
  });
  return card;
}

$('sort-select').addEventListener('change', e => { STATE.activeSort = e.target.value; loadFeed(); });
$('btn-view-grid').addEventListener('click', () => { STATE.viewMode='grid'; grid.className='articles-grid grid-view'; $('btn-view-grid').classList.add('active'); $('btn-view-list').classList.remove('active'); loadFeed(); });
$('btn-view-list').addEventListener('click', () => { STATE.viewMode='list'; grid.className='articles-grid list-view'; grid.classList.remove('magazine-layout'); $('btn-view-list').classList.add('active'); $('btn-view-grid').classList.remove('active'); loadFeed(); });
$('btn-load-more').addEventListener('click', () => { STATE.feedPage++; loadFeed(true); });
$('chip-clear').addEventListener('click', () => { STATE.activeRegion='GL'; save(); syncUI(); buildHero(); loadFeed(); });

let _loadingMore = false;
new IntersectionObserver(entries => {
  if(entries[0].isIntersecting && !$('load-more-wrap').classList.contains('hidden') && !_loadingMore) {
    _loadingMore = true;
    STATE.feedPage++;
    loadFeed(true);
    setTimeout(() => { _loadingMore = false; }, 1200);
  }
},{rootMargin:'500px'}).observe($('scroll-sentinel'));

const S2T = {home:'latest',trending:'trending',reviews:'reviews',upcoming:'upcoming',boxoffice:'boxoffice'};
$$('.nav-link[data-section]').forEach(l => l.addEventListener('click', e => {
  e.preventDefault();
  const section = l.dataset.section;
  if(section==='streaming') { $('streaming-sec')?.scrollIntoView({behavior:'smooth',block:'start'}); return; }
  const t = S2T[section]||'latest';
  STATE.activeTab = t;
  STATE.filterGenre = null;
  STATE.activeCategory = 'All';
  STATE.industryLang = null;
  // Reset feed title
  const titleEl = $('feed-section-title');
  const descEl  = $('feed-section-desc');
  if(titleEl) titleEl.textContent = TAB_CFG[t]?.h || "Today's Top News";
  if(descEl)  descEl.textContent  = TAB_CFG[t]?.p || '';
  syncUI(); loadFeed();
  if(t!=='latest') $('feed-section')?.scrollIntoView({behavior:'smooth',block:'start'});
  log('nav','Nav: '+section);
}));


const GENRE_QUERY_MAP = {
  'Action':    'action film',
  'Horror':    'horror film',
  'Sci-Fi':    'science fiction film',
  'Drama':     'drama film',
  'Thriller':  'thriller film',
  'Animation': 'animation animated film',
  'Anime':     'anime japan animation',
  'Bollywood': 'bollywood india film',
  'Awards':    'oscars bafta awards film',
  'Streaming': 'netflix streaming new release film',
};

/* Industry → Guardian search query map */
const INDUSTRY_QUERY_MAP = {
  'Hollywood':      'hollywood',
  'Bollywood':      'bollywood india film',
  'Tollywood':      'telugu film india tollywood allu arjun prabhas',
  'Kollywood':      'tamil film india kollywood rajinikanth vijay',
  'Mollywood':      'malayalam film india mollywood fahadh',
  'Sandalwood':     'kannada film india sandalwood',
  'K-Cinema':       'korean film',
  'British Cinema': 'british film',
  'Japanese Cinema':'japanese film',
};

/* Industry descriptions shown in feed */
const INDUSTRY_DESC = {
  'Hollywood':      "The latest from the world's biggest film industry",
  'Bollywood':      'Hindi cinema news from Mumbai — the heart of Indian film',
  'Tollywood':      'Telugu cinema — Allu Arjun, Prabhas, SS Rajamouli and more',
  'Kollywood':      'Tamil cinema — Rajinikanth, Vijay, and the Chennai film scene',
  'Mollywood':      'Malayalam cinema — award-winning films from Kerala',
  'Sandalwood':     'Kannada cinema news from Karnataka',
  'K-Cinema':       'Korean cinema — from Parasite to the next global hit',
  'British Cinema': 'British film — from BAFTA to the London film scene',
  'Japanese Cinema':'Japanese cinema — Studio Ghibli, anime and world cinema',
};

/* Industry → TMDB language code for regional Indian cinemas */
const INDUSTRY_LANG_MAP = {
  'Bollywood':  'hi',
  'Tollywood':  'te',
  'Kollywood':  'ta',
  'Mollywood':  'ml',
  'Sandalwood': 'kn',
};
$$('.mega-link').forEach(l => l.addEventListener('click', e => {
  e.preventDefault();

  if(l.dataset.genre) {
    const genre = l.dataset.genre;
    STATE.activeCategory = genre;
    STATE.filterGenre = genre;
    STATE.activeTab = 'latest';
    STATE.feedPage = 1;
    const titleEl = $('feed-section-title');
    const descEl  = $('feed-section-desc');
    if(titleEl) titleEl.textContent = genre + ' Films';
    if(descEl)  descEl.textContent  = 'Latest ' + genre + ' film news, reviews and coverage';
    syncUI();
    loadFeed();
    $('feed-section')?.scrollIntoView({behavior:'smooth', block:'start'});
    log('nav','Category: ' + genre);
  }

  if(l.dataset.industry) {
    const industry = l.dataset.industry;
    const query = INDUSTRY_QUERY_MAP[industry] || industry + ' film cinema';
    const langCode = INDUSTRY_LANG_MAP[industry] || null;
    STATE.activeCategory = query;
    STATE.filterGenre = industry;
    STATE.industryLang = langCode; // store lang code for API call
    STATE.activeTab = 'latest';
    STATE.feedPage = 1;
    const titleEl = $('feed-section-title');
    const descEl  = $('feed-section-desc');
    if(titleEl) titleEl.textContent = industry;
    if(descEl)  descEl.textContent  = INDUSTRY_DESC[industry] || 'Latest news, reviews and stories from ' + industry;
    syncUI();
    loadFeed();
    $('feed-section')?.scrollIntoView({behavior:'smooth', block:'start'});
    log('nav','Industry: ' + industry);
  }

  if(l.dataset.section === 'streaming') {
    $('streaming-sec')?.scrollIntoView({behavior:'smooth', block:'start'});
  }
  if(l.dataset.section === 'awards') {
    STATE.activeCategory = 'oscars bafta awards film';
    STATE.filterGenre = 'awards';
    STATE.activeTab = 'latest';
    STATE.feedPage = 1;
    const titleEl = $('feed-section-title');
    const descEl  = $('feed-section-desc');
    if(titleEl) titleEl.textContent = 'Awards & Festivals';
    if(descEl)  descEl.textContent  = 'Oscars, BAFTA, Cannes, TIFF and festival coverage';
    syncUI(); loadFeed();
    $('feed-section')?.scrollIntoView({behavior:'smooth', block:'start'});
  }
}));

$('logo-home').addEventListener('click', e => { e.preventDefault(); STATE.activeTab='latest'; STATE.filterGenre=null; STATE.activeCategory='All'; syncUI(); loadFeed(); window.scrollTo({top:0,behavior:'smooth'}); });

window.addEventListener('scroll', () => {
  $('app-header').classList.toggle('scrolled', window.scrollY > 60);
  $('back-top').classList.toggle('hidden', window.scrollY < 400);
  // Page-level reading progress
  const scrolled = window.scrollY;
  const total = document.documentElement.scrollHeight - window.innerHeight;
  const pct = total > 0 ? (scrolled / total) * 100 : 0;
  const fill = $('page-progress-fill');
  if (fill) fill.style.width = pct + '%';
},{passive:true});

$('back-top').addEventListener('click', () => window.scrollTo({top:0,behavior:'smooth'}));

/* ============================================================
   BOOKMARKS
   ============================================================ */
function toggleBk(id) {
  const a = ARTICLE_MAP[id]; if(!a) return;
  const idx = STATE.bookmarks.indexOf(id);
  if(idx===-1) {
    STATE.bookmarks.push(id);
    toast(`Saved: "${a.title.slice(0,35)}…"`,'success');
    log('bookmark','Saved: '+id);
    // Sync to API
    if(STATE.isLoggedIn) {
      API.saveBookmark(id).catch(() => {
        // Retry once on failure
        setTimeout(() => API.saveBookmark(id).catch(()=>{}), 2000);
      });
    }
  } else {
    STATE.bookmarks.splice(idx,1);
    toast('Removed from saved','info');
    log('bookmark','Removed: '+id);
    if(STATE.isLoggedIn) {
      API.removeBookmark(id).catch(() => {
        setTimeout(() => API.removeBookmark(id).catch(()=>{}), 2000);
      });
    }
  }
  if(navigator.vibrate) navigator.vibrate(10);
  save(); syncUI(); refreshBkDrawer();
  $$('.btn-card-bk[data-id="'+id+'"]').forEach(b => {
    const saved = STATE.bookmarks.includes(id);
    b.classList.toggle('saved', saved);
    b.querySelector('svg').setAttribute('fill', saved?'currentColor':'none');
  });
  $$('.hero-bk-btn[data-id="'+id+'"]').forEach(b => {
    const saved = STATE.bookmarks.includes(id);
    b.classList.toggle('saved', saved);
    b.querySelector('svg').setAttribute('fill', saved?'currentColor':'none');
  });
}

function openBkDrawer() { $('bookmarks-drawer').classList.remove('hidden'); $('drawer-overlay').classList.add('active'); refreshBkDrawer(); }
function closeBkDrawer() { $('bookmarks-drawer').classList.add('hidden'); $('drawer-overlay').classList.remove('active'); }

function refreshBkDrawer() {
  const scroll = $('drawer-scroll');
  const empty  = $('drawer-empty');
  scroll.querySelectorAll('.bk-item').forEach(e=>e.remove());
  let ids = [...STATE.bookmarks];
  if($('btn-bk-sort').textContent.trim().startsWith('Oldest')) ids = ids.reverse();
  if(!ids.length) { empty.classList.remove('hidden'); return; }
  empty.classList.add('hidden');
  ids.forEach(id => {
    const a = ARTICLE_MAP[id]; if(!a) return;
    const el = document.createElement('div');
    el.className = 'bk-item';
    el.innerHTML = `<div class="bk-thumb ${a.grad}" style="${a.img?`background-image:url('${a.img.replace('1400/700','200/130')}');background-size:cover;background-position:center`:''}"></div>
      <div class="bk-body"><div class="bk-cat">${a.category}</div><div class="bk-title">${a.title}</div><div class="bk-time">${ago(a.publishedAt)}</div></div>
      <button class="btn-bk-remove" data-id="${id}" aria-label="Remove">&times;</button>`;
    el.querySelector('.bk-body').addEventListener('click', () => openArticle(id));
    el.querySelector('.btn-bk-remove').addEventListener('click', () => toggleBk(id));
    scroll.appendChild(el);
  });
}

$('btn-bookmarks').addEventListener('click', openBkDrawer);
$('btn-close-drawer').addEventListener('click', closeBkDrawer);
$('drawer-overlay').addEventListener('click', closeBkDrawer);
$$('.dr-tab').forEach(t => t.addEventListener('click', () => { $$('.dr-tab').forEach(x=>x.classList.remove('active')); t.classList.add('active'); refreshBkDrawer(); }));
$('btn-bk-sort').addEventListener('click', () => { $('btn-bk-sort').textContent = $('btn-bk-sort').textContent.trim().startsWith('Newest')?'Oldest':'Newest'; refreshBkDrawer(); });
$('btn-bk-clear').addEventListener('click', () => $('confirm-clear').classList.remove('hidden'));
$('btn-no-clear').addEventListener('click', () => $('confirm-clear').classList.add('hidden'));
$('btn-do-clear').addEventListener('click', () => { STATE.bookmarks=[]; save(); syncUI(); refreshBkDrawer(); $('confirm-clear').classList.add('hidden'); toast('All saved articles cleared','info'); });

/* ============================================================
   ARTICLE MODAL
   ============================================================ */
async function openArticle(id) {
  // Check local map first
  let a = ARTICLE_MAP[id];

  // Not found locally — fetch from API (Guardian or TMDB articles)
  if (!a) {
    // Show loading state in modal while fetching
    $('article-bd').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    $('article-body-txt').innerHTML = '<div style="padding:40px;text-align:center;color:var(--text-3)"><div style="font-size:2rem;margin-bottom:12px">⏳</div><p>Loading article…</p></div>';
    $('art-title').textContent = '';
    $('art-cat-badge').textContent = '';
    $('art-author-chip').innerHTML = '';
    $('art-time').textContent = '';
    $('art-read-time').textContent = '';
    try {
      const res = await API.getArticle(id);
      a = res.data;
      // Cache it so subsequent opens are instant
      if (a) ARTICLE_MAP[a.id] = a;
    } catch(e) {
      $('article-body-txt').innerHTML = '<div style="padding:40px;text-align:center;color:var(--text-3)"><div style="font-size:2rem;margin-bottom:12px">⚠️</div><p>Could not load article. Please try again.</p><button class="btn-primary" style="margin-top:16px" onclick="closeArticle()">Close</button></div>';
      log('modal','Failed to fetch article: '+id);
      return;
    }
    if (!a) {
      $('article-body-txt').innerHTML = '<div style="padding:40px;text-align:center;color:var(--text-3)"><p>Article not found.</p></div>';
      return;
    }
  }

  STATE.openArticle = id;

  // Show "now reading" indicator with simulated count
  const nrBar = $('now-reading-bar');
  const nrTxt = $('now-reading-text');
  if(nrBar && nrTxt) {
    const count = Math.floor(3 + Math.random() * 28);
    nrTxt.textContent = count + ' people reading this now';
    nrBar.classList.remove('hidden');
    // Slowly decrement to feel live
    let cur = count;
    const nrTimer = setInterval(() => {
      if(!STATE.openArticle) { clearInterval(nrTimer); return; }
      cur = Math.max(1, cur + Math.floor(Math.random() * 3) - 1);
      nrTxt.textContent = cur + ' people reading this now';
    }, 8000);
    nrBar._timer = nrTimer;
  }

  const bg = document.createElement('div');
  bg.className = 'bg-fill ' + a.grad;
  if(a.img) { bg.style.backgroundImage=`url('${a.img}')`; bg.style.backgroundSize='cover'; bg.style.backgroundPosition='center'; }
  const heroEl = $('article-hero-img');
  heroEl.querySelectorAll('.bg-fill').forEach(e=>e.remove());
  heroEl.insertBefore(bg, heroEl.firstChild);

  $('art-cat-badge').textContent = a.category;
  $('art-title').textContent = a.title;
  $('sticky-title').textContent = a.title;

  $('art-author-chip').innerHTML = `<span style="display:inline-flex;align-items:center;gap:7px"><span style="width:24px;height:24px;border-radius:50%;background:var(--red);color:#fff;font-weight:700;display:inline-flex;align-items:center;justify-content:center;font-size:.7rem;flex-shrink:0">${a.author.avatar}</span>${a.author.name}</span>`;
  $('art-time').textContent = ago(a.publishedAt);
  $('art-read-time').textContent = a.readTimeMins + ' min read';

  const body = $('article-body-txt');
  body.innerHTML = a.body.map(p => p.includes('<blockquote>') ? p : `<p>${p}</p>`).join('');
  // For Guardian articles, add a "Read full article" link at the bottom
  if (a.sourceUrl) {
    body.innerHTML += `<div style="margin-top:24px;padding-top:16px;border-top:1px solid var(--border)">
      <a href="${a.sourceUrl}" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:8px;color:var(--red);font-weight:700;font-size:.88rem;text-decoration:none">
        Read full article on The Guardian
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
      </a>
    </div>`;
  }
  body.style.fontSize = `${STATE.articleFontScale}rem`;

  renderScores(a.criticScore, a.audienceScore);

  if(a.gallery?.length) {
    $('art-gallery-sec').classList.remove('hidden');
    $('art-gallery-grid').innerHTML = a.gallery.map((g,i) => `<div class="gal-cell" data-idx="${i}" role="button" tabindex="0"><div class="gal-fill ${g}"></div></div>`).join('');
    $('art-gallery-grid').querySelectorAll('.gal-cell').forEach(c => {
      c.addEventListener('click', () => openLbox(a.gallery, +c.dataset.idx));
    });
  } else $('art-gallery-sec').classList.add('hidden');

  if(a.cast?.length) {
    $('art-cast-sec').classList.remove('hidden');
    $('art-cast-row').innerHTML = a.cast.map(c=>`<div class="cast-card"><div class="cast-hs ${c.grad}"></div><div class="cast-nm">${c.name}</div><div class="cast-role">${c.role}</div></div>`).join('');
  } else $('art-cast-sec').classList.add('hidden');

  if(a.tags?.length) {
    $('art-tags-sec').classList.remove('hidden');
    $('art-tags-row').innerHTML = a.tags.map(t=>`<button class="tag-chip" data-tag="${t}">${t}</button>`).join('');
    $('art-tags-row').querySelectorAll('.tag-chip').forEach(c => c.addEventListener('click', () => { closeArticle(); STATE.filterGenre=c.dataset.tag; loadFeed(); }));
  } else $('art-tags-sec').classList.add('hidden');

  if(a.relatedMovies?.length) {
    $('art-related-sec').classList.remove('hidden');
    $('art-related-row').innerHTML = a.relatedMovies.map(m=>`<div class="rel-movie"><div class="rel-poster ${m.grad}" style="${m.img?`background-image:url('${m.img}');background-size:cover;background-position:center`:''}"></div><div class="rel-title">${m.title}</div><div class="rel-meta">${m.date} · &#9733; ${m.rating}</div><button class="btn-watchlist" onclick="addToWl('${m.title}')">+ Watchlist</button></div>`).join('');
  } else $('art-related-sec').classList.add('hidden');

  const mv = a.relatedMovies?.[0];
  $('art-movie-card').innerHTML = mv ? `
    <div class="art-movie-poster ${mv.grad}" style="${mv.img?`background-image:url('${mv.img}');background-size:cover;background-position:center`:''}">
      <div class="art-movie-grad"></div>
      <div class="art-movie-rating">&#9733; ${mv.rating}</div>
    </div>
    <div class="art-movie-body">
      <div class="art-movie-title">${mv.title}</div>
      <div class="art-movie-genre">${a.category}</div>
      <div class="art-movie-syn">${a.dek}</div>
      <div class="art-movie-specs"><span>Director: <strong>${a.cast?.[0]?.name||a.author.name}</strong></span><span>Release: <strong>${mv.date}</strong></span></div>
    </div>` : `<div class="art-movie-body"><div class="art-movie-title">${a.title}</div><div class="art-movie-genre">${a.category}</div><div class="art-movie-syn">${a.dek}</div></div>`;

  if(a.streamingOn?.length) {
    $('art-streaming-sec').classList.remove('hidden');
    $('art-streaming-logos').innerHTML = a.streamingOn.map(s=>`<div class="stream-logo">${s}</div>`).join('');
  } else $('art-streaming-sec').classList.add('hidden');

  // More articles: combine cached API articles + local articles for sidebar
  const allCached = Object.values(ARTICLE_MAP);
  const more = allCached.filter(x => x.id!==id && (x.category===a.category)).slice(0,4);
  $('art-more-list').innerHTML = more.map(m=>`<div class="more-item" data-id="${m.id}" role="button" tabindex="0"><div class="more-thumb ${m.grad||'article-bg-grad-1'}" style="${m.img?`background-image:url('${m.img}');background-size:cover;background-position:center`:''}"></div><div><div class="more-cat">${m.category}</div><div class="more-title">${m.title}</div></div></div>`).join('');
  $('art-more-list').querySelectorAll('.more-item').forEach(el => {
    el.addEventListener('click', () => openArticle(el.dataset.id));
    el.addEventListener('keydown', e => { if(e.key==='Enter') openArticle(el.dataset.id); });
  });

  // "You might also like" section at the bottom of the article
  const related = allCached.filter(x => x.id !== id && x.category === a.category).slice(0, 3);
  const ymalsec = $('art-ymal-sec');
  if(ymalsec && related.length) {
    ymalsec.classList.remove('hidden');
    $('art-ymal-grid').innerHTML = related.map(r => `
      <div class="ymal-card" data-id="${r.id}" role="button" tabindex="0">
        <div class="ymal-thumb ${r.grad||'article-bg-grad-2'}" style="${r.img?`background-image:url('${r.img}');background-size:cover;background-position:center`:''}"></div>
        <div class="ymal-body">
          <div class="ymal-cat">${r.category}</div>
          <div class="ymal-title">${r.title}</div>
          <div class="ymal-time">${ago(r.publishedAt)}</div>
        </div>
      </div>`).join('');
    $('art-ymal-grid').querySelectorAll('.ymal-card').forEach(c => {
      c.addEventListener('click', () => openArticle(c.dataset.id));
      c.addEventListener('keydown', e => { if(e.key==='Enter') openArticle(c.dataset.id); });
    });
  } else if(ymalsec) {
    ymalsec.classList.add('hidden');
  }

  syncStickyBk();
  buildComments(a);

  const ids = ARTICLES.map(x=>x.id), idx2 = ids.indexOf(id);
  const pb=$('btn-art-prev'), nb=$('btn-art-next');
  if(idx2>0) { pb.classList.remove('hidden'); pb.onclick=()=>openArticle(ids[idx2-1]); pb.textContent='← '+ARTICLES[idx2-1].title.slice(0,28)+'...'; } else pb.classList.add('hidden');
  if(idx2<ids.length-1) { nb.classList.remove('hidden'); nb.onclick=()=>openArticle(ids[idx2+1]); nb.textContent=ARTICLES[idx2+1].title.slice(0,28)+'... →'; } else nb.classList.add('hidden');

  const bd = $('article-bd');
  bd.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  // Restore saved scroll position if exists
  const savedScroll = parseInt(localStorage.getItem('cw_scroll_' + id) || '0');
  bd.scrollTop = savedScroll;
  $('article-modal').scrollTop = 0;

  const prg = $('scroll-progress-bar');
  if(prg) prg.style.width = '0%';

  const modal = $('article-modal');
  const stickyBar = $('article-sticky-bar');
  bd.onscroll = () => {
    stickyBar.classList.toggle('visible', bd.scrollTop > 280);
    const bgEl = modal.querySelector('.bg-fill');
    if(bgEl) bgEl.style.transform = `translateY(${bd.scrollTop * .25}px)`;
    const scrollHeight = bd.scrollHeight - bd.clientHeight;
    if(scrollHeight > 0 && prg) prg.style.width = ((bd.scrollTop/scrollHeight)*100)+'%';
    // Save reading position every 500ms of scrolling
    clearTimeout(bd._scrollSaveTimer);
    bd._scrollSaveTimer = setTimeout(() => {
      if(STATE.openArticle) localStorage.setItem('cw_scroll_' + STATE.openArticle, bd.scrollTop);
    }, 500);
  };

  log('modal','Opened: '+a.title.slice(0,40));
  // Update URL without page reload
  const slug = a.title.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,60);
  history.pushState({ articleId: id }, a.title, `/article/${id}/${slug}`);
  document.title = `${a.title} — CineWire`;
  const _ogT=document.querySelector('meta[property="og:title"]');
  const _ogD=document.querySelector('meta[property="og:description"]');
  const _ogI=document.querySelector('meta[property="og:image"]');
  if(_ogT)_ogT.setAttribute('content',a.title+' — CineWire');
  if(_ogD)_ogD.setAttribute('content',a.dek||'Read on CineWire');
  if(_ogI&&a.img)_ogI.setAttribute('content',a.img);
}

function closeArticle() {
  // Save final position
  const bd2 = $('article-bd');
  if(STATE.openArticle && bd2.scrollTop > 100) {
    localStorage.setItem('cw_scroll_' + STATE.openArticle, bd2.scrollTop);
  }
  $('article-bd').classList.add('hidden');
  document.body.style.overflow = '';
  STATE.openArticle = null;
  $('article-sticky-bar').classList.remove('visible');
  const nrBar = $('now-reading-bar');
  if(nrBar) {
    nrBar.classList.add('hidden');
    if(nrBar._timer) clearInterval(nrBar._timer);
  }
  log('modal','Closed article');
  // Restore URL
  history.pushState({}, 'CineWire', '/');
  document.title = 'CineWire — Global Movie News';
  const _ogT=document.querySelector('meta[property="og:title"]');
  const _ogD=document.querySelector('meta[property="og:description"]');
  const _ogI=document.querySelector('meta[property="og:image"]');
  if(_ogT)_ogT.setAttribute('content','CineWire — Global Movie News');
  if(_ogD)_ogD.setAttribute('content',"The world's cinema, in your hands.");
  if(_ogI)_ogI.setAttribute('content','https://placehold.co/1200x630/e50914/ffffff?text=CineWire');
}

$('btn-close-article').addEventListener('click', closeArticle);
$('article-bd').addEventListener('click', e => { if(e.target===$('article-bd')) closeArticle(); });

function syncStickyBk() {
  const saved = STATE.bookmarks.includes(STATE.openArticle);
  $('sticky-bk').classList.toggle('active', saved);
}
$('sticky-bk')?.addEventListener('click', (e) => { e.stopPropagation(); if(!STATE.openArticle) return; toggleBk(STATE.openArticle); syncStickyBk(); });
$('sticky-share')?.addEventListener('click', (e) => { e.stopPropagation(); openShare(STATE.openArticle); });
$('sticky-font-dn')?.addEventListener('click', () => { STATE.articleFontScale=Math.max(.8,STATE.articleFontScale-.08); $('article-body-txt').style.fontSize=STATE.articleFontScale+'rem'; localStorage.setItem('cw_fontscale', STATE.articleFontScale); });
$('sticky-font-up')?.addEventListener('click', () => { STATE.articleFontScale=Math.min(1.5,STATE.articleFontScale+.08); $('article-body-txt').style.fontSize=STATE.articleFontScale+'rem'; localStorage.setItem('cw_fontscale', STATE.articleFontScale); });

function renderScores(c, aud) {
  if(!c && !aud) { $('art-scores-sec').classList.add('hidden'); return; }
  $('art-scores-sec').classList.remove('hidden');
  const R=32, circ=2*Math.PI*R;
  $('art-scores-row').innerHTML = [{label:'Critic Score',pct:c,cls:'critic'},{label:'Audience Score',pct:aud,cls:'audience'}].filter(r=>r.pct>0).map(r=>`
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
  requestAnimationFrame(() => {
    $('art-scores-row').querySelectorAll('.ring-fill').forEach(c => { setTimeout(() => { c.style.strokeDashoffset = c.dataset.t; }, 120); });
  });
}

function addToWl(title) {
  if(!STATE.watchlist.includes(title)) { STATE.watchlist.push(title); save(); toast('Added to Watchlist: '+title,'success'); }
  else toast('Already in your Watchlist','info');
}

/* ============================================================
   COMMENTS
   ============================================================ */
function buildComments(a) {
  const commentsArr = Array.isArray(a.comments) ? a.comments : [];
  $('comments-count').textContent = commentsArr.reduce((n,c) => n+1+(c.replies?.length||0), 0);
  const list = $('comments-list');
  list.innerHTML = '';
  let comments = [...commentsArr];
  if(STATE.commentSort==='top') comments.sort((a,b) => b.likes-a.likes);
  if(!comments.length) { list.innerHTML = '<p style="color:var(--text-3);font-style:italic;font-size:.84rem">No comments yet — start the conversation!</p>'; return; }
  comments.forEach(c => {
    const el = document.createElement('div');
    el.style.cssText = 'display:flex;gap:10px;margin-bottom:16px';
    el.innerHTML = `
      <div style="width:34px;height:34px;border-radius:50%;background:var(--bg-e);display:flex;align-items:center;justify-content:center;font-weight:700;font-size:.82rem;flex-shrink:0;${c.verified?'border:2px solid var(--gold)':''}">${c.avatar}</div>
      <div style="flex:1">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px">
          <span style="font-size:.82rem;font-weight:700">${c.user}</span>
          ${c.verified?'<span style="background:var(--gold);color:#000;font-size:.58rem;font-weight:800;padding:1px 5px;border-radius:3px;text-transform:uppercase">Critic</span>':''}
          ${c.role==='reporter'?'<span style="background:rgba(24,169,106,.12);color:#16a34a;border:1px solid rgba(24,169,106,.25);font-size:.58rem;font-weight:800;padding:1px 6px;border-radius:3px;text-transform:uppercase">Verified Reporter</span>':''}
          ${c.role==='studio'?'<span style="background:rgba(59,130,246,.12);color:#3b82f6;border:1px solid rgba(59,130,246,.25);font-size:.58rem;font-weight:800;padding:1px 6px;border-radius:3px;text-transform:uppercase">Official Studio</span>':''}
          <span style="font-size:.7rem;color:var(--text-3)">${c.time}</span>
        </div>
        <div style="font-size:.84rem;color:var(--text-2);line-height:1.5;margin-bottom:7px">${c.text}</div>
        <div style="display:flex;gap:12px">
          <button class="btn-cl" data-cid="${c.id}" style="background:none;font-size:.74rem;color:var(--text-3);cursor:pointer">+1 ${c.likes}</button>
          <button class="btn-reply" data-cid="${c.id}" style="background:none;font-size:.74rem;color:var(--text-3);cursor:pointer">Reply</button>
        </div>
        ${c.replies?.length?`<div style="margin-top:10px;padding-left:14px;border-left:2px solid var(--border)">${c.replies.map(r=>`<div style="display:flex;gap:8px;margin-bottom:10px"><div style="width:28px;height:28px;border-radius:50%;background:var(--bg-e);display:flex;align-items:center;justify-content:center;font-weight:700;font-size:.72rem;flex-shrink:0">${r.avatar}</div><div><div style="font-size:.78rem;font-weight:700;margin-bottom:3px">${r.user} <span style="color:var(--text-3);font-size:.68rem">${r.time}</span></div><div style="font-size:.82rem;color:var(--text-2)">${r.text}</div></div></div>`).join('')}</div>`:''}
      </div>`;
    el.querySelector('.btn-cl').addEventListener('click', b => { c.likes++; b.target.textContent='+1 '+c.likes; b.target.style.color='var(--red)'; });
    el.querySelector('.btn-reply').addEventListener('click', () => { $('comment-input').value='@'+c.user+' '; $('comment-input').focus(); $('comment-form-btns').classList.remove('hidden'); });
    list.appendChild(el);
  });
}

$$('.csort').forEach(b => b.addEventListener('click', () => {
  $$('.csort').forEach(x => x.classList.remove('active')); b.classList.add('active');
  STATE.commentSort = b.dataset.sort;
  if(STATE.openArticle) buildComments(ARTICLE_MAP[STATE.openArticle]);
}));

$('comment-input').addEventListener('focus', () => $('comment-form-btns').classList.remove('hidden'));
$('btn-cancel-comment').addEventListener('click', () => { $('comment-input').value=''; $('comment-form-btns').classList.add('hidden'); });
$('comment-form').addEventListener('submit', e => {
  e.preventDefault();
  const txt = $('comment-input').value.trim();
  if(!txt || !STATE.openArticle) return;
  const a = ARTICLE_MAP[STATE.openArticle];
  if(!a) return;
  const name = STATE.isLoggedIn ? STATE.user?.name : 'Cinema Fan';
  const userRole = STATE.user?.role || 'user';
  a.comments.unshift({id:'c'+Date.now(),user:name,avatar:(name[0]||'G').toUpperCase(),verified:false,role:userRole,text:txt,time:'Just now',likes:0,replies:[]});
  $('comment-input').value = ''; $('comment-form-btns').classList.add('hidden');
  buildComments(a); toast('Comment posted!','success'); log('modal','Comment posted');
});

/* ============================================================
   LIGHTBOX
   ============================================================ */
function openLbox(imgs,idx) { STATE.lboxImages=imgs; STATE.lboxIdx=idx; renderLbox(); $('lightbox').classList.remove('hidden'); document.body.style.overflow='hidden'; }
function closeLbox()        { $('lightbox').classList.add('hidden'); document.body.style.overflow=''; }
function renderLbox() {
  const g = STATE.lboxImages[STATE.lboxIdx];
  $('lbox-img-wrap').innerHTML = `<div class="${g}" style="width:600px;max-width:90vw;height:380px;border-radius:12px;background-size:cover;background-position:center"></div>`;
}
$('btn-lbox-close').addEventListener('click', closeLbox);
$('btn-lbox-prev').addEventListener('click', () => { STATE.lboxIdx=(STATE.lboxIdx-1+STATE.lboxImages.length)%STATE.lboxImages.length; renderLbox(); });
$('btn-lbox-next').addEventListener('click', () => { STATE.lboxIdx=(STATE.lboxIdx+1)%STATE.lboxImages.length; renderLbox(); });
$('lightbox').addEventListener('click', e => { if(e.target===$('lightbox')) closeLbox(); });

/* ============================================================
   SHARE
   ============================================================ */
let shareId = null;
function openShare(id) {
  shareId=id;
  $('share-bd').classList.remove('hidden');
  // Show simulated share count for social proof
  const shareCount = Math.floor(50 + Math.random() * 500);
  const shareCountEl = $('share-count-display');
  if(shareCountEl) shareCountEl.textContent = shareCount.toLocaleString() + ' people shared this';
  log('modal','Share: '+id);
}
$('btn-close-share').addEventListener('click', () => $('share-bd').classList.add('hidden'));
$('share-bd').addEventListener('click', e => { if(e.target===$('share-bd')) $('share-bd').classList.add('hidden'); });
$$('.share-opt').forEach(b => b.addEventListener('click', async () => {
  const plat    = b.dataset.share;
  const article = ARTICLE_MAP[shareId];
  const url     = `${window.location.origin}?article=${shareId}`;
  const title   = article?.title || 'CineWire';
  const text    = article?.dek   || 'Check this out on CineWire';

  if (plat === 'native' || plat === 'copy') {
    // Try Web Share API first (mobile native share sheet)
    if (plat === 'native' && navigator.share) {
      try {
        await navigator.share({ title, text, url });
        toast('Shared!', 'success');
        $('share-bd').classList.add('hidden');
        log('modal', 'Native share: ' + shareId);
        return;
      } catch (e) {
        if (e.name !== 'AbortError') {
          // Fall through to copy
        } else {
          $('share-bd').classList.add('hidden');
          return;
        }
      }
    }
    // Copy link fallback
    try {
      await navigator.clipboard.writeText(url);
      toast('Link copied to clipboard!', 'success');
    } catch {
      toast('Link: ' + url, 'info');
    }
  } else if (plat === 'twitter') {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank');
  } else if (plat === 'whatsapp') {
    window.open(`https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`, '_blank');
  } else if (plat === 'facebook') {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
  } else if (plat === 'reddit') {
    window.open(`https://reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`, '_blank');
  }

  $('share-bd').classList.add('hidden');
  log('modal', 'Shared via ' + plat);
}));

/* ============================================================
   TRAILER
   ============================================================ */
function openTrailer(id) {
  const a = ARTICLE_MAP[id]; if(!a) return;
  const bg = $('trailer-bg');
  bg.className = 'trailer-bg ' + a.grad;
  if(a.img) { bg.style.backgroundImage=`url('${a.img}')`; bg.style.backgroundSize='cover'; bg.style.backgroundPosition='center'; }
  $('trailer-title-txt').textContent = a.title;
  $('trailer-bd').classList.remove('hidden');
  STATE.trailerPlaying = true; $('btn-t-play').innerHTML='&#9646;&#9646;';
  startTrailer();
}
function closeTrailer() { $('trailer-bd').classList.add('hidden'); STATE.trailerPlaying=false; clearInterval(STATE.trailerTimer); $('t-fill').style.width='0%'; }
function startTrailer() {
  if(STATE.trailerTimer) clearInterval(STATE.trailerTimer);
  let pct = 0;
  STATE.trailerTimer = setInterval(() => {
    if(!STATE.trailerPlaying) return;
    pct = Math.min(100, pct+.4); $('t-fill').style.width=pct+'%';
    if(pct>=100) { clearInterval(STATE.trailerTimer); $('btn-t-play').innerHTML='&#9654;'; STATE.trailerPlaying=false; }
  },100);
}
$('btn-close-trailer').addEventListener('click', closeTrailer);
$('trailer-bd').addEventListener('click', e => { if(e.target===$('trailer-bd')) closeTrailer(); });
$('btn-t-play').addEventListener('click', () => { STATE.trailerPlaying=!STATE.trailerPlaying; $('btn-t-play').innerHTML=STATE.trailerPlaying?'&#9646;&#9646;':'&#9654;'; if(STATE.trailerPlaying) startTrailer(); });
$('btn-t-mute').addEventListener('click', () => { $('btn-t-mute').textContent=$('btn-t-mute').textContent==='Vol'?'Mute':'Vol'; });
$('btn-t-fs').addEventListener('click', () => toast('Fullscreen available in production build','info'));

/* ============================================================
   AUTH
   ============================================================ */
function openAuth() { $('auth-bd').classList.remove('hidden'); }
function closeAuth() { $('auth-bd').classList.add('hidden'); }
$('btn-close-auth').addEventListener('click', closeAuth);
$('auth-bd').addEventListener('click', e => { if(e.target===$('auth-bd')) closeAuth(); });
$('btn-signin-header').addEventListener('click', () => {
  $('auth-screen').classList.remove('hidden');
  $('app-header').style.display = 'none';
  document.body.style.paddingTop = '0';
});

function doLogin(name,email,provider) {
  STATE.isLoggedIn=true; STATE.user={name,email,provider}; save(); syncUI(); closeAuth();
  if(STATE.followedRegions.length<=1) openRegion();
  toast('Welcome, '+name+'!','success'); log('auth','Login: '+name+' via '+provider);
}
$('btn-login-google').addEventListener('click', () => doLogin('Google User','google@cinewire.com','Google'));
$('btn-login-facebook').addEventListener('click', () => doLogin('Facebook User','fb@cinewire.com','Facebook'));
$('btn-login-twitter').addEventListener('click', () => doLogin('X User','x@cinewire.com','X'));
$('btn-auth-guest').addEventListener('click', () => doLogin('Guest','guest@cinewire.com','Guest'));
$('auth-form').addEventListener('submit', e => {
  e.preventDefault();
  const email = $('auth-email').value.trim();
  const name  = email.split('@')[0].replace(/[._]/g,' ').replace(/\b\w/g,c=>c.toUpperCase());
  doLogin(name,email,'Email');
});
$('btn-signout').addEventListener('click', () => {
  STATE.isLoggedIn=false; STATE.user=null; clearToken(); save(); syncUI();
  $('user-dropdown').classList.add('hidden');
  toast('Signed out. See you next time!','info'); log('auth','Signed out');
});
$('btn-user-menu').addEventListener('click', e => {
  e.stopPropagation();
  if(!STATE.isLoggedIn) {
    $('auth-screen').classList.remove('hidden');
    $('app-header').style.display = 'none';
    document.body.style.paddingTop = '0';
    return;
  }
  $('user-dropdown').classList.toggle('hidden');
  $('notif-dropdown').classList.add('hidden');
});
document.addEventListener('click', () => { $('user-dropdown').classList.add('hidden'); $('notif-dropdown').classList.add('hidden'); });

/* ============================================================
   NOTIFICATIONS
   ============================================================ */
function renderNotifs() {
  $('notif-list').innerHTML = NOTIFICATIONS.map(n => `
    <div class="notif-item${!STATE.notifRead.includes(n.id)?' unread':''}" data-id="${n.id}">
      ${!STATE.notifRead.includes(n.id)?'<div class="notif-dot"></div>':'<div style="width:7px"></div>'}
      <div class="notif-body"><div class="notif-text">${n.text}</div><div class="notif-time">${n.time}</div></div>
    </div>`).join('');
  $('notif-list').querySelectorAll('.notif-item').forEach(el => el.addEventListener('click', () => {
    if(!STATE.notifRead.includes(el.dataset.id)) { STATE.notifRead.push(el.dataset.id); save(); renderNotifs(); }
    el.classList.remove('unread');
  }));
}
$('btn-notif').addEventListener('click', e => {
  e.stopPropagation();
  $('notif-dropdown').classList.toggle('hidden');
  $('user-dropdown').classList.add('hidden');
  if(!$('notif-dropdown').classList.contains('hidden')) renderNotifs();
});
$('btn-mark-read').addEventListener('click', () => {
  STATE.notifRead = NOTIFICATIONS.map(n=>n.id); save(); renderNotifs();
  toast('All notifications marked as read','success');
});

/* ============================================================
   REGION SELECTOR
   ============================================================ */
let pendingReg = STATE.activeRegion;
function openRegion() {
  pendingReg = STATE.activeRegion;
  renderRegionModal();
  $('region-bd').classList.remove('hidden');
  log('region','Region modal opened');
}
function closeRegion() { $('region-bd').classList.add('hidden'); }
$('btn-region-pill').addEventListener('click', openRegion);
$('btn-mob-region').addEventListener('click', () => { closeMobNav(); openRegion(); });
$('btn-close-region').addEventListener('click', closeRegion);
$('btn-region-cancel').addEventListener('click', closeRegion);
$('region-bd').addEventListener('click', e => { if(e.target===$('region-bd')) closeRegion(); });
$('btn-region-apply').addEventListener('click', () => {
  STATE.activeRegion = pendingReg;
  if(!STATE.followedRegions.includes(pendingReg)) STATE.followedRegions.push(pendingReg);
  save(); syncUI(); buildHero(); loadFeed(); closeRegion();
  toast('Region: '+(COUNTRY_MAP[pendingReg]?.name||'Global'),'success');
  log('region','Switched to: '+pendingReg);
});

function renderRegionModal() {
  const q = $('region-search').value.trim().toLowerCase();
  $('region-your-list').innerHTML = STATE.followedRegions.map(code => {
    const c = COUNTRY_MAP[code]||{code,name:code};
    const canRemove = code !== 'GL';
    return `<button class="region-chip-btn${pendingReg===code?' active-region':''}" data-code="${code}">` +
      `<span class="region-code">${code}</span> ${c.name}` +
      (canRemove ? `<span class="region-chip-remove" data-remove="${code}" title="Remove ${c.name}" aria-label="Remove ${c.name}">&times;</span>` : '') +
      `</button>`;
  }).join('');
  $('region-your-list').querySelectorAll('.region-chip-btn').forEach(b => {
    b.addEventListener('click', e => {
      // If user clicked the × button, remove — don't select
      if (e.target.closest('.region-chip-remove')) return;
      pendingReg = b.dataset.code;
      renderRegionModal();
    });
  });
  $('region-your-list').querySelectorAll('.region-chip-remove').forEach(x => {
    x.addEventListener('click', e => {
      e.stopPropagation();
      const code = x.dataset.remove;
      STATE.followedRegions = STATE.followedRegions.filter(r => r !== code);
      // If we removed the currently pending/active region, reset to GL
      if (pendingReg === code) pendingReg = 'GL';
      if (STATE.activeRegion === code) { STATE.activeRegion = 'GL'; save(); syncUI(); buildHero(); loadFeed(); }
      renderRegionModal();
    });
  });
  const filtered = COUNTRIES.filter(c => !q || c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q));
  $('region-all-list').innerHTML = filtered.map(c => `
    <div class="region-country-row${pendingReg===c.code?' active':''}" data-code="${c.code}" role="button" tabindex="0">
      <span class="rcode">${c.code}</span><span style="flex:1">${c.name}</span>
      ${pendingReg===c.code?'<span class="rcheck">✓</span>':''}
    </div>`).join('');
  $('region-all-list').querySelectorAll('.region-country-row').forEach(r => {
    const s = () => { pendingReg=r.dataset.code; if(!STATE.followedRegions.includes(r.dataset.code)) STATE.followedRegions.push(r.dataset.code); renderRegionModal(); };
    r.addEventListener('click', s); r.addEventListener('keydown', e => { if(e.key==='Enter') s(); });
  });
}
$('region-search').addEventListener('input', dbn(() => renderRegionModal(), 200));

/* ============================================================
   MOBILE NAV
   ============================================================ */
function openMobNav() { $('mob-nav').classList.remove('hidden'); $('mob-overlay').classList.add('active'); $('btn-hamburger').classList.add('open'); }
function closeMobNav() { $('mob-nav').classList.add('hidden'); $('mob-overlay').classList.remove('active'); $('btn-hamburger').classList.remove('open'); }
$('btn-hamburger').addEventListener('click', openMobNav);
$('btn-mob-close').addEventListener('click', closeMobNav);
$('mob-overlay').addEventListener('click', closeMobNav);
$$('.mob-link').forEach(l => l.addEventListener('click', () => { STATE.activeTab=S2T[l.dataset.section]||'latest'; syncUI(); loadFeed(); closeMobNav(); }));

/* ============================================================
   BOTTOM MOBILE NAV
   ============================================================ */
const S2BNAV = { home:'bnav-home', trending:'bnav-trending', boxoffice:'bnav-trending', reviews:'bnav-trending' };

function syncBottomNav(section) {
  document.querySelectorAll('.bottom-nav-item').forEach(b => b.classList.remove('active'));
  const activeId = S2BNAV[section] || 'bnav-home';
  const el = document.getElementById(activeId);
  if (el) el.classList.add('active');
  // Update saved badge
  const badge = document.getElementById('bnav-saved-badge');
  if (badge) {
    badge.textContent = STATE.bookmarks.length;
    badge.classList.toggle('hidden', STATE.bookmarks.length === 0);
  }
}

document.querySelectorAll('.bottom-nav-item').forEach(btn => {
  btn.addEventListener('click', () => {
    const sec = btn.dataset.section;
    document.querySelectorAll('.bottom-nav-item').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    if (sec === 'saved') {
      openBkDrawer();
    } else if (sec === 'profile') {
      if (STATE.isLoggedIn) {
        document.getElementById('user-dropdown').classList.toggle('hidden');
      } else {
        document.getElementById('auth-screen').classList.remove('hidden');
        document.getElementById('app-header').style.display = 'none';
        document.body.style.paddingTop = '0';
      }
    } else if (sec === 'categories') {
      document.getElementById('categories-sec').scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      const tab = S2T[sec] || 'latest';
      STATE.activeTab = tab;
      STATE.filterGenre = null;
      syncUI();
      loadFeed();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
});

/* ============================================================
   SEARCH
   ============================================================ */
$('header-search-input')?.addEventListener('input', dbn(e => {
  const q = e.target.value.trim();
  const ac = $('search-autocomplete');
  if(!q) { ac.classList.add('hidden'); return; }
  const ql = q.toLowerCase();
  const res = ARTICLES.filter(a => a.title.toLowerCase().includes(ql) || a.category.toLowerCase().includes(ql) || a.author.name.toLowerCase().includes(ql) || a.tags.some(t=>t.toLowerCase().includes(ql))).slice(0,7);
  if(!res.length) { ac.classList.add('hidden'); return; }
  ac.innerHTML = res.map(a=>`<div class="ac-item" data-id="${a.id}" role="option" tabindex="0"><div class="ac-thumb ${a.grad}" style="${a.img?`background-image:url('${a.img.replace('1400/700','80/80')}');background-size:cover`:''}"></div><div><div class="ac-info-title">${hl(a.title,q).slice(0,60)}...</div><div class="ac-info-meta">${a.category} · ${a.author.name}</div></div></div>`).join('');
  ac.classList.remove('hidden');
  ac.querySelectorAll('.ac-item').forEach(el => {
    const open = () => { openArticle(el.dataset.id); ac.classList.add('hidden'); const si = $('header-search-input'); if(si) si.value=''; };
    el.addEventListener('click', open);
    el.addEventListener('keydown', e => { if(e.key==='Enter') open(); });
  });
},220));
$('header-search-input')?.addEventListener('keydown', e => { if(e.key==='Escape') { $('search-autocomplete')?.classList.add('hidden'); const si = $('header-search-input'); if(si) si.value=''; } });
document.addEventListener('click', e => { if(!e.target.closest('.header-search-wrap')) $('search-autocomplete')?.classList.add('hidden'); });

/* ============================================================
   KEYBOARD SHORTCUTS
   ============================================================ */
document.addEventListener('keydown', e => {
  if(e.key==='Escape') {
    if(!$('article-bd').classList.contains('hidden'))   { closeArticle(); return; }
    if(!$('auth-bd').classList.contains('hidden'))      { closeAuth(); return; }
    if(!$('region-bd').classList.contains('hidden'))    { closeRegion(); return; }
    if(!$('share-bd').classList.contains('hidden'))     { $('share-bd').classList.add('hidden'); return; }
    if(!$('trailer-bd').classList.contains('hidden'))   { closeTrailer(); return; }
    if(!$('lightbox').classList.contains('hidden'))     { closeLbox(); return; }
    if(!$('bookmarks-drawer').classList.contains('hidden')) { closeBkDrawer(); return; }
    if(!$('mob-nav').classList.contains('hidden'))      { closeMobNav(); return; }
  }
  if(e.key==='ArrowLeft'  && $('article-bd').classList.contains('hidden')) { heroGo(STATE.heroIdx-1); heroRestart(); }
  if(e.key==='ArrowRight' && $('article-bd').classList.contains('hidden')) { heroGo(STATE.heroIdx+1); heroRestart(); }
});

/* ============================================================
   TRENDING RAIL
   ============================================================ */
function buildTrending() {
  const sorted = [...ARTICLES].sort((a,b) => (b.reactions.like+b.reactions.fire)-(a.reactions.like+a.reactions.fire)).slice(0,10);
  const rail = $('trending-rail');
  rail.innerHTML = sorted.map((a,i) => `
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
  // Cache trending articles so openArticle can find them
  sorted.forEach(a => { if (!ARTICLE_MAP[a.id]) ARTICLE_MAP[a.id] = a; });
  rail.querySelectorAll('.trend-card').forEach(c => {
    const open = () => openArticle(c.dataset.id);
    c.addEventListener('click', open);
    c.addEventListener('keydown', e => { if(e.key==='Enter') open(); });
  });
  $('trend-prev').addEventListener('click', () => rail.scrollBy({left:-240,behavior:'smooth'}));
  $('trend-next').addEventListener('click', () => rail.scrollBy({left:240,behavior:'smooth'}));
}

/* ============================================================
   BOX OFFICE TICKER
   ============================================================ */
function buildTicker() {
  const track = $('ticker-track');
  const items = [...BOX_OFFICE,...BOX_OFFICE].map(b => `
    <span class="tick-item">
      <span class="tick-rank">#${b.rank}</span>
      <span class="tick-title">${b.title}</span>
      <span class="tick-gross">${b.gross}</span>
      <span class="tick-${b.trend==='up'?'up':b.trend==='down'?'down':''}">${b.trend==='up'?'▲':b.trend==='down'?'▼':'—'}</span>
    </span>`).join('');
  track.innerHTML = items;
}

/* ============================================================
   NEWSLETTER
   ============================================================ */
$('newsletter-form')?.addEventListener('submit', e => {
  e.preventDefault();
  const email = $('nl-email')?.value || ''.trim();
  $('newsletter-form')?.classList.add('hidden');
  $('nl-success')?.classList.remove('hidden');
  confetti();
  toast('Subscribed with '+email+'!','success');
  log('nav','Newsletter: '+email);
});
function confetti() {
  const c = $('nl-confetti');
  const colors = ['#fff','rgba(255,255,255,.7)','rgba(255,255,255,.5)','#ffcc00','#ff9900'];
  for(let i=0;i<36;i++) {
    const p = document.createElement('div');
    p.className = 'confetti-p';
    p.style.cssText = `left:${Math.random()*100}%;background:${colors[Math.floor(Math.random()*colors.length)]};animation-duration:${1.5+Math.random()*2}s;animation-delay:${Math.random()*.5}s;width:${6+Math.random()*6}px;height:${6+Math.random()*6}px;`;
    c.appendChild(p);
    p.addEventListener('animationend', () => p.remove());
  }
}

/* ============================================================
   STREAMING
   ============================================================ */

// Platform badge colors
const PLATFORM_COLORS = {
  'Netflix':    '#e50914',
  'Prime Video':'#00a8e0',
  'Disney+':    '#113ccf',
  'Apple TV+':  '#1d1d1f',
  'Max':        '#002be7',
  'Mubi':       '#222222',
  'Hulu':       '#1ce783',
  'Peacock':    '#000000',
  'Paramount+': '#0064ff',
};

// Industry flag map — shown on cards
const INDUSTRY_FLAGS = {
  'IN': '🇮🇳', 'JP': '🇯🇵', 'KR': '🇰🇷', 'GB': '🇬🇧',
  'US': '🇺🇸', 'FR': '🇫🇷', 'IT': '🇮🇹', 'DE': '🇩🇪',
  'GL': '', 'CN': '🇨🇳', 'AU': '🇦🇺', 'BR': '🇧🇷',
};
const CATEGORY_FLAGS = {
  'Bollywood': '🇮🇳', 'Tollywood': '🇮🇳', 'Kollywood': '🇮🇳',
  'Mollywood': '🇮🇳', 'Sandalwood': '🇮🇳',
  'K-Cinema': '🇰🇷', 'Korean': '🇰🇷',
  'Japanese Cinema': '🇯🇵', 'Anime': '🇯🇵',
  'British Cinema': '🇬🇧',
  'Hollywood': '🇺🇸',
};

function buildStreaming() {
  const container = $('streaming-cards');

  // Group by platform for the platform filter tabs
  const platforms = ['All', ...new Set(STREAMING.map(s => s.platform))];

  container.parentElement.querySelector('.stream-filter-row')?.remove();
  const filterRow = document.createElement('div');
  filterRow.className = 'stream-filter-row';
  filterRow.innerHTML = platforms.map((p,i) =>
    `<button class="stream-filter-btn${i===0?' active':''}" data-platform="${p}">${p}</button>`
  ).join('');
  container.before(filterRow);

  let activePlatform = 'All';

  function renderCards(platform) {
    const list = platform === 'All' ? STREAMING : STREAMING.filter(s => s.platform === platform);
    container.innerHTML = list.map((s, i) => {
      const origIdx = STREAMING.indexOf(s);
      const color = PLATFORM_COLORS[s.platform] || '#333';
      return `
      <div class="stream-card" data-stream-idx="${origIdx}" role="button" tabindex="0">
        <div class="stream-poster ${s.grad}" style="${s.img?`background-image:url('${s.img}');background-size:cover;background-position:center`:''};animation-delay:${i*.04}s">
          <div class="stream-platform-badge" style="background:${color}">${s.platform}</div>
          ${s.rating ? `<div class="stream-rating-badge">★ ${s.rating}</div>` : ''}
        </div>
        <div class="stream-body">
          <div class="stream-title">${s.title}</div>
          <div class="stream-meta">
            <span class="stream-genre">${s.genre}</span>
            ${s.year ? `<span class="stream-year">${s.year}</span>` : ''}
          </div>
        </div>
      </div>`;
    }).join('');

    container.querySelectorAll('.stream-card').forEach(card => {
      const open = () => openStreamModal(+card.dataset.streamIdx);
      card.addEventListener('click', open);
      card.addEventListener('keydown', e => { if(e.key==='Enter'||e.key===' ') open(); });
    });
  }

  renderCards('All');

  filterRow.querySelectorAll('.stream-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      filterRow.querySelectorAll('.stream-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activePlatform = btn.dataset.platform;
      renderCards(activePlatform);
    });
  });

  // Prev/Next arrows
  const rail = $('streaming-cards');
  $('stream-prev')?.addEventListener('click', () => rail.scrollBy({ left: -500, behavior: 'smooth' }));
  $('stream-next')?.addEventListener('click', () => rail.scrollBy({ left: 500, behavior: 'smooth' }));
}

// Platform → URL mapping
const PLATFORM_URLS = {
  'Netflix':    'https://www.netflix.com',
  'Prime Video':'https://www.primevideo.com',
  'Apple TV+':  'https://tv.apple.com',
  'Disney+':    'https://www.disneyplus.com',
  'Mubi':       'https://mubi.com',
  'Max':        'https://www.max.com',
  'Hulu':       'https://www.hulu.com',
  'Peacock':    'https://www.peacocktv.com',
  'Paramount+': 'https://www.paramountplus.com',
};

const STREAM_DESCS = {
  'Squid Game S3':          "The global phenomenon returns. 456 new players. One new game. Season 3 is the darkest yet — now streaming on Netflix.",
  'Stranger Things S5':     "The final chapter of the Hawkins saga. Eleven faces the ultimate threat. Streaming exclusively on Netflix.",
  'Severance S3':           "Mark S. continues the fight between his work and personal selves in this mind-bending thriller. On Apple TV+.",
  'The Last of Us S3':      "Joel and Ellie's journey continues in the post-apocalyptic world. The Emmy-winning HBO series on Max.",
  'House of the Dragon S3': "Fire & Blood. The Targaryen civil war reaches its brutal peak. Available on Max.",
  'Andor S2':               "The most gripping Star Wars story ever told. Diego Luna returns in the epic conclusion on Disney+.",
  'Fallout S2':             "The post-nuclear wasteland expands in season 2 of Amazon's smash hit. On Prime Video.",
  'The Boys S5':            "The final season of the brutal superhero satire. Prime Video's most watched show ever.",
};

function openStreamModal(idx) {
  const s = STREAMING[idx];
  if (!s) return;
  const poster = $('stream-detail-poster');
  if (poster) {
    poster.className = 'stream-detail-poster ' + (s.grad || 'article-bg-grad-2');
    poster.style.cssText = s.img ? 'background-image:url(' + "'" + s.img + "'" + ');background-size:cover;background-position:center' : '';
  }
  const plat = $('stream-detail-platform');
  if (plat) plat.textContent = s.platform;
  const title = $('stream-detail-title');
  if (title) title.textContent = s.title;
  const meta = $('stream-detail-meta');
  if (meta) meta.innerHTML = '<span>' + s.genre + '</span><span>Streaming Now</span>';
  const desc = $('stream-detail-desc');
  if (desc) desc.textContent = STREAM_DESCS[s.title] || (s.title + ' is now streaming on ' + s.platform + '. A ' + s.genre.toLowerCase() + ' title available to watch right now.');
  const btn = $('stream-detail-btn');
  if (btn) {
    btn.href = PLATFORM_URLS[s.platform] || '#';
    const btnTxt = $('stream-detail-btn-txt');
    if (btnTxt) btnTxt.textContent = 'Watch on ' + s.platform;
  }
  const alsoSec = $('stream-also-on');
  if (alsoSec) alsoSec.classList.add('hidden');
  const bd = $('stream-bd');
  if (bd) bd.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  log('modal', 'Opened stream: ' + s.title);
}

function closeStreamModal() {
  const bd = $('stream-bd');
  if (bd) bd.classList.add('hidden');
  document.body.style.overflow = '';
}

$('btn-close-stream')?.addEventListener('click', closeStreamModal);
$('stream-bd')?.addEventListener('click', e => { if (e.target === $('stream-bd')) closeStreamModal(); });


/* ============================================================
   DEV PANEL
   ============================================================ */
$('dev-handle').addEventListener('click', toggleDev);
$('dev-handle').addEventListener('keydown', e => { if(e.key==='Enter'||e.key===' ') toggleDev(); });
function toggleDev() {
  const open = !$('dev-body').classList.contains('hidden');
  $('dev-body').classList.toggle('hidden', open);
  $('dev-chevron').style.transform = open ? '' : 'rotate(180deg)';
  $('dev-handle').setAttribute('aria-expanded', !open);
  if(!open) devRefresh();
}
$$('.dev-tab-btn').forEach(b => b.addEventListener('click', () => {
  $$('.dev-tab-btn').forEach(x=>x.classList.remove('active')); b.classList.add('active');
  $$('.dev-panel-tab').forEach(x=>x.classList.remove('active'));
  $('dev-p-'+b.dataset.dev).classList.add('active');
  if(b.dataset.dev==='state') devRefresh();
  if(b.dataset.dev==='cache') devRefreshCache();
  if(b.dataset.dev==='events') devRefreshEvents();
}));
function devRefresh() {
  const el = $('dev-state-json'); if(!el) return;
  el.textContent = JSON.stringify({theme:STATE.theme,activeRegion:STATE.activeRegion,activeTab:STATE.activeTab,activeSort:STATE.activeSort,activeCategory:STATE.activeCategory,viewMode:STATE.viewMode,feedPage:STATE.feedPage,isLoggedIn:STATE.isLoggedIn,bookmarksCount:STATE.bookmarks.length,filterGenre:STATE.filterGenre,latency:STATE.latency,errorRate:STATE.errorRate},null,2);
}
function devRefreshCache() {
  const el = $('dev-cache-list'); if(!el) return;
  const entries = Object.entries(STATE.queryCache);
  if(!entries.length) { el.innerHTML='<div style="color:var(--text-3);font-size:.78rem;padding:8px">No cache entries yet.</div>'; return; }
  el.innerHTML = entries.map(([k,v]) => `<div style="display:flex;align-items:center;gap:8px;padding:6px 8px;background:var(--bg-e);border-radius:4px;font-size:.72rem;font-family:monospace;margin-bottom:4px"><span style="flex:1;color:var(--text-2)">${k}</span><span style="color:${v.status==='fresh'?'var(--green)':v.status==='fetching'?'var(--blue)':'var(--red)'}">&#9679; ${v.status}</span></div>`).join('');
}
function devRefreshEvents() {
  const el = $('dev-event-log'); if(!el) return;
  const filter = document.querySelector('.dev-filter.active')?.dataset.ef||'all';
  const evts = filter==='all' ? STATE.eventLog : STATE.eventLog.filter(e=>e.type===filter);
  if(!evts.length) { el.innerHTML='<div style="color:var(--text-3);font-size:.74rem;padding:4px">No events yet.</div>'; return; }
  el.innerHTML = evts.slice(0,50).map(e => `<div style="display:flex;gap:7px;padding:4px 6px;background:var(--bg-e);border-radius:3px;margin-bottom:3px;font-size:.71rem"><span style="color:var(--text-3)">${e.time}</span><span style="padding:1px 6px;border-radius:3px;font-weight:700;background:${e.type==='nav'?'rgba(59,130,246,.15)':e.type==='bookmark'?'rgba(229,9,20,.15)':e.type==='region'?'rgba(34,197,94,.15)':'rgba(234,179,8,.15)'};color:${e.type==='nav'?'#3b82f6':e.type==='bookmark'?'var(--red)':e.type==='region'?'var(--green)':'#d97706'}">${e.type}</span><span style="color:var(--text-2)">${e.msg}</span></div>`).join('');
}
$$('.dev-filter').forEach(f => f.addEventListener('click', () => { $$('.dev-filter').forEach(x=>x.classList.remove('active')); f.classList.add('active'); devRefreshEvents(); }));
$('btn-clear-events').addEventListener('click', () => { STATE.eventLog=[]; devRefreshEvents(); });
$('btn-reset-state').addEventListener('click', () => { if(!confirm('Reset all state?')) return; ['cw_theme','cw_region','cw_followed','cw_bookmarks','cw_poll','cw_nread','cw_auth','cw_user','cw_wl','cw_sch'].forEach(k=>localStorage.removeItem(k)); location.reload(); });
$$('.dev-net-btn[data-lat]').forEach(b => b.addEventListener('click', () => { $$('.dev-net-btn[data-lat]').forEach(x=>x.classList.remove('active')); b.classList.add('active'); STATE.latency=+b.dataset.lat; toast('Latency: '+b.textContent,'info'); }));
$('err-rate').addEventListener('input', e => { STATE.errorRate=+e.target.value; $('err-rate-val').textContent=STATE.errorRate+'%'; });
$('sim-loading').addEventListener('click', () => renderSkel());
$('sim-empty').addEventListener('click',   () => renderEmpty());
$('sim-error').addEventListener('click',   () => renderErr());
$('sim-success').addEventListener('click', () => loadFeed());
$('sim-login').addEventListener('click',   () => doLogin('Dev Admin','dev@cinewire.com','DevConsole'));
$('sim-logout').addEventListener('click',  () => $('btn-signout').click());

/* ============================================================
   INIT
   ============================================================ */
function init() {
  applyTheme(STATE.theme);

  // ── Auto dark mode after 8pm ──
  (function autoDarkMode() {
    const hour = new Date().getHours();
    // Only auto-switch if user hasn't manually set a preference this session
    if (!sessionStorage.getItem('cw_theme_manual')) {
      const shouldBeDark = hour >= 20 || hour < 6;
      const currentIsDark = STATE.theme === 'dark';
      if (shouldBeDark && !currentIsDark) {
        applyTheme('dark');
        toast('🌙 Switched to dark mode for evening reading', 'info');
      } else if (!shouldBeDark && currentIsDark && localStorage.getItem('cw_theme') === null) {
        // Only auto-switch to light if user never explicitly chose dark
        applyTheme('light');
      }
    }
    // Check every 15 minutes
    setInterval(() => {
      const h = new Date().getHours();
      const manual = sessionStorage.getItem('cw_theme_manual');
      if (!manual) {
        const dark = h >= 20 || h < 6;
        if (dark && STATE.theme !== 'dark') applyTheme('dark');
        else if (!dark && STATE.theme === 'dark' && !localStorage.getItem('cw_theme')) applyTheme('light');
      }
    }, 15 * 60 * 1000);
  })();
  syncUI();

  // ── Breaking News Banner ──
  const banner = $('breaking-banner');
  const dismissed = sessionStorage.getItem('cw_banner_dismissed');
  if (banner && !dismissed) {
    document.body.classList.add('has-banner');
    const bannerH = banner.offsetHeight || 36;
    document.documentElement.style.setProperty('--banner-h', bannerH + 'px');
  } else if (banner) {
    banner.classList.add('dismissed');
  }
  $('breaking-banner-close')?.addEventListener('click', () => {
    $('breaking-banner').classList.add('dismissed');
    document.body.classList.remove('has-banner');
    document.documentElement.style.setProperty('--banner-h', '0px');
    sessionStorage.setItem('cw_banner_dismissed', '1');
  });

  // Hide dev panel in production
  if(location.hostname !== 'localhost' && !location.search.includes('debug=true')) {
    const devPanel = $('dev-panel');
    if(devPanel) devPanel.style.display = 'none';
  }

  // Restore session from API if token exists
  if(getToken() && !STATE.isLoggedIn) {
    API.getMe().then(res => {
      STATE.isLoggedIn = true;
      STATE.user = res.data;
      save(); syncUI();
      // Load bookmarks from API
      return API.getBookmarks();
    }).then(res => {
      // Merge server bookmarks with local ones (server wins)
      const serverIds = res.data.map(a => a.id);
      const localOnly = STATE.bookmarks.filter(id => !serverIds.includes(id));
      STATE.bookmarks = [...new Set([...serverIds, ...localOnly])];
      // Push any local-only bookmarks to server
      localOnly.forEach(id => API.saveBookmark(id).catch(()=>{}));
      save(); syncUI(); refreshBkDrawer();
    }).catch(() => clearToken());
  }

  buildTrending();
  buildCategoryChips();
  buildHero();
  loadFeed();
  buildStreaming();
  renderNotifs();
  document.body.classList.add('page-enter');
  log('nav','App init');
  // Register Service Worker for PWA
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
      .then(r => log('nav', 'PWA ready'))
      .catch(e => log('nav', 'SW error: ' + e));
  }
  // Dismiss loading screen
  setTimeout(()=>{const ldr=$('app-loader');if(ldr){ldr.classList.add('done');setTimeout(()=>ldr.remove(),400);}},1300);
}

/* ── URL routing ── */
window.addEventListener('popstate', e => {
  if (e.state?.articleId) {
    openArticle(e.state.articleId);
  } else if (!$('article-bd').classList.contains('hidden')) {
    closeArticle();
  }
});
// Open article if page loaded with /article/ID URL
(function() {
  const m = location.pathname.match(/^\/article\/([^/]+)/);
  if (m) setTimeout(() => openArticle(m[1]), 600);
})();

/* ── Pull to Refresh ── */
(function(){
  let ptrStart=0,ptrActive=false;
  document.addEventListener('touchstart',e=>{if(window.scrollY===0)ptrStart=e.touches[0].clientY;else ptrStart=0;},{passive:true});
  document.addEventListener('touchmove',e=>{if(!ptrStart)return;const dy=e.touches[0].clientY-ptrStart;if(dy>70&&window.scrollY===0){ptrActive=true;$('ptr-indicator')?.classList.add('active');}},{passive:true});
  document.addEventListener('touchend',()=>{if(ptrActive){loadFeed();toast('Feed refreshed','success');}ptrActive=false;ptrStart=0;$('ptr-indicator')?.classList.remove('active');});
})();

init();
