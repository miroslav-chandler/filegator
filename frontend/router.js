import { createRouter, createWebHashHistory } from 'vue-router'
import Browser from './views/Browser.vue'
import Users from './views/Users.vue'
import Login from './views/Login.vue'
import store from './store'

const routes = [
    {
      path: '/',
      name: 'browser',
      component: Browser,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/users',
      name: 'users',
      component: Users,
      beforeEnter: (to, from, next) => {
        if (store.state.user.role == 'admin') {
          next()
        }
      },
    },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
