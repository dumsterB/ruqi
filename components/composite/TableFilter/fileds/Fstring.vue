<template lang="pug">
  .ruqi-table-filter-string
    v-text-field(
      :name="params.field"
      single-line
      outlined
      filled
      v-model="value"
      @input="$emit('input', value)"
      hide-details="auto"
      :class="{'number': params.type == 'integer'}"
      :rules="[params.type == 'integer' ? rules.number : '']"
    )

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
      rules: {
        number: value => {
          const pattern = /^\d+(?:[\.,]\d+)?$/; // /(?<=^| )\d+(\.\d+)?(?=$| )/;
          if (value) {
            return pattern.test(value) || 'Введите число'
          } else {
            return true;
          }
        },
      },
    }
  },
}
</script>

<style lang="scss">

.ruqi-table-filter-string {

  .v-input__slot {
    margin-bottom: 0;
  }

  .v-input.number {
    max-width: 78px;

    .v-text-field__details {
      position: absolute;
      bottom: -22px;
      width: 100px;
      padding: 0;
    }
  }

  .v-text-field--outlined > .v-input__control > .v-input__slot,
  .theme--light.v-text-field--filled > .v-input__control > .v-input__slot {
    background: #fff;
  }


}


</style>
