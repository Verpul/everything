import Vue from 'vue'
import Vuex from 'vuex'
import notes from './modules/notes'
import auth from './modules/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    notes,
    auth
  }
})

// Auth header
require('./subscribers/auth-header')
