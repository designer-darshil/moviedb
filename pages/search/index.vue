<template>
  <main class="main min-h-[85vh] pb-24">
    <!-- 1. SEARCH DESTINATION HEADER -->
    <div
      class="relative w-full max-w-[1200px] mx-auto px-4 sm:px-8 pt-10 sm:pt-16 pb-8">
      <div
        class="flex flex-col items-center text-center max-w-[760px] mx-auto mb-8">
        <div
          class="flex items-center gap-2 mb-2 text-[1.2rem] font-semibold tracking-wider uppercase text-primary-amber">
          <span class="w-1.5 h-1.5 rounded-full bg-primary-amber" />
          <span>Global Discovery</span>
        </div>
        <h1
          class="m-0 mb-3 font-display text-[2.8rem] sm:text-[3.8rem] font-bold text-white -tracking-tight">
          Find Any Film, Series, or Actor
        </h1>
        <p class="m-0 text-[1.45rem] sm:text-[1.55rem] text-text-muted">
          Search across millions of titles, cast filmographies, and television
          releases.
        </p>
      </div>

      <!-- Prominent Search Bar Input Box -->
      <form
        class="relative w-full max-w-[800px] mx-auto"
        @submit.prevent="executeSearch">
        <div
          class="relative flex items-center w-full h-14 sm:h-16 px-5 rounded-2xl bg-surface-1 border border-border-medium focus-within:border-primary-amber shadow-cinema-md transition-all duration-200">
          <span class="flex items-center text-text-muted mr-3">
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

          <input
            id="search-destination-input"
            ref="searchInput"
            v-model="currentQuery"
            type="text"
            placeholder="Search by title, director, actor..."
            class="flex-1 h-full text-[1.6rem] sm:text-[1.8rem] font-medium text-white bg-transparent border-none outline-none placeholder:text-text-subtle"
            @input="handleInput">

          <!-- Clear Button -->
          <button
            v-if="currentQuery"
            type="button"
            aria-label="Clear Search Input"
            class="flex items-center justify-center w-7 h-7 mr-2 rounded-full text-text-muted hover:text-white bg-surface-3 transition-colors duration-150"
            @click="clearSearch">
            <svg
              width="14"
              height="14"
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

          <!-- Submit / Action Button -->
          <button
            type="submit"
            class="hidden sm:inline-flex items-center justify-center h-10 px-5 text-[1.3rem] font-semibold rounded-xl text-[#07080b] bg-primary-amber hover:bg-primary-hover transition-colors duration-150">
            Search
          </button>
        </div>

        <!-- Quick Trending Suggestions Pills -->
        <div
          class="flex flex-wrap items-center justify-center gap-2 mt-4 text-[1.25rem]">
          <span class="text-text-subtle mr-1">Trending:</span>
          <button
            v-for="term in popularTags"
            :key="`trending-tag-${term}`"
            type="button"
            class="inline-flex items-center px-3 py-1 text-[1.2rem] text-text-secondary bg-surface-2 border border-border-subtle rounded-lg cursor-pointer hover:text-white hover:bg-surface-3 hover:border-border-medium transition-colors duration-150"
            @click="selectTrending(term)">
            {{ term }}
          </button>
        </div>
      </form>
    </div>

    <!-- 2. SEARCH RESULTS VIEW (When query exists) -->
    <div
      v-if="currentQuery && items && items.results"
      class="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 mt-6">
      <!-- Results Subheader & Media Type Filters -->
      <div
        class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-border-subtle">
        <div>
          <h2
            class="m-0 text-[1.8rem] sm:text-[2rem] font-bold text-white -tracking-wide">
            Results for &ldquo;{{ currentQuery }}&rdquo;
          </h2>
          <span class="text-[1.3rem] text-text-muted">
            {{ filteredResults.length }}
            {{ filteredResults.length === 1 ? 'match' : 'matches' }} found
          </span>
        </div>

        <!-- Filter Tabs -->
        <div
          class="flex items-center gap-2 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <button
            type="button"
            class="inline-flex items-center px-3.5 py-1.5 text-[1.25rem] font-medium rounded-lg whitespace-nowrap cursor-pointer transition-colors duration-150"
            :class="
              activeFilter === 'all'
                ? 'text-white bg-surface-3 font-semibold border border-border-medium'
                : 'text-text-muted bg-surface-1 border border-border-subtle hover:text-white hover:bg-surface-2'
            "
            @click="activeFilter = 'all'">
            All ({{ items.results.length }})
          </button>
          <button
            v-if="counts.movie"
            type="button"
            class="inline-flex items-center px-3.5 py-1.5 text-[1.25rem] font-medium rounded-lg whitespace-nowrap cursor-pointer transition-colors duration-150"
            :class="
              activeFilter === 'movie'
                ? 'text-white bg-surface-3 font-semibold border border-border-medium'
                : 'text-text-muted bg-surface-1 border border-border-subtle hover:text-white hover:bg-surface-2'
            "
            @click="activeFilter = 'movie'">
            Movies ({{ counts.movie }})
          </button>
          <button
            v-if="counts.tv"
            type="button"
            class="inline-flex items-center px-3.5 py-1.5 text-[1.25rem] font-medium rounded-lg whitespace-nowrap cursor-pointer transition-colors duration-150"
            :class="
              activeFilter === 'tv'
                ? 'text-white bg-surface-3 font-semibold border border-border-medium'
                : 'text-text-muted bg-surface-1 border border-border-subtle hover:text-white hover:bg-surface-2'
            "
            @click="activeFilter = 'tv'">
            TV Shows ({{ counts.tv }})
          </button>
          <button
            v-if="counts.person"
            type="button"
            class="inline-flex items-center px-3.5 py-1.5 text-[1.25rem] font-medium rounded-lg whitespace-nowrap cursor-pointer transition-colors duration-150"
            :class="
              activeFilter === 'person'
                ? 'text-white bg-surface-3 font-semibold border border-border-medium'
                : 'text-text-muted bg-surface-1 border border-border-subtle hover:text-white hover:bg-surface-2'
            "
            @click="activeFilter = 'person'">
            People ({{ counts.person }})
          </button>
        </div>
      </div>

      <!-- Results Grid -->
      <div
        v-if="filteredResults.length"
        class="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 sm:gap-5">
        <Card
          v-for="item in filteredResults"
          :key="`search-res-${item.id}`"
          :item="item" />
      </div>

      <!-- Empty Results State (when query gave 0 results) -->
      <div
        v-else
        class="flex flex-col items-center justify-center text-center py-20 px-4 max-w-[480px] mx-auto">
        <div
          class="flex items-center justify-center w-14 h-14 rounded-full text-text-muted bg-surface-2 border border-border-subtle mb-4">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>
        <h3 class="m-0 mb-2 font-display text-[2rem] font-bold text-white">
          No matches found
        </h3>
        <p class="m-0 text-[1.4rem] text-text-secondary leading-relaxed">
          We couldn't find any results for &ldquo;{{ currentQuery }}&rdquo;. Try
          searching with alternative keywords or spelling.
        </p>
      </div>

      <!-- Infinite Scroll / Load More -->
      <div
        v-if="items.page < items.total_pages"
        class="flex items-center justify-center py-12">
        <div
          v-if="loading"
          class="flex items-center gap-3 text-text-muted text-[1.3rem]">
          <span
            class="w-5 h-5 border-2 border-white/20 border-t-primary-amber rounded-full animate-spin" />
          <span>Loading more results...</span>
        </div>
      </div>
    </div>

    <!-- 3. DEFAULT DESTINATION EXPLORATION (When no query is entered yet) -->
    <div
      v-else
      class="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 mt-12">
      <div class="flex items-center justify-between mb-6">
        <div>
          <div
            class="flex items-center gap-2 mb-1.5 text-[1.15rem] font-semibold tracking-wider uppercase text-primary-amber">
            <span class="w-1.5 h-1.5 rounded-full bg-primary-amber" />
            <span>In Demand</span>
          </div>
          <h2
            class="m-0 font-display text-[2.2rem] font-bold text-white -tracking-wide">
            Trending Searches Right Now
          </h2>
        </div>
      </div>

      <div
        v-if="trendingCatalog && trendingCatalog.results"
        class="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 sm:gap-5">
        <Card
          v-for="item in trendingCatalog.results.slice(0, 12)"
          :key="`search-trending-${item.id}`"
          :item="item" />
      </div>
    </div>
  </main>
