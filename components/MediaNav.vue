<template>
  <nav
    class="flex justify-center my-8 sm:my-10 px-4"
    aria-label="Media Sections"
  >
    <div
      class="inline-flex items-center gap-1.5 p-1.5 bg-surface-1/90 backdrop-blur-md border border-border-subtle rounded-2xl shadow-cinema-sm"
    >
      <button
        v-for="(item, index) in menu"
        :key="`tab-${index}`"
        class="px-5 py-2 text-[1.3rem] font-medium rounded-xl cursor-pointer whitespace-nowrap transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-primary-amber"
        :class="
          active === index
            ? 'text-white bg-surface-3 border border-border-medium font-bold shadow-cinema-sm'
            : 'text-text-muted hover:text-white hover:bg-surface-2'
        "
        type="button"
        @click="clicked(index, item)"
      >
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

  data() {
    return {
      active: 0,
    };
  },

  methods: {
    clicked(index, item) {
      this.active = index;
      this.$emit('clicked', item.replace(/\s+/g, '-').toLowerCase());
    },
  },
};
</script>
