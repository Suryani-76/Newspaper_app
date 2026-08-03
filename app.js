// ==========================================================================
// CineWire - Complete Website Script & Caching Simulator
// ==========================================================================

// 1. Countries List
const countries = [
  { name: "United States", code: "US", flag: "🇺🇸" },
  { name: "Japan", code: "JP", flag: "🇯🇵" },
  { name: "South Korea", code: "KR", flag: "🇰🇷" },
  { name: "United Kingdom", code: "GB", flag: "🇬🇧" },
  { name: "India", code: "IN", flag: "🇮🇳" },
  { name: "France", code: "FR", flag: "🇫🇷" },
  { name: "Germany", code: "DE", flag: "🇩🇪" },
  { name: "Spain", code: "ES", flag: "🇪🇸" },
  { name: "Canada", code: "CA", flag: "🇨🇦" },
  { name: "Australia", code: "AU", flag: "🇦🇺" }, // empty state test
  { name: "Brazil", code: "BR", flag: "🇧🇷" },
  { name: "Italy", code: "IT", flag: "🇮🇹" },
  { name: "Mexico", code: "MX", flag: "🇲🇽" },
  { name: "China", code: "CN", flag: "🇨🇳" },
  { name: "Sweden", code: "SE", flag: "🇸🇪" },
  { name: "New Zealand", code: "NZ", flag: "🇳🇿" },
  { name: "Iceland", code: "IS", flag: "🇮🇸" } // empty state test
].sort((a, b) => a.name.localeCompare(b.name));

