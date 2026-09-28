# CODE_STYLE.md — Coding Conventions & Standards

## 1. Code Formatting & Linting

This project enforces consistent style via **ESLint** (`@nuxtjs/eslint-config`) and **Prettier**.

- **Indentation**: 2 spaces (no tabs).
- **Quotes**: Single quotes (`'`) for JavaScript strings; double quotes (`"`) for HTML/template attributes.
- **Semicolons**: Enforced by ESLint configuration (`semi: ['error', 'always']`).
- **Trailing Commas**: Mandatory for multiline object and array literals.
- **Component Naming**: Multi-word PascalCase for Single File Components (e.g., `ListingCarousel.vue`, `MediaNav.vue`, `MovieInfo.vue`).

---

## 2. Vue Component Structure

Every `.vue` Single File Component must follow this structural order:

```vue
<template>
  <div :class="$style.root">
    <!-- Template markup -->
  </div>
</template>

<script>
// 1. Imports
import { mapState } from "vuex";
import ComponentA from "~/components/ComponentA";

export default {
  // 2. Component Registration
  components: {
    ComponentA,
  },

  // 3. Mixins
  mixins: [],

  // 4. Props (Always type-checked and validated)
  props: {
    item: {
      type: Object,
      required: true,
    },
  },

  // 5. Reactive Data
  data() {
    return {
      isOpen: false,
    };
  },

  // 6. Computed Properties
  computed: {
    ...mapState("search", ["searchOpen"]),
  },

  // 7. Lifecycle Hooks (mounted, created, beforeDestroy)
  mounted() {
    // Event listeners
  },

  beforeDestroy() {
    // Teardown event listeners
  },

  // 8. Methods
  methods: {
    handleClick() {
      // Logic
    },
  },
};
</script>

<style lang="scss" module>
// Component-scoped styles via CSS Modules
</style>
```

---

## 3. CSS & Styling Conventions

- **CSS Modules**: Prefer `<style lang="scss" module>` for component-specific styles to avoid global style leakage and collision.
- **Design Tokens**: Always use centralized tokens from `assets/css/utilities/_variables.scss` or CSS variables (`var(--bg-base)`, `var(--text-primary)`, etc.).
- **Typography Units**: The project uses `1rem = 10px` root scale (`html { font-size: 62.5%; }`). Use `rem` for font sizes and layout margins.
- **Media Queries**: Use defined breakpoint variables (`$breakpoint-small`, `$breakpoint-medium`, `$breakpoint-large`) for consistency across viewports.

---

## 4. Lint & Formatting Commands

```bash
# Check code formatting and linting
yarn lint

# Automatically fix linting and prettier errors
yarn lintfix
```
