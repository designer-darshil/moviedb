# Product Requirements Document (PRD) — CINEPULSE 2.0

## 1. Product Overview

**CINEPULSE 2.0** is an uncompromising, next-generation web application for exploring movies, television series, and talent, engineered with Nuxt.js (Vue 2) and powered by The Movie Database (TMDb) API. Designed with a luxury dark cinematic aesthetic, CINEPULSE combines interactive multi-hero showcases, ranked top-10 ribbon carousels, instant command-palette search (`⌘K`), and comprehensive production intelligence data.

---

## 2. Product Goals

- **Next-Generation Discovery**: Deliver an immersive streaming-platform experience with interactive hero tickers, curated genre exploration, and dynamic category filters.
- **Widescreen Cinematic Immersion**: Maximize screen estate with a full-bleed floating glass top bar on desktop and a responsive bottom dock on mobile.
- **Deep Production Intelligence**: Display detailed film intelligence (budget, box office, directors, creators, original titles, production companies, airing schedules).
- **Fast Client Navigation**: Seamless client-side route transitions, instant search debouncing, and lightweight asset lazyloading.
- **Robust Media Delivery**: Zero broken images; strict adherence to TMDb supported dimensions (`w500`, `h632`, `w1280`, `w300`, `original`) with graceful fallback placeholders.

---

## 3. Core Features & Routes

### 3.1 Global Shell & Navigation

- **Floating Top Bar (`Nav.vue`)**: Frosted glassmorphism header on desktop featuring CINEPULSE brand emblem, primary navigation pills (Discover, Movies, TV Series, Top Charts), and a quick-action command palette search trigger (`⌘K`).
- **Mobile Bottom Dock**: Thumb-friendly floating glass dock on viewport `< 1024px` with safe-area inset support.
- **Command Palette Search (`SearchForm.vue`)**: Keyboard-driven modal search overlay with instant debounced queries, ESC dismissal, and trending quick tags.
- **Footer (`Footer.vue`)**: Brand statement, directory links (cinema, television, genres), legal disclaimer, and TMDb attribution.
- **Contextual Mobile Header (`TopNav.vue`)**: Glassmorphism mobile bar with history back navigation and page title.

### 3.2 Homepage (`/`)

- **Multi-Item Interactive Hero (`Hero.vue`)**: Displays the top 5 trending titles in an interactive ticker `[01, 02, 03, 04, 05]` with synchronized ambient lighting, rating badge, year, runtime, storyline synopsis, and trailer playback.
- **Genre Discovery Bar**: Instant category pill strip linking to curated genre listings.
- **Top 10 Trending Cinema Ribbon**: High-impact horizontal carousel with oversized ranking numbers (`1` to `10`) layered behind posters.
- **Top 10 TV Series Ribbon**: Ranked television series carousel.
- **Critic's Spotlight**: Curated high-aesthetic banner highlighting top-rated cinema.
- **Curated Visual Genre Cards**: Atmospheric genre tiles with subtle background glows.

### 3.3 Movies (`/movie`, `/movie/:id`, `/movie/category/:name`)

- **Movie Hub (`/movie`)**: Featured spotlight hero, quick category switcher tabs (Popular, Top Rated, Upcoming, Now Playing), and ranked carousels.
- **Movie Detail (`/movie/:id`)**: Atmospheric hero banner, floating poster card, tagline, narrative storyline, genre pills, and production intelligence stats grid (budget, box office, directors, language, companies). Tabbed media navigation (Overview, Videos, Photos, Recommendations).
- **Movie Categories (`/movie/category/:name`)**: Active category switcher pills and infinite-scroll media grid.

### 3.4 TV Shows (`/tv`, `/tv/:id`, `/tv/category/:name`)

- **TV Hub (`/tv`)**: Series spotlight hero, category switcher (Popular, Top Rated, Currently Airing, Airing Today), and ranked carousels.
- **TV Detail (`/tv/:id`)**: Hero banner, television intelligence card (creators, premiere date, latest airing, episode runtime, network), tabbed media navigation (Overview, Episodes, Videos, Photos), and recommendations.
- **Episodes Browser (`Episodes.vue`)**: Season selector dropdown and episode list with episode stills, air dates, and overviews.

### 3.5 People (`/person/:id`)

- **Person Profile**: Large portrait avatar, department badge, biographical narrative, personal stats (born, age, birthplace), photo gallery, and chronological credits history grouped by department.

### 3.6 Search (`/search?q=...`)

- **Search Results (`SearchResults.vue`)**: Unified paginated grid with media filter pills (All, Movies, TV, People), sort options (Relevance, Highest Rated, Newest), and live result counts.

---

## 4. Technical & Quality Requirements

1. **API Authentication**: TMDb API requests include a valid `api_key` query parameter loaded synchronously from environment variables.
2. **Image Sizing**: Only valid TMDb image dimensions (`w500`, `h632`, `w1280`, `w300`, `original`) are requested.
3. **Resilience**: Missing image paths fall back to inline SVG placeholders without triggering failed network requests or broken browser icons.
4. **Node 18+ Compatibility**: Nuxt build scripts execute with `NODE_OPTIONS=--openssl-legacy-provider`.
5. **Component Primitives**: Uses PrimeVue 2 functional UI primitives (`Dialog`, `InputText`, `Button`, `Dropdown`, `Skeleton`, `Badge`, `Tag`, `Tooltip`, `Toast`, `ScrollTop`, `ProgressSpinner`) styled with Tailwind CSS tokens and custom theme overrides.
6. **Port**: Default local development server runs on port 5173.
