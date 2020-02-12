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
			<div class="photo-page__main-img">
				<img
					ref="img"
					class="photo-page__img"
					:class="[{ 'width-over': width > width$ }, photo.aspect]"
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
		}
	},
	computed: {
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
				this.$nextTick(() => {
					this.width = this.$refs.img.clientWidth
				})
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
	},
	watch: {
		$route: 'getImage',
	},
	beforeRouteEnter(to, from, next) {
		next(vm => {
			vm.open(from)
		})
	},
}
</script>

<style lang="scss" scoped>
.photo-page {
	height: 100%;
	overflow-y: auto;

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
	}

	// image
	&__main-img {
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		pointer-events: none;
		position: relative;
	}
	&__img {
		height: calc(100% - 3rem);
		width: auto;
		pointer-events: auto;

		&.width-over {
			height: auto;
			width: calc(100% - 2rem);
		}
	}
	&__img.panorama {
		height: auto;
		width: calc(100% - 2rem);
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