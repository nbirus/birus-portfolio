<template>
  <div class="page photography-page" :class="pageClass">
    <!-- banner -->
    <!-- <div class="page__banner">
      <div class="overlay"></div>
      <img :src="tag.srcLrg" :alt="tag.label" />
    </div>-->

    <!-- header -->
    <!-- <div class="page__header" v-if="tagActive">
      <div class="page__title-container">
        <transition name="title" mode="out-in">
          <div class="title text" v-if="!tagActive" key="title">
            <h1>Photography</h1>
          </div>
          <div class="tag-title text" v-else key="tag">
            <h5 class="thin">Photography</h5>
            <h1 v-text="tag.label"></h1>
          </div>
        </transition>
      </div>
      <div class="page__buttons-container">
        <router-link tag="button" class="btn btn-back with-icon" to="photography" v-if="tagActive">
          <i class="material-icons">keyboard_backspace</i>Back to gallery
        </router-link>
        <button class="share-btn btn with-icon mr-2" @click="$shareDialog = true"><i class="material-icons">share</i>Share</button>
      </div>
    </div>-->

    <!-- <div class="page__title-container" :class="{open: tag.label}">
      <transition name="title" mode="out-in">
        <div class="tag-title text" v-if="tag.label" :key="pageKey">
          <h1 class="mr-1" v-text="tag.label || ''"></h1>
          <h6 class="thin text-secondary" v-text="`${tag.count} photos`"></h6>
        </div>
      </transition>
    </div>-->

    <!-- slider -->
    <div class="page__slider" v-if="!hideTags">
      <photography-tag-slider :width="width$" @tag="scrollToTop" />
    </div>

    <!-- gallery -->
    <div class="page__gallery">
      <photography-gallery :key="pageKey" :pageKey="pageKey" />
    </div>

    <!-- photo -->
    <div class="page__photo-overlay">
      <router-view :key="$route.params.id !== undefined" />
    </div>

    <transition name="snackbar" mode="out-in">
      <div class="snackbar" v-if="tag.label">
        <div class="snackbar__container">
          <div class="snackbar__text">
            <span>
              Filtering by
              <strong class="mr-1">{{tag.label}}</strong>
            </span>
            <span class="body-2 text-secondary">{{tag.count}} photos</span>
          </div>
          <router-link tag="button" :to="{ path: 'photography' }" class="btn btn-clear">CLEAR</router-link>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import WidthMixin from '@/mixins/WidthMixin'
import tags from '@/assets/tags.json'
import Spinner from '@/components/Spinner'

let snackbarTimeout = null

export default {
  name: 'photography-page',
  mixins: [WidthMixin],
  components: {
    Spinner,
    PhotographyTagSlider: () => import('@/components/photography/PhotographyTagSlider'),
    PhotographyGallery: () => import('@/components/photography/PhotographyGallery'),
  },
  data() {
    return {
      hideTags: false,
      scrollY: 0,
      pageKey: 0,
      tag: {},
      snackbar: {
        show: false,
        message: '',
      },
      loading: false,
    }
  },
  computed: {
    pageClass() {
      return {
        'tag-active': this.tagActive,
        'photo-active': this.$route.params.id,
      }
    },
    tagActive() {
      return !!this.tag.id && !this.hideTags
    },
  },
  methods: {
    setTag() {
      this.tag = tags.find(t => t.id === this.$route.query.tag) || {}
    },
    scrollToTop() {
      this.$nextTick(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      })
    },
  },
  watch: {
    $route(to, from) {
      if (to.params.id === undefined) {
        this.setTag()
      }
      if (to.name === 'photography' && from.name !== 'photo') {
        this.pageKey++
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.page {
  padding: 0;
  max-width: var(--max-width);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  overflow-y: hidden;

  &__title-container {
    display: flex;
    align-items: flex-start;
    padding: 2rem 4.5rem 0;
    height: 0;
    transition: height 0.5s ease;
    overflow: hidden;

    .tag-title {
      display: flex;
      align-items: flex-end;
    }

    &.open {
      height: 130px;
    }
  }
  &__buttons-container {
    display: flex;
    align-items: center;

    .btn-back {
      margin-right: 0.75rem;
    }
  }
  &__slider {
    margin: 2rem 0;
  }
  &__gallery {
    padding: 0 4rem;
    position: relative;
  }
}
.snackbar {
  position: fixed;
  bottom: 2rem;
  display: flex;
  justify-content: center;
  z-index: 9;
  width: 100%;

  &__container {
    width: auto;
    background-color: black;
    box-shadow: 0 2px 1rem fade-out(black, 0.7);
    padding: 1rem 1.5rem;
    border-radius: 0.5rem;
    color: white;
    display: flex;
    align-items: center;
  }
  &__text {
    margin-right: 3rem;
  }
  .btn-clear {
    background-color: lighten(black, 5);
    color: white;
    border: none;
    font-size: 0.8rem;
    border-radius: 0.4rem;

    padding: 0.75rem 1rem;

    &:hover {
      background-color: lighten(black, 15);
    }
  }
  .text-secondary {
    font-size: 0.9rem;
  }
}
.photo-active {
  .page {
    &__photo-overlay {
      z-index: 999;
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      pointer-events: all;
    }
  }
}

@media only screen and (max-width: 768px) {
  .page {
    &__banner {
      height: 0px;
    }
    &__header {
      padding: 2rem 1rem 1.5rem;
      margin-bottom: 0;
      flex-direction: column;
      align-items: flex-start;

      h1 {
        font-size: 2.5rem;
      }
    }
    &__title-container {
      order: 2;
    }
    &__buttons-container {
      justify-content: flex-end;
      order: 1;
      margin-bottom: 1rem;
      width: 100%;
    }
    &__slider {
      // padding: 0;
      margin: 1rem 0 1.5rem;
    }
    &__gallery {
      padding: 0;
      overflow-x: hidden;
    }
  }
  .tag-active {
    .page {
      &__banner {
        height: 150px;
      }
      &__header {
        padding-bottom: 2rem;
      }
      &__buttons-container {
        justify-content: flex-start;
        margin-bottom: 2rem;
      }
    }
  }
  .snackbar {
    bottom: 0rem;

    &__container {
      border-radius: 0;
      font-size: 0.9rem;
      width: 100%;
      display: flex;
      align-items: center;
    }
    &__text {
      flex: 0 1 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin: 0;

      .text-secondary {
        margin-top: 0.5rem;
        font-size: 0.8rem;
      }
    }
    .btn-clear {
      flex: 0 1 auto;
      border-radius: 0.3rem;
      padding: 0.75rem 1.25rem;
    }
  }
}
</style>
