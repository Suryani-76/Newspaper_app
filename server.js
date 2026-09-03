'use strict';
require('dotenv').config();
const express      = require('express');
const cors         = require('cors');
const bcrypt       = require('bcryptjs');
const jwt          = require('jsonwebtoken');
const rateLimit    = require('express-rate-limit');
const multer       = require('multer');
const path         = require('path');
const fs           = require('fs');
const { stmt, db } = require('./db');
const tmdb         = require('./tmdb');
const guardian     = require('./guardian');

/* ── Security: hard-fail on missing JWT secret in production ── */
const IS_PROD = process.env.NODE_ENV === 'production';
if (IS_PROD && !process.env.JWT_SECRET) {
  console.error('FATAL: JWT_SECRET environment variable is required in production.');
  process.exit(1);
}
const SECRET = process.env.JWT_SECRET || 'cinewire_dev_secret_2026';
if (!process.env.JWT_SECRET) {
  console.warn('⚠️  WARNING: JWT_SECRET not set in .env — using insecure dev fallback. Never deploy this to production.');
}

const TMDB_ON = !!(process.env.TMDB_API_KEY && !process.env.TMDB_API_KEY.includes('placeholder'));

const app = express();

/* ── CORS: locked to known origins ── */
const ALLOWED = (process.env.ALLOWED_ORIGINS || 'http://localhost:3001,http://localhost:3000')
  .split(',').map(s => s.trim());

app.use(cors({
  origin: (origin, cb) => {
    // Allow requests with no origin (curl, mobile apps, same-origin)
    if (!origin || ALLOWED.includes(origin)) return cb(null, true);
    cb(new Error(`CORS: origin ${origin} not allowed`));
  },
  credentials: true,
}));

app.use(express.json({ limit: '50kb' }));
app.use(express.static('.'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

/* ── Rate limiters ── */
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,
  message: { error: 'Too many requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

const searchLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 30,
  message: { error: 'Search rate limit exceeded, slow down.' },
  standardHeaders: true,
  legacyHeaders: false,
});

const reactionLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
  message: { error: 'Too many requests.' },
  standardHeaders: true,
  legacyHeaders: false,
});

/* ── File Upload Config ── */
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename:    (req, file, cb) => {
    const safe = file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_');
    cb(null, Date.now() + '_' + safe);
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
  fileFilter: (req, file, cb) => {
    const allowed = ['.pdf', '.jpg', '.jpeg', '.png'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.includes(ext)) cb(null, true);
    else cb(new Error('Only PDF, JPG, PNG files allowed'));
  },
});

const appLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  message: { error: 'Too many applications submitted. Please try again later.' },
});

/* ── Client-side routing ── */
app.get('/article/*', (req, res) => {
  res.sendFile(require('path').resolve(__dirname, 'index.html'));
});

