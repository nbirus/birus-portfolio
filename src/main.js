import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ProgressiveImage from 'progressive-image/dist/vue'

Vue.use(ProgressiveImage, {
	removePreview: true,
})

// styles
import './styles/main.scss'

Vue.config.productionTip = false

new Vue({
	router,
	render: h => h(App),
}).$mount('#app')
