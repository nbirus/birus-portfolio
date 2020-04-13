<template>
	<div class="music-page page">
		<ul class="music-list">
			<music-item
				v-for="(song, i) in songs"
				:key="i"
				ref="item"
				:id="i"
				:index="i"
				v-bind="song"
				@play="play"
			/>
		</ul>
	</div>
</template>

<script>
// import { Howl, Howler } from 'howler'
import MusicItem from './MusicItem'
const songs = [
	{
		title: 'KENNY',
		date: 'April 10, 2020',
		src: 'KENNY.wav',
	},
	{
		title: 'REDD',
		date: 'April 12, 2020',
		src: 'KENNY.wav',
	},
	{
		title: 'MAJOR',
		date: 'April 12, 2020',
		src: 'KENNY.wav',
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
		}
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
}
.music-list {
	width: 100%;
	max-width: 700px;
	margin: 0 auto;
}
</style>
