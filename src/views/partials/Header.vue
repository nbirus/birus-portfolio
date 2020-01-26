<template>
	<div class="nb-header" role="navigation" :class="$darkClass">
		<button class="nb-header__menu icon-btn" @click="$emit('side-bar')" type="button">
			<img src="/menu.svg" height="30px" alt="Open navigation" />
		</button>
		<div class="nb-header__logo">
			<img src="/favicon.png" height="38px" alt="Nbirus Logo" />
		</div>
		<div class="nb-header__middle"></div>
		<div class="nb-header__links">
			<router-link class="nb-header__link" to="/">Home</router-link>
			<router-link class="nb-header__link" to="design">Web Design</router-link>
			<router-link class="nb-header__link" to="photography">Photography</router-link>
			<router-link class="nb-header__link" to="contact">Contact me</router-link>
		</div>
		<button class="nb-header__dark-mode icon-btn" @click="$dark=!$dark">
			<img :src="$dark ? '/moon.svg' : '/sun.svg'" height="20px" alt="Dark Mode Toggle" />
		</button>
	</div>
</template>

<script>
export default {
	name: 'header-bar',
}
</script>

<style lang="scss" scoped>
@import '@/styles/component';

.nb-header {
	background: #fff;
	// border-bottom: solid thin var(--c-border);
	padding: 0 2rem;
	box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.3), 0 2px 6px 2px rgba(60, 64, 67, 0.15);

	&__menu {
		display: none;
		margin-right: 0.5rem;
	}
	&__middle {
		flex-grow: 1;
	}
	&__links {
		display: flex;
		align-items: center;
	}
	&__link {
		color: var(--c-text-light);
		text-transform: uppercase;
		text-decoration: none;
		font-weight: var(--thin);
		font-size: 0.9rem;
		text-decoration: underline;

		display: flex;
		align-items: center;

		&.router-link-exact-active {
			color: var(--c-text);
			font-weight: var(--bold);
			text-decoration: none;
		}
		&:not(:last-child) {
			margin-right: 2.5rem;
		}
		&:hover:not(.router-link-exact-active) {
			color: var(--c-link);
		}
	}
	&__dark-mode {
		margin-left: 1.5rem;
		border-radius: 50%;
		width: 40px;
		height: 40px;
		padding-top: 0.4rem;
		transition: background-color 0.1s ease, box-shadow 0.2s ease;
		outline: none;

		&:hover {
			background-color: var(--c-grey1);
		}
		&:active,
		&:focus {
			background-color: var(--c-grey2);
			@include active-shadow;
		}
	}
}

// dark mode
.dark {
	background-color: var(--c-dark);
	border-bottom: solid thin var(--c-border-dm);

	.nb-header {
		&__logo {
			filter: invert(1);
		}
		&__link {
			color: var(--c-text-light-dm);

			&.router-link-exact-active {
				color: var(--c-text-dm);
			}
		}
	}
}

// phone
@media only screen and (max-width: 768px) {
	.nb-header {
		padding: 0 1.5rem 0 1rem;

		&__menu {
			display: block;
		}
		&__links {
			display: none;
		}
		&__dark-mode {
			display: none;
		}
		&__logo {
			width: 100%;
			text-align: right;
		}
	}
}
</style>