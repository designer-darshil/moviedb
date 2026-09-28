<template>
  <footer :class="$style.footer">
    <div :class="$style.inner">
      <div :class="$style.brandCol">
        <nuxt-link to="/" :class="$style.logo">
          <span :class="$style.brandIcon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="2" width="20" height="20" rx="4" stroke="currentColor" stroke-width="1.75" />
              <path d="M7 2v20M17 2v20M2 12h20M2 7h5M2 17h5M17 7h5M17 17h5" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" />
            </svg>
          </span>
          <span :class="$style.brandName">CinemaDB</span>
        </nuxt-link>
        <p :class="$style.tagline">
          An editorial digital cinema catalogue & discovery platform.
        </p>
      </div>

      <div :class="$style.linksCol">
        <nav :class="$style.navLinks" aria-label="Footer Navigation">
          <nuxt-link to="/">Home</nuxt-link>
          <nuxt-link to="/movie">Movies</nuxt-link>
          <nuxt-link to="/tv">TV Shows</nuxt-link>
          <nuxt-link to="/search">Search</nuxt-link>
        </nav>

        <p :class="$style.attribution">
          Film data, imagery, and synopsis provided by
          <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer">TMDb</a>.
        </p>
      </div>
    </div>

    <div :class="$style.bottom">
      <p :class="$style.copy">
        &copy; {{ new Date().getFullYear() }} CinemaDB. Designed for cinema culture enthusiasts.
      </p>
    </div>
  </footer>
</template>

<style lang="scss" module>
@import '~/assets/css/utilities/_variables.scss';

.footer {
  margin-top: 6.4rem;
  padding: 4rem 1.6rem calc(#{$nav-mobile-height} + 4rem);
  color: $text-muted;
  background-color: $surface-1;
  border-top: 1px solid $border-subtle;

  @media (min-width: $breakpoint-small) {
    padding-left: 3.2rem;
    padding-right: 3.2rem;
  }

  @media (min-width: $breakpoint-large) {
    padding: 4.8rem 4.8rem 3.6rem;
  }
}

.inner {
  display: flex;
  flex-direction: column;
  gap: 2.8rem;
  max-width: 1440px;
  margin: 0 auto;

  @media (min-width: $breakpoint-medium) {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }
}

.brandCol {
  max-width: 380px;
}

.logo {
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  color: #fff;
  text-decoration: none;
  transition: color $transition-fast;

  &:hover {
    color: $primary-color;
  }
}

.brandIcon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.2rem;
  height: 3.2rem;
  color: $primary-color;
  background-color: rgba(229, 169, 60, 0.1);
  border: 1px solid rgba(229, 169, 60, 0.2);
  border-radius: $radius-sm;
}

.brandName {
  font-size: 1.6rem;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.tagline {
  margin: 1rem 0 0;
  font-size: 1.3rem;
  line-height: 1.5;
  color: $text-muted;
}

.linksCol {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;

  @media (min-width: $breakpoint-medium) {
    align-items: flex-end;
  }
}

.navLinks {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;

  a {
    font-size: 1.3rem;
    font-weight: 500;
    color: $text-color-grey;
    text-decoration: none;
    transition: color $transition-fast;

    &:hover {
      color: $primary-color;
    }
  }
}

.attribution {
  margin: 0;
  font-size: 1.2rem;
  color: $text-muted;

  a {
    color: $text-color-grey;
    text-decoration: underline;

    &:hover {
      color: $primary-color;
    }
  }
}

.bottom {
  max-width: 1440px;
  margin: 2.8rem auto 0;
  padding-top: 2rem;
  border-top: 1px solid $border-subtle;
}

.copy {
  margin: 0;
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.3);
}
</style>
