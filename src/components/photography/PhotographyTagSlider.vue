<template>
	<div class="contain">
		<ul class="scrolling-wrapper">
			<li
				class="scrolling-wrapper__item"
				v-for="tag in visibleTags"
				:key="tag.id"
				:class="`size-${size}`"
			>
				<button class="scrolling-wrapper__button card" @click="$emit('tag', tag)">
					<div class="scrolling-wrapper__img">
						<img :src="tag.src" :alt="tag.label" />
					</div>
					<div class="scrolling-wrapper__label text-secondary" v-text="tag.label"></div>
				</button>
			</li>
		</ul>
		<button class="icon-btn left" v-if="from > 0">
			<img class="right" src="/left.svg" alt="Slide left" />
		</button>
		<button class="icon-btn right" v-if="from + size > tags.legnth">
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
			from: 0,
			tags,
		}
	},
	computed: {
		size() {
			if (this.width > 1600) {
				return 10
			} else if (this.width > 1400) {
				return 9
			} else if (this.width > 1200) {
				return 8
			} else if (this.width > 1150) {
				return 7
			} else if (this.width > 950) {
				return 6
			} else {
				return 5
			}
		},
		to() {
			return this.from + this.size
		},
		visibleTags() {
			return clone(tags).splice(this.from, this.to)
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
		height: 135px;
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
			height: 150px;
			flex: 0 0 14.2857%;
		}
		&.size-6 {
			height: 145px;
			flex: 0 0 16.666%;
		}
		&.size-5 {
			height: 140px;
			flex: 0 0 20%;
		}
		&.size-4 {
			flex: 0 0 25%;
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
	}
	&__img {
		height: 70%;
		width: 100%;
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;

		img {
			max-width: 150%;
			max-height: 150%;
		}
	}
	&__label {
		height: 30%;
		display: flex;
		align-items: center;
		padding-left: 1rem;
		width: 100%;
		font-size: 0.9rem;
		font-weight: var(--bold);
	}
}
.contain {
	position: relative;
}
.icon-btn {
	background-color: white;
	position: absolute;
	box-shadow: 0 0 4px fade-out(black, 0.75);
	top: calc(50% - 25px);
	width: 40px !important;
	height: 40px !important;

	img {
		filter: invert(1);
	}

	&.left {
		left: 1.5rem;
	}
	&.right {
		right: 1.5rem;
	}
}
</style>