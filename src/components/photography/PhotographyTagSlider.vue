<template>
	<div class="scrolling-wrapper">
		<router-link :to="`photography/${tag.id}`" v-for="tag in tags" :key="tag.id">
			<div class="card">
				<div class="card__img">
					<img :src="tag.src" :alt="tag.label" />
				</div>
				<div class="card__label text-secondary" v-text="tag.label"></div>
			</div>
		</router-link>
	</div>
</template>

<script>
export default {
	name: 'photography-tag-slider',
	data() {
		return {
			tags: [
				{
					id: 'landscapes',
					label: 'Landscapes',
					src: 'https://farm6.staticflickr.com/5718/29570398080_d757d18eb0_m.jpg',
				},
				{
					id: 'japan',
					label: 'Japan',
					src: 'https://farm8.staticflickr.com/7561/26908723540_5e99cb8bcf_m.jpg',
				},
				{
					id: '',
					label: 'Cityscapes',
					src: 'https://farm2.staticflickr.com/1618/25576813036_58ba279588_m.jpg',
				},
				{
					id: '',
					label: 'Chile',
					src: 'https://farm6.staticflickr.com/5718/29570398080_d757d18eb0_m.jpg',
				},
				{
					id: '',
					label: 'Patagonia',
					src: 'https://farm6.staticflickr.com/5718/29570398080_d757d18eb0_m.jpg',
				},
				{
					id: '',
					label: 'Peru',
					src: 'https://farm6.staticflickr.com/5718/29570398080_d757d18eb0_m.jpg',
				},
			],
		}
	},
}
</script>

<style lang="scss" scoped>
.scrolling-wrapper {
	display: flex;
	flex-wrap: nowrap;
	overflow-x: auto;
	-webkit-overflow-scrolling: touch;
	padding: 12px;
	margin-left: -12px;

	&::-webkit-scrollbar {
		display: none;
	}
	.card {
		flex: 0 0 auto;
		width: 250px;
		height: 70px;
		display: flex;
		align-items: center;
		overflow: hidden;
		cursor: pointer;
		transition: box-shadow 0.2s ease;

		&:hover {
			box-shadow: rgba(0, 0, 0, 0.35) 0px 2px 14px;
		}

		&__img {
			width: 70px;
			height: 100%;
			overflow: hidden;
			display: flex;
			align-items: center;
			justify-content: center;

			img {
				width: auto;
				height: 100%;
			}
		}
		&__label {
			padding-left: 1rem;
			font-weight: var(--bold);
		}

		&:not(:last-child) {
			margin-right: 1rem;
		}
	}
}
</style>