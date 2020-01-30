<template>
	<div class="page photography-page" :class="{ fullscreen: $fullscreen }">
		<div class="page__header">
			<h1 class="text">{{ tag.label || 'Photography' }}</h1>
			<button class="regular-btn" v-if="tag.id" type="button" @click="tag = {}">Back to gallery</button>
		</div>
		<div class="page__slider" v-if="!tag.id">
			<photography-tag-slider v-if="width > 768" @tag="tag = $event" :width="width" />
			<photography-tag-slider-mobile v-else @tag="tag = $event" />
		</div>
		<div class="page__gallery">
			<photography-gallery :tag="tag.id" />
		</div>

		<div class="page__overlay">
			<transition name="photo" mode="out-in">
				<router-view :key="$route.params.id !== undefined" />
			</transition>
		</div>
	</div>
</template>

<script>
export default {
	name: 'photography-page',
	components: {
		PhotographyTagSlider: () => import('@/components/photography/PhotographyTagSlider'),
		PhotographyTagSliderMobile: () => import('@/components/photography/PhotographyTagSliderMobile'),
		PhotographyGallery: () => import('@/components/photography/PhotographyGallery'),
	},
	data() {
		return {
			width: 0,
			scrollY: 0,
			tag: {},
		}
	},
	mounted() {
		this.$nextTick(() => {
			window.addEventListener('resize', this.onResize)
			this.onResize()
		})
	},
	beforeDestroy() {
		window.removeEventListener('resize', this.onResize)
	},
	methods: {
		onResize() {
			this.width = window.innerWidth
		},
	},
	watch: {
		$route(to, from) {
			if (to.name === 'photo' && from.name === 'photography') {
				this.scrollY = window.scrollY
			} else if (to.name === 'photography' && from.name === 'photo') {
				setTimeout(() => {
					window.scroll(0, this.scrollY)
					this.scrollY = 0
				}, 1)
			}
		},
	},
}
</script>

<style lang="scss" scoped>
.page {
	padding: 1rem 0 4rem;

	&__header {
		padding: 3rem 3rem 0;
		margin-bottom: 3rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	&__slider {
		margin-bottom: 6rem;
	}
	&__slider-label {
		display: block;
		margin-left: 3rem;
		font-size: 1.2rem;
		margin-bottom: 0.25rem;
	}
	&__gallery {
		padding: 0 3rem;
	}

	&.fullscreen {
		overflow: hidden;
		height: 100vh;

		.page__overlay {
			z-index: 9999;
			display: block;
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			min-height: 100vh;
		}
	}
}
@media only screen and (max-width: 768px) {
	.page {
		&__header {
			padding: 2rem 1rem 0;
			margin-bottom: 1.5rem;
		}
		&__slider {
			width: calc(100vw);
			margin-bottom: 2.5rem;
		}
		&__gallery {
			padding: 0;
		}
	}
}
</style>