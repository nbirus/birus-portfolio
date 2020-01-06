<template>
	<ul class="photo-gallery flexbin" id="photo-gallery">
		<router-link
			v-for="(photo, i) in photos"
			:key="i"
			tag="a"
			:to="`/photography/${photo.id}`"
			:id="photo.id"
			class="photo-gallery__link"
		>
			<lazy-img
				class="photo-gallery__img"
				:class="photo.aspect"
				:lazy-src="photo.url_md"
				:lazy-srcset="photo.url_lg"
				:alt="photo.name"
			/>
			<div class="photo-gallery__info">
				<span class="photo-gallery__caption" v-text="photo.name"></span>
			</div>
		</router-link>
	</ul>
</template>

<script>
import photos from '@/assets/photos'
import LazyImg from '@/components/LazyImg'

export default {
	name: 'photo-gallery',
	components: { LazyImg },
	data() {
		return {
			photos,
		}
	},
}
</script>

<style lang="scss" scoped>
.photo-gallery {
	&__link {
		background-color: var(--c-grey1);
		cursor: pointer;
		overflow: hidden;

		&:after {
			content: '';
			opacity: 0;
			transition: opacity 0.35s ease;
		}
		&:hover {
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
				background: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.5) 100%);
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
		text-shadow: 0 0 1px rgba(0, 0, 0, 0.6);
	}
}
</style>
