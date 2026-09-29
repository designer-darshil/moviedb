<template>
  <nav class="tw-flex tw-justify-center tw-my-9 tw-px-4 tw-overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:tw-hidden" aria-label="Media Sections">
    <div class="tw-inline-flex tw-items-center tw-gap-1.5 tw-p-1.5 tw-bg-[rgba(14,17,23,0.9)] tw-backdrop-blur-xl tw-border tw-border-white/15 tw-rounded-full tw-shadow-cinema-md">
      <button
        v-for="(item, index) in menu"
        :key="`tab-${index}`"
        class="tw-px-6 tw-py-2.5 tw-text-[1.35rem] tw-font-semibold tw-rounded-full tw-cursor-pointer tw-whitespace-nowrap -tw-tracking-wide tw-transition-all tw-duration-200 focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-primary-amber"
        :class="active === index
          ? '!tw-text-[#07080b] !tw-bg-gradient-to-br !tw-from-primary-amber !tw-to-[#ff8a00] !tw-border-primary-amber !tw-font-bold tw-shadow-[0_2px_14px_rgba(229,169,60,0.45)] hover:tw-shadow-[0_4px_18px_rgba(229,169,60,0.6)]'
          : 'tw-text-text-muted hover:tw-text-white hover:tw-bg-white/[0.06] tw-border tw-border-transparent'"
        type="button"
        @click="clicked(index, item)">
        <span>{{ item }}</span>
      </button>
    </div>
  </nav>
</template>

<script>
export default {
  props: {
    menu: {
      type: Array,
      required: true,
    },
  },

  data () {
    return {
      active: 0,
    };
  },

  methods: {
    clicked (index, item) {
      this.active = index;
      this.$emit('clicked', item.replace(/\s+/g, '-').toLowerCase());
    },
  },
};
</script>
