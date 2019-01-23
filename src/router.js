import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home
		},
		{
			path: '/hiragana',
			name: 'hiragana',
			component: () => import('./views/Hiragana.vue')
		},
		{
			path: '/katakana',
			name: 'katakana',
			component: () => import('./views/Katakana.vue')
		},
		{
			path: '*',
			redirect: '/'
		}
	]
});
