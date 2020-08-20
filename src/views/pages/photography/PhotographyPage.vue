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

    <!-- slider -->
    <div class="page__slider" v-if="!hideTags">
      <photography-tag-slider :width="width$" @tag="scrollToTop" />
    </div>

    <!-- gallery -->
    <div class="page__gallery">
      <photography-gallery :loading="loading" />
    </div>

    <!-- photo -->
    <div class="page__photo-overlay">
      <router-view :key="$route.params.id !== undefined" />
    </div>
  </div>
</template>

<script>
import WidthMixin from '@/mixins/WidthMixin'
import tags from '@/assets/tags.json'
import Spinner from '@/components/Spinner'

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
      tag: {},
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
    pageKey() {
      return this.$route.query.tag
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
    },
    pageKey() {
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 1250)
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

  &__banner {
    height: 0;
    background-color: var(--c-grey1);
    transition: height var(--t) ease;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: relative;

    img {
      width: 100%;
      height: auto;
    }
    .overlay {
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      height: 300px;
      background: rgb(0, 0, 0);
      background: radial-gradient(circle, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.5) 100%);
      z-index: 1;
    }
  }
  &__header {
    padding: 2rem 4rem 0;
    margin-bottom: 3rem;

    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__title-container {
    .tag-title {
      h5 {
        margin-bottom: 0.35rem;
      }
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
    padding: 2rem 4rem;
  }
  &__gallery {
    padding: 0 4rem;
    position: relative;
  }
}
.tag-active {
  .page {
    &__banner {
      height: 300px;
    }
    &__slider {
      margin-bottom: 0;
    }
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
      padding: 0;
      margin-bottom: 2rem;
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
      &__slider {
        margin-bottom: 0;
      }
    }
  }
}
</style>
