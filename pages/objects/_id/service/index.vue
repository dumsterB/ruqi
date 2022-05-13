<template lang="pug">

  .add-service
    v-row.d-flex.pa-5.align-center.action-row(no-gutters)
      v-col(cols="10")
        .header-dialog {{ title }}

      v-col.d-flex.justify-end(cols="2")
        v-btn.btn-blue.add(text height="48" outlined @click="")
          span сохранить изменения

        v-btn.add.ml-4(text height="48" outlined @click="closeCreateEditForm")
          span закрыть

    v-container.object-info-container
      v-row
        v-col(cols="12")
          .object-info

            v-row(no-gutters)
              v-col(cols="12")
                .wrap-form
                  v-form(ref="form_part_0" v-model="valid" lazy-validation)
                    .form-part-single
                      .form-part-title Данные
                      FormBuilder(:meta="meta.meta_object_service" @updateFiled="updateFiled")
                      v-btn.btn-blue.mt-6(text :disabled="disabled" height="48" outlined  @click="createService") {{ submitBtnText }}

                    .form-part-single(v-show="$route.params.ServiceId")
                      v-divider.my-8
                      .form-part-title Ставки
                      a.add-field(@click.prevent="")
                        v-icon(color="#0082DE" size="24") mdi-plus-circle
                        span Добавить плановое значение


</template>

<script>
import Vue from "vue";

export default {
  data() {
    return {
      valid: true,
      formValues: {},
      disabled: false,
      meta: {
        meta_object_service: [
          {
            type: 'FTypeSelectUIID',
            label: 'Категория',
            col: 12,
            name: 'object_category',
            params: {
              options: [],
              item_text: 'name',
              label: 'Не выбрано'
            },
            validation: 'required',
            value: ''
          },
          {
            type: 'FTypeSelectUIID',
            label: 'Профессия из справочника',
            col: 12,
            name: 'object_profession',
            params: {
              options: [],
              item_text: 'name',
              label: 'Не выбрано'
            },
            validation: 'required',
            value: ''
          },
          {
            type: 'FTypeSelectUIID',
            label: 'Связанная услуга',
            col: 12,
            name: 'object_service',
            params: {
              options: [],
              item_text: 'name',
              label: 'Не выбрано'
            },
            validation: 'required',
            value: ''
          },
          {
            type: 'FTypeText',
            label: 'Наименование вакансиии',
            col: 12,
            name: 'object_vacancy',
            validation: ['required'],
            value: ''
          },
          {
            type: 'FTypeLabel',
            label: 'Ограничение по возрасту',
            col: 12,
            name: 'object_label_gender',
            params: {},
            validation: [],
            value: '',
          },
          {
            type: 'FTypeText',
            label: '',
            col: 2,
            name: 'object_gender_start',
            params: {
              prepend: 'от',
              time: false
            },
            validation: ['number'],
            value: '',
          },
          {
            type: 'FTypeText',
            label: '',
            col: 2,
            name: 'object_gender_end',
            params: {
              prepend: 'до',
              time: false
            },
            validation: ['number'],
            value: '',
          },
          {
            type: 'FTypeSelectUIID',
            label: 'Ограничение по полу',
            col: 12,
            name: 'object_gender',
            params: {
              options: [],
              item_text: 'name',
              label: 'Не выбрано'
            },
            validation: 'required',
            value: ''
          },
          {
            type: 'FTypeCheckBox',
            label: '',
            col: 12,
            name: 'object_right',
            params: {
              label: 'Нужны права',
            },
            validation: [],
            value: ''
          },
          {
            type: 'FTypeCheckBox',
            label: '',
            col: 12,
            name: 'object_medbook',
            params: {
              label: 'Нужна медкнижка',
            },
            validation: [],
            value: ''
          },
          {
            type: 'FTypeCheckBox',
            label: '',
            col: 12,
            name: 'object_right_sht',
            params: {
              label: 'Права управления штабелером',
            },
            validation: [],
            value: ''
          },
          {
            type: 'FTypeCheckBox',
            label: '',
            col: 12,
            name: 'object_patent',
            params: {
              label: 'Патент',
            },
            validation: [],
            value: ''
          },
          {
            type: 'FTypeTextarea',
            label: 'Описание',
            col: 12,
            id: 'object_desc',
            name: 'object_desc',
            value: ''
          },

        ],
      },
    }
  },
  computed: {
    title() {
      if (this.$route.params.ServiceId) {
        return 'Карточка услуги:';
      } else {
        return 'Добавить услугу'
      }
    },
    submitBtnText() {
      if (this.$route.params.ServiceId) {
        return 'сохранить изменения';
      } else {
        return 'создать услугу'
      }
    },
    postBody() {
      let postBody = {

      };

      console.log(postBody);
      return postBody;
    },
  },
  methods: {
    closeCreateEditForm() {
      this.$router.go(-1);
    },
    updateFiled(field, value) {
      this.formValues[field] = value;
      console.log(field, value);
    },
    createService(){
      let formPart = 'form_part_0';
      this.$refs[formPart].validate();

      this.$nextTick(() => {
        if (this.valid) {
          const newRequet = JSON.stringify(this.postBody);
          console.log(newRequet);
          this.createContractor(newRequet);
        } else {
          let el = this.$el.querySelector(".v-messages.error--text:first-of-type");
          this.$vuetify.goTo(el);
        }
      });

    }
  },
  async created() {

    this.meta.meta_object_service.map(f => {
      Vue.set(this.formValues, f.name, f.value);
    })

    if (this.$route.params.ServiceId) {
      console.log('this.$route.params.SeviceId ---- ', this.$route.params.SeviceId);
    }

    if (this.uuid) {
      this.$route.meta.title = 'Название услуги';
    } else {
      this.$route.meta.title = 'Добавить услугу';
    }


  },
}
</script>

<style lang="scss">

@import '/assets/scss/colors.scss';

.ruqi.page--objects-id-service {
  padding: 0;
  background: #F5F5F5;

  .theme--light.v-application {
    background: #F5F5F5;
  }


  .inner-object-page {
    > .container {
      padding: 0;
    }
  }

  .v-main__wrap {
    > .container {
      padding: 0;
    }
  }

}

.add-service {
  .action-row {
    background: #fff;

    .header-dialog {
      font-weight: 600;
      font-size: 20px;
    }
  }

  .object-info-container {
    background: whitesmoke;
    padding: 24px;

    .object-info-header{
      font-size: 20px;
    }
  }

}


</style>
