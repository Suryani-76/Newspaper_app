'use strict';
require('dotenv').config();
const fetch = require('node-fetch');

const BASE   = 'https://content.guardianapis.com';
const KEY    = process.env.GUARDIAN_API_KEY;
const ON     = !!(KEY && KEY !== 'your_guardian_key_here');

// In-memory cache — same pattern as tmdb.js
const cache  = new Map();
const TTL    = 10 * 60 * 1000; // 10 minutes

async function guardianFetch(path, params = {}) {
  const url = new URL(BASE + path);
  url.searchParams.set('api-key', KEY);
  url.searchParams.set('show-fields', 'headline,trailText,thumbnail,bodyText,byline,wordcount,shortUrl');
  url.searchParams.set('page-size', params.pageSize || 20);
  if (params.page)    url.searchParams.set('page', params.page);
  if (params.q)       url.searchParams.set('q', params.q);
  if (params.section) url.searchParams.set('section', params.section);
  if (params.tag)     url.searchParams.set('tag', params.tag);
  if (params.orderBy) url.searchParams.set('order-by', params.orderBy);

  const res = await fetch(url.toString(), {
    headers: { 'Accept': 'application/json' },
  });
  if (!res.ok) throw new Error(`Guardian API error: ${res.status} ${res.statusText}`);
  const json = await res.json();
  return json.response;
}

// Determine article category from Guardian tags/section
function getCategory(item) {
  const tags = (item.tags || []).map(t => t.id.toLowerCase()).join(' ');
  const section = (item.sectionId || '').toLowerCase();
  if (tags.includes('awards') || tags.includes('oscars') || tags.includes('bafta')) return 'Awards';
  if (tags.includes('festival') || tags.includes('cannes') || tags.includes('tiff') || tags.includes('venice')) return 'Festival';
  if (tags.includes('box-office') || tags.includes('box office')) return 'Box Office';
  if (tags.includes('animation') || tags.includes('anime')) return 'Animation';
  if (tags.includes('horror')) return 'Horror';
  if (tags.includes('sci-fi') || tags.includes('science-fiction')) return 'Sci-Fi';
  if (tags.includes('thriller')) return 'Thriller';
  if (tags.includes('action')) return 'Action';
  if (tags.includes('drama')) return 'Drama';
  if (tags.includes('comedy')) return 'Comedy';
  if (tags.includes('review')) return 'Reviews';
  if (section === 'film') return 'Cinema';
  return 'Film';
}

// Determine badge from content
function getBadge(item) {
  const title = (item.webTitle || '').toLowerCase();
  const tags  = (item.tags || []).map(t => t.id).join(' ').toLowerCase();
  if (tags.includes('breaking') || title.includes('breaking')) return 'BREAKING';
  if (tags.includes('exclusive') || title.includes('exclusive')) return 'EXCLUSIVE';
  if (tags.includes('review')) return 'REVIEW';
  // Published in last 2 hours = BREAKING
  const age = Date.now() - new Date(item.webPublicationDate).getTime();
  if (age < 2 * 60 * 60 * 1000) return 'BREAKING';
  return null;
}

// Determine which feed tab this article belongs to
function getTab(item) {
  const cat = getCategory(item).toLowerCase();
  if (cat === 'box office') return 'boxoffice';
  if (cat === 'reviews') return 'reviews';
  const tags = (item.tags || []).map(t => t.id).join(' ').toLowerCase();
  if (tags.includes('review')) return 'reviews';
  if (tags.includes('box-office')) return 'boxoffice';
  return 'latest';
}

// Pick a gradient based on category
const GRAD_MAP = {
  'Awards':    'article-bg-grad-1',
  'Festival':  'article-bg-grad-2',
  'Box Office':'article-bg-grad-3',
  'Animation': 'article-bg-grad-3',
  'Horror':    'article-bg-grad-1',
  'Sci-Fi':    'article-bg-grad-2',
  'Thriller':  'article-bg-grad-4',
  'Action':    'article-bg-grad-5',
  'Drama':     'article-bg-grad-6',
  'Comedy':    'article-bg-grad-3',
  'Reviews':   'article-bg-grad-4',
};

