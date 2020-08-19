<template>
  <div class="contain">
    <button class="btn btn-icon-circle nb flat mr-3" v-if="showLeft" @click="prevPage">
      <i class="material-icons">chevron_left</i>
    </button>

    <ul class="scrolling-wrapper" :class="{ showRight, showLeft }">
      <li class="scrolling-wrapper__item" v-for="tag in visibleTags" :key="`tag-${tag.id}`" :class="`size-${size} new-${tag.new}`">
        <router-link tag="button" :to="{ path: 'photography', query: { tag: tag.id } }" class="btn scrolling-wrapper__button " @click="$emit('tag')">
          <div class="scrolling-wrapper__img">
            <!-- <img :src="tag.src" :alt="tag.label" /> -->
          </div>
          <div class="scrolling-wrapper__label text">
            <span v-text="tag.label"></span>
            <span class="count text-secondary">{{ tag.count }} photos</span>
          </div>
        </router-link>
      </li>
    </ul>

    <button class="btn btn-icon-circle nb flat" v-if="showRight" @click="nextPage">
      <i class="material-icons">chevron_right</i>
    </button>
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
    }
  },
  computed: {
    size() {
      if (this.width < 768) {
        return tags.length
      } else if (this.width > 1600) {
        return 7
      } else if (this.width > 1300) {
        return 6
      } else if (this.width > 1150) {
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
}
.scrolling-wrapper {
  display: flex;
  flex-wrap: nowrap;
  max-width: 100%;
  height: auto;

  flex: 0 1 100%;

  &.showLeft {
    max-width: calc(100% - 50px);
  }
  &.showRight {
    max-width: calc(100% - 50px);
  }
  &.showLeft.showRight {
    max-width: calc(100% - 100px);
  }

  &__item {
    padding: 0 0.75rem 0 0;

    &.size-10 {
      // height: 9vw;
      flex: 0 0 10%;
    }
    &.size-9 {
      flex: 0 0 11.111%;
    }
    &.size-8 {
      // height: 140px;
      flex: 0 0 12.5%;
    }
    &.size-7 {
      // height: 10vw;
      flex: 0 0 14.2857%;
    }
    &.size-6 {
      // height: 12vw;
      flex: 0 0 16.666%;
    }
    &.size-5 {
      // height: 14vw;
      flex: 0 0 20%;
    }
    &.size-4 {
      // height: 17vw;
      flex: 0 0 25%;
    }
    &.size-3 {
      flex: 0 0 33.333%;
    }
  }
  &__button {
    width: 100%;
    height: auto;
    padding: 0.3rem;
    display: flex;
    align-items: center;
    border: none;
    background-color: #fff;
    border-radius: 0.75rem;

    &:hover {
      box-shadow: 0px 3px 12px rgba(0, 0, 0, 0.25);
    }
    &:active,
    &:focus {
      outline: none;
      box-shadow: 0 0 0 3px var(--c-blue);
    }
  }
  &__img {
    background-color: var(--c-grey1);
    width: 4rem;
    height: 4rem;
    margin-right: 1rem;
    border-radius: 0.5rem;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__label {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    .count {
      font-size: 0.7rem;
    }
  }
  .after {
    display: none;
  }
}
.contain {
  position: relative;
}
@media only screen and (max-width: 768px) {
  .scrolling-wrapper {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    padding: 1rem 1.5rem;
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
      height: 120px;
      flex: 0 0 135px;
      padding: 0 0.5rem;
    }
    &__img {
      height: 70%;
    }
    &__label {
      height: 30%;
      padding-left: 0.75rem;
      font-size: 0.9rem;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      font-weight: var(--bold);
    }
  }
}
</style>
