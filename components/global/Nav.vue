<template>
  <header class="tw-fixed tw-top-0 tw-inset-x-0 tw-z-50 tw-bg-[rgba(7,8,11,0.88)] tw-backdrop-blur-xl tw-border-b tw-border-border-subtle tw-transition-all tw-duration-200">
    <div class="tw-flex tw-items-center tw-justify-between tw-w-full tw-max-w-[1600px] tw-h-[6rem] md:tw-h-[7.2rem] tw-mx-auto tw-px-4 sm:tw-px-8 md:tw-px-12">
      <!-- Brand Logo -->
      <div class="tw-flex tw-items-center">
        <nuxt-link to="/" class="tw-inline-flex tw-items-center tw-gap-3 tw-no-underline tw-group" aria-label="CINEPULSE Home">
          <div class="tw-flex tw-items-center tw-justify-center tw-w-[3.8rem] tw-h-[3.8rem] tw-rounded-xl tw-text-[#07080b] tw-bg-gradient-to-br tw-from-primary-amber tw-to-[#ff8a00] tw-shadow-[0_4px_16px_rgba(229,169,60,0.35)] group-hover:tw-scale-105 tw-transition-transform tw-duration-200">
            <svg
              class="tw-ml-0.5"
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
          <div class="tw-flex tw-items-baseline tw-gap-1.5">
            <span class="tw-font-display tw-text-[1.8rem] tw-font-black -tw-tracking-wider tw-text-white tw-uppercase">CINEPULSE</span>
            <span class="tw-text-[1rem] tw-font-extrabold tw-tracking-widest tw-text-primary-amber tw-bg-[rgba(229,169,60,0.12)] tw-border tw-border-[rgba(229,169,60,0.3)] tw-px-1.5 tw-py-0.5 tw-rounded">STUDIO</span>
          </div>
        </nuxt-link>
      </div>

      <!-- Desktop Center Navigation Links -->
      <nav class="tw-hidden md:tw-block" aria-label="Main Navigation">
        <ul class="tw-flex tw-items-center tw-gap-2 tw-list-none tw-m-0 tw-p-1 tw-bg-white/[0.03] tw-border tw-border-border-subtle tw-rounded-full">
          <li>
            <nuxt-link
              exact
              :to="{ name: 'index' }"
              class="tw-relative tw-inline-flex tw-items-center tw-px-4.5 tw-py-2 tw-text-[1.35rem] tw-font-semibold tw-text-text-muted tw-rounded-full hover:tw-text-white hover:tw-bg-white/[0.06] tw-transition-all tw-duration-200"
              active-class="is-nav-active"
              exact-active-class="is-nav-active">
              Discover
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              :to="{ name: 'movie' }"
              class="tw-relative tw-inline-flex tw-items-center tw-px-4.5 tw-py-2 tw-text-[1.35rem] tw-font-semibold tw-text-text-muted tw-rounded-full hover:tw-text-white hover:tw-bg-white/[0.06] tw-transition-all tw-duration-200"
              active-class="is-nav-active">
              Movies
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              :to="{ name: 'tv' }"
              class="tw-relative tw-inline-flex tw-items-center tw-px-4.5 tw-py-2 tw-text-[1.35rem] tw-font-semibold tw-text-text-muted tw-rounded-full hover:tw-text-white hover:tw-bg-white/[0.06] tw-transition-all tw-duration-200"
              active-class="is-nav-active">
              TV Series
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              :to="{ name: 'movie-category-name', params: { name: 'trending' } }"
              class="tw-relative tw-inline-flex tw-items-center tw-px-4.5 tw-py-2 tw-text-[1.35rem] tw-font-semibold tw-text-text-muted tw-rounded-full hover:tw-text-white hover:tw-bg-white/[0.06] tw-transition-all tw-duration-200"
              active-class="is-nav-active">
              Top Charts
            </nuxt-link>
          </li>
        </ul>
      </nav>

      <!-- Right Utility Actions -->
      <div class="tw-flex tw-items-center tw-gap-3">
        <!-- Search Trigger Pill for Desktop -->
        <button
          type="button"
          class="tw-hidden md:tw-inline-flex tw-items-center tw-gap-3 tw-h-[4.2rem] tw-px-4 tw-text-[1.3rem] tw-font-medium tw-text-text-muted tw-bg-surface-1 tw-border tw-border-white/15 tw-rounded-full tw-cursor-pointer hover:tw-text-white hover:tw-bg-surface-2 hover:tw-border-white/30 hover:tw-shadow-sm tw-transition-all tw-duration-200"
          :class="searchOpen ? '!tw-border-primary-amber !tw-ring-2 !tw-ring-primary-amber/30' : ''"
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
          <span class="tw-text-text-subtle">Search movies, series, cast...</span>
          <span class="tw-px-1.5 tw-py-0.5 tw-text-[1.1rem] tw-font-bold tw-text-text-muted tw-bg-surface-3 tw-border tw-border-border-subtle tw-rounded">⌘K</span>
        </button>

        <!-- Mobile Quick Search Icon Button -->
        <button
          type="button"
          class="tw-flex md:tw-hidden tw-items-center tw-justify-center tw-w-10 tw-h-10 tw-rounded-full tw-text-text-primary tw-bg-surface-2 tw-border tw-border-border-subtle"
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
    <nav class="tw-fixed tw-inset-x-0 tw-bottom-0 tw-z-50 md:tw-hidden tw-flex tw-items-center tw-justify-around tw-h-[6.2rem] tw-bg-[rgba(7,8,11,0.94)] tw-backdrop-blur-xl tw-border-t tw-border-border-subtle tw-pb-[env(safe-area-inset-bottom,0)]" aria-label="Mobile Navigation Dock">
      <ul class="tw-flex tw-items-center tw-justify-around tw-w-full tw-list-none tw-m-0 tw-p-0">
        <li class="tw-flex-1 tw-flex tw-justify-center">
          <nuxt-link
            exact
            :to="{ name: 'index' }"
            class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-1 tw-w-full tw-py-1.5 tw-text-text-muted tw-no-underline tw-text-[1.1rem] tw-font-medium tw-transition-all tw-duration-200"
            active-class="is-dock-active"
            exact-active-class="is-dock-active">
            <span class="tw-flex tw-items-center tw-justify-center tw-transition-transform tw-duration-200 dock-icon">
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
            <span class="tw-tracking-wide">Home</span>
          </nuxt-link>
        </li>

        <li class="tw-flex-1 tw-flex tw-justify-center">
          <nuxt-link
            :to="{ name: 'movie' }"
            class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-1 tw-w-full tw-py-1.5 tw-text-text-muted tw-no-underline tw-text-[1.1rem] tw-font-medium tw-transition-all tw-duration-200"
            active-class="is-dock-active">
            <span class="tw-flex tw-items-center tw-justify-center tw-transition-transform tw-duration-200 dock-icon">
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
            <span class="tw-tracking-wide">Movies</span>
          </nuxt-link>
        </li>

        <li class="tw-flex-1 tw-flex tw-justify-center">
          <nuxt-link
            :to="{ name: 'tv' }"
            class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-1 tw-w-full tw-py-1.5 tw-text-text-muted tw-no-underline tw-text-[1.1rem] tw-font-medium tw-transition-all tw-duration-200"
            active-class="is-dock-active">
            <span class="tw-flex tw-items-center tw-justify-center tw-transition-transform tw-duration-200 dock-icon">
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
            <span class="tw-tracking-wide">TV Shows</span>
          </nuxt-link>
        </li>

        <li class="tw-flex-1 tw-flex tw-justify-center">
          <button
            type="button"
            class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-1 tw-w-full tw-py-1.5 tw-text-text-muted tw-no-underline tw-text-[1.1rem] tw-font-medium tw-transition-all tw-duration-200"
            :class="searchOpen ? 'is-dock-active' : ''"
            aria-label="Search Catalog"
            @click="toggleSearch">
            <span class="tw-flex tw-items-center tw-justify-center tw-transition-transform tw-duration-200 dock-icon">
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
            <span class="tw-tracking-wide">Search</span>
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
