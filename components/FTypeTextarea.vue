<template>
  <div>
    <v-textarea
      :id="id"
      single-line
      outlined
      filled
      v-model="value"
      @input="$emit('input', value)"
      hide-details="true"
    ></v-textarea>

  </div>
</template>

<script>
export default {
  props: ['id', 'name',],
  data() {
    return {
      value: '',
    }
  },
  methods: {

  }
}
</script>

<style>

</style>
