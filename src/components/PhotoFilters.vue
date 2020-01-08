<template>
		<div class="mb-5">
				<transition name="fade" appear mode="out-in">
					<hr class="mb-5" />
				</transition>
				<transition name="fade-down-left" appear mode="out-in">
				<div class="photo-filters">
					<span class="text">Filter photos</span>
					<div role="group" aria-labelledby="id-group-label">
						<ul class="checkboxes">
							<li v-for="filter in filters" :key="filter">
								<div
									class="checkbox text"
									:class="{ active: activeFilters.some(f => f === filter) }"
									role="checkbox"
									:aria-checked="activeFilters.some(f => f === filter) ? 'true' : 'false'"
									tabindex="0"
									v-text="filter"
									@click="toggle(filter)"
									@keydown.space.prevent="toggle(filter)"
								></div>
							</li>
						</ul>
					</div>
				</div>
			</transition>
		</div>
</template>

<script>
import { EventBus } from '@/event-bus.js'

export default {
	name: 'photo-filters',
	data() {
		return {
			filters: ['Croatia', 'Japan', 'Landscape', 'City', 'Patagonia', 'Woods', 'Ocean', 'Stars'],
			activeFilters: [],
		}
	},
	methods: {
		toggle(name) {
			if (this.activeFilters.some(f => f === name)) {
				const index = this.activeFilters.indexOf(name)
				if (index > -1) {
					this.activeFilters.splice(index, 1)
				}
			} else {
				this.activeFilters.push(name)
			}
		},
	},
	watch: {
		activeFilters: {
			handler(filters) {
				EventBus.$emit('filters', filters)
			},
			deep: true,
		},
	},
}
</script>

<style lang="scss" scoped>
.photo-filters {
	padding: 0;

	span {
		font-weight: var(--bold);
		font-size: .9rem;
		text-transform: uppercase !important;
	}
	ul {
		margin: 1.5rem 0 0;
		padding: 0;
	}
	li {
		height: 40px;
		margin-bottom: 0.5rem;
	}
	.checkbox {
		width: 100%;
		height: 100%;
		padding: 0 .75rem;
		text-transform: uppercase;
		letter-spacing: 1px;
		font-size: 0.9rem;

		cursor: pointer;
		border: solid thin var(--c-border-light);
		border-radius: 3px;
		display: flex;
		align-items: center;

		&:before,
		&:after {
			margin-left: 86%;
		}
		&:hover {
			border: solid thin fade-out(#2296f3, .5)!important;
			background-color: fade-out(#2296f3, .95);
		}
		&:focus {
			box-shadow: 0 0 0 0.2rem fade-out(#2296f3, .75);
			border: solid thin fade-out(#2296f3, .25)!important;

			&:before {
				border-color: fade-out(#2296f3, .75);
			}
		}
		&.active {
			border: solid thin fade-out(#2296f3, .75);
			background-color: fade-out(#2296f3, .99);
			color: darken(#2296f3, 10);
		}
	}
}
</style>
