<template>
  <div class="landing">
    <mu-row gutter>
      <mu-col width="10" tablet="40" desktop="30"></mu-col>
      <mu-col width="90" tablet="60" desktop="40">
        <panel></panel>
      </mu-col>
      <mu-col width="10" tablet="40" desktop="30"></mu-col>
    </mu-row>
  </div>
</template>

<script>
  import Panel from '@/components/Panel'

  export default {
    name: 'hello',
    components: {
      Panel
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .landing {
    text-align: center;
    margin-top: 30px;
  }
</style>