// Convert Guardian article to CineWire Article shape
function guardianToArticle(item) {
  const f = item.fields || {};
  const category = getCategory(item);
  const grad = GRAD_MAP[category] || 'article-bg-grad-2';

  // Build body paragraphs from bodyText
  let body = [];
  if (f.bodyText) {
    // Split into paragraphs, take first 6, clean HTML tags
    const paras = f.bodyText
      .replace(/<[^>]+>/g, '')
      .split(/\n+/)
      .map(p => p.trim())
      .filter(p => p.length > 40)
      .slice(0, 6);
    body = paras;
  }
  if (body.length === 0) {
    body = [f.trailText || item.webTitle || 'Read the full story on The Guardian.'];
  }

  // Estimate read time
  const wordCount = parseInt(f.wordcount) || body.join(' ').split(' ').length;
  const readTimeMins = Math.max(2, Math.min(12, Math.round(wordCount / 200)));

  return {
    id:            `guardian-${item.id.replace(/\//g, '-')}`,
    guardianId:    item.id,
    region:        'GL',
    category,
    badge:         getBadge(item),
    tab:           getTab(item),
    criticScore:   0,
    audienceScore: 0,
    readTimeMins,
    trailerUrl:    false,
    img:           f.thumbnail || 'https://picsum.photos/id/1067/1400/700',
    title:         f.headline || item.webTitle,
    dek:           f.trailText || f.headline || item.webTitle,
    body,
    author: {
      name:   f.byline || 'The Guardian',
      avatar: f.byline ? f.byline[0].toUpperCase() : 'G',
      bio:    `${f.byline || 'Guardian'} — ${item.sectionName || 'Film'}`,
    },
    publishedAt:  item.webPublicationDate,
    sourceUrl:    item.webUrl,
    grad,
    gallery:      [],
    tags:         (item.tags || []).map(t => t.webTitle).filter(Boolean).slice(0, 6),
    streamingOn:  [],
    relatedMovies:[],
    cast:         [],
    reactions: {
      like:  0, fire: 0, wow: 0, love: 0,
    },
    comments: 0,
  };
}

// ── Public API ──

async function cached(key, fn) {
  const hit = cache.get(key);
  if (hit && Date.now() - hit.ts < TTL) return hit.data;
  const data = await fn();
  cache.set(key, { data, ts: Date.now() });
  return data;
}

// Latest film news
async function getLatestNews(page = 1) {
  const data = await guardianFetch('/search', {
    section:   'film',
    orderBy:   'newest',
    page,
    pageSize:  20,
  });
  return {
    results: (data.results || []).map(guardianToArticle),
    total:   data.total || 0,
    pages:   data.pages || 1,
    page:    data.currentPage || page,
  };
}

// Trending (most viewed in film section — Guardian doesn't have trending, so use newest with high engagement proxy)
async function getTrendingNews() {
  const data = await guardianFetch('/search', {
    section:  'film',
    orderBy:  'relevance',
    pageSize: 20,
    q:        'film cinema movie review',
  });
  return (data.results || []).map(guardianToArticle);
}

// Reviews
async function getReviews(page = 1) {
  const data = await guardianFetch('/search', {
    section:  'film',
    tag:      'film/film+tone/reviews',
    orderBy:  'newest',
    page,
    pageSize: 20,
  });
  return {
    results: (data.results || []).map(g => ({ ...guardianToArticle(g), tab: 'reviews' })),
    total:   data.total || 0,
  };
}

// Box office
async function getBoxOffice(page = 1) {
  const data = await guardianFetch('/search', {
    section:  'film',
    q:        'box office',
    orderBy:  'newest',
    page,
    pageSize: 10,
  });
  return (data.results || []).map(g => ({ ...guardianToArticle(g), tab: 'boxoffice' }));
}

// Search
async function searchNews(query, page = 1) {
  const data = await guardianFetch('/search', {
    section:  'film',
    q:        query,
    orderBy:  'relevance',
    page,
    pageSize: 20,
  });
  return (data.results || []).map(guardianToArticle);
}

// Single article
async function getArticle(guardianId) {
  // guardianId was stored as 'guardian-film-title-slug', reverse to path
  const path = '/' + guardianId.replace(/^guardian-/, '').replace(/-/g, '/');
  try {
    const data = await guardianFetch(path, { pageSize: 1 });
    if (data.content) return guardianToArticle(data.content);
  } catch {}
  // Fallback: search by the slug words
  const words = guardianId.replace(/^guardian-/, '').replace(/-/g, ' ').slice(0, 60);
  const results = await searchNews(words, 1);
  return results[0] || null;
}

module.exports = { ON, getLatestNews, getTrendingNews, getReviews, getBoxOffice, searchNews, getArticle, cached, guardianToArticle };
