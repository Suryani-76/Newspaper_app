/* ============================================================
   CineWire — Translation System
   Multi-language support for the CineWire website
   ============================================================ */
'use strict';

/* ============================================================
   TRANSLATIONS OBJECT
   ============================================================ */
const TRANSLATIONS = {
  en: {
    // Header
    home: 'Home',
    trending: 'Trending',
    reviews: 'Reviews',
    upcoming: 'Upcoming',
    boxOffice: 'Box Office',
    genres: 'Genres',
    awards: 'Awards',
    streaming: 'Streaming',
    searchPlaceholder: 'Search CineWire...',
    notifications: 'Notifications',
    signIn: 'Sign In',
    signOut: 'Sign Out',

    // Tabs
    latest: 'Latest',
    longReads: 'Long Reads',
    editorials: 'Editorials',

    // Filters
    newest: 'Newest',
    popular: 'Most Popular',
    discussed: 'Most Discussed',
    editorsPicks: "Editor's Picks",

    // Actions
    loadMore: 'Load More',
    readFullStory: 'Read Full Story',
    watchTrailer: 'Watch Trailer',
    share: 'Share',
    copyLink: 'Copy Link',

    // Bookmarks
    saved: 'Saved',
    savedArticles: 'Saved Articles',
    clearAll: 'Clear All',
    all: 'All',

    // Article
    minRead: 'min read',
    comments: 'Comments',
    discussion: 'Discussion',
    postComment: 'Post',
    cancel: 'Cancel',
    shareYourThoughts: 'Share your thoughts...',

    // Newsletter
    newsletterTitle: 'Never Miss a Frame',
    newsletterDesc: "Get the week's best cinema news every Friday.",
    subscribeFree: 'Subscribe Free',
    emailPlaceholder: 'your@email.com',
    subscribed: 'Subscribed! Check your inbox.',

    // Streaming
    whereToWatch: 'Where to Watch',
    streamingDesc: 'New releases streaming right now',

    // Footer
    company: 'Company',
    about: 'About',
    careers: 'Careers',
    press: 'Press',
    explore: 'Explore',
    legal: 'Legal',
    privacy: 'Privacy',
    terms: 'Terms',
    cookies: 'Cookies',
    connect: 'Connect',
    newsletter: 'Newsletter',
    contact: 'Contact',
    tagline: "The world's cinema, in your hands.",
    copyright: 'CineWire Global Media',

    // Empty states
    noArticles: 'No articles found',
    tryDifferent: 'Try a different filter or region.',
    clearFilters: 'Clear Filters',
    errorLoading: 'Could not load articles',
    checkConnection: 'Check your connection or try again.',
    retry: 'Retry',

    // Region
    selectRegion: 'Select Region',
    yourRegions: 'Your Regions',
    allCountries: 'All Countries',
    apply: 'Apply',

    // Auth
    continueWith: 'Continue with',
    or: 'or',
    email: 'Email',
    password: 'Password',
    continueAsGuest: 'Continue as Guest',
    myProfile: 'My Profile',
    myWatchlist: 'My Watchlist',
    preferences: 'Preferences',
  },

  es: {
    // Header
    home: 'Inicio',
    trending: 'Tendencias',
    reviews: 'Reseñas',
    upcoming: 'Próximamente',
    boxOffice: 'Taquilla',
    genres: 'Géneros',
    awards: 'Premios',
    streaming: 'Streaming',
    searchPlaceholder: 'Buscar en CineWire...',
    notifications: 'Notificaciones',
    signIn: 'Iniciar Sesión',
    signOut: 'Cerrar Sesión',

    // Tabs
    latest: 'Últimas',
    longReads: 'Lectura Larga',
    editorials: 'Editoriales',

    // Filters
    newest: 'Más Recientes',
    popular: 'Más Populares',
    discussed: 'Más Comentadas',
    editorsPicks: 'Selección del Editor',

    // Actions
    loadMore: 'Cargar Más',
    readFullStory: 'Leer Historia Completa',
    watchTrailer: 'Ver Tráiler',
    share: 'Compartir',
    copyLink: 'Copiar Enlace',

    // Bookmarks
    saved: 'Guardado',
    savedArticles: 'Artículos Guardados',
    clearAll: 'Limpiar Todo',
    all: 'Todos',

    // Article
    minRead: 'min de lectura',
    comments: 'Comentarios',
    discussion: 'Discusión',
    postComment: 'Publicar',
    cancel: 'Cancelar',
    shareYourThoughts: 'Comparte tus pensamientos...',

    // Newsletter
    newsletterTitle: 'Nunca Te Pierdas Nada',
    newsletterDesc: 'Recibe las mejores noticias de cine cada viernes.',
    subscribeFree: 'Suscríbete Gratis',
    emailPlaceholder: 'tu@email.com',
    subscribed: '¡Suscrito! Revisa tu bandeja.',

    // Streaming
    whereToWatch: 'Dónde Ver',
    streamingDesc: 'Nuevos lanzamientos en streaming ahora',

    // Footer
    company: 'Compañía',
    about: 'Acerca de',
    careers: 'Carreras',
    press: 'Prensa',
    explore: 'Explorar',
    legal: 'Legal',
    privacy: 'Privacidad',
    terms: 'Términos',
    cookies: 'Cookies',
    connect: 'Conectar',
    newsletter: 'Boletín',
    contact: 'Contacto',
    tagline: 'El cine del mundo, en tus manos.',
    copyright: 'CineWire Global Media',

    // Empty states
    noArticles: 'No se encontraron artículos',
    tryDifferent: 'Prueba con un filtro o región diferente.',
    clearFilters: 'Limpiar Filtros',
    errorLoading: 'No se pudieron cargar los artículos',
    checkConnection: 'Verifica tu conexión e intenta de nuevo.',
    retry: 'Reintentar',

    // Region
    selectRegion: 'Seleccionar Región',
    yourRegions: 'Tus Regiones',
    allCountries: 'Todos los Países',
    apply: 'Aplicar',

    // Auth
    continueWith: 'Continuar con',
    or: 'o',
    email: 'Correo',
    password: 'Contraseña',
    continueAsGuest: 'Continuar como Invitado',
    myProfile: 'Mi Perfil',
    myWatchlist: 'Mi Lista',
    preferences: 'Preferencias',
  },

  ja: {
    // Header
    home: 'ホーム',
    trending: 'トレンド',
    reviews: 'レビュー',
    upcoming: '近日公開',
    boxOffice: '興行収入',
    genres: 'ジャンル',
    awards: '賞',
    streaming: '配信',
    searchPlaceholder: 'CineWireを検索...',
    notifications: '通知',
    signIn: 'サインイン',
    signOut: 'サインアウト',

    // Tabs
    latest: '最新',
    longReads: '長文記事',
    editorials: '論説',

    // Filters
    newest: '最新',
    popular: '人気',
    discussed: '話題',
    editorsPicks: '編集者のおすすめ',

    // Actions
    loadMore: 'もっと読む',
    readFullStory: '全文を読む',
    watchTrailer: '予告編を見る',
    share: '共有',
    copyLink: 'リンクをコピー',

    // Bookmarks
    saved: '保存済み',
    savedArticles: '保存した記事',
    clearAll: 'すべてクリア',
    all: 'すべて',

    // Article
    minRead: '分で読める',
    comments: 'コメント',
    discussion: 'ディスカッション',
    postComment: '投稿',
    cancel: 'キャンセル',
    shareYourThoughts: 'あなたの考えを共有...',

    // Newsletter
    newsletterTitle: '最新情報をお届け',
    newsletterDesc: '毎週金曜日に映画ニュースをお届けします。',
    subscribeFree: '無料購読',
    emailPlaceholder: 'メールアドレス',
    subscribed: '購読完了！受信箱を確認してください。',

    // Streaming
    whereToWatch: '視聴可能',
    streamingDesc: '現在配信中の新作',

    // Footer
    company: '会社',
    about: '概要',
    careers: '採用',
    press: 'プレス',
    explore: '探索',
    legal: '法的情報',
    privacy: 'プライバシー',
    terms: '利用規約',
    cookies: 'Cookie',
    connect: '接続',
    newsletter: 'ニュースレター',
    contact: 'お問い合わせ',
    tagline: '世界の映画を、あなたの手の中に。',
    copyright: 'CineWire Global Media',

    // Empty states
    noArticles: '記事が見つかりません',
    tryDifferent: '別のフィルターまたは地域をお試しください。',
    clearFilters: 'フィルターをクリア',
    errorLoading: '記事を読み込めませんでした',
    checkConnection: '接続を確認して再試行してください。',
    retry: '再試行',

    // Region
    selectRegion: '地域を選択',
    yourRegions: 'あなたの地域',
    allCountries: 'すべての国',
    apply: '適用',

    // Auth
    continueWith: 'で続ける',
    or: 'または',
    email: 'メール',
    password: 'パスワード',
    continueAsGuest: 'ゲストとして続ける',
    myProfile: 'マイプロフィール',
    myWatchlist: 'マイリスト',
    preferences: '設定',
  },

  ko: {
    // Header
    home: '홈',
    trending: '트렌딩',
    reviews: '리뷰',
    upcoming: '개봉 예정',
    boxOffice: '박스오피스',
    genres: '장르',
    awards: '시상식',
    streaming: '스트리밍',
    searchPlaceholder: 'CineWire 검색...',
    notifications: '알림',
    signIn: '로그인',
    signOut: '로그아웃',

    // Tabs
    latest: '최신',
    longReads: '장문 기사',
    editorials: '사설',

    // Filters
    newest: '최신순',
    popular: '인기순',
    discussed: '토론 많은순',
    editorsPicks: '편집자 추천',

    // Actions
    loadMore: '더보기',
    readFullStory: '전체 기사 읽기',
    watchTrailer: '예고편 보기',
    share: '공유',
    copyLink: '링크 복사',

    // Bookmarks
    saved: '저장됨',
    savedArticles: '저장한 기사',
    clearAll: '모두 지우기',
    all: '전체',

    // Article
    minRead: '분 소요',
    comments: '댓글',
    discussion: '토론',
    postComment: '게시',
    cancel: '취소',
    shareYourThoughts: '생각을 공유하세요...',

    // Newsletter
    newsletterTitle: '최신 소식 받기',
    newsletterDesc: '매주 금요일 영화 뉴스를 받아보세요.',
    subscribeFree: '무료 구독',
    emailPlaceholder: '이메일 주소',
    subscribed: '구독 완료! 받은편지함을 확인하세요.',

    // Streaming
    whereToWatch: '시청하기',
    streamingDesc: '지금 스트리밍 중인 신작',

    // Footer
    company: '회사',
    about: '소개',
    careers: '채용',
    press: '언론',
    explore: '탐색',
    legal: '법적 고지',
    privacy: '개인정보',
    terms: '이용약관',
    cookies: '쿠키',
    connect: '연결',
    newsletter: '뉴스레터',
    contact: '문의',
    tagline: '세계의 영화를 당신 손안에.',
    copyright: 'CineWire Global Media',

    // Empty states
    noArticles: '기사를 찾을 수 없습니다',
    tryDifferent: '다른 필터나 지역을 시도해보세요.',
    clearFilters: '필터 지우기',
    errorLoading: '기사를 불러올 수 없습니다',
    checkConnection: '연결을 확인하고 다시 시도하세요.',
    retry: '다시 시도',

    // Region
    selectRegion: '지역 선택',
    yourRegions: '내 지역',
    allCountries: '모든 국가',
    apply: '적용',

    // Auth
    continueWith: '계속하기',
    or: '또는',
    email: '이메일',
    password: '비밀번호',
    continueAsGuest: '게스트로 계속',
    myProfile: '내 프로필',
    myWatchlist: '내 리스트',
    preferences: '설정',
  },

  fr: {
    // Header
    home: 'Accueil',
    trending: 'Tendances',
    reviews: 'Critiques',
    upcoming: 'À venir',
    boxOffice: 'Box-office',
    genres: 'Genres',
    awards: 'Récompenses',
    streaming: 'Streaming',
    searchPlaceholder: 'Rechercher CineWire...',
    notifications: 'Notifications',
    signIn: 'Se connecter',
    signOut: 'Se déconnecter',

    // Tabs
    latest: 'Dernières',
    longReads: 'Lectures longues',
    editorials: 'Éditoriaux',

    // Filters
    newest: 'Plus récents',
    popular: 'Plus populaires',
    discussed: 'Plus discutés',
    editorsPicks: "Choix de l'éditeur",

    // Actions
    loadMore: 'Charger plus',
    readFullStory: "Lire l'article complet",
    watchTrailer: 'Voir la bande-annonce',
    share: 'Partager',
    copyLink: 'Copier le lien',

    // Bookmarks
    saved: 'Enregistré',
    savedArticles: 'Articles enregistrés',
    clearAll: 'Tout effacer',
    all: 'Tous',

    // Article
    minRead: 'min de lecture',
    comments: 'Commentaires',
    discussion: 'Discussion',
    postComment: 'Publier',
    cancel: 'Annuler',
    shareYourThoughts: 'Partagez vos pensées...',

    // Newsletter
    newsletterTitle: 'Ne manquez rien',
    newsletterDesc: 'Recevez les meilleures actualités cinéma chaque vendredi.',
    subscribeFree: 'Abonnement gratuit',
    emailPlaceholder: 'votre@email.com',
    subscribed: 'Abonné ! Vérifiez votre boîte de réception.',

    // Streaming
    whereToWatch: 'Où regarder',
    streamingDesc: 'Nouvelles sorties en streaming maintenant',

    // Footer
    company: 'Entreprise',
    about: 'À propos',
    careers: 'Carrières',
    press: 'Presse',
    explore: 'Explorer',
    legal: 'Légal',
    privacy: 'Confidentialité',
    terms: 'Conditions',
    cookies: 'Cookies',
    connect: 'Connexion',
    newsletter: 'Newsletter',
    contact: 'Contact',
    tagline: 'Le cinéma du monde, dans vos mains.',
    copyright: 'CineWire Global Media',

    // Empty states
    noArticles: 'Aucun article trouvé',
    tryDifferent: 'Essayez un autre filtre ou région.',
    clearFilters: 'Effacer les filtres',
    errorLoading: 'Impossible de charger les articles',
    checkConnection: 'Vérifiez votre connexion et réessayez.',
    retry: 'Réessayer',

    // Region
    selectRegion: 'Sélectionner la région',
    yourRegions: 'Vos régions',
    allCountries: 'Tous les pays',
    apply: 'Appliquer',

    // Auth
    continueWith: 'Continuer avec',
    or: 'ou',
    email: 'Email',
    password: 'Mot de passe',
    continueAsGuest: 'Continuer en tant qu\'invité',
    myProfile: 'Mon profil',
    myWatchlist: 'Ma liste',
    preferences: 'Préférences',
  },
};

