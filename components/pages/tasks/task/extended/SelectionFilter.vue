<template lang="pug">
  .selection-filter
    .wrap-form-filter
      v-form
        .form-part
          FormBuilder(:meta="meta.meta_filter_row_1" @updateFiled="updateFiled")
          .selected-city
            .city-item(v-for="(city, index) in cities" :key="index" @click="removeCity")
              .city-name {{ city }}
              v-icon mdi-delete

          .form-part-2(v-show="formValues.show_filter")

            v-divider.my-6

            FormBuilder(:meta="meta.meta_filter_row_2" @updateFiled="updateFiled")

            a.clear-filter.mt-6(@click.prevent="")
              v-icon(size="20") mdi-trash-can-outline
              span сбросить все фильтры



</template>

<script>
import Vue from "vue";

export default {
  props: {
    status_alias: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      formValues: {},
      meta: {
        meta_filter_row_1: [
          {
            type: 'FTypeText',
            label: 'География',
            col: 4,
            name: 'city',
            validation: [],
            value: '',
            icon: 'mdi-magnify'
          },
          {
            type: 'FTypeSelect',
            label: 'Радиус',
            col: 2,
            name: 'radius',
            params: {
              options: [1, 3, 5, 10, 15],
              label: 'Не выбрано'
            },
            validation: [],
            value: 1
          },
          {
            type: 'FTypeCheckBox',
            label: '',
            col: 0,
            name: 'subscribe',
            params: {
              label: 'Подписан',
            },
            validation: [],
            value: ''
          },
          {
            type: 'FTypeCheckBox',
            label: '',
            col: 0,
            name: 'worked',
            params: {
              label: 'Работал',
            },
            validation: [],
            value: ''
          },
          {
            type: 'FTypeButton',
            label: '',
            col: 0,
            name: 'show_filter',
            params: {
              icon: 'mdi-chevron-double-down',
              icon_action: 'mdi-chevron-double-up',
              text: 'показать фильтры',
              text_action: 'скрыть фильтры',
              is_apply: true,
              style: 'outline'
            },
            validation: [],
            value: false
          },

        ],
        meta_filter_row_2: [
          {
            type: 'FTypeSelectUIID',
            label: 'Профессия',
            col: 2,
            name: 'profession',
            params: {
              options: [
                {uuid: 1, name: 'Профессия 1'},
                {uuid: 2, name: 'Профессия 2'},
                {uuid: 3, name: 'Профессия 3'},
              ],
              item_text: 'name',
              label: 'Не выбрано',
              multiple: true,
              hideDetails: true
            },
            validation: [],
            value: ''
          },
          {
            type: 'FTypeSelectUIID',
            label: 'Активность',
            col: 2,
            name: 'activity',
            params: {
              options: [
                {uuid: 1, name: 'Любой 1'},
                {uuid: 2, name: 'Любой 2'},
                {uuid: 3, name: 'Любой 3'},
              ],
              item_text: 'name',
              label: 'Не выбрано',
              multiple: true,
              hideDetails: true
            },
            validation: [],
            value: ''
          },
          {
            type: 'FTypeText',
            label: 'Ставка до',
            col: 1,
            name: 'rate',
            validation: [],
            value: '',
          },
          {
            type: 'FTypeSelectUIID',
            label: 'Ранг',
            col: 1,
            name: 'rang',
            params: {
              options: [
                {uuid: 1, name: 'Ранг 1'},
                {uuid: 2, name: 'Ранг 2'},
                {uuid: 3, name: 'Ранг 3'},
              ],
              item_text: 'name',
              label: 'Не выбрано',
              multiple: true,
              hideDetails: true
            },
            validation: [],
            value: ''
          },
          {
            type: 'FTypeText',
            label: 'Благонадежность от',
            col: 2,
            name: 'trustworthiness',
            validation: [],
            value: '',
          },
          {
            type: 'FTypeText',
            label: 'Возраст',
            col: 1,
            name: 'age_from',
            validation: [],
            value: '',
          },
          {
            type: 'FTypeText',
            label: '',
            col: 1,
            name: 'age_to',
            validation: [],
            value: '',
          },
        ]
      },
      cities: [
        'Подольск (Московская обл.)',
        'Подольск (Московская обл.)',
        'Подольск (Московская обл.)'
      ]
    }
  },
  methods: {
    updateFiled(field, value) {
      this.formValues[field] = value;
      console.log(field, value);
    },
    removeCity(){

    }
  },
  created() {
    this.meta.meta_filter_row_1.map(f => {
      Vue.set(this.formValues, f.name, f.value);
    })
    this.meta.meta_filter_row_2.map(f => {
      Vue.set(this.formValues, f.name, f.value);
    })
  }
}

</script>

<style lang="scss">

.selection-filter{
  padding: 24px;
  background: #F7F7F7;

  .wrap-form-filter{

    .row{
      align-items: flex-end;
      margin: 0;

      >div {
        padding: 0 !important;
        margin-right: 16px;
      }
    }
    .form-part-label{
      font-weight: 600;
      font-size: 16px;
      margin-bottom: 16px;
    }

    .v-text-field{
      .v-input__control{
        background: #fff;
      }
    }

    .v-input--checkbox{
      font-weight: 600;
      margin-bottom: 10px;
    }



    .selected-city{
      display: flex;
      flex-wrap: wrap;
      margin-top: 16px;

      .city-item{
        background: #EBECEE;
        border-radius: 4px;
        padding: 7px;
        display: flex;
        align-items: center;
        font-weight: 600;
        font-size: 14px;
        margin-right: 10px;
        cursor: pointer;
      }
    }


    .clear-filter{
      font-weight: 700;
      font-size: 14px;
      color: #7A91A9;
      text-transform: uppercase;
      display: flex;
      align-items: center;
      box-shadow: none;
      padding: 0;

      .v-icon{
        margin-right: 9px;
      }

      &:hover{
        color: #263043;
      }
    }

  }

}

</style>