/* ── Local fallback data ── */
const LOCAL_ARTICLES = [
  {id:'gl-1',region:'GL',category:'Festival',badge:'BREAKING',tab:'latest',criticScore:92,audienceScore:87,readTimeMins:5,trailerUrl:false,img:'https://picsum.photos/id/1067/1400/700',title:"Cannes 2026: Palm d'Or Nominations Officially Revealed",dek:"The 80th Cannes Film Festival unveils its most diverse competition roster in decades.",body:["The committee for the 80th Cannes Film Festival has officially unveiled the Palm d'Or competition selection for 2026.","<blockquote>We are looking for films that shake our foundations.</blockquote>"],author:{name:'Elena Rostova',avatar:'E'},publishedAt:'2026-07-28T08:00:00Z',tags:['Cannes','Festival','2026'],streamingOn:['Mubi'],reactions:{like:2840,fire:1320,wow:640,love:980},comments:2},
  {id:'gl-2',region:'GL',category:'Box Office',badge:'EXCLUSIVE',tab:'boxoffice',criticScore:78,audienceScore:88,readTimeMins:4,trailerUrl:false,img:'https://picsum.photos/id/2/1400/700',title:'Global Box Office Smashes Records: $12 Billion Summer Season',dek:'Theater chains worldwide celebrate a massive resurgence.',body:['The global box office crossed $12 billion this summer.','<blockquote>People want the communal experience that only cinema provides.</blockquote>'],author:{name:'Marcus Vane',avatar:'M'},publishedAt:'2026-07-27T14:00:00Z',tags:['Box Office','Industry'],streamingOn:['Prime Video'],reactions:{like:1840,fire:920,wow:430,love:620},comments:1},
  {id:'jp-1',region:'JP',category:'Anime',badge:'BREAKING',tab:'latest',criticScore:96,audienceScore:98,readTimeMins:4,trailerUrl:false,img:'https://picsum.photos/id/1016/1400/700',title:"Studio Ghibli Confirms New Hand-Drawn Feature: Miyazaki Begins Production",dek:"Hayao Miyazaki has commenced storyboarding on a brand-new feature.",body:["Studio Ghibli confirmed that Hayao Miyazaki has officially commenced storyboarding.","<blockquote>Miyazaki cannot stop creating.</blockquote>"],author:{name:'Hiroshi Sato',avatar:'H'},publishedAt:'2026-07-28T06:00:00Z',tags:['Ghibli','Miyazaki','Animation'],streamingOn:['Netflix'],reactions:{like:8420,fire:6200,wow:3400,love:7100},comments:1},
  {id:'us-1',region:'US',category:'Awards',badge:'EXCLUSIVE',tab:'latest',criticScore:88,audienceScore:84,readTimeMins:6,trailerUrl:false,img:'https://picsum.photos/id/1074/1400/700',title:"Oscars 2027: Inside the Best Picture Race",dek:"The 99th Academy Awards is shaping up to be the most unpredictable in years.",body:["Hollywood insiders are projecting frontrunners for the 99th Academy Awards.","<blockquote>This is the most open race I've covered in 18 years.</blockquote>"],author:{name:'Clayton Davis',avatar:'C'},publishedAt:'2026-07-28T07:00:00Z',tags:['Oscars','Awards'],streamingOn:['Netflix'],reactions:{like:3840,fire:2100,wow:780,love:1640},comments:1},
  {id:'kr-1',region:'KR',category:'Production',badge:'EXCLUSIVE',tab:'latest',criticScore:0,audienceScore:0,readTimeMins:5,trailerUrl:false,img:'https://picsum.photos/id/1060/1400/700',title:"Bong Joon-ho Begins Casting Sci-Fi Thriller with Song Kang-ho",dek:"The Parasite director reunites with his favourite collaborator.",body:["Bong Joon-ho has officially entered pre-production.","<blockquote>The underground is the new above.</blockquote>"],author:{name:'Kim Min-soo',avatar:'K'},publishedAt:'2026-07-28T05:00:00Z',tags:['Bong Joon-ho','Korea','Sci-Fi'],streamingOn:['Netflix'],reactions:{like:5600,fire:4100,wow:1600,love:3300},comments:1},
  {id:'gb-1',region:'GB',category:'Casting',badge:'EXCLUSIVE',tab:'latest',criticScore:0,audienceScore:0,readTimeMins:4,trailerUrl:false,img:'https://picsum.photos/id/20/1400/700',title:"Bond 26: Final Screen Tests Underway",dek:"Sources inside Pinewood confirm the producer team has shortlisted three British actors.",body:["EON Productions has narrowed the field to three British actors.","<blockquote>This is perhaps the most consequential casting decision in franchise cinema history.</blockquote>"],author:{name:'Simon Thompson',avatar:'S'},publishedAt:'2026-07-28T08:30:00Z',tags:['James Bond','007','UK'],streamingOn:['Prime Video'],reactions:{like:4100,fire:2200,wow:900,love:1600},comments:1},
];