// 2. Comprehensive News Feed Database (With complete articles & movie details)
const newsArticles = {
  GL: [
    {
      id: "gl-1",
      title: "Cannes Film Festival 2026: Palm d'Or Nominations officially Revealed",
      category: "Festival",
      author: "Elena Rostova",
      avatar: "E",
      time: "2 hours ago",
      readTime: "5 min read",
      bannerClass: "article-bg-grad-1",
      description: "The Cannes Film Festival has announced its official line-up for the 2026 competition. Inside the roster, veteran directors clash with boundary-pushing indie filmmakers.",
      paragraphs: [
        "The committee for the 80th annual Cannes Film Festival has officially unveiled the highly anticipated Palm d'Or competition selection for 2026. This year's lineup stands out as one of the most stylistically diverse in recent memory, bridging the gap between mainstream cinematic masters and radical new voices from emerging film regions.",
        "Highlighting the selection is the returns of several iconic filmmakers alongside a massive surge of female-led directorships, making up nearly 40% of the overall main competition roster. Critics have noted that this year's themes focus heavily on ecological anxieties, AI-human philosophy, and speculative historical fiction.",
        "Jury President Greta Gerwig remarked during the press release: 'We are looking for films that shake our foundations. Cinema is meant to confront, soothe, and expand. This year's candidates do exactly that, pushing the technical boundaries of what is possible on screen.'"
      ],
      movie: {
        title: "Specters of Tomorrow",
        rating: "8.4",
        genre: "Sci-Fi / Drama",
        synopsis: "An emotional thriller following three climatologists stationed at the edge of the world who make a discovery that shifts the course of human history.",
        director: "Sophia Coppola",
        cast: "Florence Pugh, Timothée Chalamet",
        releaseDate: "November 2026",
        bgClass: "article-bg-grad-1"
      },
      comments: [
        { user: "Cinephile99", text: "Incredibly excited for Coppola's new one. The premise sounds right up her alley.", time: "1 hour ago" },
        { user: "WellesFan", text: "Nice to see Cannes taking indie selections seriously this year.", time: "30 mins ago" }
      ]
    },
    {
      id: "gl-2",
      title: "Box Office: Global Earnings Hit Historic High in Blockbuster Summer Season",
      category: "Box Office",
      author: "Marcus Vane",
      avatar: "M",
      time: "5 hours ago",
      readTime: "4 min read",
      bannerClass: "article-bg-grad-2",
      description: "Global box office numbers have set a historic record this summer, driven by an unprecedented convergence of major franchise sequels and viral social campaigns.",
      paragraphs: [
        "Theater chains worldwide are celebrating a massive resurgence as global box office revenue crossed a historic threshold this month. Industry analysts report that summer ticket receipts exceeded pre-pandemic benchmarks, signaling a complete economic recovery for physical cinema distribution models.",
        "The massive earnings are attributed to a highly coordinated release slate that combined heavy blockbuster sequels with clever viral counter-programming. Moviegoers demonstrated a renewed eagerness for premium formats like IMAX and Dolby Cinema, which accounted for a record 24% of overall theater revenue.",
        "While digital streaming networks continue to lock down mid-budget productions, the spectacular theatrical receipts of this season prove that high-spectacle, communal theater experiences remain unmatched in the global media landscape."
      ],
      movie: {
        title: "Neon Horizon: Legacy",
        rating: "7.9",
        genre: "Action / Sci-Fi",
        synopsis: "In a futuristic megalopolis, a rogue runner searches for his lost sister, uncovering a corporate conspiracy to control the city's resources.",
        director: "Joseph Kosinski",
        cast: "Michael B. Jordan, Ana de Armas",
        releaseDate: "June 2026",
        bgClass: "article-bg-grad-2"
      },
      comments: [
        { user: "PopcornJunkie", text: "The IMAX experience for Neon Horizon was absolutely mind-blowing. Totally deserves the box office records.", time: "4 hours ago" }
      ]
    },
    {
      id: "gl-3",
      title: "TIFF 2026: Toronto Sets Stage for Massive International Film Showcase",
      category: "Festival",
      author: "Sarah Jenkins",
      avatar: "S",
      time: "1 day ago",
      readTime: "3 min read",
      bannerClass: "article-bg-grad-3",
      description: "The Toronto International Film Festival announces its massive 2026 line-up, featuring highly anticipated world premieres and Oscar hopefuls.",
      paragraphs: [
        "The Toronto International Film Festival (TIFF) has laid out its extensive plan for the 2026 festival. Known as the premier launching pad for Fall awards campaigns, TIFF's schedule is stacked with major studio presentations and highly anticipated indie world premieres.",
        "This year, Toronto is placing a special emphasis on international collaborations, showcasing co-productions from over 50 countries. The festival will also host panels focusing on the evolving economics of film financing in the age of streaming syndication."
      ],
      movie: {
        title: "The Quiet Echoes",
        rating: "8.1",
        genre: "Drama / Mystery",
        synopsis: "A musician relocates to an isolated lighthouse in Nova Scotia, only to discover a series of encrypted radio frequencies broadcasting from beneath the ocean.",
        director: "Robert Eggers",
        cast: "Willem Dafoe, Robert Pattinson",
        releaseDate: "December 2026",
        bgClass: "article-bg-grad-3"
      },
      comments: []
    }
  ],
  US: [
    {
      id: "us-1",
      title: "Oscars 2026: Inside the Best Picture Race and Major Contenders",
      category: "Awards",
      author: "Clayton Davis",
      avatar: "C",
      time: "1 hour ago",
      readTime: "6 min read",
      bannerClass: "article-bg-grad-1",
      description: "The race for the 98th Academy Awards is heating up. Early festival favorites are clashing with summer blockbusters as critics pick their top contenders.",
      paragraphs: [
        "With the fall festival season in full swing, Hollywood insiders are actively projecting the frontrunners for the 98th Academy Awards. Unlike previous years where a single film dominated the narrative, the 2026 Best Picture race is shaping up to be a chaotic, multi-faceted clash of genres.",
        "Early critical darlings from Sundance are maintaining substantial momentum, but they face heavy competition from massive summer hits that are lobbying for technical and creative representation. Studio campaign budgets have reached record figures as public relations campaigns shift into overdrive.",
        "Academy voting guidelines, modified early last year to promote transparency, have altered how studios host screenings, resulting in a more democratic field where independent features stand a legitimate chance at walking away with the night's top honors."
      ],
      movie: {
        title: "Anatomy of a Whisper",
        rating: "8.5",
        genre: "Drama / Biography",
        synopsis: "The untold story of a deaf mathematician who cracked an unbreakable wartime cipher, only to have their contributions classified for decades.",
        director: "Denis Villeneuve",
        cast: "Saoirse Ronan, Benedict Cumberbatch",
        releaseDate: "November 2026",
        bgClass: "article-bg-grad-1"
      },
      comments: [
        { user: "OscarNerd", text: "Saoirse Ronan is absolutely locking in her Best Actress nomination for this. Brilliant performance.", time: "30 mins ago" }
      ]
    },
    {
      id: "us-2",
      title: "Denis Villeneuve Confirms Dune: Messiah Script is Officially Complete",
      category: "Production",
      author: "Justin Kroll",
      avatar: "J",
      time: "8 hours ago",
      readTime: "3 min read",
      bannerClass: "article-bg-grad-2",
      description: "The acclaimed director has confirmed that the screenplay for the third installment of the Dune franchise is complete, aiming for a late 2026 shoot.",
      paragraphs: [
        "Sci-Fi fans have reason to celebrate today as director Denis Villeneuve officially confirmed that the screenplay for 'Dune: Messiah' has been finalized. The film will serve as the epic conclusion to the trilogy adapting Frank Herbert's seminal sci-fi masterpieces.",
        "Villeneuve noted that while 'Messiah' will be shorter in running time compared to Part Two, its thematic scale is considerably darker, focusing on the terrible cost of messianic prophecy and religious fanaticism. Pre-production is currently underway at Warner Bros. Studios."
      ],
      movie: {
        title: "Dune: Messiah",
        rating: "9.1",
        genre: "Sci-Fi / Epic",
        synopsis: "Twelve years after the events of Dune, Paul Atreides faces the violent consequences of his ascension to Emperor of the Known Universe.",
        director: "Denis Villeneuve",
        cast: "Timothée Chalamet, Zendaya, Florence Pugh",
        releaseDate: "December 2027",
        bgClass: "article-bg-grad-2"
      },
      comments: [
        { user: "ArrakisDream", text: "Yes! Can't wait to see how Denis handles the heavy philosophical themes of Messiah. It is a tough book to adapt.", time: "6 hours ago" }
      ]
    }
  ],
  JP: [
    {
      id: "jp-1",
      title: "Studio Ghibli's Next Feature Film Officially Enters Production",
      category: "Anime",
      author: "Hiroshi Sato",
      avatar: "H",
      time: "3 hours ago",
      readTime: "4 min read",
      bannerClass: "article-bg-grad-3",
      description: "Studio Ghibli has confirmed that a new hand-drawn feature film has entered active storyboarding, helmed by legendary animator Hayao Miyazaki.",
      paragraphs: [
        "In a surprise announcement that has thrilled animation enthusiasts worldwide, Studio Ghibli announced that legendary director Hayao Miyazaki has officially commenced storyboarding on a brand-new feature-length animated film.",
        "The project, currently under a strict non-disclosure agreement, is described as a highly personal fantasy adventure that returns to Ghibli's traditional hand-drawn foundations. A team of master animators has been assembled in Tokyo to begin the meticulous frame-by-frame illustration process.",
        "Studio co-founder Toshio Suzuki commented: 'Miyazaki cannot stop creating. As long as he is alive, he will paint stories. This project has a profound, reflective soul that deals with the relationship between youth, legacy, and the natural world.'"
      ],
      movie: {
        title: "The Wind and the Seed",
        rating: "8.9",
        genre: "Animation / Fantasy",
        synopsis: "A young girl in rural post-war Japan discover a secret forest spirit that feeds on the forgotten dreams of village elders.",
        director: "Hayao Miyazaki",
        cast: "Soma Santoki, Hikari Mitsushima",
        releaseDate: "Summer 2028",
        bgClass: "article-bg-grad-3"
      },
      comments: [
        { user: "GhibliStan", text: "Miyazaki retiring is the greatest running joke in cinema history and I am HERE for it! Long live the master.", time: "2 hours ago" },
        { user: "Totoro90", text: "Hand-drawn Ghibli is a gift. Instant masterpiece incoming.", time: "1 hour ago" }
      ]
    },
    {
      id: "jp-2",
      title: "Godzilla Minus One Sequel Confirmed by Toho Executive Board",
      category: "Kaiju",
      author: "Takahiro Mori",
      avatar: "T",
      time: "6 hours ago",
      readTime: "3 min read",
      bannerClass: "article-bg-grad-1",
      description: "Following the historic Oscar win and massive box office success of Minus One, Toho has officially greenlit the next installment.",
      paragraphs: [
        "Toho Studios has officially greenlit a sequel to 'Godzilla Minus One'. The film will feature the return of director Takashi Yamazaki, who will supervise the CGI effects and direct the film.",
        "Yamazaki stated that the next film will explore the lingering radioactive fallout of post-war Tokyo, introducing new existential threats that test the psychological limits of the rebuilding nation."
      ],
      movie: {
        title: "Godzilla: Fall of the Empire",
        rating: "8.2",
        genre: "Kaiju / Sci-Fi / Drama",
        synopsis: "As Japan transitions into the reconstruction era, a mutated marine terror resurges from the Mariana Trench, heading towards Yokohama.",
        director: "Takashi Yamazaki",
        cast: "Ryunosuke Kamiki, Minami Hamabe",
        releaseDate: "Late 2026",
        bgClass: "article-bg-grad-1"
      },
      comments: [
        { user: "GojiraKaiju", text: "Minus One was one of the best films of this decade. This sequel has massive shoes to fill, but Takashi Yamazaki is a genius.", time: "5 hours ago" }
      ]
    }
  ],
  KR: [
    {
      id: "kr-1",
      title: "Bong Joon-ho Begins Casting Next Sci-Fi Thriller Starring Song Kang-ho",
      category: "Production",
      author: "Kim Min-soo",
      avatar: "K",
      time: "45 mins ago",
      readTime: "5 min read",
      bannerClass: "article-bg-grad-2",
      description: "The Parasite director is reuniting with veteran actor Song Kang-ho for a mind-bending adaptation of an acclaimed Korean web novel.",
      paragraphs: [
        "Academy Award-winning director Bong Joon-ho has officially entered pre-production on his next Korean-language feature film. In a move that has generated immense industry excitement, Bong has cast his long-time collaborator and veteran actor Song Kang-ho in the leading role.",
        "The project is described as a high-concept sci-fi social thriller set in a dystopian underground transit colony. Like Bong's previous classics, the film will merge intense social satire with gripping, claustrophobic suspense.",
        "Filming is set to begin in Seoul and Busan in early autumn, with a projected theatrical release scheduled for late next year."
      ],
      movie: {
        title: "The Subterrene Epoch",
        rating: "8.7",
        genre: "Thriller / Sci-Fi / Drama",
        synopsis: "In a subterranean colony shielding humanity from an atmospheric ice age, a logistics inspector uncovers a terrifying secret regarding the community's energy grid.",
        director: "Bong Joon-ho",
        cast: "Song Kang-ho, Bae Doona",
        releaseDate: "September 2027",
        bgClass: "article-bg-grad-2"
      },
      comments: [
        { user: "ParasiteWinner", text: "Bong + Song Kang-ho is the greatest director-actor duo in history. Instant watch.", time: "20 mins ago" }
      ]
    },
    {
      id: "kr-2",
      title: "Squid Game Season 3 Teaser Confirms Late Fall Premiere Window",
      category: "Series",
      author: "Lee Sang-woo",
      avatar: "L",
      time: "3 hours ago",
      readTime: "3 min read",
      bannerClass: "article-bg-grad-4",
      description: "Netflix has released the first official teaser for Squid Game Season 3, showing Gi-hun's return to the arena.",
      paragraphs: [
        "Netflix has sent shockwaves through the streaming landscape by launching the official teaser trailer for the final chapter of Squid Game. Season 3 will follow Gi-hun as he utilizes his fortune to infiltrate and dismantle the game's operating hierarchy.",
        "Creator Hwang Dong-hyuk confirmed this will be the absolute conclusion to the series, resolving the mystery of the Front Man and the global networks financing the death games."
      ],
      movie: {
        title: "Squid Game: The Final Round",
        rating: "8.0",
        genre: "Thriller / Series",
        synopsis: "Gi-hun uses his winnings to wage a high-stakes war against the masked administrators of the deadly survival games.",
        director: "Hwang Dong-hyuk",
        cast: "Lee Jung-jae, Lee Byung-hun",
        releaseDate: "November 2026",
        bgClass: "article-bg-grad-4"
      },
      comments: []
    }
  ],
  IN: [
    {
      id: "in-1",
      title: "SS Rajamouli Details Scale and Visual Preproduction of Epic SSMB29",
      category: "Tollywood",
      author: "Ramesh Bala",
      avatar: "R",
      time: "1 hour ago",
      readTime: "5 min read",
      bannerClass: "article-bg-grad-2",
      description: "Following the global sensation of RRR, director SS Rajamouli has shared stunning updates regarding his upcoming action-adventure with Mahesh Babu.",
      paragraphs: [
        "Renowned filmmaker SS Rajamouli has finally broken silence on his next mammoth cinematic venture, currently codenamed SSMB29. Speaking at a press conference in Hyderabad, Rajamouli shared that the film will be a globetrotting forest adventure in the vein of Indiana Jones, but deeply rooted in Indian mythology.",
        "Mahesh Babu has undergone rigorous physical training in Germany to prepare for the highly athletic role. The visual effects preproduction is being handled by international studios in London and Los Angeles to ensure a visual spectacle that exceeds RRR's benchmarks.",
        "The film is planned as a multi-part franchise, with principal photography slated to begin by the end of the year under a massive budget funded by international co-distributors."
      ],
      movie: {
        title: "SSMB29: Raiders of the Lost Valley",
        rating: "8.6",
        genre: "Action / Adventure",
        synopsis: "A rogue archaeologist goes in search of an ancient, energy-radiating artifact hidden deep within the Amazon forest.",
        director: "SS Rajamouli",
        cast: "Mahesh Babu, Deepika Padukone",
        releaseDate: "December 2027",
        bgClass: "article-bg-grad-2"
      },
      comments: [
        { user: "RajamouliFan", text: "The forest adventure theme with Mahesh Babu sounds absolutely wild. RRR proved Rajamouli can sell anything globally.", time: "40 mins ago" }
      ]
    },
    {
      id: "in-2",
      title: "Shah Rukh Khan Cast in Sujoy Ghosh's Next High-Octane Action Thriller 'King'",
      category: "Bollywood",
      author: "Taran Adarsh",
      avatar: "T",
      time: "4 hours ago",
      readTime: "3 min read",
      bannerClass: "article-bg-grad-4",
      description: "The King of Bollywood is set to team up with his daughter Suhana Khan in a stylish assassin thriller directed by Sujoy Ghosh.",
      paragraphs: [
        "In what is being described as a landmark casting coup, Shah Rukh Khan will star alongside his daughter Suhana Khan in a stylish action thriller titled 'King'. The film is directed by Sujoy Ghosh with action sequences choreographed by Hollywood stunt teams.",
        "SRK plays a veteran contract killer who takes an orphaned girl (Suhana) under his wing to protect her from a global syndicate."
      ],
      movie: {
        title: "King",
        rating: "7.8",
        genre: "Action / Thriller",
        synopsis: "A seasoned assassin is forced out of retirement to protect a young woman targeted by his former employers.",
        director: "Sujoy Ghosh",
        cast: "Shah Rukh Khan, Suhana Khan, Abhishek Bachchan",
        releaseDate: "Eid 2027",
        bgClass: "article-bg-grad-4"
      },
      comments: []
    }
  ],
  GB: [
    {
      id: "gb-1",
      title: "Next James Bond Casting Enters Final Screen-Test Stage in London",
      category: "Casting",
      author: "Simon Thompson",
      avatar: "S",
      time: "2 hours ago",
      readTime: "4 min read",
      bannerClass: "article-bg-grad-1",
      description: "Sources inside Pinewood Studios report that three British actors have entered final screen tests for the iconic role of 007.",
      paragraphs: [
        "The search for the next James Bond is reportedly nearing its conclusion. EON Productions has narrowed the candidate field to three British actors who are currently performing final screen tests in London.",
        "Producers Barbara Broccoli and Michael G. Wilson are seeking a candidate willing to commit to a 10-year, multi-film contract that will reinvent the franchise for the post-Craig era, focusing heavily on espionage realism and younger intelligence networks."
      ],
      movie: {
        title: "Bond 26: Spectre Reborn",
        rating: "8.0",
        genre: "Spy / Action",
        synopsis: "A young agent Bond is assigned to dismantle an underground financial network supplying weapons to rogue states.",
        director: "Christopher Nolan",
        cast: "Aaron Taylor-Johnson (Rumored)",
        releaseDate: "November 2028",
        bgClass: "article-bg-grad-1"
      },
      comments: [
        { user: "Double07", text: "Hope Nolan actually directs. He would make an incredible Bond movie.", time: "1 hour ago" }
      ]
    }
  ],
  FR: [
    {
      id: "fr-1",
      title: "French Cinema Attendance Reaches All-Time High Since Golden Era",
      category: "Industry",
      author: "Chloé Dupont",
      avatar: "C",
      time: "3 hours ago",
      readTime: "3 min read",
      bannerClass: "article-bg-grad-3",
      description: "A surge in high-concept local comedies and experimental dramas has pushed theater ticket sales in France to historic heights.",
      paragraphs: [
        "France's National Center for Cinema (CNC) released a report showing that theater attendance has reached levels not seen since the late 1960s. French moviegoers are actively supporting native-language cinema over imported Hollywood productions.",
        "The boom is fueled by generous government subsidies that allow young directors to execute ambitious scripts without the threat of bankruptcy."
      ],
      movie: {
        title: "Parisian Rhapsody",
        rating: "7.7",
        genre: "Drama / Romance",
        synopsis: "Three artists navigate creative blocks and romance during a hot summer in Paris.",
        director: "Céline Sciamma",
        cast: "Adèle Haenel, Noémie Merlant",
        releaseDate: "October 2026",
        bgClass: "article-bg-grad-3"
      },
      comments: []
    }
  ]
};

