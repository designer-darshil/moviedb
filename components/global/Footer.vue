<template>
  <footer class="relative w-full bg-surface-1 border-t border-border-subtle mt-24 sm:mt-32 pb-24 md:pb-10">
    <div class="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 pt-14 sm:pt-18">
      <div class="flex flex-col lg:flex-row gap-12 lg:gap-16 pb-12 sm:pb-16 border-b border-border-subtle">
        <!-- Brand & Mission Column -->
        <div class="flex flex-col gap-4 max-w-[420px]">
          <div class="flex items-center gap-3">
            <div class="flex items-center justify-center w-9 h-9 rounded-xl text-[#07080b] bg-gradient-to-br from-primary-amber to-[#ff8a00] shadow-[0_4px_16px_rgba(229,169,60,0.3)]">
              <svg
                class="ml-0.5"
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
            <div class="flex items-baseline gap-1.5">
              <span class="font-display text-[1.8rem] font-black -tracking-wider text-white uppercase">CINEPULSE</span>
              <span class="text-[1rem] font-extrabold tracking-widest text-primary-amber bg-[rgba(229,169,60,0.12)] border border-[rgba(229,169,60,0.3)] px-1.5 py-0.5 rounded">STUDIO</span>
            </div>
          </div>
          <p class="m-0 text-[1.35rem] leading-relaxed text-text-muted">
            Next-generation cinematic discovery engine. Curated filmography, TV
            series tracking, and actor credits powered by The Movie Database.
          </p>
        </div>

        <!-- Links Columns Grid -->
        <div class="flex-1 grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-10">
          <div class="flex flex-col gap-3.5">
            <h4 class="m-0 text-[1.2rem] font-bold tracking-widest uppercase text-text-primary">
              Cinema
            </h4>
            <ul class="flex flex-col gap-2.5 list-none m-0 p-0 text-[1.3rem] text-text-muted [&_a]:text-text-muted hover:[&_a]:text-primary-amber [&_a]:transition-colors [&_a]:duration-200">
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

          <div class="flex flex-col gap-3.5">
            <h4 class="m-0 text-[1.2rem] font-bold tracking-widest uppercase text-text-primary">
              Television
            </h4>
            <ul class="flex flex-col gap-2.5 list-none m-0 p-0 text-[1.3rem] text-text-muted [&_a]:text-text-muted hover:[&_a]:text-primary-amber [&_a]:transition-colors [&_a]:duration-200">
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

          <div class="flex flex-col gap-3.5">
            <h4 class="m-0 text-[1.2rem] font-bold tracking-widest uppercase text-text-primary">
              Genres
            </h4>
            <ul class="flex flex-col gap-2.5 list-none m-0 p-0 text-[1.3rem] text-text-muted [&_a]:text-text-muted hover:[&_a]:text-primary-amber [&_a]:transition-colors [&_a]:duration-200">
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

          <div class="flex flex-col gap-3.5">
            <h4 class="m-0 text-[1.2rem] font-bold tracking-widest uppercase text-text-primary">
              Data &amp; Integrity
            </h4>
            <p class="m-0 text-[1.25rem] leading-relaxed text-text-muted [&_a]:text-primary-amber [&_a]:underline">
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
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-6 text-[1.2rem] text-text-subtle">
        <div class="text-[1.2rem] leading-relaxed">
          &copy; {{ new Date().getFullYear() }} CINEPULSE STUDIO. All film
          posters and artwork remain property of their respective copyright
          holders.
        </div>

        <div class="flex items-center gap-3">
          <a
            href="https://github.com/designer-darshil/moviedb"
            target="_blank"
            rel="noopener"
            aria-label="GitHub Repository"
            class="flex items-center justify-center w-9 h-9 rounded-full text-text-muted hover:text-white hover:bg-surface-3 transition-colors duration-200">
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
