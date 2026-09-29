<template>
  <div class="flex flex-col md:flex-row gap-8 lg:gap-12 my-8 sm:my-10 lg:my-12 px-4 sm:px-8 lg:px-12 max-w-[1600px] mx-auto">
    <!-- Left Column: Portrait Avatar -->
    <div class="w-full md:w-[280px] lg:w-[320px] shrink-0">
      <div class="relative rounded-lg overflow-hidden bg-surface-2 border border-border-subtle">
        <div class="relative w-full h-0 pt-[140%] overflow-hidden bg-surface-2">
          <img
            v-if="avatar"
            v-lazyload="avatar"
            class="lazyload absolute inset-0 w-full h-full object-cover"
            :alt="person.name">

          <div v-else class="absolute inset-0 flex flex-col items-center justify-center gap-2 text-text-subtle bg-surface-2">
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span class="text-[1.1rem] font-medium tracking-wider uppercase">No Portrait</span>
          </div>
        </div>

        <div v-if="person.known_for_department" class="p-3 text-center text-[1.2rem] font-semibold uppercase tracking-wider text-text-muted border-t border-border-subtle bg-surface-1">
          {{ person.known_for_department }}
        </div>
      </div>
    </div>

    <!-- Right Column: Biography & Details -->
    <div class="flex-1 flex flex-col gap-6">
      <div>
        <h1 class="m-0 font-display text-[2.8rem] sm:text-[3.6rem] font-bold -tracking-wide text-white">
          {{ person.name }}
        </h1>
      </div>

      <!-- Biography -->
      <div v-if="person.biography" class="flex flex-col gap-2.5">
        <h2 class="m-0 text-[1.8rem] font-bold text-white -tracking-wide">
          Biography
        </h2>
        <div
          class="m-0 text-[1.5rem] leading-relaxed text-text-secondary"
          v-html="formatContent(person.biography)" />
      </div>

      <!-- Personal Info Grid -->
      <div class="bg-surface-1 border border-border-subtle rounded-lg p-5 sm:p-6 mt-2">
        <h3 class="m-0 mb-4 text-[1.5rem] font-semibold text-white -tracking-wide">
          Personal Information
        </h3>

        <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 list-none m-0 p-0 text-[1.3rem]">
          <li v-if="person.known_for_department" class="flex flex-col gap-1">
            <span class="text-[1.1rem] font-medium uppercase tracking-wider text-text-subtle">Department</span>
            <span class="font-medium text-text-primary">{{ person.known_for_department }}</span>
          </li>

          <li v-if="person.birthday" class="flex flex-col gap-1">
            <span class="text-[1.1rem] font-medium uppercase tracking-wider text-text-subtle">Born</span>
            <span class="font-medium text-text-primary">
              {{ person.birthday | fullDate }}
              <span v-if="!person.deathday && age" class="text-text-muted font-normal">({{ age }} years old)</span>
            </span>
          </li>

          <li v-if="person.deathday" class="flex flex-col gap-1">
            <span class="text-[1.1rem] font-medium uppercase tracking-wider text-text-subtle">Died</span>
            <span class="font-medium text-text-primary">{{ person.deathday | fullDate }}</span>
          </li>

          <li v-if="person.place_of_birth" class="flex flex-col gap-1">
            <span class="text-[1.1rem] font-medium uppercase tracking-wider text-text-subtle">Birthplace</span>
            <span class="font-medium text-text-primary">{{ person.place_of_birth }}</span>
          </li>

          <li
            v-if="person.also_known_as && person.also_known_as.length"
            class="flex flex-col gap-1">
            <span class="text-[1.1rem] font-medium uppercase tracking-wider text-text-subtle">Also Known As</span>
            <span class="font-medium text-text-primary">{{ person.also_known_as.slice(0, 3).join(", ") }}</span>
          </li>
        </ul>
      </div>

      <!-- External Links -->
      <div v-if="person.external_ids" class="pt-1">
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
