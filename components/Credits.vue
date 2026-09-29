<template>
  <div v-if="people && people.length" class="tw-relative tw-my-9 sm:tw-my-12">
    <div class="tw-flex tw-items-center tw-justify-between tw-mb-5 tw-px-4 sm:tw-px-8 lg:tw-px-12">
      <div class="tw-flex tw-items-center tw-gap-3">
        <span class="tw-inline-block tw-w-1 tw-h-5.5 tw-bg-primary-amber tw-rounded-full" />
        <h2 class="tw-m-0 tw-text-[2rem] sm:tw-text-[2.4rem] tw-font-bold tw-text-text-primary -tw-tracking-wide">
          Top Cast
        </h2>
      </div>

      <div class="tw-hidden sm:tw-flex tw-items-center tw-gap-2">
        <button
          class="tw-flex tw-items-center tw-justify-center tw-w-9 tw-h-9 tw-rounded-full tw-text-text-primary tw-bg-surface-2 tw-border tw-border-border-subtle hover:tw-bg-surface-3 hover:tw-border-border-medium hover:tw-text-white hover:tw-scale-105 disabled:tw-opacity-30 disabled:tw-cursor-not-allowed tw-transition-all tw-duration-200"
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
          class="tw-flex tw-items-center tw-justify-center tw-w-9 tw-h-9 tw-rounded-full tw-text-text-primary tw-bg-surface-2 tw-border tw-border-border-subtle hover:tw-bg-surface-3 hover:tw-border-border-medium hover:tw-text-white hover:tw-scale-105 disabled:tw-opacity-30 disabled:tw-cursor-not-allowed tw-transition-all tw-duration-200"
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

    <div class="tw-relative tw-w-full">
      <div
        ref="carouselElement"
        class="tw-flex tw-gap-4 sm:tw-gap-5 lg:tw-gap-6 tw-px-4 sm:tw-px-8 lg:tw-px-12 tw-pb-4 sm:tw-pb-5 tw-overflow-x-auto tw-scroll-smooth tw-snap-x tw-snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:tw-hidden"
        @scroll="scrollEvent">
        <div
          v-for="person in people"
          :key="`credit-${person.id}`"
          class="tw-shrink-0 tw-snap-start tw-w-[38%] xs:tw-w-[25%] sm:tw-w-[18%] md:tw-w-[14%] 2xl:tw-w-[12%]">
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
