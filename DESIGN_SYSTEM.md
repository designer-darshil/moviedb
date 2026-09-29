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
$font-family--sans-serif: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI',
  Roboto, sans-serif;
```

### Type Scale & Hierarchy

| Level / Component      | Desktop Size     | Mobile Size     | Weight | Line Height | Description                       |
| ---------------------- | ---------------- | --------------- | ------ | ----------- | --------------------------------- |
| **Hero Display Title** | 3.2rem – 4.4rem  | 2.4rem – 3.2rem | 800    | 1.1         | Primary spotlight headline        |
| **Section Header**     | 2.0rem – 2.4rem  | 1.8rem – 2.0rem | 700    | 1.2         | Content rail and grid headings    |
| **Card Title**         | 1.35rem          | 1.25rem         | 500    | 1.3         | Single-line truncated card title  |
| **Card Meta**          | 1.15rem – 1.2rem | 1.1rem          | 400    | 1.3         | Release year, media type, rating  |
| **Body / Storyline**   | 1.5rem           | 1.4rem          | 400    | 1.6         | Legible, comfortable reading line |
| **Badge / Kicker**     | 1.1rem – 1.2rem  | 1.0rem          | 600    | 1.0         | Uppercase section indicators      |

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

| Asset Type                  | TMDb Size  | Target Display               | Helper Function                 |
| --------------------------- | ---------- | ---------------------------- | ------------------------------- |
| **Movie / TV Posters**      | `w500`     | Card posters, detail posters | `getPosterUrl(path, 'w500')`    |
| **Person Profile**          | `h632`     | Cast items, person avatar    | `getProfileUrl(path, 'h632')`   |
| **Hero & Backdrops**        | `w1280`    | Hero backdrop banner         | `getBackdropUrl(path, 'w1280')` |
| **Gallery Backdrop Thumbs** | `w780`     | Photo gallery preview        | `getBackdropUrl(path, 'w780')`  |
| **TV Episode Stills**       | `w300`     | Episode cards                | `getStillUrl(path, 'w300')`     |
| **Modal Fullscreen Photos** | `original` | Photo lightbox               | `getImageUrl(path, 'original')` |

---

## 5. Component Standards

- **`Card.vue`**: Strictly poster-first, `pt-[150%]` 2:3 aspect ratio, uncluttered poster surface with subtle hover scaling (`scale-[1.04]`), dark atmospheric vignette overlay, subtle "Explore" action indicator, and optional rank badges for ranked rails. Clean truncated title and `Year · Rating` subline below the poster.
- **`Hero.vue`**: Atmospheric backdrop banner with multi-directional dark gradient scrims, high-impact editorial title, metadata specs (rating with golden star, year, runtime, genres, certification), synopsis, "Watch Trailer" and "Explore Movie" action buttons, interactive featured item indicators, and embedded YouTube trailer modal.
- **`EditorialSpotlight.vue`**: Asymmetric curated showcase creating visual rhythm on the homepage. Left side features a 7-column standout cinematic backdrop card with editorial review snippet and primary action; right side features a 5-column stack of supporting curated titles with backdrop thumbnails and metadata.
- **`ListingCarousel.vue`**: Minimal section header, smooth horizontal snap rail, compact chevron arrows, and numbered ranking support.
- **`Listing.vue`**: Clean responsive grid (`grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6`) with infinite scroll loading.
- **Movie & TV Details (`pages/movie/_id.vue`, `pages/tv/_id.vue`)**: Reimagined vertical and asymmetric editorial flow:
  1. Full-width cinematic backdrop with multi-directional dark atmospheric gradients.
  2. Hero title in massive display typography, specs (year, runtime, rating, genres, cert), overview, and action buttons ("Watch Trailer", "Official Site").
  3. Asymmetric lower section with floating high-res poster artwork overlapping the hero atmosphere paired with comprehensive production & release details (director, status, release date, box office, budget, language, companies, external links).
  4. Media switcher (Overview, Videos, Photos, Episodes) followed by cast carousel and similar titles rail.
- **`pages/search/index.vue`**: First-class discovery destination with large, focused search input, quick trending search pills, trending exploration grid for empty states, instant multi-type filter tabs (All, Movies, TV, People), sort options (Relevance, Highest Rated, Newest), and clean poster grid.
- **`SearchForm.vue`**: Quick-access modal dialog triggered via keyboard shortcut (`⌘K` or `/`) with auto-focus, ESC trigger, clear button, and trending query tags.

---

## 6. UI Primitives Library (`components/ui/`)

Reusable, composable base components used across the application:

| Component                 | Purpose                                                                                                                                                                            |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`Button.vue`**          | Multi-variant button (`primary`, `secondary`, `ghost`, `danger`), three sizes (`sm`, `md`, `lg`), loading spinner state, polymorphic rendering (`<button>`, `<nuxt-link>`, `<a>`). |
| **`Badge.vue`**           | Semantic label tags with color variants (`default`, `success`, `warning`, `danger`, `info`) and optional pulsing dot indicator.                                                    |
| **`RatingBadge.vue`**     | Accessible star-icon rating display with formatted numeric score and screen-reader text.                                                                                           |
| **`EmptyState.vue`**      | High-contrast empty state card with icon slot, title, description, and optional action slot.                                                                                       |
| **`LoadingSkeleton.vue`** | Configurable pulse-shimmer placeholder for cards, heroes, and list rows. Variants: `card`, `hero`, `text`, `avatar`.                                                               |

---

## 7. Elevation & Shadow Tokens

Extended shadow tokens configured in `tailwind.config.js`:

| Token       | Value                                  | Usage                             |
| ----------- | -------------------------------------- | --------------------------------- |
| `glow-lg`   | `0 0 40px rgba(229, 169, 60, 0.15)`    | Primary amber glow on hover/focus |
| `cinema-xl` | `0 25px 60px -12px rgba(0, 0, 0, 0.5)` | Hero and spotlight card elevation |
| `poster`    | `0 8px 30px rgba(0, 0, 0, 0.4)`        | Floating poster artwork           |

### Shimmer Animation

A `shimmer` keyframe animation is registered for skeleton loading states:

```js
// tailwind.config.js
keyframes: {
  shimmer: {
    '0%': { backgroundPosition: '-200% 0' },
    '100%': { backgroundPosition: '200% 0' },
  },
},
animation: {
  shimmer: 'shimmer 1.5s ease-in-out infinite',
},
```

---

## 8. PrimeVue Component Foundation & Customization

The application uses **PrimeVue 2** as its functional UI primitive library, configured with **Tailwind CSS v3** for layout, spacing, typography, and responsive composition. All PrimeVue default appearances are heavily customized via `assets/css/primevue-custom.scss` to ensure the UI feels like a bespoke luxury cinema product:

| PrimeVue Component    | Role in Product                                                                                        | Customization & Styling                                                                                                                                 |
| --------------------- | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`Dialog`**          | Video trailers, photo gallery lightbox, command-palette search overlay (`SearchForm.vue`, `Modal.vue`) | Deep blur mask (`rgba(7, 8, 11, 0.9)`), rounded-2xl container (`#0e1117`), zero standard dialog header, cinema-xl shadows, accessible ESC & focus trap. |
| **`InputText`**       | Modal search input, Universal Search page query field                                                  | Frameless dark input (`#151922`), crisp typography, golden focus ring (`rgba(229, 169, 60, 0.4)`).                                                      |
| **`Button`**          | Hero actions, modal controls, carousel chevrons, interactive triggers                                  | Golden amber primary (`#e5a93c`), dark surface secondary (`#151922`), ghost text buttons, smooth ripple transitions.                                    |
| **`Dropdown`**        | Television season selector in `Episodes.vue`, search sort picker in `pages/search/index.vue`           | Frosted dark panel, golden selected highlights, rounded-xl borders matching design system.                                                              |
| **`Skeleton`**        | Shimmer loading states for movie cards, heroes, and episode rows                                       | Dark surface shimmer (`#151922` to `#1e2430`) with smooth pulse animation.                                                                              |
| **`Badge` & `Tag`**   | Top 10 rank numbers, certifications, media type chips, department labels                               | Restrained amber badge (`cinema-badge-amber`), muted dark badge (`cinema-badge-neutral`).                                                               |
| **`Tooltip`**         | Accessible action helpers (`⌘K` shortcut, rating details)                                              | Minimal dark surface tooltip with crisp Inter typography.                                                                                               |
| **`Toast`**           | Action confirmations (e.g. copied share links)                                                         | Floating glass notification with golden amber accent icons.                                                                                             |
| **`ScrollTop`**       | Catalog floating back-to-top control                                                                   | Rounded-full dark floating trigger with golden chevron.                                                                                                 |
| **`ProgressSpinner`** | Infinite scroll and search pagination loading                                                          | Golden amber animated spinner.                                                                                                                          |
