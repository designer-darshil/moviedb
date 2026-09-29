<template>
  <div class="tw-flex tw-flex-col lg:tw-flex-row tw-gap-10 lg:tw-gap-16 tw-my-12 sm:tw-my-16 tw-px-4 sm:tw-px-8 lg:tw-px-12">
    <!-- Left Column: Portrait Avatar Card -->
    <div class="tw-w-full lg:tw-w-[340px] xl:tw-w-[380px] tw-shrink-0">
      <div class="tw-relative tw-rounded-2xl tw-overflow-hidden tw-bg-surface-1 tw-border tw-border-white/15 tw-shadow-2xl">
        <div class="tw-relative tw-w-full tw-h-0 tw-pt-[140%] tw-overflow-hidden tw-bg-surface-2">
          <img
            v-if="avatar"
            v-lazyload="avatar"
            class="lazyload tw-absolute tw-inset-0 tw-w-full tw-h-full tw-object-cover"
            :alt="person.name">

          <div v-else class="tw-absolute tw-inset-0 tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-3 tw-text-text-subtle tw-bg-surface-2">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span class="tw-text-[1.1rem] tw-font-semibold tw-tracking-wider tw-uppercase">No Portrait</span>
          </div>
        </div>

        <div v-if="person.known_for_department" class="tw-p-4 tw-text-center tw-text-[1.25rem] tw-font-bold tw-uppercase tw-tracking-widest tw-text-primary-amber tw-border-t tw-border-white/10 tw-bg-surface-2/50">
          {{ person.known_for_department }}
        </div>
      </div>
    </div>

    <!-- Right Column: Biography & Career Stats -->
    <div class="tw-flex-1 tw-flex tw-flex-col tw-gap-8">
      <div class="tw-mb-2">
        <h1 class="tw-m-0 tw-font-display tw-text-[3rem] sm:tw-text-[4.2rem] tw-font-black -tw-tracking-wider tw-text-white">
          {{ person.name }}
        </h1>
      </div>

      <!-- Biography Section -->
      <div v-if="person.biography" class="tw-flex tw-flex-col tw-gap-4">
        <div class="tw-flex tw-items-center tw-gap-3">
          <span class="tw-inline-block tw-w-1 tw-h-7 tw-rounded-full tw-bg-gradient-to-b tw-from-primary-amber tw-to-[#ff8a00] tw-shadow-[0_0_12px_rgba(229,169,60,0.4)]" />
          <h2 class="tw-m-0 tw-font-display tw-text-[2.2rem] tw-font-bold tw-text-white -tw-tracking-wide">
            Biography
          </h2>
        </div>
        <div
          class="tw-m-0 tw-text-[1.55rem] tw-leading-relaxed tw-text-text-secondary"
          v-html="formatContent(person.biography)" />
      </div>

      <!-- Vital Statistics Card -->
      <div class="tw-bg-surface-1 tw-border tw-border-white/15 tw-rounded-2xl tw-p-6 sm:tw-p-8 tw-shadow-xl">
        <div class="tw-pb-5 tw-mb-6 tw-border-b tw-border-white/10">
          <h3 class="tw-m-0 tw-font-display tw-text-[1.8rem] tw-font-bold tw-text-white -tw-tracking-wide">
            Personal Information
          </h3>
        </div>

        <ul class="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 md:tw-grid-cols-3 tw-gap-6 tw-list-none tw-m-0 tw-p-0">
          <li v-if="person.known_for_department" class="tw-flex tw-flex-col tw-gap-1.5">
            <span class="tw-text-[1.15rem] tw-font-bold tw-uppercase tw-tracking-widest tw-text-text-subtle">Department</span>
            <span class="tw-text-[1.4rem] tw-font-semibold tw-text-text-primary">{{ person.known_for_department }}</span>
          </li>

          <li v-if="person.birthday" class="tw-flex tw-flex-col tw-gap-1.5">
            <span class="tw-text-[1.15rem] tw-font-bold tw-uppercase tw-tracking-widest tw-text-text-subtle">Born</span>
            <span class="tw-text-[1.4rem] tw-font-semibold tw-text-text-primary">
              {{ person.birthday | fullDate }}
              <span
                v-if="!person.deathday"
                class="tw-text-text-muted tw-font-normal">({{ age }} years old)</span>
            </span>
          </li>

          <li v-if="person.deathday" class="tw-flex tw-flex-col tw-gap-1.5">
            <span class="tw-text-[1.15rem] tw-font-bold tw-uppercase tw-tracking-widest tw-text-text-subtle">Passed Away</span>
            <span class="tw-text-[1.4rem] tw-font-semibold tw-text-text-primary">{{ person.deathday | fullDate }}</span>
          </li>

          <li v-if="person.place_of_birth" class="tw-flex tw-flex-col tw-gap-1.5">
            <span class="tw-text-[1.15rem] tw-font-bold tw-uppercase tw-tracking-widest tw-text-text-subtle">Birthplace</span>
            <span class="tw-text-[1.4rem] tw-font-semibold tw-text-text-primary">{{ person.place_of_birth }}</span>
          </li>

          <li
            v-if="person.also_known_as && person.also_known_as.length"
            class="tw-flex tw-flex-col tw-gap-1.5">
            <span class="tw-text-[1.15rem] tw-font-bold tw-uppercase tw-tracking-widest tw-text-text-subtle">Alternative Names</span>
            <span class="tw-text-[1.4rem] tw-font-semibold tw-text-text-primary">{{
              person.also_known_as.slice(0, 3).join(", ")
            }}</span>
          </li>
        </ul>
      </div>

      <!-- External Links -->
      <div v-if="person.external_ids" class="tw-pt-2">
        <ExternalLinks media="person" :links="person.external_ids" />
      </div>
    </div>
  </div>
</template>

<script>
import { getProfileUrl } from '~/api';
import ExternalLinks from '~/components/ExternalLinks';

export default {
  components: {
    ExternalLinks,
  },

  props: {
    person: {
      type: Object,
      required: true,
    },
  },

  computed: {
    avatar () {
      if (this.person.profile_path) {
        return getProfileUrl(this.person.profile_path, 'h632');
      }
      return false;
    },

    age () {
      if (!this.person.birthday) return null;
      const today = new Date();
      const birthDate = new Date(this.person.birthday);
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    },
  },

  methods: {
    formatContent (content) {
      return content.replace(/(?:\r\n|\r|\n)/g, '<br />');
    },
  },
};
</script>
