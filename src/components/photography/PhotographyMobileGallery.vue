<template>
  <div class="photo-gallery" :class="{ loading }">
    <div v-for="(photo, i) in activePhotos" :key="i" class="photo-gallery__thumbnail">
      <router-link
        tag="a"
        :to="`/photography/${photo.id}`"
        :id="photo.id"
        class="photo-gallery__link"
        :class="`delay-${i} ${photo.aspect}`"
        :aria-label="`Open photo ${photo.name}`"
      >
        <photo
          class="photo-gallery__img"
          :id="`photo-${photo.id}`"
          :pageWidth="width"
          :height="photo.height"
          :width="photo.width"
          :src="photo.urls.Large.source"
          :placeholder="photo.urls.Small.source"
          :alt="photo.name"
          :aspect="photo.aspect"
        />
      </router-link>
    </div>
  </div>
</template>

<script>
import photos from '@/assets/photos'
import Photo from '@/components/Photo'

export default {
  name: 'photography-mobile-gallery',
  components: { Photo },
  props: ['loading', 'pageKey', 'width'],
  data() {
    return {
      activePhotos: [],
      positions: [],
      pageStyle: {},
    }
  },
  methods: {
    filterPhotos() {
      let activePhotos = clone(photos)
      if (this.$route.query.tag) {
        activePhotos = activePhotos.filter((photo) => photo.tags.includes(this.$route.query.tag))
      }
      this.activePhotos = activePhotos
    },
  },
  watch: {
    pageKey: {
      handler: 'filterPhotos',
      immediate: true,
    },
  },
}
function clone(obj) {
  return JSON.parse(JSON.stringify(obj))
}
</script>

<style lang="scss">
@import '@/styles/component';

@keyframes loading {
  0% {
    opacity: 1;
  }
  40% {
    opacity: 0;
  }
  60% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.photo-gallery {
  position: relative;
  display: block;
  display: flex;
  flex-direction: column;

  &__thumbnail {
    position: relative;
    display: inline-block;
    overflow: hidden;
    opacity: 1;
    background-color: #eeeff2;

    &:hover {
      .photo-gallery {
        &__img {
          transform: scale(1.025);
          box-shadow: 0 0 0 -2px var(--c-blue);
        }
      }
    }
    &:active {
      .photo-gallery {
        &__img {
          transform: scale(1);
          box-shadow: 0 0 0 -2px var(--c-blue);
        }
      }
    }
  }
  &__link {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
  }
  &__img {
    position: relative;
    width: auto;
    height: 100%;
    transition: transform 0.35s ease, opacity 1s ease;
    opacity: 1;
    position: relative;
    grid-column: unset !important;
    grid-row: unset !important;
    max-height: unset !important;
    max-width: unset !important;
    width: 100% !important;
    height: auto !important;
    margin-bottom: 0;

    .progressive-image-wrapper {
      padding: 0 !important;
    }
    .progressive-image-main {
      position: relative;
    }
  }
}
@keyframes down {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
