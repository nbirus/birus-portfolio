<template>
  <div class="contain">
    <transition :name="`slider-${direction}`" mode="out-in">
      <ul :key="page" class="scrolling-wrapper">
        <!-- <li class="scrolling-wrapper__item" :class="`size-${size} active-${!activeTag}`">
          <router-link tag="button" :to="{ path: 'photography' }" class="btn scrolling-wrapper__button" @click="$emit('tag')">
            <div class="scrolling-wrapper__img">
              <img width="60" src="https://live.staticflickr.com/65535/51218833306_ace13ccfc4_m.jpg" alt="All Photos" />
              <div class="icon" v-if="!activeTag">
                <i class="material-icons">check</i>
              </div>
            </div>
            <div class="scrolling-wrapper__label text">
              <span class="label">All Photos</span>
              <span class="count text-secondary">92 photos</span>
            </div>
          </router-link>
        </li> -->
        <li
          class="scrolling-wrapper__item"
          v-for="(tag, i) in tags"
          :key="`tag-${tag.id}`"
          :class="`size-${size} new-${tag.new} vertical-${tag.vertical} active-${activeTag === tag.id} delay-${i}`"
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
      </ul>
    </transition>
  </div>
</template>

<script>
import tags from '@/assets/tags.json'
export default {
  name: 'photography-tag-slider',
  props: ['width'],
  data() {
    return {
      page: 0,
      from: 0,
      tags,
      direction: 'right',
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
    activeTag() {
      return this.$route.query.tag
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
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}
.scrolling-wrapper {
  display: flex;
  flex-wrap: nowrap;
  max-width: 100%;
  height: auto;
  flex: 0 1 100%;
  min-height: 84px;
  position: relative;
  backface-visibility: hidden;
  z-index: 1;
  transition: all 0.25s ease-in-out;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  padding: 0.25rem 0.25rem 0.5rem;

  &::-webkit-scrollbar {
    height: 0.5rem;
  }
  /* Track */
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 8px fade-out(black, 0.9);
    border-radius: 10px;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: var(--c-grey3);
    border-radius: 10px;
  }

  &:hover {
    &::-webkit-scrollbar-thumb {
      background: var(--c-grey5);
    }
  }

  &__item {
    flex: 1 0 auto;
    padding: 0 1rem 0 0;
    min-width: 150px;
    padding: 0 1rem 0 0;

    &.active-true {
      .scrolling-wrapper__button {
        box-shadow: 0 0 0 2px darken(#2296f3, 5);
        background-color: fade-out(#2296f3, 0.85);
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
    padding: 0.35rem;
    display: flex;
    align-items: center;
    border: none;
    background-color: #fff;
    border: solid thin var(--c-grey3);
    padding-right: 1.5rem;
    border-radius: 3px;

    &:hover {
      border-color: var(--c-blue);
      background-color: fade-out(#2296f3, 0.975);
      box-shadow: 0 5px 1rem -2px rgba(0, 0, 0, 0.075), 0 4px 10px -2px rgba(0, 0, 0, 0.05);

      .label {
        color: darken(#2296f3, 15);
      }
    }
    &:active,
    &:focus {
      outline: none;
      box-shadow: none;
    }
  }
  &__img {
    background-color: var(--c-grey1);
    width: 3.5rem;
    height: 3.5rem;
    margin-right: 0.75rem;
    border-radius: 3px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: border-radius 0.2s ease;

    img {
      width: auto;
      height: 3.5rem;
    }

    .icon {
      position: absolute;
      width: 3.5rem;
      height: 3.5rem;
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
        transform: scale(0.9);
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
    display: block;
    min-width: 2.5rem;
    height: 100px;
    position: relative;
  }
}
.contain {
  position: relative;
}

@keyframes icon {
  0% {
    transform: scale(0.5);
  }
  100% {
    transform: scale(0.9);
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