function genId() { return Math.random().toString(36).slice(2,10) + Date.now().toString(36); }

/* ── Auth middleware ── */
function auth(req, res, next) {
  const token = (req.headers.authorization || '').replace('Bearer ', '').trim();
  if (!token) return res.status(401).json({ error: 'No token provided' });
  try {
    jwt.verify(token, SECRET);
    const session = stmt.getSession.get(token);
    if (!session) return res.status(401).json({ error: 'Session expired, please sign in again' });
    req.user  = stmt.getUserByEmail.get(session.email);
    req.email = session.email;
    req.token = token;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
}

/* ── Optional auth (attach user if token present, don't block if not) ── */
function optionalAuth(req, res, next) {
  const token = (req.headers.authorization || '').replace('Bearer ', '').trim();
  if (!token) return next();
  try {
    jwt.verify(token, SECRET);
    const session = stmt.getSession.get(token);
    if (session) {
      req.user  = stmt.getUserByEmail.get(session.email);
      req.email = session.email;
    }
  } catch { /* ignore */ }
  next();
}

/* ─────────────────────────────────────────────
   NEWS ROUTES
───────────────────────────────────────────── */

app.get('/api/news/trending', async (req, res) => {
  if (guardian.ON) {
    try {
      const data = await guardian.cached('guardian_trending', guardian.getTrendingNews);
      return res.json({ success:true, source:'guardian', count:data.length, data });
    } catch(e) {
      console.error('Guardian trending:', e.message);
    }
  }
  if (!TMDB_ON) {
    const sorted = [...LOCAL_ARTICLES].sort((a,b)=>(b.reactions.like+b.reactions.fire)-(a.reactions.like+a.reactions.fire));
    return res.json({ success:true, source:'local', count:sorted.length, data:sorted });
  }
  try {
    const data = await tmdb.cached('trending', tmdb.getTrending);
    res.json({ success:true, source:'tmdb', count:data.length, data });
  } catch(e) {
    console.error('TMDB trending:', e.message);
    res.json({ success:true, source:'local_fallback', count:LOCAL_ARTICLES.length, data:LOCAL_ARTICLES });
  }
});

app.get('/api/news/latest', async (req, res) => {
  const page   = parseInt(req.query.page) || 1;
  const region = (req.query.region || 'GL').toUpperCase();

  // Guardian takes priority — real film news with full article bodies
  if (guardian.ON) {
    try {
      const r = await guardian.cached(`latest_p${page}`, () => guardian.getLatestNews(page));
      return res.json({ success:true, source:'guardian', count:r.results.length, total:r.total, page, data:r.results });
    } catch(e) {
      console.error('Guardian latest:', e.message);
      // fall through to TMDB/local
    }
  }

  if (!TMDB_ON) {
    let pool = region === 'GL'
      ? LOCAL_ARTICLES
      : LOCAL_ARTICLES.filter(a => a.region === region || a.region === 'GL');
    const start = (page - 1) * 6;
    const data  = pool.slice(start, start + 6);
    return res.json({ success:true, source:'local', count:data.length, total:pool.length, page, data });
  }
  try {
    const r = await tmdb.cached(`latest_p${page}`, () => tmdb.getLatest(page));
    res.json({ success:true, source:'tmdb', count:r.results.length, total:r.total, page, data:r.results });
  } catch(e) {
    console.error('TMDB latest:', e.message);
    res.json({ success:true, source:'local_fallback', count:LOCAL_ARTICLES.length, total:LOCAL_ARTICLES.length, page:1, data:LOCAL_ARTICLES });
  }
});

// Guardian-powered reviews feed
app.get('/api/news/reviews', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  if (guardian.ON) {
    try {
      const r = await guardian.cached(`reviews_p${page}`, () => guardian.getReviews(page));
      return res.json({ success:true, source:'guardian', count:r.results.length, total:r.total, page, data:r.results });
    } catch(e) { console.error('Guardian reviews:', e.message); }
  }
  res.json({ success:true, source:'local', count:0, data:[] });
});

