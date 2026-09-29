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
  <div class="tw-relative tw-p-4 tw-bg-surface-1 tw-rounded-2xl">
    <!-- Template markup with tw- utility classes -->
  </div>
</template>

<script>
// 1. Imports
import { mapState } from 'vuex';
import ComponentA from '~/components/ComponentA';

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
  data () {
    return {
      isOpen: false,
    };
  },

  // 6. Computed Properties
  computed: {
    ...mapState('search', ['searchOpen']),
  },

  // 7. Lifecycle Hooks (mounted, created, beforeDestroy)
  mounted () {
    // Event listeners
  },

  beforeDestroy () {
    // Teardown event listeners
  },

  // 8. Methods
  methods: {
    handleClick () {
      // Logic
    },
  },
};
</script>
```

---

## 3. CSS & Styling Conventions (Tailwind-First)

- **Tailwind-First Policy**: All UI layout, spacing, typography, colors, and responsive behavior are implemented using Tailwind CSS utilities.
- **Mandatory `tw-` Prefix**: Every Tailwind class must include the `tw-` prefix (e.g. `tw-flex`, `tw-grid`, `tw-p-4`, `tw-text-white`). Unprefixed utilities are not permitted.
- **No Component `<style>` Blocks**: Vue components should avoid `<style>` and `<style scoped/module>` blocks. Style components declaratively using Tailwind classes.
- **Global Design Tokens**: Tokens are defined in `tailwind.config.js` (colors: `surface-0` through `surface-3`, `primary-amber`, `secondary-amber`, `border-subtle`, `border-medium`).
- **Responsive Variants**: Use Tailwind responsive modifiers: `sm:tw-*`, `md:tw-*`, `lg:tw-*`, `xl:tw-*`.
- **Interaction Variants**: Use Tailwind interaction modifiers: `hover:tw-*`, `focus:tw-*`, `focus-visible:tw-*`, `group-hover:tw-*`.
- **Global Resets**: Base document resets, dark scrollbars, and page transitions reside in `assets/css/base/` and `assets/css/tailwind.css`.

---

## 4. Lint & Formatting Commands

```bash
# Check code formatting and linting
yarn lint:js

# Automatically fix linting errors
yarn lint:js --fix
```
