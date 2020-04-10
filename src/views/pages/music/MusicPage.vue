<template>
	<div class="music-page page">
		<ul class="music-list">
			<music-item v-for="(song, i) in songs" :id="i" v-bind="song" :key="i" />
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
