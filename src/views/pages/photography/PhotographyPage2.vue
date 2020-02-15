<template>
	<div class="page photography-page" :class="pageClass">
		<!-- banner -->
		<div class="page__banner"></div>

		<!-- header -->
		<div class="page__header">
			<div class="page__title-container">
				<div class="title" v-if="!tagActive">
					<h1>Photography</h1>
				</div>
				<div class="tag-title" v-else>
					<h5 class="thin">Photography</h5>
					<h1 v-text="tag.label"></h1>
				</div>
			</div>
			<div class="page__buttons-container">
				<router-link tag="button" class="btn btn-back with-icon" to="photography" v-if="tagActive">
					<i class="material-icons">keyboard_backspace</i>Back to gallery
				</router-link>
				<button class="share-btn btn with-icon" @click="$shareDialog = true">
					<i class="material-icons">share</i>Share
				</button>
			</div>
		</div>

		<!-- slider -->
		<div class="page__slider">
			<photography-tag-slider v-if="!tagActive && !hideTags" :width="width$" />
		</div>

		<!-- gallery -->
		<div class="page__gallery">
			<photography-gallery />
		</div>

		<!-- photo -->
		<div class="page__photo-overlay">
			<router-view :key="$route.params.id !== undefined" />
		</div>
	</div>
</template>

<script>
import WidthMixin from '@/mixins/WidthMixin'
import tags from '@/assets/tags.json'

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
			tag: {},
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
			return !!this.tag.id && !this.hideTags
		},
	},
	methods: {
		setTag(selectedTag) {
			this.tag = tags.find(t => t.id === selectedTag) || {}
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
.page {
	padding: 0;

	&__banner {
		height: 0;
		background-color: var(--c-grey1);
		transition: height var(--t) ease;
	}
	&__header {
		padding: 3rem 4rem 0;
		margin-bottom: 3rem;

		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	&__title-container {
		.tag-title {
			h5 {
				margin-bottom: 0.25rem;
			}
		}
	}
	&__buttons-container {
		display: flex;
		align-items: center;

		.btn-back {
			margin-right: 0.75rem;
		}
	}
	&__slider {
		padding: 0 4rem;
		margin-bottom: 3rem;
	}
	&__gallery {
		padding: 0 4rem;
	}
}
.tag-active {
	.page {
		&__banner {
			height: 200px;
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
@media only screen and (max-width: 768px) {
	.page {
		&__banner {
			height: 0px;
		}
		&__header {
			padding: 2rem 1rem 1rem;
			margin-bottom: 0;
			flex-direction: column;
			align-items: flex-start;
		}
		&__title-container {
			order: 2;
		}
		&__buttons-container {
			justify-content: flex-end;
			order: 1;
			margin-bottom: 1.5rem;
			width: 100%;
		}
		&__slider {
			padding: 0;
			margin-bottom: 2rem;
		}
		&__gallery {
			padding: 0;
		}
	}
	.tag-active {
		.page {
			&__banner {
				height: 150px;
			}
			&__buttons-container {
				justify-content: flex-start;
			}
		}
	}
}
</style>
