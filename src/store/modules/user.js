export default {
  namespaced: true,

  state: () => ({
    userName: '',
  }),

  mutations: {
    SET_USER_NAME(state, value) {
      state.userName = value
    }
  },

  actions: {
    setUserName({ commit }, userName) {
      commit('SET_USER_NAME', userName)
    }
  },

  getters: {
    userName(state) {
      return state.userName
    }
  }
}
