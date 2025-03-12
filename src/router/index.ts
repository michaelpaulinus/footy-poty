import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/home-view.vue';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'Top Scorers',
			component: Home,
		},
	],
});

router.beforeEach((to, from, next) => {
	document.title = to.name?.toString() + ' | Footy POTY' || 'Footy POTY';
	next();
});

export default router;
