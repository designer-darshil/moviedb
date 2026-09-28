<template>
  <div :class="$style.wrapper">
    <div :class="$style.card">
      <div :class="$style.statusCode">
        {{ error.statusCode || 404 }}
      </div>

      <h1 :class="$style.title">
        {{ message }}
      </h1>

      <p v-if="error.statusCode === 504" :class="$style.description">
        We are unable to connect to the film database at this moment. Please
        check your internet connection or try again in a few moments.
      </p>
      <p v-else :class="$style.description">
        The title, page, or resource you are looking for does not exist or may
        have been moved.
      </p>

      <div :class="$style.actions">
        <nuxt-link to="/" class="button button--primary">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          </svg>
          <span>Return Home</span>
        </nuxt-link>

        <nuxt-link to="/movie" class="button">
          <span>Explore Movies</span>
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
      title: this.message,
    };
  },

  computed: {
    message () {
      if (this.error.statusCode === 404) {
        return 'Title or Page Not Found';
      } else if (this.error.statusCode === 504) {
        return 'Service Unavailable';
      }
      return this.error.message || 'An Unexpected Error Occurred';
    },
  },
};
</script>

<style lang="scss" module>
@import "~/assets/css/utilities/_variables.scss";

.wrapper {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
}

.card {
  max-width: 540px;
  background-color: $surface-1;
  border: 1px solid $border-subtle;
  border-radius: $radius-lg;
  padding: 4.8rem 3.2rem;
  box-shadow: $shadow-lg;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.statusCode {
  font-size: 8rem;
  font-weight: 800;
  line-height: 1;
  color: $primary-color;
  letter-spacing: -0.04em;
  margin-bottom: 1.6rem;
  background: linear-gradient(135deg, $primary-color 0%, $primary-hover 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.title {
  margin: 0 0 1.2rem;
  font-size: 2.4rem;
  font-weight: 700;
  color: $text-primary;
  letter-spacing: -0.02em;
}

.description {
  margin: 0 0 3.2rem;
  font-size: 1.55rem;
  line-height: 1.6;
  color: $text-muted;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 1.2rem;
}
</style>
