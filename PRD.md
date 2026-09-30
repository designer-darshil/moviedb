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

- **Quiet Header (`Nav.vue`)**: Compact, unobtrusive header (`h-14` / `h-16`) on desktop featuring CINEPULSE brand emblem, clean navigation links (Discover, Movies, TV Series), and a subtle command palette search trigger (`⌘K`).
- **Mobile Bottom Dock**: Thumb-friendly floating dock on mobile viewports with safe-area inset support (Discover, Movies, TV, Search).
- **Command Palette Search (`SearchForm.vue`)**: Keyboard-driven modal search overlay with instant debounced queries, ESC dismissal, and trending quick tags.
- **Footer (`Footer.vue`)**: Brand statement, directory links (cinema, television, genres), legal disclaimer, and TMDb attribution.

### 3.2 Homepage (`/`)

- **Atmospheric Editorial Hero (`Hero.vue`)**: Multi-item hero with w1280 backdrop, multi-directional dark scrims, high-impact typography, metadata specs (rating, year, runtime, genres, cert), synopsis, trailer modal playback, and interactive featured-item indicators.
- **Trending Discovery Rail (`ListingCarousel.vue`)**: Smooth horizontal snap-scrolling rail with ranked badges (1 to 10) and understated chevron navigation controls.
- **Editorial Spotlight (`EditorialSpotlight.vue`)**: Asymmetric curated showcase with dominant 7-column cinematic feature card and supporting 5-column stack of titles.
- **Acclaimed Television Rail**: Curated television series rail.
- **Explore The Catalog (`Listing.vue`)**: Clean poster-first grid with category switcher tabs (Popular, Top Rated, Upcoming) adapting from 2 to 6 columns.

### 3.3 Movies (`/movie`, `/movie/:id`, `/movie/category/:name`)

- **Movie Hub (`/movie`)**: Featured spotlight hero, quick category switcher tabs (Popular, Top Rated, Upcoming, Now Playing), and horizontal carousels.
- **Movie Detail (`/movie/:id`)**: Full-width cinematic backdrop, massive editorial title, specs, overview, action buttons (Watch Trailer, Official Site, Share), floating poster artwork overlapping hero atmosphere, production intelligence grid (directors, release date, runtime, status, budget, box office multiplier, language, companies, external references), media switcher (Overview, Videos, Photos), cast carousel, and similar titles rail.
- **Movie Categories (`/movie/category/:name`)**: Category pill switcher, breadcrumb navigation, and infinite-scroll poster grid.

### 3.4 TV Shows (`/tv`, `/tv/:id`, `/tv/category/:name`)

- **TV Hub (`/tv`)**: Series spotlight hero, category switcher (Popular, Top Rated, Currently Airing, Airing Today), and horizontal carousels.
- **TV Detail (`/tv/:id`)**: Full-width backdrop, series title, specs, overview, actions, floating poster, production intelligence card (creators, premiere date, status, language, networks, companies, external references), media switcher (Overview, Episodes, Videos, Photos), cast carousel, and similar series rail.
- **Episodes Browser (`Episodes.vue`)**: Season selector dropdown and episode list with episode stills, air dates, and overviews.

### 3.5 People (`/person/:id`)

- **Person Profile**: Large portrait avatar, department badge, biographical narrative with expand/collapse, personal details grid, photo gallery, and chronological credits history grouped by department.

### 3.6 Search (`/search?q=...`)

- **Universal Search Destination (`pages/search/index.vue`)**: Large focused search input, trending search pills, trending exploration grid for empty states, multi-type filter tabs (All, Movies, TV, People), sort options (Relevance, Highest Rated, Newest), and responsive poster grid.

---

## 4. Technical & Quality Requirements

1. **API Authentication**: TMDb API requests include a valid `api_key` query parameter loaded synchronously from environment variables.
2. **Image Sizing**: Only valid TMDb image dimensions (`w500`, `h632`, `w1280`, `w300`, `original`) are requested.
3. **Resilience**: Missing image paths fall back to inline SVG placeholders without triggering failed network requests or broken browser icons.
4. **Node 18+ Compatibility**: Nuxt build scripts execute with `NODE_OPTIONS=--openssl-legacy-provider`.
5. **Component Primitives**: Uses PrimeVue 2 functional UI primitives (`Dialog`, `InputText`, `Button`, `Dropdown`, `Skeleton`, `Badge`, `Tag`, `Tooltip`, `Toast`, `ScrollTop`, `ProgressSpinner`) styled with Tailwind CSS tokens and custom theme overrides.
6. **Port**: Default local development server runs on port 5173.
