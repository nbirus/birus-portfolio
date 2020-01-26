<template>
	<div class="nb-app" id="app" ref="scroll" :class="$darkClass">
		<header-bar @side-bar="sideBar=true" />
		<side-bar v-model="sideBar" />
		<main class="nb-main">
			<router-view />
		</main>

		<!-- <div class="nb-app__actions" :class="{ hideNav }">
		<transition name="fade" mode="out-in">
			<div class="nb-app__back-to-top" v-if="showBackToTop && $route.name === 'photography'">
				<button type="button" @click="backToTop">
					<img src="/arrow.svg" alt="Go to top" />
				</button>
			</div>
		</transition>-->
	</div>
</template>

<script>
import scrollDetect from '@/utils/ScrollDetect'
import NavBar from '@/views/NavBar'
import HeaderBar from '@/views/partials/Header'
import SideBar from '@/views/partials/SideBar'

export default {
	name: 'app',
	components: { HeaderBar, SideBar, NavBar },
	data() {
		return {
			sideBar: true,
			fullscreen: false,
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
			this.sideBar = false
		},
		fullscreen(fullscreen) {
			if (fullscreen) {
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
	-webkit-font-smoothing: antialiased;
	text-rendering: optimizeLegibility;
	margin: 0;
	overflow-wrap: break-word;
	overflow-x: hidden;
	padding: 0;
	word-wrap: break-word;
	background-color: white;

	&.dark {
		background-color: var(--c-dark);
	}
}
.nb-header {
	align-items: center;
	color: #202124;
	contain: layout;
	display: flex;
	align-items: center;
	font-size: 14px;
	height: var(--header-height);
	position: fixed;
	top: 0;
	width: 100%;
	z-index: 200;
}
.nb-sidebar {
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	overflow: hidden;
	pointer-events: none;
	z-index: 300;
}
.nb-main {
	margin-top: var(--header-height);
	min-height: calc(100vh - var(--header-height));
}
</style>
