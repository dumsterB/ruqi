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
  },
  data() {
    return {
      select: null,
    }
  },
  methods: {},
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
