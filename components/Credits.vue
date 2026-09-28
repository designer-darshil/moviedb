<template>
  <section v-if="people && people.length" :class="$style.section" aria-label="Cast Carousel">
    <div :class="$style.head">
      <div :class="$style.titleWrap">
        <span :class="$style.accentPip" />
        <h2 :class="$style.title">
          Cast & Characters
        </h2>
      </div>

      <div :class="$style.navControls">
        <button
          :class="$style.arrowBtn"
          aria-label="Previous cast members"
          type="button"
          :disabled="disableLeftButton"
          @click="moveToClickEvent('left')">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button
          :class="$style.arrowBtn"
          aria-label="Next cast members"
          type="button"
          :disabled="disableRightButton"
          @click="moveToClickEvent('right')">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </div>

    <div class="carousel" :class="$style.carousel">
      <div
        ref="carouselElement"
        class="carousel__items"
        :class="$style.items"
        @scroll="scrollEvent">
        <CreditsItem
          v-for="person in people"
          :key="`credit-${person.id}`"
          :person="person" />
      </div>
    </div>
  </section>
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

  > div {
    flex: 0 0 12rem;
    scroll-snap-align: start;

    @media (min-width: $breakpoint-xsmall) {
      flex: 0 0 14rem;
    }

    @media (min-width: $breakpoint-small) {
      flex: 0 0 16rem;
    }

    @media (min-width: $breakpoint-medium) {
      flex: 0 0 17rem;
    }

    @media (min-width: $breakpoint-large) {
      flex: 0 0 18rem;
    }
  }
}
</style>
