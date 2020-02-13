<template>
	<div class="page photo-page" @click.self="close">
		<div class="photo-page__toolbar">
			<div class="photo-page__count">{{photo.name}}</div>
			<div class="photo-page__actions">
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
				<router-link class="left" :to="prevLink">
					<div class="i-c">
						<i class="material-icons">chevron_left</i>
					</div>
				</router-link>
				<div class="center"></div>
				<router-link class="right" :to="nextLink">
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
			imgMaxWidth: 'auto',
			imgMaxHeight: 'auto',
		}
	},
	computed: {
		imgStyle() {
			return {
				width: this.imgWidth,
				height: this.imgHeight,
				maxWidth: this.imgMaxWidth,
				maxHeight: this.imgMaxHeight,
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
			let cWidth = this.$refs.container.offsetWidth
			let cHeight = this.$refs.container.offsetHeight
			let iWidth = this.$refs.img.offsetWidth
			let iHeight = this.$refs.img.offsetHeight

			let hitsTop = cHeight === iHeight
			let hitsWidth = cWidth === iWidth

			if (hitsTop) {
				this.imgWidth = 'auto'
				this.imgHeight = '100%'
			} else {
				this.imgWidth = '100%'
				this.imgHeight = 'auto'
			}

			// let { w, h } = calculateAspectRatioFit(
			// 	this.$refs.img.offsetWidth,
			// 	this.$refs.img.offsetHeight,
			// 	width - (64 + 64),
			// 	window.innerHeight - (82 + 64)
			// )
			// this.imgWidth = `${w}px`
			// this.imgHeight = `${h}px`

			// let widthAuto = true
			// // if going inwards check width
			// if (width < oldWidth) {
			// 	let imgWidth = this.$refs.img.offsetWidth
			// 	let widowWidth = width - (64 + 64)

			// 	widthAuto = imgWidth <= widowWidth
			// 	console.log(widthAuto)
			// }
			// // else going outwards/expanding check height
			// else {
			// 	let widowHeight = window.innerHeight - (82 + 64)
			// 	let imgHeight = this.$refs.img.offsetHeight
			// 	widthAuto = imgHeight > widowHeight
			// }

			// if (widthAuto) {

			// } else {
			// this.imgWidth = '100%'
			// this.imgHeight = 'auto'
			// }
		},
	},
	watch: {
		$route: 'getImage',
		width$: 'onResizeEvent',
	},
	beforeRouteEnter(to, from, next) {
		next(vm => {
			vm.open(from)
		})
	},
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

		.btn.btn-action {
			background-color: transparent;
			color: white;
			border: none;
			height: 55px;
			width: 55px;

			&:hover {
				background-color: black;
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
		.center {
			flex: 3;
		}
	}
}
</style>