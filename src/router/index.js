import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
	{
		path: '*',
		redirect: '/',
	},
	{
		path: '/',
		name: 'home',
		component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
	},
	{
		path: '/photography',
		name: 'photography',
		component: () => import(/* webpackChunkName: "photography" */ '../views/Photography.vue'),
	},
	{
		path: '/design',
		name: 'design',
		component: () => import(/* webpackChunkName: "design" */ '../views/Design.vue'),
	},
	{
		path: '/contact',
		name: 'contact',
		component: () => import(/* webpackChunkName: "contact" */ '../views/Contact.vue'),
	},
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
})

export default router
