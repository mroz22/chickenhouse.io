<template>
<div>
  <h1>My Profile</h1>
  <hr />

  <h3>{{ currentUser.displayName }} </h3>
  <p>email: {{ currentUser.email}}</p>
  <p>admin: {{ currentUserCustom.isAdmin ? "Yes" : "No" }}  </p>
</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['currentUser', 'currentUserCustom'])
  }
}
</script>

<style lang="scss">

</style>
