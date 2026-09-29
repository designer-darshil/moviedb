<template>
  <main class="main tw-min-h-[80vh] tw-pb-32">
    <!-- Search Query & Filter Header -->
    <div v-if="items && items.results.length" class="tw-px-4 sm:tw-px-8 lg:tw-px-12 tw-pt-8 sm:tw-pt-12 lg:tw-pt-14 tw-pb-6 sm:tw-pb-7 lg:tw-pb-8 tw-max-w-[1600px] tw-mx-auto">
      <div class="tw-mb-5">
        <h1 class="tw-m-0 tw-mb-1.5 tw-font-display tw-text-[2.8rem] sm:tw-text-[3.6rem] tw-font-extrabold tw-text-white tw-tracking-tight">
          Results for &ldquo;{{ query }}&rdquo;
        </h1>
        <span class="tw-text-[1.4rem] tw-font-medium tw-text-primary-amber">
          {{ filteredResults.length }} {{ filteredResults.length === 1 ? 'match' : 'matches' }} found
        </span>
      </div>

      <!-- Media Type Filters -->
      <div class="tw-flex tw-items-center tw-gap-2 tw-overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:tw-hidden">
        <button
          type="button"
          class="tw-inline-flex tw-items-center tw-px-4.5 tw-py-1.5 tw-text-[1.3rem] tw-font-semibold tw-rounded-full tw-whitespace-nowrap tw-cursor-pointer tw-transition-all tw-duration-200"
          :class="activeFilter === 'all'
            ? '!tw-text-[#07080b] !tw-bg-primary-amber !tw-border-primary-amber !tw-font-bold tw-shadow-[0_2px_12px_rgba(229,169,60,0.4)]'
            : 'tw-text-text-secondary tw-bg-surface-1 tw-border tw-border-border-subtle hover:tw-text-white hover:tw-bg-surface-2 hover:tw-border-border-medium'"
          @click="activeFilter = 'all'">
          All ({{ items.results.length }})
        </button>
        <button
          v-if="counts.movie"
          type="button"
          class="tw-inline-flex tw-items-center tw-px-4.5 tw-py-1.5 tw-text-[1.3rem] tw-font-semibold tw-rounded-full tw-whitespace-nowrap tw-cursor-pointer tw-transition-all tw-duration-200"
          :class="activeFilter === 'movie'
            ? '!tw-text-[#07080b] !tw-bg-primary-amber !tw-border-primary-amber !tw-font-bold tw-shadow-[0_2px_12px_rgba(229,169,60,0.4)]'
            : 'tw-text-text-secondary tw-bg-surface-1 tw-border tw-border-border-subtle hover:tw-text-white hover:tw-bg-surface-2 hover:tw-border-border-medium'"
          @click="activeFilter = 'movie'">
          Movies ({{ counts.movie }})
        </button>
        <button
          v-if="counts.tv"
          type="button"
          class="tw-inline-flex tw-items-center tw-px-4.5 tw-py-1.5 tw-text-[1.3rem] tw-font-semibold tw-rounded-full tw-whitespace-nowrap tw-cursor-pointer tw-transition-all tw-duration-200"
          :class="activeFilter === 'tv'
            ? '!tw-text-[#07080b] !tw-bg-primary-amber !tw-border-primary-amber !tw-font-bold tw-shadow-[0_2px_12px_rgba(229,169,60,0.4)]'
            : 'tw-text-text-secondary tw-bg-surface-1 tw-border tw-border-border-subtle hover:tw-text-white hover:tw-bg-surface-2 hover:tw-border-border-medium'"
          @click="activeFilter = 'tv'">
          TV Series ({{ counts.tv }})
        </button>
        <button
          v-if="counts.person"
          type="button"
          class="tw-inline-flex tw-items-center tw-px-4.5 tw-py-1.5 tw-text-[1.3rem] tw-font-semibold tw-rounded-full tw-whitespace-nowrap tw-cursor-pointer tw-transition-all tw-duration-200"
          :class="activeFilter === 'person'
            ? '!tw-text-[#07080b] !tw-bg-primary-amber !tw-border-primary-amber !tw-font-bold tw-shadow-[0_2px_12px_rgba(229,169,60,0.4)]'
            : 'tw-text-text-secondary tw-bg-surface-1 tw-border tw-border-border-subtle hover:tw-text-white hover:tw-bg-surface-2 hover:tw-border-border-medium'"
          @click="activeFilter = 'person'">
          People ({{ counts.person }})
        </button>
      </div>
    </div>

    <!-- Results Grid -->
    <div v-if="filteredResults.length" class="tw-px-4 sm:tw-px-8 lg:tw-px-12 tw-max-w-[1600px] tw-mx-auto">
      <div class="tw-grid tw-grid-cols-2 xs:tw-grid-cols-3 sm:tw-grid-cols-4 md:tw-grid-cols-5 xl:tw-grid-cols-6 tw-gap-[1.8rem] xs:tw-gap-[2.2rem] sm:tw-gap-[2.6rem] xl:tw-gap-[2.8rem]">
        <Card
          v-for="item in filteredResults"
          :key="`search-card-${item.id}`"
          :item="item" />
      </div>

      <!-- Infinite Scroll Loading Indicator -->
      <div v-if="items.page < items.total_pages" class="tw-flex tw-items-center tw-justify-center tw-py-12">
        <div v-if="loading" class="tw-flex tw-flex-col tw-items-center tw-gap-3.5">
          <span class="tw-w-9 tw-h-9 tw-border-[3px] tw-border-primary-amber/20 tw-border-t-primary-amber tw-rounded-full tw-animate-spin" />
          <span class="tw-text-[1.35rem] tw-text-text-muted">Loading more results...</span>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div
      v-else-if="query && (!items || !items.results.length || !filteredResults.length)"
      class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-text-center tw-py-20 tw-px-5 tw-max-w-[640px] tw-mx-auto">
      <div class="tw-flex tw-items-center tw-justify-center tw-w-[8.8rem] tw-h-[8.8rem] tw-rounded-full tw-text-primary-amber tw-bg-primary-amber/10 tw-border tw-border-primary-amber/25 tw-mb-6 tw-shadow-[0_0_24px_rgba(229,169,60,0.15)]">
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

      <h2 class="tw-m-0 tw-mb-3 tw-font-display tw-text-[2.6rem] tw-font-extrabold tw-text-white tw-tracking-tight">
        No titles found for &ldquo;{{ query }}&rdquo;
      </h2>

      <p class="tw-m-0 tw-mb-9 tw-text-[1.6rem] tw-leading-relaxed tw-text-text-secondary">
        We couldn't find any movies, TV series, or people matching your query.
        Try checking your spelling or search for another title.
      </p>

      <div class="tw-flex tw-flex-col tw-items-center tw-gap-4 tw-w-full">
        <span class="tw-text-[1.2rem] tw-font-bold tw-text-text-muted tw-uppercase tw-tracking-widest">Or browse curated categories:</span>
        <div class="tw-flex tw-flex-wrap tw-items-center tw-justify-center tw-gap-3">
          <nuxt-link to="/movie" class="tw-inline-flex tw-items-center tw-px-5 tw-py-2.5 tw-text-[1.4rem] tw-font-semibold tw-text-text-primary tw-bg-surface-2 tw-border tw-border-border-medium tw-rounded-full hover:tw-text-white hover:tw-bg-surface-3 hover:tw-border-primary-amber hover:-tw-translate-y-0.5 tw-transition-all tw-duration-200">
            Explore Movies
          </nuxt-link>
          <nuxt-link to="/tv" class="tw-inline-flex tw-items-center tw-px-5 tw-py-2.5 tw-text-[1.4rem] tw-font-semibold tw-text-text-primary tw-bg-surface-2 tw-border tw-border-border-medium tw-rounded-full hover:tw-text-white hover:tw-bg-surface-3 hover:tw-border-primary-amber hover:-tw-translate-y-0.5 tw-transition-all tw-duration-200">
            Explore TV Shows
          </nuxt-link>
          <nuxt-link to="/" class="tw-inline-flex tw-items-center tw-px-5 tw-py-2.5 tw-text-[1.4rem] !tw-text-[#07080b] !tw-bg-primary-amber !tw-border-primary-amber !tw-font-bold tw-shadow-[0_2px_14px_rgba(229,169,60,0.4)] tw-rounded-full hover:-tw-translate-y-0.5 tw-transition-all tw-duration-200">
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
