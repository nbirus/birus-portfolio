<template>
	<div class="nb-app" id="app" ref="scroll">
		<div class="nb-app__actions" :class="{ hideNav }">
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
		<main class="nb-app__page" :class="{ open }">
			<router-view />
		</main>

		<transition name="fade" mode="out-in">
			<div class="nb-app__back-to-top" v-if="showBackToTop && $route.name === 'photography'">
				<button type="button" @click="backToTop">
					<img src="/arrow.svg" alt="Go to top" />
				</button>
			</div>
		</transition>
	</div>
</template>

<script>
import scrollDetect from '@/utils/ScrollDetect'
import NavBar from '@/views/NavBar'

export default {
	name: 'app',
	components: { NavBar },
	data() {
		return {
			open: false,
			showBackToTop: false,
			backToTopTimeout: undefined,
		}
	},
	mounted() {
		scrollDetect(this.onScrollUp)
	},
	computed: {
		hideNav() {
			return this.$route.params.id
		},
	},
	methods: {
		onScrollUp() {
			this.showBackToTop = true

			if (this.backToTopTimeout) {
				clearInterval(this.backToTopTimeout)
			}

			this.backToTopTimeout = setTimeout(() => {
				this.showBackToTop = false
			}, 3000)
		},
		backToTop() {
			window.scrollTo({ top: 0, behavior: 'smooth' })
		},
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
$trans: cubic-bezier(0.63, 0, 0.2, 0.99);
$blue: #2296f3;

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
	&__back-to-top {
		position: fixed;
		right: 1.5rem;
		bottom: 1.5rem;
		z-index: 99;

		button {
			background-color: fade-out(black, 0.25);
			border-radius: 50%;
			width: 60px;
			height: 60px;
			color: white;

			transition: box-shadow 0.2s ease;

			&:hover {
				background-color: fade-out(black, 0.15);
			}
			&:active,
			&:focus {
				outline: none;
				box-shadow: 0 0 0 0.3rem fade-out($blue, 0.25);
			}
		}
	}
}

@media only screen and (max-width: 768px) {
	.nb-app {
		display: block;
		overflow-x: hidden;

		&__actions {
			display: flex;
		}
		&__actions.hideNav {
			display: none;
		}
		&__nav {
			position: absolute;
			left: -100vw;
			pointer-events: none;
			opacity: 0;
			transition: all var(--transition) $trans;
		}
		&__nav.open {
			position: absolute;
			left: 0;
			right: 0;
			width: 100vw;
			height: 100vh;
			opacity: 1;
			pointer-events: auto;
		}
		&__page {
			width: 100vw;
			flex: unset;
			transform: translateX(0);
			transition: all var(--transition) $trans;
			opacity: 1;
		}
		&__page.open {
			position: static;
			transform: translateX(100vw);
			opacity: 0;
		}
	}
}
</style>
