<template>
  <nav class="flex justify-center my-6 sm:my-8 px-4" aria-label="Media Sections">
    <div class="inline-flex items-center gap-1 p-1 bg-surface-2 border border-border-subtle rounded-lg">
      <button
        v-for="(item, index) in menu"
        :key="`tab-${index}`"
        class="px-5 py-2 text-[1.3rem] font-medium rounded-md cursor-pointer whitespace-nowrap transition-colors duration-150 focus-visible:outline-none"
        :class="active === index
          ? 'text-white bg-surface-4 font-semibold'
          : 'text-text-muted hover:text-white hover:bg-white/5'"
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
