<template>
  <section :class="$style.section" aria-label="Media Carousel">
    <div
      v-if="title || viewAllUrl"
      :class="$style.head">
      <div :class="$style.titleWrap">
        <span :class="$style.accentPip" />
        <h2 v-if="title" :class="$style.title">
          {{ title }}
        </h2>
      </div>

      <div :class="$style.actions">
        <nuxt-link
          v-if="viewAllUrl"
          :to="viewAllUrl"
          :class="$style.explore">
          <span>Explore All</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </nuxt-link>

        <div :class="$style.navControls">
          <button
            :class="$style.arrowBtn"
            aria-label="Previous items"
            type="button"
            :disabled="disableLeftButton"
            @click="moveToClickEvent('left')">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            :class="$style.arrowBtn"
            aria-label="Next items"
            type="button"
            :disabled="disableRightButton"
            @click="moveToClickEvent('right')">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <div class="carousel" :class="$style.carousel">
      <div
        ref="carouselElement"
        class="carousel__items"
        :class="$style.items"
        @scroll="scrollEvent">
        <Card
          v-for="item in items.results"
          :key="`card-${item.id}`"
          :item="item" />
      </div>
    </div>
  </section>
</template>

<script>
import carousel from '~/mixins/Carousel';
import Card from '~/components/Card';

export default {
  components: {
    Card,
  },

  mixins: [carousel],

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
  },

  mounted () {
    const count = this.items.results.length;
    this.calculateState(count);
  },

  methods: {
    resizeEvent () {
      const count = this.items.results.length;
      this.calculateState(count);
    },
  },
};
</script>

<style lang="scss" module>
@import '~/assets/css/utilities/_variables.scss';

.section {
  position: relative;
  margin-bottom: 4.8rem;

  @media (min-width: $breakpoint-large) {
    margin-bottom: 6.4rem;
  }
}

.head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.6rem 1.6rem;

  @media (min-width: $breakpoint-small) {
    padding: 0 3.2rem 2rem;
  }

  @media (min-width: $breakpoint-large) {
    padding: 0 4.8rem 2.4rem;
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
  height: 2rem;
  background-color: $primary-color;
  border-radius: $radius-full;
}

.title {
  margin: 0;
  font-size: 1.8rem;
  font-weight: 700;
  color: #fff;
  letter-spacing: -0.02em;

  @media (min-width: $breakpoint-large) {
    font-size: 2.2rem;
  }
}

.actions {
  display: flex;
  align-items: center;
  gap: 1.6rem;
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

.navControls {
  display: none;

  @media (min-width: $breakpoint-small) {
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }
}

.arrowBtn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.4rem;
  height: 3.4rem;
  padding: 0;
  color: $text-color;
  background-color: $surface-2;
  border: 1px solid $border-subtle;
  border-radius: $radius-full;
  cursor: pointer;
  transition: background-color $transition-fast, border-color $transition-fast, color $transition-fast;

  &:hover:not(:disabled) {
    color: #fff;
    background-color: $surface-3;
    border-color: $border-medium;
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
}

.carousel {
  position: relative;
  overflow: visible;
}

.items {
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  gap: 1.6rem;
  padding: 0.4rem 1.6rem 1.6rem;

  @media (min-width: $breakpoint-small) {
    gap: 2rem;
    padding: 0.4rem 3.2rem 2rem;
  }

  @media (min-width: $breakpoint-large) {
    gap: 2.4rem;
    padding: 0.4rem 4.8rem 2.4rem;
  }

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;

  :global(.card) {
    flex: 0 0 14rem;
    scroll-snap-align: start;

    @media (min-width: $breakpoint-xsmall) {
      flex: 0 0 17rem;
    }

    @media (min-width: $breakpoint-small) {
      flex: 0 0 19rem;
    }

    @media (min-width: $breakpoint-medium) {
      flex: 0 0 21rem;
    }

    @media (min-width: $breakpoint-large) {
      flex: 0 0 23rem;
    }

    @media (min-width: $breakpoint-cinema) {
      flex: 0 0 25rem;
    }
  }
}
</style>
