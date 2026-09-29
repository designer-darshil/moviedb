<template>
  <div
    class="tw-fixed tw-inset-0 tw-z-[150] tw-flex tw-items-start tw-justify-center tw-pt-16 sm:tw-pt-24 tw-px-4 tw-pb-8 tw-bg-[rgba(7,8,11,0.85)] tw-backdrop-blur-2xl"
    @click.self="closeSearch">
    <div class="tw-w-full tw-max-w-[760px] tw-bg-surface-1 tw-border tw-border-white/15 tw-rounded-2xl tw-shadow-2xl tw-p-5 sm:tw-p-7">
      <form autocomplete="off" class="tw-flex tw-flex-col tw-gap-5 tw-w-full" @submit.prevent="goToRoute">
        <label
          class="tw-sr-only"
          for="search">Search Movies, TV Shows, and People</label>

        <div class="tw-flex tw-items-center tw-gap-3.5 tw-px-4 tw-py-1.5 tw-bg-surface-2 tw-border tw-border-white/15 tw-rounded-xl focus-within:tw-border-primary-amber focus-within:tw-ring-2 focus-within:tw-ring-primary-amber/30 tw-transition-all tw-duration-200">
          <span class="tw-flex tw-items-center tw-text-primary-amber">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.2"
              stroke-linecap="round"
              stroke-linejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </span>

          <input
            id="search"
            ref="input"
            v-model.trim="query"
            name="search"
            type="text"
            placeholder="Search by title, director, actor, genre..."
            class="tw-flex-1 tw-h-12 sm:tw-h-13 tw-text-[1.6rem] sm:tw-text-[1.8rem] tw-font-medium tw-text-text-primary tw-bg-transparent tw-border-none tw-outline-none placeholder:tw-text-text-subtle"
            @keyup.enter="goToRoute"
            @input="handleInput"
            @keydown.esc="handleEscape">

          <div class="tw-flex tw-items-center tw-gap-2.5">
            <button
              v-if="query"
              type="button"
              aria-label="Clear query"
              class="tw-flex tw-items-center tw-justify-center tw-w-6 tw-h-6 tw-rounded-full tw-text-text-muted tw-bg-surface-3 hover:tw-text-white hover:tw-bg-surface-4 tw-transition-colors tw-duration-200"
              @click="clearQuery">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <span class="tw-hidden sm:tw-inline-block tw-px-2 tw-py-1 tw-text-[1.1rem] tw-font-bold tw-tracking-wide tw-text-text-muted tw-bg-surface-3 tw-border tw-border-border-subtle tw-rounded">ESC</span>

            <button
              type="button"
              aria-label="Close Search"
              class="tw-flex tw-items-center tw-justify-center tw-w-9 tw-h-9 tw-rounded-full tw-text-text-muted hover:tw-text-white hover:tw-bg-surface-3 tw-transition-colors tw-duration-200"
              @click="closeSearch">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.2"
                stroke-linecap="round"
                stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Quick Trending Suggestions -->
        <div class="tw-flex tw-flex-col sm:tw-flex-row sm:tw-items-center tw-gap-2.5 tw-pt-3 tw-border-t tw-border-border-subtle">
          <span class="tw-text-[1.2rem] tw-font-semibold tw-uppercase tw-tracking-wide tw-text-text-subtle tw-shrink-0">Popular Searches:</span>
          <div class="tw-flex tw-flex-wrap tw-gap-2">
            <button
              v-for="tag in popularTags"
              :key="tag"
              type="button"
              class="tw-inline-flex tw-items-center tw-px-3 tw-py-1 tw-text-[1.25rem] tw-font-medium tw-text-text-secondary tw-bg-surface-2 tw-border tw-border-border-subtle tw-rounded-full tw-cursor-pointer hover:tw-text-white hover:tw-bg-surface-3 hover:tw-border-primary-amber hover:-tw-translate-y-0.5 tw-transition-all tw-duration-200"
              @click="selectTag(tag)">
              {{ tag }}
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data () {
    return {
      query: this.$route.query.q ? this.$route.query.q : '',
      popularTags: [
        'Dune',
        'Oppenheimer',
        'Interstellar',
        'Breaking Bad',
        'Succession',
        'The Last of Us',
      ],
    };
  },

  computed: {
    ...mapState('search', ['fromPage']),
  },

  mounted () {
    this.$nextTick(() => {
      if (this.$refs.input) {
        this.$refs.input.focus();
      }
    });
  },

  methods: {
    handleInput () {
      if (this.query.length >= 2) {
        this.goToRoute();
      }
    },

    selectTag (tag) {
      this.query = tag;
      this.goToRoute();
    },

    clearQuery () {
      this.query = '';
      if (this.$refs.input) {
        this.$refs.input.focus();
      }
    },

    goToRoute () {
      if (this.query) {
        this.$router.push({
          name: 'search',
          query: { q: this.query },
        });
      }
    },

    handleEscape () {
      this.closeSearch();
    },

    closeSearch () {
      this.query = '';
      this.$store.commit('search/closeSearch');
      if (this.$route.name === 'search') {
        this.$router.push({
          path: this.fromPage || '/',
        });
      }
    },
  },
};
</script>
