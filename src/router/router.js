import { createRouter, createWebHistory } from "vue-router";
import Authentication from '../components/Autentication.vue';
import Dashboard from '../components/Dashboard.vue';
import Home from '../views/Home.vue';
import { mapGetters } from "vuex";
import store from '../store/store';

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

router.beforeEach((to, from, next)=>{
    const authToken = store.getters.getAuthToken;
    if(to.path === '/dashboard' && !authToken){
        next('/login');
    }else  {
        next();
    }
    if(to.path === '/login' && authToken){
        next('/dashboard');
    }else{
        next();
    }
})


export default router;