<template>
  <main class="main min-h-[85vh] pb-24">
    <!-- 1. SEARCH DESTINATION HEADER -->
    <div
      class="relative w-full max-w-[1200px] mx-auto px-4 sm:px-8 pt-10 sm:pt-16 pb-8"
    >
      <div
        class="flex flex-col items-center text-center max-w-[760px] mx-auto mb-8"
      >
        <div
          class="flex items-center gap-2 mb-2 text-[1.2rem] font-semibold tracking-wider uppercase text-primary-amber"
        >
          <span
            class="w-2 h-2 rounded-full bg-primary-amber animate-pulse shadow-glow"
          />
          <span>Universal Search</span>
        </div>
        <h1
          class="m-0 mb-3 font-display text-[2.8rem] sm:text-[4rem] font-extrabold text-white -tracking-tight"
        >
          Find Any Film, Series, or Actor
        </h1>
        <p class="m-0 text-[1.45rem] sm:text-[1.6rem] text-text-muted">
          Search across millions of titles, cast filmographies, and television
          releases.
        </p>
      </div>

      <!-- Prominent Search Bar Input Box -->
      <form
        class="relative w-full max-w-[800px] mx-auto"
        @submit.prevent="executeSearch"
      >
        <div
          class="relative flex items-center w-full h-14 sm:h-16 px-5 rounded-2xl bg-surface-1 border border-border-medium focus-within:border-primary-amber focus-within:ring-2 focus-within:ring-primary-amber/25 shadow-cinema-md transition-all duration-200"
        >
          <span class="flex items-center text-text-muted mr-3">
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
            id="search-destination-input"
            ref="searchInput"
            v-model="currentQuery"
            type="text"
            placeholder="Search by title, director, actor..."
            class="flex-1 !h-full !text-[1.6rem] sm:!text-[1.8rem] !font-medium !text-white !bg-transparent !border-none !outline-none !shadow-none placeholder:text-text-subtle !p-0"
            @input="handleInput"
          />

          <!-- Clear Button -->
          <button
            v-if="currentQuery"
            type="button"
            aria-label="Clear Search Input"
            class="flex items-center justify-center w-7 h-7 mr-2 rounded-full text-text-muted hover:text-white bg-surface-3 transition-colors duration-150 cursor-pointer"
            @click="clearSearch"
          >
            <svg
              width="14"
              height="14"
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

          <!-- Submit / Action Button -->
          <Button
            type="submit"
            class="p-button-primary !hidden sm:!inline-flex !items-center !justify-center !h-10 !px-5 !text-[1.3rem] !font-bold !rounded-xl"
          >
            Search
          </Button>
        </div>

        <!-- Quick Trending Suggestions Pills -->
        <div
          class="flex flex-wrap items-center justify-center gap-2 mt-4 text-[1.25rem]"
        >
          <span class="text-text-subtle mr-1 text-[1.2rem]">Trending:</span>
          <button
            v-for="term in popularTags"
            :key="`trending-tag-${term}`"
            v-ripple
            type="button"
            class="inline-flex items-center px-3 py-1 text-[1.2rem] font-medium text-text-secondary bg-surface-2 border border-border-subtle rounded-lg cursor-pointer hover:text-white hover:bg-surface-3 hover:border-primary-amber/40 transition-colors duration-150 outline-none focus-visible:ring-2 focus-visible:ring-primary-amber"
            @click="selectTrending(term)"
          >
            {{ term }}
          </button>
        </div>
      </form>
    </div>

    <!-- 2. SEARCH RESULTS VIEW (When query exists) -->
    <div
      v-if="currentQuery && items && items.results"
      class="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 mt-6"
    >
      <!-- Results Subheader & Media Type Filters -->
      <div
        class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-border-subtle"
      >
        <div>
          <h2
            class="m-0 text-[1.8rem] sm:text-[2.2rem] font-bold text-white -tracking-wide"
          >
            Results for &ldquo;{{ currentQuery }}&rdquo;
          </h2>
          <span class="text-[1.3rem] text-text-muted">
            {{ filteredResults.length }}
            {{ filteredResults.length === 1 ? 'match' : 'matches' }} found
          </span>
        </div>

        <!-- Filter Tabs & Sort Controls -->
        <div class="flex flex-wrap items-center gap-3">
          <!-- Filter Tabs -->
          <div
            class="inline-flex items-center p-1 rounded-xl bg-surface-1 border border-border-subtle overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <button
              v-ripple
              type="button"
              class="px-3.5 py-1.5 text-[1.25rem] font-medium rounded-lg whitespace-nowrap cursor-pointer transition-all duration-150 outline-none focus-visible:ring-2 focus-visible:ring-primary-amber"
              :class="
                activeFilter === 'all'
                  ? 'text-white bg-surface-3 font-semibold shadow-cinema-sm'
                  : 'text-text-muted hover:text-white hover:bg-surface-2'
              "
              @click="activeFilter = 'all'"
            >
              All ({{ items.results.length }})
            </button>
            <button
              v-if="counts.movie"
              v-ripple
              type="button"
              class="px-3.5 py-1.5 text-[1.25rem] font-medium rounded-lg whitespace-nowrap cursor-pointer transition-all duration-150 outline-none focus-visible:ring-2 focus-visible:ring-primary-amber"
              :class="
                activeFilter === 'movie'
                  ? 'text-white bg-surface-3 font-semibold shadow-cinema-sm'
                  : 'text-text-muted hover:text-white hover:bg-surface-2'
              "
              @click="activeFilter = 'movie'"
            >
              Movies ({{ counts.movie }})
            </button>
            <button
              v-if="counts.tv"
              v-ripple
              type="button"
              class="px-3.5 py-1.5 text-[1.25rem] font-medium rounded-lg whitespace-nowrap cursor-pointer transition-all duration-150 outline-none focus-visible:ring-2 focus-visible:ring-primary-amber"
              :class="
                activeFilter === 'tv'
                  ? 'text-white bg-surface-3 font-semibold shadow-cinema-sm'
                  : 'text-text-muted hover:text-white hover:bg-surface-2'
              "
              @click="activeFilter = 'tv'"
            >
              TV ({{ counts.tv }})
            </button>
            <button
              v-if="counts.person"
              v-ripple
              type="button"
              class="px-3.5 py-1.5 text-[1.25rem] font-medium rounded-lg whitespace-nowrap cursor-pointer transition-all duration-150 outline-none focus-visible:ring-2 focus-visible:ring-primary-amber"
              :class="
                activeFilter === 'person'
                  ? 'text-white bg-surface-3 font-semibold shadow-cinema-sm'
                  : 'text-text-muted hover:text-white hover:bg-surface-2'
              "
              @click="activeFilter = 'person'"
            >
              People ({{ counts.person }})
            </button>
          </div>

          <!-- Sort Select with PrimeVue Dropdown -->
          <Dropdown
            v-model="sortBy"
            :options="sortOptions"
            option-label="label"
            option-value="value"
            aria-label="Sort Results"
            class="!bg-surface-2 !rounded-xl w-44"
          />
        </div>
      </div>

      <!-- Results Grid -->
      <div
        v-if="sortedResults.length"
        class="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 sm:gap-5"
      >
        <Card
          v-for="item in sortedResults"
          :key="`search-res-${item.id}`"
          :item="item"
          :show-media-badge="true"
        />
      </div>

      <!-- Empty Results State (when query gave 0 results) -->
      <div
        v-else
        class="flex flex-col items-center justify-center text-center py-20 px-4 max-w-[480px] mx-auto"
      >
        <div
          class="flex items-center justify-center w-16 h-16 rounded-2xl text-text-muted bg-surface-2 border border-border-subtle mb-4 shadow-cinema-sm"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>
        <h3 class="m-0 mb-2 font-display text-[2rem] font-bold text-white">
          No matches found
        </h3>
        <p class="m-0 text-[1.4rem] text-text-muted leading-relaxed">
          We couldn't find any titles for &ldquo;{{ currentQuery }}&rdquo;. Try
          searching with alternative keywords or spelling.
        </p>
      </div>

      <!-- Infinite Scroll / Load More -->
      <div
        v-if="items.page < items.total_pages"
        class="flex items-center justify-center py-12"
      >
        <div
          v-if="loading"
          class="flex items-center gap-3 text-text-muted text-[1.3rem]"
        >
          <ProgressSpinner
            style="width: 28px; height: 28px"
            stroke-width="4"
            aria-label="Loading more results"
          />
          <span>Loading more results...</span>
        </div>
      </div>
    </div>

    <!-- 3. DEFAULT DESTINATION EXPLORATION (When no query is entered yet) -->
    <div
      v-else
      class="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 mt-12"
    >
      <div
        class="flex items-center justify-between mb-6 pb-2 border-b border-border-subtle"
      >
        <div>
          <div
            class="flex items-center gap-2 mb-1.5 text-[1.15rem] font-semibold tracking-wider uppercase text-primary-amber"
          >
            <span class="w-2 h-2 rounded-full bg-primary-amber" />
            <span>In Demand</span>
          </div>
          <h2
            class="m-0 font-display text-[2.2rem] font-bold text-white -tracking-wide"
          >
            Trending Across Entertainment
          </h2>
        </div>
      </div>

      <div
        v-if="trendingCatalog && trendingCatalog.results"
        class="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 sm:gap-5"
      >
        <Card
          v-for="item in trendingCatalog.results.slice(0, 18)"
          :key="`search-trending-${item.id}`"
          :item="item"
          :show-media-badge="true"
        />
      </div>
    </div>
  </main>
