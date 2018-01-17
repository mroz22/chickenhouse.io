<template>
  <div>
    Temperature {{ temperature}} °C
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { db } from '../../initFirebase'

  export default {
    computed: mapGetters([ 'temperature' ]),
    created () {
      this.source = db.ref('temperature')
      this.$store.dispatch('setTemperatureRef', this.source)
    }
  }
</script>
