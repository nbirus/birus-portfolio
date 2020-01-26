<template>
	<div class="contact page">
		<div class="container">
			<!-- prettier-ignore -->
			<form id="contact" ref="form" action method="post" @submit.prevent="onSubmit">
				<h2 class="mb-5">Contact me</h2>

				<!-- name -->
				<fieldset class="input-field mb-3">
					<label for="name">Name</label>
					<input id="name" type="text" class="sm" v-model="name" tabindex="1" required autofocus />
				</fieldset>

				<!-- email -->
				<fieldset class="input-field mb-3">
					<label for="email">Email Address</label>
					<input ref="email" id="email" type="email" class="sm" v-model="email" tabindex="2" required />
				</fieldset>

				<!-- message -->
				<fieldset class="input-field mb-4">
					<label for="message">Message</label>
					<textarea id="message" class="lg" v-model="message" tabindex="3" required />
				</fieldset>

				<fieldset>
					<recaptcha
						tabindex="4"
						class="mb-3"
						:sitekey="capatchKey"
						type="3"
						:loadRecaptchaScript="true"
						@verify="verified = true"
					></recaptcha>
					<button
						tabindex="5"
						:disabled="sending"
						:class="{disabled: sending}"
						id="contact-submit"
						class="button btn-reg"
						name="submit"
						type="submit"
					>
						<img src="/send.svg" alt="Home" />
						<span>{{!sending ? 'Send Message' : 'Sending message...'}}</span>
					</button>
				</fieldset>
			</form>
		</div>
	</div>
</template>

<script>
const capatchKey = '6LcV6cwUAAAAAD2GR6ba2LpowuES-TUYve1bbuzy'
export default {
	name: 'contact-page',
	components: {
		recaptcha: () => import('vue-recaptcha'),
	},
	data() {
		return {
			name: '',
			email: '',
			message: '',
			verified: false,
			sending: false,
			capatchKey,
		}
	},
	mounted() {
		this.$refs.email.onblur = () => {
			this.$refs.form.reportValidity()
		}
	},
	methods: {
		onSubmit() {
			this.sending = true
			fetch('https://nbirus-portfolio-api.herokuapp.com/', {
				method: 'post',
				body: JSON.stringify({
					name: this.name,
					email: this.email,
					message: this.message,
				}),
			})
				.then(response => {
					return response.json()
				})
				.then(() => {
					alert('Your message has been sent!')
				})
				.catch(e => {
					alert(e)
				})
				.finally(() => {
					this.sending = false
				})
		},
	},
}
</script>

<style lang="scss">
#contact-submit {
	display: flex;
	align-items: center;
	img {
		margin-right: 0.5rem;
	}
}
</style>
