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
      <Skeleton
        width="100%"
        height="0"
        class="!pt-[150%] !rounded-xl !bg-surface-2 border border-border-subtle"
      />
      <Skeleton width="80%" height="1.4rem" class="!rounded !bg-surface-2" />
      <Skeleton width="50%" height="1.1rem" class="!rounded !bg-surface-2/60" />
    </div>
  </div>

  <div
    v-else-if="type === 'hero'"
    class="relative w-full h-[60vh] min-h-[480px] bg-surface-1 overflow-hidden"
  >
    <div
      class="absolute bottom-12 left-4 sm:left-8 lg:left-12 max-w-[600px] flex flex-col gap-4 w-full"
    >
      <Skeleton
        width="8rem"
        height="1.8rem"
        class="!rounded-full !bg-surface-3"
      />
      <Skeleton width="75%" height="3.5rem" class="!rounded-xl !bg-surface-3" />
      <Skeleton width="45%" height="1.5rem" class="!rounded !bg-surface-3" />
      <Skeleton width="90%" height="4.5rem" class="!rounded-xl !bg-surface-3" />
    </div>
  </div>

  <div v-else-if="type === 'circle' || type === 'avatar'">
    <Skeleton shape="circle" size="3.5rem" class="!bg-surface-2" />
  </div>

  <div v-else class="flex flex-col gap-3">
    <Skeleton
      v-for="n in count"
      :key="`skeleton-line-${n}`"
      height="1.4rem"
      :width="`${85 - (n % 3) * 15}%`"
      class="!rounded !bg-surface-2"
    />
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'card',
      validator: (t) =>
        ['card', 'hero', 'circle', 'avatar', 'text', 'line'].includes(t),
    },
    count: {
      type: Number,
      default: 6,
    },
  },
};
</script>
