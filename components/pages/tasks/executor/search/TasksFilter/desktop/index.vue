<template lang="pug">
.rqtes-taskfilter
  .rqtes-taskfilter__row
    selectSingle.rqtes-taskfilter__select-pofession.rqtes-taskfilter__row-item(
      :id="'payment-type'"
      :items="items"
      title="Профессии"
      :value="items[0]"
      @change="setters().onPaymentTypeSelectChange({ $event })"
    )

    Input.mix-input.rqtes-taskfilter__row-item.rqtes-taskfilter__input.rqtes-taskfilter__input-search(
      :params="{ ...textInputDefaultSettings, hauptTitel: 'Район поиска', ref: 'personaldatatab_firstname', }"
      @input_change="setters().setFirstName({ event: $event })"
    )

    //- selectSingle.rqtes-taskfilter__select-radius.rqtes-taskfilter__row-item(
    //-   :id="'payment-type'"
    //-   :items="radiusItems"
    //-   title="Ищу не далее"
    //-   @change="setRadius"
    //- )

    .select-single.rqtes-taskfilter__select-radius.rqtes-taskfilter__row-item
      .select-single_titel {{ "Ищу не далее" }}
      v-select(
        :value="''"
        :id="id"
        :items="radiusItems"
        item-text="name"
        item-value="uuid"
        :rules="[v => !!v || 'Выберите вариант']"
        required
        single-line
        outlined
        filled
        @change="setRadius"
        hide-details="true"
        :item-color="'#000000'"
      )

    .rqtes-taskfilter__confirm.rqtes-taskfilter__row-item
      v-btn(
        class="ma-2 rqtes-taskfilter__confirm-btn"
        :loading="loading4"
        :disabled="loading4"
        color="info"
        @click="loader = 'loading4'"
        style="margin: 0 !important; margin-top: 16px !important;"
      ) показать заявки
        template(v-slot:loader)
          span.custom-loader
            v-icon(style="color: rgba(0,0,0,.26) !important") mdi-cached

  .rqtes-taskfilter__row
    dateInputWithTitle.rqtes-taskfilter__row-item.rqtes-taskfilter__date(
      title="Дата работ"
      value="01.01.2022"
      @date_change="setters().setBirthday({ event: $event })"
    )

    .rqtes-taskfilter__salary
      Input.mix-input.rqtes-taskfilter__salary-item.rqtes-taskfilter__input(
        :params="{ ...textInputDefaultSettings, hauptTitel: 'Зарплата от', ref: 'personaldatatab_firstname', }"
        @input_change="setters().setFirstName({ event: $event })"
      )

      selectSingle.rqtes-taskfilter__select.rqtes-taskfilter__select-salary.rqtes-taskfilter__salary-item(
        :id="'payment-type'"
        :items="items"
        title="##"
        :value="items[0]"
        @change="setters().onPaymentTypeSelectChange({ $event })"
      )

    .rqtes-taskfilter__row-item.rqtes-taskfilter__checkbox
      v-checkbox.rqtes-taskfilter__checkbox-property(
        v-model="ex4"
        label="Свойство 1"
        color="info"
        value="info"
        hide-details
      )

    .rqtes-taskfilter__row-item.rqtes-taskfilter__checkbox
      v-checkbox.rqtes-taskfilter__checkbox-property(
        v-model="ex4"
        label="Свойство 1"
        color="info"
        value="info"
        hide-details
      )

    .rqtes-taskfilter__row-item.rqtes-taskfilter__checkbox
      v-checkbox.rqtes-taskfilter__checkbox-property(
        v-model="ex4"
        label="Свойство 1"
        color="info"
        value="info"
        hide-details
      )
</template>

<script>
import selectSingle from '@/components/UI/selectSingle';
import Input from '@/components/UI/input';
import dateInputWithTitle from '@/components/UI/dateInputWithTitle';

export default {
  components: {
    selectSingle,
    Input,
    dateInputWithTitle,
  },
  props: {},
  computed: {},
  watch: {},
  methods: {
    /* GETTERS */
    /* SETTERS */
    setRadius(payload = null) {
      if (!payload) return;

      console.debug('setRadius', payload); // DELETE
    },

    /* HANDLERS */
    /* HELPERS */
  },

  data: () => ({
    items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
    radiusItems: [
      {
        uuid: '1km',
        name: '1км',
        value: '1',
      },
      {
        uuid: '10km',
        name: '10км',
        value: '10',
      },
      {
        uuid: '15km',
        name: '15км',
        value: '15',
      },
    ],

    loader: null,
    loading4: false,
    textInputDefaultSettings: {
      type: 'text',
      value: '',
      hauptTitel: '',
      solo: true,
      hint: '',
    },
  }),
  created() { },
  mounted() { },
}
</script>

