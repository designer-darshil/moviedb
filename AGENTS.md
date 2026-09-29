# AGENTS.md

## Agent Operating Guidelines for vue-movies

This document specifies repository-specific rules, constraints, and operational protocols for any AI coding agent working in this codebase.

---

## 1. Project Context & Environment

- **Framework**: Nuxt.js 2.15.8 (Vue.js 2.7.10) configured with `target: 'static'` and `ssr: false`.
- **Node Environment**: Node.js 18+ (requires `NODE_OPTIONS=--openssl-legacy-provider` for Webpack 4 compilation on Node 17+).
- **Package Manager**: `yarn` is the canonical package manager. Do not mix with `npm` lockfiles.
- **Styling Architecture**: Tailwind CSS v3 with standard utility classes. Utility-first declarative styling with zero scoped SCSS modules in Vue components. Centralized tokens defined in `tailwind.config.js`.

---

## 2. Core Operational Constraints

1. **Preserve Core APIs and Data Contracts**:
   - Never alter the function signatures or response shapes of `api/index.js` (`getMovies`, `getMovie`, `getTrending`, `getTvShows`, `getTvShow`, `getPerson`, `search`, etc.).
   - Preserve all existing route definitions (`/`, `/movie`, `/movie/:id`, `/movie/category/:name`, `/tv`, `/tv/:id`, `/tv/category/:name`, `/person/:id`, `/search`, `/genre/:id/movie`, `/genre/:id/tv`).
2. **Never Break Node 18/24 Compatibility**:
   - Always run Nuxt build/generate scripts with `NODE_OPTIONS=--openssl-legacy-provider`.
3. **No Unnecessary Heavy Libraries**:
   - Do not install heavyweight component libraries (Vuetify, Element, Bootstrap). The UI is custom-crafted, lightweight, and cinematic.
4. **Accessible Semantics**:
   - Always provide accessible names (`aria-label`) on icon-only interactive controls (`button`, `a`).
   - Use semantic tags (`<nav>`, `<header>`, `<main>`, `<section>`, `<footer>`).
   - Ensure keyboard interactivity (Escape closes modals/search, Tab traps in dialogs, visible focus outlines).

---

## 3. Mandatory Commands

- **Install**: `yarn`
- **Development Server**: `yarn dev` (runs `NODE_OPTIONS=--openssl-legacy-provider nuxt --host --port 5173`)
- **Linting**: `yarn lint`
- **Production Build**: `yarn build`
- **Static Site Generation**: `yarn generate`
- **Vercel Deploy**: `npx vercel --prod --yes`

---

## 4. Documentation Governance Protocol

Every code modification must be checked against the 8 canonical documents (`PRD.md`, `AGENTS.md`, `DESIGN_SYSTEM.md`, `ARCHITECTURE.md`, `SECURITY.md`, `CODE_STYLE.md`, `TESTING.md`, `README.md`). If a feature, architecture, token, or command changes, synchronize the corresponding canonical documentation before considering the task complete.
