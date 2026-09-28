<template>
  <div class="spacing">
    <div :class="$style.head">
      <div :class="$style.filter">
        <label for="credits_category" :class="$style.filterLabel">
          Department
        </label>

        <select
          id="credits_category"
          v-model="active_category"
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

      <div :class="$style.filter">
        <label for="credits_media" :class="$style.filterLabel"> Format </label>

        <select id="credits_media" v-model="active_media" @change="getCredits">
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
      :class="$style.category">
      <div :class="$style.categoryHeader">
        <span :class="$style.accentBar" />
        <h2 :class="$style.title">
          {{ category.name }}
        </h2>
      </div>

      <div :class="$style.tableWrap">
        <table :class="$style.table">
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
            credit => credit.department === category,
          );
        }

        const dates = items
          .map((item) => {
            const date = item.release_date || item.first_air_date;
            return date ? date.split('-')[0] : '';
          })
          .filter((date, index, self) => self.indexOf(date) === index)
          .sort((a, b) => (a > b ? -1 : 1));

        const groups = [];

        dates.forEach((date) => {
          const group = {
            year: date,
            credits: items.filter((item) => {
              const itemDate = item.release_date || item.first_air_date;
              return itemDate ? itemDate.split('-')[0] === date : date === '';
            }),
          };

          groups.push(group);
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
        const credits = this.active_credits.filter(
          credit => credit.name.toLowerCase() === this.active_category,
        );
        this.active_credits = credits;
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

<style lang="scss" module>
@import "~/assets/css/utilities/_variables.scss";

.head {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 2rem;
  margin-bottom: 3.2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid $border-subtle;
}

.filter {
  display: flex;
  align-items: center;
  gap: 1.2rem;
}

.filterLabel {
  font-size: 1.3rem;
  font-weight: 600;
  color: $text-muted;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.category {
  margin-bottom: 4.8rem;
}

.categoryHeader {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 2rem;
}

.accentBar {
  display: inline-block;
  width: 4px;
  height: 2.2rem;
  background-color: $primary-color;
  border-radius: $radius-full;
}

.title {
  margin: 0;
  font-size: 2.2rem;
  font-weight: 700;
  color: $text-primary;
  letter-spacing: -0.01em;
}

.tableWrap {
  background-color: $surface-1;
  border: 1px solid $border-subtle;
  border-radius: $radius-md;
  overflow: hidden;
}

.table {
  width: 100%;
  border-collapse: collapse;
}
</style>
