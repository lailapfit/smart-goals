import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/new-goal',
            name: 'new-goal',
            component: () =>
                import ('../views/SmartGoalForm.vue')
        },
        {
            path: '/goals/:id',
            name: 'goals',
            component: () =>
                import ('../views/UpdateGoal.vue')
        }
    ]
})