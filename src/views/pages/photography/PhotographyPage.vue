<template>
	<div class="page photography-page" :class="pageClass">
		<!-- banner -->
		<div class="page__banner"></div>

		<!-- header -->
		<div class="page__header">
			<div class="page__title-container">
				<h1 class="page__title">Photography</h1>
				<h1 class="page__tag-title" v-if="tagActive" v-text="activeTag.label"></h1>
			</div>
			<div class="page__button-container">
				<router-link tag="button" class="btn with-icon mr-1" v-if="tagActive" to="photography">
					<i class="material-icons">keyboard_backspace</i>Back to gallery
				</router-link>
				<button class="btn with-icon" @click="$shareDialog = true">
					<i class="material-icons">share</i>Share
				</button>
			</div>
		</div>

		<!-- body -->
		<div class="page__body">
			<div class="page__tag-container">
				<photography-tag-slider v-if="!tagActive && !hideTags" :width="width$" />
			</div>
			<div class="page__gallery">
				<photography-gallery />
			</div>
		</div>

		<!-- photo -->
		<div class="page__photo-overlay">
			<router-view :key="$route.params.id !== undefined" />
		</div>
	</div>
</template>

<script>
import tags from '@/assets/tags.json'
import WidthMixin from '@/mixins/WidthMixin'

export default {
	name: 'photography-page',
	mixins: [WidthMixin],
	components: {
		PhotographyTagSlider: () => import('@/components/photography/PhotographyTagSlider'),
		PhotographyGallery: () => import('@/components/photography/PhotographyGallery'),
	},
	data() {
		return {
			hideTags: false,
			scrollY: 0,
			activeTag: {},
		}
	},
	computed: {
		pageClass() {
			return {
				'tag-active': this.tagActive,
				'photo-active': this.$route.params.id,
			}
		},
		tagActive() {
			return !!this.activeTag.id && !this.hideTags
		},
	},
	methods: {
		setTag(selectedTag) {
			this.activeTag = tags.find(t => t.id === selectedTag) || {}
		},
	},
	watch: {
		$route(to, from) {
			// this.hideTags = to.name === 'photo' && from.query.tag !== undefined
			this.scrollY = window.scrollY
			const toPhotoCondition = to.name === 'photo' && from.name === 'photography'
			const fromPhotoCondition = to.name === 'photography' && from.name === 'photo'

			// if going to photo, maintain scroll position
			if (toPhotoCondition || fromPhotoCondition || (to.params.id && from.params.id)) {
				this.$nextTick(() => {
					window.scrollTo({ top: this.scrollY })
				})
			}

			if (to.params.id === undefined) {
				// set tag if not leaving the photo page
				if (to.query.tag !== undefined && !toPhotoCondition) {
					this.setTag(to.query.tag)
					window.scrollTo({ top: 0, behavior: 'smooth' })
				}
				if (
					to.query.tag === undefined &&
					(!toPhotoCondition || (to.name === 'photography' && from.name === 'photography'))
				) {
					this.setTag()
				}
			}
		},
	},
}
</script>

<style lang="scss" scoped>
$banner-height: 200px;
$side-pad: 4rem;

.page {
	padding: 0;
	max-width: var(--max-width);
	margin: 0 auto;

	&__banner {
		height: 0px;
		background-color: var(--c-grey1);
		transition: height var(--t) ease;
	}
	&__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 0;
		padding: 3.5rem $side-pad 0;
	}
	&__tag-title {
		display: none;
	}
	&__button-container {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	&__body {
		padding: 3rem $side-pad;
		position: relative;
	}
	&__tag-container {
		position: absolute;
		height: 275px;
		top: 3rem;
		left: 4rem;
		right: 4rem;
	}
	&__gallery {
		margin-top: 275px;
		transition: margin var(--t) ease;
	}
	&__photo-overlay {
		position: fixed;
		top: 0;
		width: 100%;
		height: 100vh;
		z-index: 999;
		pointer-events: none;
	}
}
.tag-active {
	.page {
		&__banner {
			height: $banner-height;
		}
		&__title {
			font-size: 1.35rem;
			font-weight: var(--thin);
			letter-spacing: 1px;
			margin-top: -4px;
		}
		&__tag-title {
			display: block;
			transform: translateY(0.5rem);
		}
		&__gallery {
			margin-top: 1rem;
		}
	}
}
.photo-active {
	.page {
		&__photo-overlay {
			position: fixed;
			left: 0;
			pointer-events: all;
		}
	}
}
</style>