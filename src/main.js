import { createApp } from 'vue'
import App from './App.vue'
import './assets/index-js/index'
import VueApexCharts from 'vue3-apexcharts';
import store from './store/store';
import router from './router/router';


createApp(App)
.use(router)
.use(store)
.component('VueApexCharts', VueApexCharts)
.mount('#app')


