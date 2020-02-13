import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueProgressiveImage from 'vue-progressive-image'
Vue.use(VueProgressiveImage)

// styles
import './styles/main.scss'

// dark mode
let favicon = document.querySelector('#fav')
let isDark =
	favicon && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
favicon.href = isDark ? '/favicon.dark.png' : '/favicon.png'
Vue.config.productionTip = false

// create reactive dark mode property
let globalData = new Vue({
	data: {
		// $dark: isDark
		$dark: false,
		$fullscreen: false,
		$shareDialog: false,
	},
})
Vue.mixin({
	computed: {
		$darkClass() {
			return {
				dark: globalData.$data.$dark,
			}
		},
		$dark: {
			get() {
				return globalData.$data.$dark
			},
			set(dark) {
				globalData.$data.$dark = dark
			},
		},
		$fullscreen: {
			get() {
				return globalData.$data.$fullscreen
			},
			set(fullscreen) {
				globalData.$data.$fullscreen = fullscreen
			},
		},
		$shareDialog: {
			get() {
				return globalData.$data.$shareDialog
			},
			set(shareDialog) {
				globalData.$data.$shareDialog = shareDialog
			},
		},
	},
})

new Vue({
	router,
	render: h => h(App),
}).$mount('#app')