// 3. Simulated State Store (Zustand logic using localStorage)
const useRegionStore = {
  state: {
    followedCountries: JSON.parse(localStorage.getItem("cinewire_followed")) || [],
    activeCountry: localStorage.getItem("cinewire_active") || "GL",
    isLoggedIn: JSON.parse(localStorage.getItem("cinewire_logged_in")) || false,
    user: JSON.parse(localStorage.getItem("cinewire_user")) || null
  },
  
  // Actions
  follow: function(code) {
    if (!this.state.followedCountries.includes(code)) {
      this.state.followedCountries.push(code);
      this.sync();
    }
  },
  
  unfollow: function(code) {
    this.state.followedCountries = this.state.followedCountries.filter(c => c !== code);
    // If we unfollowed the active country, fall back to Global
    if (this.state.activeCountry === code) {
      this.state.activeCountry = "GL";
    }
    this.sync();
  },
  
  setActive: function(code) {
    this.state.activeCountry = code;
    this.sync();
  },
  
  login: function(userObj) {
    this.state.isLoggedIn = true;
    this.state.user = userObj;
    this.sync();
  },
  
  logout: function() {
    this.state.isLoggedIn = false;
    this.state.user = null;
    this.sync();
  },
  
  sync: function() {
    localStorage.setItem("cinewire_followed", JSON.stringify(this.state.followedCountries));
    localStorage.setItem("cinewire_active", this.state.activeCountry);
    localStorage.setItem("cinewire_logged_in", JSON.stringify(this.state.isLoggedIn));
    localStorage.setItem("cinewire_user", JSON.stringify(this.state.user));
    
    // Update displays
    updateZustandDashboard();
  }
};

