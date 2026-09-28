<template>
  <footer :class="$style.footer">
    <div :class="$style.container">
      <div :class="$style.topSection">
        <div :class="$style.brandCol">
          <div :class="$style.brandMark">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
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
            <span :class="$style.brandTitle">CinemaDB</span>
          </div>
          <p :class="$style.brandTagline">
            A modern, cinematic digital film catalogue and discovery platform.
          </p>
        </div>

        <div :class="$style.linksGrid">
          <div :class="$style.col">
            <h4 :class="$style.colHeader">
              Movies
            </h4>
            <ul :class="$style.linksList">
              <li>
                <nuxt-link
                  :to="{
                    name: 'movie-category-name',
                    params: { name: 'popular' },
                  }">
                  Popular
                </nuxt-link>
              </li>
              <li>
                <nuxt-link
                  :to="{
                    name: 'movie-category-name',
                    params: { name: 'top_rated' },
                  }">
                  Top Rated
                </nuxt-link>
              </li>
              <li>
                <nuxt-link
                  :to="{
                    name: 'movie-category-name',
                    params: { name: 'upcoming' },
                  }">
                  Upcoming
                </nuxt-link>
              </li>
              <li>
                <nuxt-link
                  :to="{
                    name: 'movie-category-name',
                    params: { name: 'now_playing' },
                  }">
                  Now Playing
                </nuxt-link>
              </li>
            </ul>
          </div>

          <div :class="$style.col">
            <h4 :class="$style.colHeader">
              TV Series
            </h4>
            <ul :class="$style.linksList">
              <li>
                <nuxt-link
                  :to="{
                    name: 'tv-category-name',
                    params: { name: 'popular' },
                  }">
                  Popular
                </nuxt-link>
              </li>
              <li>
                <nuxt-link
                  :to="{
                    name: 'tv-category-name',
                    params: { name: 'top_rated' },
                  }">
                  Top Rated
                </nuxt-link>
              </li>
              <li>
                <nuxt-link
                  :to="{
                    name: 'tv-category-name',
                    params: { name: 'on_the_air' },
                  }">
                  On The Air
                </nuxt-link>
              </li>
              <li>
                <nuxt-link
                  :to="{
                    name: 'tv-category-name',
                    params: { name: 'airing_today' },
                  }">
                  Airing Today
                </nuxt-link>
              </li>
            </ul>
          </div>

          <div :class="$style.col">
            <h4 :class="$style.colHeader">
              Attribution
            </h4>
            <p :class="$style.tmdbNotice">
              Film data, artwork, and metadata provided by
              <a
                href="https://www.themoviedb.org/"
                target="_blank"
                rel="noopener">The Movie Database (TMDb)</a>. This product uses the TMDb API but is not endorsed or certified
              by TMDb.
            </p>
          </div>
        </div>
      </div>

      <div :class="$style.bottomSection">
        <div :class="$style.copyText">
          &copy; {{ new Date().getFullYear() }} CinemaDB. Designed &amp; built
          for film enthusiasts.
        </div>

        <div :class="$style.socialLinks">
          <a
            href="https://github.com/designer-darshil/moviedb"
            target="_blank"
            rel="noopener"
            aria-label="GitHub Repository"
            :class="$style.socialBtn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" module>
@import "~/assets/css/utilities/_variables.scss";

.footer {
  border-top: 1px solid $border-subtle;
  background-color: $surface-1;
  padding: 4.8rem 1.6rem 8rem;

  @media (min-width: $breakpoint-small) {
    padding: 6rem 3.2rem 8rem;
  }

  @media (min-width: $breakpoint-large) {
    padding: 6.4rem 4.8rem 4.8rem;
  }
}

.container {
  max-width: 1400px;
  margin: 0 auto;
}

.topSection {
  display: flex;
  flex-direction: column;
  gap: 3.6rem;
  padding-bottom: 4rem;
  border-bottom: 1px solid $border-subtle;

  @media (min-width: $breakpoint-medium) {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }
}

.brandCol {
  max-width: 320px;
}

.brandMark {
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  color: $primary-color;
  margin-bottom: 1.2rem;
}

.brandTitle {
  font-size: 2rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: #fff;
}

.brandTagline {
  font-size: 1.35rem;
  line-height: 1.6;
  color: $text-muted;
}

.linksGrid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3.2rem 2.4rem;

  @media (min-width: $breakpoint-small) {
    grid-template-columns: repeat(3, 1fr);
    gap: 4rem;
  }
}

.colHeader {
  margin: 0 0 1.6rem;
  font-size: 1.3rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: $text-primary;
}

.linksList {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  a {
    font-size: 1.35rem;
    color: $text-muted;
    transition: color $transition-fast;

    &:hover {
      color: $primary-color;
    }
  }
}

.tmdbNotice {
  font-size: 1.25rem;
  line-height: 1.6;
  color: $text-muted;

  a {
    color: $primary-color;
    text-decoration: underline;
  }
}

.bottomSection {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  padding-top: 3.2rem;

  @media (min-width: $breakpoint-small) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}

.copyText {
  font-size: 1.25rem;
  color: $text-subtle;
}

.socialLinks {
  display: flex;
  align-items: center;
  gap: 1.2rem;
}

.socialBtn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.6rem;
  height: 3.6rem;
  border-radius: $radius-full;
  color: $text-muted;
  background-color: $surface-2;
  border: 1px solid $border-subtle;
  transition: all $transition-fast;

  &:hover {
    color: #fff;
    background-color: $surface-3;
    border-color: $border-medium;
    transform: translateY(-2px);
  }
}
</style>
