<template>
  <div id="humidity">
      Humidity {{ humidity }} %
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { db } from '@/initFirebase'

  export default {
    computed: mapGetters([ 'humidity', 'currentUserCustom' ]),
    created () {
      this.source = db.ref('humidity')
      this.$store.dispatch('setHumidityRef', this.source)
    }
  }
</script>
