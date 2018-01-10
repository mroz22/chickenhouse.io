import Vue from 'vue'
import Vuex from 'vuex'
import { firebaseMutations, firebaseAction } from 'vuexfire'
import { db } from '../initFirebase'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    currentUser: null, // Will be bound as an object; user object is provided by firebase auth
    currentUserCustom: null, // userCustom object contains additional userdata stored in firebase database
    users: [],
    temperature: db.ref('temperature'),
    opened: db.ref('opened'),
    humidity: db.ref('humidity'),
    lightOn: db.ref('lightOn')
  },
  actions: {
    setCurrentUserCustomRef: firebaseAction(({bindFirebaseRef}, ref) => {
      bindFirebaseRef('currentUserCustom', ref)
    }),
    setUsersRef: firebaseAction(({bindFirebaseRef}, ref) => {
      bindFirebaseRef('users', ref)
    }),
    clearUserRef: firebaseAction(({unbindFirebaseRef}) => {
      unbindFirebaseRef('userCustom')
    }),
    setTemperatureRef: firebaseAction(({bindFirebaseRef}, ref) => {
      bindFirebaseRef('temperature', ref)
    }),
    setOpenedRef: firebaseAction(({bindFirebaseRef}, ref) => {
      bindFirebaseRef('opened', ref)
    }),
    setHumidityRef: firebaseAction(({bindFirebaseRef}, ref) => {
      bindFirebaseRef('humidity', ref)
    }),
    setLightOnRef: firebaseAction(({bindFirebaseRef}, ref) => {
      bindFirebaseRef('lightOn', ref)
    })
  },
  mutations: {
    UPDATE_CURRENT_USER (state, user) {
      state.currentUser = user
    },
    ...firebaseMutations
  },
  getters: {
    temperature: state => state.temperature['.value'],
    opened: state => Boolean(state.opened['.value']),
    humidity: state => state.humidity['.value'],
    lightOn: state => state.lightOn['.value'],
    currentUser: state => state.currentUser,
    currentUserCustom: state => state.currentUserCustom,
    users: state => state.users
  }
})

export default store
