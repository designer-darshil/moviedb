<template>
  <div v-if="people && people.length" class="relative my-9 sm:my-12">
    <div class="flex items-center justify-between mb-5 px-4 sm:px-8 lg:px-12">
      <div class="flex items-center gap-3">
        <span class="inline-block w-1 h-5.5 bg-primary-amber rounded-full" />
        <h2 class="m-0 text-[2rem] sm:text-[2.4rem] font-bold text-text-primary -tracking-wide">
          Top Cast
        </h2>
      </div>

      <div class="hidden sm:flex items-center gap-2">
        <button
          class="flex items-center justify-center w-9 h-9 rounded-full text-text-primary bg-surface-2 border border-border-subtle hover:bg-surface-3 hover:border-border-medium hover:text-white hover:scale-105 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
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
          class="flex items-center justify-center w-9 h-9 rounded-full text-text-primary bg-surface-2 border border-border-subtle hover:bg-surface-3 hover:border-border-medium hover:text-white hover:scale-105 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
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

    <div class="relative w-full">
      <div
        ref="carouselElement"
        class="flex gap-4 sm:gap-5 lg:gap-6 px-4 sm:px-8 lg:px-12 pb-4 sm:pb-5 overflow-x-auto scroll-smooth snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        @scroll="scrollEvent">
        <div
          v-for="person in people"
          :key="`credit-${person.id}`"
          class="shrink-0 snap-start w-[38%] xs:w-[25%] sm:w-[18%] md:w-[14%] 2xl:w-[12%]">
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
