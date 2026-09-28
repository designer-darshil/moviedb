<template>
  <main class="main" :class="$style.main">
    <SearchResults
      v-if="items && items.results.length"
      :title="title"
      :items="items"
      :loading="loading"
      @loadMore="loadMore" />

    <!-- Empty State -->
    <div
      v-else-if="query && (!items || !items.results.length)"
      :class="$style.emptyState">
      <div :class="$style.emptyIcon">
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
          <line x1="8" y1="11" x2="14" y2="11" />
        </svg>
      </div>

      <h2 :class="$style.emptyTitle">
        No titles found for &ldquo;{{ query }}&rdquo;
      </h2>

      <p :class="$style.emptyDescription">
        We couldn't find any movies, TV series, or people matching your query.
        Try checking your spelling or search for another title.
      </p>

      <div :class="$style.suggestions">
        <span :class="$style.suggestionLabel">Or browse curated categories:</span>
        <div :class="$style.suggestionLinks">
          <nuxt-link to="/movie" class="button">
            Explore Movies
          </nuxt-link>
          <nuxt-link to="/tv" class="button">
            Explore TV Shows
          </nuxt-link>
          <nuxt-link
            to="/"
            class="button button--primary">
            Back to Home
          </nuxt-link>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { search } from '~/api';
import SearchResults from '~/components/search/SearchResults';
let fromPage = '/';

export default {
  components: {
    SearchResults,
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
    };
  },

  head () {
    return {
      title: this.query ? `Search: ${this.query}` : 'Search',
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

    title () {
      return this.query ? `Results for “${this.query}”` : '';
    },
  },

  mounted () {
    this.$store.commit('search/openSearch');
    this.$store.commit('search/setFromPage', fromPage);
  },

  methods: {
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

<style lang="scss" module>
@import "~/assets/css/utilities/_variables.scss";

.main {
  padding-top: 8rem;
  min-height: 80vh;

  @media (min-width: $breakpoint-medium) {
    padding-top: 9rem;
  }
}

.emptyState {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 6rem 2rem 8rem;
  max-width: 600px;
  margin: 0 auto;
}

.emptyIcon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 8rem;
  height: 8rem;
  border-radius: $radius-full;
  color: $primary-color;
  background-color: rgba(229, 169, 60, 0.1);
  border: 1px solid rgba(229, 169, 60, 0.2);
  margin-bottom: 2.4rem;
}

.emptyTitle {
  margin: 0 0 1.2rem;
  font-size: 2.4rem;
  font-weight: 700;
  color: $text-primary;
  letter-spacing: -0.01em;
}

.emptyDescription {
  margin: 0 0 3.2rem;
  font-size: 1.55rem;
  line-height: 1.6;
  color: $text-muted;
}

.suggestions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.6rem;
  width: 100%;
}

.suggestionLabel {
  font-size: 1.3rem;
  font-weight: 600;
  color: $text-subtle;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.suggestionLinks {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 1.2rem;
}
</style>