// Guardian-powered box office feed
app.get('/api/news/boxoffice', async (req, res) => {
  if (guardian.ON) {
    try {
      const data = await guardian.cached('boxoffice', guardian.getBoxOffice);
      return res.json({ success:true, source:'guardian', count:data.length, data });
    } catch(e) { console.error('Guardian boxoffice:', e.message); }
  }
  res.json({ success:true, source:'local', count:0, data:[] });
});

// Industry → TMDB language codes for regional Indian cinema
const INDUSTRY_LANG_CODES = {
  'te': ['telugu','tollywood'],
  'ta': ['tamil','kollywood'],
  'ml': ['malayalam','mollywood'],
  'kn': ['kannada','sandalwood'],
  'hi': ['hindi','bollywood'],
};

app.get('/api/news/category/:category', async (req, res) => {
  const { category } = req.params;
  const page = parseInt(req.query.page) || 1;
  const lang = req.query.lang || null;

  // 1. TMDB language discovery (best for regional Indian cinemas)
  if (lang && TMDB_ON) {
    try {
      const data = await tmdb.cached(`lang_${lang}_${page}`, async () => {
        const fetch = require('node-fetch');
        const url = `https://api.themoviedb.org/3/discover/movie?with_original_language=${lang}&sort_by=popularity.desc&page=${page}`;
        const r = await fetch(url, {
          headers: { 'Authorization': `Bearer ${process.env.TMDB_API_KEY}`, 'accept': 'application/json' }
        });
        if (!r.ok) throw new Error(`TMDB discover error: ${r.status}`);
        const d = await r.json();
        return (d.results || []).map(m => tmdb.movieToArticle(m, 'latest'));
      });
      if (data && data.length > 0) {
        return res.json({ success:true, source:'tmdb_lang', category, lang, count:data.length, data });
      }
    } catch(e) {
      console.error('TMDB lang discover:', e.message);
      // Try TMDB search as fallback
      try {
        const searchData = await tmdb.cached(`tmdb_search_${category}_${page}`, () => tmdb.searchMovies(category, page));
        if (searchData && searchData.length > 0) {
          return res.json({ success:true, source:'tmdb_search', category, count:searchData.length, data:searchData });
        }
      } catch(e2) {
        console.error('TMDB search fallback:', e2.message);
      }
    }
  }

  // 2. Guardian search (for Hollywood, K-Cinema, British, Japanese)
  if (guardian.ON) {
    try {
      const data = await guardian.cached(`gcat_${category}_${page}`, () => guardian.searchNews(category, page));
      if (data && data.length > 0) {
        return res.json({ success:true, source:'guardian', category, count:data.length, data });
      }
    } catch(e) {
      console.error('Guardian category:', e.message);
    }
  }

  // 3. TMDB keyword search fallback
  if (TMDB_ON) {
    try {
      const data = await tmdb.cached(`cat_${category}_${page}`, () => tmdb.getCategory(category, page));
      if (data && data.length > 0) {
        return res.json({ success:true, source:'tmdb', category, count:data.length, data });
      }
    } catch(e) {
      console.error('TMDB category:', e.message);
    }
  }

  // 4. Local fallback
  const cat = category.toLowerCase();
  const filtered = LOCAL_ARTICLES.filter(a =>
    a.category.toLowerCase()===cat || a.tags.some(t=>t.toLowerCase()===cat)
  );
  res.json({ success:true, source:'local', category, count:filtered.length, data: filtered.length ? filtered : LOCAL_ARTICLES });
});

