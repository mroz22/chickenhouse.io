<template>
  <div>
    <mu-snackbar v-bind:message="error.message"></mu-snackbar>
  </div>
</template>

<script>
  export default {
    props: ['error']
  }
</script>
