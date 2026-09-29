<template>
  <nuxt-link
    v-if="to"
    v-ripple
    :to="to"
    :class="classes"
    :aria-label="ariaLabel"
  >
    <slot name="icon-left" />
    <slot />
    <slot name="icon-right" />
  </nuxt-link>

  <a
    v-else-if="href"
    v-ripple
    :href="href"
    :target="target"
    :rel="target === '_blank' ? 'noopener noreferrer' : undefined"
    :class="classes"
    :aria-label="ariaLabel"
  >
    <slot name="icon-left" />
    <slot />
    <slot name="icon-right" />
  </a>

  <button
    v-else
    v-ripple
    :type="type"
    :class="classes"
    :disabled="disabled || loading"
    :aria-label="ariaLabel"
    @click="$emit('click', $event)"
  >
    <span
      v-if="loading"
      class="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-1"
    />
    <slot v-else name="icon-left" />
    <slot />
    <slot name="icon-right" />
  </button>
</template>

<script>
export default {
  props: {
    to: {
      type: [String, Object],
      default: null,
    },
    href: {
      type: String,
      default: null,
    },
    target: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      default: 'button',
    },
    variant: {
      type: String,
      default: 'primary',
      validator: (v) => ['primary', 'secondary', 'ghost', 'danger'].includes(v),
    },
    size: {
      type: String,
      default: 'md',
      validator: (s) => ['sm', 'md', 'lg'].includes(s),
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    ariaLabel: {
      type: String,
      default: null,
    },
    block: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    classes() {
      const base =
        'p-ripple inline-flex items-center justify-center gap-2 font-medium rounded-xl cursor-pointer select-none no-underline transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-primary-amber focus-visible:ring-offset-2 focus-visible:ring-offset-base-bg disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none active:scale-[0.98]';

      const sizes = {
        sm: 'h-8 px-3 text-[1.2rem]',
        md: 'h-10 sm:h-11 px-4 sm:px-5 text-[1.3rem] font-semibold',
        lg: 'h-12 px-6 text-[1.4rem] font-semibold',
      };

      const variants = {
        primary:
          'text-base-bg bg-primary-amber hover:bg-primary-hover active:bg-primary-active shadow-cinema-sm hover:shadow-glow',
        secondary:
          'text-text-primary bg-surface-2 border border-border-subtle hover:bg-surface-3 hover:border-border-medium hover:text-text-primary',
        ghost:
          'text-text-muted hover:text-text-primary hover:bg-white/10 active:bg-white/15',
        danger:
          'text-text-primary bg-accent-red hover:bg-accent-red/90 shadow-cinema-sm',
      };

      return [
        base,
        sizes[this.size] || sizes.md,
        variants[this.variant] || variants.primary,
        this.block ? 'w-full' : '',
      ].join(' ');
    },
  },
};
</script>
