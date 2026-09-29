<template>
  <div
    v-if="isOpen"
    class="relative z-[80] text-[1.35rem] leading-normal text-text-primary bg-surface-1 border-b border-border-subtle p-5 sm:px-8 sm:py-3.5 sm:flex sm:items-center sm:justify-between">
    <p class="m-0 sm:mr-8">
      We use cookies and other tracking technologies to improve your browsing
      experience on our website. By using our website, you consent to our use of
      cookies and other tracking technologies.
      <a
        target="_blank"
        href="https://jason.codes/cookie-policy"
        rel="noopener"
        class="text-primary-amber underline hover:text-[#f5c065]">Find out more</a>.
    </p>

    <div class="flex items-center gap-2.5 mt-3 sm:mt-0 shrink-0">
      <button
        class="px-4.5 py-2 text-[1.3rem] font-semibold text-text-primary bg-surface-2 border border-border-subtle rounded hover:bg-surface-3 hover:border-border-medium cursor-pointer transition-colors duration-200"
        type="button"
        aria-label="Decline cookies"
        @click="decline">
        Decline
      </button>

      <button
        class="px-4.5 py-2 text-[1.3rem] font-bold text-[#0a0b0e] bg-primary-amber hover:bg-[#f5c065] rounded cursor-pointer transition-colors duration-200"
        type="button"
        aria-label="Accept cookies"
        @click="accept">
        Accept
      </button>
    </div>
  </div>
</template>

<script>
import { get, set } from 'tiny-cookie';
import { supportsLocalStorage } from '~/mixins/Functions';

export default {
  data () {
    return {
      isOpen: false,
      storageName: 'cookieconsent',
    };
  },

  mounted () {
    if (!this.getVisited()) {
      this.isOpen = true;
    }
  },

  methods: {
    getVisited () {
      if (supportsLocalStorage()) {
        return localStorage.getItem(this.storageName);
      } else {
        return get(this.storageName);
      }
    },

    setAccepted () {
      if (supportsLocalStorage()) {
        localStorage.setItem(this.storageName, 'accepted');
      } else {
        set(this.storageName, 'accepted');
      }
    },

    setDeclined () {
      if (supportsLocalStorage()) {
        localStorage.setItem(this.storageName, 'declined');
      } else {
        set(this.storageName, 'declined');
      }
    },

    accept () {
      this.setAccepted();
      this.isOpen = false;
    },

    decline () {
      this.setDeclined();
      this.isOpen = false;
    },
  },
};
</script>
