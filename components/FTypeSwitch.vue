<template>
  <div>
    <v-switch
      v-model="switch_val"
      :label="params.label"
      inset
      hide-details="auto"
    ></v-switch>
  </div>
</template>

<script>
export default {
  props: ['name', 'params', 'value', 'label'],
  data() {
    return {
      switch_val: '',
    }
  },
  methods: {},
  created() {
    if (this.value) {
      this.switch_val = this.value;
    }
  },
  watch: {
    value: function () {
      this.switch_val = this.value;
    },
  },
}
</script>

<style lang="scss">


</style>
