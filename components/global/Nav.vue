<template>
  <header
    class="fixed top-0 inset-x-0 z-50 bg-[rgba(7,8,11,0.85)] backdrop-blur-xl border-b border-border-subtle transition-all duration-300"
  >
    <div
      class="flex items-center justify-between w-full max-w-[1600px] h-[5.6rem] sm:h-[6.4rem] mx-auto px-4 sm:px-8 lg:px-12"
    >
      <!-- Left: Brand Logo & Desktop Nav Links -->
      <div class="flex items-center gap-8 lg:gap-12">
        <!-- Brand Logo -->
        <nuxt-link
          to="/"
          class="inline-flex items-center gap-3 no-underline group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-amber rounded-lg"
          aria-label="CINEPULSE Home"
        >
          <div
            class="flex items-center justify-center w-8 h-8 rounded-xl bg-primary-amber text-[#07080b] shadow-glow group-hover:scale-105 transition-transform duration-200"
          >
            <svg
              class="ml-0.5"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </div>
          <span
            class="font-display text-[1.65rem] font-black tracking-tight text-white uppercase group-hover:text-primary-amber transition-colors duration-200"
          >
            CINEPULSE
          </span>
        </nuxt-link>

        <!-- Desktop Navigation Links -->
        <nav class="hidden md:block" aria-label="Main Navigation">
          <ul class="flex items-center gap-1.5 list-none m-0 p-0">
            <li>
              <nuxt-link
                exact
                :to="{ name: 'index' }"
                class="inline-flex items-center px-4 py-2 text-[1.3rem] font-medium text-text-muted rounded-xl hover:text-white hover:bg-white/5 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-amber"
                active-class="is-nav-active"
                exact-active-class="is-nav-active"
              >
                Discover
              </nuxt-link>
            </li>
            <li>
              <nuxt-link
                :to="{ name: 'movie' }"
                class="inline-flex items-center px-4 py-2 text-[1.3rem] font-medium text-text-muted rounded-xl hover:text-white hover:bg-white/5 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-amber"
                active-class="is-nav-active"
              >
                Movies
              </nuxt-link>
            </li>
            <li>
              <nuxt-link
                :to="{ name: 'tv' }"
                class="inline-flex items-center px-4 py-2 text-[1.3rem] font-medium text-text-muted rounded-xl hover:text-white hover:bg-white/5 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-amber"
                active-class="is-nav-active"
              >
                TV Series
              </nuxt-link>
            </li>
          </ul>
        </nav>
      </div>

      <!-- Right: Search Command Trigger -->
      <div class="flex items-center gap-3">
        <!-- Desktop Search Pill -->
        <button
          type="button"
          class="hidden md:inline-flex items-center gap-3 h-10 px-3.5 text-[1.25rem] font-normal text-text-muted bg-surface-2/80 backdrop-blur-md border border-border-subtle rounded-xl cursor-pointer hover:text-white hover:bg-surface-3 hover:border-primary-amber/40 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-amber"
          :class="searchOpen ? '!border-primary-amber !text-white' : ''"
          aria-label="Search Catalog (Press Command + K)"
          :aria-expanded="`${searchOpen}`"
          @click="toggleSearch"
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <span class="text-text-subtle">Search catalog...</span>
          <span
            class="px-2 py-0.5 text-[1rem] font-bold text-text-subtle bg-surface-3 border border-border-subtle rounded-md"
          >
            ⌘K
          </span>
        </button>

        <!-- Mobile Search Icon Button -->
        <button
          type="button"
          class="flex md:hidden items-center justify-center w-10 h-10 rounded-xl text-text-muted hover:text-white bg-surface-2 border border-border-subtle transition-colors duration-150"
          aria-label="Search Catalog"
          @click="toggleSearch"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Bottom Navigation Dock -->
    <nav
      class="fixed inset-x-0 bottom-0 z-50 md:hidden flex items-center justify-around h-[5.8rem] bg-[rgba(7,8,11,0.92)] backdrop-blur-xl border-t border-border-subtle pb-[env(safe-area-inset-bottom,0)] shadow-cinema-lg"
      aria-label="Mobile Navigation"
    >
      <ul class="flex items-center justify-around w-full list-none m-0 p-0">
        <li class="flex-1 flex justify-center">
          <nuxt-link
            exact
            :to="{ name: 'index' }"
            class="flex flex-col items-center justify-center gap-1 w-full py-1.5 text-text-muted no-underline text-[1.1rem] font-medium transition-colors duration-150"
            active-class="is-dock-active"
            exact-active-class="is-dock-active"
          >
            <span
              class="dock-icon flex items-center justify-center transition-transform duration-150"
            >
              <svg
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <polygon
                  points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"
                />
              </svg>
            </span>
            <span>Discover</span>
          </nuxt-link>
        </li>

        <li class="flex-1 flex justify-center">
          <nuxt-link
            :to="{ name: 'movie' }"
            class="flex flex-col items-center justify-center gap-1 w-full py-1.5 text-text-muted no-underline text-[1.1rem] font-medium transition-colors duration-150"
            active-class="is-dock-active"
          >
            <span
              class="dock-icon flex items-center justify-center transition-transform duration-150"
            >
              <svg
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="2.18" />
                <line x1="7" y1="2" x2="7" y2="22" />
                <line x1="17" y1="2" x2="17" y2="22" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <line x1="2" y1="7" x2="7" y2="7" />
                <line x1="2" y1="17" x2="7" y2="17" />
                <line x1="17" y1="17" x2="22" y2="17" />
                <line x1="17" y1="7" x2="22" y2="7" />
              </svg>
            </span>
            <span>Movies</span>
          </nuxt-link>
        </li>

        <li class="flex-1 flex justify-center">
          <nuxt-link
            :to="{ name: 'tv' }"
            class="flex flex-col items-center justify-center gap-1 w-full py-1.5 text-text-muted no-underline text-[1.1rem] font-medium transition-colors duration-150"
            active-class="is-dock-active"
          >
            <span
              class="dock-icon flex items-center justify-center transition-transform duration-150"
            >
              <svg
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <rect x="2" y="7" width="20" height="15" rx="2" ry="2" />
                <polyline points="17 2 12 7 7 2" />
              </svg>
            </span>
            <span>TV</span>
          </nuxt-link>
        </li>

        <li class="flex-1 flex justify-center">
          <button
            type="button"
            class="flex flex-col items-center justify-center gap-1 w-full py-1.5 text-text-muted no-underline text-[1.1rem] font-medium transition-colors duration-150"
            :class="searchOpen ? 'is-dock-active' : ''"
            aria-label="Search Catalog"
            @click="toggleSearch"
          >
            <span
              class="dock-icon flex items-center justify-center transition-transform duration-150"
            >
              <svg
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </span>
            <span>Search</span>
          </button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState('search', ['searchOpen']),
  },

  mounted() {
    window.addEventListener('keydown', this.handleKeydown);
  },

  beforeDestroy() {
    window.removeEventListener('keydown', this.handleKeydown);
  },

  methods: {
    toggleSearch() {
      if (this.$route.name !== 'search') {
        this.$store.commit('search/toggleSearch');
      } else {
        const input =
          document.getElementById('search-destination-input') ||
          document.getElementById('search');
        if (input) input.focus();
      }
    },

    handleKeydown(e) {
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
