import Vue from 'vue'
import Vuex from 'vuex'
import notes from './modules/notes'
import auth from './modules/auth'
import inventory from './modules/inventory'

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
    auth,
    inventory
  }
})

// Auth header
require('./subscribers/auth-header')
