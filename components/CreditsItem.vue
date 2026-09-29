<template>
  <div class="tw-w-full">
    <nuxt-link
      class="tw-group tw-flex tw-flex-col tw-h-full tw-no-underline tw-outline-none focus-visible:tw-outline-none"
      :to="{ name: 'person-id', params: { id: person.id } }"
      :aria-label="`${person.name} as ${person.character}`">
      <div class="tw-relative tw-w-full tw-h-0 tw-pt-[150%] tw-overflow-hidden tw-bg-surface-2 tw-border tw-border-border-subtle tw-rounded-xl tw-transition-all tw-duration-300 group-hover:tw-border-border-medium group-hover:tw-shadow-cinema-md group-hover:-tw-translate-y-0.5 group-focus-visible:tw-ring-2 group-focus-visible:tw-ring-primary-amber">
        <img
          v-if="poster"
          v-lazyload="poster"
          class="lazyload tw-absolute tw-inset-0 tw-w-full tw-h-full tw-object-cover tw-transition-transform tw-duration-500 group-hover:tw-scale-105"
          :alt="person.name">

        <div v-else class="tw-absolute tw-inset-0 tw-flex tw-items-center tw-justify-center tw-text-text-muted tw-bg-surface-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
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

      <div class="tw-flex tw-flex-col tw-pt-2.5 tw-px-0.5">
        <h3 class="tw-m-0 tw-text-[1.35rem] tw-font-semibold tw-text-text-primary tw-leading-snug tw-truncate tw-transition-colors tw-duration-200 group-hover:tw-text-primary-amber" :title="person.name">
          {{ person.name }}
        </h3>
        <p
          v-if="person.character"
          class="tw-m-0 tw-mt-0.5 tw-text-[1.2rem] tw-text-text-muted tw-truncate"
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