/* ============================================================
   TRANSLATION FUNCTIONS
   ============================================================ */

// Current language (loaded from localStorage or defaults to 'en')
let currentLang = localStorage.getItem('cw_lang') || 'en';

// Translation function - retrieves translation for a given key
function t(key) {
  return TRANSLATIONS[currentLang]?.[key] || TRANSLATIONS.en[key] || key;
}

// Change language function
function changeLanguage(lang) {
  if (!TRANSLATIONS[lang]) return;
  currentLang = lang;
  localStorage.setItem('cw_lang', lang);
  document.documentElement.setAttribute('lang', lang);
  translatePage();
  if (typeof log === 'function') log('lang', 'Changed to: ' + lang);
}

// Translate entire page by updating all elements with data-i18n attribute
function translatePage() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const translation = t(key);
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      if (el.placeholder !== undefined) el.placeholder = translation;
    } else {
      el.textContent = translation;
    }
  });

  // Reload dynamic content if functions are available
  if (typeof loadFeed === 'function') loadFeed();
  if (typeof syncUI === 'function') syncUI();
  if (typeof buildTicker === 'function') buildTicker();
  if (typeof buildStreaming === 'function') buildStreaming();
}

/* ============================================================
   INITIALIZATION
   ============================================================ */

// Initialize language system when DOM is ready
(function initializeTranslations() {
  // Set initial language attribute on HTML element
  document.documentElement.setAttribute('lang', currentLang);
  
  // Wait for DOM to be fully loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupLanguageSelector);
  } else {
    setupLanguageSelector();
  }
  
  function setupLanguageSelector() {
    // Connect language selector dropdown
    const langSelect = document.getElementById('lang-select');
    if (langSelect) {
      langSelect.value = currentLang;
      langSelect.addEventListener('change', (e) => {
        changeLanguage(e.target.value);
        if (typeof toast === 'function') {
          toast('Language changed', 'success');
        }
      });
    }
    
    // Apply translations after a brief delay to ensure all elements are loaded
    setTimeout(() => translatePage(), 100);
  }
})();
