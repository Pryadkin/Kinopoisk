import Vue from 'vue'
import Vuex from 'vuex'
import { profile } from './modules/profile'
import { search } from './modules/search'
import { filters } from './modules/filters/filters'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    profile,
    search,
    filters
  }
})
