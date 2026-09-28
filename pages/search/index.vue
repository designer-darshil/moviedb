<template>
  <main class="main">
    <TopNav
      :title="title || 'Search'" />

    <!-- Search Results View -->
    <SearchResults
      v-if="items && items.results && items.results.length"
      :title="title"
      :items="items"
      :loading="loading"
      @loadMore="loadMore" />

    <!-- Zero Results State -->
    <div v-else-if="searched && (!items || !items.results || !items.results.length)" :class="$style.emptyState">
      <div :class="$style.emptyCard">
        <div :class="$style.emptyIcon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
            <line x1="8" y1="11" x2="14" y2="11" />
          </svg>
        </div>
        <h2 :class="$style.emptyTitle">
          You've searched beyond the catalogue
        </h2>
        <p :class="$style.emptyText">
          We couldn't find any films, shows, or people matching "{{ query }}".
        </p>
        <div :class="$style.emptyActions">
          <button type="button" class="button button--primary" @click="openSearchModal">
            Search Again
          </button>
          <nuxt-link to="/" class="button button--secondary">
            Return to Home
          </nuxt-link>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { search } from '~/api';
import TopNav from '~/components/global/TopNav';
import SearchResults from '~/components/search/SearchResults';
let fromPage = '/';

export default {
  components: {
    TopNav,
    SearchResults,
  },

  data () {
    return {
      loading: false,
      searched: false,
    };
  },

  head () {
    return {
      title: this.title ? `${this.title} — CinemaDB` : 'Search — CinemaDB',
      meta: [
        { hid: 'og:title', property: 'og:title', content: this.title || 'Search' },
        { hid: 'og:url', property: 'og:url', content: `${process.env.FRONTEND_URL}${this.$route.path}` },
      ],
      bodyAttrs: {
        class: 'page page-search topnav-active',
      },
    };
  },

  computed: {
    query () {
      return this.$route.query.q ? this.$route.query.q : '';
    },

    title () {
      return this.query ? `Results for "${this.query}"` : 'Catalogue Search';
    },
  },

  async asyncData ({ query, error, redirect }) {
    try {
      if (query.q) {
        const items = await search(query.q, 1);
        return { items, searched: true };
      } else {
        redirect('/');
      }
    } catch {
      error({ message: 'Error retrieving search results' });
    }
  },

  mounted () {
    this.$store.commit('search/setFromPage', fromPage);
    this.searched = true;
  },

  beforeRouteEnter (to, from, next) {
    fromPage = from.path;
    next();
  },

  beforeRouteUpdate (to, from, next) {
    next();
    this.getResults();
  },

  methods: {
    openSearchModal () {
      this.$store.commit('search/openSearch');
    },

    async getResults () {
      if (!this.query.length) {
        this.items = null;
        this.searched = false;
        return;
      }

      this.loading = true;
      try {
        const data = await search(this.query);
        this.items = data;
      } catch {
        this.items = null;
      } finally {
        this.loading = false;
        this.searched = true;
      }
    },

    loadMore () {
      if (!this.items || this.loading) return;
      this.loading = true;

      search(this.query, this.items.page + 1).then((response) => {
        this.items.results = this.items.results.concat(response.results);
        this.items.page = response.page;
        this.loading = false;
      }).catch(() => {
        this.loading = false;
      });
    },
  },
};
</script>

<style lang="scss" module>
@import '~/assets/css/utilities/_variables.scss';

.emptyState {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8rem 2rem;
  min-height: 60vh;
}

.emptyCard {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 48rem;
  padding: 4.8rem 3.2rem;
  background-color: $surface-1;
  border: 1px solid $border-subtle;
  border-radius: $radius-lg;
}

.emptyIcon {
  color: $primary-color;
  margin-bottom: 2rem;
}

.emptyTitle {
  margin: 0 0 1rem;
  font-size: 2.2rem;
  font-weight: 700;
  color: #fff;
  letter-spacing: -0.02em;
}

.emptyText {
  margin: 0 0 2.8rem;
  font-size: 1.5rem;
  line-height: 1.6;
  color: $text-muted;
}

.emptyActions {
  display: flex;
  flex-wrap: wrap;
  gap: 1.2rem;
  justify-content: center;
}
</style>
