import {createRouter, createWebHistory} from "vue-router";

export const routes = [
    {
        path: '/',
        name: '首页',
        component: () => import('@/views/Home.vue')
    }

]
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;
