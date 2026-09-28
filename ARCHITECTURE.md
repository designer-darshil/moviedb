# ARCHITECTURE.md — System Architecture

## 1. High-Level Architecture
**vue-movies** is a single-page application (SPA) statically generated using **Nuxt.js 2** in `target: 'static'`, `ssr: false` mode. It consumes external REST APIs to provide real-time media exploration and is hosted on Vercel Edge CDN.

```
                  +---------------------------+
                  |        User Agent         |
                  | (Desktop / Tablet / Phone)|
                  +-------------+-------------+
                                |
                                v
                  +---------------------------+
                  |    Vercel CDN / Edge      |
                  | (Static HTML/JS/CSS Dist) |
                  +-------------+-------------+
                                |
               +----------------+----------------+
               |                                 |
               v                                 v
   +-----------------------+         +-----------------------+
   |  The Movie Database   |         |    YouTube Data API   |
   |      (TMDb v3)        |         |  (Durations/Videos)   |
   +-----------------------+         +-----------------------+
```

---

## 2. Directory Structure & Module Breakdown
```
vue-movies/
├── api/
│   └── index.js             # Centralized TMDb & YouTube API client (Axios)
├── assets/
│   ├── css/
│   │   ├── base/            # Reset, typography, layout, animations
│   │   ├── components/      # Global component styles
│   │   ├── utilities/       # SCSS variables, mixins, helpers
│   │   └── global.scss      # Main entry point for global styles
│   └── images/              # Static assets & SVG icons
├── components/
│   ├── global/              # Nav, TopNav, SearchForm, Footer, CookieConsent, InstallPrompt
│   ├── movie/               # MovieInfo
│   ├── tv/                  # TvInfo, Episodes, EpisodesItem
│   ├── person/              # PersonInfo, CreditsHistory, CreditsHistoryGroup, CreditsHistoryItem
│   ├── search/              # SearchResults
│   ├── Card.vue             # Core media card (Movie, TV, Person)
│   ├── Hero.vue             # Cinematic editorial hero component
│   ├── Listing.vue          # Infinite scroll grid listing
│   ├── ListingCarousel.vue  # Horizontal scrolling media rail
│   ├── MediaNav.vue         # Detail section tab navigation
│   ├── Modal.vue            # Accessible modal for trailers and gallery lightbox
│   ├── Videos.vue & VideosItem.vue  # Video gallery
│   ├── Images.vue & ImagesItem.vue  # Photo gallery
│   └── Credits.vue & CreditsItem.vue # Cast carousel
├── layouts/
│   ├── default.vue          # Global shell (Nav, Search, Footer, CookieConsent)
│   ├── no-footer.vue        # Footer-less layout
│   └── error.vue            # Error boundary page (404, 504, generic)
├── mixins/
│   ├── Details.js           # Shared computed properties for media details
│   ├── Functions.js         # Debounce, local storage helpers
│   └── Carousel.js          # Horizontal carousel scroll calculation logic
├── pages/
│   ├── index.vue            # Home discovery page
│   ├── movie/
│   │   ├── index.vue        # Movies hub
│   │   ├── _id.vue          # Movie detail page
│   │   └── category/_name.vue # Movie category browse page
│   ├── tv/
│   │   ├── index.vue        # TV hub
│   │   ├── _id.vue          # TV detail page
│   │   └── category/_name.vue # TV category browse page
│   ├── person/_id.vue       # Person detail page
│   ├── search/index.vue     # Search results page
│   └── genre/_id/
│       ├── movie.vue        # Movies by genre
│       └── tv.vue           # TV shows by genre
├── plugins/
│   ├── filters.js           # Vue filters (dates, runtimes, commas, ratings)
│   ├── lazyload.js          # IntersectionObserver-based image lazyloader
│   └── ga.js                # Google Analytics plugin
├── store/
│   └── search.js            # Vuex module for search overlay state
├── nuxt.config.js           # Nuxt configuration
├── vercel.json              # Vercel deployment configuration
└── package.json             # Dependencies and scripts
```

---

## 3. Data Flow & State Management
1. **API Requests (`api/index.js`)**: All communication with TMDb (`api.themoviedb.org/3`) and YouTube uses Axios with parameter injection (`api_key`, `language`, `page`).
2. **Page Data Fetching**: Pages utilize `asyncData` to pre-load critical catalog data on route transitions. Detail pages fetch secondary data (recommendations, episodes) dynamically on mount or tab change.
3. **Global State (`store/search.js`)**: Vuex manages search drawer visibility (`searchOpen`) and previous route tracking (`fromPage`).
4. **Mixins**: `mixins/Details.js` normalizes differences between TMDb Movie, TV, and Person schemas (e.g. `item.title` vs `item.name`, `item.release_date` vs `item.first_air_date`).

---

## 4. Build & Deployment Lifecycle
- **Build Engine**: Webpack 4 via Nuxt 2.
- **Node Runtime**: Compatible with Node 18 through 24 using the OpenSSL legacy provider flag.
- **Static Export**: `yarn generate` writes pre-rendered HTML and client assets to `/dist`.
- **Hosting**: Deployed automatically to Vercel via Git integration and CLI.
