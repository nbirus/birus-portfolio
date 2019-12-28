<template>
	<div class="page photography">
		<div class="page__header mb-4">
			<h2>Photography</h2>
		</div>
		<div class="page__body">
			<photo-gallery />
		</div>
	</div>
</template>

<script>
import PhotoGallery from '@/components/photography/PhotoGallery'
export default {
	name: 'photography',
	components: { PhotoGallery },
}
</script>

<style lang="scss" scoped>
.photography {
	// padding-top: 4rem;
}
</style>
