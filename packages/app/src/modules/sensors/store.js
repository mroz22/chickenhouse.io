import { firebaseAction } from 'vuexfire'
import { db } from '@/initFirebase'

export default {
  state: {
    // temperature: db.ref('temperature'),
    temperature: '',    // TODO: how to bind it correctly? 0, '', null, db.ref('temperature')
    humidity: db.ref('humidity')
  },
  actions: {
    setTemperatureRef: firebaseAction(({bindFirebaseRef}, ref) => {
      bindFirebaseRef('temperature', ref)
    }),
    setHumidityRef: firebaseAction(({bindFirebaseRef}, ref) => {
      bindFirebaseRef('humidity', ref)
    })
  },
  mutations: {},
  getters: {
    temperature: state => state.temperature['.value'],
    humidity: state => state.humidity['.value']
  }
}
