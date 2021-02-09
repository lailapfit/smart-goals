import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueCarousel from 'vue-carousel'
import VueEllipseProgress from 'vue-ellipse-progress'
import { BootstrapVue } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


Vue.config.productionTip = false
Vue.prototype.$http = axios

Vue.use(VueEllipseProgress)
Vue.use(BootstrapVue)
Vue.use(VueCarousel)
new Vue({
    router,
    render: h => h(App),
}).$mount('#app')