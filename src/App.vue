<template>
	<div class="nb-app" id="app">
		<div class="nb-app__nav">
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
}
</script>

<style lang="scss" scoped>
.nb-app {
	display: flex;
	min-height: 100vh;
	padding-top: var(--space);

	&__nav {
		flex: 0 0 300px;
		border-right: solid thin var(--c-border);
	}
	&__page {
		flex: 0 1 100%;
		padding: 2rem 0 2rem var(--space);
	}
}
</style>
