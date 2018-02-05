/* This is the entry point */

// polyfills
import 'es6-promise/auto'
import 'weakmap' // for vuexfire, using (imports-loader)
import firebase from 'firebase'

import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import { sync } from 'vuex-router-sync'

// Enable progressive web app support (with offline-plugin)
if (process.env.NODE_ENV === 'production') {
  require('./pwa')
}

// muse-ui
// import '@muse-ui/styles/base.less'
// TODO: import components separately before production
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import './muse-ui-theme.less'
Vue.use(MuseUI)

/**
 * Sync store.state.user with firebase.auth().currentUser
 *
 * This callback is called when firebase.auth() detects user changes,
 * so just update the vuex store with the new user object.
 */
firebase.auth().onAuthStateChanged(currentUser => {
  store.commit('UPDATE_CURRENT_USER', currentUser)
  if (currentUser) {
    store.dispatch('setCurrentUserCustomRef', db.ref(`users/${currentUser['.key']}`))
  } else {
    // store.dispatch('clearUserRef')
  }
})

// firebase
import { db } from './initFirebase'

Vue.config.productionTip = false

// Sync the router with the vuex store. This registers `store.state.route`
sync(store, router)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
