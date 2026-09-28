<template>
  <nav :class="$style.nav" aria-label="Main Navigation">
    <!-- Desktop Brand Logo -->
    <div :class="$style.brand">
      <nuxt-link to="/" aria-label="Cinema Home" :class="$style.brandLink">
        <span :class="$style.brandMark">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="2" width="20" height="20" rx="4" stroke="currentColor" stroke-width="1.75" />
            <path d="M7 2v20M17 2v20M2 12h20M2 7h5M2 17h5M17 7h5M17 17h5" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" />
          </svg>
        </span>
      </nuxt-link>
    </div>

    <!-- Navigation List -->
    <ul class="nolist" :class="$style.list">
      <li :class="$style.item">
        <nuxt-link
          exact
          :to="{ name: 'index' }"
          :class="$style.link"
          aria-label="Home">
          <span :class="$style.icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </span>
          <span :class="$style.label">Home</span>
        </nuxt-link>
      </li>

      <li :class="$style.item">
        <nuxt-link
          :to="{ name: 'movie' }"
          :class="$style.link"
          aria-label="Movies">
          <span :class="$style.icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
              <line x1="7" y1="2" x2="7" y2="22" />
              <line x1="17" y1="2" x2="17" y2="22" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <line x1="2" y1="7" x2="7" y2="7" />
              <line x1="2" y1="17" x2="7" y2="17" />
              <line x1="17" y1="17" x2="22" y2="17" />
              <line x1="17" y1="7" x2="22" y2="7" />
            </svg>
          </span>
          <span :class="$style.label">Movies</span>
        </nuxt-link>
      </li>

      <li :class="$style.item">
        <nuxt-link
          :to="{ name: 'tv' }"
          :class="$style.link"
          aria-label="TV Shows">
          <span :class="$style.icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="7" width="20" height="15" rx="2" ry="2" />
              <polyline points="17 2 12 7 7 2" />
            </svg>
          </span>
          <span :class="$style.label">TV Shows</span>
        </nuxt-link>
      </li>

      <li :class="$style.item">
        <button
          class="search-toggle"
          type="button"
          :class="[$style.link, $style.searchBtn, { [$style.searchBtnActive]: searchOpen }]"
          aria-label="Search"
          aria-haspopup="true"
          :aria-expanded="`${searchOpen}`"
          @click="toggleSearch">
          <span :class="$style.icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </span>
          <span :class="$style.label">Search</span>
        </button>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState('search', [
      'searchOpen',
    ]),
  },

  methods: {
    toggleSearch () {
      if (this.$route.name !== 'search') {
        this.$store.commit('search/toggleSearch');
      }
    },
  },
};
</script>

<style lang="scss" module>
@import '~/assets/css/utilities/_variables.scss';

.nav {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  height: calc(#{$nav-mobile-height} + env(safe-area-inset-bottom, 0px));
  padding-bottom: env(safe-area-inset-bottom, 0px);
  background-color: rgba(11, 12, 14, 0.94);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-top: 1px solid $border-subtle;

  @media (min-width: $breakpoint-large) {
    top: 0;
    right: auto;
    bottom: 0;
    width: $nav-desktop-width;
    height: 100%;
    padding-bottom: 0;
    background-color: $base-bg;
    border-top: 0;
    border-right: 1px solid $border-subtle;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}

.brand {
  display: none;

  @media (min-width: $breakpoint-large) {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 8.4rem;
    border-bottom: 1px solid $border-subtle;
  }
}

.brandLink {
  display: flex;
  align-items: center;
  justify-content: center;
  color: $primary-color;
  transition: transform $transition-fast, color $transition-fast;

  &:hover {
    color: $primary-hover;
    transform: scale(1.08);
  }
}

.brandMark {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  border-radius: $radius-md;
  background-color: rgba(229, 169, 60, 0.1);
  border: 1px solid rgba(229, 169, 60, 0.2);
}

.list {
  display: flex;
  height: 100%;
  margin: 0;
  padding: 0;

  @media (min-width: $breakpoint-large) {
    flex-direction: column;
    width: 100%;
    height: auto;
    padding-top: 1.6rem;
    gap: 0.8rem;
  }
}

.item {
  flex: 1 1 0;
  height: 100%;

  @media (min-width: $breakpoint-large) {
    flex: 0 0 auto;
    width: 100%;
    height: 7.2rem;
    padding: 0 0.8rem;
  }
}

.link {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 0.6rem 0;
  color: $text-muted;
  text-decoration: none;
  border-radius: $radius-md;
  transition: color $transition-fast, background-color $transition-fast;
  background: transparent;
  border: none;
  cursor: pointer;

  &:hover {
    color: $text-color;
    background-color: rgba(255, 255, 255, 0.04);
  }

  &:focus-visible {
    outline: 2px solid $primary-color;
    outline-offset: -2px;
  }
}

.icon {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.4rem;
  transition: transform $transition-fast;

  svg {
    transition: stroke $transition-fast;
  }
}

.label {
  font-size: 1.1rem;
  font-weight: 500;
  letter-spacing: 0.02em;
  transition: color $transition-fast;

  @media (min-width: $breakpoint-large) {
    font-size: 1.1rem;
  }
}

.searchBtn {
  margin: 0;
  font-family: inherit;
}

.searchBtnActive {
  color: $primary-color;

  .icon svg {
    stroke: $primary-color;
  }

  .label {
    color: $primary-color;
    font-weight: 600;
  }
}
</style>

<style lang="scss" scoped>
@import '~/assets/css/utilities/_variables.scss';

// Active link state
a.nuxt-link-active {
  color: $primary-color;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 2.4rem;
    height: 2px;
    background-color: $primary-color;
    border-radius: $radius-full;

    @media (min-width: $breakpoint-large) {
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      width: 3px;
      height: 2.8rem;
    }
  }

  .icon {
    transform: translateY(-1px);

    svg {
      stroke: $primary-color;
    }
  }

  .label {
    color: $primary-color;
    font-weight: 600;
  }

  background-color: rgba(229, 169, 60, 0.06);
}
</style>
