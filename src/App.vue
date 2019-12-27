<template>
	<div class="nb-app" id="app">
		<div class="nb-app__nav-btn">
			<button
				@click="open = !open"
				class="hamburger hamburger--collapse"
				:class="{ 'is-active': open }"
				type="button"
			>
				<span class="hamburger-box">
					<span class="hamburger-inner"></span>
				</span>
			</button>

			<!-- <button type="button" @click="open=!open">&#9776;</button> -->
		</div>
		<div class="nb-app__nav" :class="{ open }">
			<nav-bar />
		</div>
		<div class="nb-app__page" :class="{ open }">
			<router-view />
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

<style lang="scss">
.nb-app {
	display: flex;
	min-height: 100vh;

	&__nav-btn {
		display: none;
		width: auto;
		height: 50px;
		padding: 1.5rem 0 0;

		button {
			width: 42px;
			height: 42px;
			padding: 0;
			position: absolute;
			right: 2rem;

			.hamburger-box {
				transform: scale(0.8);
			}

			&:focus {
				outline: none;
			}
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

		&__nav-btn {
			display: block;
			width: 100vw;
		}
		&__nav {
			position: absolute;
			left: -100vw;
			pointer-events: none;
		}
		&__nav.open {
			position: absolute;
			left: 0;
			pointer-events: auto;
			transition: left var(--transition) ease;
		}
		&__page {
			flex: unset;
			transition: all var(--transition) ease;
			width: 100vw;
		}
		&__page.open {
			margin-left: 100vw;
			position: absolute;
		}
	}
}
</style>
