<template>
  <div :class="$style.wrapper">
    <!-- Filmography Filter Controls -->
    <div :class="$style.head">
      <div :class="$style.filters">
        <div :class="$style.filter">
          <label for="credits_category" :class="$style.label">
            Department
          </label>
          <select
            id="credits_category"
            v-model="active_category"
            :class="$style.select"
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
          <label for="credits_media" :class="$style.label">
            Media Format
          </label>
          <select
            id="credits_media"
            v-model="active_media"
            :class="$style.select"
            @change="getCredits">
            <option value="combined_credits">
              All Formats
            </option>
            <option value="movie_credits">
              Feature Films
            </option>
            <option value="tv_credits">
              Television Series
            </option>
          </select>
        </div>
      </div>
    </div>

    <!-- Grouped Department Filmography -->
    <div
      v-for="category in active_credits"
      :key="`credits-${category.name.toLowerCase()}`"
      :class="$style.category">
      <div :class="$style.categoryHeader">
        <span :class="$style.accentPip" />
        <h2 :class="$style.title">
          {{ category.name }}
        </h2>
      </div>

      <div :class="$style.tableCard">
        <table :class="$style.table">
          <tbody>
            <CreditsHistoryGroup
              v-for="group in category.groups"
              :key="`credit-${category.name.toLowerCase()}-${group.year}`"
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
      active_media: 'combined_credits',
      active_category: 'all',
      categories: [],
      active_credits: null,
      combined_credits: [],
      movie_credits: [],
      tv_credits: [],
    };
  },

  created () {
    const cast = this.handleCast(this.credits.cast);
    const crew = this.handleCrew(this.credits.crew);

    if (cast) this.$data[this.active_media].push({ name: 'Acting', groups: cast });
    if (crew) this.$data[this.active_media] = [...this.$data[this.active_media], ...crew];

    this.active_credits = this.$data[this.active_media];
    this.categories = this.getCategories();
  },

  methods: {
    handleCast (items) {
      if (!items || !items.length) return;
      let groups = this.groupItems(items);
      const blankGroup = groups.find(group => group.year === '');
      if (blankGroup) groups = groups.filter(group => group.year !== '');
      this.sortGroups(groups);
      if (blankGroup) groups.unshift(blankGroup);
      groups.forEach(group => this.sortCredits(group.credits));
      return groups;
    },

    handleCrew (items) {
      if (!items || !items.length) return;
      const categories = this.createCategories(items);
      categories.forEach((category) => {
        let groups = this.groupItems(category.groups);
        const blankGroup = groups.find(group => group.year === '');
        if (blankGroup) groups = groups.filter(group => group.year !== '');
        this.sortGroups(groups);
        if (blankGroup) groups.unshift(blankGroup);
        groups.forEach(group => this.sortCredits(group.credits));
        category.groups = groups;
      });
      return categories;
    },

    getCategories () {
      return this.active_credits.map(category => category.name);
    },

    getCredits () {
      const media = this.active_media;
      if (this.$data[media] && this.$data[media].length) {
        this.active_credits = this.$data[media];
        this.active_category = 'all';
        this.categories = this.getCategories();
      } else {
        getCredits(this.$route.params.id, media).then((response) => {
          const cast = this.handleCast(response.cast);
          const crew = this.handleCrew(response.crew);
          if (cast) this.$data[media].push({ name: 'Acting', groups: cast });
          if (crew) this.$data[media] = [...this.$data[media], ...crew];
          this.active_credits = this.$data[media];
          this.active_category = 'all';
          this.categories = this.getCategories();
        });
      }
    },

    filterCredits () {
      if (this.active_category === 'all') {
        this.active_credits = this.$data[this.active_media];
      } else {
        this.active_credits = this.$data[this.active_media].filter(category => category.name.toLowerCase() === this.active_category);
      }
    },

    createCategories (items) {
      const categories = [];
      items.forEach((item) => {
        const exists = categories.find(category => category.name === item.department);
        if (exists) {
          exists.groups.push(item);
        } else {
          categories.push({
            name: item.department,
            groups: [item],
          });
        }
      });
      return categories;
    },

    groupItems (items) {
      return items.reduce(function (arr, current) {
        const date = current.release_date ? current.release_date : current.first_air_date;
        const year = date ? date.split('-')[0] : '';
        const exists = arr.find(item => item.year === year);
        if (exists) {
          exists.credits.push(current);
        } else {
          arr.push({
            year,
            credits: [current],
          });
        }
        return arr;
      }, []);
    },

    sortGroups (items) {
      return items.sort((a, b) => a.year > b.year ? -1 : 1);
    },

    sortCredits (items) {
      return items.sort((a, b) => {
        const aDate = a.release_date ? a.release_date : a.first_air_date;
        const bDate = b.release_date ? b.release_date : b.first_air_date;
        if (aDate > bDate) return -1;
        if (aDate < bDate) return 1;
        return 0;
      });
    },
  },
};
</script>

<style lang="scss" module>
@import '~/assets/css/utilities/_variables.scss';

.wrapper {
  padding: 3.2rem 1.6rem;
  max-width: 1440px;
  margin: 0 auto;

  @media (min-width: $breakpoint-small) {
    padding: 4rem 3.2rem;
  }

  @media (min-width: $breakpoint-large) {
    padding: 4.8rem 4.8rem;
  }
}

.head {
  margin-bottom: 3.6rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid $border-subtle;
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
}

.filter {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.label {
  font-size: 1.25rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: $text-muted;
}

.select {
  min-width: 16rem;
}

.category {
  margin-bottom: 4.8rem;

  &:last-child {
    margin-bottom: 0;
  }
}

.categoryHeader {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.6rem;
}

.accentPip {
  display: inline-block;
  width: 4px;
  height: 2rem;
  background-color: $primary-color;
  border-radius: $radius-full;
}

.title {
  margin: 0;
  font-size: 1.8rem;
  font-weight: 700;
  color: #fff;
  letter-spacing: -0.02em;

  @media (min-width: $breakpoint-large) {
    font-size: 2.2rem;
  }
}

.tableCard {
  background-color: $surface-1;
  border: 1px solid $border-subtle;
  border-radius: $radius-lg;
  overflow: hidden;
}

.table {
  width: 100%;
  border-collapse: collapse;
}
</style>
