<template>
  <div class="page photo-page" @click.self.prevent.stop="close">
    <div class="photo-page__toolbar">
      <div class="photo-page__count">
        <div class="location" v-text="photo.position"></div>
        <div class="name" v-text="`${photoIndex + 1} / ${photoLength}`"></div>
        <!-- <div class="name" v-text="photo.name"></div> -->
      </div>
      <div class="photo-page__actions">
        <!-- <button
					id="info"
					class="btn btn-icon-circle btn-action flat"
					title="More Information"
					@click="infoDialog = true"
				>
					<i class="material-icons small">info</i>
        </button>-->
        <button id="download" class="btn btn-icon-circle btn-action flat" title="Download" @click="download">
          <i class="material-icons small">open_in_new</i>
        </button>
        <button id="close" class="btn btn-icon-circle btn-action flat close" title="Close Image" @click="close">
          <i class="material-icons">close</i>
        </button>
      </div>
    </div>
    <div class="photo-page__main" :class="{ isZoomed, loading }">
      <div class="photo-page__main-img" ref="container">
        <div v-if="isZoomed" class="zoom-message">
          <div class="bar">Zoom is set to <b>300%</b> <button @click="isZoomed = false">Reset</button></div>
        </div>
        <img
          v-if="photo.urls"
          ref="img"
          class="photo-page__img"
          draggable="true"
          :class="photo.aspect"
          :style="imgStyle"
          :src="isZoomed ? photo.urls.Original.source : photo.urls.Large.source"
          :alt="photo.name"
          @click="onZoom"
          @dblclick="onMouseup"
          @load="onImgLoad"
          @mousedown="onMousedown"
          @mousemove="onMouseover"
          @mouseup="onMouseup"
          @mouseleave="onMouseup"
          tabindex="0"
        />
      </div>
    </div>

    <information-dialog v-model="infoDialog" :photo="photo" />
  </div>
</template>

<script>
import Photo from '@/components/Photo'
import { expand, close } from '@/utils/Expand'
import photos from '@/assets/photos'
import WidthMixin from '@/mixins/WidthMixin'
import InformationDialog from '@/views/dialogs/InformationDialog'

