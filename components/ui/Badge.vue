<template>
  <span :class="classes">
    <span v-if="dot" class="w-1.5 h-1.5 rounded-full" :class="dotClass" />
    <slot />
  </span>
</template>

<script>
export default {
  props: {
    variant: {
      type: String,
      default: 'neutral',
      validator: (v) =>
        [
          'amber',
          'neutral',
          'surface',
          'outline',
          'success',
          'danger',
        ].includes(v),
    },
    size: {
      type: String,
      default: 'sm',
      validator: (s) => ['sm', 'md'].includes(s),
    },
    dot: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    classes() {
      const base =
        'inline-flex items-center gap-1.5 font-semibold uppercase tracking-wider rounded-md select-none';

      const sizes = {
        sm: 'px-2 py-0.5 text-[1.05rem]',
        md: 'px-2.5 py-1 text-[1.15rem]',
      };

      const variants = {
        amber:
          'text-primary-amber bg-primary-amber/10 border border-primary-amber/25',
        neutral: 'text-text-muted bg-surface-2 border border-border-medium',
        surface: 'text-text-secondary bg-surface-3 border border-border-subtle',
        outline:
          'text-text-secondary bg-transparent border border-border-medium',
        success:
          'text-accent-green bg-accent-green/10 border border-accent-green/25',
        danger: 'text-accent-red bg-accent-red/10 border border-accent-red/25',
      };

      return [
        base,
        sizes[this.size] || sizes.sm,
        variants[this.variant] || variants.neutral,
      ].join(' ');
    },

    dotClass() {
      const dots = {
        amber: 'bg-primary-amber',
        neutral: 'bg-text-muted',
        surface: 'bg-text-secondary',
        outline: 'bg-text-secondary',
        success: 'bg-accent-green',
        danger: 'bg-accent-red',
      };
      return dots[this.variant] || 'bg-primary-amber';
    },
  },
};
</script>
