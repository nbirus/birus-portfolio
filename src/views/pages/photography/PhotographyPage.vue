<template>
	<div class="page photography-page" :class="{ fullscreen: $fullscreen, tag: !!selectedTag }">
		<div class="page__header">
			<h1 class="text">{{ 'Photography' }}</h1>
			<transition name="slide-down" mode="out-in">
				<router-link
					tag="button"
					class="regular-btn back text"
					:to="{ path: 'photography' }"
					v-if="selectedTag"
				>Back to gallery</router-link>
			</transition>
		</div>
		<transition name="slide-up" mode="out-in">
			<div class="page__tag-container" v-if="$route.query.tag">
				<h1 class="text tag" v-text="tagName"></h1>
			</div>
		</transition>
		<transition name="slide-down" mode="out-in">
			<div class="page__slider" v-if="!selectedTag">
				<photography-tag-slider v-if="width > 768" @tag="tag = $event" :width="width" />
				<photography-tag-slider-mobile v-else @tag="tag = $event" />
			</div>
		</transition>
		<div class="page__gallery">
			<photography-gallery />
		</div>

		<div class="page__overlay">
			<transition name="photo" mode="out-in">
				<router-view :key="$route.params.id !== undefined" />
			</transition>
		</div>
	</div>
</template>

<script>
import tags from '@/assets/tags.json'

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
			selectedTag: undefined,
			tagName: undefined,
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
		'$route.query'(query) {
			this.selectedTag = query.tag
			if (query.tag) {
				window.scroll(0, 0)
				this.tagName = tags.find(t => query.tag === t.id).label
			}
		},
	},
}
</script>

<style lang="scss" scoped>
.page {
	padding: 0 0 4rem;
	max-width: 1400px;
	margin: 0 auto;

	&__header {
		padding: 3rem 3rem 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		transition: margin 0.45s ease;
		margin-bottom: 0;
		position: relative;

		h1 {
			transition: all 0.45s ease;
		}
		.back {
			right: 3rem;
			position: absolute;
			transform: translateY(2.5rem);
			text-decoration: none;

			&:hover {
				// text-decoration: underline;
			}
			&:active {
				// color: var(--c-blue);
			}
		}
	}
	&__tag-container {
		padding: 0 3rem;

		h1 {
			position: absolute;
		}
	}
	&__slider {
		margin: 3rem 0;
	}
	&__slider-label {
		display: block;
		margin-left: 3rem;
		font-size: 1.2rem;
		margin-bottom: 0.25rem;
	}
	&__gallery {
		padding: 0 3rem;
		position: absolute;
		top: 500px;
		margin-top: 0;
		max-width: 1400px;
		transition: top 0.45s ease-in-out, margin 0.45s ease-in-out;
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
.tag {
	.page__header {
		padding: 3rem 3rem 0;
		margin-bottom: 0.25rem;

		h1 {
			font-size: 1.15rem;
			font-weight: var(--thin);
			letter-spacing: 1px;
		}
	}
	.page__gallery {
		margin-top: 4rem;
		top: 180px;
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