// Bookmarks Database (local persistence)
const bookmarksStore = {
  savedIds: JSON.parse(localStorage.getItem("cinewire_bookmarks")) || [],
  
  toggle: function(id) {
    if (this.savedIds.includes(id)) {
      this.savedIds = this.savedIds.filter(x => x !== id);
    } else {
      this.savedIds.push(id);
    }
    localStorage.setItem("cinewire_bookmarks", JSON.stringify(this.savedIds));
    updateBookmarkBadge();
    renderBookmarksList();
    // Re-render feed cards to sync bookmarks icons
    renderActiveFeedWithoutLoader();
  },
  
  has: function(id) {
    return this.savedIds.includes(id);
  }
};

// React Query Simulator QueryCache
const queryCache = {
  GL: "fresh" // Default GL is already loaded
};

let queryTimeoutId = null;

// Temporary set for onboarding checkboxes
let onboardingChecked = new Set(useRegionStore.state.followedCountries);

// 4. DOM Elements
// Navbar
const activeCountryFlag = document.getElementById("active-country-flag");
const activeCountryName = document.getElementById("active-country-name");
const navCountrySwitcher = document.getElementById("nav-country-switcher");
const btnBookmarksToggle = document.getElementById("btn-bookmarks-toggle");
const btnOnboardingReset = document.getElementById("btn-onboarding-reset");
const bookmarksBadge = document.getElementById("bookmarks-badge");
const globalSearch = document.getElementById("global-search");
const btnGlobalSearchClear = document.getElementById("global-search-clear");
const logoHome = document.getElementById("logo-home");

// Onboarding Modal
const onboardingBackdrop = document.getElementById("onboarding-modal-backdrop");
const onboardingSearchInput = document.getElementById("onboarding-search");
const onboardingSearchClear = document.getElementById("onboarding-search-clear");
const onboardingList = document.getElementById("onboarding-list");
const onboardingGlobalRow = document.getElementById("onboarding-country-global");
const onboardingEmpty = document.getElementById("onboarding-empty");
const btnContinue = document.getElementById("btn-continue");
const linkSkip = document.getElementById("link-skip");

// Feed section
const heroBillboard = document.getElementById("hero-billboard");
const articlesGrid = document.getElementById("articles-grid");
const feedRegionLabel = document.getElementById("feed-region-label");
const feedSkeletons = document.getElementById("feed-skeletons");
const feedEmpty = document.getElementById("feed-empty");
const btnEmptySwitch = document.getElementById("btn-empty-switch");
const emptyStateTitle = document.getElementById("empty-state-title");
const emptyStateMessage = document.getElementById("empty-state-message");
const activeTabIndicator = document.getElementById("feed-active-indicator-bar");

// Bookmarks drawer
const bookmarksDrawer = document.getElementById("bookmarks-drawer");
const btnCloseDrawer = document.getElementById("btn-close-drawer");
const bookmarksList = document.getElementById("bookmarks-list");
const bookmarksEmpty = document.getElementById("bookmarks-empty");

// Switcher modal
const switcherBackdrop = document.getElementById("switcher-modal-backdrop");
const btnCloseSwitcher = document.getElementById("btn-close-switcher");
const switcherSearchInput = document.getElementById("switcher-search");
const switcherSearchClear = document.getElementById("switcher-search-clear");
const switcherFollowedList = document.getElementById("switcher-followed-list");
const switcherAllList = document.getElementById("switcher-all-list");
const btnSwitcherAddRegion = document.getElementById("btn-switcher-add-region");
const switcherCountryGlobal = document.getElementById("switcher-country-global");
const switcherEmpty = document.getElementById("switcher-empty");

// Details Modal
const detailsBackdrop = document.getElementById("details-modal-backdrop");
const btnCloseDetails = document.getElementById("btn-close-details");
const detailsHeroImg = document.getElementById("details-hero-img");
const detailsCategoryTag = document.getElementById("details-category-tag");
const detailsTitleText = document.getElementById("details-title-text");
const detailsAuthorAvatar = document.getElementById("details-author-avatar");
const detailsAuthorName = document.getElementById("details-author-name");
const detailsPublishTime = document.getElementById("details-publish-time");
const btnDetailsBookmark = document.getElementById("btn-details-bookmark");
const detailsParagraphs = document.getElementById("details-paragraphs");
const detailsCommentsList = document.getElementById("details-comments-list");
const commentsCountLabel = document.getElementById("comments-count");
const commentForm = document.getElementById("comment-form");
const inputCommentText = document.getElementById("input-comment-text");
const detailsMovieCard = document.getElementById("details-movie-card");

// Login Screen
const loginBackdrop = document.getElementById("login-modal-backdrop");
const btnLoginGoogle = document.getElementById("btn-login-google");
const btnLoginFacebook = document.getElementById("btn-login-facebook");
const btnLoginX = document.getElementById("btn-login-x");
const emailLoginForm = document.getElementById("email-login-form");
const loginEmail = document.getElementById("login-email");
const loginPassword = document.getElementById("login-password");
const btnLoginGuest = document.getElementById("btn-login-guest");
const btnSignout = document.getElementById("btn-signout");
const navUserAvatarChar = document.getElementById("nav-user-avatar-char");

// Dev console
const devPanel = document.getElementById("dev-panel-container");
const btnDevToggle = document.getElementById("btn-dev-toggle");
const debugZustandJson = document.getElementById("zustand-state-json");
const debugQueryCacheList = document.getElementById("query-cache-list");
const checkSimDelay = document.getElementById("sim-network-delay");
const simBtnLoading = document.getElementById("sim-btn-loading");
const simBtnEmpty = document.getElementById("sim-btn-empty");
const simBtnSuccess = document.getElementById("sim-btn-success");
const simBtnLogin = document.getElementById("sim-btn-login");
const simBtnLogout = document.getElementById("sim-btn-logout");

let activeArticleOpen = null; // Holds the currently open details article object

// 5. Initialize Application
function initApp() {
  // Check login state first
  if (!useRegionStore.state.isLoggedIn) {
    loginBackdrop.classList.add("active");
    btnSignout.classList.add("hidden");
  } else {
    loginBackdrop.classList.remove("active");
    btnSignout.classList.remove("hidden");
    
    const userChar = useRegionStore.state.user ? useRegionStore.state.user.name.charAt(0).toUpperCase() : 'U';
    navUserAvatarChar.textContent = userChar;
    
    // If first-time visit (followed list is empty), show onboarding wizard immediately
    if (useRegionStore.state.followedCountries.length === 0) {
      openOnboardingModal();
    } else {
      // Normal feed load
      fetchFeedData(useRegionStore.state.activeCountry);
    }
  }
  
  // Render general components
  renderOnboardingList();
  updateBookmarkBadge();
  renderBookmarksList();
  updateZustandDashboard();
  updateQueryCacheDashboard();
  
  // Set up event listeners
  setupEventListeners();
}

// 6. Navigation, Wizard & Setup actions
function openOnboardingModal() {
  onboardingChecked = new Set(useRegionStore.state.followedCountries);
  updateOnboardingSelectionsUI();
  onboardingBackdrop.classList.add("active");
  onboardingSearchInput.value = "";
  onboardingSearchInput.dispatchEvent(new Event("input"));
}

function closeOnboardingModal() {
  onboardingBackdrop.classList.remove("active");
}

