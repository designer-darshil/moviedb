<template>
  <section
    class="relative my-8 sm:my-10 lg:my-14"
    :aria-label="title || 'Media Carousel'"
  >
    <!-- Section Header -->
    <div
      class="flex items-center justify-between mb-4 sm:mb-5 px-4 sm:px-8 lg:px-12"
    >
      <div class="flex items-baseline gap-3">
        <h2
          v-if="title"
          class="m-0 font-display text-[1.8rem] sm:text-[2rem] lg:text-[2.4rem] font-bold leading-[1.2] text-text-primary -tracking-wide"
        >
          {{ title }}
        </h2>
        <span
          v-if="subtitle"
          class="hidden md:inline-block text-[1.3rem] text-text-muted"
        >
          {{ subtitle }}
        </span>
      </div>

      <div class="flex items-center gap-3 sm:gap-4">
        <!-- View All Link -->
        <nuxt-link
          v-if="viewAllUrl"
          v-ripple
          :to="viewAllUrl"
          class="inline-flex items-center gap-1.5 px-3 py-1 text-[1.25rem] font-semibold text-text-muted hover:text-primary-amber rounded-lg transition-colors duration-200 group outline-none focus-visible:ring-2 focus-visible:ring-primary-amber"
        >
          <span>View all</span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="transform group-hover:translate-x-0.5 transition-transform duration-200"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </nuxt-link>

        <!-- Carousel Chevrons -->
        <div class="hidden sm:flex items-center gap-1.5">
          <Button
            type="button"
            class="p-button-secondary p-button-rounded !w-8 !h-8 !p-0 !min-w-0"
            aria-label="Scroll left"
            :disabled="disableLeftButton"
            @click="moveToClickEvent('left')"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </Button>

          <Button
            type="button"
            class="p-button-secondary p-button-rounded !w-8 !h-8 !p-0 !min-w-0"
            aria-label="Scroll right"
            :disabled="disableRightButton"
            @click="moveToClickEvent('right')"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </Button>
        </div>
      </div>
    </div>

    <!-- Horizontal Scroll Rail -->
    <div class="relative w-full">
      <div
        ref="carouselElement"
        class="flex gap-4 sm:gap-5 px-4 sm:px-8 lg:px-12 pb-4 overflow-x-auto scroll-smooth snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        @scroll="scrollEvent"
      >
        <div
          v-for="(item, index) in items.results"
          :key="`rail-card-${item.id}`"
          class="shrink-0 snap-start w-[140px] xs:w-[160px] sm:w-[180px] md:w-[195px] lg:w-[210px]"
        >
          <Card :item="item" :rank="isRanked ? index + 1 : 0" />
        </div>

        <!-- Trailing View All Link Card -->
        <div
          v-if="viewAllUrl"
          class="shrink-0 snap-start w-[140px] xs:w-[160px] sm:w-[180px] md:w-[195px] lg:w-[210px]"
        >
          <nuxt-link
            v-ripple
            :to="viewAllUrl"
            class="group relative flex flex-col items-center justify-center w-full h-0 pt-[150%] rounded-xl bg-surface-1 border border-border-subtle no-underline hover:bg-surface-2 hover:border-primary-amber/40 hover:shadow-glow transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-primary-amber"
          >
            <div
              class="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4 text-center"
            >
              <span
                class="flex items-center justify-center w-11 h-11 rounded-full bg-surface-3 border border-border-subtle text-text-muted group-hover:text-primary-amber group-hover:border-primary-amber/30 group-hover:scale-110 transition-all duration-200"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </span>
              <span
                class="text-[1.3rem] font-semibold text-text-secondary group-hover:text-white transition-colors duration-200"
              >
                Explore All
              </span>
            </div>
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
