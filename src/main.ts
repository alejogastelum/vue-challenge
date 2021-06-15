import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import axios from 'axios'
import moment from 'moment'

import vuetify from './plugins/vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@mdi/font/css/materialdesignicons.css'

import App from './App.vue'
import Login from './components/Login.vue'
import Items from './components/Items.vue'
import Users from './components/Users.vue'

import { store } from './store'

Vue.prototype.$http = axios
Vue.prototype.$moment = moment

const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}

Vue.use(Vuex)
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/login',
      component: Login,
    },
    {
      path: '/',
      component: Items,
    },
    {
      path: '/users',
      component: Users,
      meta: {
        requiresAuth: true,
      },
    },
  ],
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})

Vue.config.productionTip = false
new Vue({
  vuetify,
  router,
  store,
  el: '#app',
  components: { App },
  template: '<App/>',
})
