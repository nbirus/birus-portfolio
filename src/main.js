import Vue from 'vue'
import App from './App.vue'
import router from './router'

// styles
import './styles/main.scss'

// import the plugin
// import VueGAPI from 'vue-gapi'

// create the 'options' object
// const apiConfig = {
// apiKey: '<YOUR_API_KEY>',
// clientId: '1012967258727-ojoeajtd00pchsmuaf05aqk4oh3f4o08.apps.googleusercontent.com',
// scope: 'email profile openid',
// scope: 'https://www.googleapis.com/auth/photoslibrary.readonly',
// scope: 'https://www.googleapis.com/auth/spreadsheets',
// see all available scopes here: https://developers.google.com/identity/protocols/googlescopes'
// }

// Use the plugin and pass along the configuration
// Vue.use(VueGAPI, apiConfig)

Vue.config.productionTip = false

new Vue({
	router,
	render: h => h(App),
}).$mount('#app')
