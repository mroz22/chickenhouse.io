<template>
<div>
  <h1>Profile</h1>
  <hr />

  <h3>{{ currentUser.displayName }} </h3>
  <p>email: {{ currentUser.email}}</p>
  <p>admin: {{ currentUser.isAdmin ? "Yes" : "No" }}  </p>
</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['currentUser'])
  }
}
</script>

<style lang="scss">

</style>
