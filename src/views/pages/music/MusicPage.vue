<template>
	<div class="music-page page">
		<div class="music-page__container">
			<div class="music-page__volume">
				<div class="spacer"></div>
				<div class="slider">
					<input type="range" min="0" max="100" orient="vertical" step="1" v-model="volume" />
				</div>
				<div class="icon-top">
					<i class="material-icons">{{icon}}</i>
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
		title: 'AROUND',
		date: 'April 13, 2020',
		src: 'AROUND.wav',
	},
]

export default {
	name: 'music-page',
	components: {
		MusicItem,
	},
	data() {
		return {
			songs,
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
		align-items: center;
		border-bottom: solid thin var(--c-border);
		padding-bottom: 2rem;

		.icon-top {
			margin-left: 0.5rem;
		}
		input {
			width: 150px;
		}
		i {
			font-size: 1.2rem;
			transform: translateY(0.25rem);
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
