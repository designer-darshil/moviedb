<template>
  <div v-if="people && people.length" :class="$style.section">
    <div :class="$style.head">
      <div :class="$style.titleGroup">
        <span :class="$style.accentBar" />
        <h2 :class="$style.title">
          Top Cast
        </h2>
      </div>

      <div :class="$style.navButtons">
        <button
          :class="$style.navBtn"
          aria-label="Previous Cast"
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
          aria-label="Next Cast"
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

    <div :class="$style.carousel">
      <div ref="carouselElement" :class="$style.items" @scroll="scrollEvent">
        <div
          v-for="person in people"
          :key="`credit-${person.id}`"
          :class="$style.item">
          <CreditsItem :person="person" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import carousel from '~/mixins/Carousel';
import { debounce } from '~/mixins/Functions';
import CreditsItem from '~/components/CreditsItem';

export default {
  components: {
    CreditsItem,
  },

  mixins: [carousel],

  props: {
    people: {
      type: Array,
      required: true,
    },
  },

  mounted () {
    this.calculateState(this.people.length);
  },

  methods: {
    resizeEvent: debounce(function () {
      this.calculateState(this.people.length);
    }, 100),
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
  flex: 0 0 38%;
  scroll-snap-align: start;

  @media (min-width: $breakpoint-xsmall) {
    flex: 0 0 25%;
  }

  @media (min-width: $breakpoint-small) {
    flex: 0 0 18%;
  }

  @media (min-width: $breakpoint-medium) {
    flex: 0 0 14%;
  }

  @media (min-width: $breakpoint-xlarge) {
    flex: 0 0 12%;
  }
}
</style>
