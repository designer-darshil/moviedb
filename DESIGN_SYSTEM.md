# DESIGN_SYSTEM.md — CINEPULSE 2.0 Design System

## 1. Design Philosophy & Identity

**CINEPULSE 2.0** is an uncompromising, next-generation cinematic media discovery platform powered by Nuxt.js and The Movie Database (TMDb).

### Core Principles:

- **OLED Deep Canvas**: Pure cinematic dark foundation (`#060709`) where film photography, posters, and dynamic ambient lighting take center stage.
- **Widescreen Full-Bleed Composition**: Abandoned the legacy left-rail layout in favor of an expansive full-bleed canvas with a floating frosted-glass top navigation header on desktop and a thumb-accessible bottom dock on mobile.
- **Editorial Typography**: High-contrast, expressive typography featuring modern letter-spaced display headers, crisp body metrics, and tabular figures for ranking.
- **Interactive Multi-Item Hero**: Dynamic ambient backdrop switcher with interactive numbered ticker controls (`01` through `05`), live meta badges, and seamless trailer modal integration.
- **Ranked Top 10 Ribbons**: Stylized oversized ranking numbers (`1` to `10`) layered behind cards in trending carousels.
- **Command Palette Search**: Fast, keyboard-first modal overlay (`⌘K` / `Ctrl+K`) with instant query debouncing, media type filters, and trending quick tags.

---

## 2. Typography System

The application uses an optimized modern typographic stack with crisp letter-spacing and fluid scaling:

```scss
$base-font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Inter", "Outfit", Helvetica, Arial, sans-serif;
$font-display: "Cinzel", "Outfit", -apple-system, BlinkMacSystemFont, "Segoe UI", serif;
```

### Type Scale & Hierarchy

| Level / Component        | Desktop Size    | Mobile Size     | Weight | Line Height | Letter Spacing |
| ------------------------ | --------------- | --------------- | ------ | ----------- | -------------- |
| **Hero Display Title**   | 3.6rem – 5.2rem | 2.4rem – 3.2rem | 900    | 1.05        | `-0.03em`      |
| **Section Header**       | 2.2rem – 2.8rem | 1.8rem – 2.0rem | 800    | 1.15        | `-0.02em`      |
| **Section Tag / Kicker** | 1.1rem – 1.2rem | 1.0rem          | 700    | 1.0         | `0.15em`       |
| **Card Title**           | 1.4rem – 1.5rem | 1.3rem          | 600    | 1.3         | `-0.01em`      |
| **Body / Storyline**     | 1.5rem – 1.6rem | 1.4rem          | 400    | 1.65        | `0.01em`       |
| **Meta / Stat Labels**   | 1.1rem – 1.2rem | 1.0rem – 1.1rem | 600    | 1.3         | `0.08em`       |
| **Rank Number Display**  | 7.0rem – 9.0rem | 5.0rem – 6.5rem | 900    | 1.0         | `-0.05em`      |

---

## 3. Color Tokens & Theme

Defined in `assets/css/utilities/_variables.scss`:

### Surfaces & Backgrounds

- **Canvas Background**: `#060709` (`$base-background-color`)
- **Surface Level 1 (Card / Pill)**: `#0e1015` (`$surface-1`)
- **Surface Level 2 (Elevated / Panel)**: `#161920` (`$surface-2`)
- **Surface Level 3 (Hover / Border)**: `#222630` (`$surface-3`)
- **Glass Frosted Backdrop**: `rgba(6, 7, 9, 0.82)` with `backdrop-filter: blur(20px)`

### Accents & Highlights

- **Cinematic Gold Primary**: `#f59e0b` (`$accent-gold`)
- **Amber Light**: `#fbbf24` (`$accent-amber`)
- **Electric Cyan**: `#06b6d4` (`$accent-cyan`)
- **Sky Light**: `#38bdf8` (`$accent-cyan-light`)
- **Crimson Highlight**: `#ef4444` (`$accent-crimson`)
- **Star Rating Indicator**: `#f59e0b` (`$rating-star-color`)

### Foregrounds & Typography

- **Primary Text**: `#ffffff` (`$base-font-color`)
- **Secondary Text**: `#94a3b8` (`$base-font-color-muted`)
- **Tertiary / Subdued**: `#64748b` (`$text-tertiary`)
- **Border Subtle**: `rgba(255, 255, 255, 0.08)` (`$border-subtle`)
- **Border Highlight**: `rgba(245, 158, 11, 0.35)` (`$border-gold`)

