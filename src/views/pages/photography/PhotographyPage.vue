<template>
	<div class="page photography-page" :class="{ fullscreen: $fullscreen }">
		<h1 class="text mb-4">Photography</h1>
		<photography-tag-slider class="mb-10" />
		<photography-gallery />

		<div class="page__overlay">
			<transition name="photo" mode="out-in">
				<router-view :key="$route.params.id" />
			</transition>
		</div>
	</div>
</template>

<script>
export default {
	name: 'photography-page',
	components: {
		PhotographyTagSlider: () => import('@/components/photography/PhotographyTagSlider'),
		PhotographyGallery: () => import('@/components/photography/PhotographyGallery'),
	},
	data() {
		return {
			scrollY: 0,
		}
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
.photography-page {
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
</style>