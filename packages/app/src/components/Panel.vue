<template>
  <div>
    <humidity></humidity>
    <temperature></temperature>
    <door></door>
    <light></light>
  </div>
</template>

<script>
  import Humidity from '@/components/sensors/Humidity'
  import Temperature from '@/components/sensors/Temperature'
  import Door from '@/components/peripherals/Door'
  import Light from '@/components/peripherals/Light'

  export default {
    name: 'Monitor',
    components: {
      Humidity,
      Temperature,
      Door,
      Light
    }
  }
</script>
