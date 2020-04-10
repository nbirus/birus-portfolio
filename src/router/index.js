import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}

const routes = [
	{
		path: '*',
		redirect: '/',
	},
	{
		path: '/',
		name: 'home',
		component: () => import(/* webpackChunkName: "home" */ '../views/pages/home/HomePage.vue'),
	},
	{
		path: '/photography',
		name: 'photography',
		component: () => import(/* webpackChunkName: "photography" */ '../views/pages/photography/PhotographyPage.vue'),
		children: [
			{
				path: '/photography/:id',
				name: 'photo',
				component: () => import(/* webpackChunkName: "photo" */ '../views/pages/photography/PhotoPage.vue'),
			},
		],
	},
	{
		path: '/music',
		name: 'music',
		component: () => import(/* webpackChunkName: "music" */ '../views/pages/music/MusicPage.vue'),
	},
	{
		path: '/design',
		name: 'design',
		component: () => import(/* webpackChunkName: "design" */ '../views/pages/web-design/Design.vue'),
	},
	{
		path: '/contact',
		name: 'contact',
		component: () => import(/* webpackChunkName: "contact" */ '../views/pages/contact/ContactPage.vue'),
	},
]
const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
	scrollBehavior(to, from, savedPosition) {
		let lastY = 0
		let saveScroll = to.name === 'photography' || to.name === 'photo'

		if (saveScroll) {
			lastY = window.scrollY
		}

		if (savedPosition) {
			return savedPosition
		} else {
			return { x: 0, y: saveScroll ? lastY : 0 }
		}
	},
})

export default router
