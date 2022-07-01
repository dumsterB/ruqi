<template lang="pug">
.header-container.mx-n3.mt-n3.px-6.d-flex.align-center
  slot
</template>

<script>
export default {
  name: "HeaderSecondary"
}
</script>

<style scoped lang="scss">
.header-container {
  height: 84px;
  border-bottom: 1px solid $border-color;
}
</style>