app.get('/api/news/search', searchLimiter, async (req, res) => {
  const q = (req.query.q || '').trim().slice(0, 200);
  if (!q) return res.json({ success:true, query:'', count:0, data:[] });

  if (guardian.ON) {
    try {
      const data = await guardian.cached(`gsearch_${q}`, () => guardian.searchNews(q));
      return res.json({ success:true, source:'guardian', query:q, count:data.length, data });
    } catch(e) {
      console.error('Guardian search:', e.message);
    }
  }
  if (!TMDB_ON) {
    const ql   = q.toLowerCase();
    const data = LOCAL_ARTICLES.filter(a =>
      a.title.toLowerCase().includes(ql) ||
      a.dek.toLowerCase().includes(ql)   ||
      a.tags.some(t => t.toLowerCase().includes(ql))
    );
    return res.json({ success:true, source:'local', query:q, count:data.length, data });
  }
  try {
    const data = await tmdb.cached(`search_${q}`, () => tmdb.searchMovies(q));
    res.json({ success:true, source:'tmdb', query:q, count:data.length, data });
  } catch(e) {
    console.error('TMDB search:', e.message);
    res.json({ success:true, source:'local_fallback', query:q, count:0, data:[] });
  }
});

app.get('/api/news/:id', async (req, res) => {
  const { id } = req.params;

  // Guardian article lookup
  if (id.startsWith('guardian-') && guardian.ON) {
    try {
      const article = await guardian.cached(`gart_${id}`, () => guardian.getArticle(id));
      if (article) return res.json({ success:true, source:'guardian', data:article });
    } catch(e) {
      console.error('Guardian article:', e.message);
    }
  }

  if (id.startsWith('tmdb-') && TMDB_ON) {
    try {
      const tmdbId  = id.replace('tmdb-', '');
      const article = await tmdb.cached(`art_${tmdbId}`, () => tmdb.getDetails(tmdbId));
      return res.json({ success:true, source:'tmdb', data:article });
    } catch(e) {
      console.error('TMDB article:', e.message);
      return res.status(502).json({ error:'Could not fetch article details' });
    }
  }
  const local = LOCAL_ARTICLES.find(a => a.id === id);
  if (local) return res.json({ success:true, source:'local', data:local });
  res.status(404).json({ error:'Article not found' });
});

/* ─────────────────────────────────────────────
   APPLICATION ROUTES (Reporter / Studio)
───────────────────────────────────────────── */

// Submit application (reporter or studio)
app.post('/api/apply', appLimiter, upload.single('document'), async (req, res) => {
  const {
    type, name, email, phone,
    portfolio, company_name, company_reg,
    website, industries, message,
  } = req.body;

  if (!type || !name || !email)
    return res.status(400).json({ error: 'Name, email and application type are required' });
  if (!['reporter', 'studio'].includes(type))
    return res.status(400).json({ error: 'Invalid application type' });
  if (typeof email !== 'string' || !email.includes('@'))
    return res.status(400).json({ error: 'Invalid email address' });

  // Check for duplicate pending application
  const existing = stmt.getApplicationByEmail.get(email.toLowerCase());
  if (existing && existing.status === 'pending')
    return res.status(409).json({ error: 'You already have a pending application. Please wait for review.' });

  const id = genId();
  const docFilename = req.file ? req.file.filename : null;
  const docPath     = req.file ? '/uploads/' + req.file.filename : null;

  stmt.createApplication.run(
    id, type,
    name.slice(0, 100),
    email.toLowerCase(),
    phone || null,
    portfolio || null,
    company_name || null,
    company_reg || null,
    website || null,
    industries || '[]',
    message ? message.slice(0, 1000) : null,
    docFilename,
    docPath,
  );

  console.log(`📋 New ${type} application from ${name} <${email}>`);
  res.status(201).json({
    success: true,
    message: 'Application submitted successfully! We will review it within 2-3 business days.',
    applicationId: id,
  });
});

