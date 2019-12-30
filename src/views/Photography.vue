<template>
	<div class="page photography">
		<div class="page__header mb-5">
			<h2>Photography</h2>
		</div>
		<div class="page__body">
			<photo-gallery />
		</div>
	</div>
</template>

<script>
import PhotoGallery from '@/components/PhotoGallery'
export default {
	name: 'photography',
	components: { PhotoGallery },
}
</script>

<style lang="scss" scoped>
// .photography {
// padding-top: 4rem;
// }
@media only screen and (max-width: 600px) {
	.page {
		padding: 0.5rem 0 2rem;

		&__header {
			padding-left: 1rem;
		}
	}
}
</style>
