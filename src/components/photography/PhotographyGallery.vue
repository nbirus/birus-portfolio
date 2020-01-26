<template>
	<div class="photography-gallery" id="photography-gallery">
		<router-link
			v-for="(photo, i) in filteredPhotos"
			:key="i"
			tag="a"
			:to="`/photography/${photo.id}`"
			:id="photo.id"
			class="photography-gallery__link"
			:class="`delay-${i} ${photo.aspect}`"
			:style="`background-color: rgb(${photo.placeholderColor})`"
			:aria-label="`Open photo ${photo.name}`"
		>
			<photo
				class="photography-gallery__img"
				:id="`photo-${photo.id}`"
				:height="photo.height"
				:width="photo.width"
				:src="photo.url_lg"
				:placeholder="photo.url_md"
				:alt="photo.name"
				:aspect="photo.aspect"
				:backgroundColor="`rgb(${photo.placeholderColor})`"
			/>
			<div class="photography-gallery__info">
				<span class="photography-gallery__caption" v-text="photo.name"></span>
			</div>
		</router-link>
	</div>
</template>

<script>
import photos from '@/assets/photos'
import Photo from '@/components/Photo'

export default {
	name: 'photography-gallery',
	components: { Photo },
	props: {
		tag: {
			type: String,
			default: '',
		},
	},
	computed: {
		filteredPhotos() {
			if (this.tags === '') {
				return photos
			}
			return clone(photos).filter(photo => {
				const searchString = photo.name + photo.date + photo.description
				return searchString.includes(this.tag)
			})
		},
	},
}

function clone(obj) {
	return JSON.parse(JSON.stringify(obj))
}
</script>

<style lang="scss">
.photography-gallery {
	display: grid;
	grid-gap: 2rem;
	grid-template-columns: repeat(3, 1fr);
	grid-template-rows: 300px;
	grid-auto-flow: row;

	&__link {
		height: 300px;
		background-color: var(--c-grey1);
		cursor: pointer;
		overflow: hidden;
		transition: transform 0.25s ease;
		position: relative;
		border-radius: var(--r);

		&.panorama {
			grid-column: span 3;
			height: 200px;
		}

		&:after {
			content: '';
			opacity: 0;
			transition: opacity 0.35s ease;
			z-index: 1;
		}
		&:hover {
			img {
				transform: scale(1.05);
			}

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
				background: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.75) 100%);
			}
		}
		&:hover .photography-gallery__info {
			margin-bottom: 0;
			opacity: 1;
		}
	}
	&__info {
		position: absolute;
		z-index: 2;
		bottom: 0.5rem;
		left: 1rem;
		margin-bottom: -50px;
		transition: margin 0.35s ease;
		opacity: 0;
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

@media (max-width: var(--screen-tablet)) {
}
@media only screen and (max-width: 768px) {
	.photography-gallery {
		grid-template-columns: repeat(1, 1fr);
		grid-gap: 1rem;

		&__link {
			border-radius: 0;

			&.panorama {
				grid-column: span 1;
				height: 100px;

				img {
					height: 100px;
					width: 100%;
				}
			}
		}
	}
}

@for $i from 0 through 25 {
	.delay-#{$i} {
		animation: down 0.25s + 0.2s * $i ease-in !important;
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
