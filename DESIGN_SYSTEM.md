# DESIGN_SYSTEM.md — vue-movies Design System

## 1. Design Philosophy & Identity
**vue-movies** (created by Jason Ujma-Alvis) is a focused, media-centric web application for browsing movies, TV shows, and people powered by The Movie Database (TMDb).

### Core Principles:
- **Dark Cinematic Canvas**: Deep neutral dark canvas (`#0b0c0e`) where film posters and backdrop artwork take center stage.
- **Minimal Chrome, Maximum Content**: Interface navigation and controls stay out of the viewer's way using clean icon-based controls.
- **Responsive Navigation**: Left-aligned vertical navigation bar on desktop (10rem width) transitioning into a compact, thumb-accessible bottom bar (4.5rem height) on mobile and tablet devices.
- **Precise Typography**: Native system font stack for fast loading and crisp rendering across all operating systems.
- **Reliable Media Delivery**: Validated TMDb image size tokens (`w500`, `h632`, `w1280`, `w300`) with resilient lazy loading and graceful placeholder fallbacks.

---

## 2. Typography System

The application uses native system fonts for zero latency and native platform feel:

```scss
$base-font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
```

### Type Scale & Hierarchy
| Level / Component | Desktop Size | Mobile Size | Weight | Line Height |
|---|---|---|---|---|
| **Hero Title** | 3.6rem – 4.5rem | 2.4rem – 3.0rem | 700 | 1.1 |
| **Section Title** | 2.0rem – 2.4rem | 1.8rem | 600 | 1.2 |
| **Card Title** | 1.5rem | 1.3rem | 400 | 1.3 |
| **Body / Overview** | 1.5rem – 1.6rem | 1.4rem | 400 | 1.6 |
| **Meta / Stats** | 1.2rem – 1.4rem | 1.2rem | 400 | 1.4 |

---

## 3. Color Tokens & Theme

Defined in `assets/css/utilities/_variables.scss`:

### Surfaces & Backgrounds
- **Body Background**: `#0b0c0e` (`$base-background-color`)
- **Surface / Panel / Border**: `#202124` (`$base-panel-color`)
- **Overlay Scrim**: `rgba(0, 0, 0, 0.75)`

### Foregrounds & Typography
- **Primary Text**: `#ffffff` (`$base-font-color`)
- **Muted Text / Secondary**: `#80868b` (`$base-font-color-muted`)

### Accents & Highlights
- **Star Rating & Accent**: `#e5a93c`
- **Active Navigation Indicator**: `#2196f3` (Blue icon stroke for active links)

---

## 4. TMDb Image Standards & Dimensions

TMDb image URLs are generated using verified production sizes to prevent HTTP 400 errors:

| Asset Type | TMDb Size | Target Display | Usage |
|---|---|---|---|
| **Movie / TV Posters** | `w500` | Card posters, detail posters | `getPosterUrl(path, 'w500')` |
| **Person Profile** | `h632` | Cast items, person avatar | `getProfileUrl(path, 'h632')` |
| **Hero & Backdrops** | `w1280` | Hero backdrop banner | `getBackdropUrl(path, 'w1280')` |
| **Photo Gallery Thumbnails** | `w780` / `w500` | Backdrop & poster galleries | `getBackdropUrl(path, 'w780')` |
| **Episode Stills** | `w300` | TV season episode cards | `getStillUrl(path, 'w300')` |
| **Modal Lightbox** | `original` | Full-screen photo view | `getBackdropUrl(path, 'original')` |

### Fallback Behavior:
When a poster, profile, or still path is missing from TMDb:
- The component displays an inline SVG media placeholder icon.
- `v-lazyload` does not attempt to request empty or invalid image strings.
- Network failures trigger `.lazyerror` which hides broken image frames cleanly.

---

## 5. Layout & Responsive Structure

### Grid & Spacing
- **Sidebar Offset (`@media (min-width: 1200px)`)**: Main content margin-left is `10rem` to accommodate the left vertical navigation rail.
- **Mobile Bottom Nav (`@media (max-width: 1199px)`)**: Nav docks to bottom (`height: 4.5rem`, `z-index: 5`), content has padding-bottom.
- **Carousel Rail**: Horizontal scroll container with left/right arrow controls for smooth discovery.
