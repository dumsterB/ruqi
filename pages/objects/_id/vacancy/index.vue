<template lang="pug">

  .add-service
    v-row.d-flex.pa-5.align-center.action-row(no-gutters)
      v-col(cols="10")
        .header-dialog {{ title }}

      v-col.d-flex.justify-end(cols="2")
        v-btn.btn-blue.add(text height="48" outlined @click="createVacancyHandler")
          span {{ submitBtnText }}

        v-btn.add.ml-4(text height="48" outlined @click="closeCreateEditForm")
          span закрыть

    v-container.object-info-container
      v-row
        v-col(cols="12")
          .object-info
            v-row.object-info-row-rate
              v-col(cols="12")
                .wrap-form
                  v-form(ref="form_part_0" v-model="valid" lazy-validation)
                    .form-part-single
                      .form-part-title Данные
                      FormBuilder(:meta="meta.meta_object_vacancy" @updateFiled="updateFiled")
                      v-btn.btn-blue.mt-6(text :disabled="disabled" height="48" outlined  @click="createVacancyHandler") {{ submitBtnText }}

            v-row.object-info-row-rate
              v-col(cols="12" v-if="$route.params.VacancyId")
                .wrap-form
                  v-divider.my-8
                  .form-part-title Ставки
                  a.add-field.my-8(@click.prevent="isAddingRate = true")
                    v-icon(color="#0082DE" size="24") mdi-plus-circle
                    span Добавить плановое значение

            v-row(no-gutters)
              v-col(cols="12" v-if="$route.params.VacancyId")
                .wrap-form
                  .form-part-single.form-rate
                    v-row.flex-column.new-rate.px-5(no-gutters v-show="isAddingRate")
                      .form-rate-title Введите новое значение
                      Rate( prefix_name="new" :isNew="true" @updateFiled="updateFiled" @setRate="setRate")

                    v-row.flex-column.px-5(no-gutters v-show="vacancy_id.rates && vacancy_id.rates.length")
                      .form-rate-title Следующие значения

                      div(v-if="vacancy_id.rates && vacancy_id.rates.length")
                        div(v-for="(rate, index) in vacancy_id.rates")
                          Rate( :prefix_name="index" :isNew="false"
                            @updateFiled="updateFiled"
                            :rate_value="rate.rate" :date_value="rate.start_date"  :key="rate.rate + '_' +index"
                            @deleteRate="deleteRate(rate.uuid)" @putRate="putRate(index, rate.uuid)")
                          v-row
                            v-col(cols="12")
                              v-divider.mt-6.mb-8


</template>

<script>
import Vue from "vue";
import Rate from "@/components/composite/Rate";
import {mapActions} from "vuex";