---

## 4. TMDb Image Standards & Dimensions

TMDb image URLs are generated using verified production sizes to prevent HTTP 400 errors:

| Asset Type                   | TMDb Size       | Target Display               | Usage                              |
| ---------------------------- | --------------- | ---------------------------- | ---------------------------------- |
| **Movie / TV Posters**       | `w500`          | Card posters, detail posters | `getPosterUrl(path, 'w500')`       |
| **Person Profile**           | `h632`          | Cast items, person avatar    | `getProfileUrl(path, 'h632')`      |
| **Hero & Backdrops**         | `w1280`         | Hero backdrop banner         | `getBackdropUrl(path, 'w1280')`    |
| **Photo Gallery Thumbnails** | `w780` / `w500` | Backdrop & poster galleries  | `getBackdropUrl(path, 'w780')`     |
| **Episode Stills**           | `w300`          | TV season episode cards      | `getStillUrl(path, 'w300')`        |
| **Modal Lightbox**           | `original`      | Full-screen photo view       | `getBackdropUrl(path, 'original')` |

### Fallback Behavior:

When a poster, profile, or still path is missing from TMDb:
- The component displays an inline SVG media placeholder icon.
- `v-lazyload` does not attempt to request empty or invalid image strings.
- Network failures trigger `.lazyerror` which hides broken image frames cleanly.

---

## 5. Layout & Responsive Structure

### Grid & Spacing

- **Desktop Shell (`@media (min-width: 1024px)`)**:
  - Full-bleed content container.
  - Floating top navigation bar with `backdrop-filter: blur(24px)`.
  - Max container width of `1600px` for consistent readability on ultra-wide displays.
- **Mobile Bottom Nav (`@media (max-width: 1023px)`)**:
  - Floating glass dock anchored to viewport bottom with `padding-bottom: env(safe-area-inset-bottom)`.
  - 5 primary touch targets: Home, Movies, TV, Search, Charts.
- **Carousel Rail (`ListingCarousel.vue`)**:
  - Horizontal scroll container with native momentum snapping (`scroll-snap-type: x mandatory`).
  - Left and right chevron navigation buttons with subtle hover glow.
  - Optional `isRanked` mode displaying oversized typography numerals behind the first 10 posters.

---

## 6. Tailwind CSS Architecture (Standard Unprefixed)

The project has completely transitioned from custom scoped SCSS modules to a **Tailwind-First Styling System** utilizing standard Tailwind CSS v3 utility classes without any prefix.

### Standard Utility Conventions
- Standard Tailwind utilities are used directly across all components and pages (e.g., `flex`, `grid`, `p-4`, `text-white`).
- Responsive modifiers follow standard Tailwind syntax: `sm:*`, `md:*`, `lg:*`, `xl:*`, `2xl:*`.
- State variants follow standard syntax: `hover:*`, `focus:*`, `focus-visible:*`, `group-hover:*`.

### Tailwind Theme Tokens (`tailwind.config.js`)
- **Colors**:
  - `bg-surface-0` (`#07080b`), `bg-surface-1` (`#0e1117`), `bg-surface-2` (`#151922`), `bg-surface-3` (`#1e2430`)
  - `text-primary-amber` / `bg-primary-amber` (`#e5a93c`), `text-secondary-amber` (`#ff8a00`)
  - `text-text-primary` (`#f8fafc`), `text-text-secondary` (`#cbd5e1`), `text-text-muted` (`#94a3b8`), `text-text-subtle` (`#64748b`)
  - `border-border-subtle` (`rgba(255,255,255,0.07)`), `border-border-medium` (`rgba(255,255,255,0.14)`)
- **Typography**:
  - Display Font: `font-display` (`Inter`, `-apple-system`, `BlinkMacSystemFont`, `Segoe UI`, `Roboto`, sans-serif)
  - Body Font: `font-sans` (`Inter`, `-apple-system`, `BlinkMacSystemFont`, `Segoe UI`, `Roboto`, sans-serif)
- **Shadows**:
  - `shadow-cinema-sm`, `shadow-cinema-md`, `shadow-cinema-lg`, `shadow-glow`, `shadow-poster`


