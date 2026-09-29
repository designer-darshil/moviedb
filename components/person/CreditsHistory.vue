<template>
  <div class="my-6 sm:my-8 px-4 sm:px-8 lg:px-12 max-w-[1600px] mx-auto">
    <!-- Filter Bar -->
    <div
      class="flex flex-wrap items-center gap-6 mb-8 pb-3 border-b border-border-subtle"
    >
      <div class="flex items-center gap-3">
        <label
          for="credits_category"
          class="text-[1.2rem] font-semibold uppercase tracking-wider text-text-subtle"
        >
          Department
        </label>

        <Dropdown
          id="credits_category"
          v-model="active_category"
          :options="categoryOptions"
          option-label="label"
          option-value="value"
          aria-label="Filter by Department"
          class="w-52 !bg-surface-2 !rounded-xl"
          :disabled="!categories.length || categories.length === 1"
          @change="filterCredits"
        />
      </div>

      <div class="flex items-center gap-3">
        <label
          for="credits_media"
          class="text-[1.2rem] font-semibold uppercase tracking-wider text-text-subtle"
        >
          Format
        </label>

        <Dropdown
          id="credits_media"
          v-model="active_media"
          :options="mediaOptions"
          option-label="label"
          option-value="value"
          aria-label="Filter by Format"
          class="w-44 !bg-surface-2 !rounded-xl"
          @change="getCredits"
        />
      </div>
    </div>

    <!-- Department Sections -->
    <div
      v-for="category in active_credits"
      :key="`credits-${category.name.toLowerCase()}`"
      class="mb-10"
    >
      <div class="flex items-center gap-2.5 mb-3">
        <h2
          class="m-0 text-[1.8rem] font-bold text-text-primary -tracking-wide"
        >
          {{ category.name }}
        </h2>
      </div>

      <div
        class="overflow-hidden rounded-2xl border border-border-subtle bg-surface-1 shadow-cinema-sm"
      >
        <table class="w-full border-collapse">
          <tbody>
            <CreditsHistoryGroup
              v-for="group in category.groups"
              :key="`credits-group-${group.year}`"
              :group="group"
            />
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

  data() {
    return {
      active_category: 'all',
      active_credits: null,
      active_media: 'combined_credits',
      categories: [],
      data: null,
    };
  },

  computed: {
    categoryOptions() {
      const options = [{ label: 'All Departments', value: 'all' }];
      this.categories.forEach((cat) => {
        options.push({ label: cat, value: cat.toLowerCase() });
      });
      return options;
    },

    mediaOptions() {
      return [
        { label: 'All Formats', value: 'combined_credits' },
        { label: 'Movies', value: 'movie_credits' },
        { label: 'TV Shows', value: 'tv_credits' },
      ];
    },
  },

  created() {
    this.initData(this.credits);
  },

  methods: {
    initData(credits) {
      this.data = credits;
      this.active_category = 'all';
      this.active_credits = null;
      this.categories = [];
      this.formatCredits(credits);
    },

    formatCredits(credits) {
      if (credits.cast && credits.cast.length) {
        this.categories.push('Acting');
      }

      if (credits.crew && credits.crew.length) {
        const departments = credits.crew
          .map((crew) => crew.department)
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
          items = credits.crew.filter((crew) => crew.department === category);
        }

        const groups = [];

        items.forEach((item) => {
          const date = item.release_date || item.first_air_date;
          const year = date ? date.split('-')[0] : '';

          const group = groups.find((group) => group.year === year);

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

    filterCredits() {
      if (this.active_category === 'all') {
        this.formatCredits(this.data);
      } else {
        const category = this.active_credits.find(
          (item) => item.name.toLowerCase() === this.active_category,
        );
        this.active_credits = [category];
      }
    },

    getCredits() {
      getCredits(this.$route.params.id, this.active_media)
        .then((response) => {
          this.initData(response);
        })
        .catch(() => {});
    },
  },
};
</script>
