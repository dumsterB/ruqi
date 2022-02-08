<template>
  <div class="">
    <v-text-field
        :name="name"
        single-line
        outlined
        filled
        :prepend-inner-icon="icon_code"
        v-model="new_value"
        @input="$emit('input', new_value)"
        hide-details="auto"
        :rules="validation_array"
        :class="{'number': validation && validation[0] == 'number'}"
    ></v-text-field>
    <div class="note" v-if="params">{{params.note}}</div>
  </div>
</template>

<script>
export default {
  props: ['name', 'icon', 'validation', 'params', 'value'],
  data() {
    return {
      new_value: '',
      rules: {
        required: value => !!value || 'Заполните поле',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || 'Введите корректный email'
        },
        phone: value => {
          const pattern = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
          return pattern.test(value) || 'Введите корректный телефон'
        },
        number: value => {
          const pattern = /(?<=^| )\d+(\.\d+)?(?=$| )/;
          return pattern.test(value) || 'Введите число'
        },
      },
    }
  },
  computed: {
    icon_code() {
      if (this.icon) {
        return this.icon;
      } else {
        return null;
      }
    },
    validation_array() {
      let validation_array = [];
      if (this.validation) {
        for (let i = 0; i < this.validation.length; i++) {
          validation_array.push(this.rules[this.validation[i]]);
        }
      }
      return validation_array;
    },
  },
  methods: {},
  created() {
    this.new_value = this.value;
  },
  watch: {
    value: function () {
      this.new_value = this.value;
    },
  },
}
</script>

<style lang="scss" scoped>

@import '/assets/scss/colors.scss';

.ruqi {
  .v-text-field--full-width .v-input__prepend-outer,
  .v-text-field--full-width .v-input__prepend-inner,
  .v-text-field--enclosed .v-input__prepend-outer,
  .v-text-field--enclosed .v-input__prepend-inner {
    margin-top: 10px;
  }

  .v-input.number {
    max-width: 78px;

    .v-text-field__details {
      padding: 0;
      position: absolute;
      bottom: -18px;
    }
  }

  .note{
    font-size: 14px;
    margin-top: 12px;
    color: $grey;
  }
}

</style>
