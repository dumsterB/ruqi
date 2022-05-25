<template lang="pug">
  .ruqi-table-filter-check
    v-checkbox(
      :label="label"
      color="primary"
      v-model="value"
      hide-details
      @change="$emit('input', value)")

</template>

<script>


export default {
  props: {
    params: {
      type: Object,
      default: {},
    },
    label: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      value: '',
    }
  },
}
</script>

<style lang="scss">

.ruqi-table-filter-list{


}

</style>
