<template>
	<div class="page photo-page" @click.self="close">
		<div class="photo-page__toolbar">
			<div class="photo-page__count">{{photo.name}}</div>
			<div class="photo-page__actions">
				<button class="btn btn-icon-circle btn-action">
					<i class="material-icons small" @click="close">open_with</i>
				</button>
				<button class="btn btn-icon-circle btn-action">
					<i class="material-icons small" @click="close">pin_drop</i>
				</button>
				<button class="btn btn-icon-circle btn-action">
					<i class="material-icons small" @click="close">share</i>
				</button>
				<button class="btn btn-icon-circle btn-action">
					<i class="material-icons" @click="close">close</i>
				</button>
			</div>
		</div>
		<div class="photo-page__main">
			<div class="photo-page__main-img" ref="container">
				<img
					ref="img"
					class="photo-page__img"
					:class="photo.aspect"
					:style="imgStyle"
					:src="photo.url_lg"
					:alt="photo.name"
				/>
			</div>
			<div class="photo-page__main-controls">
				<router-link class="left" :to="prevLink" ref="prev">
					<div class="i-c">
						<i class="material-icons">chevron_left</i>
					</div>
				</router-link>
				<div class="center"></div>
				<router-link class="right" :to="nextLink" ref="next">
					<div class="i-c">
						<i class="material-icons">chevron_right</i>
					</div>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
import photos from '@/assets/photos'
import WidthMixin from '@/mixins/WidthMixin'

export default {
	name: 'photo-page',
	mixins: [WidthMixin],
	data() {
		return {
			lastTag: '',
			photo: {},
			photoIndex: 0,
			width: 0,
			imgWidth: '100%',
			imgHeight: 'auto',
		}
	},
	computed: {
		imgStyle() {
			return {
				dOnResize: undefined,
				width: this.imgWidth,
				height: this.imgHeight,
				maxWidth: `${this.photo.width}px`,
				maxHeight: `${this.photo.height}px`,
			}
		},
		prevLink() {
			let index = this.photoIndex > 0 ? this.photoIndex - 1 : photos.length - 1
			return `/photography/${photos[index].id}`
		},
		nextLink() {
			let index = this.photoIndex < photos.length - 1 ? this.photoIndex + 1 : 0
			return `/photography/${photos[index].id}`
		},
	},
	mounted() {
		this.getImage()
		this.dOnResize = debounce(this.onResizeEvent, 100)
		this.onResizeEvent()
		this.setEscKey()
	},
	methods: {
		getImage() {
			let id = this.$route.params.id
			this.photoIndex = photos.findIndex(p => p.id === id)
			if (this.photoIndex !== -1) {
				this.photo = photos[this.photoIndex]
			} else {
				this.$router.push('/photography')
			}
		},
		open(from) {
			if (from.query) {
				this.lastTag = from.query.tag
			}
		},
		close() {
			if (this.lastTag) {
				this.$router.push(`/photography?tag=${this.lastTag}`)
			} else {
				this.$router.push('/photography')
			}
		},
		onResizeEvent() {
			let maxWidth = this.photo.width
			let maxHeight = this.photo.height
			let cWidth = this.$refs.container.offsetWidth
			let cHeight = this.$refs.container.offsetHeight
			let isStretchingH = maxWidth < cWidth
			let isStretchingV = maxHeight < cHeight

			if (this.photo.aspect === 'vertical') {
				if (isStretchingV) {
					this.imgWidth = '100%'
					this.imgHeight = 'auto'
				} else {
					this.imgWidth = 'auto'
					this.imgHeight = '100%'
				}
			} else if (this.photo.aspect === 'normal') {
				if (isStretchingH) {
					this.imgWidth = 'auto'
					this.imgHeight = '100%'
				} else {
					this.imgWidth = '100%'
					this.imgHeight = 'auto'
				}
			}
		},
		setEscKey() {
			let that = this
			let prev = this.$refs.prev.$el
			let next = this.$refs.next.$el

			document.addEventListener('keyup', function(evt) {
				if (evt.keyCode === 27) {
					that.close()
				} else if (evt.keyCode === 39) {
					prev.click()
				} else if (evt.keyCode === 37) {
					next.click()
				}
			})
		},
	},
	watch: {
		$route: 'getImage',
		width$(width) {
			this.dOnResize(width)
		},
	},
	beforeRouteEnter(to, from, next) {
		next(vm => {
			vm.open(from)
		})
	},
}

function debounce(func, wait, immediate) {
	var timeout
	return function() {
		var context = this,
			args = arguments
		var later = function() {
			timeout = null
			if (!immediate) func.apply(context, args)
		}
		var callNow = immediate && !timeout
		clearTimeout(timeout)
		timeout = setTimeout(later, wait)
		if (callNow) func.apply(context, args)
	}
}

function calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {
	var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight)
	return { width: srcWidth * ratio, height: srcHeight * ratio }
}
</script>

<style lang="scss" scoped>
.photo-page {
	height: 100%;
	overflow-y: auto;
	overflow-x: hidden;
	width: 100%;
	max-width: none;

	&:before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: fade-out(black, 0.1);
	}

	// toolbar
	&__toolbar {
		height: 80px;
		background: fade-out(black, 0.25);
		display: flex;
		align-items: center;
		padding: 0 2rem;
	}
	&__count {
		flex: 0 1 100%;
		color: white;
		z-index: 99999;
	}
	&__actions {
		flex: 0 0 auto;
		z-index: 99999;
		display: flex;
		align-items: center;

		.btn.btn-action {
			background-color: transparent;
			color: white;
			border: none;
			height: 55px;
			width: 55px;

			&:hover {
				background-color: fade-out(white, 0.9);
			}
			.small {
				font-size: 1.5rem;
			}
		}
	}

	&__main {
		height: calc(100% - 80px);
		position: relative;
		pointer-events: none;
		padding: 2rem 4rem;
	}

	// image
	&__main-img {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		pointer-events: none;
		position: relative;
		padding: 0px;
	}
	&__img {
		max-height: 100%;
		max-width: 100%;
	}

	// controls
	&__main-controls {
		position: absolute;
		top: 0;
		right: 0;
		left: 0;
		display: flex;
		height: 100%;
		z-index: 2;
		pointer-events: none;

		a {
			display: block;
			position: relative;
			display: flex;
			align-items: center;
			justify-content: center;
			text-decoration: none;
			color: white;

			&:hover {
				.i-c {
					background: fade-out(black, 0.25);
				}
			}
		}
		i {
			font-size: 2.5rem;
		}
		.i-c {
			width: 60px;
			height: 60px;
			border-radius: 50%;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.left,
		.right {
			flex: 1;
			height: 100%;
			pointer-events: auto;
		}
		.left {
			transform: translateX(-10%);
		}
		.right {
			transform: translateX(10%);
		}
		.center {
			flex: 2;
		}
	}
}
</style>