import { createApp } from 'vue'
import App from './App.vue'
import './assets/index-js/index'
import VueApexCharts from 'vue3-apexcharts';
import store from './store/store';
import router from './router/router';
import Toast, {POSITION} from "vue-toastification";
import "vue-toastification/dist/index.css";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowsRotate} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faArrowsRotate);

createApp(App)
.use(router)
.use(store)
.use(Toast, {position: POSITION.BOTTOM_RIGHT})
.component('VueApexCharts', VueApexCharts)
.component('font-awesome-icon', FontAwesomeIcon)
.mount('#app')


