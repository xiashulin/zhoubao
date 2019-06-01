import Vue from 'vue'
import Vuex from 'vuex'
import { login, userInfo, addUserEmail, getUserEmail, updateUserEmail } from '@/api/api'
import { setToken, removeToken } from '@/utils/auth'

const RECEIVE_USER_INFO = 'SET_USER'
const RECEIVE_USER_EMAIL = 'SET_USER_EMAIL'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: null,
    userEmail: null
  },
  mutations: {
    [RECEIVE_USER_INFO] (state, payload) {
      state.userInfo = payload
    },
    [RECEIVE_USER_EMAIL] (state, payload) {
      state.userEmail = payload
    }
  },
  actions: {
    login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          const data = response.data
          setToken(data.id)
          commit(RECEIVE_USER_INFO, data)
          resolve()
        }).catch(error => {
          console.log('login-error', error)
          reject(error)
        })
      })
    },
    userInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        userInfo({ test: 'ttt' }).then(response => {
          const data = response.data
          setToken(data.id)
          commit(RECEIVE_USER_INFO, data)
          resolve()
        }).catch(error => {
          console.log('get-userInfo-error', error)
          reject(error)
        })
      })
    },
    logout ({ commit }) {
      commit(RECEIVE_USER_INFO, '')
      removeToken()
    },
    getUserEmail ({ commit }) {
      return new Promise((resolve, reject) => {
        getUserEmail({ test: 'ttt' }).then(response => {
          const data = response.data
          commit(RECEIVE_USER_EMAIL, data)
          resolve()
        }).catch(error => {
          console.log('get-userEmail-error', error)
          reject(error)
        })
      })
    },
    addUserEmail ({ commit }, userEmail) {
      return new Promise((resolve, reject) => {
        addUserEmail(userEmail).then(response => {
          const data = response.data
          commit(RECEIVE_USER_EMAIL, data)
          resolve()
        }).catch(error => {
          console.log('add-userEmail-error', error)
          reject(error)
        })
      })
    },
    updateUserEmail ({ commit }, userEmail) {
      return new Promise((resolve, reject) => {
        updateUserEmail(userEmail).then(response => {
          const data = response.data
          commit(RECEIVE_USER_EMAIL, data)
          resolve()
        }).catch(error => {
          console.log('add-updateEmail-error', error)
          reject(error)
        })
      })
    }
  }
})