function renderOnboardingList() {
  onboardingList.innerHTML = "";
  countries.forEach(country => {
    const row = document.createElement("div");
    row.className = "country-row";
    row.dataset.code = country.code;
    row.innerHTML = `
      <div class="flag-icon">${country.flag}</div>
      <div class="country-name">${country.name}</div>
      <div class="select-indicator"></div>
    `;
    row.addEventListener("click", () => toggleOnboardingCheck(country.code));
    onboardingList.appendChild(row);
  });
}

function toggleOnboardingCheck(code) {
  if (code === "GL") {
    if (onboardingChecked.has("GL")) {
      onboardingChecked.delete("GL");
    } else {
      onboardingChecked.clear();
      onboardingChecked.add("GL");
    }
  } else {
    onboardingChecked.delete("GL");
    if (onboardingChecked.has(code)) {
      onboardingChecked.delete(code);
    } else {
      onboardingChecked.add(code);
    }
  }
  updateOnboardingSelectionsUI();
}

function updateOnboardingSelectionsUI() {
  if (onboardingChecked.has("GL")) {
    onboardingGlobalRow.classList.add("selected");
  } else {
    onboardingGlobalRow.classList.remove("selected");
  }
  
  const rows = onboardingList.querySelectorAll(".country-row");
  rows.forEach(row => {
    const code = row.dataset.code;
    if (onboardingChecked.has(code)) {
      row.classList.add("selected");
    } else {
      row.classList.remove("selected");
    }
  });
  
  const count = onboardingChecked.size;
  if (count >= 1) {
    btnContinue.disabled = false;
    btnContinue.textContent = `Continue (${count} selected)`;
  } else {
    btnContinue.disabled = true;
    btnContinue.textContent = "Continue";
  }
}

// Onboarding Search
onboardingSearchInput.addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase().trim();
  if (query.length > 0) {
    onboardingSearchClear.classList.remove("hidden");
  } else {
    onboardingSearchClear.classList.add("hidden");
  }
  
  let count = 0;
  if ("global all countries".includes(query)) {
    onboardingGlobalRow.classList.remove("hidden");
    count++;
  } else {
    onboardingGlobalRow.classList.add("hidden");
  }
  
  const rows = onboardingList.querySelectorAll(".country-row");
  rows.forEach(row => {
    const name = row.querySelector(".country-name").textContent.toLowerCase();
    if (name.includes(query)) {
      row.classList.remove("hidden");
      count++;
    } else {
      row.classList.add("hidden");
    }
  });
  
  if (count === 0) {
    onboardingEmpty.classList.remove("hidden");
  } else {
    onboardingEmpty.classList.add("hidden");
  }
});

onboardingSearchClear.addEventListener("click", () => {
  onboardingSearchInput.value = "";
  onboardingSearchInput.dispatchEvent(new Event("input"));
  onboardingSearchInput.focus();
});

btnContinue.addEventListener("click", () => {
  // Commit to store
  const selection = Array.from(onboardingChecked);
  useRegionStore.state.followedCountries = selection;
  
  if (selection.includes("GL")) {
    useRegionStore.setActive("GL");
  } else {
    useRegionStore.setActive(selection[0] || "GL");
  }
  
  useRegionStore.sync();
  closeOnboardingModal();
  fetchFeedData(useRegionStore.state.activeCountry);
});

linkSkip.addEventListener("click", () => {
  useRegionStore.state.followedCountries = [];
  useRegionStore.setActive("GL");
  useRegionStore.sync();
  closeOnboardingModal();
  fetchFeedData("GL");
});

onboardingGlobalRow.addEventListener("click", () => toggleOnboardingCheck("GL"));


// 7. News Feed Fetcher (Simulating React Query cache and loading)
function fetchFeedData(code) {
  if (queryTimeoutId) clearTimeout(queryTimeoutId);
  
  // Set current active country
  useRegionStore.setActive(code);
  updateSwitcherActiveFlag();
  
  // Set filter indicator label
  let regionName = "Global";
  if (code !== "GL") {
    const match = countries.find(c => c.code === code);
    if (match) regionName = `${match.flag} ${match.name}`;
  }
  feedRegionLabel.textContent = regionName;
  
  const isDelayEnabled = checkSimDelay.checked;
  const isCached = queryCache[code] === "fresh";
  
  // Reset grids
  heroBillboard.classList.add("hidden");
  articlesGrid.classList.add("hidden");
  feedSkeletons.classList.add("hidden");
  feedEmpty.classList.add("hidden");
  
  if (isCached || !isDelayEnabled) {
    // Instant load from cache
    queryCache[code] = "fresh";
    updateQueryCacheDashboard();
    renderFeedArticles(code);
  } else {
    // Cache miss: Show Loading Skeleton
    queryCache[code] = "fetching";
    updateQueryCacheDashboard();
    
    feedSkeletons.classList.remove("hidden");
    
    queryTimeoutId = setTimeout(() => {
      queryCache[code] = "fresh";
      updateQueryCacheDashboard();
      
      feedSkeletons.classList.add("hidden");
      renderFeedArticles(code);
    }, 1200);
  }
}

function updateSwitcherActiveFlag() {
  const code = useRegionStore.state.activeCountry;
  if (code === "GL") {
    activeCountryFlag.textContent = "🌐";
    activeCountryName.textContent = "Global";
  } else {
    const match = countries.find(c => c.code === code);
    if (match) {
      activeCountryFlag.textContent = match.flag;
      activeCountryName.textContent = match.name;
    }
  }
}

// Re-render feed without triggering standard loader (used for bookmark toggles)
function renderActiveFeedWithoutLoader() {
  renderFeedArticles(useRegionStore.state.activeCountry);
}

function renderFeedArticles(code) {
  articlesGrid.innerHTML = "";
  
  const articles = newsArticles[code];
  
  // Clear category tabs highlight
  const tabs = document.querySelectorAll(".feed-tab");
  tabs.forEach(t => t.classList.remove("active"));
  tabs[0].classList.add("active"); // default to Latest tab
  
  if (!articles || articles.length === 0) {
    // Show Empty Feed State
    showEmptyFeed(code);
    return;
  }
  
  // Render Success states
  feedEmpty.classList.add("hidden");
  heroBillboard.classList.remove("hidden");
  articlesGrid.classList.remove("hidden");
  
  // 1. Render Hero Card (first article of the feed)
  const heroData = articles[0];
  heroBillboard.innerHTML = `
    <div class="hero-billboard-image ${heroData.bannerClass}"></div>
    <div class="hero-billboard-overlay">
      <span class="hero-category">${heroData.category}</span>
      <h2 class="hero-title">${heroData.title}</h2>
      <p class="hero-description">${heroData.description}</p>
      <div class="hero-meta">
        <span>By <strong>${heroData.author}</strong></span>
        <span>• &nbsp;${heroData.time}</span>
        <span>• &nbsp;${heroData.readTime}</span>
      </div>
    </div>
  `;
  // Click listener for details
  heroBillboard.onclick = () => openDetailsModal(heroData);
  
  // 2. Render rest in grid
  const gridArticles = articles.slice(1);
  if (gridArticles.length === 0) {
    // If only 1 article, hide grid header or leave empty container
    return;
  }
  
  gridArticles.forEach(art => {
    const card = document.createElement("div");
    card.className = "article-card";
    
    const isSaved = bookmarksStore.has(art.id);
    const saveClass = isSaved ? "saved" : "";
    
    card.innerHTML = `
      <div class="article-img-container">
        <div class="article-img ${art.bannerClass}"></div>
        <span class="card-category-badge">${art.category}</span>
        <button class="btn-card-save ${saveClass}" data-id="${art.id}">🔖</button>
      </div>
      <div class="article-body-details">
        <h4 class="article-card-title">${art.title}</h4>
        <p class="article-card-desc">${art.description}</p>
        <div class="article-card-meta">
          <span class="article-card-author">By ${art.author}</span>
          <span>${art.time}</span>
        </div>
      </div>
    `;
    
    // Bookmark trigger inside card
    const saveBtn = card.querySelector(".btn-card-save");
    saveBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      bookmarksStore.toggle(art.id);
    });
    
    // Details modal trigger
    card.addEventListener("click", () => openDetailsModal(art));
    
    articlesGrid.appendChild(card);
  });
}