// Get application status by email (public)
app.get('/api/apply/status', async (req, res) => {
  const email = (req.query.email || '').toLowerCase();
  if (!email) return res.status(400).json({ error: 'Email required' });
  const app = stmt.getApplicationByEmail.get(email);
  if (!app) return res.status(404).json({ error: 'No application found for this email' });
  res.json({ success: true, data: { status: app.status, type: app.type, created_at: app.created_at, review_note: app.review_note } });
});

// ── ADMIN: list all applications ──
app.get('/api/admin/applications', auth, (req, res) => {
  if (!req.user || req.user.role !== 'admin')
    return res.status(403).json({ error: 'Admin access required' });
  const apps = stmt.getApplications.all();
  res.json({ success: true, count: apps.length, data: apps });
});

// ── ADMIN: approve or reject application ──
app.put('/api/admin/applications/:id', auth, async (req, res) => {
  if (!req.user || req.user.role !== 'admin')
    return res.status(403).json({ error: 'Admin access required' });

  const { status, review_note } = req.body;
  if (!['approved', 'rejected'].includes(status))
    return res.status(400).json({ error: 'Status must be approved or rejected' });

  const application = stmt.getApplicationById.get(req.params.id);
  if (!application) return res.status(404).json({ error: 'Application not found' });

  stmt.updateApplicationStatus.run(status, req.email, review_note || '', req.params.id);

  // If approved, update user role in users table
  if (status === 'approved') {
    const role = application.type === 'reporter' ? 'reporter' : 'studio';
    // Find user by email and update role
    const user = stmt.getUserByEmail.get(application.email);
    if (user) {
      db.prepare(`UPDATE users SET role=? WHERE email=?`).run(role, application.email);
    }
    console.log(`✅ ${application.type} application approved: ${application.name} <${application.email}>`);
  }

  res.json({ success: true, message: `Application ${status}`, applicationId: req.params.id });
});

/* ─────────────────────────────────────────────
   AUTH ROUTES  (rate-limited)
───────────────────────────────────────────── */

app.post('/api/auth/register', authLimiter, async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ error:'Name, email and password required' });
  if (typeof email !== 'string' || !email.includes('@'))
    return res.status(400).json({ error:'Invalid email address' });
  if (typeof password !== 'string' || password.length < 6)
    return res.status(400).json({ error:'Password must be at least 6 characters' });
  if (stmt.getUserByEmail.get(email))
    return res.status(409).json({ error:'Email already registered' });

  const hashed = await bcrypt.hash(password, 10);
  const id     = genId();
  stmt.createUser.run(id, name.slice(0,100), email.toLowerCase(), hashed, name[0].toUpperCase());
  stmt.upsertPrefs.run(email.toLowerCase(), 'en', 'GL', '[]', 1);

  const token = jwt.sign({ id, email: email.toLowerCase(), ts: Date.now() }, SECRET, { expiresIn:'30d' });
  try { stmt.createSession.run(token, id, email.toLowerCase()); }
  catch(e) { if (e.code !== 'SQLITE_CONSTRAINT_PRIMARYKEY') throw e; }

  res.status(201).json({ success:true, message:'Account created', token,
    user:{ id, name: name.slice(0,100), email: email.toLowerCase(), avatar: name[0].toUpperCase() } });
});

app.post('/api/auth/login', authLimiter, async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error:'Email and password required' });

  const user = stmt.getUserByEmail.get(email.toLowerCase());

  // FIXED: no more auto-create. Unknown email = 401.
  if (!user)
    return res.status(401).json({ error:'Invalid email or password' });

  // Verify password against stored bcrypt hash
  const valid = await bcrypt.compare(password, user.password);
  if (!valid)
    return res.status(401).json({ error:'Invalid email or password' });

  const token = jwt.sign({ id:user.id, email:user.email, ts: Date.now() }, SECRET, { expiresIn:'30d' });
  try { stmt.createSession.run(token, user.id, user.email); }
  catch(e) { if (e.code !== 'SQLITE_CONSTRAINT_PRIMARYKEY') throw e; }

  res.json({ success:true, message:'Signed in', token,
    user:{ id:user.id, name:user.name, email:user.email, avatar:user.avatar } });
});