</template>

<script>
import { search, getTrending } from '~/api';
import Card from '~/components/Card';

export default {
  components: {
    Card,
  },

  async asyncData({ query, error }) {
    try {
      const q = query.q || '';
      let items = null;

      if (q) {
        items = await search(q, 1);
      }

      // Always fetch trending catalog for empty state exploration
      const trendingCatalog = await getTrending('all');

      return {
        items,
        trendingCatalog,
      };
    } catch {
      error({ message: 'Search temporarily unavailable' });
    }
  },

  data() {
    return {
      currentQuery: this.$route.query.q || '',
      loading: false,
      activeFilter: 'all',
      sortBy: 'relevance',
      sortOptions: [
        { label: 'Most Relevant', value: 'relevance' },
        { label: 'Highest Rated', value: 'rating' },
        { label: 'Release Year', value: 'newest' },
      ],
      debounceTimer: null,
      popularTags: [
        'Dune',
        'Oppenheimer',
        'Interstellar',
        'Breaking Bad',
        'Succession',
        'Shogun',
      ],
    };
  },

  head() {
    return {
      title: this.currentQuery
        ? `Search: ${this.currentQuery} — CINEPULSE`
        : 'Explore & Search — CINEPULSE',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Search movies, television shows, and people on CINEPULSE.',
        },
      ],
    };
  },

  computed: {
    counts() {
      if (!this.items || !this.items.results)
        return { movie: 0, tv: 0, person: 0 };
      const res = { movie: 0, tv: 0, person: 0 };
      this.items.results.forEach((item) => {
        if (item.media_type) {
          res[item.media_type] = (res[item.media_type] || 0) + 1;
        } else if (item.title) {
          res.movie++;
        } else if (item.name) {
          res.tv++;
        }
      });
      return res;
    },

    filteredResults() {
      if (!this.items || !this.items.results) return [];
      if (this.activeFilter === 'all') return this.items.results;

      return this.items.results.filter((item) => {
        const type = item.media_type || (item.title ? 'movie' : 'tv');
        return type === this.activeFilter;
      });
    },

    sortedResults() {
      const list = [...this.filteredResults];
      if (this.sortBy === 'rating') {
        return list.sort(
          (a, b) => (b.vote_average || 0) - (a.vote_average || 0),
        );
      }
      if (this.sortBy === 'newest') {
        return list.sort((a, b) => {
          const dateA = a.release_date || a.first_air_date || '';
          const dateB = b.release_date || b.first_air_date || '';
          return dateB.localeCompare(dateA);
        });
      }
      return list;
    },
  },

  watch: {
    '$route.query.q'(newQ) {
      this.currentQuery = newQ || '';
      this.fetchResults();
    },
  },

  mounted() {
    this.$nextTick(() => {
      if (this.$refs.searchInput && this.$refs.searchInput.$el) {
        this.$refs.searchInput.$el.focus();
      } else if (this.$refs.searchInput && this.$refs.searchInput.focus) {
        this.$refs.searchInput.focus();
      }
    });

    window.addEventListener('scroll', this.handleScroll);
  },

  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
    if (this.debounceTimer) clearTimeout(this.debounceTimer);
  },

  methods: {
    handleInput() {
      if (this.debounceTimer) clearTimeout(this.debounceTimer);
      this.debounceTimer = setTimeout(() => {
        this.executeSearch();
      }, 350);
    },

    selectTrending(term) {
      this.currentQuery = term;
      this.executeSearch();
    },

    clearSearch() {
      this.currentQuery = '';
      this.items = null;
      this.$router.push({ name: 'search' });
      if (this.$refs.searchInput && this.$refs.searchInput.$el) {
        this.$refs.searchInput.$el.focus();
      } else if (this.$refs.searchInput && this.$refs.searchInput.focus) {
        this.$refs.searchInput.focus();
      }
    },

    executeSearch() {
      if (this.currentQuery.trim()) {
        this.$router.push({
          name: 'search',
          query: { q: this.currentQuery.trim() },
        });
      } else {
        this.$router.push({ name: 'search' });
        this.items = null;
      }
    },

    async fetchResults() {
      if (!this.currentQuery.trim()) {
        this.items = null;
        return;
      }

      this.loading = true;
      try {
        const data = await search(this.currentQuery.trim(), 1);
        this.items = data;
      } catch {
        this.items = { results: [], page: 1, total_pages: 0, total_results: 0 };
      } finally {
        this.loading = false;
      }
    },

    handleScroll() {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;

      if (scrollTop + clientHeight >= scrollHeight - 400 && !this.loading) {
        if (this.items && this.items.page < this.items.total_pages) {
          this.loadMore();
        }
      }
    },

    loadMore() {
      if (!this.items || this.loading) return;
      this.loading = true;

      search(this.currentQuery, this.items.page + 1)
        .then((response) => {
          this.items.results = this.items.results.concat(response.results);
          this.items.page = response.page;
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
  },
};
</script>
