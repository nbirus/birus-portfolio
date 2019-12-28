<template>
	<div class="photo">
		<!-- top image -->
		<div class="photo__img-wrapper">
			<!-- next/previous buttons -->
			<div class="photo__img-actions">
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
				<img :src="photo.url" class="photo__img" alt="Image 1" />
			</div>

			<!-- close button -->
			<button class="photo__img-close" type="button" @click="$router.push('/photography')">
				<img class="close" src="/close.svg" alt="Close photo" />
			</button>

			<!-- epxand button -->
			<button class="photo__img-expand" type="button">
				<img class="expand" src="/expand.svg" alt="Expand to fullscreen" />
			</button>
		</div>

		<!-- below information -->
		<div class="photo__info-container"></div>
	</div>
</template>

<script>
import photos from '@/assets/photos'

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
	position: fixed;
	width: 100vw;
	left: 0;
	top: 0;
	min-height: 100vh;

	// wrapper
	&__img-wrapper {
		display: flex;
		background-color: var(--c-grey9);
		min-height: 90vh;
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

		&.left {
			justify-content: flex-start;
		}
		&.right {
			justify-content: flex-end;
		}

		button {
			opacity: 0.25;
		}
		&:hover button {
			opacity: 1;
		}
	}
	&__img-actions-center {
		flex: 1;
	}
	&__img-close {
		position: absolute;
		left: 0;
		top: 0;
		width: 100px;
		height: 100px;
	}
	&__img-expand {
		position: absolute;
		right: 1.5rem;
		top: 1.5rem;
	}
	&__img-container {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100vw;
	}
	&__img {
		box-shadow: 0 0 3rem fade-out(black, 0.95);
	}

	// information
	&__info-container {
		min-height: 30vh;
		background-color: white;
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
