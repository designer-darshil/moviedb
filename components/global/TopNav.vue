<template>
  <header :class="$style.nav">
    <button
      type="button"
      aria-label="Go Back"
      :class="$style.button"
      @click="$router.go(-1)">
      <span :class="$style.buttonIcon">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </span>
    </button>

    <h1 :class="$style.text">
      {{ title }}
    </h1>
  </header>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss">
@import '~/assets/css/utilities/_variables.scss';

@media (max-width: $breakpoint-large - 1) {
  .topnav-active {
    padding-top: 5rem;
  }
}
</style>

<style lang="scss" module>
@import '~/assets/css/utilities/_variables.scss';

.nav {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 90;
  display: flex;
  align-items: center;
  height: 5rem;
  padding: 0 1.6rem 0 5.4rem;
  background-color: rgba(11, 12, 14, 0.92);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid $border-subtle;

  @media (min-width: $breakpoint-large) {
    display: none;
  }
}

.text {
  margin: 0;
  overflow: hidden;
  font-size: 1.5rem;
  font-weight: 600;
  color: $text-color;
  text-overflow: ellipsis;
  white-space: nowrap;
  letter-spacing: -0.01em;
}

.button {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 5rem;
  height: 5rem;
  padding: 0;
  margin: 0;
  color: $text-color;
  background: none;
  border: none;
  cursor: pointer;
  transition: color $transition-fast;

  &:hover,
  &:focus-visible {
    color: $primary-color;
  }
}

.buttonIcon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.4rem;
  height: 3.4rem;
  border-radius: $radius-full;
  background-color: rgba(255, 255, 255, 0.05);
  transition: background-color $transition-fast;

  .button:hover & {
    background-color: rgba(255, 255, 255, 0.1);
  }
}
</style>
