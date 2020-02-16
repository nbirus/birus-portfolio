<template>
	<div class="page photo-page">
		<div class="photo-page__toolbar">
			<div class="photo-page__count">
				<div class="name" v-text="photo.name"></div>
				<div class="location" v-text="photo.location"></div>
			</div>
			<div class="photo-page__actions">
				<button
					id="info"
					class="btn btn-icon-circle btn-action flat"
					title="More Information"
					@click="infoDialog = true"
				>
					<i class="material-icons small">info</i>
				</button>
				<button
					id="download"
					class="btn btn-icon-circle btn-action flat"
					title="Download"
					@click="download"
				>
					<i class="material-icons small">open_in_new</i>
				</button>
				<button
					id="share"
					class="btn btn-icon-circle btn-action flat"
					title="Share Image"
					@click="$shareDialog = true"
				>
					<i class="material-icons small">share</i>
				</button>
				<button
					id="fullscreen"
					class="btn btn-icon-circle btn-action flat"
					title="Go Fullscreen"
					@click="isExpanded = !isExpanded"
				>
					<i class="material-icons">{{ isExpanded ? 'fullscreen_exit' : 'fullscreen' }}</i>
				</button>
				<button
					id="close"
					class="btn btn-icon-circle btn-action flat"
					title="Close Image"
					@click="close"
				>
					<i class="material-icons">close</i>
				</button>
			</div>
		</div>
		<div class="photo-page__main">
			<div class="photo-page__main-img" ref="container">
				<img
					v-if="photo.urls"
					ref="img"
					class="photo-page__img"
					:class="photo.aspect"
					:style="imgStyle"
					:src="photo.urls.Large.source"
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

		<information-dialog v-model="infoDialog" :photo="photo" />
	</div>
</template>

<script>
import Photo from '@/components/Photo'
import { expand, close } from '@/utils/Expand'
import photos from '@/assets/photos'
import WidthMixin from '@/mixins/WidthMixin'
import InformationDialog from '@/views/dialogs/InformationDialog'

export default {
	name: 'photo-page',
	mixins: [WidthMixin],
	components: { InformationDialog, Photo },
	data() {
		return {
			isExpanded: false,
			infoDialog: false,
			lastTag: '',
			photo: {},
			photoIndex: 0,
			photosLength: 0,
			width: 0,
			imgWidth: '100%',
			imgHeight: 'auto',
		}
	},
	computed: {
		imgStyle() {
			return {
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
		photoLength() {
			return photos.length
		},
	},
	mounted() {
		this.setEscKey()
		this.getImage()
		this.dOnResize = debounce(this.onResizeEvent, 100)
		this.setEscKey()
		this.photosLength = photos.length
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
			if (this.isExpanded) {
				close()
			}
			if (this.lastTag) {
				this.$router.push(`/photography?tag=${this.lastTag}`)
			} else {
				this.$router.push('/photography')
			}
		},
		download() {
			var link = document.createElement('a')
			link.download = 'name.jpg'
			link.href = this.photo.urls.Original.source
			link.target = '_blank'
			document.body.appendChild(link)
			link.click()
			document.body.removeChild(link)
		},
		onResizeEvent() {
			let maxWidth = this.photo.width
			let maxHeight = this.photo.height
			let cWidth = this.$refs.container.offsetWidth
			let cHeight = this.$refs.container.offsetHeight
			let isStretchingH = maxWidth < cWidth
			let isStretchingV = maxHeight < cHeight

			if (this.photo.aspect === 'v') {
				if (isStretchingV) {
					this.imgWidth = '100%'
					this.imgHeight = 'auto'
				} else {
					this.imgWidth = 'auto'
					this.imgHeight = '100%'
				}
			} else if (this.photo.aspect === 'h') {
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
		isExpanded(isExpanded) {
			if (isExpanded) {
				expand(this.$refs.expand).$el
			} else {
				close()
			}
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
@import '@/styles/component';

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
		background-color: fade-out(black, 0.15);
		animation: fade-in 0.4s ease;
	}

	// toolbar
	&__toolbar {
		height: 80px;
		background: fade-out(black, 0.25);
		display: flex;
		align-items: center;
		padding: 0 2rem;
		animation: slide-down 0.6s ease;
	}
	&__count {
		flex: 0 1 100%;
		color: white;
		z-index: 99999;

		.name {
			margin-bottom: 0.35rem;
		}
		.location {
			font-size: 0.9rem;
			opacity: 0.5;
		}
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
			margin-left: 0.35rem;

			&:hover {
				background-color: fade-out(white, 0.9);
			}
			&:focus,
			&:active {
				background: fade-out(white, 0.8);
			}
			.small {
				font-size: 1.5rem;
			}
		}
	}

	// main
	&__main {
		height: calc(100% - 80px);
		position: relative;
		pointer-events: none;
		padding: 2rem 4rem;
	}
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
		animation: pop-in 0.3s ease;
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

			&:hover .i-c {
				background: fade-out(white, 0.75);
			}
			&:active .i-c {
				background: fade-out(white, 0.65);
				@include active-shadow;
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
			transition: box-shadow 0.2s ease, background-color 0.3s ease;
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

@media only screen and (max-width: 768px) {
	#download,
	#fullscreen {
		display: none;
	}
	.photo-page {
		&__main {
			height: calc(100% - 80px);
			position: relative;
			pointer-events: none;
			padding: 1rem;
		}
		&__toolbar {
			padding: 0 1rem;
		}
	}
}

@keyframes fade-in {
	0% {
		background-color: fade-out(black, 1);
	}
	100% {
		background-color: fade-out(black, 0.15);
	}
}
@keyframes slide-down {
	0% {
		transform: translateY(-80px);
	}
	100% {
		transform: translateY(0px);
	}
}
@keyframes pop-in {
	0% {
		transform: scale(0.75);
	}
	100% {
		transform: scale(1);
	}
}
</style>
