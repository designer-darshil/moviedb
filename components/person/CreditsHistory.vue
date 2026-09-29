<template>
  <div class="my-7 mx-4 sm:my-10 sm:mx-8 lg:my-12 lg:mx-12">
    <div class="flex flex-wrap items-center gap-6 mb-8 pb-4 border-b border-border-subtle">
      <div class="flex items-center gap-3">
        <label for="credits_category" class="text-[1.2rem] font-bold uppercase tracking-widest text-text-subtle">
          Department
        </label>

        <select
          id="credits_category"
          v-model="active_category"
          class="bg-surface-2 text-text-primary border border-border-subtle rounded-lg px-3 py-2 text-[1.3rem] outline-none focus:border-primary-amber"
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

      <div class="flex items-center gap-3">
        <label for="credits_media" class="text-[1.2rem] font-bold uppercase tracking-widest text-text-subtle"> Format </label>

        <select
          id="credits_media"
          v-model="active_media"
          class="bg-surface-2 text-text-primary border border-border-subtle rounded-lg px-3 py-2 text-[1.3rem] outline-none focus:border-primary-amber"
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
      class="mb-12">
      <div class="flex items-center gap-3 mb-4">
        <span class="inline-block w-1 h-6 bg-primary-amber rounded-full" />
        <h2 class="m-0 text-[2rem] font-bold text-white -tracking-wide">
          {{ category.name }}
        </h2>
      </div>

      <div class="overflow-hidden rounded-xl border border-border-subtle bg-surface-1">
        <table class="w-full border-collapse">
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
