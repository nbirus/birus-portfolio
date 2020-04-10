<template>
	<li class="music-item card" :class="{ playing: isPlaying }">
		<div class="music-item__bg" ref="wave"></div>
		<div class="music-item__container">
			<div class="music-item__info">
				<h2 class="title" v-text="title"></h2>
				<div class="music-item__timer" v-if="isPlaying">
					<span class="timer">{{ timer | time }}</span>
					<span class="slash">/</span>
					<span class="duration">{{ duration | time }}</span>
				</div>
			</div>
			<div class="music-item__spacer"></div>
			<!-- <button class="music-item__btn back" @click="stop" v-if="timer > 1">
				<i class="material-icons">fast_rewind</i>
			</button> -->
			<button class="music-item__btn" @click="toggle">
				<i class="material-icons">{{ !isPlaying ? 'play_arrow' : 'pause' }}</i>
			</button>
		</div>
	</li>
</template>

<script>
import WaveSurfer from 'wavesurfer.js'

export default {
	name: 'music-item',
	props: ['src', 'title', 'date', 'id'],
	data() {
		return {
			player: null,
			isPlaying: false,
			timer: 0,
			duration: 0,
		}
	},
	mounted() {
		this.player = WaveSurfer.create({
			container: this.$refs.wave,
			barRadius: 5,
			barWidth: 4,
			barHeight: 0.75,
			cursorWidth: 0,
			progressColor: '#2296f3',
		})
		this.player.on('audioprocess', this.audioprocess)
		this.player.on('pause', () => (this.isPlaying = false))
		this.player.on('play', () => (this.isPlaying = true))
		this.player.on('ready', () => (this.duration = this.player.getDuration()))
		this.player.load(this.src)
	},
	filters: {
		time(time) {
			// Hours, minutes and seconds
			var hrs = ~~(time / 3600)
			var mins = ~~((time % 3600) / 60)
			var secs = ~~time % 60

			// Output like "1:01" or "4:03:59" or "123:03:59"
			var ret = ''

			if (hrs > 0) {
				ret += '' + hrs + ':' + (mins < 10 ? '0' : '')
			}

			ret += '' + mins + ':' + (secs < 10 ? '0' : '')
			ret += '' + secs
			return ret
		},
	},
	methods: {
		toggle() {
			this.player.playPause()
		},
		play() {
			this.player.play()
		},
		pause() {
			this.player.pause()
		},
		stop() {
			this.player.stop()
		},
		audioprocess(timer) {
			this.timer = Math.round(timer).toFixed(0)
		},
	},
}
</script>

<style lang="scss" scoped>
.music-item {
	display: block;
	margin: 0;
	padding: 0;
	width: 100%;
	overflow: hidden;
	position: relative;
	height: 115px;

	transition: transform 0.2s ease, box-shadow 0.2s ease, height 0.2s ease;

	&.playing {
		height: 220px;
		transform: scale(1.1);
		box-shadow: 0 10px 35px -2px rgba(0, 0, 0, 0.1), 0 4px 10px -2px rgba(0, 0, 0, 0.1) !important;

		.music-item {
			&__container {
				bottom: 5rem;
			}
			&__bg {
				transform: translateY(6.5rem);
				opacity: 1;
				pointer-events: auto;
			}
		}
	}

	&__bg {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		z-index: 1;
		min-height: 115px;
		pointer-events: none;
		position: none;
		opacity: 0.05;
		transition: transform 0.2s ease, opacity 0.2s ease;
	}
	&__container {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		display: flex;
		align-items: center;
		z-index: 3;
		transition: bottom 0.2s ease;
	}
	&__info {
		flex: 0 1 auto;
		pointer-events: none;
		padding-left: 2rem;
	}
	&__btn {
		flex: 0 0 90px;
		width: 90px;
		height: 90px;
		background-color: transparent;
		border-radius: 50%;
		border: none;
		pointer-events: auto;
		margin-right: 1.5rem;

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
			flex: 0 0 60px;
			margin-right: 0.25rem;

			i {
				transform: scale(1.5);
			}
		}
	}
	&__spacer {
		flex: 0 1 100%;
	}
	&__timer {
		z-index: 1;
		pointer-events: none;
		margin-top: 0.75rem;

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
