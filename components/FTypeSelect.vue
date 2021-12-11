<template>
  <div>
    <v-select
      v-model="select"
      :id="id"
      :items="options"
      :rules="[v => !!v || 'Item is required']"
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
  props: ['id', 'name', 'params'],
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
  created() {

  }
}
</script>

<style>

</style>
