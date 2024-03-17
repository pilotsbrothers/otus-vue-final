import { getRefreshToken, setToken, removeToken } from '../../utils/auth'
import api from '../../services/api'
import store from '../../store'
import router from '../../router'
import Cookies from "js-cookie";

const auth = {
  state: {
    preventRequestsSend: false,
    userInfo: {},
    userGroupsPrefixes: []
  },
  mutations: {
    PREVENT_REQUESTS_SEND: (state) => {
      state.preventRequestsSend = true
    },
    CLEAR_USER_STORAGE: (state) => {
      state.preventRequestSend = {}
      state.userGroupsPrefixes = []
    },
    SET_USER_INFO: (state, data) => {
      state.userGroupsPrefixes = data.groupsPrefixList
      state.userInfo = data.data
    }
  },
  actions: {
    Logout({ commit }) {
      store.commit('SET_LOADING', 'store_logout')
      Cookies.remove('LoggedIn')
      store.commit('SET_IS_LOGGED_IN', false)
      router.push({ name: 'Authentication' })
      store.commit('REMOVE_LOADING', 'store_logout')
    },
    ForceLogOut({ commit }, error = {}) {
      removeToken()
      commit('CLEAR_USER_STORAGE')

      if (error && error.message) {
        console.log('ERROR:', error.message)
      } else {
        error.message = 'Время сессии истекло. Необходим повторный вход.'
      }
      store.dispatch('ShowAlert', {
        text: error.message,
        type: 'error'
      })

      setTimeout(() => {
        router.push({ name: 'Authentication', query: null })
      }, 2200)
    },
    checkAuth({commit}, data) {
      if(data.login === 'admin' && data.passwd === 'admin') {
        commit('SET_IS_LOGGED_IN', true)
      }
    },
    isAuth({commit}, data) {
      let cookie = Cookies.get('LoggedIn')
      console.log(cookie)
      if(cookie) {
        commit('SET_IS_LOGGED_IN', true)
      }
    },
  }
}

export default auth
