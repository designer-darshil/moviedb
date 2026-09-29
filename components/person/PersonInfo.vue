<template>
  <div
    class="flex flex-col md:flex-row gap-8 lg:gap-12 my-8 sm:my-10 lg:my-12 px-4 sm:px-8 lg:px-12 max-w-[1600px] mx-auto"
  >
    <!-- Left Column: Portrait Avatar Artwork -->
    <div class="w-full md:w-[280px] lg:w-[320px] shrink-0">
      <div
        class="relative rounded-2xl overflow-hidden bg-surface-2 border border-border-medium shadow-cinema-lg"
      >
        <div class="relative w-full h-0 pt-[140%] overflow-hidden bg-surface-2">
          <img
            v-if="avatar"
            v-lazyload="avatar"
            class="lazyload absolute inset-0 w-full h-full object-cover"
            :alt="person.name"
          />

          <div
            v-else
            class="absolute inset-0 flex flex-col items-center justify-center gap-2 text-text-subtle bg-surface-2"
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span class="text-[1.1rem] font-medium tracking-wider uppercase"
              >No Portrait</span
            >
          </div>
        </div>

        <div
          v-if="person.known_for_department"
          class="p-3 text-center text-[1.2rem] font-bold uppercase tracking-wider text-primary-amber border-t border-border-subtle bg-surface-1"
        >
          {{ person.known_for_department }}
        </div>
      </div>
    </div>

    <!-- Right Column: Biography & Details -->
    <div class="flex-1 flex flex-col gap-6">
      <div>
        <div
          v-if="person.known_for_department"
          class="flex items-center gap-2 mb-2 text-[1.15rem] font-semibold tracking-wider uppercase text-primary-amber"
        >
          <span class="w-1.5 h-1.5 rounded-full bg-primary-amber" />
          <span>Industry Creative</span>
        </div>
        <h1
          class="m-0 font-display text-[3.2rem] sm:text-[4.4rem] font-extrabold -tracking-wide text-white"
        >
          {{ person.name }}
        </h1>
      </div>

      <!-- Biography with Expand/Collapse -->
      <div v-if="person.biography" class="flex flex-col gap-2.5">
        <h2 class="m-0 text-[1.8rem] font-bold text-white -tracking-wide">
          Biography
        </h2>
        <div class="text-[1.5rem] leading-relaxed text-text-secondary">
          <p
            class="m-0 transition-all duration-300"
            :class="isBioExpanded ? '' : 'line-clamp-6'"
            v-html="formattedBio"
          />
          <button
            v-if="isLongBio"
            type="button"
            class="mt-2 text-[1.3rem] font-semibold text-primary-amber hover:text-primary-hover cursor-pointer"
            @click="isBioExpanded = !isBioExpanded"
          >
            {{ isBioExpanded ? 'Read less' : 'Read full biography' }}
          </button>
        </div>
      </div>

      <!-- Personal Info Grid -->
      <div
        class="bg-surface-1 border border-border-subtle rounded-2xl p-6 sm:p-7 shadow-cinema-sm"
      >
        <h3
          class="m-0 mb-4 font-display text-[1.6rem] font-bold text-white -tracking-wide"
        >
          Personal Details
        </h3>

        <ul
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 list-none m-0 p-0 text-[1.35rem]"
        >
          <li v-if="person.known_for_department" class="flex flex-col gap-1">
            <span
              class="text-[1.15rem] font-semibold uppercase tracking-wider text-text-subtle"
              >Department</span
            >
            <span class="font-medium text-text-primary">{{
              person.known_for_department
            }}</span>
          </li>

          <li v-if="person.birthday" class="flex flex-col gap-1">
            <span
              class="text-[1.15rem] font-semibold uppercase tracking-wider text-text-subtle"
              >Born</span
            >
            <span class="font-medium text-text-primary">
              {{ person.birthday | fullDate }}
              <span
                v-if="!person.deathday && age"
                class="text-text-muted font-normal"
                >({{ age }} years old)</span
              >
            </span>
          </li>

          <li v-if="person.deathday" class="flex flex-col gap-1">
            <span
              class="text-[1.15rem] font-semibold uppercase tracking-wider text-text-subtle"
              >Died</span
            >
            <span class="font-medium text-text-primary">{{
              person.deathday | fullDate
            }}</span>
          </li>

          <li v-if="person.place_of_birth" class="flex flex-col gap-1">
            <span
              class="text-[1.15rem] font-semibold uppercase tracking-wider text-text-subtle"
              >Birthplace</span
            >
            <span class="font-medium text-text-primary">{{
              person.place_of_birth
            }}</span>
          </li>

          <li
            v-if="person.also_known_as && person.also_known_as.length"
            class="flex flex-col gap-1 sm:col-span-2"
          >
            <span
              class="text-[1.15rem] font-semibold uppercase tracking-wider text-text-subtle"
              >Also Known As</span
            >
            <span class="font-medium text-text-primary">{{
              person.also_known_as.slice(0, 3).join(', ')
            }}</span>
          </li>
        </ul>

        <!-- External Links -->
        <div
          v-if="person.external_ids"
          class="pt-5 mt-5 border-t border-border-subtle flex items-center justify-between flex-wrap gap-4"
        >
          <span class="text-[1.2rem] font-medium text-text-subtle"
            >Social &amp; Profiles:</span
          >
          <ExternalLinks media="person" :links="person.external_ids" />
        </div>
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

  data() {
    return {
      isBioExpanded: false,
    };
  },

  computed: {
    avatar() {
      if (this.person.profile_path) {
        return getProfileUrl(this.person.profile_path, 'h632');
      }
      return false;
    },

    formattedBio() {
      if (!this.person.biography) return '';
      return this.person.biography.replace(/(?:\r\n|\r|\n)/g, '<br />');
    },

    isLongBio() {
      return this.person.biography && this.person.biography.length > 500;
    },

    age() {
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
};
</script>
