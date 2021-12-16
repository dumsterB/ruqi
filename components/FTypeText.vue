<template>
  <div class="w-100">
    <v-text-field
      :name="name"
      single-line
      outlined
      filled
      :prepend-inner-icon="icon_code"
      v-model="value"
      @input="$emit('input', value)"
      hide-details="true"
    ></v-text-field>
  </div>
</template>

<script>
export default {
  props: ['name', 'icon'],
  data() {
    return {
      value: '',
    }
  },
  computed: {
    icon_code() {
      if (this.icon){
        return this.icon;
      }
      else{
        return null;
      }
    },
  },
  methods: {


  },
  created() {
  }
}
</script>

<style lang="scss">
.ruqi{
  .v-text-field--full-width .v-input__prepend-outer,
  .v-text-field--full-width .v-input__prepend-inner,
  .v-text-field--enclosed .v-input__prepend-outer,
  .v-text-field--enclosed .v-input__prepend-inner {
    margin-top: 10px;
  }
}

</style>
