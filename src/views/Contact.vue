<template>
	<div class="contact page">
		<div class="container">
			<form id="contact" action method="post" @submit.prevent="onSubmit">
				<h2>Contact me</h2>
				<fieldset>
					<input v-model="name" placeholder="Your name" type="text" tabindex="1" required autofocus />
				</fieldset>
				<fieldset>
					<input v-model="email" placeholder="Your Email Address" type="email" tabindex="2" required />
				</fieldset>
				<fieldset>
					<textarea v-model="message" placeholder="Type your message here...." tabindex="5" required></textarea>
				</fieldset>
				<fieldset>
					<recaptcha
						:sitekey="capatchKey"
						type="3"
						:loadRecaptchaScript="true"
						@verify="verified = true"
					></recaptcha>
					<button
						:disabled="!verified"
						name="submit"
						type="submit"
						id="contact-submit"
						data-submit="...Sending"
					>Submit</button>
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
				.then(myJson => {
					console.log(myJson)
				})
		},
	},
}
</script>
