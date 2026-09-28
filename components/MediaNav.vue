<template>
  <nav :class="$style.navWrap" aria-label="Media Sections">
    <div :class="$style.nav">
      <button
        v-for="(item, index) in menu"
        :key="`tab-${index}`"
        :class="[$style.button, { [$style.buttonActive]: active === index }]"
        type="button"
        @click="clicked(index, item)">
        <span>{{ item }}</span>
      </button>
    </div>
  </nav>
</template>

<script>
export default {
  props: {
    menu: {
      type: Array,
      required: true,
    },
  },

  data () {
    return {
      active: 0,
    };
  },

  methods: {
    clicked (index, item) {
      this.active = index;
      this.$emit('clicked', item.replace(/\s+/g, '-').toLowerCase());
    },
  },
};
</script>

<style lang="scss" module>
@import "~/assets/css/utilities/_variables.scss";

.navWrap {
  display: flex;
  justify-content: center;
  margin: 3.2rem 0;
  padding: 0 1.6rem;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }
}

.nav {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.4rem;
  background-color: $surface-1;
  border: 1px solid $border-subtle;
  border-radius: $radius-full;
  box-shadow: $shadow-sm;
}

.button {
  padding: 0.9rem 2.2rem;
  font-size: 1.35rem;
  font-weight: 600;
  color: $text-muted;
  background: transparent;
  border: 1px solid transparent;
  border-radius: $radius-full;
  cursor: pointer;
  white-space: nowrap;
  letter-spacing: -0.01em;
  transition: all $transition-fast;

  &:hover {
    color: #fff;
    background-color: rgba(255, 255, 255, 0.04);
  }

  &:focus-visible {
    outline: 2px solid $primary-color;
  }
}

.buttonActive {
  color: #0a0b0e !important;
  background-color: $primary-color !important;
  border-color: $primary-color !important;
  font-weight: 700;
  box-shadow: 0 2px 10px rgba(229, 169, 60, 0.35);

  &:hover {
    background-color: $primary-hover !important;
  }
}
</style>
