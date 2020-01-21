import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ProgressiveImage from 'progressive-image/dist/vue'

Vue.use(ProgressiveImage, {
	scale: true,
})

// styles
import './styles/main.scss'

// favicon
let favicon = document.querySelector('#fav')
if (favicon && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
	favicon.href = '/favicon.dark.png'
}

Vue.config.productionTip = false

new Vue({
	router,
	render: h => h(App),
}).$mount('#app')