function showEmptyFeed(code) {
  let countryName = "this region";
  if (code === "GL") {
    countryName = "Global";
  } else {
    const found = countries.find(c => c.code === code);
    if (found) countryName = found.name;
  }
  
  emptyStateTitle.textContent = `No updates for ${countryName}`;
  emptyStateMessage.textContent = `No new movie or series articles for ${countryName} right now — check back soon.`;
  
  heroBillboard.classList.add("hidden");
  articlesGrid.classList.add("hidden");
  feedEmpty.classList.remove("hidden");
}

// 8. Tab Category Filtering
const categoryTabs = document.querySelectorAll(".feed-tab");
categoryTabs.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    categoryTabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    
    const categoryName = tab.textContent;
    filterFeedByCategory(categoryName);
  });
});

function filterFeedByCategory(category) {
  const code = useRegionStore.state.activeCountry;
  const articles = newsArticles[code];
  if (!articles || articles.length === 0) return;
  
  // If "Latest News" chosen, render full list
  if (category === "Latest News") {
    renderFeedArticles(code);
    return;
  }
  
  let filtered = [];
  if (category === "Trending") {
    // Simulated trending (reverse or alternate list)
    filtered = [...articles].reverse();
  } else if (category === "Reviews") {
    filtered = articles.filter(a => a.category === "Reviews" || a.category === "Kaiju");
  } else if (category === "Upcoming Releases") {
    filtered = articles.filter(a => a.category === "Upcoming" || a.category === "Sci-Fi" || a.category === "Production");
  }
  
  // Re-render matching cards
  articlesGrid.innerHTML = "";
  if (filtered.length === 0) {
    articlesGrid.innerHTML = `<div class="grid-state-wrapper"><div class="empty-state-card" style="padding: 30px;"><h3>No articles found in ${category}</h3></div></div>`;
    return;
  }
  
  filtered.forEach(art => {
    const card = document.createElement("div");
    card.className = "article-card";
    const isSaved = bookmarksStore.has(art.id);
    const saveClass = isSaved ? "saved" : "";
    
    card.innerHTML = `
      <div class="article-img-container">
        <div class="article-img ${art.bannerClass}"></div>
        <span class="card-category-badge">${art.category}</span>
        <button class="btn-card-save ${saveClass}" data-id="${art.id}">🔖</button>
      </div>
      <div class="article-body-details">
        <h4 class="article-card-title">${art.title}</h4>
        <p class="article-card-desc">${art.description}</p>
        <div class="article-card-meta">
          <span class="article-card-author">By ${art.author}</span>
          <span>${art.time}</span>
        </div>
      </div>
    `;
    
    card.querySelector(".btn-card-save").onclick = (e) => {
      e.stopPropagation();
      bookmarksStore.toggle(art.id);
    };
    card.onclick = () => openDetailsModal(art);
    articlesGrid.appendChild(card);
  });
}


// 9. Article Details Modal Injection
function openDetailsModal(article) {
  activeArticleOpen = article;
  
  // 1. Hero visual backgrounds
  detailsHeroImg.className = `details-hero ${article.bannerClass}`;
  detailsCategoryTag.textContent = article.category;
  detailsTitleText.textContent = article.title;
  
  // 2. Author info
  detailsAuthorAvatar.textContent = article.avatar;
  detailsAuthorName.textContent = article.author;
  detailsPublishTime.textContent = `${article.time} • ${article.readTime}`;
  
  // 3. Body paragraphs
  detailsParagraphs.innerHTML = "";
  article.paragraphs.forEach(para => {
    const p = document.createElement("p");
    p.textContent = para;
    detailsParagraphs.appendChild(p);
  });
  
  // 4. Saved button state
  const isSaved = bookmarksStore.has(article.id);
  if (isSaved) {
    btnDetailsBookmark.classList.add("saved");
    btnDetailsBookmark.innerHTML = `<span class="save-icon">✓</span> Saved`;
  } else {
    btnDetailsBookmark.classList.remove("saved");
    btnDetailsBookmark.innerHTML = `<span class="save-icon">🔖</span> Save Article`;
  }
  
  // 5. Featured Movie Meta Card
  const movie = article.movie;
  detailsMovieCard.innerHTML = `
    <div class="movie-poster-mini ${movie.bgClass}">
      <div class="movie-poster-grad"></div>
      <div class="movie-rating-badge">⭐ ${movie.rating}</div>
    </div>
    <div class="movie-card-body">
      <h4 class="movie-title">${movie.title}</h4>
      <div class="movie-genre-strip">${movie.genre}</div>
      <p class="movie-synopsis">${movie.synopsis}</p>
      <div class="movie-specs">
        <span>Director: <strong>${movie.director}</strong></span>
        <span>Cast: <strong>${movie.cast}</strong></span>
        <span>Release: <strong>${movie.releaseDate}</strong></span>
      </div>
    </div>
  `;
  
  // 6. Comments Render
  renderCommentsSection();
  
  // Reveal Backdrop
  detailsBackdrop.classList.add("active");
}

function closeDetailsModal() {
  detailsBackdrop.classList.remove("active");
  activeArticleOpen = null;
}

function renderCommentsSection() {
  detailsCommentsList.innerHTML = "";
  
  if (!activeArticleOpen) return;
  const comments = activeArticleOpen.comments;
  commentsCountLabel.textContent = comments.length;
  
  if (comments.length === 0) {
    detailsCommentsList.innerHTML = `<div style="font-size: 0.8rem; color: var(--text-muted); font-style: italic;">No comments yet. Start the conversation!</div>`;
    return;
  }
  
  comments.forEach(comment => {
    const item = document.createElement("div");
    item.className = "comment-item";
    item.innerHTML = `
      <div class="comment-avatar">${comment.user.charAt(0).toUpperCase()}</div>
      <div class="comment-bubble">
        <div class="comment-user">${comment.user}</div>
        <div class="comment-text">${comment.text}</div>
        <div class="comment-time">${comment.time}</div>
      </div>
    `;
    detailsCommentsList.appendChild(item);
  });
}

// Post Comment Form Handler
commentForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!activeArticleOpen) return;
  
  const text = inputCommentText.value.trim();
  if (text.length === 0) return;
  
  // Add new comment using logged-in user credentials
  const activeUser = useRegionStore.state.user;
  const userName = activeUser ? `${activeUser.name} (${activeUser.provider})` : "Cinema Fan";
  
  activeArticleOpen.comments.push({
    user: userName,
    text: text,
    time: "Just now"
  });
  
  inputCommentText.value = "";
  renderCommentsSection();
});

btnDetailsBookmark.addEventListener("click", () => {
  if (!activeArticleOpen) return;
  bookmarksStore.toggle(activeArticleOpen.id);
  
  // Toggle style on detail button immediately
  const isSaved = bookmarksStore.has(activeArticleOpen.id);
  if (isSaved) {
    btnDetailsBookmark.classList.add("saved");
    btnDetailsBookmark.innerHTML = `<span class="save-icon">✓</span> Saved`;
  } else {
    btnDetailsBookmark.classList.remove("saved");
    btnDetailsBookmark.innerHTML = `<span class="save-icon">🔖</span> Save Article`;
  }
});


// 10. Bookmarks Drawer Sidebar Actions
function toggleBookmarksDrawer() {
  bookmarksDrawer.classList.toggle("closed");
}

function updateBookmarkBadge() {
  const count = bookmarksStore.savedIds.size || bookmarksStore.savedIds.length;
  bookmarksBadge.textContent = count;
  if (count > 0) {
    bookmarksBadge.classList.remove("hidden");
  } else {
    bookmarksBadge.classList.add("hidden");
  }
}

