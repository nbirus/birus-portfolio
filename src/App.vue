8<template>
  <div class="nb-app" id="app" ref="scroll" :class="$darkClass">
    <!-- <header-bar @side-bar="sideBar=true" /> -->
    <!-- <side-bar v-model="sideBar" /> -->
    <main class="nb-main">
      <transition name="page" mode="out-in">
        <router-view />
      </transition>
      <!-- <share-dialog /> -->
      <!-- <contact-dialog /> -->
    </main>
  </div>
</template>

<script>
// import HeaderBar from '@/views/partials/Header'
// import SideBar from '@/views/partials/SideBar'
import photos from '@/assets/photos'
import tags from '@/assets/tags.json'

// import ShareDialog from '@/views/dialogs/ShareDialog'
// import ContactDialog from '@/views/dialogs/ContactDialog'

export default {
  name: 'app',
  // components: { ShareDialog },
  data() {
    return {
      sideBar: false,
    }
  },
  computed: {
    hideNav() {
      return this.$route.params.id
    },
  },
  created() {
    let obj = {}
    photos.forEach((photo) => {
      photo.tags.forEach((tag) => {
        if (obj[tag] === undefined) {
          obj[tag] = 1
        } else {
          obj[tag] = obj[tag] + 1
        }
      })
    })
    tags.forEach((tag) => {
      tag.count = obj[tag.id]
    })
  },
  watch: {
    $shareDialog(shareDialog) {
      this.$fullscreen = shareDialog
    },
    $contactDialog(contactDialog) {
      this.$fullscreen = contactDialog
    },
    $route: {
      handler(to, from) {
        this.sideBar = false

        if (to === undefined || from === undefined) {
          return
        }

        // if (to.name !== 'photo' && from.name !== 'photo' && to.name !== from.name) {
        //   this.key++
        // }

        // if (to.name === 'photo') {
        //   disableScroll()
        // } else {
        //   enableScroll()
        // }
      },
      immediate: true,
    },
    $fullscreen(fullscreen) {
      if (fullscreen) {
        document.body.classList.add('no-scroll')
      } else {
        document.body.classList.remove('no-scroll')
      }
    },
  },
}

function disableScroll() {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop
  let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft

  window.onscroll = function () {
    window.scrollTo(scrollLeft, scrollTop)
  }
}

function enableScroll() {
  window.onscroll = function () {}
}
</script>

<style lang="scss">
.nb-app {
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  margin: 0;
  overflow-wrap: break-word;
  overflow-x: hidden;
  padding: 0;
  word-wrap: break-word;
  background-color: white;
  position: relative;

  &.dark {
    background-color: var(--c-dark);
  }
}
.nb-header {
  align-items: center;
  color: #202124;
  contain: layout;
  display: flex;
  align-items: center;
  font-size: 14px;
  height: var(--header-height);
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 200;
}
.nb-sidebar {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
  z-index: 300;
}
.nb-main {
  min-height: calc(100vh - var(--header-height));
}

@media only screen and (max-width: 768px) {
  .nb-header {
    height: var(--header-height-sm);
  }
  .nb-main {
    min-height: calc(100vh - var(--header-height-sm));
  }
}
</style>
