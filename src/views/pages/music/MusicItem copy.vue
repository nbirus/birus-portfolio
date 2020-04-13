<template>
	<li class="music-item card" :class="{ playing: isPlaying, loading }">
		<div class="music-item__bg" ref="wave"></div>
		<div class="music-item__bg-wave">
			<img src="wave-1.svg" alt />
		</div>
		<div class="music-item__bg-wave white">
			<img src="wave-white.svg" alt />
		</div>
		<div class="music-item__container">
			<div class="music-item__info">
				<h3 class="title" v-text="title"></h3>
				<div class="music-item__timer" v-if="isPlaying">
					<span class="timer">{{ timer | time }}</span>
					<span class="slash">/</span>
					<span class="duration">{{ duration | time }}</span>
				</div>
			</div>
			<div class="music-item__spacer"></div>
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
			loading: true,
		}
	},
	mounted() {
		this.player = WaveSurfer.create({
			container: this.$refs.wave,
			barRadius: 5,
			barWidth: 2,
			barGap: 2,
			barHeight: 0.75,
			cursorWidth: 0,
			height: 115,
			progressColor: '#2296f3',
			waveColor: 'rgba(0,0,0,.25)',
		})
		this.player.on('audioprocess', this.audioprocess)
		this.player.on('pause', () => (this.isPlaying = false))
		this.player.on('play', () => (this.isPlaying = true))
		this.player.on('ready', () => {
			this.loading = false
			this.duration = this.player.getDuration()
			this.player.setVolume(0.25)
		})
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
			&__bg {
				transform: translateY(6.5rem);
				opacity: 1;
				pointer-events: auto;
				cursor: pointer;
				height: 90px;
				z-index: 9;
				animation: opacity 0.3s ease;
			}
		}
	}

	&__bg {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		z-index: 2;
		height: 115px;
		pointer-events: none;
		position: none;
		transition: transform 0.2s ease, opacity 0.2s ease;
		animation: opacity 2s;
	}
	&__bg-wave {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		z-index: 1;
		height: 115px;
		pointer-events: none;
		position: none;
		transition: transform 0.2s ease, opacity 0.2s ease;

		&.white {
			z-index: 2;
		}
	}
	&__container {
		display: flex;
		align-items: center;
		z-index: 3;
		position: relative;
		width: 100%;
		height: 115px;
	}
	&__info {
		flex: 0 1 auto;
		pointer-events: none;
		padding-left: 2rem;

		h1 {
			background-color: #fff;
		}
	}
	&__btn {
		flex: 0 0 90px;
		width: 90px;
		height: 90px;
		border-radius: 50%;
		border: none;
		pointer-events: auto;
		margin-right: 1.5rem;
		cursor: pointer;
		user-select: none;
		color: white;
		background: rgb(34, 150, 243);
		background: radial-gradient(circle, rgba(34, 150, 243, 1) 10%, rgba(34, 150, 243, 0) 40%);

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
		position: absolute;

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

@keyframes opacity {
	0% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
}
</style>
