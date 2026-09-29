<template>
  <div class="w-full">
    <nuxt-link
      class="group flex flex-col h-full no-underline outline-none focus-visible:outline-none"
      :to="{ name: 'person-id', params: { id: person.id } }"
      :aria-label="`${person.name} as ${person.character}`">
      <div class="relative w-full h-0 pt-[140%] overflow-hidden bg-surface-2 border border-border-subtle rounded-lg transition-all duration-200 group-hover:border-border-medium group-hover:-translate-y-0.5">
        <img
          v-if="poster"
          v-lazyload="poster"
          class="lazyload absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          :alt="person.name">

        <div v-else class="absolute inset-0 flex items-center justify-center text-text-subtle bg-surface-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>
      </div>

      <div class="flex flex-col pt-2 px-0.5">
        <h3 class="m-0 text-[1.25rem] font-medium text-text-primary leading-snug truncate transition-colors duration-150 group-hover:text-primary-amber" :title="person.name">
          {{ person.name }}
        </h3>
        <p
          v-if="person.character"
          class="m-0 mt-0.5 text-[1.15rem] text-text-subtle truncate"
          :title="person.character">
          {{ person.character }}
        </p>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
import { getProfileUrl } from '~/api';

export default {
  props: {
    person: {
      type: Object,
      required: true,
    },
  },

  computed: {
    poster () {
      if (this.person.profile_path) {
        return getProfileUrl(this.person.profile_path, 'h632');
      }
      return null;
    },
  },
};
</script>
