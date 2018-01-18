<template>
  <div>
    <div>
      <mu-switch label="Light" :value="lightOn" @change="updateLightState()"/><br/>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { db } from '../../../initFirebase'

  export default {
    computed: mapGetters([ 'lightOn' ]),
    created () {
      this.source = db.ref('lightOn')
      this.$store.dispatch('setLightOnRef', this.source)
    },
    methods: {
      updateLightState () {
        this.source.set(!this.lightOn)
      }
    }
  }
</script>

<style lang="">
</style>
