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
		src: 'test.mp3',
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

	&__item {
		display: block;
		margin: 0;
		padding: 0;
		width: 100%;
		min-height: 110px;
		display: flex;
		align-items: center;
		justify-content: stretch;
		overflow: hidden;
		position: relative;
	}
	&__bg {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		z-index: 2;
		background-color: #2296f3;
		mix-blend-mode: multiply;
		pointer-events: none;
		position: none;
		transition: width 1s ease;
	}
	&__play-pause {
		flex: 0 0 auto;
		z-index: 2;
		display: flex;
		align-items: center;
		padding-right: 1.5rem;
	}
	&__info {
		flex: 0 1 auto;
		z-index: 3;
		pointer-events: none;
		height: 100%;
		padding-left: 2rem;
		display: flex;
		align-items: flex-end;
	}
	&__spacer {
		flex: 0 1 100%;
	}
	&__btn {
		width: 80px;
		height: 80px;
		background-color: transparent;
		border-radius: 50%;
		border: none;
		pointer-events: auto;

		i {
			transform: scale(2);
		}

		&:focus {
			outline: none;
		}
		&:hover {
			background-color: fade-out(black, 0.95);
		}

		&.back {
			width: 60px;
			height: 60px;
			margin-right: 0.5rem;

			i {
				transform: scale(1.5);
			}
		}
	}
	&__timer {
		z-index: 1;
		pointer-events: none;
		margin-left: 1rem;
		transform: translateY(-3px);

		.timer {
			font-size: 1.15rem;
		}
		.slash {
			margin: 0 0.5rem;
			font-size: 0.9rem;
		}
		.duration {
			font-size: 0.8rem;
		}
	}
}
</style>
