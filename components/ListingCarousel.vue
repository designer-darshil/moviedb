<template>
  <section class="tw-relative tw-my-12 sm:tw-my-16">
    <div class="tw-flex tw-items-end tw-justify-between tw-mb-6 tw-px-4 sm:tw-px-8 lg:tw-px-12">
      <div class="tw-flex tw-items-center tw-gap-3.5">
        <span class="tw-inline-block tw-w-1 tw-h-7 tw-rounded-full tw-bg-gradient-to-b tw-from-primary-amber tw-to-[#ff8a00] tw-shadow-[0_0_12px_rgba(229,169,60,0.4)]" />
        <div>
          <h2 v-if="title" class="tw-m-0 tw-font-display tw-text-[2.2rem] sm:tw-text-[2.6rem] tw-font-extrabold tw-text-white -tw-tracking-wide">
            {{ title }}
          </h2>
          <span v-if="subtitle" class="tw-text-[1.3rem] tw-font-medium tw-text-text-muted">{{ subtitle }}</span>
        </div>
      </div>

      <div class="tw-flex tw-items-center tw-gap-5">
        <nuxt-link
          v-if="viewAllUrl"
          :to="viewAllUrl"
          class="tw-inline-flex tw-items-center tw-gap-1.5 tw-text-[1.35rem] tw-font-bold tw-text-primary-amber hover:tw-text-primary-hover hover:tw-translate-x-1 tw-transition-all tw-duration-200">
          <span>View All</span>
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

        <div class="tw-hidden sm:tw-flex tw-items-center tw-gap-2">
          <button
            class="tw-flex tw-items-center tw-justify-center tw-w-10 tw-h-10 tw-rounded-full tw-text-text-primary tw-bg-surface-2 tw-border tw-border-white/15 tw-transition-all tw-duration-200 hover:tw-bg-surface-3 hover:tw-border-primary-amber hover:tw-text-white hover:tw-scale-105 disabled:tw-opacity-25 disabled:tw-cursor-not-allowed disabled:hover:tw-scale-100 disabled:hover:tw-border-white/15"
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
            class="tw-flex tw-items-center tw-justify-center tw-w-10 tw-h-10 tw-rounded-full tw-text-text-primary tw-bg-surface-2 tw-border tw-border-white/15 tw-transition-all tw-duration-200 hover:tw-bg-surface-3 hover:tw-border-primary-amber hover:tw-text-white hover:tw-scale-105 disabled:tw-opacity-25 disabled:tw-cursor-not-allowed disabled:hover:tw-scale-100 disabled:hover:tw-border-white/15"
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

    <div class="tw-relative tw-w-full">
      <div
        ref="carouselElement"
        class="tw-flex tw-gap-4 sm:tw-gap-5 lg:tw-gap-6 tw-px-4 sm:tw-px-8 lg:tw-px-12 tw-pb-5 sm:tw-pb-6 lg:tw-pb-7 tw-overflow-x-auto tw-scroll-smooth tw-snap-x tw-snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:tw-hidden"
        @scroll="scrollEvent">
        <div
          v-for="(item, index) in items.results"
          :key="`card-${item.id}`"
          class="tw-shrink-0 tw-snap-start"
          :class="isRanked ? 'tw-w-[48%] xs:tw-w-[34%] sm:tw-w-[25%] md:tw-w-[19%] 2xl:tw-w-[16%]' : 'tw-w-[42%] xs:tw-w-[30%] sm:tw-w-[22%] md:tw-w-[17%] 2xl:tw-w-[14%]'">
          <Card :item="item" :rank="isRanked ? index + 1 : 0" />
        </div>

        <!-- Trailing Explore All Card -->
        <div
          v-if="viewAllUrl"
          class="tw-shrink-0 tw-snap-start tw-w-[42%] xs:tw-w-[30%] sm:tw-w-[22%] md:tw-w-[17%] 2xl:tw-w-[14%]">
          <nuxt-link
            :to="viewAllUrl"
            class="tw-group tw-relative tw-flex tw-flex-col tw-items-center tw-justify-center tw-w-full tw-h-0 tw-pt-[150%] tw-rounded-xl tw-bg-surface-1 tw-border tw-border-white/15 tw-no-underline tw-transition-all tw-duration-300 hover:tw-bg-surface-2 hover:tw-border-primary-amber hover:-tw-translate-y-1 hover:tw-shadow-glow">
            <div class="tw-absolute tw-top-[36%] tw-text-text-muted group-hover:tw-text-primary-amber group-hover:tw-scale-110 tw-transition-all tw-duration-200">
              <svg
                width="28"
                height="28"
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
            <span class="tw-absolute tw-top-[54%] tw-text-[1.45rem] tw-font-bold tw-text-text-primary">Explore All</span>
            <span class="tw-absolute tw-top-[66%] tw-max-w-[80%] tw-text-[1.15rem] tw-font-medium tw-text-text-muted tw-text-center tw-truncate">{{ title }}</span>
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

    subtitle: {
      type: String,
      required: false,
      default: '',
    },

    isRanked: {
      type: Boolean,
      required: false,
      default: false,
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
