<template>
  <footer class="tw-relative tw-w-full tw-bg-surface-1 tw-border-t tw-border-border-subtle tw-mt-24 sm:tw-mt-32 tw-pb-24 md:tw-pb-10">
    <div class="tw-w-full tw-max-w-[1600px] tw-mx-auto tw-px-4 sm:tw-px-8 lg:tw-px-12 tw-pt-14 sm:tw-pt-18">
      <div class="tw-flex tw-flex-col lg:tw-flex-row tw-gap-12 lg:tw-gap-16 tw-pb-12 sm:tw-pb-16 tw-border-b tw-border-border-subtle">
        <!-- Brand & Mission Column -->
        <div class="tw-flex tw-flex-col tw-gap-4 tw-max-w-[420px]">
          <div class="tw-flex tw-items-center tw-gap-3">
            <div class="tw-flex tw-items-center tw-justify-center tw-w-9 tw-h-9 tw-rounded-xl tw-text-[#07080b] tw-bg-gradient-to-br tw-from-primary-amber tw-to-[#ff8a00] tw-shadow-[0_4px_16px_rgba(229,169,60,0.3)]">
              <svg
                class="tw-ml-0.5"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.2"
                stroke-linecap="round"
                stroke-linejoin="round">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </div>
            <div class="tw-flex tw-items-baseline tw-gap-1.5">
              <span class="tw-font-display tw-text-[1.8rem] tw-font-black -tw-tracking-wider tw-text-white tw-uppercase">CINEPULSE</span>
              <span class="tw-text-[1rem] tw-font-extrabold tw-tracking-widest tw-text-primary-amber tw-bg-[rgba(229,169,60,0.12)] tw-border tw-border-[rgba(229,169,60,0.3)] tw-px-1.5 tw-py-0.5 tw-rounded">STUDIO</span>
            </div>
          </div>
          <p class="tw-m-0 tw-text-[1.35rem] tw-leading-relaxed tw-text-text-muted">
            Next-generation cinematic discovery engine. Curated filmography, TV
            series tracking, and actor credits powered by The Movie Database.
          </p>
        </div>

        <!-- Links Columns Grid -->
        <div class="tw-flex-1 tw-grid tw-grid-cols-2 md:tw-grid-cols-4 tw-gap-8 lg:tw-gap-10">
          <div class="tw-flex tw-flex-col tw-gap-3.5">
            <h4 class="tw-m-0 tw-text-[1.2rem] tw-font-bold tw-tracking-widest tw-uppercase tw-text-text-primary">
              Cinema
            </h4>
            <ul class="tw-flex tw-flex-col tw-gap-2.5 tw-list-none tw-m-0 tw-p-0 tw-text-[1.3rem] tw-text-text-muted [&_a]:tw-text-text-muted hover:[&_a]:tw-text-primary-amber [&_a]:tw-transition-colors [&_a]:tw-duration-200">
              <li>
                <nuxt-link
                  :to="{
                    name: 'movie-category-name',
                    params: { name: 'popular' },
                  }">
                  Popular Films
                </nuxt-link>
              </li>
              <li>
                <nuxt-link
                  :to="{
                    name: 'movie-category-name',
                    params: { name: 'top_rated' },
                  }">
                  Top Rated Masterpieces
                </nuxt-link>
              </li>
              <li>
                <nuxt-link
                  :to="{
                    name: 'movie-category-name',
                    params: { name: 'upcoming' },
                  }">
                  Upcoming Releases
                </nuxt-link>
              </li>
              <li>
                <nuxt-link
                  :to="{
                    name: 'movie-category-name',
                    params: { name: 'now_playing' },
                  }">
                  Now in Theatres
                </nuxt-link>
              </li>
            </ul>
          </div>

          <div class="tw-flex tw-flex-col tw-gap-3.5">
            <h4 class="tw-m-0 tw-text-[1.2rem] tw-font-bold tw-tracking-widest tw-uppercase tw-text-text-primary">
              Television
            </h4>
            <ul class="tw-flex tw-flex-col tw-gap-2.5 tw-list-none tw-m-0 tw-p-0 tw-text-[1.3rem] tw-text-text-muted [&_a]:tw-text-text-muted hover:[&_a]:tw-text-primary-amber [&_a]:tw-transition-colors [&_a]:tw-duration-200">
              <li>
                <nuxt-link
                  :to="{
                    name: 'tv-category-name',
                    params: { name: 'popular' },
                  }">
                  Popular Series
                </nuxt-link>
              </li>
              <li>
                <nuxt-link
                  :to="{
                    name: 'tv-category-name',
                    params: { name: 'top_rated' },
                  }">
                  Top Rated Shows
                </nuxt-link>
              </li>
              <li>
                <nuxt-link
                  :to="{
                    name: 'tv-category-name',
                    params: { name: 'on_the_air' },
                  }">
                  Currently Airing
                </nuxt-link>
              </li>
              <li>
                <nuxt-link
                  :to="{
                    name: 'tv-category-name',
                    params: { name: 'airing_today' },
                  }">
                  New Episodes Today
                </nuxt-link>
              </li>
            </ul>
          </div>

          <div class="tw-flex tw-flex-col tw-gap-3.5">
            <h4 class="tw-m-0 tw-text-[1.2rem] tw-font-bold tw-tracking-widest tw-uppercase tw-text-text-primary">
              Genres
            </h4>
            <ul class="tw-flex tw-flex-col tw-gap-2.5 tw-list-none tw-m-0 tw-p-0 tw-text-[1.3rem] tw-text-text-muted [&_a]:tw-text-text-muted hover:[&_a]:tw-text-primary-amber [&_a]:tw-transition-colors [&_a]:tw-duration-200">
              <li>
                <nuxt-link to="/genre/28/movie">
                  Action
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/genre/878/movie">
                  Sci-Fi
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/genre/18/movie">
                  Drama
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/genre/53/movie">
                  Thriller
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/genre/16/movie">
                  Animation
                </nuxt-link>
              </li>
            </ul>
          </div>

          <div class="tw-flex tw-flex-col tw-gap-3.5">
            <h4 class="tw-m-0 tw-text-[1.2rem] tw-font-bold tw-tracking-widest tw-uppercase tw-text-text-primary">
              Data &amp; Integrity
            </h4>
            <p class="tw-m-0 tw-text-[1.25rem] tw-leading-relaxed tw-text-text-muted [&_a]:tw-text-primary-amber [&_a]:tw-underline">
              Film metadata and artwork provided by
              <a
                href="https://www.themoviedb.org/"
                target="_blank"
                rel="noopener">The Movie Database (TMDb)</a>. This product uses the TMDb API but is not certified or
              endorsed by TMDb.
            </p>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="tw-flex tw-flex-col sm:tw-flex-row sm:tw-items-center sm:tw-justify-between tw-gap-4 tw-pt-6 tw-text-[1.2rem] tw-text-text-subtle">
        <div class="tw-text-[1.2rem] tw-leading-relaxed">
          &copy; {{ new Date().getFullYear() }} CINEPULSE STUDIO. All film
          posters and artwork remain property of their respective copyright
          holders.
        </div>

        <div class="tw-flex tw-items-center tw-gap-3">
          <a
            href="https://github.com/designer-darshil/moviedb"
            target="_blank"
            rel="noopener"
            aria-label="GitHub Repository"
            class="tw-flex tw-items-center tw-justify-center tw-w-9 tw-h-9 tw-rounded-full tw-text-text-muted hover:tw-text-white hover:tw-bg-surface-3 tw-transition-colors tw-duration-200">
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
