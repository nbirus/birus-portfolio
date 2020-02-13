<template>
	<div class="nb-app" id="app" ref="scroll" :class="$darkClass">
		<header-bar @side-bar="sideBar=true" />
		<side-bar v-model="sideBar" />
		<main class="nb-main">
			<router-view />
			<share-dialog />
		</main>
	</div>
</template>

<script>
import HeaderBar from '@/views/partials/Header'
import SideBar from '@/views/partials/SideBar'

import ShareDialog from '@/views/dialogs/ShareDialog'

export default {
	name: 'app',
	components: { HeaderBar, SideBar, ShareDialog },
	data() {
		return {
			sideBar: false,
		}
	},
	computed: {
		hideNav() {
			return this.$route.params.id
		},
	},
	watch: {
		$shareDialog(shareDialog) {
			this.$fullscreen = shareDialog
		},
		$route(to) {
			this.sideBar = false
			this.$fullscreen = to.name === 'photo'
		},
		$fullscreen(fullscreen) {
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
	position: relative;

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

@media only screen and (max-width: 768px) {
	.nb-header {
		height: var(--header-height-sm);
	}
	.nb-main {
		margin-top: var(--header-height-sm);
		min-height: calc(100vh - var(--header-height-sm));
	}
}
</style>
