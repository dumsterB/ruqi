<template lang="pug">
  .ruqi-rate
    v-row.d-flex.align-center
      v-col(cols="6")
        v-text-field.rate-num(
          :name="rate_name"
          label="Ставка"
          outlined
          filled
          v-model="new_rate"
          @input="updateRate"
          hide-details="auto"
          readonly
          :rules="[rules.number, rules.required]")

      v-col(cols="6")
        .form-date
          v-text-field( v-model="fullDate"
            :name="date_name"
            label="Действует с"
            append-icon="mdi-calendar"
            v-bind="attrs"
            @blur="date = parseDate(dateFormatted)"
            v-on="on"
            filled
            outlined
            hide-details="true"
            readonly
            :rules="[rules.required]")


</template>

<script>


export default {
  props: {
    rate_value: {
      type: [Number, String],
      default: '',
    },
    date_value: {
      type: String,
      default: '',
    },
    prefix_name: {
      type: [Number, String],
      default: '',
    },
    isNew: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      new_rate: '',
      new_date: '',
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      dateFormatted: this.formatDate((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)),
      menu: false,
      modal: false,
      rules: {
        required: value => !!value || 'Заполните поле',
        number: value => {
          const pattern = /^\d+(?:[\.,]\d+)?$/; // /(?<=^| )\d+(\.\d+)?(?=$| )/;
          if (value) {
            return pattern.test(value) || 'Введите число'
          } else {
            return true;
          }
        },
      },
      isEdit: false,

    }
  },
  computed: {
    rate_name() {
      return 'object_rate_rate_' + this.prefix_name;
    },
    date_name() {
      return 'object_rate_date_' + this.prefix_name;
    },
    fullDate() {
      return this.dateFormatted;
    },
  },
  methods: {
    formatDate(date) {
      if (!date) return null

      const [year, month, day] = date.split('-');
      return `${day}.${month}.${year}`;
    },
    parseDate(date) {
      if (!date) return null

      const [day, month, year] = date.split('.');
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    },
    updateRate() {
      this.$emit('updateFiled', this.rate_name, this.new_rate)
      this.isEdit = true;
    },
  },
  created() {
    this.new_rate = this.rate_value;
    this.dateFormatted = this.formatDate(this.date_value)
  },
  watch: {
    rate_value() {
      this.new_rate = this.rate_value;
    },
    date_value() {
      this.dateFormatted = this.formatDate(this.date_value)
    },
    date() {
      this.dateFormatted = this.formatDate(this.date)
    },
  },
}
</script>

<style lang="scss">

@import '/assets/scss/colors.scss';

.ruqi-rate {
  .v-col {
    margin-right: 14px;

    &:last-child {
      margin-right: 0;
    }
  }

  .form-date {
    .v-text-field--outlined {
      align-items: center;

      .v-input__prepend-outer {
        margin-top: 0;
        margin-bottom: 0;
      }
    }

  }


  .v-text-field {
    &.v-input input {
      color: #263043;
      font-weight: 600;
      padding-bottom: 0;
    }
    &.v-input.v-input--is-readonly input {
      color: #263043;
      font-weight: 600;
    }

    .v-label {
      text-transform: uppercase;
      font-weight: 700;
      font-size: 12px;
      color: $grey;

      &.v-label--active {
        transform: translateY(-18px) scale(1);
      }
    }

    legend{
      display: none;
    }

    fieldset{
      background: #fff;
    }
  }

  .v-text-field--filled:not(.v-text-field--single-line) input {
    margin-top: 0;
  }

  .v-input__slot {
    margin-bottom: 0;
  }

  .v-input.rate-num {

    .v-text-field__details {
      position: absolute;
      bottom: -22px;
      width: 100px;
      padding: 0;
    }
  }

  .v-icon {
    color: $grey;
  }


}


</style>
