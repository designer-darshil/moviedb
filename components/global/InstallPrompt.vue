<template>
  <div
    v-if="isOpen"
    class="relative z-[80] text-[1.35rem] leading-normal text-text-primary bg-surface-1 border-b border-border-subtle flex">
    <p class="flex-1 m-0 px-5 py-3.5">
      Do you want to
      <a
        href="#"
        class="text-primary-amber underline hover:text-[#f5c065]"
        @click.prevent="install">add this app to your home screen?</a>
    </p>

    <button
      class="flex shrink-0 items-center justify-center px-5 bg-transparent border-0 border-l border-border-subtle text-text-muted hover:text-white cursor-pointer transition-colors duration-200"
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
