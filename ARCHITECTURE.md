# ARCHITECTURE.md — System Architecture (CINEPULSE 2.0)

## 1. High-Level Architecture

**CINEPULSE 2.0** is a single-page application (SPA) statically generated using **Nuxt.js 2** in `target: 'static'`, `ssr: false` mode. It consumes external REST APIs to provide real-time media exploration and is hosted on Vercel Edge CDN.

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
│   │   ├── utilities/       # SCSS tokens and helpers
│   │   ├── global.scss      # Global base styles and transitions
│   │   └── tailwind.css     # Tailwind CSS entry with standard utility layers
│   └── images/              # Static assets & SVG icons
├── tailwind.config.js       # Tailwind CSS v3 config (standard utility tokens)
├── components/
│   ├── global/              # Nav (floating header & bottom dock), TopNav, SearchForm, Footer, CookieConsent
│   ├── movie/               # MovieInfo (production stats grid, hero metadata)
│   ├── tv/                  # TvInfo, Episodes, EpisodesItem
│   ├── person/              # PersonInfo, CreditsHistory, CreditsHistoryGroup, CreditsHistoryItem
│   ├── search/              # SearchResults (media type filters: All, Movies, TV, People)
│   ├── ui/                 # Reusable UI primitives: Button, Badge, RatingBadge, EmptyState, LoadingSkeleton
│   ├── Card.vue             # Poster-first media card with hover explore action & rank badges
│   ├── Hero.vue             # Cinematic full-width hero with interactive featured switcher
│   ├── EditorialSpotlight.vue # Asymmetric curated spotlight (7-col feature + 5-col supporting stack)
│   ├── Listing.vue          # Infinite scroll grid listing
│   ├── ListingCarousel.vue  # Horizontal media rail with scroll snapping & ranked badges
│   ├── MediaNav.vue         # Detail section tab navigation
│   ├── Modal.vue            # Accessible modal for trailers and gallery lightbox
│   ├── Videos.vue & VideosItem.vue  # Video gallery
│   ├── Images.vue & ImagesItem.vue  # Photo gallery
│   └── Credits.vue & CreditsItem.vue # Cast carousel
├── layouts/
│   ├── default.vue          # Global shell (Floating Nav, SearchForm modal, Footer)
│   ├── no-footer.vue        # Footer-less layout
│   └── error.vue            # Error boundary page (404, 504, generic)
├── mixins/
│   ├── Details.js           # Shared computed properties for media details
│   ├── Functions.js         # Debounce, local storage helpers
│   └── Carousel.js          # Horizontal carousel scroll calculation logic
├── pages/
│   ├── index.vue            # Home discovery page with multi-hero ticker & Top 10 carousels
│   ├── movie/
│   │   ├── index.vue        # Movies hub with category switcher
│   │   ├── _id.vue          # Movie detail page with production intelligence
│   │   └── category/_name.vue # Movie category browse page
│   ├── tv/
│   │   ├── index.vue        # TV hub with category switcher
│   │   ├── _id.vue          # TV detail page
│   │   └── category/_name.vue # TV category browse page
│   ├── person/_id.vue       # Person detail page
│   ├── search/index.vue     # Search results page with filter pills
│   └── genre/_id/
│       ├── movie.vue        # Movies by genre with genre bar
│       └── tv.vue           # TV shows by genre with genre bar
├── plugins/
│   ├── filters.js           # Vue filters (dates, runtimes, commas, ratings)
│   ├── lazyload.js          # IntersectionObserver-based image lazyloader
│   └── ga.js                # Google Analytics plugin
├── store/
│   └── search.js            # Vuex module for search overlay state
├── nuxt.config.js           # Nuxt configuration (Port 5173, CSS, Plugins, Meta)
├── vercel.json              # Vercel deployment configuration
└── package.json             # Dependencies and scripts
```

---

## 3. Navigation & Presentation Architecture

1. **Widescreen Canvas**: The legacy desktop 10rem left-aligned sidebar was removed. Content now flows across the entire viewport width (`max-width: 1600px` centered), enabling panoramic movie backdrops.
2. **Dual-Tier Navigation**:
   - **Desktop (>= 1024px)**: Top floating frosted-glass header with CINEPULSE badge, route pills, and a `⌘K` command-palette quick-search trigger.
   - **Mobile (< 1024px)**: Floating frosted-glass dock fixed at the bottom with safe-area support, complemented by a contextual back-button header (`TopNav.vue`).
3. **Data Flow & State Management**:
   - Centralized API requests via `api/index.js` (Axios).
   - Async pre-fetching via Nuxt's `asyncData`.
   - Vuex store `store/search.js` manages search modal state.

---

## 4. Build & Deployment Lifecycle

- **Build Engine**: Webpack 4 via Nuxt 2.15.8 with `@nuxt/postcss8`, `tailwindcss` v3.4.19, and `autoprefixer` v10.6.1.
- **Component Architecture**: **PrimeVue 2** provides functional UI primitives (`Dialog`, `InputText`, `Button`, `Dropdown`, `Skeleton`, `Badge`, `Tag`, `Tooltip`, `Toast`, `ScrollTop`, `ProgressSpinner`), styled and customized via `assets/css/primevue-custom.scss` to strictly adhere to `DESIGN_SYSTEM.md`.
- **Styling Architecture**: Tailwind-first styling system with standard unprefixed utilities for layout, composition, spacing, typography, and responsive behavior. Zero scoped SCSS modules in Vue components.
- **Node Runtime**: Compatible with Node 18 through 24 using `NODE_OPTIONS=--openssl-legacy-provider`.
- **Development Server**: Hosted on `http://localhost:5173`.
- **Static Export**: `yarn generate` pre-renders pages into `/dist`.
- **Hosting**: Deployed automatically to Vercel Edge.
