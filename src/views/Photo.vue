<template>
	<div class="photo">
		<div class="photo__wrapper">
			<!-- top image -->
			<div class="photo__img-wrapper">
				<!-- next/previous buttons -->
				<div class="photo__img-actions" ref="swipe" tabindex="0">
					<button type="button" class="photo__img-actions-side left" @click.stop="goToPrevious">
						<button type="button" @click="goToPrevious">
							<img class="left" src="/left.svg" alt="Previous photo" />
						</button>
					</button>
					<div class="photo__img-actions-center"></div>
					<button class="photo__img-actions-side right" @click.stop="goToNext">
						<button type="button" @click="goToNext">
							<img class="right" src="/right.svg" alt="Next photo" />
						</button>
					</button>
				</div>

				<!-- image container -->
				<div class="photo__img-container">
					<img ref="img" :src="photo.url_big" class="photo__img" :alt="photo.name" />
				</div>

				<!-- close button -->
				<button class="photo__img-close" type="button" @click="$router.push('/photography')">
					<img class="close" src="/close.svg" alt="Close photo" />
				</button>

				<!-- epxand button -->
				<button class="photo__img-expand" type="button" @click="expand">
					<img class="expand" src="/expand.svg" alt="Expand to fullscreen" />
				</button>
			</div>

			<!-- below information -->
			<div class="photo__info-container">
				<div class="max-width-container">
					<h3 class="photo__info-title" v-text="photo.name"></h3>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import photos from '@/assets/photos'
import expand from '@/utils/Expand'
import swipeDetect from 'swipe-detect'

export default {
	name: 'photo',
	data() {
		return {
			photo: {},
			photoIndex: 0,
		}
	},
	mounted() {
		this.getImageById(this.$route.params.id)
		this.setEscKey()
		swipeDetect(this.$refs.swipe, dir => {
			if (dir === 'left') {
				this.goToPrevious()
			} else if (dir === 'right') {
				this.goToNext()
			}
		})
	},
	methods: {
		goToPrevious() {
			if (this.photoIndex > 0) {
				this.photoIndex--
			} else {
				this.photoIndex = photos.length - 1
			}
		},
		goToNext() {
			if (this.photoIndex < photos.length - 1) {
				this.photoIndex++
			} else {
				this.photoIndex = 0
			}
		},
		getImageById(id) {
			this.photoIndex = photos.findIndex(p => p.id === id)
			this.photo = photos[this.photoIndex]
		},
		expand() {
			expand(this.$refs.img)
		},
		setEscKey() {
			let that = this
			document.addEventListener('keyup', function(evt) {
				if (evt.keyCode === 27) {
					that.$router.push(`/photography`)
				} else if (evt.keyCode === 39) {
					that.goToNext()
				} else if (evt.keyCode === 37) {
					that.goToPrevious()
				}
			})
		},
	},
	watch: {
		photoIndex(index) {
			this.$router.push(`/photography/${photos[index].id}`)
		},
	},
}
</script>

<style lang="scss" scoped>
.photo {
	position: absolute;
	width: 100vw;
	left: 0;
	top: 0;
	display: flex;
	flex-direction: column;

	&__wrapper {
		position: relative;
		overflow-y: scroll;
	}
	&__img-wrapper {
		display: flex;
		background-color: var(--c-grey9);
		min-height: 20vh;
		position: relative;
	}
	&__img-actions {
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		position: absolute;
		display: flex;
	}
	&__img-actions-side {
		flex: 1;
		display: flex;
		align-items: center;
		padding: 0 1.5rem;

		&:before {
			content: '';
			border-radius: 50%;
			width: 50px;
			height: 50px;
			background-color: fade-out(black, 0.5);
			position: absolute;
			opacity: 0;
			transition: opacity 0.15s ease;
		}

		&.left {
			justify-content: flex-start;
			&:before {
				margin-left: -0.3rem;
				margin-top: -0.15rem;
			}
		}
		&.right {
			justify-content: flex-end;
			&:before {
				margin-left: 0.36rem;
				margin-top: -0.15rem;
			}
		}

		button {
			opacity: 0.25;
		}
		&:hover button {
			opacity: 1;
		}
		&:hover:before {
			opacity: 1;
		}
	}
	&__img-actions-center {
		flex: 1;
		pointer-events: none;
	}
	&__img-close {
		position: absolute;
		left: 0;
		top: 0;
		width: 100px;
		height: 100px;
		opacity: 0.5;

		&:hover {
			opacity: 1;
		}
	}
	&__img-expand {
		position: absolute;
		right: 0;
		top: 0;
		width: 100px;
		height: 100px;
		opacity: 0.5;

		&:hover {
			opacity: 1;
		}
	}
	&__img-container {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100vw;
		padding: 100px 10vw 75px;
	}
	&__img {
		max-width: 80vw;
		box-shadow: 0 0 0.75rem fade-out(black, 0.9);
	}

	// information
	&__info-container {
		min-height: 50vh;
		background-color: white;
		padding: 2rem 1.5rem;
	}
}

img {
	color: white;

	&.close {
		transform: scale(1.5);
	}
	&.expand {
		transform: scale(1.3);
	}
	&.left {
		transform: scale(1.75);
	}
	&.right {
		transform: scale(1.75);
	}
}
button {
	outline: none !important;
}
</style>
