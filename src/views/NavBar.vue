<template>
	<nav class="nb-nav">
		<div class="nb-nav__fixed">
			<div class="nb-nav__contain flex column">
				<router-link class="nb-nav__link" to="/">Home</router-link>
				<router-link class="nb-nav__link" to="photography">Photography</router-link>
				<router-link class="nb-nav__link" to="design">Web Design</router-link>
				<router-link class="nb-nav__link" to="contact">Contact me</router-link>
			</div>
		</div>
	</nav>
</template>

<script>
export default {
	name: 'nav-bar',
}
</script>

<style lang="scss" scoped>
.nb-nav {
	position: relative;

	&__fixed {
		position: fixed;
		width: var(--nav-width);
	}
	&__contain {
		padding: 0 2rem;
	}
	&__link {
		color: var(--c-text-light);
		text-transform: uppercase;
		text-decoration: none;
		font-weight: var(--thin);
		padding: 0.75rem 1rem;
		margin-bottom: 0.5rem;
		border-radius: var(--br);
		font-size: 1rem;

		&.router-link-exact-active {
			color: var(--c-text);
			background-color: var(--c-light);
		}
	}
}

@media only screen and (max-width: 768px) {
	.nb-nav {
		&__fixed {
			position: absolute;
			width: 100vw;
			height: calc(100vh - 70px);
			margin-top: 70px;
			background-color: white;
		}
		&__link {
			padding: 1rem 1.25rem;
			margin-bottom: 0.75rem;
			font-size: 1.15rem;
		}
	}
}
</style>
