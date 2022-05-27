<template lang="pug">
  .ruqi-table-filter-list
    v-checkbox(v-for="(item, index) in params.options" :key="index"
      :name="params.options[index].stub"
      :label="item.name"
      :value="item.stub"
      color="primary"
      v-model="selected"
      hide-details
      @change="$emit('input', selected)")

</template>

<script>


export default {
  props: {
    params: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      value: '',
      selected: [],
    }
  },
}
</script>

<style lang="scss">

.ruqi-table-filter-list{

  .v-input--selection-controls{
    margin-top: 10px;
  }
}

</style>