app.get('/api/auth/me', auth, (req, res) => {
  const { id, name, email, avatar, created_at } = req.user;
  res.json({ success:true, data:{ id, name, email, avatar, createdAt:created_at } });
});

app.post('/api/auth/logout', auth, (req, res) => {
  stmt.deleteSession.run(req.token);
  res.json({ success:true, message:'Logged out' });
});

/* ─────────────────────────────────────────────
   PREFERENCES
───────────────────────────────────────────── */

app.get('/api/preferences', auth, (req, res) => {
  let p = stmt.getPrefs.get(req.email);
  if (!p) { stmt.upsertPrefs.run(req.email,'en','GL','[]',1); p = stmt.getPrefs.get(req.email); }
  res.json({ success:true, data:{ ...p, categories:JSON.parse(p.categories||'[]') } });
});

app.put('/api/preferences', auth, (req, res) => {
  const cur = stmt.getPrefs.get(req.email) || { language:'en', region:'GL', categories:'[]', notifications:1 };
  const language      = req.body.language      ?? cur.language;
  const region        = req.body.region        ?? cur.region;
  const categories    = req.body.categories    ?? JSON.parse(cur.categories||'[]');
  const notifications = req.body.notifications ?? cur.notifications;
  stmt.upsertPrefs.run(req.email, language, region, JSON.stringify(categories), notifications ? 1 : 0);
  res.json({ success:true, message:'Preferences updated',
    data:{ language, region, categories, notifications:!!notifications } });
});

/* ─────────────────────────────────────────────
   BOOKMARKS
───────────────────────────────────────────── */

app.get('/api/bookmarks', auth, async (req, res) => {
  const rows = stmt.getBookmarks.all(req.email);
  if (!rows.length) return res.json({ success:true, count:0, data:[] });
  const articles = await Promise.all(rows.map(async r => {
    if (r.article_id.startsWith('tmdb-') && TMDB_ON) {
      const tid = r.article_id.replace('tmdb-','');
      return tmdb.cached(`art_${tid}`, ()=>tmdb.getDetails(tid)).catch(()=>null);
    }
    return LOCAL_ARTICLES.find(a => a.id === r.article_id) || null;
  }));
  res.json({ success:true, count:articles.filter(Boolean).length, data:articles.filter(Boolean) });
});

app.post('/api/bookmarks/:id', auth, (req, res) => {
  stmt.addBookmark.run(req.email, req.params.id);
  res.status(201).json({ success:true, message:'Article saved', articleId:req.params.id });
});

app.delete('/api/bookmarks/:id', auth, (req, res) => {
  stmt.removeBookmark.run(req.email, req.params.id);
  res.json({ success:true, message:'Bookmark removed', articleId:req.params.id });
});

/* ─────────────────────────────────────────────
   REACTIONS  (now actually persisted)
───────────────────────────────────────────── */

// GET /api/reactions/:articleId — returns counts + current user's reactions
app.get('/api/reactions/:articleId', optionalAuth, (req, res) => {
  const counts = stmt.getReactions.all(req.params.articleId);
  const totals = { like:0, fire:0, wow:0, love:0 };
  counts.forEach(r => { totals[r.type] = r.count; });
  const mine = req.email
    ? stmt.getUserReactions.all(req.params.articleId, req.email).map(r => r.type)
    : [];
  res.json({ success:true, data:{ counts:totals, mine } });
});

