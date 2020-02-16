<template>
	<div class="contain">
		<ul class="scrolling-wrapper">
			<li
				class="scrolling-wrapper__item"
				v-for="tag in visibleTags"
				:key="`tag-${tag.id}`"
				:class="`size-${size}`"
			>
				<router-link
					tag="button"
					:to="{ path: 'photography', query: { tag: tag.id }}"
					class="scrolling-wrapper__button card"
					@click="$emit('tag')"
				>
					<div class="scrolling-wrapper__img">
						<!-- <img :src="tag.src" :alt="tag.label" /> -->
					</div>
					<div class="scrolling-wrapper__label text" v-text="tag.label"></div>
				</router-link>
			</li>
			<li class="after"></li>
		</ul>
		<button class="btn btn-icon-circle left" v-if="from > 0" @click="prevPage">
			<i class="material-icons">chevron_left</i>
		</button>
		<button class="btn btn-icon-circle right" v-if="to < tags.length" @click="nextPage">
			<i class="material-icons">chevron_right</i>
		</button>
	</div>
</template>

<script>
import tags from '@/assets/tags.json'

export default {
	name: 'photography-tag-slider',
	props: ['width'],
	data() {
		return {
			page: 0,
			from: 0,
			tags,
		}
	},
	computed: {
		size() {
			if (this.width < 768) {
				return tags.length
			} else if (this.width > 2000) {
				return 7
			} else if (this.width > 1300) {
				return 6
			} else if (this.width > 1150) {
				return 5
			} else if (this.width > 975) {
				return 4
			} else {
				return 3
			}
		},
		to() {
			return this.from + this.size
		},
		visibleTags() {
			return clone(tags).slice(this.from, this.to)
		},
	},
	methods: {
		prevPage() {
			this.page--
			this.from = this.size * this.page
		},
		nextPage() {
			this.page++
			this.from = this.size * this.page
		},
	},
}

function clone(o) {
	return JSON.parse(JSON.stringify(o))
}
</script>

<style lang="scss" scoped>
@import '@/styles/component';

.scrolling-wrapper {
	display: flex;
	flex-wrap: nowrap;

	&__item {
		height: 200px;
		padding: 0 0.75rem;

		&.size-10 {
			flex: 0 0 10%;
		}
		&.size-9 {
			flex: 0 0 11.111%;
		}
		&.size-8 {
			flex: 0 0 12.5%;
		}
		&.size-7 {
			height: 200px;
			flex: 0 0 14.2857%;
		}
		&.size-6 {
			height: 200px;
			flex: 0 0 16.666%;
		}
		&.size-5 {
			height: 200px;
			flex: 0 0 20%;
		}
		&.size-4 {
			height: 220px;
			flex: 0 0 25%;
		}
		&.size-3 {
			height: 220px;
			flex: 0 0 33.333%;
		}
		&:last-child {
			padding-right: 0;
		}
		&:first-child {
			padding-left: 0;
		}
	}
	&__button {
		width: 100%;
		height: 100%;
		padding: 0;
		overflow: hidden;
		border: none;
		transition: box-shadow 0.1s ease;
		cursor: pointer;
		background-color: #fff;

		&:hover {
			box-shadow: 0px 3px 12px rgba(0, 0, 0, 0.25);
		}
		&:active,
		&:focus {
			outline: none;
			box-shadow: 0 0 0 3px var(--c-blue);
		}
	}
	&__img {
		height: 75%;
		width: 100%;
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: var(--c-grey1);

		img {
			background-color: lightgrey;
		}
	}
	&__label {
		height: 25%;
		display: flex;
		align-items: center;
		padding-left: 1.25rem;
		width: 100%;
		font-size: 1rem;
		font-weight: var(--thin);
	}
}
.contain {
	position: relative;
}
.btn-icon-circle {
	position: absolute;
	top: calc(50% - 25px);

	&.left {
		left: -1.5rem;
	}
	&.right {
		right: -0.75rem;
	}
}
@media only screen and (max-width: 768px) {
	.scrolling-wrapper {
		display: flex;
		flex-wrap: nowrap;
		overflow-x: auto;
		-webkit-overflow-scrolling: touch;
		padding: 1rem 1.5rem;

		.after {
			min-width: 1.5rem;
			height: 100px;
			position: relative;
		}

		&__item {
			height: 120px;
			flex: 0 0 135px;
			padding: 0 0.5rem;
		}
		&__img {
			height: 70%;
		}
		&__label {
			height: 30%;
			padding-left: 0.75rem;
			font-size: 0.9rem;
			text-overflow: ellipsis;
			white-space: nowrap;
			overflow: hidden;
		}
	}
}

.dark {
	.scrolling-wrapper {
		&__img {
			background-color: var(--c-grey7);
		}
		&__button {
			background-color: var(--c-grey8);
		}
	}
}
</style>
