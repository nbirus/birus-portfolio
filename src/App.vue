<template>
	<div class="nb-app" id="app">
		<div class="nb-app__actions">
			<div class="nb-app__actions-container">
				<button
					@click="open = !open"
					class="nb-app__actions-btn hamburger hamburger--collapse"
					:class="{ 'is-active': open }"
					type="button"
				>
					<span class="hamburger-box">
						<span class="hamburger-inner"></span>
					</span>
				</button>
			</div>
		</div>
		<div class="nb-app__nav" :class="{ open }">
			<nav-bar />
		</div>
		<div class="nb-app__page" :class="{ open }">
			<router-view v-if="!open" />
		</div>
	</div>
</template>

<script>
import NavBar from '@/views/NavBar'

export default {
	name: 'app',
	components: { NavBar },
	data() {
		return {
			open: false,
		}
	},
	watch: {
		$route() {
			this.open = false
		},
		open(open) {
			if (open) {
				document.body.classList.add('no-scroll')
			} else {
				document.body.classList.remove('no-scroll')
			}
		},
	},
}
</script>

<style lang="scss" scoped>
.nb-app {
	display: flex;
	min-height: 100vh;

	&__actions {
		display: none;
		justify-content: flex-end;
		padding: 1.5rem 1.5rem 0 0;
	}
	&__actions-btn {
		width: 70px;
		height: 70px;
		border-radius: 50%;

		&:hover {
			background-color: var(--c-grey1);
		}
		&:focus,
		&:active {
			outline: none;
			background-color: var(--c-grey3);
		}
		.hamburger-box {
			transform: scale(0.8);
		}
	}
	&__nav {
		flex: 0 0 var(--nav-width);
		border-right: solid thin var(--c-border);
	}
	&__page {
		flex: 0 1 100%;
	}
}

@media only screen and (max-width: 768px) {
	.nb-app {
		display: block;
		overflow-x: hidden;

		&__actions {
			display: flex;
		}
		&__nav {
			position: absolute;
			left: -100vw;
			pointer-events: none;
		}
		&__nav.open {
			position: absolute;
			left: 0;
			right: 0;
			width: 100vw;
			height: 100vh;

			pointer-events: auto;
			transition: left var(--transition) ease;
		}
		&__page {
			width: 100vw;
			flex: unset;
		}
	}
}
</style>
