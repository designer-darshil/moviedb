<template>
  <div :class="$style.wrapper">
    <div :class="$style.layout">
      <!-- Left Column: Portrait Artwork & Metadata -->
      <aside :class="$style.left">
        <div :class="$style.portraitWrap">
          <div :class="$style.portrait">
            <img
              v-if="avatar"
              v-lazyload="avatar"
              class="lazyload"
              :class="$style.image"
              :alt="person.name">

            <div v-else :class="$style.placeholder">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span>No Photo</span>
            </div>
          </div>
        </div>

        <!-- Social Links on Desktop -->
        <div :class="$style.desktopExternal">
          <ExternalLinks media="person" :links="person.external_ids" />
        </div>
      </aside>

      <!-- Right Column: Biography & Vital Stats -->
      <div :class="$style.right">
        <!-- Header Info -->
        <div :class="$style.header">
          <span v-if="person.known_for_department" :class="$style.deptBadge">
            {{ person.known_for_department }}
          </span>
          <h1 :class="$style.name">
            {{ person.name }}
          </h1>
        </div>

        <!-- Vital Statistics Grid -->
        <div :class="$style.statsCard">
          <div v-if="person.birthday" :class="$style.statItem">
            <span :class="$style.statLabel">Born</span>
            <span :class="$style.statValue">
              {{ person.birthday | fullDate }}
              <strong v-if="!person.deathday && age" :class="$style.ageTag">(age {{ age }})</strong>
            </span>
          </div>

          <div v-if="person.place_of_birth" :class="$style.statItem">
            <span :class="$style.statLabel">Place of Birth</span>
            <span :class="$style.statValue">{{ person.place_of_birth }}</span>
          </div>

          <div v-if="person.deathday" :class="$style.statItem">
            <span :class="$style.statLabel">Died</span>
            <span :class="$style.statValue">
              {{ person.deathday | fullDate }}
              <strong v-if="age" :class="$style.ageTag">(aged {{ age }})</strong>
            </span>
          </div>

          <div v-if="person.known_for_department" :class="$style.statItem">
            <span :class="$style.statLabel">Known For</span>
            <span :class="$style.statValue">{{ person.known_for_department }}</span>
          </div>
        </div>

        <!-- Biography Section -->
        <section v-if="person.biography" :class="$style.bioSection">
          <div :class="$style.sectionHeader">
            <span :class="$style.accentPip" />
            <h2 :class="$style.sectionTitle">
              Biography
            </h2>
          </div>
          <div :class="$style.bioText" v-html="formatContent(person.biography)" />
        </section>

        <!-- Social Links on Mobile -->
        <div :class="$style.mobileExternal">
          <ExternalLinks media="person" :links="person.external_ids" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { apiImgUrl } from '~/api';
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
        return `${apiImgUrl}/w370_and_h556_bestv2${this.person.profile_path}`;
      }
      return null;
    },

    age () {
      const born = this.person.birthday;
      const died = this.person.deathday;

      if (born && !died) {
        return this.getAge(born);
      } else if (born && died) {
        return this.getAge(born, died);
      }
      return false;
    },
  },

  created () {
    if (this.person.homepage) {
      this.person.external_ids.homepage = this.person.homepage;
    }
  },

  methods: {
    formatContent (string) {
      return string.split('\n').filter(section => section.trim() !== '').map(section => `<p>${section}</p>`).join('');
    },

    getAge (born, died) {
      const startDate = new Date(born);
      const endDate = died ? new Date(died) : new Date();

      let age = endDate.getFullYear() - startDate.getFullYear();
      const month = endDate.getMonth() - startDate.getMonth();

      if (month < 0 || (month === 0 && endDate.getDate() < startDate.getDate())) {
        age--;
      }

      return age;
    },
  },
};
</script>

<style lang="scss" module>
@import '~/assets/css/utilities/_variables.scss';

.wrapper {
  padding: 4rem 1.6rem;
  max-width: 1440px;
  margin: 0 auto;

  @media (min-width: $breakpoint-small) {
    padding: 4.8rem 3.2rem;
  }

  @media (min-width: $breakpoint-large) {
    padding: 6.4rem 4.8rem;
  }
}

.layout {
  display: flex;
  flex-direction: column;
  gap: 3.2rem;

  @media (min-width: $breakpoint-small) {
    flex-direction: row;
    align-items: flex-start;
    gap: 4rem;
  }

  @media (min-width: $breakpoint-large) {
    gap: 6.4rem;
  }
}

.left {
  flex: 0 0 22rem;

  @media (min-width: $breakpoint-medium) {
    flex: 0 0 28rem;
  }

  @media (min-width: $breakpoint-large) {
    flex: 0 0 32rem;
  }
}

.portraitWrap {
  border-radius: $radius-lg;
  overflow: hidden;
  box-shadow: $shadow-lg;
  border: 1px solid $border-subtle;
}

.portrait {
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 150%;
  background-color: $surface-2;
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
  gap: 0.8rem;
  color: $text-muted;
}

.desktopExternal {
  display: none;

  @media (min-width: $breakpoint-small) {
    display: block;
    margin-top: 2rem;
  }
}

.mobileExternal {
  margin-top: 3.2rem;

  @media (min-width: $breakpoint-small) {
    display: none;
  }
}

.right {
  flex: 1;
  min-width: 0;
}

.header {
  margin-bottom: 2.4rem;
}

.deptBadge {
  display: inline-block;
  padding: 0.35rem 0.85rem;
  font-size: 1.15rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: $primary-color;
  background-color: rgba(229, 169, 60, 0.12);
  border: 1px solid rgba(229, 169, 60, 0.25);
  border-radius: $radius-sm;
  margin-bottom: 1rem;
}

.name {
  margin: 0;
  font-size: 2.8rem;
  font-weight: 800;
  color: #fff;
  letter-spacing: -0.03em;

  @media (min-width: $breakpoint-small) {
    font-size: 3.6rem;
  }

  @media (min-width: $breakpoint-large) {
    font-size: 4.4rem;
  }
}

.statsCard {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.6rem;
  padding: 2.4rem;
  background-color: $surface-1;
  border: 1px solid $border-subtle;
  border-radius: $radius-lg;
  margin-bottom: 3.6rem;

  @media (min-width: $breakpoint-xsmall) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.statItem {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.statLabel {
  font-size: 1.15rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: $text-muted;
}

.statValue {
  font-size: 1.45rem;
  font-weight: 500;
  color: $text-primary;
}

.ageTag {
  font-weight: 600;
  color: $primary-color;
  margin-left: 0.4rem;
}

.bioSection {
  margin-top: 3.2rem;
}

.sectionHeader {
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

.sectionTitle {
  margin: 0;
  font-size: 1.8rem;
  font-weight: 700;
  color: #fff;
  letter-spacing: -0.02em;

  @media (min-width: $breakpoint-large) {
    font-size: 2.2rem;
  }
}

.bioText {
  font-size: 1.55rem;
  line-height: 1.7;
  color: rgba(243, 244, 246, 0.88);
  max-width: 80rem;

  p {
    margin: 0 0 1.6rem;
  }
}
</style>
