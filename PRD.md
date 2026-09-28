# Product Requirements Document (PRD)

## 1. Product Overview
**vue-movies** is a cinematic, editorial digital movie and television discovery platform powered by [The Movie Database (TMDb)](https://developers.themoviedb.org/3) API. The application serves film enthusiasts and casual viewers looking to discover, explore, and research movies, TV series, actors, and filmmakers through a contemporary, typography-led, content-first interface.

---

## 2. Product Goals & Vision
- **Cinematic & Editorial Experience**: Move beyond dashboard-like grids or generic streaming clones into an immersive film catalogue with elegant typography, controlled negative space, and evocative media presentation.
- **Content-First Discovery**: Prioritize film artwork, photography, synopses, and filmography over decorative UI noise.
- **Superior Usability & Accessibility**: Provide instant search with live categorized suggestions, thumb-friendly mobile navigation, readable metadata, semantic HTML, and full keyboard/touch support.
- **High Performance**: Maintain instant client-side transitions, smooth horizontal media rails, responsive image lazy loading, and lightweight skeletons.

---

## 3. Core Personas
1. **The Casual Browser**: Wants to quickly see what is trending today or this week, watch a trailer, and check ratings before picking something to watch.
2. **The Film Enthusiast / Cinephile**: Explores deep filmographies, directors, release details, genres, ratings, box office statistics, and high-resolution photo galleries.
3. **The Mobile Explorer**: Browses movies on a phone during commute or on the couch; needs thumb-friendly navigation, readable poster cards that never hide titles, and fast-loading media.

---

## 4. Key Functional Requirements

### 4.1 Global Navigation & Shell
- **Desktop Rail**: Compact vertical navigation rail with recognizable brand mark, labeled/icon navigation items (Home, Movies, TV Shows, Search), active indicators, and keyboard accessibility.
- **Mobile Bottom Bar**: Fixed, thumb-friendly bottom navigation bar with safe-area spacing that never obscures content.
- **Back Header (TopNav)**: Mobile contextual navigation header with clean back action and truncated title.
- **Footer**: Refined, product-focused footer featuring brand mark, links, TMDb attribution, and legal/privacy links.

### 4.2 Home Experience (`/`)
- **Editorial Hero**: Stable, intentional feature showcase (not random flicker on reload) displaying media tag, title, year, runtime/seasons, star/numerical rating, genres, synopsis, and direct "Watch Trailer" / "Explore Details" actions.
- **Discovery Rails**:
  - Trending Now (Weekly popular across movies and TV)
  - Curated Movies (Popular, Top Rated, Now Playing)
  - Curated TV Series (Popular, Top Rated, On Air)
  - Genre Quick Browse (Interactive genre tags linking directly to genre collections)

### 4.3 Movie Experience (`/movie`, `/movie/:id`, `/movie/category/:name`)
- **Movie Hub (`/movie`)**: Hero feature + categorized horizontal discovery rails (Popular, Top Rated, Upcoming, Now Playing) with "View all" links.
- **Movie Detail (`/movie/:id`)**:
  - Two-layer cinematic hero with high-res backdrop gradient, poster, key metadata (year, runtime, certification, rating, vote count), and trailer trigger.
  - Section Navigation (`MediaNav`): Overview, Videos, Photos.
  - Overview Tab: Editorial storyline, detailed metadata grid (Release date, Director, Budget, Revenue, Genre, Status, Language, Production companies), Cast rail, External IDs (IMDb, Twitter, Facebook, Instagram, Homepage).
  - Videos Tab: Filterable video gallery with duration badges and embedded modal playback.
  - Photos Tab: High-resolution backdrops and posters with responsive lightbox.
  - Recommendations: "More Like This" carousel.
- **Category Browse (`/movie/category/:name`)**: Infinite-scrolling responsive media grid with page title, count, and skeleton loading.

### 4.4 TV Show Experience (`/tv`, `/tv/:id`, `/tv/category/:name`)
- **TV Hub (`/tv`)**: Hero feature + categorized rails (Popular, Top Rated, On The Air, Airing Today).
- **TV Detail (`/tv/:id`)**:
  - Hero with first air year, season count, rating, network, and trailer trigger.
  - Section Navigation: Overview, Episodes, Videos, Photos.
  - Episodes Tab: Season selector dropdown with comprehensive episode list (still photo, episode number, title, overview, air date).
  - Cast rail, external links, and recommendations carousel.
- **Category Browse (`/tv/category/:name`)**: Infinite-scrolling media grid.

### 4.5 Person & Filmmaker Experience (`/person/:id`)
- **Editorial Profile**: Portrait artwork, full name, department, biography with structured paragraph formatting, birthday, age, place of birth, deathday (if applicable), and external social links.
- **Section Navigation**: Known For, Credits, Photos.
- **Known For Rail**: Top-billed films and shows sorted by popularity/vote count.
- **Filmography / Credits History**: Department-grouped, chronological table with media filters (All, Movies, TV).

### 4.6 Command-Style Discovery Search (`/search?q=`)
- **Modal / Overlay Launcher**: Instant keyboard shortcut support (`/` or click), smooth entry animation, clear button.
- **Discovery State (Empty Query)**: Quick suggestions (Trending Movies, Trending TV, Popular People) so the user is never faced with a blank canvas.
- **Typing / Live Results**: Debounced real-time query display with media badges (`Movie`, `TV`, `Person`), high-contrast titles, year, and direct navigation.
- **Full Results Page**: Dedicated route `/search?q=...` supporting infinite scrolling and graceful zero-results feedback ("You've searched beyond the catalogue").

### 4.7 Lightbox & Media Playback
- **Trailer Player**: Modal with responsive 16:9 YouTube embed, keyboard trap, Escape-to-close, and backdrop dismissal.
- **Photo Viewer**: Fullscreen lightbox with previous/next controls, keyboard navigation (left/right arrows, Escape), count indicator, and swipe support.

---

## 5. Non-Functional Requirements
- **Responsive Breakpoints**: Seamless experience across 320px, 375px, 430px, 768px, 1024px, 1280px, 1440px, and 1920px+.
- **Accessibility**: Semantic elements (`<main>`, `<nav>`, `<header>`, `<footer>`, `<dialog>`), visible focus rings, ARIA labels on icon buttons, WCAG AA contrast.
- **SEO & Social Sharing**: Complete OpenGraph, Twitter Cards, meta descriptions, and dynamic page titles across all routes.
- **Bundle & Performance**: Lazy loading on all poster and backdrop images, CSS transitions under 300ms, respects `prefers-reduced-motion`.
