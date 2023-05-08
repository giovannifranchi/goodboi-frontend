import { createApp } from 'vue'
import App from './App.vue'
import './assets/index-js/index'
import VueApexCharts from 'vue3-apexcharts';
import store from './store/store';
import router from './router/router';
import Toast, {POSITION} from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";




createApp(App)
.use(router)
.use(store)
.use(Toast, {position: POSITION.BOTTOM_RIGHT})
.component('VueApexCharts', VueApexCharts)
.mount('#app')


