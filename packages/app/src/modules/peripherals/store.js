import { firebaseAction } from 'vuexfire'
import { db } from '@/initFirebase'

export default {
  state: {
    opened: db.ref('opened'),
    lightOn: db.ref('lightOn')
  },
  actions: {
    setOpenedRef: firebaseAction(({bindFirebaseRef}, ref) => {
      bindFirebaseRef('opened', ref)
    }),
    setLightOnRef: firebaseAction(({bindFirebaseRef}, ref) => {
      bindFirebaseRef('lightOn', ref)
    })
  },
  mutations: {},
  getters: {
    opened: state => Boolean(state.opened['.value']),
    lightOn: state => state.lightOn['.value']
  }
}
