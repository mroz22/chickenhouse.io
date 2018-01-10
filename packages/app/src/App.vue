<template>
  <div id="app">
    <Header />
    <router-view></router-view>
  </div>
</template>

<script>
  import Header from '@/components/Header'

  export default {
    name: 'app',
    components: {
      Header
    }
  }
</script>

<style>
  #app {
    min-height: 100vh;
  }
</style>
