<template>
  <div
    v-if="isOpen"
    class="relative z-[80] text-[1.35rem] leading-normal text-text-primary bg-surface-1 border-b border-border-subtle flex items-center justify-between px-5 sm:px-8 py-3.5 shadow-cinema-sm"
  >
    <p class="m-0 text-text-secondary">
      Install CINEPULSE as an app on your device for instant offline access and
      quick discovery:
      <a
        href="#"
        class="text-primary-amber font-semibold underline hover:text-primary-hover ml-1"
        @click.prevent="install"
      >
        Add to Home Screen
      </a>
    </p>

    <button
      class="flex shrink-0 items-center justify-center w-8 h-8 rounded-lg bg-surface-2 text-text-muted hover:text-text-primary hover:bg-surface-3 cursor-pointer transition-colors duration-150"
      type="button"
      aria-label="Close"
      @click="close"
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </button>
  </div>
</template>

<script>
import { get, set } from 'tiny-cookie';
import { supportsLocalStorage } from '~/mixins/Functions';

let installEvent;

export default {
  data() {
    return {
      isOpen: false,
      storageName: 'installprompt',
    };
  },

  mounted() {
    window.addEventListener('beforeinstallprompt', (event) => {
      event.preventDefault();

      if (!this.getVisited()) {
        installEvent = event;
        this.isOpen = true;
      }
    });
  },

  methods: {
    setVisited() {
      if (supportsLocalStorage()) {
        localStorage.setItem(this.storageName, true);
      } else {
        set(this.storageName, true);
      }
    },

    getVisited() {
      if (supportsLocalStorage()) {
        return localStorage.getItem(this.storageName);
      } else {
        return get(this.storageName);
      }
    },

    close() {
      this.setVisited();
      this.isOpen = false;
      installEvent = null;
    },

    install() {
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
