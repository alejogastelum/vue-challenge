import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import axios from 'axios'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@mdi/font/css/materialdesignicons.css'

import App from './App.vue'

import Login from './components/Login.vue'
import Main from './components/Main.vue'

Vue.prototype.$http = axios
const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(Vuetify, {
  theme: {
    primary: '#7957d5',
  },
})
const store = new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    user: {},
  },
  mutations: {
    AUTH_REQUEST(state) {
      state.status = 'loading'
    },
    AUTH_SUCCESS(state, user) {
      state.status = 'success'
      state.token = user.token
      state.user = user.data
    },
    AUTH_ERROR(state) {
      state.status = 'error'
    },
    LOGOUT(state) {
      state.status = ''
      state.token = ''
    },
  },
  actions: {
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('AUTH_REQUEST')
        axios({
          url: 'http://localhost:9090/api/v1/auth',
          data: user,
          method: 'POST',
        })
          .then((resp) => {
            const user = {
              token: resp.data.token,
              data: JSON.parse(decodeURIComponent(resp.data.token)),
            }
            delete user.data.password
            localStorage.setItem('token', user.token)
            axios.defaults.headers.common['Authorization'] =
              user.token
            commit('AUTH_SUCCESS', user)
            resolve(resp)
          })
          .catch((err) => {
            commit('AUTH_ERROR')
            localStorage.removeItem('token')
            reject(err)
          })
      })
    },
    logout({ commit }) {
      return new Promise<void>((resolve, reject) => {
        commit('LOGOUT')
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']
        resolve()
      })
    },
    getUsers({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('AUTH_REQUEST')
        axios({
          url: 'http://localhost:9090/api/v1/auth',
          data: user,
          method: 'POST',
        })
          .then((resp) => {
            const token = resp.data.token
            localStorage.setItem('token', token)
            axios.defaults.headers.common['Authorization'] = token
            commit('AUTH_SUCCESS', token)
            resolve(resp)
          })
          .catch((err) => {
            commit('AUTH_ERROR')
            localStorage.removeItem('token')
            reject(err)
          })
      })
    },
  },
  getters: {
    isLoggedIn: (state) => !!state.token,
    authStatus: (state) => state.status,
  },
})

const router = new VueRouter({
  routes: [
    {
      path: '/login',
      component: Login,
    },
    {
      path: '/',
      component: Main,
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
  vuetify: new Vuetify(),
  router,
  store,
  el: '#app',
  components: { App },
  template: '<App/>',
})
