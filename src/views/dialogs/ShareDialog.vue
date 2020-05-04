<template>
  <transition name="modal">
    <div class="modal-mask" v-show="$shareDialog" @click.self="$shareDialog = false">
      <transition name="popover" mode="out-in" &#x26;#x26;#x26;#x26;#x26;#x26;#x26;#x60;>
        <div class="modal">
          <div class="modal__container">
            <div class="modal__header">
              <h4 class="text" v-text="label"></h4>
              <button
                class="btn btn-icon-circle flat nb close"
                @click="$shareDialog = false"
                title="Close Share"
              >
                <i class="material-icons">close</i>
              </button>
            </div>
            <div class="modal__body">
              <ul class="modal__share-list">
                <li v-for="(link, i) in shareLinks" :key="i" class="modal__share-list-item">
                  <a
                    class="link"
                    :href="link.url"
                    target="_blank"
                    :class="link.class"
                    :title="`Share on ${link.name}`"
                  >
                    <img :src="`/${link.id}.svg`" :alt="`Share on ${link.name}`" />
                  </a>
                </li>
              </ul>
              <input
                ref="copy"
                class="modal__share_url"
                type="text"
                readonly
                :value="shareLink"
                onclick="this.select()"
                @click="copy"
              />
              <transition name="popover" mode="out-in">
                <div class="modal__share_url_popover" v-if="copyPopover">
                  <i class="material-icons">check</i>
                  <span>Copied to clipboard</span>
                </div>
              </transition>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'share-dialog',
  data() {
    return {
      copyPopover: false,
    }
  },
  computed: {
    shareLink() {
      if (this.$route.params.id) {
        return `nbirus.com/photography/${this.$route.params.id}`
      }
      if (this.$route.query.tag) {
        return `nbirus.com/photography?tag=${this.$route.query.tag}`
      } else {
        return 'nbirus.com/photography'
      }
    },
    label() {
      if (this.$route.params.id) {
        return 'Share Photo'
      }
      if (this.$route.query.tag) {
        return 'Share Photos'
      } else {
        return 'Share Photos'
      }
    },
    shareLinks() {
      return [
        {
          id: 'facebook',
          name: 'Facebook',
          class: 'facebook-share-button',
          url: `https://www.facebook.com/sharer/sharer.php?u=${this.shareLink}`,
        },
        {
          id: 'twitter',
          name: 'Twitter',
          class: 'twitter-share-button',
          url: `https://twitter.com/intent/tweet?text=${this.shareLink}`,
        },
        {
          id: 'pinterest',
          name: 'Pinterest',
          class: 'pinterest-share-button',
          url: `http://pinterest.com/pin/create/button/?url=${this.shareLink}`,
        },
        {
          id: 'tumblr',
          name: 'Tumblr',
          class: 'tumblr-share-button',
          url: `https://www.tumblr.com/widgets/share/tool?shareSource=legacy&canonicalUrl=<-urlencode(${this.shareLink})->&posttype=link`,
        },
      ]
    },
  },
  methods: {
    copy() {
      document.execCommand('copy')
      this.copyPopover = true
      setTimeout(() => {
        this.copyPopover = false
      }, 4000)
    },
  },
  watch: {
    $shareDialog() {
      this.copyPopover = false
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/component';

.modal {
  &__container {
    width: 350px;
  }
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;

    .btn {
      color: var(--c-grey5);
      &:hover {
        color: var(--c-grey8);
      }
    }
  }
  &__share_url {
    width: 235px;
    text-align: center;
    padding: 0.75rem 2rem;
    font-size: 1rem;
    border-radius: 4px;
    border: solid thin var(--c-border);
    outline: none;
    transition: box-shadow 0.3s ease;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;

    &:focus {
      border: solid thin var(--c-blue);
      @include active-shadow;
    }
    &::selection {
      background: fade-out(#2296f3, 0.75);
    }
  }
  &__share_url_popover {
    position: absolute;
    padding: 0.5rem;
    background-color: var(--c-blue);
    margin-top: 0.5rem;
    left: calc(50% - 100px);
    width: 200px;
    text-align: center;
    border-radius: 25px;
    color: white;
    font-weight: var(--bold);
    font-size: 0.9rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    display: flex;
    align-items: center;

    i {
      margin-right: 0.5rem;
    }
  }
  &__share-list {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin: 0 0 1.5rem;
    padding: 0;
  }
  &__share-list-item {
    display: block;
    margin: 0;
    padding: 0;

    .link {
      display: block;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: var(--c-grey1);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: box-shadow 0.2s ease;

      &:focus {
        box-shadow: 0 0 0 3px var(--c-blue);
      }
    }
    img {
      width: 55px;
      height: 55px;
    }
    .tumblr-share-button {
      background-color: #304155;
      img {
        width: 32px;
        height: 32px;
      }
    }
    .twitter-share-button {
      background-color: #1c9dea;

      img {
        width: 30px;
        height: 30px;
        transform: translateY(1px) translateX(1px);
      }
    }
  }
}
.close {
  transform: translateY(-0.9rem) translateX(1.15rem) scale(0.9);
}

// transition
.modal-enter {
  opacity: 0;
}
.modal-leave-active {
  opacity: 0;
}
.modal-enter .modal-container,
.modal-leave-active .modal-container {
  transform: scale(0.8);
}
</style>
