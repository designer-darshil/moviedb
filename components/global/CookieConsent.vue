<template>
  <div
    v-if="isOpen"
    class="tw-relative tw-z-[80] tw-text-[1.35rem] tw-leading-normal tw-text-text-primary tw-bg-surface-1 tw-border-b tw-border-border-subtle tw-p-5 sm:tw-px-8 sm:tw-py-3.5 sm:tw-flex sm:tw-items-center sm:tw-justify-between">
    <p class="tw-m-0 sm:tw-mr-8">
      We use cookies and other tracking technologies to improve your browsing
      experience on our website. By using our website, you consent to our use of
      cookies and other tracking technologies.
      <a
        target="_blank"
        href="https://jason.codes/cookie-policy"
        rel="noopener"
        class="tw-text-primary-amber tw-underline hover:tw-text-[#f5c065]">Find out more</a>.
    </p>

    <div class="tw-flex tw-items-center tw-gap-2.5 tw-mt-3 sm:tw-mt-0 tw-shrink-0">
      <button
        class="tw-px-4.5 tw-py-2 tw-text-[1.3rem] tw-font-semibold tw-text-text-primary tw-bg-surface-2 tw-border tw-border-border-subtle tw-rounded hover:tw-bg-surface-3 hover:tw-border-border-medium tw-cursor-pointer tw-transition-colors tw-duration-200"
        type="button"
        aria-label="Decline cookies"
        @click="decline">
        Decline
      </button>

      <button
        class="tw-px-4.5 tw-py-2 tw-text-[1.3rem] tw-font-bold tw-text-[#0a0b0e] tw-bg-primary-amber hover:tw-bg-[#f5c065] tw-rounded tw-cursor-pointer tw-transition-colors tw-duration-200"
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
