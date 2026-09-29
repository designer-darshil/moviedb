<template>
  <div
    v-if="isOpen"
    class="tw-relative tw-z-[80] tw-text-[1.35rem] tw-leading-normal tw-text-text-primary tw-bg-surface-1 tw-border-b tw-border-border-subtle tw-flex">
    <p class="tw-flex-1 tw-m-0 tw-px-5 tw-py-3.5">
      Do you want to
      <a
        href="#"
        class="tw-text-primary-amber tw-underline hover:tw-text-[#f5c065]"
        @click.prevent="install">add this app to your home screen?</a>
    </p>

    <button
      class="tw-flex tw-shrink-0 tw-items-center tw-justify-center tw-px-5 tw-bg-transparent tw-border-0 tw-border-l tw-border-border-subtle tw-text-text-muted hover:tw-text-white tw-cursor-pointer tw-transition-colors tw-duration-200"
      type="button"
      aria-label="Close"
      @click="close">
      <!-- eslint-disable-next-line -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="15"
        height="15"
        viewBox="0 0 15 15">
        <g
          fill="none"
          stroke="#fff"
          stroke-linecap="round"
          stroke-miterlimit="10"
          stroke-width="1.5">
          <path d="M.75.75l13.5 13.5M14.25.75L.75 14.25" />
        </g>
      </svg>
    </button>
  </div>
</template>

<script>
import { get, set } from 'tiny-cookie';
import { supportsLocalStorage } from '~/mixins/Functions';

let installEvent;

export default {
  data () {
    return {
      isOpen: false,
      storageName: 'installprompt',
    };
  },

  mounted () {
    window.addEventListener('beforeinstallprompt', (event) => {
      event.preventDefault();

      if (!this.getVisited()) {
        installEvent = event;
        this.isOpen = true;
      }
    });
  },

  methods: {
    setVisited () {
      if (supportsLocalStorage()) {
        localStorage.setItem(this.storageName, true);
      } else {
        set(this.storageName, true);
      }
    },

    getVisited () {
      if (supportsLocalStorage()) {
        return localStorage.getItem(this.storageName);
      } else {
        return get(this.storageName);
      }
    },

    close () {
      this.setVisited();
      this.isOpen = false;
      installEvent = null;
    },

    install () {
      this.isOpen = false;
      installEvent.prompt();

      installEvent.userChoice.then((choice) => {
        if (choice.outcome !== 'accepted') {
          this.setVisited();
        }

        installEvent = null;
      });
    },
  },
};
</script>
