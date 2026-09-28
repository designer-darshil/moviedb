<template>
  <div :class="$style.container">
    <!-- Search Header -->
    <div :class="$style.header">
      <div :class="$style.titleRow">
        <h1 :class="$style.queryTitle">
          {{ title }}
        </h1>
        <span v-if="filteredTotal !== null" :class="$style.countBadge">
          {{ filteredTotal }} {{ filteredTotal === 1 ? 'Title' : 'Titles' }}
        </span>
      </div>

      <!-- Category Filter Tabs -->
      <div :class="$style.tabs">
        <button
          type="button"
          :class="[$style.tab, { [$style.tabActive]: activeTab === 'all' }]"
          @click="setTab('all')">
          All
          <span :class="$style.tabCount">{{ items.results.length }}</span>
        </button>
        <button
          v-if="movieCount"
          type="button"
          :class="[$style.tab, { [$style.tabActive]: activeTab === 'movie' }]"
          @click="setTab('movie')">
          Movies
          <span :class="$style.tabCount">{{ movieCount }}</span>
        </button>
        <button
          v-if="tvCount"
          type="button"
          :class="[$style.tab, { [$style.tabActive]: activeTab === 'tv' }]"
          @click="setTab('tv')">
          TV Shows
          <span :class="$style.tabCount">{{ tvCount }}</span>
        </button>
        <button
          v-if="personCount"
          type="button"
          :class="[$style.tab, { [$style.tabActive]: activeTab === 'person' }]"
          @click="setTab('person')">
          People
          <span :class="$style.tabCount">{{ personCount }}</span>
        </button>
      </div>
    </div>

    <!-- Media Grid -->
    <div v-if="filteredItems.length" :class="$style.grid">
      <Card
        v-for="item in filteredItems"
        :key="`search-card-${item.id}`"
        :item="item" />

      <!-- Skeletons when loading more -->
      <template v-if="loading">
        <div
          v-for="n in 6"
          :key="`search-skeleton-${n}`"
          :class="$style.skeletonCard">
          <div :class="$style.skeletonPoster" />
          <div :class="$style.skeletonMeta" />
          <div :class="$style.skeletonTitle" />
        </div>
      </template>
    </div>

    <!-- Empty Filter State -->
    <div v-else :class="$style.emptyFilter">
      <p>No results in this category.</p>
      <button type="button" class="button button--secondary" @click="setTab('all')">
        Show All Results
      </button>
    </div>

    <!-- Navigation / Load More Spinner -->
    <div :class="$style.nav">
      <div v-if="loading" :class="$style.spinnerWrap">
        <svg width="36" height="36" viewBox="0 0 44 44" stroke="#e5a93c">
          <g fill="none" fill-rule="evenodd" stroke-width="2.5">
            <circle cx="22" cy="22" r="1">
              <animate attributeName="r" begin="0s" dur="1.8s" values="1; 20" calcMode="spline" keyTimes="0; 1" keySplines="0.165, 0.84, 0.44, 1" repeatCount="indefinite" />
              <animate attributeName="stroke-opacity" begin="0s" dur="1.8s" values="1; 0" calcMode="spline" keyTimes="0; 1" keySplines="0.3, 0.61, 0.355, 1" repeatCount="indefinite" />
            </circle>
            <circle cx="22" cy="22" r="1">
              <animate attributeName="r" begin="-0.9s" dur="1.8s" values="1; 20" calcMode="spline" keyTimes="0; 1" keySplines="0.165, 0.84, 0.44, 1" repeatCount="indefinite" />
              <animate attributeName="stroke-opacity" begin="-0.9s" dur="1.8s" values="1; 0" calcMode="spline" keyTimes="0; 1" keySplines="0.3, 0.61, 0.355, 1" repeatCount="indefinite" />
            </circle>
          </g>
        </svg>
      </div>

      <div
        v-else-if="items.page >= items.total_pages && items.results.length"
        :class="$style.endOfResults">
        <span>End of search results</span>
      </div>
    </div>
  </div>
</template>

<script>
import { debounce } from '~/mixins/Functions';
import Card from '~/components/Card';