</template>

<script>
import { search, getTrending } from '~/api';
import Card from '~/components/Card';
import { debounce } from '~/mixins/Functions';

export default {
  components: {
    Card,
  },

  async asyncData ({ query, error }) {
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

  data () {
    return {
      currentQuery: this.$route.query.q || '',
      loading: false,
      activeFilter: 'all',
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

  head () {
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
    counts () {
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

    filteredResults () {
      if (!this.items || !this.items.results) return [];
      if (this.activeFilter === 'all') return this.items.results;

      return this.items.results.filter((item) => {
        const type = item.media_type || (item.title ? 'movie' : 'tv');
        return type === this.activeFilter;
      });
    },
  },

  watch: {
    '$route.query.q' (newQ) {
      this.currentQuery = newQ || '';
      this.fetchResults();
    },
  },

  mounted () {
    this.$nextTick(() => {
      if (this.$refs.searchInput) {
        this.$refs.searchInput.focus();
      }
    });

    window.addEventListener('scroll', this.handleScroll);
  },

  beforeDestroy () {
    window.removeEventListener('scroll', this.handleScroll);
  },

  methods: {
    handleInput () {
      debounce(() => {
        this.executeSearch();
      }, 350)();
    },

    selectTrending (term) {
      this.currentQuery = term;
      this.executeSearch();
    },

    clearSearch () {
      this.currentQuery = '';
      this.items = null;
      this.$router.push({ name: 'search' });
      if (this.$refs.searchInput) {
        this.$refs.searchInput.focus();
      }
    },

    executeSearch () {
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

    async fetchResults () {
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

    handleScroll () {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;

      if (scrollTop + clientHeight >= scrollHeight - 400 && !this.loading) {
        if (this.items && this.items.page < this.items.total_pages) {
          this.loadMore();
        }
      }
    },

    loadMore () {
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