<style lang="scss">
.rqtes-taskfilter {
  box-sizing: border-box;
  padding: 32px 32px 38px 32px;
  background: #F6FBFF;
  border: 1px solid #D5DEE8;
  box-shadow: 0px 6px 73px rgba(0, 0, 0, 0.07);
  border-radius: 14px;
  min-width: 334px;
  max-width: 1272px;

  &__input {
    &-search {
      width: 273px;
    }

    /* MIXINS */
    .v-text-field__details {
      display: none;
    }
  }

  &__select {
    &-salary {
      width: 116px;

      .select-single_titel {
        opacity: 0;
      }

      .v-input__slot {
        height: 48px;
        margin: 0 !important;
        box-shadow: none !important;

        fieldset {
          background: #FFFFFF;
          border: 1px solid #E2E4E5;
          box-sizing: border-box;
          border-radius: 4px !important;
        }
      }
    }

    &-pofession {
      width: 507px;

      .v-input__slot {
        height: 48px;
        margin: 0 !important;
        box-shadow: none !important;

        fieldset {
          background: #FFFFFF;
          border: 1px solid #E2E4E5;
          box-sizing: border-box;
          border-radius: 4px !important;
        }
      }
    }

    &-radius {
      width: 98px;

      .v-input__slot {
        height: 48px;
        margin: 0 !important;
        box-shadow: none !important;

        fieldset {
          background: #FFFFFF;
          border: 1px solid #E2E4E5;
          box-sizing: border-box;
          border-radius: 4px !important;
        }
      }
    }
  }

  &__row {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    margin: 0 !important;
    margin-top: 24px !important;

    &:first-child {
      margin-top: 0 !important;
    }

    &-item {
      margin-left: 20px;

      &:first-child {
        margin-left: 0;
      }
    }
  }

  &__confirm {
    display: flex;
    align-items: flex-end;
    height: 84px;

    &-btn {
      height: 48px !important;
      width: 270px !important;
    }
  }

  &__checkbox {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    align-content: center;

    &-property {
      margin-top: 30px;
    }
  }

  &__salary {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    margin-left: 20px;

    &-item {
      margin-left: 20px;

      &:first-child {
        margin-left: 0;
      }
    }
  }

  .select-single {
    .select-single_titel {
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 125%;
      color: #263043;
      margin-bottom: 16px;
      white-space: nowrap;
    }
  }

  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }

  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }

    to {
      transform: rotate(360deg);
    }
  }

  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }

    to {
      transform: rotate(360deg);
    }
  }

  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }

    to {
      transform: rotate(360deg);
    }
  }

  @keyframes loader {
    from {
      transform: rotate(0);
    }

    to {
      transform: rotate(360deg);
    }
  }

  @media screen and (max-width: 800px) {
    &__input {
      &-search {
        width: 100%;
      }

      /* MIXINS */
      .v-text-field__details {
        display: none;
      }
    }

    &__select {
      &-salary {
        width: 100%;

        .select-single_titel {
          opacity: 0;
        }

        .v-input__slot {
          height: 48px;
          margin: 0 !important;
          box-shadow: none !important;

          fieldset {
            background: #FFFFFF;
            border: 1px solid #E2E4E5;
            box-sizing: border-box;
            border-radius: 4px !important;
          }
        }
      }

      &-pofession {
        width: 100%;

        .v-input__slot {
          height: 48px;
          margin: 0 !important;
          box-shadow: none !important;

          fieldset {
            background: #FFFFFF;
            border: 1px solid #E2E4E5;
            box-sizing: border-box;
            border-radius: 4px !important;
          }
        }
      }

      &-radius {
        width: 100%;

        .v-input__slot {
          margin: 0 !important;
          box-shadow: none !important;

          fieldset {
            background: #FFFFFF;
            border: 1px solid #E2E4E5;
            box-sizing: border-box;
            border-radius: 4px !important;
          }
        }
      }
    }

    &__row {
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
      margin: 0 !important;
      margin-top: 24px !important;
      align-items: flex-start;

      &:first-child {
        margin-top: 0 !important;
      }

      &-item {
        margin-left: 0;
      }
    }

    &__confirm {
      display: flex;
      align-items: flex-end;
      height: auto;
      width: 100%;

      &-btn {
        height: 48px !important;
        width: 100% !important;
      }
    }

    &__checkbox {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      align-items: center;
      align-content: center;

      &-property {
        margin-top: 30px;
      }
    }

    &__salary {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: flex-start;
      margin-left: 0;
      width: 100%;

      &-item {
        margin-left: 20px;
        width: 50%;

        &:first-child {
          margin-left: 0;
        }
      }
    }

    &__date {
      width: 100%;
    }
  }
}
</style>
