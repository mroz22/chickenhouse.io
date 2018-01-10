<template>
  <div>
    User detail
    {{ userCustom }}
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import { db } from '@/initFirebase'

export default {
  computed: {
    ...mapGetters(['userCustom'])
  },
  created () {
    this.$store.dispatch('setUserCustomRef', db.ref(`user/${this.$route.params.uid}`))
  }
}

</script>
