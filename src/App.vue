<template>
	<div class="nb-app" id="app">
		<div class="nb-app__nav-btn">
			<button type="button" @click="open=!open">&#9776;</button>
		</div>
		<div class="nb-app__nav" :class="{ open }">
			<nav-bar />
		</div>
		<div class="nb-app__page">
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

<style lang="scss" scoped>
.nb-app {
	display: flex;
	min-height: 100vh;
	padding-top: var(--space);

	&__nav {
		flex: 0 0 var(--nav-width);
		border-right: solid thin var(--c-border);
	}
	&__nav-btn {
		display: none;
		width: 100%;
		padding: 1rem 0;
		text-align: right;

		button {
			font-size: 1.5rem;
			margin-right: 1.5rem;
		}
	}
	&__page {
		flex: 0 1 100%;
		padding: 2rem 0 2rem var(--space);
	}
}

@media only screen and (max-width: 768px) {
	.nb-app {
		flex-direction: column;
		padding-top: 0;

		&__nav-btn {
			display: block;
		}
		&__nav:not(.open) {
			display: none;
		}
		&__nav {
			position: absolute;
		}
		&__page {
			padding: 0 var(--space-sm) 2rem;
		}
	}
}
</style>
