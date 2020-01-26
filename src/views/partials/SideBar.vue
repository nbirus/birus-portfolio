<template>
	<div class="nb-sidebar" :class="[{open: value}, $darkClass]" @click.self="$emit('input', false)">
		<nav class="nb-sidebar__container">
			<div class="nb-sidebar__header">
				<button class="nb-sidebar__menu icon-btn" @click="$emit('input', false)" type="button">
					<img src="/close.svg" height="30px" alt="Close navigation" />
				</button>
				<button class="nb-sidebar__dark-mode icon-btn" @click="$dark=!$dark">
					<img :src="$dark ? '/moon.svg' : '/sun.svg'" height="20px" alt="Dark Mode Toggle" />
				</button>
			</div>
			<div class="nb-sidebar__links">
				<router-link class="nb-sidebar__link" to="/">Home</router-link>
				<router-link class="nb-sidebar__link" to="photography">Photography</router-link>
				<router-link class="nb-sidebar__link" to="design">Web Design</router-link>
				<router-link class="nb-sidebar__link" to="contact">Contact me</router-link>
			</div>
		</nav>
	</div>
</template>

<script>
export default {
	name: 'side-bar',
	props: ['value'],
}
</script>

<style lang="scss" scoped>
.nb-sidebar {
	&:before {
		content: '';
		display: block;
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.4);
		opacity: 0;
		will-change: opacity;
		transition: opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1);
	}
	&__container {
		position: relative;
		width: 90%;
		max-width: 268px;
		background-color: #fff;
		height: 100%;
		box-shadow: 2px 0 12px rgba(0, 0, 0, 0.4);
		transform: translateX(-110%);
		display: flex;
		flex-direction: column;
		will-change: transform;
		transition: transform 0.25s ease-in-out;
	}
	&__header {
		padding: 1rem;
		border-bottom: solid thin var(--c-border);
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: var(--header-height);
	}
	&__links {
		display: flex;
		flex-direction: column;
	}
	&__link {
		padding: 1.5rem 1.75rem;
		color: var(--c-text-light);
		text-transform: uppercase;
		text-decoration: none;
		font-weight: var(--thin);
		font-size: 0.95rem;

		display: flex;
		align-items: center;

		&.router-link-exact-active {
			color: var(--c-text);
			font-weight: var(--bold);
			text-decoration: none;
		}
		&:not(:last-child) {
			border-bottom: solid thin var(--c-border);
		}
		&:hover:not(.router-link-exact-active) {
			color: var(--c-link);
		}
	}
}
.open {
	pointer-events: auto;

	&.nb-sidebar:before {
		opacity: 1;
	}
	.nb-sidebar {
		&__container {
			transform: translateX(0%);
		}
	}
}
.dark {
	.nb-sidebar {
		&__container {
			background-color: var(--c-dark);
		}
		&__header {
			border-color: var(--c-border-dm);
		}
		&__link {
			border-color: var(--c-border-dm);
			color: var(--c-text-light-dm);
			&.router-link-exact-active {
				color: var(--c-text-dm);
			}
		}
	}
}
</style>