<template>
	<div>
		<h1>Sign In</h1>
		<GoogleLogin :params="params" :onSuccess="onSuccess" :onFailure="onFailure">Login</GoogleLogin>

		<button @click="getPhotos">Get Photos</button>
	</div>
</template>

<script>
import GoogleLogin from 'vue-google-login'
import googlephotos from 'googlephotos'
// import axios from 'axios'

export default {
	name: 'login',
	components: { GoogleLogin },
	data() {
		return {
			authenticated: false,
			params: {
				client_id: '1012967258727-ojoeajtd00pchsmuaf05aqk4oh3f4o08.apps.googleusercontent.com',
				scope: 'https://www.googleapis.com/auth/photoslibrary.readonly',
			},
			email: '',
			password: '',
			token: '',
		}
	},
	methods: {
		async getPhotos() {
			const photos = new googlephotos(this.token)
			const response = await photos.albums.list()

			console.log(response)
		},
		async onSuccess(googleUser) {
			console.warn('LOGIN')
			let response = await googleUser.reloadAuthResponse()
			this.token = response.access_token
			console.log('AUTH_RESPONSE', response)

			// let response = await googleUser.reloadAuthResponse()
			// this.authenticated = true
			// console.log(response)
			// const photos = await axios.get('/v1/albums', {
			// 	baseURL: 'https://photoslibrary.googleapis.com',
			// 	endpoint: '/v1/albums',
			// 	headers: {
			// 		Authorization: `Bearer ${response.access_token}`,
			// 	},
			// })
			// console.log('photos')
			// console.log(photos)
			// const photoResponse = await fetch('https://photoslibrary.googleapis.com/v1/albums')
			// const photoJson = await photoResponse.json()
			// console.log(JSON.stringify(photoJson))
			// this.$getGapiClient().then(gapi => {
			// 	console.log('gapi')
			// 	console.log(gapi.photoslibrary)
			// 	console.log(gapi.spreadsheets)
			// })
		},
		onFailure(result) {
			this.authenticated = false
			console.log('fail')
			console.log(result)
		},
	},
}
</script>
