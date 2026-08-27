'use strict';
const fetch = require('node-fetch');
require('dotenv').config();

const TMDB_BASE  = 'https://api.themoviedb.org/3';
const TMDB_IMG   = 'https://image.tmdb.org/t/p/w1280';
const TMDB_TOKEN = process.env.TMDB_API_KEY;

const CATEGORY_MAP = {
  'action':    28,
  'comedy':    35,
  'drama':     18,
  'horror':    27,
  'sci-fi':    878,
  'thriller':  53,
  'romance':   10749,
  'animation': 16,
  'fantasy':   14,
  'crime':     80,
  'mystery':   9648,
};

async function tmdbFetch(path, params = {}) {
  const url = new URL(TMDB_BASE + path);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  const res = await fetch(url.toString(), {
    headers: {
      'Authorization': `Bearer ${TMDB_TOKEN}`,
      'accept': 'application/json',
    },
  });
  if (!res.ok) throw new Error(`TMDB error: ${res.status}`);
  return res.json();
}

// Convert TMDB movie to CineWire article format
function movieToArticle(movie, tab = 'latest') {
  const img = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
    : movie.poster_path
      ? `https://image.tmdb.org/t/p/w780${movie.poster_path}`
      : 'https://picsum.photos/id/1067/1400/700';

  const genres = movie.genre_ids || [];
  const category = genres.includes(28) ? 'Action'
    : genres.includes(27) ? 'Horror'
    : genres.includes(878) ? 'Sci-Fi'
    : genres.includes(18) ? 'Drama'
    : genres.includes(53) ? 'Thriller'
    : genres.includes(35) ? 'Comedy'
    : genres.includes(16) ? 'Animation'
    : genres.includes(14) ? 'Fantasy'
    : genres.includes(80) ? 'Crime'
    : genres.includes(9648) ? 'Mystery'
    : genres.includes(10749) ? 'Romance'
    : 'Movies';

  const score = Math.round((movie.vote_average || 0) * 10);
  const popularity = movie.popularity || 0;

  return {
    id: `tmdb-${movie.id}`,
    region: 'GL',
    category,
    badge: movie.vote_average >= 8.5 ? 'TOP RATED'
      : movie.vote_average >= 7.5 ? 'ACCLAIMED'
      : (movie.release_date?.startsWith('2025') || movie.release_date?.startsWith('2026')) ? 'NEW'
      : null,
    tab,
    criticScore: score,
    audienceScore: score,
    readTimeMins: Math.max(3, Math.min(8, Math.floor(movie.overview?.length / 100) || 4)),
    trailerUrl: false,
    img,
    title: movie.title || movie.name || 'Untitled',
    dek: movie.overview?.slice(0, 150) + (movie.overview?.length > 150 ? '…' : '') || 'No description available.',
    body: [
      movie.overview || 'No details available.',
      movie.tagline ? `<blockquote>${movie.tagline}</blockquote>` : `<blockquote>Rated ${movie.vote_average?.toFixed(1) || 'N/A'}/10 by ${movie.vote_count?.toLocaleString() || 0} audience members worldwide.</blockquote>`,
      `Released: ${movie.release_date || 'TBA'} · Original language: ${movie.original_language?.toUpperCase() || 'N/A'} · Popularity score: ${Math.round(movie.popularity || 0).toLocaleString()}`,
    ],
    author: { name: 'CineWire Staff', avatar: 'C' },
    publishedAt: movie.release_date ? new Date(movie.release_date).toISOString() : new Date().toISOString(),
    tags: [category, 'Movies', movie.release_date?.slice(0,4)].filter(Boolean),
    streamingOn: [],
    reactions: {
      like:  Math.floor(popularity * 10),
      fire:  Math.floor(popularity * 5),
      wow:   Math.floor(popularity * 3),
      love:  Math.floor(popularity * 4),
    },
    comments: 0,
    tmdbId: movie.id,
  };
}

// ── API functions ──

async function getTrending() {
  const data = await tmdbFetch('/trending/movie/week');
  return data.results.slice(0, 20).map(m => movieToArticle(m, 'trending'));
}

async function getLatest(page = 1) {
  const data = await tmdbFetch('/movie/now_playing', { page, language: 'en-US' });
  return {
    results: data.results.map(m => movieToArticle(m, 'latest')),
    total: data.total_results,
    pages: data.total_pages,
  };
}

async function getByCategory(category, page = 1) {
  const genreId = CATEGORY_MAP[category.toLowerCase()];
  if (!genreId) {
    const data = await tmdbFetch('/search/movie', { query: category, page });
    return data.results.map(m => movieToArticle(m, 'latest'));
  }
  const data = await tmdbFetch('/discover/movie', {
    with_genres: genreId,
    sort_by: 'popularity.desc',
    page,
  });
  return data.results.map(m => movieToArticle(m, 'latest'));
}

async function searchMovies(query, page = 1) {
  const data = await tmdbFetch('/search/multi', { query, page, include_adult: false });
  const movies = data.results.filter(r => r.media_type === 'movie' || r.media_type === 'tv');
  return movies.map(m => movieToArticle(m, 'latest'));
}

async function getMovieDetails(tmdbId) {
  const [movie, credits, videos] = await Promise.all([
    tmdbFetch(`/movie/${tmdbId}`, { append_to_response: 'credits,videos' }),
    tmdbFetch(`/movie/${tmdbId}/credits`).catch(() => ({ cast: [] })),
    tmdbFetch(`/movie/${tmdbId}/videos`).catch(() => ({ results: [] })),
  ]);

  const article = movieToArticle(movie, 'latest');
  article.img = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
    : article.img;

  // Add cast
  article.cast = (movie.credits?.cast || credits.cast || []).slice(0, 8).map(c => ({
    name: c.name,
    role: c.character,
    grad: 'article-bg-grad-1',
    img: c.profile_path ? `https://image.tmdb.org/t/p/w185${c.profile_path}` : null,
  }));

  // Add trailer
  const trailer = (movie.videos?.results || videos.results || []).find(v => v.type === 'Trailer' && v.site === 'YouTube');
  if (trailer) {
    article.trailerUrl = `https://www.youtube.com/watch?v=${trailer.key}`;
    article.trailerKey = trailer.key;
  }

  // Better body
  article.body = [
    movie.overview,
    movie.tagline ? `<blockquote>${movie.tagline}</blockquote>` : null,
    `Released: ${movie.release_date || 'TBA'} · Runtime: ${movie.runtime || 'N/A'} min · Rating: ${movie.vote_average?.toFixed(1)}/10`,
    movie.genres ? `Genres: ${movie.genres.map(g => g.name).join(', ')}` : null,
  ].filter(Boolean);

  article.streamingOn = [];
  article.tags = [
    ...(movie.genres || []).map(g => g.name),
    movie.release_date?.slice(0,4),
    'Movies',
  ].filter(Boolean);

  return article;
}

// Simple in-memory cache to avoid hammering TMDB
const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

async function cached(key, fn) {
  const hit = cache.get(key);
  if (hit && Date.now() - hit.ts < CACHE_TTL) return hit.data;
  const data = await fn();
  cache.set(key, { data, ts: Date.now() });
  return data;
}

// Aliases used by server.js
const getCategory = getByCategory;
const getDetails  = getMovieDetails;

module.exports = { getTrending, getLatest, getByCategory, getCategory, searchMovies, getMovieDetails, getDetails, cached, movieToArticle, toArticle: movieToArticle };
