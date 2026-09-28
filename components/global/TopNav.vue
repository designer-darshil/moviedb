<template>
  <nav :class="$style.nav" aria-label="Top Navigation">
    <button
      type="button"
      aria-label="Go Back"
      :class="$style.backButton"
      @click="$router.go(-1)">
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round">
        <polyline points="15 18 9 12 15 6" />
      </svg>
    </button>

    <h2 :class="$style.text">
      {{ title }}
    </h2>
  </nav>
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
@import "~/assets/css/utilities/_variables.scss";

@media (max-width: $breakpoint-medium - 1) {
  .topnav-active {
    padding-top: 5.6rem;
  }
}
</style>

<style lang="scss" module>
@import "~/assets/css/utilities/_variables.scss";

.nav {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 5.4rem;
  padding: 0 5.6rem;
  background-color: rgba(10, 11, 14, 0.88);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid $border-subtle;

  @media (min-width: $breakpoint-medium) {
    display: none;
  }
}

.text {
  margin: 0;
  overflow: hidden;
  font-size: 1.5rem;
  font-weight: 600;
  color: $text-primary;
  text-overflow: ellipsis;
  white-space: nowrap;
  letter-spacing: -0.01em;
}

.backButton {
  position: absolute;
  top: 50%;
  left: 1.2rem;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.6rem;
  height: 3.6rem;
  padding: 0;
  color: $text-primary;
  background-color: $surface-2;
  border: 1px solid $border-subtle;
  border-radius: $radius-full;
  cursor: pointer;
  transition: all $transition-fast;

  &:hover {
    color: #fff;
    background-color: $surface-3;
    border-color: $border-medium;
  }

  &:focus-visible {
    outline: 2px solid $primary-color;
  }
}
</style>
