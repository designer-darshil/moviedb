<template>
  <div class="flex flex-col lg:flex-row gap-10 lg:gap-16 my-12 sm:my-16 px-4 sm:px-8 lg:px-12">
    <!-- Left Column: Portrait Avatar Card -->
    <div class="w-full lg:w-[340px] xl:w-[380px] shrink-0">
      <div class="relative rounded-2xl overflow-hidden bg-surface-1 border border-white/15 shadow-2xl">
        <div class="relative w-full h-0 pt-[140%] overflow-hidden bg-surface-2">
          <img
            v-if="avatar"
            v-lazyload="avatar"
            class="lazyload absolute inset-0 w-full h-full object-cover"
            :alt="person.name">

          <div v-else class="absolute inset-0 flex flex-col items-center justify-center gap-3 text-text-subtle bg-surface-2">
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
            <span class="text-[1.1rem] font-semibold tracking-wider uppercase">No Portrait</span>
          </div>
        </div>

        <div v-if="person.known_for_department" class="p-4 text-center text-[1.25rem] font-bold uppercase tracking-widest text-primary-amber border-t border-white/10 bg-surface-2/50">
          {{ person.known_for_department }}
        </div>
      </div>
    </div>

    <!-- Right Column: Biography & Career Stats -->
    <div class="flex-1 flex flex-col gap-8">
      <div class="mb-2">
        <h1 class="m-0 font-display text-[3rem] sm:text-[4.2rem] font-black -tracking-wider text-white">
          {{ person.name }}
        </h1>
      </div>

      <!-- Biography Section -->
      <div v-if="person.biography" class="flex flex-col gap-4">
        <div class="flex items-center gap-3">
          <span class="inline-block w-1 h-7 rounded-full bg-gradient-to-b from-primary-amber to-[#ff8a00] shadow-[0_0_12px_rgba(229,169,60,0.4)]" />
          <h2 class="m-0 font-display text-[2.2rem] font-bold text-white -tracking-wide">
            Biography
          </h2>
        </div>
        <div
          class="m-0 text-[1.55rem] leading-relaxed text-text-secondary"
          v-html="formatContent(person.biography)" />
      </div>

      <!-- Vital Statistics Card -->
      <div class="bg-surface-1 border border-white/15 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div class="pb-5 mb-6 border-b border-white/10">
          <h3 class="m-0 font-display text-[1.8rem] font-bold text-white -tracking-wide">
            Personal Information
          </h3>
        </div>

        <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 list-none m-0 p-0">
          <li v-if="person.known_for_department" class="flex flex-col gap-1.5">
            <span class="text-[1.15rem] font-bold uppercase tracking-widest text-text-subtle">Department</span>
            <span class="text-[1.4rem] font-semibold text-text-primary">{{ person.known_for_department }}</span>
          </li>

          <li v-if="person.birthday" class="flex flex-col gap-1.5">
            <span class="text-[1.15rem] font-bold uppercase tracking-widest text-text-subtle">Born</span>
            <span class="text-[1.4rem] font-semibold text-text-primary">
              {{ person.birthday | fullDate }}
              <span
                v-if="!person.deathday"
                class="text-text-muted font-normal">({{ age }} years old)</span>
            </span>
          </li>

          <li v-if="person.deathday" class="flex flex-col gap-1.5">
            <span class="text-[1.15rem] font-bold uppercase tracking-widest text-text-subtle">Passed Away</span>
            <span class="text-[1.4rem] font-semibold text-text-primary">{{ person.deathday | fullDate }}</span>
          </li>

          <li v-if="person.place_of_birth" class="flex flex-col gap-1.5">
            <span class="text-[1.15rem] font-bold uppercase tracking-widest text-text-subtle">Birthplace</span>
            <span class="text-[1.4rem] font-semibold text-text-primary">{{ person.place_of_birth }}</span>
          </li>

          <li
            v-if="person.also_known_as && person.also_known_as.length"
            class="flex flex-col gap-1.5">
            <span class="text-[1.15rem] font-bold uppercase tracking-widest text-text-subtle">Alternative Names</span>
            <span class="text-[1.4rem] font-semibold text-text-primary">{{
              person.also_known_as.slice(0, 3).join(", ")
            }}</span>
          </li>
        </ul>
      </div>

      <!-- External Links -->
      <div v-if="person.external_ids" class="pt-2">
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