function renderBookmarksList() {
  // Clear previous rows except empty state template
  const prevCards = bookmarksList.querySelectorAll(".saved-item-card");
  prevCards.forEach(c => c.remove());
  
  const savedIds = bookmarksStore.savedIds;
  if (savedIds.length === 0) {
    bookmarksEmpty.classList.remove("hidden");
    return;
  }
  
  bookmarksEmpty.classList.add("hidden");
  
  // Find article details from any country feed in newsArticles
  savedIds.forEach(id => {
    let articleData = null;
    Object.keys(newsArticles).forEach(key => {
      const match = newsArticles[key].find(x => x.id === id);
      if (match) articleData = match;
    });
    
    if (articleData) {
      const card = document.createElement("div");
      card.className = "saved-item-card";
      card.innerHTML = `
        <div class="saved-item-header">
          <span>${articleData.category.toUpperCase()}</span>
          <span class="btn-remove-saved" data-id="${articleData.id}">&times;</span>
        </div>
        <div class="saved-item-title">${articleData.title}</div>
      `;
      
      // Click card to read details
      card.addEventListener("click", (e) => {
        if (e.target.classList.contains("btn-remove-saved")) return;
        openDetailsModal(articleData);
      });
      
      // Click remove
      card.querySelector(".btn-remove-saved").addEventListener("click", (e) => {
        e.stopPropagation();
        bookmarksStore.toggle(articleData.id);
      });
      
      bookmarksList.appendChild(card);
    }
  });
}


// 11. Region Switcher dialog
navCountrySwitcher.addEventListener("click", () => {
  openSwitcherModal();
});

function openSwitcherModal() {
  switcherBackdrop.classList.add("active");
  navCountrySwitcher.classList.add("open");
  
  renderSwitcherLists();
  
  switcherSearchInput.value = "";
  switcherSearchInput.dispatchEvent(new Event("input"));
}

function closeSwitcherModal() {
  switcherBackdrop.classList.remove("active");
  navCountrySwitcher.classList.remove("open");
}

function renderSwitcherLists() {
  switcherFollowedList.innerHTML = "";
  switcherAllList.innerHTML = "";
  
  const activeCode = useRegionStore.state.activeCountry;
  
  // 1. Global selection highlight
  if (activeCode === "GL") {
    switcherCountryGlobal.classList.add("active-selection");
    switcherCountryGlobal.querySelector(".active-dot").classList.remove("hidden");
  } else {
    switcherCountryGlobal.classList.remove("active-selection");
    switcherCountryGlobal.querySelector(".active-dot").classList.add("hidden");
  }
  
  const followed = useRegionStore.state.followedCountries.filter(x => x !== "GL");
  
  // 2. Render followed
  if (followed.length === 0) {
    switcherFollowedList.innerHTML = `<div style="font-size:0.75rem; color: var(--text-muted); font-style:italic; padding: 6px 12px;">No regions followed. Follow countries below.</div>`;
  } else {
    followed.forEach(code => {
      const match = countries.find(c => c.code === code);
      if (match) {
        const row = createSwitcherRow(match, true);
        switcherFollowedList.appendChild(row);
      }
    });
  }
  
  // 3. Render all
  countries.forEach(country => {
    const isFollowed = followed.includes(country.code);
    const row = createSwitcherRow(country, false, isFollowed);
    switcherAllList.appendChild(row);
  });
}

function createSwitcherRow(country, inFollowed, isAlreadyFollowed = false) {
  const row = document.createElement("div");
  row.className = "switcher-country-row";
  row.dataset.code = country.code;
  
  const isActive = useRegionStore.state.activeCountry === country.code;
  if (isActive) row.classList.add("active-selection");
  
  let rightAffordance = "";
  if (isActive) {
    rightAffordance = `<span class="active-dot">●</span>`;
  } else if (inFollowed) {
    rightAffordance = `<span class="btn-sheet-remove" style="font-size:1.15rem; color:var(--text-muted); margin-left:auto; cursor:pointer; padding:2px 6px;">&times;</span>`;
  } else if (isAlreadyFollowed) {
    rightAffordance = `<span style="font-size:0.7rem; color: var(--accent-gold); margin-left:auto; font-weight:600;">Followed</span>`;
  } else {
    rightAffordance = `<span class="btn-sheet-add" style="font-size:1.15rem; color:var(--accent-gold); margin-left:auto; cursor:pointer; padding:2px 6px; font-weight:bold;">+</span>`;
  }
  
  row.innerHTML = `
    <span class="flag-icon">${country.flag}</span>
    <span class="country-name">${country.name}</span>
    ${rightAffordance}
  `;
  
  row.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-sheet-remove")) {
      e.stopPropagation();
      useRegionStore.unfollow(country.code);
      renderSwitcherLists();
      return;
    }
    if (e.target.classList.contains("btn-sheet-add")) {
      e.stopPropagation();
      useRegionStore.follow(country.code);
      renderSwitcherLists();
      return;
    }
    
    // Switch feed region
    fetchFeedData(country.code);
    closeSwitcherModal();
  });
  
  return row;
}

switcherCountryGlobal.addEventListener("click", () => {
  fetchFeedData("GL");
  closeSwitcherModal();
});

// Switcher search filtration
switcherSearchInput.addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase().trim();
  if (query.length > 0) {
    switcherSearchClear.classList.remove("hidden");
  } else {
    switcherSearchClear.classList.add("hidden");
  }
  
  let count = 0;
  if ("global all countries".includes(query)) {
    switcherCountryGlobal.classList.remove("hidden");
    count++;
  } else {
    switcherCountryGlobal.classList.add("hidden");
  }
  
  // Followed list
  const followedRows = switcherFollowedList.querySelectorAll(".switcher-country-row");
  followedRows.forEach(row => {
    const name = row.querySelector(".country-name").textContent.toLowerCase();
    if (name.includes(query)) {
      row.classList.remove("hidden");
      count++;
    } else {
      row.classList.add("hidden");
    }
  });
  
  // All list
  const allRows = switcherAllList.querySelectorAll(".switcher-country-row");
  allRows.forEach(row => {
    const name = row.querySelector(".country-name").textContent.toLowerCase();
    if (name.includes(query)) {
      row.classList.remove("hidden");
      count++;
    } else {
      row.classList.add("hidden");
    }
  });
  
  if (count === 0) {
    switcherEmpty.classList.remove("hidden");
  } else {
    switcherEmpty.classList.add("hidden");
  }
});

switcherSearchClear.addEventListener("click", () => {
  switcherSearchInput.value = "";
  switcherSearchInput.dispatchEvent(new Event("input"));
  switcherSearchInput.focus();
});

btnSwitcherAddRegion.addEventListener("click", (e) => {
  e.stopPropagation();
  switcherSearchInput.focus();
  // visual pulse glow on input
  switcherSearchInput.parentElement.style.borderColor = "var(--accent-gold)";
  setTimeout(() => {
    switcherSearchInput.parentElement.style.borderColor = "";
  }, 800);
});


