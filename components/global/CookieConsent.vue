<template>
  <div
    v-if="isOpen"
    class="relative z-[80] text-[1.35rem] leading-normal text-text-primary bg-surface-1 border-b border-border-subtle p-5 sm:px-8 sm:py-3.5 sm:flex sm:items-center sm:justify-between shadow-cinema-sm"
  >
    <p class="m-0 sm:mr-8 text-text-secondary">
      We use cookies and analytical technologies to enhance your cinematic
      discovery experience on our platform. By continuing, you agree to our
      standard operating policies.
    </p>

    <div class="flex items-center gap-2.5 mt-3 sm:mt-0 shrink-0">
      <button
        v-ripple
        class="px-4 py-2 text-[1.3rem] font-semibold text-text-muted bg-surface-2 border border-border-subtle rounded-xl hover:text-text-primary hover:bg-surface-3 cursor-pointer transition-colors duration-150 outline-none focus-visible:ring-2 focus-visible:ring-primary-amber"
        type="button"
        aria-label="Decline cookies"
        @click="decline"
      >
        Decline
      </button>

      <button
        v-ripple
        class="px-5 py-2 text-[1.3rem] font-bold text-[#07080b] bg-primary-amber hover:bg-primary-hover active:bg-primary-active rounded-xl shadow-cinema-sm cursor-pointer transition-colors duration-150 outline-none focus-visible:ring-2 focus-visible:ring-primary-amber"
        type="button"
        aria-label="Accept cookies"
        @click="accept"
      >
        Accept
      </button>
    </div>
  </div>
</template>

<script>
import { get, set } from 'tiny-cookie';
import { supportsLocalStorage } from '~/mixins/Functions';

export default {
  data() {
    return {
      isOpen: false,
      storageName: 'cookieconsent',
    };
  },

  mounted() {
    if (!this.getVisited()) {
      this.isOpen = true;
    }
  },

  methods: {
    getVisited() {
      if (supportsLocalStorage()) {
        return localStorage.getItem(this.storageName);
      } else {
        return get(this.storageName);
      }
    },

    setAccepted() {
      if (supportsLocalStorage()) {
        localStorage.setItem(this.storageName, 'accepted');
      } else {
        set(this.storageName, 'accepted');
      }
    },

    setDeclined() {
      if (supportsLocalStorage()) {
        localStorage.setItem(this.storageName, 'declined');
      } else {
        set(this.storageName, 'declined');
      }
    },

    accept() {
      this.setAccepted();
      this.isOpen = false;
    },

    decline() {
      this.setDeclined();
      this.isOpen = false;
    },
  },
};
</script>
