<template>
  <nav :class="$style.navWrap" aria-label="Media Section Navigation">
    <div :class="$style.nav" role="tablist">
      <button
        v-for="(item, index) in menu"
        :key="`tab-${index}`"
        :class="[$style.tab, { [$style.tabActive]: active === index }]"
        type="button"
        role="tab"
        :aria-selected="active === index"
        @click="clicked(index, item)">
        <span>{{ item }}</span>
        <span v-if="active === index" :class="$style.activeIndicator" />
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
@import '~/assets/css/utilities/_variables.scss';

.navWrap {
  width: 100%;
  border-bottom: 1px solid $border-subtle;
  background-color: $surface-1;
}

.nav {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 1.6rem;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  @media (min-width: $breakpoint-small) {
    padding: 0 3.2rem;
    gap: 1.6rem;
  }

  @media (min-width: $breakpoint-large) {
    justify-content: center;
    padding: 0 4.8rem;
    gap: 2.4rem;
  }

  &::-webkit-scrollbar {
    display: none;
  }
}

.tab {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1.6rem 1.4rem;
  font-size: 1.45rem;
  font-weight: 500;
  color: $text-muted;
  background: none;
  border: none;
  cursor: pointer;
  white-space: nowrap;
  letter-spacing: -0.01em;
  transition: color $transition-fast;

  &:hover {
    color: $text-primary;
  }

  &:focus-visible {
    outline: 2px solid $primary-color;
    outline-offset: -2px;
  }

  @media (min-width: $breakpoint-large) {
    font-size: 1.6rem;
    padding: 2rem 2rem;
  }
}

.tabActive {
  color: #fff;
  font-weight: 600;

  &:hover {
    color: #fff;
  }
}

.activeIndicator {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background-color: $primary-color;
  border-radius: $radius-full $radius-full 0 0;
  box-shadow: 0 0 12px rgba(229, 169, 60, 0.4);
}
</style>
