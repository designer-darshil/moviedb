<template>
  <main class="main min-h-[80vh] pb-32">
    <!-- Search Query & Filter Header -->
    <div v-if="items && items.results.length" class="px-4 sm:px-8 lg:px-12 pt-8 sm:pt-12 lg:pt-14 pb-6 sm:pb-7 lg:pb-8 max-w-[1600px] mx-auto">
      <div class="mb-5">
        <h1 class="m-0 mb-1.5 font-display text-[2.8rem] sm:text-[3.6rem] font-extrabold text-white tracking-tight">
          Results for &ldquo;{{ query }}&rdquo;
        </h1>
        <span class="text-[1.4rem] font-medium text-primary-amber">
          {{ filteredResults.length }} {{ filteredResults.length === 1 ? 'match' : 'matches' }} found
        </span>
      </div>

      <!-- Media Type Filters -->
      <div class="flex items-center gap-2 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <button
          type="button"
          class="inline-flex items-center px-4.5 py-1.5 text-[1.3rem] font-semibold rounded-full whitespace-nowrap cursor-pointer transition-all duration-200"
          :class="activeFilter === 'all'
            ? '!text-[#07080b] !bg-primary-amber !border-primary-amber !font-bold shadow-[0_2px_12px_rgba(229,169,60,0.4)]'
            : 'text-text-secondary bg-surface-1 border border-border-subtle hover:text-white hover:bg-surface-2 hover:border-border-medium'"
          @click="activeFilter = 'all'">
          All ({{ items.results.length }})
        </button>
        <button
          v-if="counts.movie"
          type="button"
          class="inline-flex items-center px-4.5 py-1.5 text-[1.3rem] font-semibold rounded-full whitespace-nowrap cursor-pointer transition-all duration-200"
          :class="activeFilter === 'movie'
            ? '!text-[#07080b] !bg-primary-amber !border-primary-amber !font-bold shadow-[0_2px_12px_rgba(229,169,60,0.4)]'
            : 'text-text-secondary bg-surface-1 border border-border-subtle hover:text-white hover:bg-surface-2 hover:border-border-medium'"
          @click="activeFilter = 'movie'">
          Movies ({{ counts.movie }})
        </button>
        <button
          v-if="counts.tv"
          type="button"
          class="inline-flex items-center px-4.5 py-1.5 text-[1.3rem] font-semibold rounded-full whitespace-nowrap cursor-pointer transition-all duration-200"
          :class="activeFilter === 'tv'
            ? '!text-[#07080b] !bg-primary-amber !border-primary-amber !font-bold shadow-[0_2px_12px_rgba(229,169,60,0.4)]'
            : 'text-text-secondary bg-surface-1 border border-border-subtle hover:text-white hover:bg-surface-2 hover:border-border-medium'"
          @click="activeFilter = 'tv'">
          TV Series ({{ counts.tv }})
        </button>
        <button
          v-if="counts.person"
          type="button"
          class="inline-flex items-center px-4.5 py-1.5 text-[1.3rem] font-semibold rounded-full whitespace-nowrap cursor-pointer transition-all duration-200"
          :class="activeFilter === 'person'
            ? '!text-[#07080b] !bg-primary-amber !border-primary-amber !font-bold shadow-[0_2px_12px_rgba(229,169,60,0.4)]'
            : 'text-text-secondary bg-surface-1 border border-border-subtle hover:text-white hover:bg-surface-2 hover:border-border-medium'"
          @click="activeFilter = 'person'">
          People ({{ counts.person }})
        </button>
      </div>
    </div>

    <!-- Results Grid -->
    <div v-if="filteredResults.length" class="px-4 sm:px-8 lg:px-12 max-w-[1600px] mx-auto">
      <div class="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 xl:grid-cols-6 gap-[1.8rem] xs:gap-[2.2rem] sm:gap-[2.6rem] xl:gap-[2.8rem]">
        <Card
          v-for="item in filteredResults"
          :key="`search-card-${item.id}`"
          :item="item" />
      </div>

      <!-- Infinite Scroll Loading Indicator -->
      <div v-if="items.page < items.total_pages" class="flex items-center justify-center py-12">
        <div v-if="loading" class="flex flex-col items-center gap-3.5">
          <span class="w-9 h-9 border-[3px] border-primary-amber/20 border-t-primary-amber rounded-full animate-spin" />
          <span class="text-[1.35rem] text-text-muted">Loading more results...</span>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div
      v-else-if="query && (!items || !items.results.length || !filteredResults.length)"
      class="flex flex-col items-center justify-center text-center py-20 px-5 max-w-[640px] mx-auto">
      <div class="flex items-center justify-center w-[8.8rem] h-[8.8rem] rounded-full text-primary-amber bg-primary-amber/10 border border-primary-amber/25 mb-6 shadow-[0_0_24px_rgba(229,169,60,0.15)]">
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.8"
          stroke-linecap="round"
          stroke-linejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
          <line x1="8" y1="11" x2="14" y2="11" />
        </svg>
      </div>

      <h2 class="m-0 mb-3 font-display text-[2.6rem] font-extrabold text-white tracking-tight">
        No titles found for &ldquo;{{ query }}&rdquo;
      </h2>

      <p class="m-0 mb-9 text-[1.6rem] leading-relaxed text-text-secondary">
        We couldn't find any movies, TV series, or people matching your query.
        Try checking your spelling or search for another title.
      </p>

      <div class="flex flex-col items-center gap-4 w-full">
        <span class="text-[1.2rem] font-bold text-text-muted uppercase tracking-widest">Or browse curated categories:</span>
        <div class="flex flex-wrap items-center justify-center gap-3">
          <nuxt-link to="/movie" class="inline-flex items-center px-5 py-2.5 text-[1.4rem] font-semibold text-text-primary bg-surface-2 border border-border-medium rounded-full hover:text-white hover:bg-surface-3 hover:border-primary-amber hover:-translate-y-0.5 transition-all duration-200">
            Explore Movies
          </nuxt-link>
          <nuxt-link to="/tv" class="inline-flex items-center px-5 py-2.5 text-[1.4rem] font-semibold text-text-primary bg-surface-2 border border-border-medium rounded-full hover:text-white hover:bg-surface-3 hover:border-primary-amber hover:-translate-y-0.5 transition-all duration-200">
            Explore TV Shows
          </nuxt-link>
          <nuxt-link to="/" class="inline-flex items-center px-5 py-2.5 text-[1.4rem] !text-[#07080b] !bg-primary-amber !border-primary-amber !font-bold shadow-[0_2px_14px_rgba(229,169,60,0.4)] rounded-full hover:-translate-y-0.5 transition-all duration-200">
            Back to Home
          </nuxt-link>
        </div>
      </div>
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