// POST /api/reactions/:articleId  body: { type: 'like'|'fire'|'wow'|'love' }
app.post('/api/reactions/:articleId', reactionLimiter, auth, (req, res) => {
  const { type } = req.body;
  const valid = ['like','fire','wow','love'];
  if (!valid.includes(type))
    return res.status(400).json({ error:`type must be one of: ${valid.join(', ')}` });

  // Toggle: if already reacted, remove it; otherwise add it
  const existing = stmt.getUserReactions.all(req.params.articleId, req.email).map(r => r.type);
  if (existing.includes(type)) {
    stmt.deleteReaction.run(req.params.articleId, req.email, type);
  } else {
    stmt.upsertReaction.run(req.params.articleId, req.email, type);
  }

  const counts = stmt.getReactions.all(req.params.articleId);
  const totals = { like:0, fire:0, wow:0, love:0 };
  counts.forEach(r => { totals[r.type] = r.count; });
  const mine = stmt.getUserReactions.all(req.params.articleId, req.email).map(r => r.type);

  res.json({ success:true, data:{ counts:totals, mine } });
});

/* ─────────────────────────────────────────────
   COMMENTS  (now persisted to SQLite)
───────────────────────────────────────────── */

// GET /api/comments/:articleId
app.get('/api/comments/:articleId', (req, res) => {
  const rows = stmt.getComments.all(req.params.articleId);
  res.json({ success:true, count:rows.length, data:rows });
});

// POST /api/comments/:articleId  — requires auth
app.post('/api/comments/:articleId', reactionLimiter, auth, (req, res) => {
  const body = (req.body.body || '').trim().slice(0, 1000);
  if (!body) return res.status(400).json({ error:'Comment body is required' });

  const id = stmt.addComment.run(
    req.params.articleId,
    req.email,
    req.user.name,
    req.user.avatar || req.user.name[0].toUpperCase(),
    body
  ).lastInsertRowid;

  const comment = stmt.getComments.all(req.params.articleId).find(c => c.id === Number(id));
  res.status(201).json({ success:true, data:comment });
});

// DELETE /api/comments/:id — only owner can delete
app.delete('/api/comments/:id', auth, (req, res) => {
  const result = stmt.deleteComment.run(Number(req.params.id), req.email);
  if (result.changes === 0)
    return res.status(404).json({ error:'Comment not found or not yours' });
  res.json({ success:true, message:'Comment deleted' });
});

/* ─────────────────────────────────────────────
   START
───────────────────────────────────────────── */
const PORT = parseInt(process.env.PORT) || 3001;
app.listen(PORT, () => {
  console.log(`\n🎬 CineWire API — http://localhost:${PORT}`);
  console.log(`📡 TMDB: ${TMDB_ON ? '🎥 live' : '📦 fallback'}  |  Guardian: ${guardian.ON ? '📰 live' : '🔒 key not set'}`);
  console.log(`💾 Database: SQLite (cinewire.db)`);
  console.log(`🔐 Auth: JWT + bcrypt  |  CORS: ${ALLOWED.join(', ')}`);
  console.log(`🚦 Rate limiting: auth 20/15min, search 30/min, reactions 60/min\n`);
  const routes = [
    'GET  /api/news/trending', 'GET  /api/news/latest?page&region',
    'GET  /api/news/category/:cat', 'GET  /api/news/search?q',
    'GET  /api/news/:id',
    'POST /api/auth/register  [rate-limited]',
    'POST /api/auth/login     [rate-limited]',
    'POST /api/auth/logout    [auth]',
    'GET  /api/auth/me        [auth]',
    'GET  /api/preferences    [auth]', 'PUT  /api/preferences    [auth]',
    'GET  /api/bookmarks      [auth]', 'POST /api/bookmarks/:id  [auth]', 'DELETE /api/bookmarks/:id [auth]',
    'GET  /api/reactions/:id  [optional-auth]',
    'POST /api/reactions/:id  [auth, rate-limited]',
    'GET  /api/comments/:id',
    'POST /api/comments/:id   [auth, rate-limited]',
    'DELETE /api/comments/:id [auth]',
  ];
  routes.forEach(r => console.log(' ', r));
});
