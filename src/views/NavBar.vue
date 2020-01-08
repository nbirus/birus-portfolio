<template>
	<nav class="nb-nav">
		<div class="nb-nav__fixed">
			<div class="nb-nav__contain flex column">
				<router-link class="nb-nav__link" to="/">
					<img src="/home.svg" alt="Home" />
					<span>Home</span>
				</router-link>
				<router-link class="nb-nav__link" to="photography">
					<img src="/camera.svg" alt="Home" />
					<span>Photography</span>
				</router-link>
				<router-link class="nb-nav__link" to="design">
					<img src="/work.svg" alt="Home" />
					<span>Web Design</span>
				</router-link>
				<router-link class="nb-nav__link" to="contact">
					<img src="/contact.svg" alt="Home" />
					<span>Contact me</span>
				</router-link>

				<!-- photo gallery filters -->
				<photo-filters v-if="$route.name === 'photography' || $route.name === 'photo'"></photo-filters>
			</div>
		</div>
	</nav>
</template>

<script>
import PhotoFilters from '@/components/PhotoFilters'

export default {
	name: 'nav-bar',
	components: { PhotoFilters }
}
</script>

<style lang="scss" scoped>
.nb-nav {
	position: relative;
	width: 100%;

	&__fixed {
		position: fixed;
		width: var(--nav-width);
		padding-top: 3rem;
	}
	&__contain {
		padding: 0 1.5rem;
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

		display: flex;
		align-items: center;

		transition: background-color 0.1s ease;

		&.router-link-exact-active {
			color: var(--c-text);
			background-color: var(--c-light);
			position: relative;

			img {
				opacity: 1;
			}
		}
		&:hover {
			background-color: var(--c-grey1);
		}
		&:focus,
		&:active {
			color: var(--c-text);
			background-color: var(--c-grey2);
		}

		img {
			margin-right: 0.75rem;
			transform: scale(0.9);
			opacity: 0.65;
		}
	}
}

@media only screen and (max-width: 768px) {
	.nb-nav {
		&__fixed {
			padding-top: 1rem;
			background-color: white;
			width: 100%;
		}
		&__link {
			padding: 1rem 1.25rem;
			margin-bottom: 0.75rem;
			font-size: 1.15rem;
			letter-spacing: 1px;

			// &.router-link-exact-active:after {
			// 	content: '';
			// 	background-color: var(--c-grey3);
			// 	width: 10px;
			// 	height: 10px;
			// 	border-radius: 50%;
			// 	position: absolute;
			// 	right: 1.25rem;
			// 	margin-top: 0.25rem;
			// }
		}
	}
}
</style>
