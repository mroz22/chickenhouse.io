<template>
  <div>
    <humidity></humidity>
    <temperature></temperature>
    <door></door>
    <light></light>
  </div>
</template>

<script>
  import Humidity from '@/modules/sensors/components/Humidity'
  import Temperature from '@/modules/sensors/components/Temperature'
  import Door from '@/modules/peripherals/components/Door'
  import Light from '@/modules/peripherals/components/Light'

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
