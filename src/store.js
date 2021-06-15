import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    role: localStorage.getItem('role') || '',
    darkMode:
      localStorage.getItem('darkMode') === 'true' ? true : false,
    users: [],
    items: [],
  },
  mutations: {
    AUTH_REQUEST(state) {
      state.status = 'loading'
    },
    AUTH_SUCCESS(state, user) {
      state.status = 'success'
      state.token = user.token
      state.role = user.role
    },
    ERROR(state) {
      state.status = 'error'
    },
    USERS_SUCCESS(state, users) {
      state.users = users
    },
    ITEMS_SUCCESS(state, items) {
      state.items = items
    },
    POST_ITEM_SUCCESS(state, item) {
      state.items.push(item)
    },
    PUT_ITEM_SUCCESS(state, item) {
      state.items[item.id] = item
    },
    DELETE_ITEM_SUCCESS(state, id) {
      const currentItems = state.items
      const newItems = currentItems.filter(function (value) {
        if (value !== null) {
          return value.id !== id
        }
      })
      state.items = newItems
    },
    LOGOUT(state) {
      state.status = ''
      state.token = ''
      state.role = ''
    },
    SET_DARK_MODE(state, option) {
      state.darkMode = !!option
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
            const data = JSON.parse(
              decodeURIComponent(resp.data.token),
            )
            const user = {
              token: resp.data.token,
              role: data.role,
            }
            localStorage.setItem('token', user.token)
            localStorage.setItem('role', user.role)
            axios.defaults.headers.common['Authorization'] =
              user.token
            commit('AUTH_SUCCESS', user)
            resolve(resp)
          })
          .catch((err) => {
            commit('ERROR')
            localStorage.removeItem('token')
            localStorage.removeItem('role')
            reject(err)
          })
      })
    },
    logout({ commit }) {
      return new Promise((resolve) => {
        commit('LOGOUT')
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']
        resolve()
      })
    },
    getUsers({ commit }) {
      if (!store.getters.isAdmin) {
        return
      }
      return new Promise((resolve, reject) => {
        commit('AUTH_REQUEST')
        axios({
          url: 'http://localhost:9090/api/v1/users',
          method: 'GET',
        })
          .then((resp) => {
            const users = resp.data
            commit('USERS_SUCCESS', users)
            resolve(resp)
          })
          .catch((err) => {
            commit('ERROR')
            localStorage.removeItem('token')
            reject(err)
          })
      })
    },
    getItems({ commit }) {
      return new Promise((resolve, reject) => {
        commit('AUTH_REQUEST')
        axios({
          url: 'http://localhost:9090/api/v1/items',
          method: 'GET',
        })
          .then((resp) => {
            const items = resp.data
            commit('ITEMS_SUCCESS', items)
            resolve(resp)
          })
          .catch((err) => {
            commit('ERROR')
            reject(err)
          })
      })
    },
    postItem({ commit }, item) {
      return new Promise((resolve, reject) => {
        commit('AUTH_REQUEST')
        axios({
          url: 'http://localhost:9090/api/v1/items',
          data: item,
          method: 'POST',
        })
          .then((resp) => {
            const item = resp.data
            commit('POST_ITEM_SUCCESS', item)
            resolve(resp)
          })
          .catch((err) => {
            commit('ERROR')
            reject(err)
          })
      })
    },
    putItem({ commit }, item) {
      return new Promise((resolve, reject) => {
        commit('AUTH_REQUEST')
        axios({
          url: `http://localhost:9090/api/v1/items/${item.id}`,
          data: item,
          method: 'PUT',
        })
          .then((resp) => {
            const item = resp.data
            commit('PUT_ITEM_SUCCESS', item)
            resolve(resp)
          })
          .catch((err) => {
            commit('ERROR')
            reject(err)
          })
      })
    },
    deleteItem({ commit }, id) {
      return new Promise((resolve, reject) => {
        commit('AUTH_REQUEST')
        axios({
          url: `http://localhost:9090/api/v1/items/${id}`,
          data: id,
          method: 'DELETE',
        })
          .then((resp) => {
            commit('DELETE_ITEM_SUCCESS', id)
            resolve(resp)
          })
          .catch((err) => {
            commit('ERROR')
            reject(err)
          })
      })
    },
    setDarkMode({ commit }, option) {
      return new Promise((resolve) => {
        commit('SET_DARK_MODE', option)
        localStorage.setItem('darkMode', option)
        console.log(option)
        resolve()
      })
    },
  },
  getters: {
    isAdmin: (state) => state.role === 'admin',
    isLoggedIn: (state) => !!state.token,
    authStatus: (state) => state.status,
    getUsers: (state) => state.users,
    getItems: (state) => state.items,
    isDarkMode: (state) => state.darkMode,
  },
})
