<template>
  <div class="tw-my-7 tw-mx-4 sm:tw-my-10 sm:tw-mx-8 lg:tw-my-12 lg:tw-mx-12">
    <div class="tw-flex tw-flex-wrap tw-items-center tw-gap-6 tw-mb-8 tw-pb-4 tw-border-b tw-border-border-subtle">
      <div class="tw-flex tw-items-center tw-gap-3">
        <label for="credits_category" class="tw-text-[1.2rem] tw-font-bold tw-uppercase tw-tracking-widest tw-text-text-subtle">
          Department
        </label>

        <select
          id="credits_category"
          v-model="active_category"
          class="tw-bg-surface-2 tw-text-text-primary tw-border tw-border-border-subtle tw-rounded-lg tw-px-3 tw-py-2 tw-text-[1.3rem] tw-outline-none focus:tw-border-primary-amber"
          :disabled="!categories.length || categories.length === 1"
          @change="filterCredits">
          <option value="all">
            All Departments
          </option>

          <option
            v-for="category in categories"
            :key="`credit-filter-${category.toLowerCase()}`"
            :value="category.toLowerCase()">
            {{ category }}
          </option>
        </select>
      </div>

      <div class="tw-flex tw-items-center tw-gap-3">
        <label for="credits_media" class="tw-text-[1.2rem] tw-font-bold tw-uppercase tw-tracking-widest tw-text-text-subtle"> Format </label>

        <select
          id="credits_media"
          v-model="active_media"
          class="tw-bg-surface-2 tw-text-text-primary tw-border tw-border-border-subtle tw-rounded-lg tw-px-3 tw-py-2 tw-text-[1.3rem] tw-outline-none focus:tw-border-primary-amber"
          @change="getCredits">
          <option value="combined_credits">
            All Formats
          </option>
          <option value="movie_credits">
            Feature Films
          </option>
          <option value="tv_credits">
            TV Series
          </option>
        </select>
      </div>
    </div>

    <div
      v-for="category in active_credits"
      :key="`credits-${category.name.toLowerCase()}`"
      class="tw-mb-12">
      <div class="tw-flex tw-items-center tw-gap-3 tw-mb-4">
        <span class="tw-inline-block tw-w-1 tw-h-6 tw-bg-primary-amber tw-rounded-full" />
        <h2 class="tw-m-0 tw-text-[2rem] tw-font-bold tw-text-white -tw-tracking-wide">
          {{ category.name }}
        </h2>
      </div>

      <div class="tw-overflow-hidden tw-rounded-xl tw-border tw-border-border-subtle tw-bg-surface-1">
        <table class="tw-w-full tw-border-collapse">
          <tbody>
            <CreditsHistoryGroup
              v-for="group in category.groups"
              :key="`credits-group-${group.year}`"
              :group="group" />
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { getCredits } from '~/api';
import CreditsHistoryGroup from '~/components/person/CreditsHistoryGroup';

export default {
  components: {
    CreditsHistoryGroup,
  },

  props: {
    credits: {
      type: Object,
      required: true,
    },
  },

  data () {
    return {
      active_category: 'all',
      active_credits: null,
      active_media: 'combined_credits',
      categories: [],
      data: null,
    };
  },

  created () {
    this.initData(this.credits);
  },

  methods: {
    initData (credits) {
      this.data = credits;
      this.active_category = 'all';
      this.active_credits = null;
      this.categories = [];
      this.formatCredits(credits);
    },

    formatCredits (credits) {
      if (credits.cast && credits.cast.length) {
        this.categories.push('Acting');
      }

      if (credits.crew && credits.crew.length) {
        const departments = credits.crew
          .map(crew => crew.department)
          .filter(
            (department, index, self) => self.indexOf(department) === index,
          );
        this.categories = [...this.categories, ...departments];
      }

      const temp = [];

      this.categories.forEach((category) => {
        let items;

        if (category === 'Acting') {
          items = credits.cast;
        } else {
          items = credits.crew.filter(
            crew => crew.department === category,
          );
        }

        const groups = [];

        items.forEach((item) => {
          const date = item.release_date || item.first_air_date;
          const year = date ? date.split('-')[0] : '';

          const group = groups.find(group => group.year === year);

          if (group) {
            group.credits.push(item);
          } else {
            groups.push({
              year,
              credits: [item],
            });
          }
        });

        groups.sort((a, b) => {
          if (a.year === '') return -1;
          if (b.year === '') return 1;
          return a.year > b.year ? -1 : 1;
        });

        temp.push({
          name: category,
          groups,
        });
      });

      this.active_credits = temp;
    },

    filterCredits () {
      if (this.active_category === 'all') {
        this.formatCredits(this.data);
      } else {
        const category = this.active_credits.find(
          item => item.name.toLowerCase() === this.active_category,
        );
        this.active_credits = [category];
      }
    },

    getCredits () {
      getCredits(this.$route.params.id, this.active_media)
        .then((response) => {
          this.initData(response);
        })
        .catch(() => {});
    },
  },
};
</script>
