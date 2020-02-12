<template>
	<div class="scrolling-wrapper">
		<router-link
			v-for="tag in tags"
			:key="tag.id"
			:to="{ path: 'photography', query: { tag: tag.id }}"
			tag="button"
		>
			<div class="card">
				<div class="card__img">
					<img :src="tag.src" :alt="tag.label" />
				</div>
				<div class="card__label text" v-text="tag.label"></div>
			</div>
		</router-link>
		<div class="filler"></div>
	</div>
</template>

<script>
import tags from '@/assets/tags.json'

export default {
	name: 'photography-tag-slider',
	data() {
		return {
			tags,
		}
	},
}
</script>

<style lang="scss" scoped>
@import '@/styles/component';

.scrolling-wrapper {
	display: flex;
	flex-wrap: nowrap;
	overflow-x: auto;
	-webkit-overflow-scrolling: touch;
	padding: 1rem 3rem;

	&::-webkit-scrollbar {
		display: none;
	}
	.card {
		flex: 0 0 auto;
		width: 275px;
		height: 80px;
		display: flex;
		// align-items: center;
		overflow: hidden;
		cursor: pointer;
		transition: box-shadow 0.2s ease;

		&:hover {
			box-shadow: rgba(0, 0, 0, 0.35) 0px 2px 14px;
		}

		&__img {
			width: 90px;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			overflow: hidden;

			img {
				width: auto;
				height: 110%;
			}
		}
		&__label {
			padding-left: 1.25rem;
			font-weight: var(--thin);
			text-decoration: none !important;
		}
	}
	button {
		outline: none;
		padding: 0;
		border-radius: var(--r);
		transition: box-shadow 0.25s ease;

		&:hover {
			background-color: fade-out(white, 0.9);
			box-shadow: 0 0 0 1px var(--c-blue);
		}
		&:active,
		&:focus {
			background-color: fade-out(white, 0.8);
			@include active-shadow;
		}
	}
	button:not(:last-child) {
		margin-right: 1rem;
	}
	.filler {
		position: relative;
		flex: 0 0 1rem;
		display: block;
		height: 80px;
	}
}
@media only screen and (max-width: 768px) {
	.scrolling-wrapper {
		padding: 1rem 1rem;

		.card {
			flex: 0 0 auto;
			width: 125px;
			height: 130px;
			display: flex;
			align-items: center;
			flex-direction: column;

			&__img {
				width: 110%;
				height: auto;

				img {
					width: auto;
					height: 140%;
				}
			}
			&__label {
				padding: 0.85rem 0;
				font-size: 0.9rem;
			}
		}
	}
}
</style>