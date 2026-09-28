<template>
  <section :class="$style.section">
    <div :class="$style.head">
      <div :class="$style.titleGroup">
        <span :class="$style.accentBar" />
        <h2 v-if="title" :class="$style.title">
          {{ title }}
        </h2>
      </div>

      <div :class="$style.controls">
        <nuxt-link v-if="viewAllUrl" :to="viewAllUrl" :class="$style.explore">
          <span>Explore All</span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </nuxt-link>

        <div :class="$style.navButtons">
          <button
            :class="$style.navBtn"
            aria-label="Scroll left"
            type="button"
            :disabled="disableLeftButton"
            @click="moveToClickEvent('left')">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <button
            :class="$style.navBtn"
            aria-label="Scroll right"
            type="button"
            :disabled="disableRightButton"
            @click="moveToClickEvent('right')">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <div :class="$style.carousel">
      <div ref="carouselElement" :class="$style.items" @scroll="scrollEvent">
        <div
          v-for="item in items.results"
          :key="`card-${item.id}`"
          :class="$style.item">
          <Card :item="item" />
        </div>

        <!-- Explore All Card -->
        <div v-if="viewAllUrl" :class="[$style.item, $style.exploreCardItem]">
          <nuxt-link :to="viewAllUrl" :class="$style.exploreCard">
            <div :class="$style.exploreIcon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 16 16 12 12 8" />
                <line x1="8" y1="12" x2="16" y2="12" />
              </svg>
            </div>
            <span :class="$style.exploreText">Explore All</span>
            <span :class="$style.exploreSubtext">{{ title }}</span>
          </nuxt-link>
        </div>
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
      default: () => null,
    },

    items: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" module>
@import "~/assets/css/utilities/_variables.scss";

.section {
  position: relative;
  margin: 3.6rem 0;

  @media (min-width: $breakpoint-small) {
    margin: 4.8rem 0;
  }
}

.head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  padding: 0 1.6rem;

  @media (min-width: $breakpoint-small) {
    padding: 0 3.2rem;
  }

  @media (min-width: $breakpoint-large) {
    padding: 0 4.8rem;
  }
}

.titleGroup {
  display: flex;
  align-items: center;
  gap: 1.2rem;
}

.accentBar {
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
  color: $text-primary;
  letter-spacing: -0.02em;

  @media (min-width: $breakpoint-small) {
    font-size: 2.4rem;
  }
}

.controls {
  display: flex;
  align-items: center;
  gap: 1.6rem;
}

.explore {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 1.35rem;
  font-weight: 600;
  color: $primary-color;
  transition: all $transition-fast;

  &:hover {
    color: $primary-hover;
    transform: translateX(2px);
  }
}

.navButtons {
  display: none;
  align-items: center;
  gap: 0.8rem;

  @media (min-width: $breakpoint-small) {
    display: flex;
  }
}

.navBtn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.6rem;
  height: 3.6rem;
  border-radius: $radius-full;
  color: $text-primary;
  background-color: $surface-2;
  border: 1px solid $border-subtle;
  transition: all $transition-fast;

  &:hover:not(:disabled) {
    background-color: $surface-3;
    border-color: $border-medium;
    color: #fff;
    transform: scale(1.05);
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
}

.carousel {
  position: relative;
  width: 100%;
}

.items {
  display: flex;
  gap: 1.6rem;
  padding: 0 1.6rem 1.6rem;
  overflow-x: auto;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;

  @media (min-width: $breakpoint-small) {
    padding: 0 3.2rem 2rem;
    gap: 2rem;
  }

  @media (min-width: $breakpoint-large) {
    padding: 0 4.8rem 2rem;
    gap: 2.4rem;
  }
}

.item {
  flex: 0 0 40%;
  scroll-snap-align: start;

  @media (min-width: $breakpoint-xsmall) {
    flex: 0 0 28%;
  }

  @media (min-width: $breakpoint-small) {
    flex: 0 0 22%;
  }

  @media (min-width: $breakpoint-medium) {
    flex: 0 0 17%;
  }

  @media (min-width: $breakpoint-xlarge) {
    flex: 0 0 14.5%;
  }
}

.exploreCardItem {
  display: flex;
}

.exploreCard {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 0;
  padding-top: 150%; // Match 2:3 card aspect ratio
  position: relative;
  border-radius: $radius-md;
  background-color: $surface-1;
  border: 1px solid $border-subtle;
  transition: all $transition-normal;
  text-decoration: none;

  &:hover {
    background-color: $surface-2;
    border-color: $primary-color;
    transform: translateY(-4px);
    box-shadow: $shadow-md;

    .exploreIcon {
      color: $primary-color;
      transform: scale(1.1);
    }
  }
}

.exploreIcon {
  position: absolute;
  top: 38%;
  color: $text-muted;
  transition: all $transition-fast;
}

.exploreText {
  position: absolute;
  top: 55%;
  font-size: 1.35rem;
  font-weight: 700;
  color: $text-primary;
}

.exploreSubtext {
  position: absolute;
  top: 66%;
  font-size: 1.1rem;
  font-weight: 500;
  color: $text-muted;
  max-width: 80%;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
