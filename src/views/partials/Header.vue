<template>
  <div class="nb-header" role="navigation" :class="[$darkClass, shadow && 'shadow']">
    <button class="btn btn-thumb nb-header__menu" @click="$emit('side-bar')" type="button">
      <i class="material-icons">menu</i>
    </button>
    <transition name="fade" mode="out-in" appear>
      <div class="nb-header__logo" v-if="$route.name !== 'home'">nbirus</div>
    </transition>
    <div class="nb-header__middle">
      <!-- <div>Landscapes</div> -->
    </div>
    <div class="nb-header__links">
      <router-link class="nb-header__link" to="/" exact>Home</router-link>
      <router-link class="nb-header__link" to="design">Projects</router-link>
      <!-- <router-link class="nb-header__link" to="music">Music</router-link> -->
      <router-link class="nb-header__link" to="photography">Photography</router-link>
      <a
        href="#"
        @click.prevent="$contactDialog = true"
        class="nb-header__link"
        to="contact"
      >Contact me</a>
    </div>
    <button class="nb-header__dark-mode btn btn-thumb" @click="$dark = !$dark" v-if="false">
      <i class="material-icons">{{ !$dark ? 'brightness_low' : 'brightness_high' }}</i>
    </button>
  </div>
</template>

<script>
import ScrollMixin from '@/mixins/ScrollMixin'

export default {
  name: 'header-bar',
  mixins: [ScrollMixin],
  computed: {
    shadow() {
      return this.scroll$ > 32
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/component';

.nb-header {
  background: fade-out(#fff, 0.05);
  padding: 0 4rem 0.5rem 2rem;
  transition: box-shadow 1s ease;

  &:not(.shadow) {
    border-bottom: solid thin var(--c-border);
  }
  &.shadow {
    box-shadow: 0 1px 3px 0 rgba(60, 64, 67, 0.1), 0 2px 14px 2px rgba(60, 64, 67, 0.2);
  }

  &__logo {
    font-weight: var(--bold);
    font-size: 1.85rem;
    margin-bottom: -0.5rem;
    font-family: 'Permanent Marker', cursive;
  }
  &__menu {
    display: none !important;
  }
  &__middle {
    flex-grow: 1;
    font-size: 1.25rem;
    // font-weight: 900;
    padding: 1rem 4.5rem 0;

    div {
      padding: 0.5rem 1.5rem;
      border-left: solid thin var(--c-grey3);
    }
  }
  &__links {
    display: flex;
    align-items: center;
    padding-top: 0.5rem;
  }
  &__link {
    color: var(--c-text-light);
    text-transform: uppercase;
    text-decoration: none !important;
    font-weight: var(--thin);
    font-size: 1rem;
    text-decoration: underline;
    opacity: 0.75;
    letter-spacing: 1px;

    display: flex;
    align-items: center;

    &:after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: -2px;
      right: -2px;
      height: 1px;
      border-radius: 25px;
      z-index: -1;
    }

    &.router-link-active {
      color: var(--c-text);
      font-weight: var(--bold);
      text-decoration: none;
      opacity: 1;
      cursor: default;
      position: relative;
    }
    &:not(:last-child) {
      margin-right: 2.5rem;
    }
    &:hover:not(.router-link-active) {
      color: var(--c-link);
      opacity: 1;
      position: relative;

      // &:after {
      //   background-color: #2296f3;
      //   animation: under 0.3s ease;
      // }
    }
  }
  &__dark-mode {
    margin-left: 1.5rem;
    border-radius: 50%;
    width: 40px !important;
    height: 40px !important;
    padding-top: 0.4rem;
    transition: background-color 0.1s ease, box-shadow 0.2s ease;
    outline: none;

    i {
      font-size: 1.15rem !important;
    }

    &:hover {
      background-color: var(--c-grey1);
    }
    &:active,
    &:focus {
      background-color: var(--c-grey2);
      @include active-shadow;
    }
  }
}

// dark mode
.dark {
  background-color: var(--c-dark);

  .nb-header {
    border-bottom: solid thin var(--c-border-dm);
    &__logo {
      // filter: invert(1);
    }
    &__link {
      color: var(--c-text-light-dm);

      &.router-link-exact-active {
        color: var(--c-text-dm);
      }
    }
  }
}

// phone
@media only screen and (max-width: 768px) {
  .nb-header {
    padding: 0 1.5rem 0 1rem;

    &__menu {
      display: flex !important;
    }
    &__links {
      display: none;
    }
    .nb-header__dark-mode {
      display: none !important;
    }
    &__logo {
      width: 100%;
      text-align: right;
    }
  }
}

@keyframes under {
  0% {
    width: 0%;
  }
  100% {
    width: 100%;
  }
}
</style>
