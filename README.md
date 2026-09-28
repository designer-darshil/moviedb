# moviedb — Cinematic Movie & TV Discovery Platform

A modern, cinematic digital film catalogue and discovery platform powered by [The Movie Database (TMDb)](https://developers.themoviedb.org/3) API. Built with **Vue.js**, **Nuxt.js**, and an editorial, dark-first design system.

---

## 🌟 Highlights & Features

- **Cinematic Discovery Experience**: Immersive dark-mode editorial layout celebrating movie photography, poster art, and cinema culture.
- **Editorial Hero Showcases**: High-resolution backdrop art, curated key metadata, synopses, and instant trailer playback.
- **Responsive Media Rails & Grids**: Fluid touch and trackpad momentum scrolling with minimal navigation controls and graceful fallback states.
- **Comprehensive Catalog Details**:
  - **Movies**: Overview, storyline, box office stats, directors, cast rails, video trailers, and high-res photo galleries.
  - **TV Shows**: Season & episode guides, networks, creators, and recommendations.
  - **Filmmakers & Actors**: Editorial biographies, age, filmography credits table, and curated "Known For" highlights.
- **Command-Style Instant Search**: Quick search overlay with trending suggestions and categorized real-time results.
- **Accessible & Responsive**: Fully responsive from 320px mobile to ultra-wide cinema displays; keyboard accessible with semantic HTML.

---

## 🚀 Quick Setup

### 1. Prerequisites

- Node.js 18+ (tested up to Node 24)
- Yarn package manager

### 2. Configuration

Copy the sample environment file and provide your API keys:

```bash
cp .env.sample .env
```

Fill in the following values in `.env`:

```env
FRONTEND_URL=http://localhost:3000
API_KEY=your_tmdb_api_key_here
API_LANG=en-US
API_COUNTRY=US
API_YOUTUBE_KEY=your_optional_youtube_key
```

### 3. Install & Run

```bash
# Install dependencies
yarn

# Start local dev server (http://localhost:3000)
yarn dev
```

---

## 🛠️ Build & Deployment

```bash
# Lint & format check
yarn lint

# Build production bundle
yarn build

# Generate static distribution (/dist)
yarn generate
```

This application is optimized for zero-config deployment on **Vercel** with the included `vercel.json`.

---

## 📄 Canonical Governance Documents

- [PRD.md](PRD.md) — Product Requirements Document
- [AGENTS.md](AGENTS.md) — Agent operating rules and commands
- [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) — Tokens, typography, and styling guidelines
- [ARCHITECTURE.md](ARCHITECTURE.md) — System architecture and component tree
- [SECURITY.md](SECURITY.md) — API key protection and embed security
- [CODE_STYLE.md](CODE_STYLE.md) — Linting and formatting conventions
- [TESTING.md](TESTING.md) — QA checklist and testing matrix

---

## ⚖️ License & Attribution

- Licensed under the [MIT License](LICENSE).
- Film data and artwork provided by [The Movie Database (TMDb)](https://www.themoviedb.org/). This product uses the TMDb API but is not endorsed or certified by TMDb.
