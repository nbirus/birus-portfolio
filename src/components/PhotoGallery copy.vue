<template>
	<ul class="photo-gallery">
		<li class="photo-gallery__box" v-for="(photo, i) in photos" :key="i">
			<figure class="photo-gallery__figure">
				<router-link :to="`/photography/${photo.id}`" class="photo-gallery__link">
					<div class="photo-gallery__img-container">
						<lazy-img
							class="photo-gallery__img"
							:class="photo.aspect"
							:lazy-src="photo.url_md"
							:lazy-srcset="photo.url_lg"
							:alt="photo.name"
						/>
					</div>
				</router-link>
				<div class="photo-gallery__info">
					<span class="photo-gallery__caption" v-text="photo.name"></span>
				</div>
			</figure>
		</li>
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
	&__figure {
		background-color: var(--c-grey1);
		cursor: pointer;
		position: relative;
		overflow: hidden;

		display: flex;
		align-items: center;
		justify-content: center;

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
				background: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.6) 100%);
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

@media only screen and (min-width: 768px) {
	.photo-gallery {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(275px, 1fr));
		grid-auto-rows: minmax(10px, 300px);
		grid-gap: 1.25rem;

		&__box {
			position: relative;
		}
		&__link {
			width: 100%;
			height: 100%;
		}
		&__figure {
			width: 100%;
			height: 100%;
			background-color: var(--c-grey1);
			cursor: pointer;
			position: relative;
			overflow: hidden;

			display: flex;
			align-items: center;
			justify-content: center;

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
					background: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.6) 100%);
				}
			}
			&:hover .photo-gallery__info {
				margin-bottom: 0;
			}
		}
		&__img-container {
			position: relative;
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		&__img {
			height: 100%;
			width: auto;

			&.vertical {
				width: 100%;
				height: auto;
			}
		}
	}
}
@media only screen and (max-width: 768px) {
	.photo-gallery {
		display: grid;
		grid-template-columns: repeat(1, minmax(275px, 1fr));
		grid-gap: 0.5em;

		&__img {
			width: 100%;
			height: 100%;
		}
	}
}
</style>