export default {
  meta: {
    title: "Услуга",
  },
  components: {Rate},
  data() {
    return {
      valid: true,
      formValues: {},
      disabled: false,
      meta: {
        meta_object_vacancy: [
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
              options: [
                {
                  name: 'все',
                  uuid: 'all'
                },
                {
                  name: 'муж',
                  uuid: 'male'
                },
                {
                  name: 'жен',
                  uuid: 'female'
                },
              ],
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
        meta_object_rate: [
          [
            {
              type: 'FTypeLabel',
              label: 'Введите новое значение',
              col: 12,
              name: 'object_new_rate',
              parent_array: 'meta_object_rate',
              params: {},
              validation: [],
              value: '',
            },
            {
              type: 'FTypeText',
              label: 'ставка',
              icon: '',
              col: 4,
              name: 'object_rate_rate_0',
              remove: false,
              parent_array: 'meta_object_rate',
              value: '',
              params: {
                readonly: false
              },
            },
            {
              type: 'FTypeDate',
              label: 'действует с',
              col: 4,
              name: 'object_rate_date_0',
              validation: 'required',
              parent_array: 'meta_object_rate',
              value: '',
              params: {
                time: false
              },
            },
          ],
        ],
      },
      rates: [],
      isAddingRate: false
    }
  },
  computed: {
    professions() {
      return this.$store.getters['dictionary/professions']
    },
    object_id_services() {
      return this.$store.getters["object_id/object_id_services"];
    },
    vacancy_id() {
      return this.$store.getters['vacancy_id/vacancy_id'];
    },
    title() {
      if (this.$route.params.VacancyId) {
        return 'Карточка вакансии: ' + this.vacancy_id.name;
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
        "profession": {
          "uuid": this.formValues.object_profession
        },
        "service": {
          "uuid": this.formValues.object_service
        },
        "name": this.formValues.object_vacancy,
        "age_from": this.formValues.object_gender_start,
        "age_to": this.formValues.object_gender_end,
        "gender": this.formValues.object_gender ,
        "description": this.formValues.object_desc,
        "driver_license": this.formValues.object_right,
        "medical_book": this.formValues.object_medbook,
        "stacker_license": this.formValues.object_right_sht,
        "patent": this.formValues.object_patent,
      };

      console.log(postBody);
      return postBody;
    },
    postRate() {
      let postRate = {
        "rate": this.formValues.object_rate_rate_new,
        "start_date": this.formValues.object_rate_date_new,
      };
      console.log(postRate);
      return postRate;
    },

  },
  methods: {
    ...mapActions('dictionary', ['fetcProfessions',]),
    ...mapActions("object_id", ["fetchObjectIdServices"]),

    ...mapActions('vacancy_id', ['createVacancy',]),
    ...mapActions('vacancy_id', ['putVacancy',]),
    ...mapActions('vacancy_id', ['fetchVacancyId',]),
    ...mapActions('rate', ['createVacancyRate',]),
    ...mapActions('rate', ['putVacancyRate',]),
    ...mapActions('rate', ['removeVacancyRate',]),


    closeCreateEditForm() {
      this.$router.go(-1);
    },
    updateFiled(field, value) {
      this.formValues[field] = value;
      console.log(field, value);
    },
    updateFiledinArray(index_block, field, value, index, parent_array) {
      this.formValues[field] = value;
      this.meta[parent_array][index_block][index].value = value;
    },
    removeItem(index, array) {
      if (index != 0 || this.meta[array].length > 1) {
        this.meta[array].splice(index, 1);
      }
    },
    createVacancyHandler() {
      let formPart = 'form_part_0',
        object_uuid = this.$route.params.objectId,
        vacancy_uuid = this.$route.params.VacancyId;
      this.$refs[formPart].validate();
      this.$nextTick(() => {
        if (this.valid) {
          const newRequest = JSON.stringify(this.postBody);
          console.log(newRequest);

          if (this.$route.params.VacancyId) {
            this.putVacancy({body: newRequest, object_uuid: object_uuid, vacancy_uuid: vacancy_uuid});
          }else{
            this.createVacancy({newRequest: newRequest, object_uuid: object_uuid});
          }
        } else {
          let el = this.$el.querySelector(".v-messages.error--text:first-of-type");
          this.$vuetify.goTo(el);
        }
      });
    },
    setRate() {
      let object_uuid = this.$route.params.objectId,
        vacancy_uuid = this.$route.params.VacancyId;

      const newRequest = JSON.stringify(this.postRate);
      console.log(newRequest);
      this.createVacancyRate({newRequest: newRequest, object_uuid: object_uuid, vacancy_uuid: vacancy_uuid});
    },
    deleteRate(uuid) {
      let object_uuid = this.$route.params.objectId,
        vacancy_uuid = this.$route.params.VacancyId;
      this.removeVacancyRate({object_uuid: object_uuid, vacancy_uuid: vacancy_uuid, rate_uuid: uuid});
    },
    putRate(index, uuid) {
      let putRate = {
          "rate": this.formValues['object_rate_rate_' + index],
          "start_date": this.formValues['object_rate_date_' + index],
        },
        object_uuid = this.$route.params.objectId,
        vacancy_uuid = this.$route.params.VacancyId;

      const newRequet = JSON.stringify(putRate);
      console.log(newRequet);
      this.putVacancyRate({body: newRequet, object_uuid: object_uuid, vacancy_uuid: vacancy_uuid, rate_uuid: uuid});
    }
  },
  async created() {

    console.log('this.$route.params.VacancyId ------ ', this.$route.params.VacancyId);

    await this.fetcProfessions();
    await this.fetchObjectIdServices(this.$route.params.objectId);

    this.meta.meta_object_vacancy[0].params.options = this.professions;
    this.meta.meta_object_vacancy[1].params.options = this.object_id_services.data;

    if (this.$route.params.VacancyId) {
      await this.fetchVacancyId({objectId: this.$route.params.objectId, VacancyId: this.$route.params.VacancyId});
      this.meta.meta_object_vacancy[0].value = this.vacancy_id.profession.uuid;
      this.meta.meta_object_vacancy[1].value = this.vacancy_id.service.uuid;

      this.meta.meta_object_vacancy[2].value = this.vacancy_id.name;
      this.meta.meta_object_vacancy[4].value = this.vacancy_id.age_from;
      this.meta.meta_object_vacancy[5].value = this.vacancy_id.age_to;
      this.meta.meta_object_vacancy[6].value = this.vacancy_id.gender;

      this.meta.meta_object_vacancy[7].value = this.vacancy_id.driver_license;
      this.meta.meta_object_vacancy[8].value = this.vacancy_id.medical_book;
      this.meta.meta_object_vacancy[9].value = this.vacancy_id.stacker_license;
      this.meta.meta_object_vacancy[10].value = this.vacancy_id.patent;

      this.meta.meta_object_vacancy[11].value = this.vacancy_id.description;

    }

    if (this.$route.params.VacancyId) {
      this.$route.meta.title = 'Карточка вакансии: ' + this.vacancy_id.name;
    } else {
      this.$route.meta.title = 'Добавить вакансию';
    }

    this.meta.meta_object_vacancy.map(f => {
      Vue.set(this.formValues, f.name, f.value);
    })
    this.meta.meta_object_rate.map(subarray => subarray.map(f => {
      Vue.set(this.formValues, f.name, f.value);
    }));


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

    .object-info-header {
      font-size: 20px;
    }
  }

  .form-rate-title {
    font-weight: 600;
    margin: 16px 0;
  }

  .new-rate {
    background: #E5EFFF;
    padding-bottom: 20px;
  }

}


</style>
