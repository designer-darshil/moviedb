<template>
  <div :class="$style.listing">
    <div
      v-if="title || viewAllUrl"
      :class="$style.head">
      <div :class="$style.titleWrap">
        <span :class="$style.accentPip" />
        <h1 v-if="title" :class="$style.title">
          {{ title }}
        </h1>
      </div>

      <nuxt-link
        v-if="viewAllUrl"
        :to="viewAllUrl"
        :class="$style.explore">
        <span>Explore All</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </nuxt-link>
    </div>

    <!-- Responsive Media Grid -->
    <div :class="$style.grid">
      <Card
        v-for="item in items.results"
        :key="`card-${item.id}`"
        :item="item" />

      <!-- Skeleton Loading Cards -->
      <template v-if="loading">
        <div
          v-for="n in 6"
          :key="`skeleton-${n}`"
          :class="$style.skeletonCard">
          <div :class="$style.skeletonPoster" />
          <div :class="$style.skeletonMeta" />
          <div :class="$style.skeletonTitle" />
        </div>
      </template>
    </div>

    <!-- Infinite scroll indicator / End of results -->
    <div :class="$style.nav">
      <div v-if="loading" :class="$style.spinnerWrap">
        <svg :class="$style.spinner" width="36" height="36" viewBox="0 0 44 44" stroke="#e5a93c">
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
        v-else-if="items.results && items.results.length && items.page >= items.total_pages"
        :class="$style.endOfResults">
        <span>End of catalogue</span>
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

    viewAllUrl: {
      type: Object,
      required: false,
      default: function () {
        return null;
      },
    },

    items: {
      type: Object,
      required: true,
    },

    show: {
      type: Number,
      required: false,
      default: null,
    },

    loading: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  created () {
    if (this.show) {
      this.items.results = this.items.results.splice(0, this.show);
      this.items.total_pages = 1;
      this.items.total_results = this.show;
    }
  },

  mounted () {
    window.addEventListener('scroll', this.getScrollPosition);
  },

  beforeDestroy () {
    window.removeEventListener('scroll', this.getScrollPosition);
  },

  methods: {
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

.listing {
  padding: 2.4rem 1.6rem;
  max-width: 1600px;
  margin: 0 auto;

  @media (min-width: $breakpoint-small) {
    padding: 3.6rem 3.2rem;
  }

  @media (min-width: $breakpoint-large) {
    padding: 4.8rem 4.8rem;
  }
}

.head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2.4rem;

  @media (min-width: $breakpoint-large) {
    margin-bottom: 3.2rem;
  }
}

.titleWrap {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.accentPip {
  display: inline-block;
  width: 4px;
  height: 2.2rem;
  background-color: $primary-color;
  border-radius: $radius-full;
}

.title {
  margin: 0;
  font-size: 2rem;
  font-weight: 700;
  color: #fff;
  letter-spacing: -0.02em;

  @media (min-width: $breakpoint-large) {
    font-size: 2.8rem;
  }
}

.explore {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 1.3rem;
  font-weight: 500;
  color: $text-muted;
  text-decoration: none;
  transition: color $transition-fast, transform $transition-fast;

  &:hover {
    color: $primary-color;
    transform: translateX(2px);
  }
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
  letter-spacing: 0.03em;
}
</style>
