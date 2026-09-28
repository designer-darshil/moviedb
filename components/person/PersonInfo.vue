<template>
  <div class="spacing" :class="$style.info">
    <div :class="$style.left">
      <div :class="$style.posterWrap">
        <img
          v-if="avatar"
          v-lazyload="avatar"
          class="lazyload"
          :class="$style.image"
          :alt="person.name">

        <div v-else :class="$style.placeholder">
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
          <span :class="$style.placeholderText">No Photo Available</span>
        </div>
      </div>
    </div>

    <div :class="$style.right">
      <div :class="$style.biographySection">
        <h1 :class="$style.personName">
          {{ person.name }}
        </h1>

        <div v-if="person.biography" :class="$style.bioContent">
          <h2 :class="$style.bioTitle">
            Biography
          </h2>
          <div
            :class="$style.bioText"
            v-html="formatContent(person.biography)" />
        </div>
      </div>

      <div :class="$style.metaCard">
        <ul :class="$style.statsGrid">
          <li v-if="person.known_for_department" :class="$style.statItem">
            <span :class="$style.label">Known For</span>
            <span :class="$style.value">{{ person.known_for_department }}</span>
          </li>

          <li v-if="person.birthday" :class="$style.statItem">
            <span :class="$style.label">Born</span>
            <span :class="$style.value">
              {{ person.birthday | fullDate }}
              <span
                v-if="!person.deathday"
                :class="$style.ageText">(Age {{ age }})</span>
            </span>
          </li>

          <li v-if="person.deathday" :class="$style.statItem">
            <span :class="$style.label">Died</span>
            <span :class="$style.value">{{ person.deathday | fullDate }}</span>
          </li>

          <li v-if="person.place_of_birth" :class="$style.statItem">
            <span :class="$style.label">Place of Birth</span>
            <span :class="$style.value">{{ person.place_of_birth }}</span>
          </li>

          <li
            v-if="person.also_known_as && person.also_known_as.length"
            :class="$style.statItem">
            <span :class="$style.label">Also Known As</span>
            <span :class="$style.value">{{
              person.also_known_as.slice(0, 3).join(", ")
            }}</span>
          </li>
        </ul>
      </div>

      <div :class="$style.external">
        <ExternalLinks :links="person.external_ids" />
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

.biographySection {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
}

.personName {
  margin: 0;
  font-size: 3.2rem;
  font-weight: 800;
  color: #fff;
  letter-spacing: -0.02em;

  @media (min-width: $breakpoint-small) {
    font-size: 4rem;
  }
}

.bioContent {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.bioTitle {
  margin: 0;
  font-size: 2rem;
  font-weight: 700;
  color: $text-primary;
  letter-spacing: -0.01em;
}

.bioText {
  font-size: 1.55rem;
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
}

.ageText {
  color: $text-muted;
  font-size: 1.3rem;
  margin-left: 0.4rem;
}

.external {
  display: flex;
  align-items: center;
  padding-top: 0.8rem;
}
</style>
