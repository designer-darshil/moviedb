<template>
  <Dialog
    :visible="searchOpen"
    :modal="true"
    :dismissable-mask="true"
    :close-on-escape="true"
    :closable="false"
    class="cinema-search-dialog w-full max-w-[680px] mx-4"
    :content-style="{ padding: '0', background: 'transparent' }"
    @hide="closeSearch"
  >
    <div
      class="w-full bg-surface-1 border border-border-medium rounded-2xl shadow-cinema-xl p-5 sm:p-7 backdrop-blur-2xl"
    >
      <form
        autocomplete="off"
        class="flex flex-col gap-4 w-full"
        @submit.prevent="goToRoute"
      >
        <label class="sr-only" for="search-input">
          Search Movies, TV Shows, and People
        </label>

        <div
          class="flex items-center gap-3 px-4 py-1.5 bg-surface-2 border border-border-subtle rounded-xl focus-within:border-primary-amber focus-within:ring-2 focus-within:ring-primary-amber/25 transition-all duration-200"
        >
          <span class="flex items-center text-text-muted">
            <svg
              width="22"
              height="22"
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
          </span>

          <InputText
            id="search-input"
            ref="input"
            v-model.trim="query"
            name="search"
            type="text"
            placeholder="Search movies, TV series, actors..."
            class="flex-1 !h-12 !text-[1.6rem] !font-medium !text-text-primary !bg-transparent !border-none !outline-none !shadow-none placeholder:text-text-subtle !p-0"
            @keyup.enter="goToRoute"
            @input="handleInput"
            @keydown.esc="handleEscape"
          />

          <div class="flex items-center gap-2">
            <button
              v-if="query"
              type="button"
              aria-label="Clear search input"
              class="flex items-center justify-center w-6 h-6 rounded-full text-text-muted hover:text-white bg-surface-3 transition-colors duration-150 cursor-pointer"
              @click="clearQuery"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <span
              class="hidden sm:inline-block px-2 py-0.5 text-[1rem] font-bold text-text-subtle bg-surface-3 border border-border-subtle rounded-md select-none"
            >
              ESC
            </span>

            <button
              type="button"
              aria-label="Close Search Dialog"
              class="flex items-center justify-center w-8 h-8 rounded-lg text-text-muted hover:text-white hover:bg-surface-3 transition-colors duration-150 cursor-pointer"
              @click="closeSearch"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Quick Trending Suggestions -->
        <div
          class="flex flex-wrap items-center gap-2 pt-3 border-t border-border-subtle text-[1.25rem]"
        >
          <span class="text-text-subtle mr-1 text-[1.2rem]">Trending:</span>
          <button
            v-for="tag in popularTags"
            :key="tag"
            v-ripple
            type="button"
            class="inline-flex items-center px-3 py-1 text-[1.2rem] font-medium text-text-secondary bg-surface-2 border border-border-subtle rounded-lg cursor-pointer hover:text-white hover:bg-surface-3 hover:border-primary-amber/40 transition-colors duration-150 outline-none focus-visible:ring-2 focus-visible:ring-primary-amber"
            @click="selectTag(tag)"
          >
            {{ tag }}
          </button>
        </div>
      </form>
    </div>
  </Dialog>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      query: this.$route.query.q ? this.$route.query.q : '',
      popularTags: [
        'Dune',
        'Oppenheimer',
        'Interstellar',
        'Breaking Bad',
        'Succession',
        'Stranger Things',
      ],
    };
  },

  computed: {
    ...mapState('search', ['searchOpen', 'fromPage']),
  },

  watch: {
    searchOpen(val) {
      if (val) {
        this.$nextTick(() => {
          this.focusInput();
        });
      }
    },
  },

  mounted() {
    this.$nextTick(() => {
      this.focusInput();
    });
  },

  methods: {
    focusInput() {
      if (this.$refs.input && this.$refs.input.$el) {
        this.$refs.input.$el.focus();
      } else if (this.$refs.input && this.$refs.input.focus) {
        this.$refs.input.focus();
      }
    },

    handleInput() {
      if (this.query.length >= 2) {
        this.goToRoute();
      }
    },

    selectTag(tag) {
      this.query = tag;
      this.goToRoute();
    },

    clearQuery() {
      this.query = '';
      this.focusInput();
    },

    goToRoute() {
      if (this.query) {
        this.$router.push({
          name: 'search',
          query: { q: this.query },
        });
        this.closeSearch();
      }
    },

    handleEscape() {
      this.closeSearch();
    },

    closeSearch() {
      this.query = '';
      this.$store.commit('search/closeSearch');
      if (this.$route.name === 'search' && !this.$route.query.q) {
        this.$router.push({
          path: this.fromPage || '/',
        });
      }
    },
  },
};
</script>
