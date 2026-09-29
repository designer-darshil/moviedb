<template>
  <main class="main min-h-[80vh] pb-24">
    <!-- Search Query & Filter Header -->
    <div v-if="items && items.results.length" class="px-4 sm:px-8 lg:px-12 pt-8 sm:pt-10 pb-6 max-w-[1600px] mx-auto">
      <div class="mb-4">
        <h1 class="m-0 mb-1 font-display text-[2.4rem] sm:text-[3rem] font-bold text-white -tracking-wide">
          Results for &ldquo;{{ query }}&rdquo;
        </h1>
        <span class="text-[1.3rem] text-text-muted">
          {{ filteredResults.length }} {{ filteredResults.length === 1 ? 'result' : 'results' }}
        </span>
      </div>

      <!-- Media Type Filters -->
      <div class="flex items-center gap-2 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <button
          type="button"
          class="inline-flex items-center px-3.5 py-1.5 text-[1.25rem] font-medium rounded-md whitespace-nowrap cursor-pointer transition-colors duration-150"
          :class="activeFilter === 'all'
            ? 'text-white bg-surface-3 font-semibold'
            : 'text-text-muted bg-surface-1 border border-border-subtle hover:text-white hover:bg-surface-2'"
          @click="activeFilter = 'all'">
          All ({{ items.results.length }})
        </button>
        <button
          v-if="counts.movie"
          type="button"
          class="inline-flex items-center px-3.5 py-1.5 text-[1.25rem] font-medium rounded-md whitespace-nowrap cursor-pointer transition-colors duration-150"
          :class="activeFilter === 'movie'
            ? 'text-white bg-surface-3 font-semibold'
            : 'text-text-muted bg-surface-1 border border-border-subtle hover:text-white hover:bg-surface-2'"
          @click="activeFilter = 'movie'">
          Movies ({{ counts.movie }})
        </button>
        <button
          v-if="counts.tv"
          type="button"
          class="inline-flex items-center px-3.5 py-1.5 text-[1.25rem] font-medium rounded-md whitespace-nowrap cursor-pointer transition-colors duration-150"
          :class="activeFilter === 'tv'
            ? 'text-white bg-surface-3 font-semibold'
            : 'text-text-muted bg-surface-1 border border-border-subtle hover:text-white hover:bg-surface-2'"
          @click="activeFilter = 'tv'">
          TV Shows ({{ counts.tv }})
        </button>
        <button
          v-if="counts.person"
          type="button"
          class="inline-flex items-center px-3.5 py-1.5 text-[1.25rem] font-medium rounded-md whitespace-nowrap cursor-pointer transition-colors duration-150"
          :class="activeFilter === 'person'
            ? 'text-white bg-surface-3 font-semibold'
            : 'text-text-muted bg-surface-1 border border-border-subtle hover:text-white hover:bg-surface-2'"
          @click="activeFilter = 'person'">
          People ({{ counts.person }})
        </button>
      </div>
    </div>

    <!-- Results Grid -->
    <div v-if="filteredResults.length" class="px-4 sm:px-8 lg:px-12 max-w-[1600px] mx-auto">
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5">
        <Card
          v-for="item in filteredResults"
          :key="`search-card-${item.id}`"
          :item="item" />
      </div>

      <!-- Infinite Scroll Loading Indicator -->
      <div v-if="items.page < items.total_pages" class="flex items-center justify-center py-12">
        <div v-if="loading" class="flex items-center gap-3 text-text-muted text-[1.3rem]">
          <span class="w-5 h-5 border-2 border-white/20 border-t-primary-amber rounded-full animate-spin" />
          <span>Loading more results...</span>
        </div>
      </div>
    </div>

    <!-- Clean, Minimal Empty State -->
    <div
      v-else-if="query && (!items || !items.results.length || !filteredResults.length)"
      class="flex flex-col items-center justify-center text-center py-24 px-4 max-w-[480px] mx-auto">
      <div class="flex items-center justify-center w-14 h-14 rounded-full text-text-muted bg-surface-2 border border-border-subtle mb-4">
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

      <h2 class="m-0 mb-2 font-display text-[2rem] font-bold text-white">
        No results found
      </h2>

      <p class="m-0 mb-6 text-[1.4rem] text-text-secondary">
        We couldn't find anything matching &ldquo;{{ query }}&rdquo;. Try searching with another term.
      </p>

      <nuxt-link
        to="/"
        class="inline-flex items-center px-4 py-2 text-[1.3rem] font-medium text-text-primary bg-surface-2 border border-border-subtle rounded-md hover:bg-surface-3 hover:text-white transition-colors duration-150">
        Back to Home
      </nuxt-link>
    </div>
  </main>
</template>

<script>
import { search } from '~/api';
import Card from '~/components/Card';
let fromPage = '/';

export default {
  components: {
    Card,
  },

  beforeRouteEnter (to, from, next) {
    fromPage = from.path;
    next();
  },

  beforeRouteUpdate (to, from, next) {
    next();
    this.getResults();
  },

  beforeRouteLeave (to, from, next) {
    const searchInput = document.getElementById('search');

    next();

    if (searchInput && searchInput.value.length) {
      this.$store.commit('search/closeSearch');
    }
  },

  async asyncData ({ query, error, redirect }) {
    try {
      if (query.q) {
        const items = await search(query.q, 1);
        return { items };
      } else {
        redirect('/');
      }
    } catch {
      error({ message: 'Page not found' });
    }
  },

  data () {
    return {
      loading: false,
      activeFilter: 'all',
    };
  },

  head () {
    return {
      title: this.query ? `Search: ${this.query} — CINEPULSE` : 'Search — CINEPULSE',
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: `Search: ${this.query}`,
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: `${process.env.FRONTEND_URL}${this.$route.path}`,
        },
      ],
      bodyAttrs: {
        class: 'page page-search',
      },
    };
  },

  computed: {
    query () {
      return this.$route.query.q ? this.$route.query.q : '';
    },

    counts () {
      if (!this.items || !this.items.results) return { movie: 0, tv: 0, person: 0 };
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

  mounted () {
    this.$store.commit('search/openSearch');
    this.$store.commit('search/setFromPage', fromPage);
    window.addEventListener('scroll', this.handleScroll);
  },

  beforeDestroy () {
    window.removeEventListener('scroll', this.handleScroll);
  },

  methods: {
    handleScroll () {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;

      if (scrollTop + clientHeight >= scrollHeight - 400 && !this.loading) {
        if (this.items && this.items.page < this.items.total_pages) {
          this.loadMore();
        }
      }
    },

    async getResults () {
      if (!this.query.length) {
        this.items = null;
        return;
      }

      const data = await search(this.query);

      if (!data || !data.total_results) {
        this.items = { results: [], page: 1, total_pages: 0, total_results: 0 };
        return;
      }

      this.items = data;
    },

    loadMore () {
      this.loading = true;

      search(this.query, this.items.page + 1)
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
