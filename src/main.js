import { createApp } from 'vue'
import App from './App.vue'
import './assets/index-js/index'
import VueApexCharts from 'vue3-apexcharts';
import trueStore from './store/trueStore';


createApp(App)
.use(trueStore)
.component('VueApexCharts', VueApexCharts)
.mount('#app')