export default {
  name: 'photo-page',
  mixins: [WidthMixin],
  components: { InformationDialog, Photo },
  data() {
    return {
      isExpanded: false,
      infoDialog: false,
      isZoomed: false,
      isDragging: false,
      loading: false,
      lastTag: '',
      photo: {},
      photoIndex: 0,
      photosLength: 0,
      width: 0,
      movementX: 0,
      movementY: 0,
      imgWidth: '100%',
      imgHeight: 'auto',
    }
  },
  computed: {
    imgStyle() {
      return {
        width: this.imgWidth,
        height: this.imgHeight,
        maxWidth: `${this.photo.width * 1.5}px`,
        maxHeight: `${this.photo.height * 1.5}px`,
        transform: `translateX(${this.movementX}px) translateY(${this.movementY}px) scale(${this.isZoomed ? '2.75' : '1'})`,
      }
    },
    prevLink() {
      let index = this.photoIndex > 0 ? this.photoIndex - 1 : photos.length - 1
      return `/photography/${photos[index].id}`
    },
    nextLink() {
      let index = this.photoIndex < photos.length - 1 ? this.photoIndex + 1 : 0
      return `/photography/${photos[index].id}`
    },
    photoLength() {
      return photos.length
    },
  },
  mounted() {
    this.getImage()
    this.dOnResize = debounce(this.onResizeEvent, 100)
    this.photosLength = photos.length
    document.addEventListener('keyup', this.onKeydown)
    document.addEventListener('scroll', this.onScroll)
  },
  methods: {
    getImage() {
      let id = this.$route.params.id
      this.photoIndex = photos.findIndex((p) => p.id === id)
      if (this.photoIndex !== -1) {
        this.photo = photos[this.photoIndex]
      } else {
        this.$router.push('/photography')
      }
    },
    open(from) {
      if (from.query) {
        this.lastTag = from.query.tag
      }
    },
    close() {
      if (this.isExpanded) {
        close()
      }
      if (this.lastTag) {
        this.$router.push(`/photography?tag=${this.lastTag}`)
      } else {
        this.$router.push('/photography')
      }
    },
    download() {
      var link = document.createElement('a')
      link.download = 'name.jpg'
      link.href = this.photo.urls.Large.source
      link.target = '_blank'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    },
    onResizeEvent() {
      if (this.width$ <= 768) {
        return
      }
      let maxWidth = this.photo.width
      let maxHeight = this.photo.height
      let cWidth = this.$refs.container.offsetWidth
      let cHeight = this.$refs.container.offsetHeight
      let isStretchingH = maxWidth < cWidth
      let isStretchingV = maxHeight < cHeight

      if (this.photo.aspect === 'v') {
        if (isStretchingV) {
          this.imgWidth = '100%'
          this.imgHeight = 'auto'
        } else {
          this.imgWidth = 'auto'
          this.imgHeight = '100%'
        }
      } else if (this.photo.aspect === 's') {
        if (isStretchingV) {
          this.imgWidth = '100%'
          this.imgHeight = 'auto'
        } else {
          this.imgWidth = 'auto'
          this.imgHeight = '100%'
        }
      } else if (this.photo.aspect === 'h') {
        if (isStretchingH) {
          this.imgWidth = 'auto'
          this.imgHeight = '100%'
        } else {
          this.imgWidth = '100%'
          this.imgHeight = 'auto'
        }
      }
    },
    onScroll(evt) {
      if (!this.isZoomed) {
        this.close()
      }
    },
    onKeydown(evt) {
      if (evt.keyCode === 27) {
        if (this.isZoomed) {
          this.isZoomed = false
        } else {
          this.close()
        }
      }
      if (evt.keyCode === 39) {
        this.$router.push(this.nextLink)
      }
      if (evt.keyCode === 37) {
        this.$router.push(this.prevLink)
      }
    },
    onZoom(event) {
      this.isZoomed = true
    },
    onImgLoad(event) {
      if (this.isZoomed && !this.loading) {
        this.loading = true
      } else if (this.isZoomed && this.loading) {
        this.loading = false
      }
    },
    onMousedown() {
      this.isDragging = this.isZoomed
    },
    onMouseup() {
      this.isDragging = false
    },
    onMouseover(event) {
      event.preventDefault()
      if (this.isDragging) {
        let top = this.photo.height
        let bottom = this.photo.height * -1
        let left = this.photo.width
        let right = this.photo.width * -1

        // moving up
        if (event.movementY > 0 && this.movementY + event.movementY < top) {
          this.movementY += event.movementY
        }
        // moving down
        else if (event.movementY < 0 && this.movementY + event.movementX > bottom) {
          this.movementY += event.movementY
        }
        // moving right
        if (event.movementX < 0 && this.movementX + event.movementX > right) {
          this.movementX += event.movementX
        }
        // moving left
        else if (event.movementX > 0 && this.movementX + event.movementX < left) {
          this.movementX += event.movementX
        }
      }
    },
  },
  watch: {
    $route: 'getImage',
    isZoomed(isZoomed) {
      if (!isZoomed) {
        this.movementX = 0
        this.movementY = 0
      }
    },
    width$(width) {
      this.dOnResize(width)
    },
    isExpanded(isExpanded) {
      if (isExpanded) {
        expand(this.$refs.expand).$el
      } else {
        close()
      }
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.open(from)
    })
  },
  beforeDestroy() {
    document.removeEventListener('keyup', this.onKeydown, false)
    document.removeEventListener('scroll', this.onScroll, false)
  },
}

function debounce(func, wait, immediate) {
  var timeout
  return function () {
    var context = this,
      args = arguments
    var later = function () {
      timeout = null
      if (!immediate) func.apply(context, args)
    }
    var callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(context, args)
  }
}
function calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {
  var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight)
  return { width: srcWidth * ratio, height: srcHeight * ratio }
}
function getOffset(el) {
  var _x = 0
  var _y = 0
  while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
    _x += el.offsetLeft - el.scrollLeft
    _y += el.offsetTop - el.scrollTop
    el = el.offsetParent
  }
  return { top: _y, left: _x }
}
</script>

<style lang="scss" scoped>
@import '@/styles/component';

