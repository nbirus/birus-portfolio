<template>
  <div
    class="nb-sidebar"
    :class="[{ open: value }, $darkClass]"
    @click.self="$emit('input', false)"
  >
    <nav class="nb-sidebar__container">
      <div class="nb-sidebar__header">
        <button class="btn btn-thumb" @click="$emit('input', false)">
          <i class="material-icons">close</i>
        </button>
        <!-- <button class="nb-sidebar__dark-mode btn btn-icon-circle flat nb" @click="$dark = !$dark">
          <i class="material-icons">{{ !$dark ? 'brightness_low' : 'brightness_high' }}</i>
        </button>-->
      </div>
      <div class="nb-sidebar__links">
        <router-link class="nb-sidebar__link" to="/" exact>Home</router-link>
        <router-link class="nb-sidebar__link" to="photography">Photography</router-link>
        <router-link class="nb-sidebar__link" to="design">Projects</router-link>
        <a
          href="#"
          @click.prevent="$contactDialog = true"
          class="nb-sidebar__link"
          to="contact"
        >Contact me</a>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'side-bar',
  props: ['value'],
}
</script>

<style lang="scss" scoped>
@media only screen and (min-width: 768px) {
  .nb-sidebar {
    display: none;
  }
}
.nb-sidebar {
  &:before {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    opacity: 0;
    will-change: opacity;
    transition: opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  }
  &__container {
    position: relative;
    width: 90%;
    width: 268px;
    background-color: #fff;
    height: 100%;
    box-shadow: none;
    right: -100vw;
    display: flex;
    flex-direction: column;
    will-change: transform, box-shadow;
    transition: transform 0.25s ease-in-out, box-shadow 0.25s ease-in-out;
  }
  &__header {
    padding: 1rem;
    border-bottom: solid thin var(--c-border);
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: var(--header-height);
  }
  &__dark-mode i {
    font-size: 1.75rem !important;
  }
  &__links {
    display: flex;
    flex-direction: column;
  }
  &__link {
    padding: 1.5rem 1.75rem;
    color: var(--c-text-light);
    text-transform: uppercase;
    text-decoration: none;
    font-weight: var(--thin);
    font-size: 0.95rem;

    display: flex;
    align-items: center;

    &.router-link-active {
      color: var(--c-text);
      font-weight: var(--bold);
      text-decoration: none;
    }
    &:not(:last-child) {
      border-bottom: solid thin var(--c-border);
    }
    &:hover:not(.router-link-active) {
      color: var(--c-link);
    }
  }
}
.open {
  pointer-events: auto;

  &.nb-sidebar:before {
    opacity: 1;
  }
  .nb-sidebar {
    &__container {
      transform: translateX(-268px);
      box-shadow: 2px 0 12px rgba(0, 0, 0, 0.4);
    }
  }
}
.dark {
  .nb-sidebar {
    &__container {
      background-color: var(--c-dark);
    }
    &__header {
      border-color: var(--c-border-dm);
    }
    &__link {
      border-color: var(--c-border-dm);
      color: var(--c-text-light-dm);
      &.router-link-exact-active {
        color: var(--c-text-dm);
      }
    }
  }
}
</style>
