# Product Requirements Document (PRD)

## 1. Product Overview
**vue-movies** is a responsive web application for discovering movies, TV shows, and people, built with Nuxt.js (Vue 2) and powered by The Movie Database (TMDb) API. It provides users with a clean, cinematic catalogue to explore trending, popular, and top-rated media, watch trailers, view high-resolution photography, and inspect full cast/crew filmographies.

---

## 2. Product Goals
- **Intuitive Discovery**: Deliver fast, uncluttered browsing of cinema and television media.
- **Visual Faithfulness**: Preserve the original clean, dark visual design, iconic navigation sidebar, and media cards created by Jason Ujma-Alvis.
- **Robust Media Delivery**: Ensure all TMDb images (posters, backdrops, cast avatars, episode stills) load reliably across all pages without 400 Bad Request or 401 Unauthorized errors.
- **Fast Client Navigation**: Leverage Nuxt static generation and client-side routing with lazy-loaded media assets.

---

## 3. Core Features & Routes

### 3.1 Global Shell & Navigation
- **Desktop Sidebar (`Nav.vue`)**: Vertical sidebar on desktop (`10rem` width) with Home, Movies, TV Shows, and Search toggle buttons.
- **Mobile Bottom Nav**: Compact bottom navigation bar docked on screens `< 1200px`.
- **Search Slideout (`SearchForm.vue`)**: Full-screen slide-down search form with autocomplete and debounced query submission.
- **TopNav Header (`TopNav.vue`)**: Contextual top bar with back navigation arrow and page title.
- **Footer (`Footer.vue`)**: Attribution to TMDb and developer links.

### 3.2 Homepage (`/`)
- **Featured Hero (`Hero.vue`)**: Displays a randomly selected featured movie or TV show from today's trending list with backdrop, review count, rating stars, year, runtime/seasons, synopsis, and modal trailer player.
- **Trending Movies Carousel (`ListingCarousel.vue`)**: Horizontal scrollable rail of trending movies with "View All" link to `/movie/category/trending`.
- **Trending TV Shows Carousel (`ListingCarousel.vue`)**: Horizontal scrollable rail of trending TV shows with "View All" link to `/tv/category/trending`.

### 3.3 Movies (`/movie`, `/movie/:id`, `/movie/category/:name`)
- **Movie Hub (`/movie`)**: Featured hero plus horizontal carousels for Popular, Top Rated, Upcoming, and Now Playing movies.
- **Movie Detail (`/movie/:id`)**: Hero banner, tabbed media navigation (Overview, Videos, Photos), movie metadata (directors, release date, runtime, budget, revenue, genres), cast list with links to person profiles, and "More Like This" recommended carousel.
- **Movie Categories (`/movie/category/:name`)**: Infinite-scroll / paginated grid of movies in the selected category.

### 3.4 TV Shows (`/tv`, `/tv/:id`, `/tv/category/:name`)
- **TV Hub (`/tv`)**: Featured hero plus carousels for Popular, Top Rated, Currently Airing, and Airing Today shows.
- **TV Detail (`/tv/:id`)**: Hero banner, tabbed navigation (Overview, Episodes, Videos, Photos), creators, first air date, seasons, genres, cast credits, and recommended shows.
- **Episodes Browser (`Episodes.vue`)**: Season selector dropdown and episode list with episode still images, episode number, air date, and overview.

### 3.5 People (`/person/:id`)
- **Person Profile**: Large avatar, biography with expansion, birthday, place of birth, known for, photo gallery, and chronological credits history grouped by department.

### 3.6 Search (`/search?q=...`)
- **Search Results (`SearchResults.vue`)**: Unified paginated grid of movie, TV show, and person results matching query.

---

## 4. Technical & Quality Requirements
1. **API Authentication**: TMDb API requests must include a valid `api_key` query parameter loaded synchronously from environment variables.
2. **Image Sizing**: Only valid TMDb image dimensions (`w500`, `h632`, `w1280`, `w300`, `original`) must be requested. Legacy sizes (`w370_and_h556_bestv2`) are prohibited.
3. **Resilience**: Missing image paths fall back to inline SVG placeholders without triggering failed network requests or broken browser icons.
4. **Node 18+ Compatibility**: Nuxt build scripts execute with `NODE_OPTIONS=--openssl-legacy-provider`.
