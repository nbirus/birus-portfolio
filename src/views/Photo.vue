<template>
	<div class="photo">
		<div class="photo__wrapper">
			<!-- top image -->
			<!-- eslint-disable -->
			<div class="photo__img-wrapper">
				<!-- next/previous buttons -->
				<div class="photo__img-actions" ref="swipe" tabindex="0">
					<router-link :to="prevLink" tag="button" class="photo__img-actions-side left">
						<div class="contain">
							<img class="left" src="/left.svg" alt="Previous photo" />
						</div>
					</router-link>
					<div class="photo__img-actions-center"></div>
					<router-link :to="nextLink" tag="button" class="photo__img-actions-side right">
						<div class="contain">
							<img class="right" src="/right.svg" alt="Next photo" />
						</div>
					</router-link>
				</div>

				<!-- image container -->
				<div class="photo__img-container">
					<img
						ref="img"
						:src="photo.url_lg"
						class="photo__img"
						:class="photo.aspect"
						:alt="photo.name"
					/>
				</div>

				<!-- close button -->
				<router-link to="/photography" tag="button" class="btn-icon photo__img-close">
					<img class="close" src="/close.svg" alt="Close photo" />
				</router-link>

				<!-- epxand button -->
				<button class="btn-icon photo__img-expand" type="button" @click="expand">
					<img class="expand" src="/expand.svg" alt="Expand to fullscreen" />
				</button>
			</div>

			<!-- below information -->
			<div class="photo__info-container">
				<div class="max-width-container">
					<div class="mb-5">
						<h3 class="photo__info-title mb-2" v-text="photo.name"></h3>
						<p class="photo__info-title mb-3" v-text="photo.description"></p>
						<span class="photo__info-title">{{ photo.date | formatDate }}</span>
					</div>

					<hr class="mb-5" />

					<div>
						<h4 class="mb-2">Location</h4>
						<open-map :position="photo.position" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import photos from '@/assets/photos'
import expand from '@/utils/Expand'
import formatDate from '@/utils/FormatDate'
import OpenMap from '@/components/OpenMap'
import swipeDetect from 'swipe-detect'

export default {
	name: 'photo',
	components: { OpenMap },
	data() {
		return {
			photo: {},
			photoIndex: 0,
		}
	},
	computed: {
		nextLink() {
			let index = this.photoIndex < photos.length - 1 ? this.photoIndex + 1 : 0
			return `/photography/${photos[index].id}`
		},
		prevLink() {
			let index = this.photoIndex > 0 ? this.photoIndex - 1 : photos.length - 1
			return `/photography/${photos[index].id}`
		},
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
	filters: { formatDate },
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
		$route() {
			this.getImageById(this.$route.params.id)
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
	z-index: 99;

	&__wrapper {
		position: relative;
		overflow-y: scroll;
	}
	&__img-wrapper {
		display: flex;
		background-color: var(--c-grey9);
		min-height: 100vh;
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
		.contain {
			background-color: transparent;
			border-radius: 50%;
			width: 50px;
			height: 50px;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.contain img {
			opacity: 0.1;
		}
		&:hover .contain {
			background-color: fade-out(white, 0.95);
		}
		&:hover .contain img {
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
		padding: 2rem 1vw;
	}
	&__img {
		animation: open ease 0.5s;
		width: 70vw;
		min-width: auto;
		max-width: 1300px;
		max-height: 93vh;
		box-shadow: 0 0 0.75rem fade-out(black, 0.9);

		&.vertical {
			width: auto;
			max-height: 90vh;
			height: 100%;
		}

		&.panorama {
			max-width: 100vw;
		}
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

@media only screen and (max-width: 600px) {
	.photo {
		&__img-container {
			padding: 1rem 2vw 1rem;
		}
		&__img {
			max-width: 95vw;
		}
		&__img-wrapper {
			min-height: 50vh;
		}
	}
}

@keyframes open {
	0% {
		transform: scale(0.75);
		opacity: 0;
	}
	100% {
		opacity: 1;
		transform: scale(1);
	}
}
</style>
