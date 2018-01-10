<template>
  <div>
    <div>
      <mu-switch label="Door" :value="opened" @change="updateDoorState()"/><br/>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { db } from '../../initFirebase'

  export default {
    computed: mapGetters([ 'opened' ]),
    created () {
      this.source = db.ref('opened')
      this.$store.dispatch('setOpenedRef', this.source)
    },
    methods: {
      updateDoorState () {
        this.source.set(this.opened ? 0 : 1)
      }
    }
  }
</script>

<style lang="">
</style>
