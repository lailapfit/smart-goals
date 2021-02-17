import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueEllipseProgress from 'vue-ellipse-progress'
import { BootstrapVue } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


Vue.config.productionTip = false
Vue.prototype.$http = axios

Vue.use(VueEllipseProgress)
Vue.use(BootstrapVue)
new Vue({
    router,
    render: h => h(App),
    data: {
        submissions: [],
        progressPercentage: 0,
        progressAction: 0,
        labels: [],
        lineGraph: {
            stepGoals: [],
            complete: []
        }
    }
}).$mount('#app')