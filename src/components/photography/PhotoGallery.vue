<template>
	<ul class="photo-gallery">
		<li class="photo-gallery__box" v-for="(photo, i) in photos" :key="i">
			<figure class="photo-gallery__figure">
				<router-link :to="`/photography/${photo.id}`" class="photo-gallery__link">
					<div class="photo-gallery__img-container">
						<img
							class="photo-gallery__img"
							v-progressive="photo.url_big"
							:src="photo.url_med"
							alt="Image 1"
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

export default {
	name: 'photo-gallery',
	data() {
		return {
			photos,
		}
	},
}
</script>

<style lang="scss" scoped>
.photo-gallery {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
	grid-auto-rows: 300px;
	grid-gap: 1em;
	grid-gap: 0.5rem;

	&__box {
		width: 100%;
		height: 100%;
		position: relative;
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
	}
	&__img {
		height: 100%;
		width: 100%;
	}
	&__link {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;

		display: flex;
		align-items: center;
		justify-content: center;
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

@media only screen and (max-width: 768px) {
	.photo-gallery {
		grid-template-columns: repeat(1, 1fr);
		grid-template-rows: repeat(8, 50vw);
		grid-gap: 1rem;
	}
}
</style>
