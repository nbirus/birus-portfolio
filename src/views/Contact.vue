<template>
	<div class="contact page">
		<div class="container">
			<!-- prettier-ignore -->
			<form id="contact" action method="post" @submit.prevent="onSubmit">
				<h2 class="mb-5">Contact me</h2>

				<!-- name -->
				<fieldset class="input-field mb-3">
					<label for="name">Name</label>
					<input id="name" type="text" class="sm" v-model="name" tabindex="1" required autofocus />
				</fieldset>

				<!-- email -->
				<fieldset class="input-field mb-3">
					<label for="email">Email Address</label>
					<input id="email" type="email" class="sm" v-model="email" tabindex="2" required />
				</fieldset>

				<!-- message -->
				<fieldset class="input-field mb-4">
					<label for="message">Message</label>
					<textarea id="message" class="lg" v-model="message" tabindex="3" required />
				</fieldset>

				<fieldset>
					<recaptcha
						class="mb-3"
						:sitekey="capatchKey"
						type="3"
						:loadRecaptchaScript="true"
						@verify="verified = true"
					></recaptcha>
					<button
						:disabled="!verified"
						class="button"
						:class="{disabled: !verified}"
						name="submit"
						type="submit"
						id="contact-submit"
						data-submit="...Sending"
					>Send Message</button>
				</fieldset>
			</form>
		</div>
	</div>
</template>

<script>
const capatchKey = '6LcV6cwUAAAAAD2GR6ba2LpowuES-TUYve1bbuzy'
export default {
	name: 'contact',
	components: {
		recaptcha: () => import('vue-recaptcha'),
	},
	data() {
		return {
			name: '',
			email: '',
			message: '',
			verified: false,
			capatchKey,
		}
	},
	methods: {
		onSubmit() {
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
					alert('MESSAGE SENT')
				})
				.catch(e => {
					alert(e)
				})
		},
	},
}
</script>
