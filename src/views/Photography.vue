<template>
	<div class="page photography" :class="{ active: photoActive }">
		<div class="page__header mb-5">
			<h2>Photography</h2>
		</div>
		<div class="page__body">
			<div class="page__categories mb-10">
				<div class="card category" v-for="category in categories" :key="category.id">
					<div class="category__img">
						<img height="85px" :src="category.url" :alt="category.name" />
					</div>
					<div class="category__text" v-text="category.name"></div>
				</div>
			</div>
			<div class="page__gallery">
				<photo-gallery />
			</div>
		</div>
		<div class="page__overlay">
			<transition name="photo" mode="out-in">
				<router-view :key="photoActive" />
			</transition>
		</div>
	</div>
</template>

<script>
export default {
	name: 'photography',
	components: {
		PhotoGallery: () => import('@/components/PhotoGallery'),
	},
	data() {
		return {
			scrollY: 0,
			categories: [
				{
					id: 'landscapes',
					name: 'Landscapes',
					url: 'https://farm9.staticflickr.com/8389/29570394020_a50f9be15b_m.jpg',
				},
				{
					id: 'cityscapes',
					name: 'Cityscapes',
					url: 'https://farm6.staticflickr.com/5735/24018013875_dcb08102b8_m.jpg',
				},
				{
					id: 'wildLife',
					name: 'WildLife',
					url: 'https://farm2.staticflickr.com/1624/23391211893_93076c6106_m.jpg',
				},
			],
		}
	},
	computed: {
		photoActive() {
			return this.$route.params.id !== undefined
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
	&__search {
		border: solid thin var(--c-border);
		font-size: 1rem;
		padding: 0.75rem 1rem;
		text-transform: uppercase;
		font-family: 'Open Sans', sans-serif;
		letter-spacing: 1px;
		width: 225px;

		&:active,
		&:focus {
			border: solid thin var(--c-blue);
			outline: none;
			box-shadow: 0 0 0.2rem var(--c-blue);
		}
	}
	&__header {
		display: flex !important;
		align-items: center;
		justify-content: space-between;
	}
	&__overlay {
		display: none;
	}
	&__categories {
		display: flex;

		.card {
			flex: 1;
		}
	}
	&.active {
		overflow: hidden;
		height: 100vh;

		.page__overlay {
			display: block;
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			min-height: 100vh;
		}
		.page__body {
			// visibility: hidden;
		}
	}
}

.category {
	height: 75px;
	display: flex;
	align-items: center;
	overflow: hidden;

	&__img {
		flex: 0 0 30%;
		overflow: hidden;
	}
	&__text {
		flex: 0 0 70%;
		font-weight: var(--bold);
		color: var(--c-text-light);
		padding-left: 1.25rem;
	}

	&:not(:last-child) {
		margin-right: 1rem;
	}
}

@media only screen and (max-width: 600px) {
	.page {
		padding: 0.5rem 0 2rem;

		&__header {
			display: flex !important;
			align-items: center;
			justify-content: space-between;
			padding: 0 1rem;
		}
	}
}
</style>
