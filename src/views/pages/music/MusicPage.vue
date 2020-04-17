<template>
  <div class="music-page page">
    <div class="music-page__container">
      <div class="music-page__volume">
        <div class="contain">
          <div class="icon-top">
            <i class="material-icons">{{ icon }}</i>
          </div>
          <div class="slider">
            <input type="range" min="0" max="100" orient="vertical" step="1" v-model="volume" />
          </div>
        </div>
      </div>
      <ul class="music-list">
        <music-item
          v-for="(song, i) in songs"
          :key="i"
          :volume="volume / 100"
          ref="item"
          :id="i"
          :index="i"
          v-bind="song"
          @play="play"
        />
      </ul>
    </div>
  </div>
</template>

<script>
import MusicItem from './MusicItem'
const songs = [
  {
    title: 'KENNY',
    date: 'April 10, 2020',
    src: 'KENNY.wav',
  },
  {
    title: 'CAMEL',
    date: 'April 11, 2020',
    src: 'CAMEL.wav',
  },
  {
    title: 'KIT3',
    date: 'April 12, 2020',
    src: 'KIT3.wav',
  },
  {
    title: 'AROUND',
    date: 'April 13, 2020',
    src: 'AROUND.wav',
  },
  {
    title: 'REDD2',
    date: 'April 13, 2020',
    src: 'REDD2.wav',
  },
  {
    title: 'RMAC',
    date: 'April 13, 2020',
    src: 'RMAC.wav',
  },
  {
    title: 'KEYZONE',
    date: 'April 14, 2020',
    src: 'KEYZONE.wav',
  },
  {
    title: 'PROGRESSION',
    date: 'April 14, 2020',
    src: 'PROGRESSION.wav',
  },
]

export default {
  name: 'music-page',
  components: {
    MusicItem,
  },
  data() {
    return {
      songs: songs.reverse(),
      volume: 75,
    }
  },
  computed: {
    icon() {
      if (this.volume >= 75) {
        return 'volume_up'
      } else if (this.volume >= 25) {
        return 'volume_down'
      } else {
        return 'volume_mute'
      }
    },
  },
  methods: {
    play(index) {
      this.$refs.item.forEach((song, i) => {
        if (index !== i) {
          song.stop()
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.music-page {
  min-height: 90vh;

  &__container {
    max-width: 700px;
    margin: 0 auto;
    position: relative;
  }
  &__volume {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1rem;

    .contain {
      flex: 0 0 auto;
      display: flex;
      align-items: center;
      padding: 0.5rem 1rem 0.5rem 0.75rem;
      justify-content: flex-end;
      background-color: var(--c-grey1);
      border-radius: var(--r);
    }

    input {
      width: 125px;
      transform: translateY(-0.1rem);
    }
    i {
      margin-right: 0.75rem;
      font-size: 1.3rem;
      transform: translateY(0.1rem);
      color: darken(#607d8b, 20);
    }
  }
}
.music-list {
  width: 100%;
}

.spacer {
  flex: 0 1 100%;
}
</style>
