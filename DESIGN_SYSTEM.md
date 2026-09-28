# DESIGN_SYSTEM.md — Cinematic Editorial Discovery

## 1. Design Philosophy & Character
The visual language of **vue-movies** is inspired by modern digital cinema archives, editorial film journals, and contemporary cultural platforms.

### Core Principles:
- **Cinematic & Immersive**: Dark-first canvas where poster photography and movie backdrops are the vibrant center of gravity.
- **Editorial & Restrained**: Confident typography, calm surfaces, and deliberate white space rather than dense SaaS dashboards or flashy neon badges.
- **Tactile & Responsive**: Subtle micro-transitions (under 250ms), smooth horizontal momentum scrolling, elegant image reveals, and visible focus states.
- **Content-First**: Interface elements frame and elevate TMDb media assets rather than competing with them.

---

## 2. Typography System
The typography uses **Inter** (loaded via Google Fonts) as the single primary typeface across the application.

```css
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```

### Type Scale & Hierarchy
| Token / Level | Desktop Size / Weight | Mobile Size / Weight | Usage |
|---|---|---|---|
| **Display** | 3.6rem – 4.8rem / 700–800 | 2.6rem – 3.2rem / 700 | Hero title, major cinematic moments |
| **Page Title** | 2.8rem – 3.2rem / 700 | 2.2rem – 2.4rem / 700 | Category browse headers, person names |
| **Section Title** | 1.8rem – 2.2rem / 600 | 1.6rem – 1.8rem / 600 | Rail titles, detail block titles ("Storyline", "Cast") |
| **Card Title** | 1.4rem – 1.5rem / 600 | 1.3rem / 600 | Media card headings, episode titles |
| **Body Large** | 1.6rem / 400 (line-height 1.65) | 1.5rem / 400 | Editorial overview / biography synopsis |
| **Body / Regular** | 1.4rem / 400 | 1.3rem / 400 | General stats, table items, footer notes |
| **Caption / Meta** | 1.2rem – 1.3rem / 500 | 1.1rem – 1.2rem / 500 | Release year, certification badges, runtime tags |

---

## 3. Color System & Design Tokens

### Base & Neutrals
- **Canvas / Background (`--bg-base`)**: `#0b0c0e` (Deep cinematic near-black)
- **Elevated Surface (`--bg-surface`)**: `#131518` (Cards, dropdowns, navigation rails)
- **Higher Surface (`--bg-surface-elevated`)**: `#1b1e23` (Hover states, dialog boxes, active items)
- **Subtle Border (`--border-subtle`)**: `rgba(255, 255, 255, 0.08)`
- **Prominent Border (`--border-prominent`)**: `rgba(255, 255, 255, 0.16)`

### Text & Foregrounds
- **Primary Text (`--text-primary`)**: `#f3f4f6` (High contrast, crisp legibility)
- **Secondary Text (`--text-secondary`)**: `#9ca3af` (Muted metadata, supporting labels)
- **Tertiary Text (`--text-muted`)**: `#6b7280` (Timestamps, counts, placeholders)

### Accent & Highlights
- **Cinematic Amber/Gold Accent (`--accent-primary`)**: `#e5a93c` (Warm film projector gold for ratings, active indicators, and primary highlights)
- **Accent Hover (`--accent-hover`)**: `#f3ba53`
- **Accent Muted Surface (`--accent-muted`)**: `rgba(229, 169, 60, 0.12)`
- **Rating Star Color**: `#e5a93c` (Vector SVG star rendering, no blurry raster PNGs)

---

## 4. Layout & Spacing System

### Spacing Scale
- `0.4rem` (4px) — micro gaps
- `0.8rem` (8px) — tight tag padding, compact gaps
- `1.2rem` (12px) — card metadata gap
- `1.6rem` (16px) — base container gutter on mobile
- `2.4rem` (24px) — section sub-spacing
- `3.2rem` (32px) — standard desktop container gutter
- `4.8rem` (48px) — inter-section vertical rhythm
- `6.4rem` (64px) — major page section separation

### Global Shell Metrics
- **Desktop Nav Rail Width**: `8.4rem` (84px) fixed on the left edge.
- **Mobile Bottom Nav Height**: `5.8rem` (58px) fixed on the bottom edge with `env(safe-area-inset-bottom)` allowance.
- **Max Editorial Width**: `1440px` with centered alignment on ultra-wide viewports.

---

## 5. Component Patterns

### 5.1 Media Card (`Card.vue`)
- Poster aspect ratio: `2:3` standard cinema ratio (`padding-top: 150%`).
- Clean image container with skeleton placeholder.
- **Desktop Hover**: Subtle `scale(1.03)` with soft upward elevation; crisp gradient veil at bottom.
- **Mobile**: Poster image, full title (never hidden on small screens), release year tag, and clean star badge with vote average.

### 5.2 Discovery Rail (`ListingCarousel.vue`)
- Header with Section Title + "Explore all →" link.
- Smooth horizontal trackpad/touch momentum scroll (`scroll-snap-type: x mandatory`).
- Floating minimal chevron controls that fade in on hover on desktop; natural finger flick on mobile.
- Cards peeking at screen edge to invite discovery.

### 5.3 Hero Banner (`Hero.vue`)
- Stable editorial feature: High-resolution backdrop on the right with a seamless multi-stop dark gradient fade to the left and bottom.
- Left column: Category tag, confident display title, year, certification pill, runtime, gold rating badge, synopsis, "Watch Trailer" trigger, and "More Details" button.

### 5.4 Command Search (`SearchForm.vue` & `SearchResults.vue`)
- Fullscreen or elevated search drawer with prominent input field.
- Auto-focus, debounce (250ms), Escape key listener.
- Category tabs or grouped suggestion chips (Trending Movies, Trending TV, Popular People).
- Results with media badges and thumbnail preview.
