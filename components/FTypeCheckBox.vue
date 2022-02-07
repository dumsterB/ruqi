<template>
  <div>
    <v-checkbox
      v-model="checkbox"
      :label="params.label"
      color="primary"
      hide-details
    ></v-checkbox>
  </div>
</template>

<script>
export default {
  props: ['name', 'params', 'value', 'label'],
  data() {
    return {
      checkbox: '',
    }
  },
  methods: {},
  created() {
    if (this.value) {
      this.checkbox = this.value;
    }
  },
  watch: {
    value: function () {
      this.checkbox = this.value;
    },
  },
}
</script>

<style lang="scss" scoped>

@import '/assets/scss/colors.scss';

.v-input--selection-controls {
  margin-top: 0;
}

</style>
