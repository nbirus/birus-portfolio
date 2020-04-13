<template>
	<li class="music-item" :class="{ playing: isPlaying, loading }">
		<div
			class="music-item__top"
			:class="{ playing: isPlaying }"
			@click.self="!isPlaying ?  play() : () => {}"
		>
			<div class="music-item__index text-secondary" v-text="index + 1"></div>
			<div class="music-item__play-pause">
				<button class="music-item__btn" @click="toggle">
					<i class="material-icons">{{ !isPlaying ? 'play_arrow' : 'pause' }}</i>
				</button>
			</div>
			<div class="music-item__title-date">
				<h6 class="text title" v-text="title"></h6>
				<span class="text-secondary date" v-text="date"></span>
			</div>
			<div class="spacer"></div>
			<div class="music-item__loading" v-if="loading">
				<spinner :size="60" :width="5" />
			</div>
			<div class="music-item__duration" :class="isPlaying ? 'text' : 'text-secondary'" v-else>
				<span class="timer" v-if="isPlaying || timer > 1">{{ timer | time }}</span>
				<span class="slash" v-if="isPlaying || timer > 1">/</span>
				<span class="duration">{{ duration | time }}</span>
			</div>
		</div>
		<div class="music-item__bottom">
			<div class="music-item__bg" ref="wave"></div>
		</div>
	</li>
</template>

<script>
import WaveSurfer from 'wavesurfer.js'
import Spinner from '@/components/Spinner'

export default {
	name: 'music-item',
	components: { Spinner },
	props: ['src', 'title', 'date', 'id', 'index'],
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
			height: 100,
			progressColor: '#2296f3',
			waveColor: 'rgba(0,0,0,.25)',
		})
		this.player.on('audioprocess', this.audioprocess)
		this.player.on('pause', () => (this.isPlaying = false))
		this.player.on('play', () => {
			this.isPlaying = true
			this.$emit('play', this.index)
		})
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
	height: 106px;
	border-bottom: solid thin var(--c-border);

	transition: transform 0.2s ease, box-shadow 0.2s ease, height 0.2s ease;

	&__top {
		display: flex;
		align-items: center;
		width: 100%;
		height: 106px;
		padding: 0 1rem;

		&:hover:not(.playing) {
			background-color: var(--c-grey1);
			cursor: pointer;
		}
	}
	&__index {
		flex: 0 0 50px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	&__btn {
		display: none;
		flex: 0 0 50px;
		width: 50px;
		height: 50px;
		border-radius: 50%;
		border: none;
		pointer-events: auto;
		cursor: pointer;
		user-select: none;
		background-color: transparent;

		i {
			transform: scale(1.25);
		}

		&:focus {
			outline: none;
		}
		&:hover {
			background-color: fade-out(black, 0.95);
		}
	}
	&__title-date {
		flex: 0 0 auto;
		padding-left: 1rem;

		.title {
			margin-bottom: 0.5rem;
		}
		.date {
			font-size: 0.9rem;
		}
	}
	&__loading {
		flex: 0 0 50px;
	}
	&__duration {
		flex: 0 0 50px;

		.timer {
			font-size: 0.8rem;
		}
		.slash {
			margin-left: 0.5rem;
			font-size: 0.8rem;
		}
		.duration {
			margin-left: 0.5rem;
			font-size: 1rem;
		}
	}
	&__bottom {
		display: flex;
		opacity: 0;
	}
	&__bg {
		z-index: 2;
		height: 115px;
		width: 100%;
		padding-left: calc(50px + 1rem);
	}

	&.loading {
		pointer-events: none;
		opacity: 0.75;
	}

	&:hover,
	&.playing {
		.music-item {
			&__index {
				display: none;
			}
			&__btn {
				display: block;
			}
		}
	}

	&.playing {
		height: calc(106px + 115px);
		.music-item {
			&__bottom {
				height: 115px;
				opacity: 1;
			}
		}
	}

	.spacer {
		flex: 0 1 100%;
	}

	&.playing2 {
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

	&__bg-wave2 {
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
