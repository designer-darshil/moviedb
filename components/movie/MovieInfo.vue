<template>
  <div class="spacing" :class="$style.info">
    <div :class="$style.left">
      <div :class="$style.posterWrap">
        <img
          v-if="poster"
          v-lazyload="poster"
          class="lazyload"
          :class="$style.image"
          :alt="name">

        <div v-else :class="$style.placeholder">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round">
            <rect
              x="2"
              y="2"
              width="20"
              height="20"
              rx="2.18"
              ry="2.18" />
            <line x1="7" y1="2" x2="7" y2="22" />
            <line x1="17" y1="2" x2="17" y2="22" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <line x1="2" y1="7" x2="7" y2="7" />
            <line x1="2" y1="17" x2="7" y2="17" />
            <line x1="17" y1="17" x2="22" y2="17" />
            <line x1="17" y1="7" x2="22" y2="7" />
          </svg>
          <span :class="$style.placeholderText">No Poster Available</span>
        </div>
      </div>
    </div>

    <div :class="$style.right">
      <div v-if="item.overview" :class="$style.storyline">
        <h2 :class="$style.sectionTitle">
          Storyline
        </h2>
        <p :class="$style.overviewText" v-html="item.overview" />
      </div>

      <div :class="$style.metaCard">
        <ul :class="$style.statsGrid">
          <li v-if="item.release_date" :class="$style.statItem">
            <span :class="$style.label">Released</span>
            <span :class="$style.value">{{
              item.release_date | fullDate
            }}</span>
          </li>

          <li v-if="item.runtime" :class="$style.statItem">
            <span :class="$style.label">Runtime</span>
            <span :class="$style.value">{{ item.runtime | runtime }}</span>
          </li>

          <li v-if="directors" :class="$style.statItem">
            <span :class="$style.label">Director</span>
            <span :class="$style.value" v-html="directors" />
          </li>

          <li v-if="item.budget" :class="$style.statItem">
            <span :class="$style.label">Budget</span>
            <span :class="$style.value">${{ item.budget | numberWithCommas }}</span>
          </li>

          <li v-if="item.revenue" :class="$style.statItem">
            <span :class="$style.label">Box Office</span>
            <span :class="$style.value">${{ item.revenue | numberWithCommas }}</span>
          </li>

          <li v-if="item.genres && item.genres.length" :class="$style.statItem">
            <span :class="$style.label">Genre</span>
            <span :class="$style.value" v-html="formatGenres(item.genres)" />
          </li>

          <li v-if="item.status" :class="$style.statItem">
            <span :class="$style.label">Status</span>
            <span :class="$style.value">{{ item.status }}</span>
          </li>

          <li v-if="item.original_language" :class="$style.statItem">
            <span :class="$style.label">Original Language</span>
            <span :class="$style.value">{{
              item.original_language | fullLang
            }}</span>
          </li>

          <li
            v-if="item.production_companies && item.production_companies.length"
            :class="$style.statItem">
            <span :class="$style.label">Production</span>
            <span :class="$style.value">{{
              item.production_companies | arrayToList
            }}</span>
          </li>
        </ul>
      </div>

      <div :class="$style.external">
        <ExternalLinks :links="item.external_ids" />
      </div>
    </div>
  </div>
</template>

<script>
import { getPosterUrl } from '~/api';
import { name, directors } from '~/mixins/Details';
import ExternalLinks from '~/components/ExternalLinks';

export default {
  components: {
    ExternalLinks,
  },

  mixins: [name, directors],

  props: {
    item: {
      type: Object,
      required: true,
    },
  },

  computed: {
    poster () {
      if (this.item.poster_path) {
        return getPosterUrl(this.item.poster_path, 'w500');
      }
      return false;
    },
  },

  methods: {
    formatGenres (genres) {
      return genres
        .map(genre => `<a href="/genre/${genre.id}/movie">${genre.name}</a>`)
        .join(', ');
    },
  },
};
</script>

<style lang="scss" module>
@import "~/assets/css/utilities/_variables.scss";

.info {
  display: flex;
  flex-direction: column;
  gap: 3.2rem;

  @media (min-width: $breakpoint-medium) {
    flex-direction: row;
    gap: 4.8rem;
    align-items: flex-start;
  }
}

.left {
  width: 100%;
  max-width: 320px;
  margin: 0 auto;

  @media (min-width: $breakpoint-medium) {
    width: 30%;
    max-width: 340px;
    flex-shrink: 0;
    margin: 0;
  }
}

.posterWrap {
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 150%;
  overflow: hidden;
  background-color: $surface-2;
  border: 1px solid $border-subtle;
  border-radius: $radius-lg;
  box-shadow: $shadow-lg;
}

.image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.2rem;
  color: $text-muted;
  background-color: $surface-1;
}

.placeholderText {
  font-size: 1.2rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.right {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2.8rem;
}

.storyline {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.sectionTitle {
  margin: 0;
  font-size: 2.2rem;
  font-weight: 700;
  color: $text-primary;
  letter-spacing: -0.02em;
}

.overviewText {
  margin: 0;
  font-size: 1.6rem;
  line-height: 1.7;
  color: $text-secondary;
}

.metaCard {
  background-color: $surface-1;
  border: 1px solid $border-subtle;
  border-radius: $radius-md;
  padding: 2.4rem;
}

.statsGrid {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.8rem;

  @media (min-width: $breakpoint-small) {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem 2.8rem;
  }
}

.statItem {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.label {
  font-size: 1.2rem;
  font-weight: 600;
  color: $text-muted;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.value {
  font-size: 1.45rem;
  font-weight: 500;
  color: $text-primary;
  line-height: 1.4;

  a {
    color: $primary-color;

    &:hover {
      text-decoration: underline;
    }
  }
}

.external {
  display: flex;
  align-items: center;
  padding-top: 0.8rem;
}
</style>
