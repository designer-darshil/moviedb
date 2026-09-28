<template>
  <div :class="$style.block">
    <div :class="$style.card">
      <div :class="$style.iconWrap">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>

      <span :class="$style.statusCode">{{ error.statusCode || 404 }}</span>
      <h1 :class="$style.title">
        {{ message }}
      </h1>

      <p v-if="error.statusCode === 504" :class="$style.message">
        We are temporarily unable to communicate with the film database. Please check back in a few moments.
      </p>
      <p v-else :class="$style.message">
        The title, page, or reel you've requested cannot be found in the current catalogue.
      </p>

      <div :class="$style.actions">
        <nuxt-link to="/" class="button button--primary">
          Return to Cinema Home
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'no-footer',

  props: {
    error: {
      type: Object,
      required: true,
    },
  },

  head () {
    return {
      title: `${this.message} — CinemaDB`,
    };
  },

  computed: {
    message () {
      if (this.error.statusCode === 404) {
        return 'Title or Page Not Found';
      }
      return this.error.message || 'An error occurred';
    },
  },
};
</script>

<style lang="scss" module>
@import '~/assets/css/utilities/_variables.scss';

.block {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2.4rem 1.6rem;
  background-color: $base-bg;
}

.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 48rem;
  padding: 4.8rem 3.2rem;
  background-color: $surface-1;
  border: 1px solid $border-subtle;
  border-radius: $radius-lg;
  box-shadow: $shadow-lg;
}

.iconWrap {
  color: $primary-color;
  margin-bottom: 1.6rem;
}

.statusCode {
  font-size: 1.3rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: $primary-color;
  margin-bottom: 0.8rem;
}

.title {
  margin: 0 0 1.2rem;
  font-size: 2.4rem;
  font-weight: 700;
  color: #fff;
  letter-spacing: -0.02em;

  @media (min-width: $breakpoint-small) {
    font-size: 2.8rem;
  }
}

.message {
  margin: 0 0 3.2rem;
  font-size: 1.5rem;
  line-height: 1.6;
  color: $text-muted;
}

.actions {
  display: flex;
  gap: 1.2rem;
}
</style>
