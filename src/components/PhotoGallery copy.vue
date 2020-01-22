<template>
	<div class="photo-gallery flexbin" id="photo-gallery">
		<router-link
			v-for="(photo, i) in photos"
			:key="i"
			tag="a"
			:to="`/photography/${photo.id}`"
			:id="photo.id"
			class="photo-gallery__link"
			:class="`delay-${i}`"
			:style="`background-color: rgb(${photo.placeholderColor})`"
			:aria-label="`Open photo ${photo.name}`"
		>
			<photo
				class="photo-gallery__img img"
				:id="`photo-${photo.id}`"
				:class="photo.aspect"
				:height="photo.height"
				:width="photo.width"
				:src="photo.url_lg"
				:placeholder="photo.url_md"
				:alt="photo.name"
				:aspect="photo.aspect"
				:backgroundColor="`rgb(${photo.placeholderColor})`"
			/>
			<!-- <lazy-img
				class="photo-gallery__img"
				:id="`photo-${photo.id}`"
				:class="photo.aspect"
				:lazySrcset="photo.url_lg"
				:alt="photo.name"
				:backgroundColor="`rgb(${photo.placeholderColor})`"
			/> -->
			<div class="photo-gallery__info">
				<span class="photo-gallery__caption" v-text="photo.name"></span>
			</div>
		</router-link>
	</div>
</template>

<script>
import photos from '@/assets/photos'
import LazyImg from '@/components/LazyImg'
import Photo from '@/components/Photo'
import { EventBus } from '@/event-bus'

export default {
	name: 'photo-gallery',
	components: { Photo, LazyImg },
	data() {
		return {
			photos: clone(photos),
		}
	},
	mounted() {
		EventBus.$on('filters', this.filterPhotos)
	},
	methods: {
		filterPhotos(filters) {
			if (filters.length === 0) {
				this.photos = clone(photos)
			} else {
				this.photos = clone(photos).filter(photo => {
					const searchString = photo.name + photo.date + photo.description
					return filters.some(filter => searchString.includes(filter))
				})
			}
		},
	},
}

function clone(obj) {
	return JSON.parse(JSON.stringify(obj))
}
</script>

<style lang="scss" scoped>
.photo-gallery {
	&__link {
		background-color: var(--c-grey1);
		cursor: pointer;
		overflow: hidden;
		transition: transform 0.25s ease;

		&:after {
			content: '';
			opacity: 0;
			transition: opacity 0.35s ease;
		}
		&:hover {
			transform: scale(1.015);

			&:after {
				content: '';
				position: absolute;
				bottom: 0;
				left: 0;
				right: 0;
				min-height: 50px;
				opacity: 1;
				pointer-events: none;
				background: rgb(0, 0, 0);
				background: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.65) 100%);
			}
		}
		&:hover .photo-gallery__info {
			margin-bottom: 0;
		}
	}
	&__info {
		position: absolute;
		z-index: 2;
		bottom: 0.5rem;
		left: 1rem;
		margin-bottom: -50px;
		transition: margin 0.35s ease;
	}
	&__caption {
		color: white;
		line-height: 1.4em;
		display: inline-block;
		max-width: 100%;
		font-size: 1rem;
		position: relative;
		pointer-events: auto;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		text-shadow: 0 0 2px rgba(0, 0, 0, 0.75);
	}
}

@for $i from 0 through 25 {
	.delay-#{$i} {
		// animation: down 0.25s + 0.2s * $i ease-in !important;
	}
}

@keyframes down {
	0% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
}
</style>
