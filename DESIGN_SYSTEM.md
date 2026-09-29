# DESIGN_SYSTEM.md — CINEPULSE Design System

## 1. Design Philosophy & Identity

**CINEPULSE** is a clean, minimal, cinematic movie discovery product built with Nuxt.js and powered by The Movie Database (TMDb).

### Core Principles:

- **Minimal & Dark**: Restrained dark neutral foundation (`#07080b`) where movie posters and film photography provide the visual richness.
- **Content-First & Poster-Focused**: Eliminates unnecessary SaaS widgets, huge gradients, rainbow buttons, and giant decorative rankings. The movie posters, titles, and ratings are the stars.
- **Quiet Header**: Compact, unobtrusive header (`h-14` / `h-16`) with minimalist brand mark, clean navigation links, and a subtle `⌘K` search shortcut. On mobile, a clean bottom dock provides intuitive thumb-reach navigation.
- **Atmospheric Hero**: Restrained backdrop banner with gentle cinematic gradient fade into the dark canvas, clean typography, essential metadata (year, runtime, rating), and clear actions ("Watch Trailer", "More Details").
- **Poster-First Cards**: Fixed 2:3 aspect ratio (`aspect-[2/3]`), subtle hover interaction (`scale-[1.03]`, gentle shadow), and clean metadata display (`Title`, `Year · Type`, rating star).
- **Responsive Rails & Grids**: Smooth horizontal snap-scrolling rails with understated scroll chevrons; responsive grids adapting cleanly from 2 columns on mobile to 6 columns on desktop.
- **Subtle Micro-Animations**: Fast, smooth, restrained transitions without bounce, rotation, or distracting decorative movement.

---

## 2. Typography System

The application uses an optimized Inter sans-serif stack:

```scss
$font-family--sans-serif: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
```

### Type Scale & Hierarchy

| Level / Component        | Desktop Size    | Mobile Size     | Weight | Line Height | Description |
| ------------------------ | --------------- | --------------- | ------ | ----------- | ----------- |
| **Hero Display Title**   | 3.2rem – 4.4rem | 2.4rem – 3.2rem | 800    | 1.1         | Primary spotlight headline |
| **Section Header**       | 2.0rem – 2.4rem | 1.8rem – 2.0rem | 700    | 1.2         | Content rail and grid headings |
| **Card Title**           | 1.35rem         | 1.25rem         | 500    | 1.3         | Single-line truncated card title |
| **Card Meta**            | 1.15rem – 1.2rem| 1.1rem          | 400    | 1.3         | Release year, media type, rating |
| **Body / Storyline**     | 1.5rem          | 1.4rem          | 400    | 1.6         | Legible, comfortable reading line |
| **Badge / Kicker**       | 1.1rem – 1.2rem | 1.0rem          | 600    | 1.0         | Uppercase section indicators |

---

## 3. Color Tokens & Theme

Configured in `tailwind.config.js` and `assets/css/utilities/_variables.scss`:

### Surfaces & Backgrounds

- **Canvas Background (`base-bg`)**: `#07080b` (Deep cinematic dark)
- **Surface Level 1 (`surface-1`)**: `#0e1117` (Panels, footer, detail cards)
- **Surface Level 2 (`surface-2`)**: `#151922` (Card posters, controls, inputs)
- **Surface Level 3 (`surface-3`)**: `#1e2430` (Active states, elevated hover)
- **Surface Level 4 (`surface-4`)**: `#283040` (Segmented controls, flyouts)

### Primary Accent

- **Primary Amber (`primary-amber`)**: `#e5a93c` (Single restrained warm amber accent for ratings, primary buttons, and active indicators)
- **Primary Hover (`primary-hover`)**: `#f5b748`
- **Primary Active (`primary-active`)**: `#d49528`

### Foregrounds & Typography

- **Text Primary (`text-primary`)**: `#f8fafc` (Headlines, titles, white text)
- **Text Secondary (`text-secondary`)**: `#cbd5e1` (Body text, synopsis, secondary labels)
- **Text Muted (`text-muted`)**: `#94a3b8` (Metadata, counts, inactive links)
- **Text Subtle (`text-subtle`)**: `#64748b` (Timestamps, labels, placeholders)
- **Border Subtle (`border-subtle`)**: `rgba(255, 255, 255, 0.07)`
- **Border Medium (`border-medium`)**: `rgba(255, 255, 255, 0.14)`

---

## 4. TMDb Image Standards & Dimensions

TMDb image URLs are generated using verified production sizes to prevent HTTP 400 errors:

| Asset Type                   | TMDb Size       | Target Display               | Helper Function                    |
| ---------------------------- | --------------- | ---------------------------- | ---------------------------------- |
| **Movie / TV Posters**       | `w500`          | Card posters, detail posters | `getPosterUrl(path, 'w500')`       |
| **Person Profile**           | `h632`          | Cast items, person avatar    | `getProfileUrl(path, 'h632')`      |
| **Hero & Backdrops**         | `w1280`         | Hero backdrop banner         | `getBackdropUrl(path, 'w1280')`    |
| **Gallery Backdrop Thumbs**  | `w780`          | Photo gallery preview        | `getBackdropUrl(path, 'w780')`     |
| **TV Episode Stills**        | `w300`          | Episode cards                | `getStillUrl(path, 'w300')`        |
| **Modal Fullscreen Photos**  | `original`      | Photo lightbox               | `getImageUrl(path, 'original')`    |

---

## 5. Component Standards

- **`Card.vue`**: Strictly poster-first, `pt-[150%]` 2:3 aspect ratio, uncluttered poster surface (zero intrusive overlay badges), subtle hover scaling and brightness lift (`group-hover:scale-[1.03] group-hover:brightness-105`), clean truncated title and `Year · Rating` metadata below the poster.
- **`Hero.vue`**: Atmospheric backdrop banner with fade scrims, clean title, metadata specs (rating, year, runtime, genres), synopsis, "Watch Trailer" button, and modal player.
- **`ListingCarousel.vue`**: Minimal section header, smooth horizontal snap rail, compact chevron arrows.
- **`Listing.vue`**: Clean responsive grid (`grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6`) with infinite scroll loading.
- **Movie & TV Details (`pages/movie/_id.vue`, `pages/tv/_id.vue`)**: Unified cinematic layout featuring full-width backdrop fading naturally into the dark canvas, prominent poster alongside title, rating, year, runtime, genres, description, "Watch Trailer" primary action, details grid, cast rail, media tabs, and similar movies rail.
- **`SearchForm.vue`**: Fast, simple modal dialog with auto-focus, ESC trigger, clear button, and trending query tags.
