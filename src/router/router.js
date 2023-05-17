import { createRouter, createWebHistory } from "vue-router";
import Authentication from '../components/Autentication.vue';
import Dashboard from '../components/Dashborad.vue';
import Home from '../views/Home.vue';

const routes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/login',
        component: Authentication
    },
    {
        path: '/dashboard',
        component: Dashboard,
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});


export default router;