import { createApp } from 'vue'
import App from './App.vue'
import './assets/index-js/index'
import VueApexCharts from 'vue3-apexcharts';



createApp(App)
.component('VueApexCharts', VueApexCharts)
.mount('#app')