// 12. Global Search Filtration in Feed
globalSearch.addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase().trim();
  if (query.length > 0) {
    btnGlobalSearchClear.classList.remove("hidden");
  } else {
    btnGlobalSearchClear.classList.add("hidden");
  }
  
  const code = useRegionStore.state.activeCountry;
  const articles = newsArticles[code] || [];
  
  if (articles.length === 0) return;
  
  // Reset category tabs highlight
  const tabs = document.querySelectorAll(".feed-tab");
  tabs.forEach(t => t.classList.remove("active"));
  
  if (query.length === 0) {
    renderFeedArticles(code);
    return;
  }
  
  const filtered = articles.filter(art => 
    art.title.toLowerCase().includes(query) || 
    art.description.toLowerCase().includes(query) || 
    art.category.toLowerCase().includes(query)
  );
  
  // Render search cards
  heroBillboard.classList.add("hidden");
  articlesGrid.innerHTML = "";
  
  if (filtered.length === 0) {
    articlesGrid.innerHTML = `
      <div class="grid-state-wrapper">
        <div class="empty-state-card" style="padding: 40px;">
          <div class="empty-cinema-graphic">🍿</div>
          <h2>No matching articles found</h2>
          <p>We couldn't find any movie news matching '${e.target.value}' for this region.</p>
        </div>
      </div>
    `;
    return;
  }
  
  filtered.forEach(art => {
    const card = document.createElement("div");
    card.className = "article-card";
    const isSaved = bookmarksStore.has(art.id);
    const saveClass = isSaved ? "saved" : "";
    
    card.innerHTML = `
      <div class="article-img-container">
        <div class="article-img ${art.bannerClass}"></div>
        <span class="card-category-badge">${art.category}</span>
        <button class="btn-card-save ${saveClass}">🔖</button>
      </div>
      <div class="article-body-details">
        <h4 class="article-card-title">${art.title}</h4>
        <p class="article-card-desc">${art.description}</p>
        <div class="article-card-meta">
          <span class="article-card-author">By ${art.author}</span>
          <span>${art.time}</span>
        </div>
      </div>
    `;
    
    card.querySelector(".btn-card-save").onclick = (e) => {
      e.stopPropagation();
      bookmarksStore.toggle(art.id);
    };
    card.onclick = () => openDetailsModal(art);
    articlesGrid.appendChild(card);
  });
});

btnGlobalSearchClear.addEventListener("click", () => {
  globalSearch.value = "";
  globalSearch.dispatchEvent(new Event("input"));
  globalSearch.focus();
});


// 13. Event Listeners Setup
function setupEventListeners() {
  // --- LOGIN ACTION HANDLERS ---
  const handleUserLogin = (userObj) => {
    useRegionStore.login(userObj);
    loginBackdrop.classList.remove("active");
    btnSignout.classList.remove("hidden");
    navUserAvatarChar.textContent = userObj.name.charAt(0).toUpperCase();
    
    // Switch screen views
    if (useRegionStore.state.followedCountries.length === 0) {
      openOnboardingModal();
    } else {
      fetchFeedData(useRegionStore.state.activeCountry);
    }
  };

  btnLoginGoogle.addEventListener("click", () => {
    handleUserLogin({ name: "Google Cinema Star", email: "google@cinewire.com", provider: "Google" });
  });

  btnLoginFacebook.addEventListener("click", () => {
    handleUserLogin({ name: "Facebook Movie Fan", email: "facebook@cinewire.com", provider: "Facebook" });
  });

  btnLoginX.addEventListener("click", () => {
    handleUserLogin({ name: "X Twitter Critic", email: "twitter@cinewire.com", provider: "X" });
  });

  emailLoginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const emailVal = loginEmail.value.trim();
    const userName = emailVal.split("@")[0].charAt(0).toUpperCase() + emailVal.split("@")[0].slice(1);
    handleUserLogin({ name: userName, email: emailVal, provider: "Email" });
    loginEmail.value = "";
    loginPassword.value = "";
  });

  btnLoginGuest.addEventListener("click", () => {
    handleUserLogin({ name: "Guest User", email: "guest@cinewire.com", provider: "Guest" });
  });

  // --- SIGN OUT ACTION HANDLER ---
  btnSignout.addEventListener("click", () => {
    useRegionStore.logout();
    loginBackdrop.classList.add("active");
    btnSignout.classList.add("hidden");
    
    if (queryTimeoutId) clearTimeout(queryTimeoutId);
    
    useRegionStore.state.followedCountries = [];
    useRegionStore.state.activeCountry = "GL";
    useRegionStore.sync();
    
    closeDetailsModal();
    closeSwitcherModal();
  });

  // Drawer Toggles
  btnBookmarksToggle.addEventListener("click", () => toggleBookmarksDrawer());
  btnCloseDrawer.addEventListener("click", () => toggleBookmarksDrawer());
  
  // Onboarding reset manual click
  btnOnboardingReset.addEventListener("click", () => openOnboardingModal());
  
  // Close Modals
  btnCloseSwitcher.addEventListener("click", () => closeSwitcherModal());
  btnCloseDetails.addEventListener("click", () => closeDetailsModal());
  
  // Backdrop close filters
  switcherBackdrop.addEventListener("click", (e) => {
    if (e.target === switcherBackdrop) closeSwitcherModal();
  });
  detailsBackdrop.addEventListener("click", (e) => {
    if (e.target === detailsBackdrop) closeDetailsModal();
  });
  
  // Switch region from empty screen
  btnEmptySwitch.addEventListener("click", () => openSwitcherModal());
  
  // Home logo click
  logoHome.addEventListener("click", () => {
    // Go to Global
    fetchFeedData("GL");
  });
  
  // 14. Dev Console Panel Controls
  btnDevToggle.addEventListener("click", () => {
    devPanel.classList.toggle("open");
  });
  
  // Dev Override buttons
  simBtnLoading.addEventListener("click", () => {
    if (queryTimeoutId) clearTimeout(queryTimeoutId);
    
    heroBillboard.classList.add("hidden");
    articlesGrid.classList.add("hidden");
    feedEmpty.classList.add("hidden");
    
    feedSkeletons.classList.remove("hidden");
    
    queryCache[useRegionStore.state.activeCountry] = "fetching";
    updateQueryCacheDashboard();
    
    simBtnLoading.classList.add("active");
    simBtnEmpty.classList.remove("active");
    simBtnSuccess.classList.remove("active");
  });
  
  simBtnEmpty.addEventListener("click", () => {
    if (queryTimeoutId) clearTimeout(queryTimeoutId);
    showEmptyFeed(useRegionStore.state.activeCountry);
    
    queryCache[useRegionStore.state.activeCountry] = "fresh";
    updateQueryCacheDashboard();
    
    simBtnLoading.classList.remove("active");
    simBtnEmpty.classList.add("active");
    simBtnSuccess.classList.remove("active");
  });
  
  simBtnSuccess.addEventListener("click", () => {
    if (queryTimeoutId) clearTimeout(queryTimeoutId);
    
    const active = useRegionStore.state.activeCountry;
    // Default to GL articles if active has none
    const code = newsArticles[active] ? active : "GL";
    renderFeedArticles(code);
    
    queryCache[active] = "fresh";
    updateQueryCacheDashboard();
    
    simBtnLoading.classList.remove("active");
    simBtnEmpty.classList.remove("active");
    simBtnSuccess.classList.add("active");
  });

  simBtnLogin.addEventListener("click", () => {
    handleUserLogin({ name: "Simulator Master", email: "admin@cinewire.com", provider: "Developer Console" });
    simBtnLogin.classList.add("active");
    simBtnLogout.classList.remove("active");
  });

  simBtnLogout.addEventListener("click", () => {
    btnSignout.click();
    simBtnLogin.classList.remove("active");
    simBtnLogout.classList.add("active");
  });
  
  // Tab selector inside dev panel code blocks
  const devTabs = document.querySelectorAll(".dev-tab");
  devTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      devTabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      
      const targetId = tab.getAttribute("data-dev-tab");
      document.querySelectorAll(".dev-tab-content").forEach(content => {
        content.classList.remove("active");
      });
      document.getElementById(targetId).classList.add("active");
    });
  });
}

// 15. Dashboard update log screens
function updateZustandDashboard() {
  debugZustandJson.textContent = JSON.stringify(useRegionStore.state, null, 2);
}

function updateQueryCacheDashboard() {
  debugQueryCacheList.innerHTML = "";
  
  Object.keys(queryCache).forEach(key => {
    const status = queryCache[key];
    const item = document.createElement("div");
    item.className = "cache-item";
    item.innerHTML = `
      <span class="cache-key">['movieNews', "${key}"]</span>
      <span class="cache-status ${status.toLowerCase()}">${status}</span>
    `;
    debugQueryCacheList.appendChild(item);
  });
}

// Run initialization
initApp();
