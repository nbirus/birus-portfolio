<template>
  <div class="contain" :class="{ showRight, showLeft }">
    <button class="btn btn-icon-circle nb left flat mr-3" v-if="showLeft" @click="prevPage">
      <i class="material-icons">chevron_left</i>
    </button>

    <transition-group tag="ul" name="list" class="scrolling-wrapper">
      <li
        class="scrolling-wrapper__item"
        v-for="tag in visibleTags"
        :key="`tag-${tag.id}`"
        :class="`size-${size} new-${tag.new} vertical-${tag.vertical} active-${activeTag === tag.id}`"
      >
        <router-link
          tag="button"
          :to="activeTag !== tag.id ? { path: 'photography', query: { tag: tag.id } } : { path: 'photography' }"
          class="btn scrolling-wrapper__button"
          @click="$emit('tag')"
        >
          <div class="scrolling-wrapper__img">
            <img :src="tag.src" :alt="tag.label" />
            <div class="icon" v-if="activeTag === tag.id">
              <i class="material-icons">check</i>
            </div>
          </div>
          <div class="scrolling-wrapper__label text">
            <span class="label" v-text="tag.label"></span>
            <span class="count text-secondary">{{ tag.count }} photos</span>
          </div>
        </router-link>
      </li>
    </transition-group>

    <button class="btn btn-icon-circle right nb flat" v-if="showRight" @click="nextPage">
      <i class="material-icons">chevron_right</i>
    </button>
  </div>
</template>

<script>
import tags from '@/assets/tags.json'
import photos from '@/assets/photos'

export default {
  name: 'photography-tag-slider',
  props: ['width'],
  data() {
    return {
      page: 0,
      from: 0,
      tags,
    }
  },
  computed: {
    size() {
      if (this.width < 768) {
        return tags.length
      } else if (this.width > 1600) {
        return 6
      } else if (this.width > 1300) {
        return 5
      } else if (this.width > 1200) {
        return 5
      } else if (this.width > 975) {
        return 4
      } else {
        return 3
      }
    },
    to() {
      return this.from + this.size
    },
    visibleTags() {
      return clone(tags).slice(this.from, this.to)
    },
    showLeft() {
      return this.from > 0
    },
    showRight() {
      return this.to < this.tags.length
    },
    activeTag() {
      return this.$route.query.tag
    },
  },
  methods: {
    prevPage() {
      this.page--
      this.from = this.size * this.page
    },
    nextPage() {
      this.page++
      this.from = this.size * this.page
    },
  },
}
function clone(o) {
  return JSON.parse(JSON.stringify(o))
}
</script>

<style lang="scss" scoped>
@import '@/styles/component';

.contain {
  display: flex;
  align-items: center;
  height: auto;
  padding: 0 4rem;

  &.showLeft {
    padding: 0 4rem 0 2rem;
  }
  &.showRight {
    padding: 0 2rem 0 4rem;
  }
  &.showLeft.showRight {
    padding: 0 2rem;
  }
}
.scrolling-wrapper {
  display: flex;
  flex-wrap: nowrap;
  max-width: 100%;
  height: auto;
  flex: 0 1 100%;

  &__item {
    padding: 0 1rem 0 0;

    &.active-true {
      .scrolling-wrapper__button {
        box-shadow: 0 0 0 2px darken(#2296f3, 5);
        background-color: fade-out(#2296f3, 0.85);
        // border-color: var(--c-blue);
      }
      .scrolling-wrapper__label {
        color: darken(#2296f3, 25);
      }
    }

    &.size-10 {
      flex: 0 0 10%;
    }
    &.size-9 {
      flex: 0 0 11.111%;
    }
    &.size-8 {
      flex: 0 0 12.5%;
    }
    &.size-7 {
      flex: 0 0 14.2857%;
    }
    &.size-6 {
      flex: 0 0 16.666%;
    }
    &.size-5 {
      flex: 0 0 20%;
    }
    &.size-4 {
      .scrolling-wrapper__img {
        height: 4rem;
        width: 4rem;
      }
      flex: 0 0 25%;
    }
    &.size-3 {
      flex: 0 0 33.333%;
    }
    &.vertical-true {
      img {
        height: auto;
        width: 5rem;
      }
    }
  }
  &__button {
    width: 100%;
    height: auto;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    border: none;
    background-color: #fff;
    border-radius: 0.5rem;
    border: solid thin var(--c-grey2);

    &:hover {
      // box-shadow: 0px 3px 1rem rgba(0, 0, 0, 0.1);
      border-color: var(--c-blue);
      background-color: fade-out(#2296f3, 0.975);

      .label {
        color: darken(#2296f3, 15);
      }
    }
    &:active,
    &:focus {
      outline: none;
    }
  }
  &__img {
    background-color: var(--c-grey1);
    width: 4rem;
    height: 4rem;
    margin-right: 0.75rem;
    border-radius: 0.5rem;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: border-radius 0.2s ease;
    // border-radius: 0.5rem 0 0 0.5rem;

    img {
      width: auto;
      height: 5.5rem;
    }

    .icon {
      position: absolute;
      width: 4rem;
      height: 4rem;
      border-radius: 0.5rem;
      background-color: fade-out(darken(#2296f3, 20), 0.75);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;

      i {
        animation: icon 0.2s ease;
        background-color: fade-out(black, 0.7);
        border-radius: 50%;
        transform: scale(1.1);
        padding: 0.75rem;
      }
    }
  }
  &__label {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    .count {
      font-size: 0.7rem;
    }
    .label {
      font-size: 1rem;
    }
  }
  .after {
    display: none;
  }
}
.btn-icon-circle {
  min-width: 40px;
}
.contain {
  position: relative;
}

@keyframes icon {
  0% {
    transform: scale(0.5);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes iconsm {
  0% {
    transform: scale(0.2);
  }
  100% {
    transform: scale(0.7);
  }
}

@media only screen and (max-width: 768px) {
  .contain {
    padding: 0 !important;
  }
  .scrolling-wrapper {
    .btn-icon-circle {
      display: none;
    }

    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    padding: 0.5rem 1rem;

    &::-webkit-scrollbar {
      display: none;
    }
    .after {
      min-width: 2.5rem;
      height: 100px;
      position: relative;
      display: block;
    }

    &__item {
      flex: 1 0 auto;
      padding: 0 1rem 0 0;
      min-width: 150px;
    }
    &__button {
      padding: 0.5rem;
      padding-right: 1.5rem;
    }
    &__img {
      width: 2.75rem;
      height: 2.75rem;

      .icon {
        width: 2.5rem;
        height: 2.5rem;

        i {
          animation: iconsm 0.2s ease;
          transform: scale(0.7);
        }
      }
    }
    &__label {
      font-size: 0.9rem;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  }
}
</style>
