import api from '@/plugins/axios'
import { formatFacts } from '@/utils/formatFacts'

export default {
  namespaced: true,

  state: () => ({
    facts: [],
    loading: false
  }),

  mutations: {
    SET_FACTS(state, { loadMore, payload }) {      
      if(loadMore) {
        const oldFacts = state.facts
        const factsList = [ ...oldFacts, ...payload ]
        state.facts = factsList
      } else {
        state.facts = payload
      }
    },
    SET_LOADING(state, value) {
      state.loading = value
    }
  },

  actions: {
    async loadFacts({ commit }, { loadMore, params }) {
      commit('SET_LOADING', true)
      try {
        const res = await api.get('/facts', { params })
        const responseData = res.data?.data || []
        const payload = formatFacts(responseData)
        commit('SET_FACTS', { loadMore, payload })
      } catch (err) {
        console.error('Loading facts error:', err)
      }
      
      commit('SET_LOADING', false)
    },
    setFactsList({ commit }, { payload }) {
      commit('SET_FACTS', { loadMore: false, payload })
    }
  },
  
  getters: {
    factsList(state) {
      return state.facts
    }
  }
}
