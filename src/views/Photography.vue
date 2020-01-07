<template>
	<div class="page photography" :class="{ active: photoActive }">
		<!-- <transition name="fade-down" mode="out-in" appear>
			<div class="page__header mb-5">
				<h2>Photography</h2>
			</div>
		</transition> -->
		<div class="page__body">
			<transition name="fade-down" mode="out-in" appear>
				<photo-gallery />
			</transition>
		</div>

		<div class="page__overlay">
			<router-view />
		</div>

	</div>
</template>

<script>
import PhotoGallery from '@/components/PhotoGallery'
export default {
	name: 'photography',
	components: { PhotoGallery },
	computed: {
		photoActive() {
			return this.$route.params.id !== undefined
		}
	}
}
</script>

<style lang="scss" scoped>
.page {
	&__search {
		border: solid thin var(--c-border);
		font-size: 1rem;
		padding: .75rem 1rem;
		text-transform: uppercase;
		font-family: 'Open Sans', sans-serif;
		letter-spacing: 1px;
		width: 225px;

		&:active, &:focus {
			border: solid thin var(--c-blue);
			outline: none;
			box-shadow: 0 0 .2rem var(--c-blue);
		}
	}
	&__header {
		display: flex!important;
		align-items: center;
		justify-content: space-between;
	}
	&__overlay {
		display: none;
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
			visibility: hidden;
		}
	}
}

@media only screen and (max-width: 600px) {
	.page {
		padding: 0.5rem 0 2rem;

		&__header {
			display: flex!important;
			align-items: center;
			justify-content: space-between;
			padding: 0 1rem;
		}
	}
}
</style>
