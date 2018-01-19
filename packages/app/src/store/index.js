import Vue from 'vue'
import Vuex from 'vuex'
import { firebaseMutations } from 'vuexfire'

import users from '@/modules/users/store'
import peripherals from '@/modules/peripherals/store'
import sensors from '@/modules/sensors/store'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    users,
    peripherals,
    sensors
  },
  mutations: {
    ...firebaseMutations
  }
})

export default store
