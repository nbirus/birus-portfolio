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
					:to="{ path: 'photography', query: { tag: tag.id }}"
					tag="button"
					class="scrolling-wrapper__button card"
					@click="$emit('tag', tag)"
				>
					<div class="scrolling-wrapper__img">
						<!-- <img :src="tag.src" :alt="tag.label" /> -->
					</div>
					<div class="scrolling-wrapper__label text" v-text="tag.label"></div>
				</router-link>
			</li>
		</ul>
		<button class="icon-btn left" v-if="from > 0" @click="prevPage">
			<img class="right" src="/left.svg" alt="Slide left" />
		</button>
		<button class="icon-btn right" v-if="to < tags.length" @click="nextPage">
			<img class="right" src="/right.svg" alt="Slide right" />
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
			if (this.width > 2000) {
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
	padding: 0 3rem;

	&__item {
		height: 200px;
		padding: 0 0.5rem;

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
		transition: box-shadow 0.25s ease;

		&:hover {
			box-shadow: 0px 2px 18px rgba(0, 0, 0, 0.35);
		}
		&:active {
			outline: none;
			@include active-shadow;
		}
	}
	&__img {
		height: 75%;
		width: 100%;
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
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
.icon-btn {
	background-color: white;
	position: absolute;
	box-shadow: 0 1px 6px fade-out(black, 0.5);
	top: calc(50% - 25px);
	width: 40px !important;
	height: 40px !important;

	img {
		filter: invert(1);
		transform: scale(1.4);
	}

	&:hover {
		box-shadow: 0 2px 12px fade-out(black, 0.45);
	}
	&:active {
		border: solid thin var(--c-blue);
		box-shadow: 0 1px 4px fade-out(black, 0.45);
	}
	&:focus {
		border: solid thin var(--c-blue);
	}

	&.left {
		left: 1.5rem;
	}
	&.right {
		right: 1.5rem;
	}
}
</style>