<template>
  <div>
    <v-select
      v-model="select"
      :id="id"
      :items="options"
      :rules="[v => !!v || 'Выберите вариант']"
      required
      single-line
      outlined
      filled
      @input="$emit('input', select)"
      hide-details="true"
      :readonly="readonly"
    ></v-select>
  </div>
</template>

<script>
export default {
  props: ['id', 'name', 'params', 'value'],
  computed: {
    options() {
      return this.params.options
    },
    readonly(){
      if (this.params && this.params.readonly) {
        return true;
      } else {
        return false;
      }
    },
  },
  data() {
    return {
      select: null,
    }
  },
  methods: {},
  watch: {
    value: function () {
      this.select = this.value;
    },
  },
  created () {
    if (this.value) {
      this.select = this.value;
    } else {
      this.select = this.params.options[0];
    }

    this.$emit( 'input', this.select );
  }
}
</script>

<style>

</style>
