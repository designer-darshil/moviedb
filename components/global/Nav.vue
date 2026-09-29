<template>
  <header class="fixed top-0 inset-x-0 z-50 bg-[rgba(7,8,11,0.88)] backdrop-blur-xl border-b border-border-subtle transition-all duration-200">
    <div class="flex items-center justify-between w-full max-w-[1600px] h-[6rem] md:h-[7.2rem] mx-auto px-4 sm:px-8 md:px-12">
      <!-- Brand Logo -->
      <div class="flex items-center">
        <nuxt-link to="/" class="inline-flex items-center gap-3 no-underline group" aria-label="CINEPULSE Home">
          <div class="flex items-center justify-center w-[3.8rem] h-[3.8rem] rounded-xl text-[#07080b] bg-gradient-to-br from-primary-amber to-[#ff8a00] shadow-[0_4px_16px_rgba(229,169,60,0.35)] group-hover:scale-105 transition-transform duration-200">
            <svg
              class="ml-0.5"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.2"
              stroke-linecap="round"
              stroke-linejoin="round">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </div>
          <div class="flex items-baseline gap-1.5">
            <span class="font-display text-[1.8rem] font-black -tracking-wider text-white uppercase">CINEPULSE</span>
            <span class="text-[1rem] font-extrabold tracking-widest text-primary-amber bg-[rgba(229,169,60,0.12)] border border-[rgba(229,169,60,0.3)] px-1.5 py-0.5 rounded">STUDIO</span>
          </div>
        </nuxt-link>
      </div>

      <!-- Desktop Center Navigation Links -->
      <nav class="hidden md:block" aria-label="Main Navigation">
        <ul class="flex items-center gap-2 list-none m-0 p-1 bg-white/[0.03] border border-border-subtle rounded-full">
          <li>
            <nuxt-link
              exact
              :to="{ name: 'index' }"
              class="relative inline-flex items-center px-4.5 py-2 text-[1.35rem] font-semibold text-text-muted rounded-full hover:text-white hover:bg-white/[0.06] transition-all duration-200"
              active-class="is-nav-active"
              exact-active-class="is-nav-active">
              Discover
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              :to="{ name: 'movie' }"
              class="relative inline-flex items-center px-4.5 py-2 text-[1.35rem] font-semibold text-text-muted rounded-full hover:text-white hover:bg-white/[0.06] transition-all duration-200"
              active-class="is-nav-active">
              Movies
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              :to="{ name: 'tv' }"
              class="relative inline-flex items-center px-4.5 py-2 text-[1.35rem] font-semibold text-text-muted rounded-full hover:text-white hover:bg-white/[0.06] transition-all duration-200"
              active-class="is-nav-active">
              TV Series
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              :to="{ name: 'movie-category-name', params: { name: 'trending' } }"
              class="relative inline-flex items-center px-4.5 py-2 text-[1.35rem] font-semibold text-text-muted rounded-full hover:text-white hover:bg-white/[0.06] transition-all duration-200"
              active-class="is-nav-active">
              Top Charts
            </nuxt-link>
          </li>
        </ul>
      </nav>

      <!-- Right Utility Actions -->
      <div class="flex items-center gap-3">
        <!-- Search Trigger Pill for Desktop -->
        <button
          type="button"
          class="hidden md:inline-flex items-center gap-3 h-[4.2rem] px-4 text-[1.3rem] font-medium text-text-muted bg-surface-1 border border-white/15 rounded-full cursor-pointer hover:text-white hover:bg-surface-2 hover:border-white/30 hover:shadow-sm transition-all duration-200"
          :class="searchOpen ? '!border-primary-amber !ring-2 !ring-primary-amber/30' : ''"
          aria-label="Search Catalog (Press Command + K)"
          :aria-expanded="`${searchOpen}`"
          @click="toggleSearch">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.2"
            stroke-linecap="round"
            stroke-linejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <span class="text-text-subtle">Search movies, series, cast...</span>
          <span class="px-1.5 py-0.5 text-[1.1rem] font-bold text-text-muted bg-surface-3 border border-border-subtle rounded">⌘K</span>
        </button>

        <!-- Mobile Quick Search Icon Button -->
        <button
          type="button"
          class="flex md:hidden items-center justify-center w-10 h-10 rounded-full text-text-primary bg-surface-2 border border-border-subtle"
          aria-label="Search Catalog"
          @click="toggleSearch">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.2"
            stroke-linecap="round"
            stroke-linejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Bottom Navigation Dock -->
    <nav class="fixed inset-x-0 bottom-0 z-50 md:hidden flex items-center justify-around h-[6.2rem] bg-[rgba(7,8,11,0.94)] backdrop-blur-xl border-t border-border-subtle pb-[env(safe-area-inset-bottom,0)]" aria-label="Mobile Navigation Dock">
      <ul class="flex items-center justify-around w-full list-none m-0 p-0">
        <li class="flex-1 flex justify-center">
          <nuxt-link
            exact
            :to="{ name: 'index' }"
            class="flex flex-col items-center justify-center gap-1 w-full py-1.5 text-text-muted no-underline text-[1.1rem] font-medium transition-all duration-200"
            active-class="is-dock-active"
            exact-active-class="is-dock-active">
            <span class="flex items-center justify-center transition-transform duration-200 dock-icon">
              <svg
                width="20"
                height="20"
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
            <span class="tracking-wide">Home</span>
          </nuxt-link>
        </li>

        <li class="flex-1 flex justify-center">
          <nuxt-link
            :to="{ name: 'movie' }"
            class="flex flex-col items-center justify-center gap-1 w-full py-1.5 text-text-muted no-underline text-[1.1rem] font-medium transition-all duration-200"
            active-class="is-dock-active">
            <span class="flex items-center justify-center transition-transform duration-200 dock-icon">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round">
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
            <span class="tracking-wide">Movies</span>
          </nuxt-link>
        </li>

        <li class="flex-1 flex justify-center">
          <nuxt-link
            :to="{ name: 'tv' }"
            class="flex flex-col items-center justify-center gap-1 w-full py-1.5 text-text-muted no-underline text-[1.1rem] font-medium transition-all duration-200"
            active-class="is-dock-active">
            <span class="flex items-center justify-center transition-transform duration-200 dock-icon">
              <svg
                width="20"
                height="20"
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
            <span class="tracking-wide">TV Shows</span>
          </nuxt-link>
        </li>

        <li class="flex-1 flex justify-center">
          <button
            type="button"
            class="flex flex-col items-center justify-center gap-1 w-full py-1.5 text-text-muted no-underline text-[1.1rem] font-medium transition-all duration-200"
            :class="searchOpen ? 'is-dock-active' : ''"
            aria-label="Search Catalog"
            @click="toggleSearch">
            <span class="flex items-center justify-center transition-transform duration-200 dock-icon">
              <svg
                width="20"
                height="20"
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
            <span class="tracking-wide">Search</span>
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
        const input = document.getElementById('search');
        if (input) input.focus();
      }
    },

    handleKeydown (e) {
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
