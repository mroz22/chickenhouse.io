import firebase from 'firebase'
import firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'
import store from './store'

const firebaseApp = firebase.initializeApp({
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROCESS_ID,
  storageBucket: process.env.STORAGE_BUCKET
})

const db = firebaseApp.database()

if (__DEV__) {
  window.firebase = firebase
}

const ui = new firebaseui.auth.AuthUI(firebase.auth())

/**
 * Sync store.state.user with firebase.auth().currentUser
 *
 * This callback is called when firebase.auth() detects user changes,
 * so just update the vuex store with the new user object.
 */
firebase.auth().onAuthStateChanged(currentUser => {
  store.commit('UPDATE_CURRENT_USER', currentUser)
  if (currentUser) {
    store.dispatch('setCurrentUserCustomRef', db.ref('users').orderByChild('uid').equalTo(currentUser.uid))
  } else {
    // store.dispatch('clearUserRef')
  }
})

export { ui, db }
