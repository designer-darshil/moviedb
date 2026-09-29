<template>
  <nav class="flex justify-center my-9 px-4 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" aria-label="Media Sections">
    <div class="inline-flex items-center gap-1.5 p-1.5 bg-[rgba(14,17,23,0.9)] backdrop-blur-xl border border-white/15 rounded-full shadow-cinema-md">
      <button
        v-for="(item, index) in menu"
        :key="`tab-${index}`"
        class="px-6 py-2.5 text-[1.35rem] font-semibold rounded-full cursor-pointer whitespace-nowrap -tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-amber"
        :class="active === index
          ? '!text-[#07080b] !bg-gradient-to-br !from-primary-amber !to-[#ff8a00] !border-primary-amber !font-bold shadow-[0_2px_14px_rgba(229,169,60,0.45)] hover:shadow-[0_4px_18px_rgba(229,169,60,0.6)]'
          : 'text-text-muted hover:text-white hover:bg-white/[0.06] border border-transparent'"
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
