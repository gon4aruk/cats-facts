import Vue from 'vue'
import axios from 'axios'

const api = axios.create({
  baseURL: 'https://catfact.ninja'
})

Vue.prototype.$axios = api

export default api
