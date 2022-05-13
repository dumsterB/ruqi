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
                      FormBuilder(:meta="meta.meta_object_vacancy" @updateFiled="updateFiled")
                      v-btn.btn-blue.mt-6(text :disabled="disabled" height="48" outlined  @click="createService") {{ submitBtnText }}

                    .form-part-single(v-show="$route.params.VacancyId")
                      v-divider.my-8
                      .form-part-title Цена услуги
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
        meta_object_vacancy: [
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
            type: 'FTypeText',
            label: 'Наименование',
            col: 12,
            name: 'object_vacancy',
            validation: ['required'],
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
          {
            type: 'FTypeSelectUIID',
            label: 'Юнит',
            col: 4,
            name: 'object_unit',
            params: {
              options: [],
              item_text: 'name',
              label: 'Не выбрано'
            },
            validation: [],
            value: ''
          },
          {
            type: 'FTypeText',
            label: 'Норматив',
            col: 4,
            name: 'object_norma',
            validation: [],
            value: '0'
          },

        ],
      },
    }
  },
  computed: {
    title() {
      if (this.$route.params.VacancyId) {
        return 'Карточка вакансии:';
      } else {
        return 'Добавить вакансию'
      }
    },
    submitBtnText() {
      if (this.$route.params.VacancyId) {
        return 'сохранить изменения';
      } else {
        return 'создать вакансию'
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

    this.meta.meta_object_vacancy.map(f => {
      Vue.set(this.formValues, f.name, f.value);
    })

    if (this.$route.params.VacancyId) {
      console.log('this.$route.params.VacancyId ---- ', this.$route.params.VacancyId);
    }

    if (this.uuid) {
      this.$route.meta.title = 'Название вакансии';
    } else {
      this.$route.meta.title = 'Добавить вакансию';
    }


  },
}
</script>

<style lang="scss">

@import '/assets/scss/colors.scss';

.ruqi.page--objects-id-vacancy {
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
