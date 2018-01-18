import { firebaseMutations, firebaseAction } from 'vuexfire'
// import { db } from '@/initFirebase'

export default {
  state: {
    currentUser: null, // Will be bound as an object; user object is provided by firebase auth
    currentUserCustom: null, // userCustom object contains additional userdata stored in firebase database
    users: []
  },
  actions: {
    setCurrentUserCustomRef: firebaseAction(({bindFirebaseRef}, ref) => {
      bindFirebaseRef('currentUserCustom', ref)
    }),
    clearUserRef: firebaseAction(({unbindFirebaseRef}) => {
      unbindFirebaseRef('userCustom')
    }),
    setUsersRef: firebaseAction(({bindFirebaseRef}, ref) => {
      console.log('set ref')
      bindFirebaseRef('users', ref, { wait: true })
    })
  },
  mutations: {
    UPDATE_CURRENT_USER (state, user, rootState) {
      state.currentUser = user
    },
    ...firebaseMutations
  },
  getters: {
    currentUser: state => state.currentUser,
    currentUserCustom: state => state.currentUserCustom,
    users: state => state.users
  }
}
