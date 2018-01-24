<template>
  <div id="app">
    <Error  v-show="showErrorSnackbar" v-bind:error="error"/> <!-- todo: this binds string 'error', bind object instead" -->
    <Header />
    <router-view v-on:error="handleError"></router-view>
  </div>
</template>

<script>
  import Header from '@/components/Header'
  import Error from '@/components/Error'

  export default {
    name: 'app',
    components: {
      Header,
      Error
    },
    data () {
      return {
        showErrorSnackbar: false,
        error: {}
      }
    },
    methods: {
      handleError: function (error) {
        this.error = error
        this.showErrorSnackbar = true
        setTimeout(() => {
          this.showErrorSnackbar = false
          this.error = {}
        }, 5000)
      }
    },
    created () {
    }
  }
</script>

<style>
  #app {
    min-height: 100vh;
  }
</style>
