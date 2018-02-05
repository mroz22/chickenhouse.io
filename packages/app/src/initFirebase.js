import firebase from 'firebase'
import firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'
// import store from './store'

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

export { ui, db }
