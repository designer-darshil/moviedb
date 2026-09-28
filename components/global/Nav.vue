<template>
  <nav :class="$style.nav" aria-label="Main Navigation">
    <!-- Brand Logo Mark for Desktop -->
    <div :class="$style.logo">
      <nuxt-link to="/" aria-label="CinemaDB Home">
        <div :class="$style.logoIcon">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round">
            <rect
              x="2"
              y="2"
              width="20"
              height="20"
              rx="2.18"
              ry="2.18" />
            <line x1="7" y1="2" x2="7" y2="22" />
            <line x1="17" y1="2" x2="17" y2="22" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <line x1="2" y1="7" x2="7" y2="7" />
            <line x1="2" y1="17" x2="7" y2="17" />
            <line x1="17" y1="17" x2="22" y2="17" />
            <line x1="17" y1="7" x2="22" y2="7" />
          </svg>
        </div>
      </nuxt-link>
    </div>

    <!-- Navigation List -->
    <ul :class="$style.list">
      <li :class="$style.item">
        <nuxt-link
          exact
          :to="{ name: 'index' }"
          :class="$style.link"
          active-class="is-active"
          exact-active-class="is-active"
          aria-label="Home">
          <span :class="$style.icon">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round">
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
          active-class="is-active"
          aria-label="Movies">
          <span :class="$style.icon">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="2" />
              <line x1="2" y1="6" x2="22" y2="6" />
              <line x1="2" y1="10" x2="22" y2="10" />
              <line x1="2" y1="14" x2="22" y2="14" />
              <line x1="2" y1="18" x2="22" y2="18" />
              <line x1="7" y1="2" x2="7" y2="22" />
              <line x1="17" y1="2" x2="17" y2="22" />
            </svg>
          </span>
          <span :class="$style.label">Movies</span>
        </nuxt-link>
      </li>

      <li :class="$style.item">
        <nuxt-link
          :to="{ name: 'tv' }"
          :class="$style.link"
          active-class="is-active"
          aria-label="TV Series">
          <span :class="$style.icon">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round">
              <rect
                x="2"
                y="7"
                width="20"
                height="15"
                rx="2"
                ry="2" />
              <polyline points="17 2 12 7 7 2" />
            </svg>
          </span>
          <span :class="$style.label">TV Shows</span>
        </nuxt-link>
      </li>

      <li :class="$style.item">
        <button
          type="button"
          :class="[
            $style.link,
            $style.searchBtn,
            searchOpen ? 'is-active' : '',
          ]"
          aria-label="Search Catalog (Command + K)"
          :aria-expanded="`${searchOpen}`"
          @click="toggleSearch">
          <span :class="$style.icon">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </span>
          <span :class="$style.label">Search</span>
        </button>
      </li>
    </ul>

    <!-- Bottom utility on desktop -->
    <div :class="$style.bottomSlot" />
  </nav>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState('search', ['searchOpen']),
  },

  mounted () {
    window.addEventListener('keydown', this.handleKeydown);
  },

  beforeDestroy () {
    window.removeEventListener('keydown', this.handleKeydown);
  },

  methods: {
    toggleSearch () {
      if (this.$route.name !== 'search') {
        this.$store.commit('search/toggleSearch');
      } else {
        const input = document.getElementById('search-input');
        if (input) input.focus();
      }
    },

    handleKeydown (e) {
      // ⌘K or / to trigger search
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        this.toggleSearch();
      } else if (
        e.key === '/' &&
        document.activeElement.tagName !== 'INPUT' &&
        document.activeElement.tagName !== 'TEXTAREA'
      ) {
        e.preventDefault();
        this.toggleSearch();
      }
    },
  },
};
</script>

<style lang="scss" module>
@import "~/assets/css/utilities/_variables.scss";

.nav {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 6.4rem;
  background-color: rgba(10, 11, 14, 0.92);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-top: 1px solid $border-subtle;
  padding-bottom: env(safe-area-inset-bottom, 0);

  @media (min-width: $breakpoint-medium) {
    top: 0;
    right: auto;
    bottom: 0;
    left: 0;
    flex-direction: column;
    justify-content: space-between;
    width: 8rem;
    height: 100vh;
    padding: 2.8rem 0;
    border-top: none;
    border-right: 1px solid $border-subtle;
    background-color: $base-bg;
  }
}

.logo {
  display: none;

  @media (min-width: $breakpoint-medium) {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
}

.logoIcon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4.4rem;
  height: 4.4rem;
  border-radius: $radius-md;
  color: $primary-color;
  background: linear-gradient(
    135deg,
    rgba(229, 169, 60, 0.2) 0%,
    rgba(229, 169, 60, 0.05) 100%
  );
  border: 1px solid rgba(229, 169, 60, 0.3);
  transition: all $transition-fast;

  &:hover {
    transform: scale(1.08);
    box-shadow: 0 0 16px rgba(229, 169, 60, 0.35);
  }
}

.list {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  list-style: none;
  margin: 0;
  padding: 0;

  @media (min-width: $breakpoint-medium) {
    flex-direction: column;
    justify-content: center;
    gap: 2.4rem;
    width: 100%;
  }
}

.item {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;

  @media (min-width: $breakpoint-medium) {
    flex: initial;
    width: 100%;
  }
}

.link {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  width: 100%;
  padding: 0.8rem 0;
  color: $text-muted;
  text-decoration: none;
  background: none;
  border: none;
  cursor: pointer;
  outline: none;
  transition: all $transition-fast;

  &:hover {
    color: #fff;

    .icon {
      transform: translateY(-2px);
    }
  }

  &:focus-visible {
    color: $primary-color;
    outline: 2px solid $primary-color;
    outline-offset: -2px;
    border-radius: $radius-sm;
  }

  @media (min-width: $breakpoint-medium) {
    width: 5.6rem;
    height: 5.6rem;
    padding: 0;
    border-radius: $radius-md;

    &:hover {
      background-color: $surface-2;
    }
  }
}

.searchBtn {
  font-family: inherit;
}

.icon {
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform $transition-fast, color $transition-fast;
}

.label {
  font-size: 1.05rem;
  font-weight: 500;
  letter-spacing: 0.02em;

  @media (min-width: $breakpoint-medium) {
    display: none;
  }
}

.bottomSlot {
  display: none;

  @media (min-width: $breakpoint-medium) {
    display: block;
    width: 4.4rem;
    height: 4.4rem;
  }
}
</style>

<style lang="scss">
@import "~/assets/css/utilities/_variables.scss";

// Global active classes for router
nav a.is-active,
nav button.is-active {
  color: $primary-color !important;

  @media (min-width: $breakpoint-medium) {
    background-color: rgba(229, 169, 60, 0.12) !important;
    border: 1px solid rgba(229, 169, 60, 0.25) !important;
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 24px;
    height: 3px;
    background-color: $primary-color;
    border-radius: $radius-full;

    @media (min-width: $breakpoint-medium) {
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      width: 3px;
      height: 24px;
    }
  }
}
</style>
