<template>
	<div class="nb-header" role="navigation" :class="[$darkClass, shadow && 'shadow']">
		<button
			class="btn btn-icon-circle flat nb nb-header__menu"
			@click="$emit('side-bar')"
			type="button"
		>
			<i class="material-icons">menu</i>
		</button>
		<div class="nb-header__logo">
			<img src="/favicon.png" height="42px" alt="nbirus" />
		</div>
		<div class="nb-header__middle"></div>
		<div class="nb-header__links">
			<router-link class="nb-header__link" to="/" exact>Home</router-link>
			<router-link class="nb-header__link" to="design">Web Design</router-link>
			<router-link class="nb-header__link" to="photography">Photography</router-link>
			<router-link class="nb-header__link" to="contact">Contact me</router-link>
		</div>
		<button class="nb-header__dark-mode btn btn-icon-circle flat nb" @click="$dark = !$dark">
			<i class="material-icons">{{ !$dark ? 'brightness_low' : 'brightness_high' }}</i>
		</button>
	</div>
</template>

<script>
import ScrollMixin from '@/mixins/ScrollMixin'

export default {
	name: 'header-bar',
	mixins: [ScrollMixin],
	computed: {
		shadow() {
			return this.$route.query.tag !== undefined || this.scroll$ > 32
		},
	},
}
</script>

<style lang="scss" scoped>
@import '@/styles/component';

.nb-header {
	background: fade-out(#fff, 0.05);
	padding: 0 2rem;
	transition: box-shadow 1s ease;

	&:not(.shadow) {
		border-bottom: solid thin var(--c-border);
	}
	&.shadow {
		box-shadow: 0 1px 3px 0 rgba(60, 64, 67, 0.1), 0 2px 14px 2px rgba(60, 64, 67, 0.2);
	}

	&__menu {
		display: none !important;
		width: 50px !important;
		height: 50px !important;

		i {
			font-size: 2.25rem;
		}
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
		text-decoration: none !important;
		font-weight: var(--thin);
		font-size: 0.9rem;
		text-decoration: underline;
		opacity: 0.75;
		letter-spacing: 1px;

		display: flex;
		align-items: center;

		&.router-link-active {
			color: var(--c-text);
			font-weight: var(--bold);
			text-decoration: none;
			opacity: 1;
			cursor: default;
		}
		&:not(:last-child) {
			margin-right: 2rem;
		}
		&:hover:not(.router-link-active) {
			color: var(--c-link);
			opacity: 1;
		}
	}
	&__dark-mode {
		margin-left: 1.5rem;
		border-radius: 50%;
		width: 40px !important;
		height: 40px !important;
		padding-top: 0.4rem;
		transition: background-color 0.1s ease, box-shadow 0.2s ease;
		outline: none;

		i {
			font-size: 1.15rem !important;
		}

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
			display: block !important;
			background-color: transparent;
		}
		&__links {
			display: none;
		}
		.nb-header__dark-mode {
			display: none !important;
		}
		&__logo {
			width: 100%;
			text-align: right;
		}
	}
}
</style>