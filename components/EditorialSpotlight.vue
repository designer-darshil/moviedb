<template>
  <section
    class="my-10 sm:my-14 lg:my-16 px-4 sm:px-8 lg:px-12 max-w-[1600px] mx-auto w-full">
    <!-- Section Header -->
    <div class="flex items-baseline justify-between mb-6">
      <div>
        <div
          class="flex items-center gap-2 mb-1.5 text-[1.15rem] font-semibold tracking-wider uppercase text-primary-amber">
          <span class="w-1.5 h-1.5 rounded-full bg-primary-amber" />
          <span>{{ tag }}</span>
        </div>
        <h2
          class="m-0 font-display text-[2.2rem] sm:text-[2.6rem] font-bold text-white -tracking-wide">
          {{ title }}
        </h2>
      </div>

      <nuxt-link
        v-if="viewAllUrl"
        :to="viewAllUrl"
        class="inline-flex items-center gap-1 text-[1.25rem] font-medium text-text-muted hover:text-primary-amber transition-colors duration-200">
        <span>Browse all</span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </nuxt-link>
    </div>

    <!-- Editorial Asymmetric Composition -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
      <!-- Left: Large Visual Feature (7 Cols) -->
      <div
        v-if="feature"
        class="lg:col-span-7 group relative flex flex-col justify-end min-h-[380px] sm:min-h-[440px] lg:min-h-[480px] rounded-xl overflow-hidden bg-surface-2 border border-border-subtle hover:border-border-medium transition-all duration-300">
        <!-- Backdrop Image -->
        <img
          v-if="featureBackdrop"
          v-lazyload="featureBackdrop"
          :alt="featureTitle"
          class="lazyload absolute inset-0 w-full h-full object-cover object-center group-hover:scale-[1.02] group-hover:brightness-105 transition-all duration-500">

        <!-- Dark Gradient Overlays -->
        <div
          class="absolute inset-0 bg-gradient-to-t from-base-bg via-base-bg/60 to-transparent" />
        <div
          class="absolute inset-y-0 left-0 w-3/4 bg-gradient-to-r from-base-bg/80 via-transparent to-transparent" />

        <!-- Feature Content -->
        <div class="relative z-10 p-6 sm:p-8 flex flex-col gap-3">
          <div
            class="flex items-center gap-2 text-[1.15rem] font-semibold uppercase tracking-wider text-primary-amber">
            <span
              class="px-2 py-0.5 rounded bg-primary-amber/15 border border-primary-amber/30">Spotlight</span>
            <span
              v-if="featureRating"
              class="flex items-center gap-1 text-white font-medium">
              <svg
                class="text-primary-amber"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="currentColor">
                <path
                  d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
              <span>{{ featureRating }}</span>
            </span>
          </div>

          <h3
            class="m-0 font-display text-[2.6rem] sm:text-[3.2rem] font-extrabold text-white leading-tight -tracking-tight">
            {{ featureTitle }}
          </h3>

          <p
            v-if="feature.overview"
            class="m-0 text-[1.4rem] sm:text-[1.45rem] text-text-secondary leading-relaxed line-clamp-2 max-w-[620px]">
            {{ feature.overview }}
          </p>

          <div class="flex items-center gap-3 pt-2">
            <nuxt-link
              :to="{ name: `${featureMedia}-id`, params: { id: feature.id } }"
              class="inline-flex items-center gap-2 h-10 px-5 text-[1.3rem] font-semibold text-[#07080b] bg-primary-amber hover:bg-primary-hover rounded-lg transition-colors duration-200">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              <span>Explore Story</span>
            </nuxt-link>

            <span v-if="featureYear" class="text-[1.3rem] text-text-muted">
              {{ featureYear }}
            </span>
          </div>
        </div>
      </div>

      <!-- Right: Supporting Movies Stack (5 Cols) -->
      <div class="lg:col-span-5 flex flex-col justify-between gap-3 sm:gap-3.5">
        <nuxt-link
          v-for="item in supportingItems"
          :key="`supporting-${item.id}`"
          :to="{ name: `${getMediaType(item)}-id`, params: { id: item.id } }"
          class="group relative flex items-center gap-4 p-3 rounded-xl bg-surface-1 border border-border-subtle hover:bg-surface-2 hover:border-border-medium transition-all duration-200 no-underline">
          <!-- Thumbnail -->
          <div
            class="relative w-[110px] sm:w-[130px] shrink-0 h-[74px] sm:h-[84px] rounded-lg overflow-hidden bg-surface-3">
            <img
              v-if="getItemBackdrop(item)"
              v-lazyload="getItemBackdrop(item)"
              :alt="getItemTitle(item)"
              class="lazyload absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
            <div
              class="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-200" />
          </div>

          <!-- Info -->
          <div class="flex-1 min-w-0 pr-2">
            <h4
              class="m-0 text-[1.4rem] font-semibold text-white leading-snug truncate group-hover:text-primary-amber transition-colors duration-200">
              {{ getItemTitle(item) }}
            </h4>

            <div
              class="flex items-center gap-2 mt-1 text-[1.2rem] text-text-muted">
              <span>{{ getItemYear(item) }}</span>
              <span v-if="item.vote_average" class="opacity-40">&middot;</span>
              <span
                v-if="item.vote_average"
                class="flex items-center gap-1 text-text-secondary font-medium">
                <svg
                  class="text-primary-amber"
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="currentColor">
                  <path
                    d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
                <span>{{ item.vote_average | rating }}</span>
              </span>
            </div>

            <p
              v-if="item.overview"
              class="m-0 mt-1 text-[1.2rem] text-text-subtle truncate">
              {{ item.overview }}
            </p>
          </div>

          <!-- Arrow Icon -->
          <span
            class="pr-2 text-text-subtle group-hover:text-primary-amber group-hover:translate-x-1 transition-all duration-200">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </span>
        </nuxt-link>
      </div>
    </div>
  </section>
</template>

<script>
import { getBackdropUrl } from '~/api';

export default {
  props: {
    title: {
      type: String,
      default: 'Editorial Selection',
    },
    tag: {
      type: String,
      default: 'Curated Collection',
    },
    feature: {
      type: Object,
      required: true,
    },
    supporting: {
      type: Array,
      default: () => [],
    },
    viewAllUrl: {
      type: Object,
      default: () => null,
    },
  },

  computed: {
    featureTitle () {
      return this.feature.title || this.feature.name || '';
    },

    featureMedia () {
      return this.feature.title ? 'movie' : 'tv';
    },

    featureBackdrop () {
      if (this.feature && this.feature.backdrop_path) {
        return getBackdropUrl(this.feature.backdrop_path, 'w1280');
      }
      return null;
    },

    featureYear () {
      const d = this.feature.release_date || this.feature.first_air_date;
      return d ? d.split('-')[0] : null;
    },

    featureRating () {
      if (this.feature && this.feature.vote_average) {
        return this.$options.filters.rating(this.feature.vote_average);
      }
      return null;
    },

    supportingItems () {
      return (this.supporting || []).slice(0, 4);
    },
  },

  methods: {
    getItemTitle (item) {
      return item.title || item.name || '';
    },

    getMediaType (item) {
      if (item.media_type) return item.media_type;
      return item.title ? 'movie' : 'tv';
    },

    getItemBackdrop (item) {
      if (item.backdrop_path) {
        return getBackdropUrl(item.backdrop_path, 'w500');
      }
      return null;
    },

    getItemYear (item) {
      const d = item.release_date || item.first_air_date;
      return d ? d.split('-')[0] : '';
    },
  },
};
</script>
