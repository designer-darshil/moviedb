<template>
  <div
    v-if="people && people.length"
    class="relative my-8 sm:my-10 max-w-[1600px] mx-auto"
  >
    <!-- Header -->
    <div class="flex items-center justify-between mb-4 px-4 sm:px-8 lg:px-12">
      <h2
        class="m-0 text-[1.8rem] sm:text-[2rem] font-bold text-white -tracking-wide"
      >
        Top Cast
      </h2>

      <div class="hidden sm:flex items-center gap-1.5">
        <Button
          class="p-button-secondary p-button-rounded !w-8 !h-8 !p-0 !min-w-0"
          aria-label="Previous Cast"
          type="button"
          :disabled="disableLeftButton"
          @click="moveToClickEvent('left')"
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </Button>

        <Button
          class="p-button-secondary p-button-rounded !w-8 !h-8 !p-0 !min-w-0"
          aria-label="Next Cast"
          type="button"
          :disabled="disableRightButton"
          @click="moveToClickEvent('right')"
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </Button>
      </div>
    </div>

    <!-- Cast Rail -->
    <div class="relative w-full">
      <div
        ref="carouselElement"
        class="flex gap-4 px-4 sm:px-8 lg:px-12 pb-3 overflow-x-auto scroll-smooth snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        @scroll="scrollEvent"
      >
        <div
          v-for="person in people"
          :key="`credit-${person.id}`"
          class="shrink-0 snap-start w-[110px] xs:w-[125px] sm:w-[140px] md:w-[150px]"
        >
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

  mounted() {
    this.calculateState(this.people.length);
  },

  methods: {
    resizeEvent: debounce(function () {
      this.calculateState(this.people.length);
    }, 100),
  },
};
</script>
