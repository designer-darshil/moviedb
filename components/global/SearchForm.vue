<template>
  <div
    class="fixed inset-0 z-[150] flex items-start justify-center pt-16 sm:pt-24 px-4 pb-8 bg-[rgba(7,8,11,0.85)] backdrop-blur-md"
    @click.self="closeSearch">
    <div class="w-full max-w-[680px] bg-surface-1 border border-border-subtle rounded-xl shadow-cinema-lg p-4 sm:p-6">
      <form autocomplete="off" class="flex flex-col gap-4 w-full" @submit.prevent="goToRoute">
        <label
          class="sr-only"
          for="search">Search Movies, TV Shows, and People</label>

        <div class="flex items-center gap-3 px-3.5 py-1 bg-surface-2 border border-border-subtle rounded-lg focus-within:border-border-medium transition-colors duration-150">
          <span class="flex items-center text-text-muted">
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

          <input
            id="search"
            ref="input"
            v-model.trim="query"
            name="search"
            type="text"
            placeholder="Search movies, TV shows, people..."
            class="flex-1 h-11 text-[1.5rem] font-normal text-text-primary bg-transparent border-none outline-none placeholder:text-text-subtle"
            @keyup.enter="goToRoute"
            @input="handleInput"
            @keydown.esc="handleEscape">

          <div class="flex items-center gap-2">
            <button
              v-if="query"
              type="button"
              aria-label="Clear query"
              class="flex items-center justify-center w-6 h-6 rounded-full text-text-muted hover:text-white bg-surface-3 transition-colors duration-150"
              @click="clearQuery">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <span class="hidden sm:inline-block px-1.5 py-0.5 text-[1rem] font-medium text-text-subtle bg-surface-3 border border-border-subtle rounded">ESC</span>

            <button
              type="button"
              aria-label="Close Search"
              class="flex items-center justify-center w-8 h-8 rounded-md text-text-muted hover:text-white hover:bg-surface-3 transition-colors duration-150"
              @click="closeSearch">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Quick Trending Suggestions -->
        <div class="flex flex-wrap items-center gap-2 pt-2 border-t border-border-subtle text-[1.2rem]">
          <span class="text-text-subtle mr-1">Trending searches:</span>
          <button
            v-for="tag in popularTags"
            :key="tag"
            type="button"
            class="inline-flex items-center px-2.5 py-1 text-[1.2rem] text-text-secondary bg-surface-2 border border-border-subtle rounded-md cursor-pointer hover:text-white hover:bg-surface-3 transition-colors duration-150"
            @click="selectTag(tag)">
            {{ tag }}
          </button>
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