export default {
  components: {
    Card,
  },

  props: {
    title: {
      type: String,
      required: false,
      default: '',
    },

    items: {
      type: Object,
      required: true,
    },

    loading: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  data () {
    return {
      activeTab: 'all',
    };
  },

  computed: {
    movieCount () {
      return this.items.results.filter(i => (i.media_type === 'movie' || (!i.media_type && i.title))).length;
    },

    tvCount () {
      return this.items.results.filter(i => (i.media_type === 'tv' || (!i.media_type && i.name && i.first_air_date))).length;
    },

    personCount () {
      return this.items.results.filter(i => (i.media_type === 'person' || (!i.media_type && i.name && !i.first_air_date))).length;
    },

    filteredItems () {
      if (this.activeTab === 'all') {
        return this.items.results;
      }
      return this.items.results.filter((i) => {
        if (this.activeTab === 'movie') {
          return i.media_type === 'movie' || (!i.media_type && i.title);
        } else if (this.activeTab === 'tv') {
          return i.media_type === 'tv' || (!i.media_type && i.name && i.first_air_date);
        } else if (this.activeTab === 'person') {
          return i.media_type === 'person' || (!i.media_type && i.name && !i.first_air_date);
        }
        return true;
      });
    },

    filteredTotal () {
      return this.filteredItems.length;
    },
  },

  mounted () {
    window.addEventListener('scroll', this.getScrollPosition);
  },

  beforeDestroy () {
    window.removeEventListener('scroll', this.getScrollPosition);
  },

  methods: {
    setTab (tab) {
      this.activeTab = tab;
    },

    getScrollPosition: debounce(function () {
      if (this.items.page < this.items.total_pages) {
        const bottomOfWindow = (window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 600;
        if (bottomOfWindow && !this.loading) this.loadMore();
      } else {
        window.removeEventListener('scroll', this.getScrollPosition);
      }
    }, 50),

    loadMore () {
      this.$emit('loadMore');
    },
  },
};
</script>

<style lang="scss" module>
@import '~/assets/css/utilities/_variables.scss';

.container {
  padding: 3.2rem 1.6rem;
  max-width: 1600px;
  margin: 0 auto;

  @media (min-width: $breakpoint-small) {
    padding: 4rem 3.2rem;
  }

  @media (min-width: $breakpoint-large) {
    padding: 4.8rem 4.8rem;
  }
}

.header {
  margin-bottom: 3.2rem;
  padding-bottom: 2.4rem;
  border-bottom: 1px solid $border-subtle;
}

.titleRow {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 1.2rem;
  margin-bottom: 2rem;
}

.queryTitle {
  margin: 0;
  font-size: 2.2rem;
  font-weight: 700;
  color: #fff;
  letter-spacing: -0.02em;

  @media (min-width: $breakpoint-large) {
    font-size: 3rem;
  }
}

.countBadge {
  font-size: 1.4rem;
  color: $text-muted;
}

.tabs {
  display: flex;
  gap: 0.8rem;
  overflow-x: auto;
  padding-bottom: 0.4rem;

  &::-webkit-scrollbar {
    display: none;
  }
}

.tab {
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.8rem 1.6rem;
  font-size: 1.35rem;
  font-weight: 500;
  color: $text-color-grey;
  background-color: $surface-1;
  border: 1px solid $border-subtle;
  border-radius: $radius-full;
  cursor: pointer;
  white-space: nowrap;
  transition: all $transition-fast;

  &:hover {
    color: #fff;
    border-color: $border-medium;
  }
}

.tabActive {
  color: #0b0c0e;
  font-weight: 600;
  background-color: $primary-color;
  border-color: $primary-color;

  &:hover {
    color: #000;
    background-color: $primary-hover;
    border-color: $primary-hover;
  }

  .tabCount {
    color: rgba(0, 0, 0, 0.7);
    background-color: rgba(0, 0, 0, 0.15);
  }
}

.tabCount {
  padding: 0.15rem 0.6rem;
  font-size: 1.15rem;
  font-weight: 600;
  color: $text-muted;
  background-color: rgba(255, 255, 255, 0.06);
  border-radius: $radius-full;
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 2rem 1.6rem;

  @media (min-width: $breakpoint-xsmall) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 2.4rem 2rem;
  }

  @media (min-width: $breakpoint-small) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 2.8rem 2.2rem;
  }

  @media (min-width: $breakpoint-medium) {
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 3.2rem 2.4rem;
  }

  @media (min-width: 1500px) {
    grid-template-columns: repeat(6, minmax(0, 1fr));
  }
}

.skeletonCard {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.skeletonPoster {
  position: relative;
  width: 100%;
  padding-top: 150%;
  border-radius: $radius-md;
  background: linear-gradient(90deg, $surface-2 25%, $surface-3 50%, $surface-2 75%);
  background-size: 200% 100%;
  animation: shimmer 1.6s infinite;
}

.skeletonMeta {
  width: 40%;
  height: 1.2rem;
  margin-top: 1rem;
  border-radius: $radius-sm;
  background: $surface-2;
}

.skeletonTitle {
  width: 75%;
  height: 1.6rem;
  margin-top: 0.6rem;
  border-radius: $radius-sm;
  background: $surface-2;
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

.emptyFilter {
  padding: 6rem 2rem;
  text-align: center;
  color: $text-muted;
  font-size: 1.5rem;

  button {
    margin-top: 1.6rem;
  }
}

.nav {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 0;
}

.spinnerWrap {
  display: flex;
  align-items: center;
  justify-content: center;
}

.endOfResults {
  padding: 1rem 2rem;
  font-size: 1.3rem;
  font-weight: 500;
  color: $text-muted;
  background-color: $surface-1;
  border: 1px solid $border-subtle;
  border-radius: $radius-full;
}
</style>
