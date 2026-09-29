<template>
  <div
    v-if="type === 'card'"
    class="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 sm:gap-5"
  >
    <div
      v-for="n in count"
      :key="`skeleton-card-${n}`"
      class="flex flex-col gap-2"
    >
      <div
        class="relative w-full h-0 pt-[150%] rounded-xl overflow-hidden bg-surface-2 border border-border-subtle animate-pulse"
      />
      <div class="h-4 w-3/4 bg-surface-2 rounded animate-pulse" />
      <div class="h-3 w-1/2 bg-surface-2/60 rounded animate-pulse" />
    </div>
  </div>

  <div
    v-else-if="type === 'hero'"
    class="relative w-full h-[60vh] min-h-[480px] bg-surface-1 animate-pulse overflow-hidden"
  >
    <div
      class="absolute bottom-12 left-4 sm:left-8 lg:left-12 max-w-[600px] flex flex-col gap-4"
    >
      <div class="h-6 w-32 bg-surface-3 rounded-full" />
      <div class="h-12 w-96 bg-surface-3 rounded-lg" />
      <div class="h-4 w-64 bg-surface-3 rounded" />
      <div class="h-16 w-full bg-surface-3 rounded-lg" />
    </div>
  </div>

  <div
    v-else-if="type === 'circle'"
    class="w-12 h-12 rounded-full bg-surface-2 animate-pulse"
  />

  <div v-else class="flex flex-col gap-3">
    <div
      v-for="n in count"
      :key="`skeleton-line-${n}`"
      class="h-4 bg-surface-2 rounded animate-pulse"
      :style="{ width: `${80 - (n % 3) * 15}%` }"
    />
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'card',
      validator: (t) => ['card', 'hero', 'circle', 'line'].includes(t),
    },
    count: {
      type: Number,
      default: 6,
    },
  },
};
</script>
