# TESTING.md — Testing Strategy & Quality Assurance

## 1. Quality Strategy

Because **vue-movies** is a media discovery client consuming live TMDb endpoints, testing focuses on:

1. **Static Analysis & Linting**: Ensuring zero syntax, formatting, or unused-variable violations.
2. **Build & Bundle Validation**: Verifying that Webpack 4 compiles client assets and server manifest without error.
3. **Static Generation Verification**: Ensuring `nuxt generate` properly creates all static routes, 404 fallbacks, and page assets without runtime script exceptions.
4. **Responsive & Visual QA**: Verifying presentation across defined viewports (320px through 1920px+).

---

## 2. Validation Commands

### 2.1 Code Quality & Linting

```bash
yarn lint
```

Executes ESLint and Prettier across all `.js` and `.vue` files. Must pass with zero errors.

### 2.2 Compilation Verification

```bash
yarn build
```

Validates complete client-side Webpack compilation and code splitting.

### 2.3 Static Route Generation

```bash
yarn generate
```

Validates that HTML is generated into `dist/` with valid asset hashes and routing fallback.

---

## 3. Viewport Testing Matrix

Every new or refactored component must be verified across the following viewports:

| Device Category      | Target Viewport Width                  | Key Verification Points                                              |
| -------------------- | -------------------------------------- | -------------------------------------------------------------------- |
| **Mobile Compact**   | `320px – 375px` (iPhone SE, mini)      | No horizontal overflow, card title readable, bottom nav fits 4 items |
| **Mobile Standard**  | `390px – 430px` (iPhone 14/15/Pro Max) | Comfortable thumb zones, legible hero metadata                       |
| **Tablet Portrait**  | `768px – 834px` (iPad Mini/Air)        | Grid switches to 3–4 columns, carousel controls accessible           |
| **Desktop Standard** | `1024px – 1440px` (MacBook / Laptops)  | Vertical navigation rail active, two-column hero composition         |
| **Large Displays**   | `1920px – 2560px` (Cinema Displays)    | Max container constraint, image scaling without distortion           |

---

## 4. Accessibility & Interaction Checklist

- [ ] Keyboard navigation: `Tab` moves through interactive items in natural visual order.
- [ ] Modals and search close cleanly on `Escape`.
- [ ] Icon-only buttons have descriptive `aria-label` attributes.
- [ ] Star ratings provide screen-reader text alongside numeric ratings.
- [ ] Focus outlines are crisp and visible against dark surfaces.
- [ ] Motion animations gracefully disable when `prefers-reduced-motion: reduce` is active.