.photo-page {
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;
  max-width: none;
  cursor: pointer;
  padding-right: 0 !important;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: fade-out(black, 0);
    animation: fade-in 0.2s ease;
  }

  // toolbar
  &__toolbar {
    height: 80px;
    background: fade-out(black, 0.25);
    display: flex;
    align-items: center;
    padding: 0 2rem;
    // animation: slide-down 0.6s ease;

    &:after {
      position: absolute;
      top: 0px;
      right: 0px;
      height: 110px;
      left: 0px;
      content: '';
      background: rgb(0, 0, 0);
      background: linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.75) 100%);
      z-index: 2;
    }
  }
  &__count {
    flex: 0 1 100%;
    color: white;
    z-index: 99999;

    .name {
      font-size: 0.9rem;
      opacity: 0.5;
    }
    .location {
      margin-bottom: 0.5rem;
      font-size: 1rem;
    }
  }
  &__actions {
    flex: 0 0 auto;
    z-index: 99999;
    display: flex;
    align-items: center;

    .btn.btn-action {
      background-color: transparent;
      color: white;
      border: none;
      height: 55px;
      width: 55px;
      margin-left: 0.5rem;

      i {
        font-size: 1.65rem;
      }

      &:hover {
        background-color: fade-out(white, 0.95);
      }
      &:focus,
      &:active {
        background: fade-out(white, 0.9);
      }
      .small {
        font-size: 1.25rem !important;
      }
    }
  }

  // main
  &__main {
    height: calc(100% - 80px);
    position: relative;
    pointer-events: none;
    padding: 0rem 4rem 2rem;
  }
  &__main-img {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    position: relative;
    padding: 0px;
  }
  &__img {
    max-height: 100%;
    max-width: 100%;
    animation: pop-in-sm 0.25s ease;
    pointer-events: auto;
    cursor: zoom-in;
  }

  .zoom-message {
    position: fixed;
    top: 1.5rem;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    z-index: 999999;

    .bar {
      padding: 0.5rem 1.25rem;
      background-color: black;
      border-radius: 25px;
      color: white;
      font-size: 0.9rem;
      pointer-events: auto;
      cursor: default;

      button {
        margin-left: 1rem;
        border: none;
        background-color: fade-out(white, 0.85);
        color: white;
        padding: 0.35rem 0.65rem;
        border-radius: 3px;
        cursor: pointer;
      }
    }
  }

  .isZoomed {
    .photo-page__main-img {
      position: absolute;
      top: -80px;
      right: -2rem;
      height: 100vh;
      left: 0px;
      pointer-events: none;
    }
    .photo-page__img {
      cursor: grab;
      pointer-events: all;

      &:active {
        cursor: grabbing;
      }
    }
  }
  .loading {
    // border: solid thin blue;
  }

  // controls
  &__main-controls {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    display: flex;
    align-items: center;
    height: 100%;
    z-index: 2;
    pointer-events: none;

    a {
      display: block;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      color: white;
      width: 200px;
      height: 200px;
      pointer-events: auto;

      &:hover .i-c {
        background: fade-out(black, 0.35);
      }
      &:active .i-c {
        background: fade-out(black, 0.15);
        @include active-shadow;
      }
    }
    i {
      font-size: 2.5rem;
    }
    .i-c {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: box-shadow 0.2s ease, background-color 0.3s ease;
    }
    .left,
    .right {
      flex: 1;
      height: 200px;
      pointer-events: none;
      display: flex;
      align-items: center;
      justify-content: center;
      pointer-events: auto;
    }
    .center {
      flex: 3;
    }
  }
}

@media only screen and (max-width: 768px) {
  #download,
  #fullscreen {
    display: none;
  }
  .photo-page {
    &__main {
      height: calc(100% - 80px);
      position: relative;
      pointer-events: none;
      padding: 1rem 0.75rem;
    }
    &__toolbar {
      padding: 0 1rem;
      background: fade-out(black, 0.1);
    }
    &__img {
      width: 100% !important;
      height: auto !important;
    }
    .center {
      flex: 1;
    }
    .left,
    .right {
      flex: 3;
    }
    .left {
      transform: translateX(-20%);
    }
    .right {
      transform: translateX(20%);
    }
  }
}

@keyframes fade-in {
  0% {
    background-color: fade-out(black, 1);
  }
  100% {
    background-color: fade-out(black, 0.15);
  }
}
@keyframes slide-down {
  0% {
    transform: translateY(-80px);
  }
  100% {
    transform: translateY(0px);
  }
}
@keyframes pop-in {
  0% {
    opacity: 0;
    transform: scale(0.75);
  }
  50% {
    opacity: 0;
    transform: scale(0.75);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes pop-in-sm {
  0% {
    opacity: 0;
    transform: scale(0.9);
  }
  50% {
    opacity: 0;
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
