<template>
  <div
    class="fixed inset-0 z-[150] flex items-start justify-center pt-16 sm:pt-24 px-4 pb-8 bg-[rgba(7,8,11,0.85)] backdrop-blur-2xl"
    @click.self="closeSearch">
    <div class="w-full max-w-[760px] bg-surface-1 border border-white/15 rounded-2xl shadow-2xl p-5 sm:p-7">
      <form autocomplete="off" class="flex flex-col gap-5 w-full" @submit.prevent="goToRoute">
        <label
          class="sr-only"
          for="search">Search Movies, TV Shows, and People</label>

        <div class="flex items-center gap-3.5 px-4 py-1.5 bg-surface-2 border border-white/15 rounded-xl focus-within:border-primary-amber focus-within:ring-2 focus-within:ring-primary-amber/30 transition-all duration-200">
          <span class="flex items-center text-primary-amber">
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
            class="flex-1 h-12 sm:h-13 text-[1.6rem] sm:text-[1.8rem] font-medium text-text-primary bg-transparent border-none outline-none placeholder:text-text-subtle"
            @keyup.enter="goToRoute"
            @input="handleInput"
            @keydown.esc="handleEscape">

          <div class="flex items-center gap-2.5">
            <button
              v-if="query"
              type="button"
              aria-label="Clear query"
              class="flex items-center justify-center w-6 h-6 rounded-full text-text-muted bg-surface-3 hover:text-white hover:bg-surface-4 transition-colors duration-200"
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

            <span class="hidden sm:inline-block px-2 py-1 text-[1.1rem] font-bold tracking-wide text-text-muted bg-surface-3 border border-border-subtle rounded">ESC</span>

            <button
              type="button"
              aria-label="Close Search"
              class="flex items-center justify-center w-9 h-9 rounded-full text-text-muted hover:text-white hover:bg-surface-3 transition-colors duration-200"
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
        <div class="flex flex-col sm:flex-row sm:items-center gap-2.5 pt-3 border-t border-border-subtle">
          <span class="text-[1.2rem] font-semibold uppercase tracking-wide text-text-subtle shrink-0">Popular Searches:</span>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="tag in popularTags"
              :key="tag"
              type="button"
              class="inline-flex items-center px-3 py-1 text-[1.25rem] font-medium text-text-secondary bg-surface-2 border border-border-subtle rounded-full cursor-pointer hover:text-white hover:bg-surface-3 hover:border-primary-amber hover:-translate-y-0.5 transition-all duration-200"
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
