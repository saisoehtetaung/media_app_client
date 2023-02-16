import { createStore } from 'vuex'

export default createStore({
  state: {
    userData: {},
    token: '',

  },
  getters: {
    storedToken : state => state.token,
    storedUserData : state => state.userData,
  },
  mutations: {
  },
  actions: {
    setToken: ({state},value) => state.token = value,
    setUserData: ({state},value) => state.userData = value,
  },
  modules: {
  }
})
